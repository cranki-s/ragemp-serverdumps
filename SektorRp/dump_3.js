{
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Control;
(function (Control) {
    Control[Control["INPUT_NEXT_CAMERA"] = 0] = "INPUT_NEXT_CAMERA";
    Control[Control["INPUT_LOOK_LR"] = 1] = "INPUT_LOOK_LR";
    Control[Control["INPUT_LOOK_UD"] = 2] = "INPUT_LOOK_UD";
    Control[Control["INPUT_LOOK_UP_ONLY"] = 3] = "INPUT_LOOK_UP_ONLY";
    Control[Control["INPUT_LOOK_DOWN_ONLY"] = 4] = "INPUT_LOOK_DOWN_ONLY";
    Control[Control["INPUT_LOOK_LEFT_ONLY"] = 5] = "INPUT_LOOK_LEFT_ONLY";
    Control[Control["INPUT_LOOK_RIGHT_ONLY"] = 6] = "INPUT_LOOK_RIGHT_ONLY";
    Control[Control["INPUT_CINEMATIC_SLOWMO"] = 7] = "INPUT_CINEMATIC_SLOWMO";
    Control[Control["INPUT_SCRIPTED_FLY_UD"] = 8] = "INPUT_SCRIPTED_FLY_UD";
    Control[Control["INPUT_SCRIPTED_FLY_LR"] = 9] = "INPUT_SCRIPTED_FLY_LR";
    Control[Control["INPUT_SCRIPTED_FLY_ZUP"] = 10] = "INPUT_SCRIPTED_FLY_ZUP";
    Control[Control["INPUT_SCRIPTED_FLY_ZDOWN"] = 11] = "INPUT_SCRIPTED_FLY_ZDOWN";
    Control[Control["INPUT_WEAPON_WHEEL_UD"] = 12] = "INPUT_WEAPON_WHEEL_UD";
    Control[Control["INPUT_WEAPON_WHEEL_LR"] = 13] = "INPUT_WEAPON_WHEEL_LR";
    Control[Control["INPUT_WEAPON_WHEEL_NEXT"] = 14] = "INPUT_WEAPON_WHEEL_NEXT";
    Control[Control["INPUT_WEAPON_WHEEL_PREV"] = 15] = "INPUT_WEAPON_WHEEL_PREV";
    Control[Control["INPUT_SELECT_NEXT_WEAPON"] = 16] = "INPUT_SELECT_NEXT_WEAPON";
    Control[Control["INPUT_SELECT_PREV_WEAPON"] = 17] = "INPUT_SELECT_PREV_WEAPON";
    Control[Control["INPUT_SKIP_CUTSCENE"] = 18] = "INPUT_SKIP_CUTSCENE";
    Control[Control["INPUT_CHARACTER_WHEEL"] = 19] = "INPUT_CHARACTER_WHEEL";
    Control[Control["INPUT_MULTIPLAYER_INFO"] = 20] = "INPUT_MULTIPLAYER_INFO";
    Control[Control["INPUT_SPRINT"] = 21] = "INPUT_SPRINT";
    Control[Control["INPUT_JUMP"] = 22] = "INPUT_JUMP";
    Control[Control["INPUT_ENTER"] = 23] = "INPUT_ENTER";
    Control[Control["INPUT_ATTACK"] = 24] = "INPUT_ATTACK";
    Control[Control["INPUT_AIM"] = 25] = "INPUT_AIM";
    Control[Control["INPUT_LOOK_BEHIND"] = 26] = "INPUT_LOOK_BEHIND";
    Control[Control["INPUT_PHONE"] = 27] = "INPUT_PHONE";
    Control[Control["INPUT_SPECIAL_ABILITY"] = 28] = "INPUT_SPECIAL_ABILITY";
    Control[Control["INPUT_SPECIAL_ABILITY_SECONDARY"] = 29] = "INPUT_SPECIAL_ABILITY_SECONDARY";
    Control[Control["INPUT_MOVE_LR"] = 30] = "INPUT_MOVE_LR";
    Control[Control["INPUT_MOVE_UD"] = 31] = "INPUT_MOVE_UD";
    Control[Control["INPUT_MOVE_UP_ONLY"] = 32] = "INPUT_MOVE_UP_ONLY";
    Control[Control["INPUT_MOVE_DOWN_ONLY"] = 33] = "INPUT_MOVE_DOWN_ONLY";
    Control[Control["INPUT_MOVE_LEFT_ONLY"] = 34] = "INPUT_MOVE_LEFT_ONLY";
    Control[Control["INPUT_MOVE_RIGHT_ONLY"] = 35] = "INPUT_MOVE_RIGHT_ONLY";
    Control[Control["INPUT_DUCK"] = 36] = "INPUT_DUCK";
    Control[Control["INPUT_SELECT_WEAPON"] = 37] = "INPUT_SELECT_WEAPON";
    Control[Control["INPUT_PICKUP"] = 38] = "INPUT_PICKUP";
    Control[Control["INPUT_SNIPER_ZOOM"] = 39] = "INPUT_SNIPER_ZOOM";
    Control[Control["INPUT_SNIPER_ZOOM_IN_ONLY"] = 40] = "INPUT_SNIPER_ZOOM_IN_ONLY";
    Control[Control["INPUT_SNIPER_ZOOM_OUT_ONLY"] = 41] = "INPUT_SNIPER_ZOOM_OUT_ONLY";
    Control[Control["INPUT_SNIPER_ZOOM_IN_SECONDARY"] = 42] = "INPUT_SNIPER_ZOOM_IN_SECONDARY";
    Control[Control["INPUT_SNIPER_ZOOM_OUT_SECONDARY"] = 43] = "INPUT_SNIPER_ZOOM_OUT_SECONDARY";
    Control[Control["INPUT_COVER"] = 44] = "INPUT_COVER";
    Control[Control["INPUT_RELOAD"] = 45] = "INPUT_RELOAD";
    Control[Control["INPUT_TALK"] = 46] = "INPUT_TALK";
    Control[Control["INPUT_DETONATE"] = 47] = "INPUT_DETONATE";
    Control[Control["INPUT_HUD_SPECIAL"] = 48] = "INPUT_HUD_SPECIAL";
    Control[Control["INPUT_ARREST"] = 49] = "INPUT_ARREST";
    Control[Control["INPUT_ACCURATE_AIM"] = 50] = "INPUT_ACCURATE_AIM";
    Control[Control["INPUT_CONTEXT"] = 51] = "INPUT_CONTEXT";
    Control[Control["INPUT_CONTEXT_SECONDARY"] = 52] = "INPUT_CONTEXT_SECONDARY";
    Control[Control["INPUT_WEAPON_SPECIAL"] = 53] = "INPUT_WEAPON_SPECIAL";
    Control[Control["INPUT_WEAPON_SPECIAL_TWO"] = 54] = "INPUT_WEAPON_SPECIAL_TWO";
    Control[Control["INPUT_DIVE"] = 55] = "INPUT_DIVE";
    Control[Control["INPUT_DROP_WEAPON"] = 56] = "INPUT_DROP_WEAPON";
    Control[Control["INPUT_DROP_AMMO"] = 57] = "INPUT_DROP_AMMO";
    Control[Control["INPUT_THROW_GRENADE"] = 58] = "INPUT_THROW_GRENADE";
    Control[Control["INPUT_VEH_MOVE_LR"] = 59] = "INPUT_VEH_MOVE_LR";
    Control[Control["INPUT_VEH_MOVE_UD"] = 60] = "INPUT_VEH_MOVE_UD";
    Control[Control["INPUT_VEH_MOVE_UP_ONLY"] = 61] = "INPUT_VEH_MOVE_UP_ONLY";
    Control[Control["INPUT_VEH_MOVE_DOWN_ONLY"] = 62] = "INPUT_VEH_MOVE_DOWN_ONLY";
    Control[Control["INPUT_VEH_MOVE_LEFT_ONLY"] = 63] = "INPUT_VEH_MOVE_LEFT_ONLY";
    Control[Control["INPUT_VEH_MOVE_RIGHT_ONLY"] = 64] = "INPUT_VEH_MOVE_RIGHT_ONLY";
    Control[Control["INPUT_VEH_SPECIAL"] = 65] = "INPUT_VEH_SPECIAL";
    Control[Control["INPUT_VEH_GUN_LR"] = 66] = "INPUT_VEH_GUN_LR";
    Control[Control["INPUT_VEH_GUN_UD"] = 67] = "INPUT_VEH_GUN_UD";
    Control[Control["INPUT_VEH_AIM"] = 68] = "INPUT_VEH_AIM";
    Control[Control["INPUT_VEH_ATTACK"] = 69] = "INPUT_VEH_ATTACK";
    Control[Control["INPUT_VEH_ATTACK2"] = 70] = "INPUT_VEH_ATTACK2";
    Control[Control["INPUT_VEH_ACCELERATE"] = 71] = "INPUT_VEH_ACCELERATE";
    Control[Control["INPUT_VEH_BRAKE"] = 72] = "INPUT_VEH_BRAKE";
    Control[Control["INPUT_VEH_DUCK"] = 73] = "INPUT_VEH_DUCK";
    Control[Control["INPUT_VEH_HEADLIGHT"] = 74] = "INPUT_VEH_HEADLIGHT";
    Control[Control["INPUT_VEH_EXIT"] = 75] = "INPUT_VEH_EXIT";
    Control[Control["INPUT_VEH_HANDBRAKE"] = 76] = "INPUT_VEH_HANDBRAKE";
    Control[Control["INPUT_VEH_HOTWIRE_LEFT"] = 77] = "INPUT_VEH_HOTWIRE_LEFT";
    Control[Control["INPUT_VEH_HOTWIRE_RIGHT"] = 78] = "INPUT_VEH_HOTWIRE_RIGHT";
    Control[Control["INPUT_VEH_LOOK_BEHIND"] = 79] = "INPUT_VEH_LOOK_BEHIND";
    Control[Control["INPUT_VEH_CIN_CAM"] = 80] = "INPUT_VEH_CIN_CAM";
    Control[Control["INPUT_VEH_NEXT_RADIO"] = 81] = "INPUT_VEH_NEXT_RADIO";
    Control[Control["INPUT_VEH_PREV_RADIO"] = 82] = "INPUT_VEH_PREV_RADIO";
    Control[Control["INPUT_VEH_NEXT_RADIO_TRACK"] = 83] = "INPUT_VEH_NEXT_RADIO_TRACK";
    Control[Control["INPUT_VEH_PREV_RADIO_TRACK"] = 84] = "INPUT_VEH_PREV_RADIO_TRACK";
    Control[Control["INPUT_VEH_RADIO_WHEEL"] = 85] = "INPUT_VEH_RADIO_WHEEL";
    Control[Control["INPUT_VEH_HORN"] = 86] = "INPUT_VEH_HORN";
    Control[Control["INPUT_VEH_FLY_THROTTLE_UP"] = 87] = "INPUT_VEH_FLY_THROTTLE_UP";
    Control[Control["INPUT_VEH_FLY_THROTTLE_DOWN"] = 88] = "INPUT_VEH_FLY_THROTTLE_DOWN";
    Control[Control["INPUT_VEH_FLY_YAW_LEFT"] = 89] = "INPUT_VEH_FLY_YAW_LEFT";
    Control[Control["INPUT_VEH_FLY_YAW_RIGHT"] = 90] = "INPUT_VEH_FLY_YAW_RIGHT";
    Control[Control["INPUT_VEH_PASSENGER_AIM"] = 91] = "INPUT_VEH_PASSENGER_AIM";
    Control[Control["INPUT_VEH_PASSENGER_ATTACK"] = 92] = "INPUT_VEH_PASSENGER_ATTACK";
    Control[Control["INPUT_VEH_SPECIAL_ABILITY_FRANKLIN"] = 93] = "INPUT_VEH_SPECIAL_ABILITY_FRANKLIN";
    Control[Control["INPUT_VEH_STUNT_UD"] = 94] = "INPUT_VEH_STUNT_UD";
    Control[Control["INPUT_VEH_CINEMATIC_UD"] = 95] = "INPUT_VEH_CINEMATIC_UD";
    Control[Control["INPUT_VEH_CINEMATIC_UP_ONLY"] = 96] = "INPUT_VEH_CINEMATIC_UP_ONLY";
    Control[Control["INPUT_VEH_CINEMATIC_DOWN_ONLY"] = 97] = "INPUT_VEH_CINEMATIC_DOWN_ONLY";
    Control[Control["INPUT_VEH_CINEMATIC_LR"] = 98] = "INPUT_VEH_CINEMATIC_LR";
    Control[Control["INPUT_VEH_SELECT_NEXT_WEAPON"] = 99] = "INPUT_VEH_SELECT_NEXT_WEAPON";
    Control[Control["INPUT_VEH_SELECT_PREV_WEAPON"] = 100] = "INPUT_VEH_SELECT_PREV_WEAPON";
    Control[Control["INPUT_VEH_ROOF"] = 101] = "INPUT_VEH_ROOF";
    Control[Control["INPUT_VEH_JUMP"] = 102] = "INPUT_VEH_JUMP";
    Control[Control["INPUT_VEH_GRAPPLING_HOOK"] = 103] = "INPUT_VEH_GRAPPLING_HOOK";
    Control[Control["INPUT_VEH_SHUFFLE"] = 104] = "INPUT_VEH_SHUFFLE";
    Control[Control["INPUT_VEH_DROP_PROJECTILE"] = 105] = "INPUT_VEH_DROP_PROJECTILE";
    Control[Control["INPUT_VEH_MOUSE_CONTROL_OVERRIDE"] = 106] = "INPUT_VEH_MOUSE_CONTROL_OVERRIDE";
    Control[Control["INPUT_VEH_FLY_ROLL_LR"] = 107] = "INPUT_VEH_FLY_ROLL_LR";
    Control[Control["INPUT_VEH_FLY_ROLL_LEFT_ONLY"] = 108] = "INPUT_VEH_FLY_ROLL_LEFT_ONLY";
    Control[Control["INPUT_VEH_FLY_ROLL_RIGHT_ONLY"] = 109] = "INPUT_VEH_FLY_ROLL_RIGHT_ONLY";
    Control[Control["INPUT_VEH_FLY_PITCH_UD"] = 110] = "INPUT_VEH_FLY_PITCH_UD";
    Control[Control["INPUT_VEH_FLY_PITCH_UP_ONLY"] = 111] = "INPUT_VEH_FLY_PITCH_UP_ONLY";
    Control[Control["INPUT_VEH_FLY_PITCH_DOWN_ONLY"] = 112] = "INPUT_VEH_FLY_PITCH_DOWN_ONLY";
    Control[Control["INPUT_VEH_FLY_UNDERCARRIAGE"] = 113] = "INPUT_VEH_FLY_UNDERCARRIAGE";
    Control[Control["INPUT_VEH_FLY_ATTACK"] = 114] = "INPUT_VEH_FLY_ATTACK";
    Control[Control["INPUT_VEH_FLY_SELECT_NEXT_WEAPON"] = 115] = "INPUT_VEH_FLY_SELECT_NEXT_WEAPON";
    Control[Control["INPUT_VEH_FLY_SELECT_PREV_WEAPON"] = 116] = "INPUT_VEH_FLY_SELECT_PREV_WEAPON";
    Control[Control["INPUT_VEH_FLY_SELECT_TARGET_LEFT"] = 117] = "INPUT_VEH_FLY_SELECT_TARGET_LEFT";
    Control[Control["INPUT_VEH_FLY_SELECT_TARGET_RIGHT"] = 118] = "INPUT_VEH_FLY_SELECT_TARGET_RIGHT";
    Control[Control["INPUT_VEH_FLY_VERTICAL_FLIGHT_MODE"] = 119] = "INPUT_VEH_FLY_VERTICAL_FLIGHT_MODE";
    Control[Control["INPUT_VEH_FLY_DUCK"] = 120] = "INPUT_VEH_FLY_DUCK";
    Control[Control["INPUT_VEH_FLY_ATTACK_CAMERA"] = 121] = "INPUT_VEH_FLY_ATTACK_CAMERA";
    Control[Control["INPUT_VEH_FLY_MOUSE_CONTROL_OVERRIDE"] = 122] = "INPUT_VEH_FLY_MOUSE_CONTROL_OVERRIDE";
    Control[Control["INPUT_VEH_SUB_TURN_LR"] = 123] = "INPUT_VEH_SUB_TURN_LR";
    Control[Control["INPUT_VEH_SUB_TURN_LEFT_ONLY"] = 124] = "INPUT_VEH_SUB_TURN_LEFT_ONLY";
    Control[Control["INPUT_VEH_SUB_TURN_RIGHT_ONLY"] = 125] = "INPUT_VEH_SUB_TURN_RIGHT_ONLY";
    Control[Control["INPUT_VEH_SUB_PITCH_UD"] = 126] = "INPUT_VEH_SUB_PITCH_UD";
    Control[Control["INPUT_VEH_SUB_PITCH_UP_ONLY"] = 127] = "INPUT_VEH_SUB_PITCH_UP_ONLY";
    Control[Control["INPUT_VEH_SUB_PITCH_DOWN_ONLY"] = 128] = "INPUT_VEH_SUB_PITCH_DOWN_ONLY";
    Control[Control["INPUT_VEH_SUB_THROTTLE_UP"] = 129] = "INPUT_VEH_SUB_THROTTLE_UP";
    Control[Control["INPUT_VEH_SUB_THROTTLE_DOWN"] = 130] = "INPUT_VEH_SUB_THROTTLE_DOWN";
    Control[Control["INPUT_VEH_SUB_ASCEND"] = 131] = "INPUT_VEH_SUB_ASCEND";
    Control[Control["INPUT_VEH_SUB_DESCEND"] = 132] = "INPUT_VEH_SUB_DESCEND";
    Control[Control["INPUT_VEH_SUB_TURN_HARD_LEFT"] = 133] = "INPUT_VEH_SUB_TURN_HARD_LEFT";
    Control[Control["INPUT_VEH_SUB_TURN_HARD_RIGHT"] = 134] = "INPUT_VEH_SUB_TURN_HARD_RIGHT";
    Control[Control["INPUT_VEH_SUB_MOUSE_CONTROL_OVERRIDE"] = 135] = "INPUT_VEH_SUB_MOUSE_CONTROL_OVERRIDE";
    Control[Control["INPUT_VEH_PUSHBIKE_PEDAL"] = 136] = "INPUT_VEH_PUSHBIKE_PEDAL";
    Control[Control["INPUT_VEH_PUSHBIKE_SPRINT"] = 137] = "INPUT_VEH_PUSHBIKE_SPRINT";
    Control[Control["INPUT_VEH_PUSHBIKE_FRONT_BRAKE"] = 138] = "INPUT_VEH_PUSHBIKE_FRONT_BRAKE";
    Control[Control["INPUT_VEH_PUSHBIKE_REAR_BRAKE"] = 139] = "INPUT_VEH_PUSHBIKE_REAR_BRAKE";
    Control[Control["INPUT_MELEE_ATTACK_LIGHT"] = 140] = "INPUT_MELEE_ATTACK_LIGHT";
    Control[Control["INPUT_MELEE_ATTACK_HEAVY"] = 141] = "INPUT_MELEE_ATTACK_HEAVY";
    Control[Control["INPUT_MELEE_ATTACK_ALTERNATE"] = 142] = "INPUT_MELEE_ATTACK_ALTERNATE";
    Control[Control["INPUT_MELEE_BLOCK"] = 143] = "INPUT_MELEE_BLOCK";
    Control[Control["INPUT_PARACHUTE_DEPLOY"] = 144] = "INPUT_PARACHUTE_DEPLOY";
    Control[Control["INPUT_PARACHUTE_DETACH"] = 145] = "INPUT_PARACHUTE_DETACH";
    Control[Control["INPUT_PARACHUTE_TURN_LR"] = 146] = "INPUT_PARACHUTE_TURN_LR";
    Control[Control["INPUT_PARACHUTE_TURN_LEFT_ONLY"] = 147] = "INPUT_PARACHUTE_TURN_LEFT_ONLY";
    Control[Control["INPUT_PARACHUTE_TURN_RIGHT_ONLY"] = 148] = "INPUT_PARACHUTE_TURN_RIGHT_ONLY";
    Control[Control["INPUT_PARACHUTE_PITCH_UD"] = 149] = "INPUT_PARACHUTE_PITCH_UD";
    Control[Control["INPUT_PARACHUTE_PITCH_UP_ONLY"] = 150] = "INPUT_PARACHUTE_PITCH_UP_ONLY";
    Control[Control["INPUT_PARACHUTE_PITCH_DOWN_ONLY"] = 151] = "INPUT_PARACHUTE_PITCH_DOWN_ONLY";
    Control[Control["INPUT_PARACHUTE_BRAKE_LEFT"] = 152] = "INPUT_PARACHUTE_BRAKE_LEFT";
    Control[Control["INPUT_PARACHUTE_BRAKE_RIGHT"] = 153] = "INPUT_PARACHUTE_BRAKE_RIGHT";
    Control[Control["INPUT_PARACHUTE_SMOKE"] = 154] = "INPUT_PARACHUTE_SMOKE";
    Control[Control["INPUT_PARACHUTE_PRECISION_LANDING"] = 155] = "INPUT_PARACHUTE_PRECISION_LANDING";
    Control[Control["INPUT_MAP"] = 156] = "INPUT_MAP";
    Control[Control["INPUT_SELECT_WEAPON_UNARMED"] = 157] = "INPUT_SELECT_WEAPON_UNARMED";
    Control[Control["INPUT_SELECT_WEAPON_MELEE"] = 158] = "INPUT_SELECT_WEAPON_MELEE";
    Control[Control["INPUT_SELECT_WEAPON_HANDGUN"] = 159] = "INPUT_SELECT_WEAPON_HANDGUN";
    Control[Control["INPUT_SELECT_WEAPON_SHOTGUN"] = 160] = "INPUT_SELECT_WEAPON_SHOTGUN";
    Control[Control["INPUT_SELECT_WEAPON_SMG"] = 161] = "INPUT_SELECT_WEAPON_SMG";
    Control[Control["INPUT_SELECT_WEAPON_AUTO_RIFLE"] = 162] = "INPUT_SELECT_WEAPON_AUTO_RIFLE";
    Control[Control["INPUT_SELECT_WEAPON_SNIPER"] = 163] = "INPUT_SELECT_WEAPON_SNIPER";
    Control[Control["INPUT_SELECT_WEAPON_HEAVY"] = 164] = "INPUT_SELECT_WEAPON_HEAVY";
    Control[Control["INPUT_SELECT_WEAPON_SPECIAL"] = 165] = "INPUT_SELECT_WEAPON_SPECIAL";
    Control[Control["INPUT_SELECT_CHARACTER_MICHAEL"] = 166] = "INPUT_SELECT_CHARACTER_MICHAEL";
    Control[Control["INPUT_SELECT_CHARACTER_FRANKLIN"] = 167] = "INPUT_SELECT_CHARACTER_FRANKLIN";
    Control[Control["INPUT_SELECT_CHARACTER_TREVOR"] = 168] = "INPUT_SELECT_CHARACTER_TREVOR";
    Control[Control["INPUT_SELECT_CHARACTER_MULTIPLAYER"] = 169] = "INPUT_SELECT_CHARACTER_MULTIPLAYER";
    Control[Control["INPUT_SAVE_REPLAY_CLIP"] = 170] = "INPUT_SAVE_REPLAY_CLIP";
    Control[Control["INPUT_SPECIAL_ABILITY_PC"] = 171] = "INPUT_SPECIAL_ABILITY_PC";
    Control[Control["INPUT_CELLPHONE_UP"] = 172] = "INPUT_CELLPHONE_UP";
    Control[Control["INPUT_CELLPHONE_DOWN"] = 173] = "INPUT_CELLPHONE_DOWN";
    Control[Control["INPUT_CELLPHONE_LEFT"] = 174] = "INPUT_CELLPHONE_LEFT";
    Control[Control["INPUT_CELLPHONE_RIGHT"] = 175] = "INPUT_CELLPHONE_RIGHT";
    Control[Control["INPUT_CELLPHONE_SELECT"] = 176] = "INPUT_CELLPHONE_SELECT";
    Control[Control["INPUT_CELLPHONE_CANCEL"] = 177] = "INPUT_CELLPHONE_CANCEL";
    Control[Control["INPUT_CELLPHONE_OPTION"] = 178] = "INPUT_CELLPHONE_OPTION";
    Control[Control["INPUT_CELLPHONE_EXTRA_OPTION"] = 179] = "INPUT_CELLPHONE_EXTRA_OPTION";
    Control[Control["INPUT_CELLPHONE_SCROLL_FORWARD"] = 180] = "INPUT_CELLPHONE_SCROLL_FORWARD";
    Control[Control["INPUT_CELLPHONE_SCROLL_BACKWARD"] = 181] = "INPUT_CELLPHONE_SCROLL_BACKWARD";
    Control[Control["INPUT_CELLPHONE_CAMERA_FOCUS_LOCK"] = 182] = "INPUT_CELLPHONE_CAMERA_FOCUS_LOCK";
    Control[Control["INPUT_CELLPHONE_CAMERA_GRID"] = 183] = "INPUT_CELLPHONE_CAMERA_GRID";
    Control[Control["INPUT_CELLPHONE_CAMERA_SELFIE"] = 184] = "INPUT_CELLPHONE_CAMERA_SELFIE";
    Control[Control["INPUT_CELLPHONE_CAMERA_DOF"] = 185] = "INPUT_CELLPHONE_CAMERA_DOF";
    Control[Control["INPUT_CELLPHONE_CAMERA_EXPRESSION"] = 186] = "INPUT_CELLPHONE_CAMERA_EXPRESSION";
    Control[Control["INPUT_FRONTEND_DOWN"] = 187] = "INPUT_FRONTEND_DOWN";
    Control[Control["INPUT_FRONTEND_UP"] = 188] = "INPUT_FRONTEND_UP";
    Control[Control["INPUT_FRONTEND_LEFT"] = 189] = "INPUT_FRONTEND_LEFT";
    Control[Control["INPUT_FRONTEND_RIGHT"] = 190] = "INPUT_FRONTEND_RIGHT";
    Control[Control["INPUT_FRONTEND_RDOWN"] = 191] = "INPUT_FRONTEND_RDOWN";
    Control[Control["INPUT_FRONTEND_RUP"] = 192] = "INPUT_FRONTEND_RUP";
    Control[Control["INPUT_FRONTEND_RLEFT"] = 193] = "INPUT_FRONTEND_RLEFT";
    Control[Control["INPUT_FRONTEND_RRIGHT"] = 194] = "INPUT_FRONTEND_RRIGHT";
    Control[Control["INPUT_FRONTEND_AXIS_X"] = 195] = "INPUT_FRONTEND_AXIS_X";
    Control[Control["INPUT_FRONTEND_AXIS_Y"] = 196] = "INPUT_FRONTEND_AXIS_Y";
    Control[Control["INPUT_FRONTEND_RIGHT_AXIS_X"] = 197] = "INPUT_FRONTEND_RIGHT_AXIS_X";
    Control[Control["INPUT_FRONTEND_RIGHT_AXIS_Y"] = 198] = "INPUT_FRONTEND_RIGHT_AXIS_Y";
    Control[Control["INPUT_FRONTEND_PAUSE"] = 199] = "INPUT_FRONTEND_PAUSE";
    Control[Control["INPUT_FRONTEND_PAUSE_ALTERNATE"] = 200] = "INPUT_FRONTEND_PAUSE_ALTERNATE";
    Control[Control["INPUT_FRONTEND_ACCEPT"] = 201] = "INPUT_FRONTEND_ACCEPT";
    Control[Control["INPUT_FRONTEND_CANCEL"] = 202] = "INPUT_FRONTEND_CANCEL";
    Control[Control["INPUT_FRONTEND_X"] = 203] = "INPUT_FRONTEND_X";
    Control[Control["INPUT_FRONTEND_Y"] = 204] = "INPUT_FRONTEND_Y";
    Control[Control["INPUT_FRONTEND_LB"] = 205] = "INPUT_FRONTEND_LB";
    Control[Control["INPUT_FRONTEND_RB"] = 206] = "INPUT_FRONTEND_RB";
    Control[Control["INPUT_FRONTEND_LT"] = 207] = "INPUT_FRONTEND_LT";
    Control[Control["INPUT_FRONTEND_RT"] = 208] = "INPUT_FRONTEND_RT";
    Control[Control["INPUT_FRONTEND_LS"] = 209] = "INPUT_FRONTEND_LS";
    Control[Control["INPUT_FRONTEND_RS"] = 210] = "INPUT_FRONTEND_RS";
    Control[Control["INPUT_FRONTEND_LEADERBOARD"] = 211] = "INPUT_FRONTEND_LEADERBOARD";
    Control[Control["INPUT_FRONTEND_SOCIAL_CLUB"] = 212] = "INPUT_FRONTEND_SOCIAL_CLUB";
    Control[Control["INPUT_FRONTEND_SOCIAL_CLUB_SECONDARY"] = 213] = "INPUT_FRONTEND_SOCIAL_CLUB_SECONDARY";
    Control[Control["INPUT_FRONTEND_DELETE"] = 214] = "INPUT_FRONTEND_DELETE";
    Control[Control["INPUT_FRONTEND_ENDSCREEN_ACCEPT"] = 215] = "INPUT_FRONTEND_ENDSCREEN_ACCEPT";
    Control[Control["INPUT_FRONTEND_ENDSCREEN_EXPAND"] = 216] = "INPUT_FRONTEND_ENDSCREEN_EXPAND";
    Control[Control["INPUT_FRONTEND_SELECT"] = 217] = "INPUT_FRONTEND_SELECT";
    Control[Control["INPUT_SCRIPT_LEFT_AXIS_X"] = 218] = "INPUT_SCRIPT_LEFT_AXIS_X";
    Control[Control["INPUT_SCRIPT_LEFT_AXIS_Y"] = 219] = "INPUT_SCRIPT_LEFT_AXIS_Y";
    Control[Control["INPUT_SCRIPT_RIGHT_AXIS_X"] = 220] = "INPUT_SCRIPT_RIGHT_AXIS_X";
    Control[Control["INPUT_SCRIPT_RIGHT_AXIS_Y"] = 221] = "INPUT_SCRIPT_RIGHT_AXIS_Y";
    Control[Control["INPUT_SCRIPT_RUP"] = 222] = "INPUT_SCRIPT_RUP";
    Control[Control["INPUT_SCRIPT_RDOWN"] = 223] = "INPUT_SCRIPT_RDOWN";
    Control[Control["INPUT_SCRIPT_RLEFT"] = 224] = "INPUT_SCRIPT_RLEFT";
    Control[Control["INPUT_SCRIPT_RRIGHT"] = 225] = "INPUT_SCRIPT_RRIGHT";
    Control[Control["INPUT_SCRIPT_LB"] = 226] = "INPUT_SCRIPT_LB";
    Control[Control["INPUT_SCRIPT_RB"] = 227] = "INPUT_SCRIPT_RB";
    Control[Control["INPUT_SCRIPT_LT"] = 228] = "INPUT_SCRIPT_LT";
    Control[Control["INPUT_SCRIPT_RT"] = 229] = "INPUT_SCRIPT_RT";
    Control[Control["INPUT_SCRIPT_LS"] = 230] = "INPUT_SCRIPT_LS";
    Control[Control["INPUT_SCRIPT_RS"] = 231] = "INPUT_SCRIPT_RS";
    Control[Control["INPUT_SCRIPT_PAD_UP"] = 232] = "INPUT_SCRIPT_PAD_UP";
    Control[Control["INPUT_SCRIPT_PAD_DOWN"] = 233] = "INPUT_SCRIPT_PAD_DOWN";
    Control[Control["INPUT_SCRIPT_PAD_LEFT"] = 234] = "INPUT_SCRIPT_PAD_LEFT";
    Control[Control["INPUT_SCRIPT_PAD_RIGHT"] = 235] = "INPUT_SCRIPT_PAD_RIGHT";
    Control[Control["INPUT_SCRIPT_SELECT"] = 236] = "INPUT_SCRIPT_SELECT";
    Control[Control["INPUT_CURSOR_ACCEPT"] = 237] = "INPUT_CURSOR_ACCEPT";
    Control[Control["INPUT_CURSOR_CANCEL"] = 238] = "INPUT_CURSOR_CANCEL";
    Control[Control["INPUT_CURSOR_X"] = 239] = "INPUT_CURSOR_X";
    Control[Control["INPUT_CURSOR_Y"] = 240] = "INPUT_CURSOR_Y";
    Control[Control["INPUT_CURSOR_SCROLL_UP"] = 241] = "INPUT_CURSOR_SCROLL_UP";
    Control[Control["INPUT_CURSOR_SCROLL_DOWN"] = 242] = "INPUT_CURSOR_SCROLL_DOWN";
    Control[Control["INPUT_ENTER_CHEAT_CODE"] = 243] = "INPUT_ENTER_CHEAT_CODE";
    Control[Control["INPUT_INTERACTION_MENU"] = 244] = "INPUT_INTERACTION_MENU";
    Control[Control["INPUT_MP_TEXT_CHAT_ALL"] = 245] = "INPUT_MP_TEXT_CHAT_ALL";
    Control[Control["INPUT_MP_TEXT_CHAT_TEAM"] = 246] = "INPUT_MP_TEXT_CHAT_TEAM";
    Control[Control["INPUT_MP_TEXT_CHAT_FRIENDS"] = 247] = "INPUT_MP_TEXT_CHAT_FRIENDS";
    Control[Control["INPUT_MP_TEXT_CHAT_CREW"] = 248] = "INPUT_MP_TEXT_CHAT_CREW";
    Control[Control["INPUT_PUSH_TO_TALK"] = 249] = "INPUT_PUSH_TO_TALK";
    Control[Control["INPUT_CREATOR_LS"] = 250] = "INPUT_CREATOR_LS";
    Control[Control["INPUT_CREATOR_RS"] = 251] = "INPUT_CREATOR_RS";
    Control[Control["INPUT_CREATOR_LT"] = 252] = "INPUT_CREATOR_LT";
    Control[Control["INPUT_CREATOR_RT"] = 253] = "INPUT_CREATOR_RT";
    Control[Control["INPUT_CREATOR_MENU_TOGGLE"] = 254] = "INPUT_CREATOR_MENU_TOGGLE";
    Control[Control["INPUT_CREATOR_ACCEPT"] = 255] = "INPUT_CREATOR_ACCEPT";
    Control[Control["INPUT_CREATOR_DELETE"] = 256] = "INPUT_CREATOR_DELETE";
    Control[Control["INPUT_ATTACK2"] = 257] = "INPUT_ATTACK2";
    Control[Control["INPUT_RAPPEL_JUMP"] = 258] = "INPUT_RAPPEL_JUMP";
    Control[Control["INPUT_RAPPEL_LONG_JUMP"] = 259] = "INPUT_RAPPEL_LONG_JUMP";
    Control[Control["INPUT_RAPPEL_SMASH_WINDOW"] = 260] = "INPUT_RAPPEL_SMASH_WINDOW";
    Control[Control["INPUT_PREV_WEAPON"] = 261] = "INPUT_PREV_WEAPON";
    Control[Control["INPUT_NEXT_WEAPON"] = 262] = "INPUT_NEXT_WEAPON";
    Control[Control["INPUT_MELEE_ATTACK1"] = 263] = "INPUT_MELEE_ATTACK1";
    Control[Control["INPUT_MELEE_ATTACK2"] = 264] = "INPUT_MELEE_ATTACK2";
    Control[Control["INPUT_WHISTLE"] = 265] = "INPUT_WHISTLE";
    Control[Control["INPUT_MOVE_LEFT"] = 266] = "INPUT_MOVE_LEFT";
    Control[Control["INPUT_MOVE_RIGHT"] = 267] = "INPUT_MOVE_RIGHT";
    Control[Control["INPUT_MOVE_UP"] = 268] = "INPUT_MOVE_UP";
    Control[Control["INPUT_MOVE_DOWN"] = 269] = "INPUT_MOVE_DOWN";
    Control[Control["INPUT_LOOK_LEFT"] = 270] = "INPUT_LOOK_LEFT";
    Control[Control["INPUT_LOOK_RIGHT"] = 271] = "INPUT_LOOK_RIGHT";
    Control[Control["INPUT_LOOK_UP"] = 272] = "INPUT_LOOK_UP";
    Control[Control["INPUT_LOOK_DOWN"] = 273] = "INPUT_LOOK_DOWN";
    Control[Control["INPUT_SNIPER_ZOOM_IN"] = 274] = "INPUT_SNIPER_ZOOM_IN";
    Control[Control["INPUT_SNIPER_ZOOM_OUT"] = 275] = "INPUT_SNIPER_ZOOM_OUT";
    Control[Control["INPUT_SNIPER_ZOOM_IN_ALTERNATE"] = 276] = "INPUT_SNIPER_ZOOM_IN_ALTERNATE";
    Control[Control["INPUT_SNIPER_ZOOM_OUT_ALTERNATE"] = 277] = "INPUT_SNIPER_ZOOM_OUT_ALTERNATE";
    Control[Control["INPUT_VEH_MOVE_LEFT"] = 278] = "INPUT_VEH_MOVE_LEFT";
    Control[Control["INPUT_VEH_MOVE_RIGHT"] = 279] = "INPUT_VEH_MOVE_RIGHT";
    Control[Control["INPUT_VEH_MOVE_UP"] = 280] = "INPUT_VEH_MOVE_UP";
    Control[Control["INPUT_VEH_MOVE_DOWN"] = 281] = "INPUT_VEH_MOVE_DOWN";
    Control[Control["INPUT_VEH_GUN_LEFT"] = 282] = "INPUT_VEH_GUN_LEFT";
    Control[Control["INPUT_VEH_GUN_RIGHT"] = 283] = "INPUT_VEH_GUN_RIGHT";
    Control[Control["INPUT_VEH_GUN_UP"] = 284] = "INPUT_VEH_GUN_UP";
    Control[Control["INPUT_VEH_GUN_DOWN"] = 285] = "INPUT_VEH_GUN_DOWN";
    Control[Control["INPUT_VEH_LOOK_LEFT"] = 286] = "INPUT_VEH_LOOK_LEFT";
    Control[Control["INPUT_VEH_LOOK_RIGHT"] = 287] = "INPUT_VEH_LOOK_RIGHT";
    Control[Control["INPUT_REPLAY_START_STOP_RECORDING"] = 288] = "INPUT_REPLAY_START_STOP_RECORDING";
    Control[Control["INPUT_REPLAY_START_STOP_RECORDING_SECONDARY"] = 289] = "INPUT_REPLAY_START_STOP_RECORDING_SECONDARY";
    Control[Control["INPUT_SCALED_LOOK_LR"] = 290] = "INPUT_SCALED_LOOK_LR";
    Control[Control["INPUT_SCALED_LOOK_UD"] = 291] = "INPUT_SCALED_LOOK_UD";
    Control[Control["INPUT_SCALED_LOOK_UP_ONLY"] = 292] = "INPUT_SCALED_LOOK_UP_ONLY";
    Control[Control["INPUT_SCALED_LOOK_DOWN_ONLY"] = 293] = "INPUT_SCALED_LOOK_DOWN_ONLY";
    Control[Control["INPUT_SCALED_LOOK_LEFT_ONLY"] = 294] = "INPUT_SCALED_LOOK_LEFT_ONLY";
    Control[Control["INPUT_SCALED_LOOK_RIGHT_ONLY"] = 295] = "INPUT_SCALED_LOOK_RIGHT_ONLY";
    Control[Control["INPUT_REPLAY_MARKER_DELETE"] = 296] = "INPUT_REPLAY_MARKER_DELETE";
    Control[Control["INPUT_REPLAY_CLIP_DELETE"] = 297] = "INPUT_REPLAY_CLIP_DELETE";
    Control[Control["INPUT_REPLAY_PAUSE"] = 298] = "INPUT_REPLAY_PAUSE";
    Control[Control["INPUT_REPLAY_REWIND"] = 299] = "INPUT_REPLAY_REWIND";
    Control[Control["INPUT_REPLAY_FFWD"] = 300] = "INPUT_REPLAY_FFWD";
    Control[Control["INPUT_REPLAY_NEWMARKER"] = 301] = "INPUT_REPLAY_NEWMARKER";
    Control[Control["INPUT_REPLAY_RECORD"] = 302] = "INPUT_REPLAY_RECORD";
    Control[Control["INPUT_REPLAY_SCREENSHOT"] = 303] = "INPUT_REPLAY_SCREENSHOT";
    Control[Control["INPUT_REPLAY_HIDEHUD"] = 304] = "INPUT_REPLAY_HIDEHUD";
    Control[Control["INPUT_REPLAY_STARTPOINT"] = 305] = "INPUT_REPLAY_STARTPOINT";
    Control[Control["INPUT_REPLAY_ENDPOINT"] = 306] = "INPUT_REPLAY_ENDPOINT";
    Control[Control["INPUT_REPLAY_ADVANCE"] = 307] = "INPUT_REPLAY_ADVANCE";
    Control[Control["INPUT_REPLAY_BACK"] = 308] = "INPUT_REPLAY_BACK";
    Control[Control["INPUT_REPLAY_TOOLS"] = 309] = "INPUT_REPLAY_TOOLS";
    Control[Control["INPUT_REPLAY_RESTART"] = 310] = "INPUT_REPLAY_RESTART";
    Control[Control["INPUT_REPLAY_SHOWHOTKEY"] = 311] = "INPUT_REPLAY_SHOWHOTKEY";
    Control[Control["INPUT_REPLAY_CYCLEMARKERLEFT"] = 312] = "INPUT_REPLAY_CYCLEMARKERLEFT";
    Control[Control["INPUT_REPLAY_CYCLEMARKERRIGHT"] = 313] = "INPUT_REPLAY_CYCLEMARKERRIGHT";
    Control[Control["INPUT_REPLAY_FOVINCREASE"] = 314] = "INPUT_REPLAY_FOVINCREASE";
    Control[Control["INPUT_REPLAY_FOVDECREASE"] = 315] = "INPUT_REPLAY_FOVDECREASE";
    Control[Control["INPUT_REPLAY_CAMERAUP"] = 316] = "INPUT_REPLAY_CAMERAUP";
    Control[Control["INPUT_REPLAY_CAMERADOWN"] = 317] = "INPUT_REPLAY_CAMERADOWN";
    Control[Control["INPUT_REPLAY_SAVE"] = 318] = "INPUT_REPLAY_SAVE";
    Control[Control["INPUT_REPLAY_TOGGLETIME"] = 319] = "INPUT_REPLAY_TOGGLETIME";
    Control[Control["INPUT_REPLAY_TOGGLETIPS"] = 320] = "INPUT_REPLAY_TOGGLETIPS";
    Control[Control["INPUT_REPLAY_PREVIEW"] = 321] = "INPUT_REPLAY_PREVIEW";
    Control[Control["INPUT_REPLAY_TOGGLE_TIMELINE"] = 322] = "INPUT_REPLAY_TOGGLE_TIMELINE";
    Control[Control["INPUT_REPLAY_TIMELINE_PICKUP_CLIP"] = 323] = "INPUT_REPLAY_TIMELINE_PICKUP_CLIP";
    Control[Control["INPUT_REPLAY_TIMELINE_DUPLICATE_CLIP"] = 324] = "INPUT_REPLAY_TIMELINE_DUPLICATE_CLIP";
    Control[Control["INPUT_REPLAY_TIMELINE_PLACE_CLIP"] = 325] = "INPUT_REPLAY_TIMELINE_PLACE_CLIP";
    Control[Control["INPUT_REPLAY_CTRL"] = 326] = "INPUT_REPLAY_CTRL";
    Control[Control["INPUT_REPLAY_TIMELINE_SAVE"] = 327] = "INPUT_REPLAY_TIMELINE_SAVE";
    Control[Control["INPUT_REPLAY_PREVIEW_AUDIO"] = 328] = "INPUT_REPLAY_PREVIEW_AUDIO";
    Control[Control["INPUT_VEH_DRIVE_LOOK"] = 329] = "INPUT_VEH_DRIVE_LOOK";
    Control[Control["INPUT_VEH_DRIVE_LOOK2"] = 330] = "INPUT_VEH_DRIVE_LOOK2";
    Control[Control["INPUT_VEH_FLY_ATTACK2"] = 331] = "INPUT_VEH_FLY_ATTACK2";
    Control[Control["INPUT_RADIO_WHEEL_UD"] = 332] = "INPUT_RADIO_WHEEL_UD";
    Control[Control["INPUT_RADIO_WHEEL_LR"] = 333] = "INPUT_RADIO_WHEEL_LR";
    Control[Control["INPUT_VEH_SLOWMO_UD"] = 334] = "INPUT_VEH_SLOWMO_UD";
    Control[Control["INPUT_VEH_SLOWMO_UP_ONLY"] = 335] = "INPUT_VEH_SLOWMO_UP_ONLY";
    Control[Control["INPUT_VEH_SLOWMO_DOWN_ONLY"] = 336] = "INPUT_VEH_SLOWMO_DOWN_ONLY";
    Control[Control["INPUT_VEH_HYDRAULICS_CONTROL_TOGGLE"] = 337] = "INPUT_VEH_HYDRAULICS_CONTROL_TOGGLE";
    Control[Control["INPUT_VEH_HYDRAULICS_CONTROL_LEFT"] = 338] = "INPUT_VEH_HYDRAULICS_CONTROL_LEFT";
    Control[Control["INPUT_VEH_HYDRAULICS_CONTROL_RIGHT"] = 339] = "INPUT_VEH_HYDRAULICS_CONTROL_RIGHT";
    Control[Control["INPUT_VEH_HYDRAULICS_CONTROL_UP"] = 340] = "INPUT_VEH_HYDRAULICS_CONTROL_UP";
    Control[Control["INPUT_VEH_HYDRAULICS_CONTROL_DOWN"] = 341] = "INPUT_VEH_HYDRAULICS_CONTROL_DOWN";
    Control[Control["INPUT_VEH_HYDRAULICS_CONTROL_LR"] = 342] = "INPUT_VEH_HYDRAULICS_CONTROL_LR";
    Control[Control["INPUT_VEH_HYDRAULICS_CONTROL_UD"] = 343] = "INPUT_VEH_HYDRAULICS_CONTROL_UD";
    Control[Control["INPUT_SWITCH_VISOR"] = 344] = "INPUT_SWITCH_VISOR";
    Control[Control["INPUT_VEH_MELEE_HOLD"] = 345] = "INPUT_VEH_MELEE_HOLD";
    Control[Control["INPUT_VEH_MELEE_LEFT"] = 346] = "INPUT_VEH_MELEE_LEFT";
    Control[Control["INPUT_VEH_MELEE_RIGHT"] = 347] = "INPUT_VEH_MELEE_RIGHT";
    Control[Control["INPUT_MAP_POI"] = 348] = "INPUT_MAP_POI";
    Control[Control["INPUT_REPLAY_SNAPMATIC_PHOTO"] = 349] = "INPUT_REPLAY_SNAPMATIC_PHOTO";
    Control[Control["INPUT_VEH_CAR_JUMP"] = 350] = "INPUT_VEH_CAR_JUMP";
    Control[Control["INPUT_VEH_ROCKET_BOOST"] = 351] = "INPUT_VEH_ROCKET_BOOST";
    Control[Control["INPUT_VEH_PARACHUTE"] = 352] = "INPUT_VEH_PARACHUTE";
    Control[Control["INPUT_VEH_BIKE_WINGS"] = 353] = "INPUT_VEH_BIKE_WINGS";
    Control[Control["INPUT_VEH_FLY_BOMB_BAY"] = 354] = "INPUT_VEH_FLY_BOMB_BAY";
    Control[Control["INPUT_VEH_FLY_COUNTER"] = 355] = "INPUT_VEH_FLY_COUNTER";
    Control[Control["INPUT_VEH_TRANSFORM"] = 356] = "INPUT_VEH_TRANSFORM";
    Control[Control["MAX_INPUTS"] = 357] = "MAX_INPUTS";
    Control[Control["UNDEFINED_INPUT"] = -1] = "UNDEFINED_INPUT";
})(Control || (Control = {}));

var Color = (function () {
    function Color(red, green, blue, alpha) {
        if (red === void 0) { red = 255; }
        if (green === void 0) { green = 255; }
        if (blue === void 0) { blue = 255; }
        if (alpha === void 0) { alpha = 255; }
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
    }
    return Color;
}());
var TextureDictionnary = (function () {
    function TextureDictionnary(textureDict, textures) {
        this.textureDictionnary = textureDict;
        this.textures = textures;
    }
    TextureDictionnary.prototype.draw = function (textureName, screenX, screenY, scaleX, scaleY, color, heading) {
        if (color === void 0) { color = new Color(255, 255, 255); }
        if (heading === void 0) { heading = 0; }
        if (this.textures.indexOf(textureName) !== -1) {
            if (mp.game.graphics.hasStreamedTextureDictLoaded(this.textureDictionnary) == false) {
                mp.game.graphics.requestStreamedTextureDict(this.textureDictionnary, true);
            }
            mp.game.graphics.drawSprite(this.textureDictionnary, textureName, screenX, screenY, scaleX, scaleY, heading, color.red, color.green, color.blue, color.alpha);
        }
    };
    return TextureDictionnary;
}());
function drawText(text, position, color, font, scale, isTextCenter) {
    if (position === void 0) { position = []; }
    if (font === void 0) { font = 0; }
    if (scale === void 0) { scale = [0.35, 0.35]; }
    if (isTextCenter === void 0) { isTextCenter = false; }
    mp.game.ui.setTextFont(font);
    mp.game.ui.setTextScale(scale[0] * MainMenu.SCREEN_RATIO_WIDTH, scale[1] * MainMenu.SCREEN_RATIO_HEIGHT);
    mp.game.ui.setTextColour(color.red, color.green, color.blue, color.alpha);
    mp.game.ui.setTextCentre(isTextCenter);
    mp.game.ui.setTextEntry("STRING");
    mp.game.ui.addTextComponentSubstringPlayerName(text);
    mp.game.ui.drawText(position[0], position[1]);
}
function getTextWidth(text, font, scale) {
    if (font === void 0) { font = 0; }
    if (scale === void 0) { scale = [0.35, 0.35]; }
    mp.game.ui.setTextFont(font);
    mp.game.ui.setTextScale(scale[0], scale[1]);
    mp.game.ui.setTextEntryForWidth("STRING");
    mp.game.ui.addTextComponentSubstringPlayerName(text);
    return mp.game.ui.getTextScreenWidth(true);
}
var Sound = (function () {
    function Sound(audioName, audioRef, soundId, p3, p4, p5) {
        if (audioRef === void 0) { audioRef = "HUD_FRONTEND_DEFAULT_SOUNDSET"; }
        if (soundId === void 0) { soundId = -1; }
        if (p3 === void 0) { p3 = false; }
        if (p4 === void 0) { p4 = 0; }
        if (p5 === void 0) { p5 = true; }
        this.soundId = soundId;
        this.audioName = audioName;
        this.audioRef = audioRef;
        this.p3 = p3;
        this.p4 = p4;
        this.p5 = p5;
    }
    Sound.prototype.playSound = function () {
        mp.game.audio.playSound(this.soundId, this.audioName, this.audioRef, this.p3, this.p4, this.p5);
    };
    return Sound;
}());
var MenuBadge;
(function (MenuBadge) {
    MenuBadge[MenuBadge["MEDAL_BRONZE"] = 0] = "MEDAL_BRONZE";
    MenuBadge[MenuBadge["MEDAL_GOLD"] = 1] = "MEDAL_GOLD";
    MenuBadge[MenuBadge["MEDAL_SILVER"] = 2] = "MEDAL_SILVER";
    MenuBadge[MenuBadge["MP_ALERTTRIANGLE"] = 3] = "MP_ALERTTRIANGLE";
    MenuBadge[MenuBadge["MP_HOSTCROWN"] = 4] = "MP_HOSTCROWN";
    MenuBadge[MenuBadge["MP_MEDAL_BRONZE"] = 5] = "MP_MEDAL_BRONZE";
    MenuBadge[MenuBadge["MP_MEDAL_GOLD"] = 6] = "MP_MEDAL_GOLD";
    MenuBadge[MenuBadge["MP_MEDAL_SILVER"] = 7] = "MP_MEDAL_SILVER";
    MenuBadge[MenuBadge["MP_SPECITEM_CASH"] = 8] = "MP_SPECITEM_CASH";
    MenuBadge[MenuBadge["MP_SPECITEM_COKE"] = 9] = "MP_SPECITEM_COKE";
    MenuBadge[MenuBadge["MP_SPECITEM_HEROIN"] = 10] = "MP_SPECITEM_HEROIN";
    MenuBadge[MenuBadge["MP_SPECITEM_METH"] = 11] = "MP_SPECITEM_METH";
    MenuBadge[MenuBadge["MP_SPECITEM_WEED"] = 12] = "MP_SPECITEM_WEED";
    MenuBadge[MenuBadge["SHOP_AMMO"] = 13] = "SHOP_AMMO";
    MenuBadge[MenuBadge["SHOP_ARMOUR"] = 14] = "SHOP_ARMOUR";
    MenuBadge[MenuBadge["SHOP_ARROWS_UPANDDOWN"] = 15] = "SHOP_ARROWS_UPANDDOWN";
    MenuBadge[MenuBadge["SHOP_BARBER"] = 16] = "SHOP_BARBER";
    MenuBadge[MenuBadge["SHOP_BOX_BLANK"] = 17] = "SHOP_BOX_BLANK";
    MenuBadge[MenuBadge["SHOP_BOX_CROSS"] = 18] = "SHOP_BOX_CROSS";
    MenuBadge[MenuBadge["SHOP_BOX_TICK"] = 19] = "SHOP_BOX_TICK";
    MenuBadge[MenuBadge["SHOP_CLOTHING"] = 20] = "SHOP_CLOTHING";
    MenuBadge[MenuBadge["SHOP_FRANKLIN"] = 21] = "SHOP_FRANKLIN";
    MenuBadge[MenuBadge["SHOP_GARAGE_BIKE"] = 22] = "SHOP_GARAGE_BIKE";
    MenuBadge[MenuBadge["SHOP_GARAGE"] = 23] = "SHOP_GARAGE";
    MenuBadge[MenuBadge["SHOP_GUNCLUB"] = 24] = "SHOP_GUNCLUB";
    MenuBadge[MenuBadge["SHOP_HEALTH"] = 25] = "SHOP_HEALTH";
    MenuBadge[MenuBadge["SHOP_LOCK"] = 26] = "SHOP_LOCK";
    MenuBadge[MenuBadge["SHOP_MAKEUP"] = 27] = "SHOP_MAKEUP";
    MenuBadge[MenuBadge["SHOP_MASK"] = 28] = "SHOP_MASK";
    MenuBadge[MenuBadge["SHOP_MICHAEL"] = 29] = "SHOP_MICHAEL";
    MenuBadge[MenuBadge["SHOP_NEW_STAR"] = 30] = "SHOP_NEW_STAR";
    MenuBadge[MenuBadge["SHOP_TATTOOS"] = 31] = "SHOP_TATTOOS";
    MenuBadge[MenuBadge["SHOP_TICK_ICON"] = 32] = "SHOP_TICK_ICON";
    MenuBadge[MenuBadge["SHOP_TREVOR"] = 33] = "SHOP_TREVOR";
    MenuBadge[MenuBadge["DEATHMATCH"] = 34] = "DEATHMATCH";
    MenuBadge[MenuBadge["TEAM_DEATHMATCH"] = 35] = "TEAM_DEATHMATCH";
    MenuBadge[MenuBadge["VEHICLE_DEATHMATCH"] = 36] = "VEHICLE_DEATHMATCH";
    MenuBadge[MenuBadge["LOCK"] = 37] = "LOCK";
    MenuBadge[MenuBadge["STAR"] = 38] = "STAR";
    MenuBadge[MenuBadge["WARNING"] = 39] = "WARNING";
    MenuBadge[MenuBadge["CROWN"] = 40] = "CROWN";
    MenuBadge[MenuBadge["CASH"] = 41] = "CASH";
    MenuBadge[MenuBadge["COKE"] = 42] = "COKE";
    MenuBadge[MenuBadge["HEROIN"] = 43] = "HEROIN";
    MenuBadge[MenuBadge["METH"] = 44] = "METH";
    MenuBadge[MenuBadge["WEED"] = 45] = "WEED";
    MenuBadge[MenuBadge["AMMO"] = 46] = "AMMO";
    MenuBadge[MenuBadge["ARMOR"] = 47] = "ARMOR";
    MenuBadge[MenuBadge["BARBER"] = 48] = "BARBER";
    MenuBadge[MenuBadge["CLOTHING"] = 49] = "CLOTHING";
    MenuBadge[MenuBadge["FRANKLIN"] = 50] = "FRANKLIN";
    MenuBadge[MenuBadge["BIKE"] = 51] = "BIKE";
    MenuBadge[MenuBadge["CAR"] = 52] = "CAR";
    MenuBadge[MenuBadge["GUN"] = 53] = "GUN";
    MenuBadge[MenuBadge["HEALTH_HEART"] = 54] = "HEALTH_HEART";
    MenuBadge[MenuBadge["MAKEUP_BRUSH"] = 55] = "MAKEUP_BRUSH";
    MenuBadge[MenuBadge["MASK"] = 56] = "MASK";
    MenuBadge[MenuBadge["MICHAEL"] = 57] = "MICHAEL";
    MenuBadge[MenuBadge["TATTOO"] = 58] = "TATTOO";
    MenuBadge[MenuBadge["TICK"] = 59] = "TICK";
    MenuBadge[MenuBadge["TREVOR"] = 60] = "TREVOR";
    MenuBadge[MenuBadge["FEMALE"] = 61] = "FEMALE";
    MenuBadge[MenuBadge["MALE"] = 62] = "MALE";
    MenuBadge[MenuBadge["LOCK_ARENA"] = 63] = "LOCK_ARENA";
    MenuBadge[MenuBadge["ADVERSARY"] = 64] = "ADVERSARY";
    MenuBadge[MenuBadge["BASE_JUMPING"] = 65] = "BASE_JUMPING";
    MenuBadge[MenuBadge["BRIEFCASE"] = 66] = "BRIEFCASE";
    MenuBadge[MenuBadge["MISSION_STAR"] = 67] = "MISSION_STAR";
    MenuBadge[MenuBadge["CASTLE"] = 68] = "CASTLE";
    MenuBadge[MenuBadge["TROPHY"] = 69] = "TROPHY";
    MenuBadge[MenuBadge["RACE_FLAG"] = 70] = "RACE_FLAG";
    MenuBadge[MenuBadge["RACE_FLAG_PLANE"] = 71] = "RACE_FLAG_PLANE";
    MenuBadge[MenuBadge["RACE_FLAG_BICYCLE"] = 72] = "RACE_FLAG_BICYCLE";
    MenuBadge[MenuBadge["RACE_FLAG_PERSON"] = 73] = "RACE_FLAG_PERSON";
    MenuBadge[MenuBadge["RACE_FLAG_CAR"] = 74] = "RACE_FLAG_CAR";
    MenuBadge[MenuBadge["RACE_FLAG_BOAT_ANCHOR"] = 75] = "RACE_FLAG_BOAT_ANCHOR";
    MenuBadge[MenuBadge["ROCKSTAR"] = 76] = "ROCKSTAR";
    MenuBadge[MenuBadge["STUNT"] = 77] = "STUNT";
    MenuBadge[MenuBadge["STUNT_PREMIUM"] = 78] = "STUNT_PREMIUM";
    MenuBadge[MenuBadge["RACE_FLAG_STUNT_JUMP"] = 79] = "RACE_FLAG_STUNT_JUMP";
    MenuBadge[MenuBadge["SHIELD"] = 80] = "SHIELD";
    MenuBadge[MenuBadge["MP_AMMO_PICKUP"] = 81] = "MP_AMMO_PICKUP";
    MenuBadge[MenuBadge["MP_AMMO"] = 82] = "MP_AMMO";
    MenuBadge[MenuBadge["MP_CASH"] = 83] = "MP_CASH";
    MenuBadge[MenuBadge["MP_RP"] = 84] = "MP_RP";
    MenuBadge[MenuBadge["MP_SPECTATING"] = 85] = "MP_SPECTATING";
    MenuBadge[MenuBadge["SALE"] = 86] = "SALE";
    MenuBadge[MenuBadge["GLOBE_WHITE"] = 87] = "GLOBE_WHITE";
    MenuBadge[MenuBadge["GLOBE_RED"] = 88] = "GLOBE_RED";
    MenuBadge[MenuBadge["GLOBE_BLUE"] = 89] = "GLOBE_BLUE";
    MenuBadge[MenuBadge["GLOBE_YELLOW"] = 90] = "GLOBE_YELLOW";
    MenuBadge[MenuBadge["GLOBE_GREEN"] = 91] = "GLOBE_GREEN";
    MenuBadge[MenuBadge["GLOBE_ORANGE"] = 92] = "GLOBE_ORANGE";
    MenuBadge[MenuBadge["INV_ARM_WRESTLING"] = 93] = "INV_ARM_WRESTLING";
    MenuBadge[MenuBadge["INV_BASEJUMP"] = 94] = "INV_BASEJUMP";
    MenuBadge[MenuBadge["INV_MISSION"] = 95] = "INV_MISSION";
    MenuBadge[MenuBadge["INV_DARTS"] = 96] = "INV_DARTS";
    MenuBadge[MenuBadge["INV_DEATHMATCH"] = 97] = "INV_DEATHMATCH";
    MenuBadge[MenuBadge["INV_DRUG"] = 98] = "INV_DRUG";
    MenuBadge[MenuBadge["INV_CASTLE"] = 99] = "INV_CASTLE";
    MenuBadge[MenuBadge["INV_GOLF"] = 100] = "INV_GOLF";
    MenuBadge[MenuBadge["INV_BIKE"] = 101] = "INV_BIKE";
    MenuBadge[MenuBadge["INV_BOAT"] = 102] = "INV_BOAT";
    MenuBadge[MenuBadge["INV_ANCHOR"] = 103] = "INV_ANCHOR";
    MenuBadge[MenuBadge["INV_CAR"] = 104] = "INV_CAR";
    MenuBadge[MenuBadge["INV_DOLLAR"] = 105] = "INV_DOLLAR";
    MenuBadge[MenuBadge["INV_COKE"] = 106] = "INV_COKE";
    MenuBadge[MenuBadge["INV_KEY"] = 107] = "INV_KEY";
    MenuBadge[MenuBadge["INV_DATA"] = 108] = "INV_DATA";
    MenuBadge[MenuBadge["INV_HELI"] = 109] = "INV_HELI";
    MenuBadge[MenuBadge["INV_HEORIN"] = 110] = "INV_HEORIN";
    MenuBadge[MenuBadge["INV_KEYCARD"] = 111] = "INV_KEYCARD";
    MenuBadge[MenuBadge["INV_METH"] = 112] = "INV_METH";
    MenuBadge[MenuBadge["INV_BRIEFCASE"] = 113] = "INV_BRIEFCASE";
    MenuBadge[MenuBadge["INV_LINK"] = 114] = "INV_LINK";
    MenuBadge[MenuBadge["INV_PERSON"] = 115] = "INV_PERSON";
    MenuBadge[MenuBadge["INV_PLANE"] = 116] = "INV_PLANE";
    MenuBadge[MenuBadge["INV_PLANE2"] = 117] = "INV_PLANE2";
    MenuBadge[MenuBadge["INV_QUESTIONMARK"] = 118] = "INV_QUESTIONMARK";
    MenuBadge[MenuBadge["INV_REMOTE"] = 119] = "INV_REMOTE";
    MenuBadge[MenuBadge["INV_SAFE"] = 120] = "INV_SAFE";
    MenuBadge[MenuBadge["INV_STEER_WHEEL"] = 121] = "INV_STEER_WHEEL";
    MenuBadge[MenuBadge["INV_WEAPON"] = 122] = "INV_WEAPON";
    MenuBadge[MenuBadge["INV_WEED"] = 123] = "INV_WEED";
    MenuBadge[MenuBadge["INV_RACE_FLAG_PLANE"] = 124] = "INV_RACE_FLAG_PLANE";
    MenuBadge[MenuBadge["INV_RACE_FLAG_BICYCLE"] = 125] = "INV_RACE_FLAG_BICYCLE";
    MenuBadge[MenuBadge["INV_RACE_FLAG_BOAT_ANCHOR"] = 126] = "INV_RACE_FLAG_BOAT_ANCHOR";
    MenuBadge[MenuBadge["INV_RACE_FLAG_PERSON"] = 127] = "INV_RACE_FLAG_PERSON";
    MenuBadge[MenuBadge["INV_RACE_FLAG_CAR"] = 128] = "INV_RACE_FLAG_CAR";
    MenuBadge[MenuBadge["INV_RACE_FLAG_HELMET"] = 129] = "INV_RACE_FLAG_HELMET";
    MenuBadge[MenuBadge["INV_SHOOTING_RANGE"] = 130] = "INV_SHOOTING_RANGE";
    MenuBadge[MenuBadge["INV_SURVIVAL"] = 131] = "INV_SURVIVAL";
    MenuBadge[MenuBadge["INV_TEAM_DEATHMATCH"] = 132] = "INV_TEAM_DEATHMATCH";
    MenuBadge[MenuBadge["INV_TENNIS"] = 133] = "INV_TENNIS";
    MenuBadge[MenuBadge["INV_VEHICLE_DEATHMATCH"] = 134] = "INV_VEHICLE_DEATHMATCH";
    MenuBadge[MenuBadge["AUDIO_MUTE"] = 135] = "AUDIO_MUTE";
    MenuBadge[MenuBadge["AUDIO_INACTIVE"] = 136] = "AUDIO_INACTIVE";
    MenuBadge[MenuBadge["AUDIO_VOL1"] = 137] = "AUDIO_VOL1";
    MenuBadge[MenuBadge["AUDIO_VOL2"] = 138] = "AUDIO_VOL2";
    MenuBadge[MenuBadge["AUDIO_VOL3"] = 139] = "AUDIO_VOL3";
    MenuBadge[MenuBadge["COUNTRY_USA"] = 140] = "COUNTRY_USA";
    MenuBadge[MenuBadge["COUNTRY_UK"] = 141] = "COUNTRY_UK";
    MenuBadge[MenuBadge["COUNTRY_SWEDEN"] = 142] = "COUNTRY_SWEDEN";
    MenuBadge[MenuBadge["COUNTRY_KOREA"] = 143] = "COUNTRY_KOREA";
    MenuBadge[MenuBadge["COUNTRY_JAPAN"] = 144] = "COUNTRY_JAPAN";
    MenuBadge[MenuBadge["COUNTRY_ITALY"] = 145] = "COUNTRY_ITALY";
    MenuBadge[MenuBadge["COUNTRY_GERMANY"] = 146] = "COUNTRY_GERMANY";
    MenuBadge[MenuBadge["COUNTRY_FRANCE"] = 147] = "COUNTRY_FRANCE";
    MenuBadge[MenuBadge["BRAND_ALBANY"] = 148] = "BRAND_ALBANY";
    MenuBadge[MenuBadge["BRAND_ANNIS"] = 149] = "BRAND_ANNIS";
    MenuBadge[MenuBadge["BRAND_BANSHEE"] = 150] = "BRAND_BANSHEE";
    MenuBadge[MenuBadge["BRAND_BENEFACTOR"] = 151] = "BRAND_BENEFACTOR";
    MenuBadge[MenuBadge["BRAND_BF"] = 152] = "BRAND_BF";
    MenuBadge[MenuBadge["BRAND_BOLLOKAN"] = 153] = "BRAND_BOLLOKAN";
    MenuBadge[MenuBadge["BRAND_BRAVADO"] = 154] = "BRAND_BRAVADO";
    MenuBadge[MenuBadge["BRAND_BRUTE"] = 155] = "BRAND_BRUTE";
    MenuBadge[MenuBadge["BRAND_BUCKINGHAM"] = 156] = "BRAND_BUCKINGHAM";
    MenuBadge[MenuBadge["BRAND_CANIS"] = 157] = "BRAND_CANIS";
    MenuBadge[MenuBadge["BRAND_CHARIOT"] = 158] = "BRAND_CHARIOT";
    MenuBadge[MenuBadge["BRAND_CHEVAL"] = 159] = "BRAND_CHEVAL";
    MenuBadge[MenuBadge["BRAND_CLASSIQUE"] = 160] = "BRAND_CLASSIQUE";
    MenuBadge[MenuBadge["BRAND_COIL"] = 161] = "BRAND_COIL";
    MenuBadge[MenuBadge["BRAND_DECLASSE"] = 162] = "BRAND_DECLASSE";
    MenuBadge[MenuBadge["BRAND_DEWBAUCHEE"] = 163] = "BRAND_DEWBAUCHEE";
    MenuBadge[MenuBadge["BRAND_DILETTANTE"] = 164] = "BRAND_DILETTANTE";
    MenuBadge[MenuBadge["BRAND_DINKA"] = 165] = "BRAND_DINKA";
    MenuBadge[MenuBadge["BRAND_DUNDREARY"] = 166] = "BRAND_DUNDREARY";
    MenuBadge[MenuBadge["BRAND_EMPORER"] = 167] = "BRAND_EMPORER";
    MenuBadge[MenuBadge["BRAND_ENUS"] = 168] = "BRAND_ENUS";
    MenuBadge[MenuBadge["BRAND_FATHOM"] = 169] = "BRAND_FATHOM";
    MenuBadge[MenuBadge["BRAND_GALIVANTER"] = 170] = "BRAND_GALIVANTER";
    MenuBadge[MenuBadge["BRAND_GROTTI"] = 171] = "BRAND_GROTTI";
    MenuBadge[MenuBadge["BRAND_GROTTI2"] = 172] = "BRAND_GROTTI2";
    MenuBadge[MenuBadge["BRAND_HIJAK"] = 173] = "BRAND_HIJAK";
    MenuBadge[MenuBadge["BRAND_HVY"] = 174] = "BRAND_HVY";
    MenuBadge[MenuBadge["BRAND_IMPONTE"] = 175] = "BRAND_IMPONTE";
    MenuBadge[MenuBadge["BRAND_INVETERO"] = 176] = "BRAND_INVETERO";
    MenuBadge[MenuBadge["BRAND_JACKSHEEPE"] = 177] = "BRAND_JACKSHEEPE";
    MenuBadge[MenuBadge["BRAND_LCC"] = 178] = "BRAND_LCC";
    MenuBadge[MenuBadge["BRAND_JOBUILT"] = 179] = "BRAND_JOBUILT";
    MenuBadge[MenuBadge["BRAND_KARIN"] = 180] = "BRAND_KARIN";
    MenuBadge[MenuBadge["BRAND_LAMPADATI"] = 181] = "BRAND_LAMPADATI";
    MenuBadge[MenuBadge["BRAND_MAIBATSU"] = 182] = "BRAND_MAIBATSU";
    MenuBadge[MenuBadge["BRAND_MAMMOTH"] = 183] = "BRAND_MAMMOTH";
    MenuBadge[MenuBadge["BRAND_MTL"] = 184] = "BRAND_MTL";
    MenuBadge[MenuBadge["BRAND_NAGASAKI"] = 185] = "BRAND_NAGASAKI";
    MenuBadge[MenuBadge["BRAND_OBEY"] = 186] = "BRAND_OBEY";
    MenuBadge[MenuBadge["BRAND_OCELOT"] = 187] = "BRAND_OCELOT";
    MenuBadge[MenuBadge["BRAND_OVERFLOD"] = 188] = "BRAND_OVERFLOD";
    MenuBadge[MenuBadge["BRAND_PED"] = 189] = "BRAND_PED";
    MenuBadge[MenuBadge["BRAND_PEGASSI"] = 190] = "BRAND_PEGASSI";
    MenuBadge[MenuBadge["BRAND_PFISTER"] = 191] = "BRAND_PFISTER";
    MenuBadge[MenuBadge["BRAND_PRINCIPE"] = 192] = "BRAND_PRINCIPE";
    MenuBadge[MenuBadge["BRAND_PROGEN"] = 193] = "BRAND_PROGEN";
    MenuBadge[MenuBadge["BRAND_PROGEN2"] = 194] = "BRAND_PROGEN2";
    MenuBadge[MenuBadge["BRAND_RUNE"] = 195] = "BRAND_RUNE";
    MenuBadge[MenuBadge["BRAND_SCHYSTER"] = 196] = "BRAND_SCHYSTER";
    MenuBadge[MenuBadge["BRAND_SHITZU"] = 197] = "BRAND_SHITZU";
    MenuBadge[MenuBadge["BRAND_SPEEDOPHILE"] = 198] = "BRAND_SPEEDOPHILE";
    MenuBadge[MenuBadge["BRAND_STANLEY"] = 199] = "BRAND_STANLEY";
    MenuBadge[MenuBadge["BRAND_TRUFFADE"] = 200] = "BRAND_TRUFFADE";
    MenuBadge[MenuBadge["BRAND_UBERMACHT"] = 201] = "BRAND_UBERMACHT";
    MenuBadge[MenuBadge["BRAND_VAPID"] = 202] = "BRAND_VAPID";
    MenuBadge[MenuBadge["BRAND_VULCAR"] = 203] = "BRAND_VULCAR";
    MenuBadge[MenuBadge["BRAND_WEENY"] = 204] = "BRAND_WEENY";
    MenuBadge[MenuBadge["BRAND_WESTERN"] = 205] = "BRAND_WESTERN";
    MenuBadge[MenuBadge["BRAND_WESTERNMOTORCYCLE"] = 206] = "BRAND_WESTERNMOTORCYCLE";
    MenuBadge[MenuBadge["BRAND_WILLARD"] = 207] = "BRAND_WILLARD";
    MenuBadge[MenuBadge["BRAND_ZIRCONIUM"] = 208] = "BRAND_ZIRCONIUM";
    MenuBadge[MenuBadge["INFO"] = 209] = "INFO";
})(MenuBadge || (MenuBadge = {}));
function MenuBadgeToSpriteName(badge, isHover) {
    if (isHover === void 0) { isHover = false; }
    var result = MenuBadge[badge].toString().toLowerCase();
    switch (badge) {
        case MenuBadge.SHOP_AMMO:
        case MenuBadge.SHOP_ARMOUR:
        case MenuBadge.SHOP_BARBER:
        case MenuBadge.SHOP_CLOTHING:
        case MenuBadge.SHOP_FRANKLIN:
        case MenuBadge.SHOP_GARAGE_BIKE:
        case MenuBadge.SHOP_GARAGE:
        case MenuBadge.SHOP_GUNCLUB:
        case MenuBadge.SHOP_HEALTH:
        case MenuBadge.SHOP_MAKEUP:
        case MenuBadge.SHOP_MASK:
        case MenuBadge.SHOP_MICHAEL:
        case MenuBadge.SHOP_TATTOOS:
        case MenuBadge.SHOP_TREVOR:
            return isHover ? result + "_icon_a" : result + "_icon_b";
        case MenuBadge.SHOP_BOX_BLANK:
        case MenuBadge.SHOP_BOX_CROSS:
        case MenuBadge.SHOP_BOX_TICK:
            return isHover ? result + "b" : result;
        case MenuBadge.AMMO: return isHover ? "shop_ammo_icon_b" : "shop_ammo_icon_a";
        case MenuBadge.ARMOR: return isHover ? "shop_armour_icon_b" : "shop_armour_icon_a";
        case MenuBadge.BARBER: return isHover ? "shop_barber_icon_b" : "shop_barber_icon_a";
        case MenuBadge.BIKE: return isHover ? "shop_garage_bike_icon_b" : "shop_garage_bike_icon_a";
        case MenuBadge.CAR: return isHover ? "shop_garage_icon_b" : "shop_garage_icon_a";
        case MenuBadge.CASH: return "mp_specitem_cash";
        case MenuBadge.CLOTHING: return isHover ? "shop_clothing_icon_b" : "shop_clothing_icon_a";
        case MenuBadge.COKE: return "mp_specitem_coke";
        case MenuBadge.CROWN: return "mp_hostcrown";
        case MenuBadge.FRANKLIN: return isHover ? "shop_franklin_icon_b" : "shop_franklin_icon_a";
        case MenuBadge.GUN: return isHover ? "shop_gunclub_icon_b" : "shop_gunclub_icon_a";
        case MenuBadge.HEALTH_HEART: return isHover ? "shop_health_icon_b" : "shop_health_icon_a";
        case MenuBadge.HEROIN: return "mp_specitem_heroin";
        case MenuBadge.LOCK: return "shop_lock";
        case MenuBadge.MAKEUP_BRUSH: return isHover ? "shop_makeup_icon_b" : "shop_makeup_icon_a";
        case MenuBadge.MASK: return isHover ? "shop_mask_icon_b" : "shop_mask_icon_a";
        case MenuBadge.MEDAL_BRONZE: return "mp_medal_bronze";
        case MenuBadge.MEDAL_GOLD: return "mp_medal_gold";
        case MenuBadge.MEDAL_SILVER: return "mp_medal_silver";
        case MenuBadge.METH: return "mp_specitem_meth";
        case MenuBadge.MICHAEL: return isHover ? "shop_michael_icon_b" : "shop_michael_icon_a";
        case MenuBadge.STAR: return "shop_new_star";
        case MenuBadge.TATTOO: return isHover ? "shop_tattoos_icon_b" : "shop_tattoos_icon_a";
        case MenuBadge.TICK: return "shop_tick_icon";
        case MenuBadge.TREVOR: return isHover ? "shop_trevor_icon_b" : "shop_trevor_icon_a";
        case MenuBadge.WARNING: return "mp_alerttriangle";
        case MenuBadge.WEED: return "mp_specitem_weed";
        case MenuBadge.MALE: return "leaderboard_male_icon";
        case MenuBadge.FEMALE: return "leaderboard_female_icon";
        case MenuBadge.LOCK_ARENA: return "shop_lock_arena";
        case MenuBadge.ADVERSARY: return "adversary";
        case MenuBadge.BASE_JUMPING: return "base_jumping";
        case MenuBadge.BRIEFCASE: return "capture_the_flag";
        case MenuBadge.MISSION_STAR: return "custom_mission";
        case MenuBadge.DEATHMATCH: return "deathmatch";
        case MenuBadge.CASTLE: return "gang_attack";
        case MenuBadge.TROPHY: return "last_team_standing";
        case MenuBadge.RACE_FLAG: return "race";
        case MenuBadge.RACE_FLAG_PLANE: return "race_air";
        case MenuBadge.RACE_FLAG_BICYCLE: return "race_bicycle";
        case MenuBadge.RACE_FLAG_PERSON: return "race_foot";
        case MenuBadge.RACE_FLAG_CAR: return "race_land";
        case MenuBadge.RACE_FLAG_BOAT_ANCHOR: return "race_water";
        case MenuBadge.ROCKSTAR: return "rockstar";
        case MenuBadge.STUNT: return "stunt";
        case MenuBadge.STUNT_PREMIUM: return "stunt_premium";
        case MenuBadge.RACE_FLAG_STUNT_JUMP: return "stunt_race";
        case MenuBadge.SHIELD: return "survival";
        case MenuBadge.TEAM_DEATHMATCH: return "team_deathmatch";
        case MenuBadge.VEHICLE_DEATHMATCH: return "vehicle_deathmatch";
        case MenuBadge.MP_AMMO_PICKUP: return "ammo_pickup";
        case MenuBadge.MP_AMMO: return "mp_anim_ammo";
        case MenuBadge.MP_CASH: return "mp_anim_cash";
        case MenuBadge.MP_RP: return "mp_anim_rp";
        case MenuBadge.MP_SPECTATING: return "spectating";
        case MenuBadge.SALE: return "saleicon";
        case MenuBadge.GLOBE_WHITE:
        case MenuBadge.GLOBE_RED:
        case MenuBadge.GLOBE_BLUE:
        case MenuBadge.GLOBE_YELLOW:
        case MenuBadge.GLOBE_GREEN:
        case MenuBadge.GLOBE_ORANGE:
            return "globe";
        case MenuBadge.INV_ARM_WRESTLING: return "arm_wrestling";
        case MenuBadge.INV_BASEJUMP: return "basejump";
        case MenuBadge.INV_MISSION: return "custom_mission";
        case MenuBadge.INV_DARTS: return "darts";
        case MenuBadge.INV_DEATHMATCH: return "deathmatch";
        case MenuBadge.INV_DRUG: return "drug_trafficking";
        case MenuBadge.INV_CASTLE: return "gang_attack";
        case MenuBadge.INV_GOLF: return "golf";
        case MenuBadge.INV_BIKE: return "mp_specitem_bike";
        case MenuBadge.INV_BOAT: return "mp_specitem_boat";
        case MenuBadge.INV_ANCHOR: return "mp_specitem_boatpickup";
        case MenuBadge.INV_CAR: return "mp_specitem_car";
        case MenuBadge.INV_DOLLAR: return "mp_specitem_cash";
        case MenuBadge.INV_COKE: return "mp_specitem_coke";
        case MenuBadge.INV_KEY: return "mp_specitem_cuffkeys";
        case MenuBadge.INV_DATA: return "mp_specitem_data";
        case MenuBadge.INV_HELI: return "mp_specitem_heli";
        case MenuBadge.INV_HEORIN: return "mp_specitem_heroin";
        case MenuBadge.INV_KEYCARD: return "mp_specitem_keycard";
        case MenuBadge.INV_METH: return "mp_specitem_meth";
        case MenuBadge.INV_BRIEFCASE: return "mp_specitem_package";
        case MenuBadge.INV_LINK: return "mp_specitem_partnericon";
        case MenuBadge.INV_PERSON: return "mp_specitem_ped";
        case MenuBadge.INV_PLANE: return "mp_specitem_plane";
        case MenuBadge.INV_PLANE2: return "mp_specitem_plane2";
        case MenuBadge.INV_QUESTIONMARK: return "mp_specitem_randomobject";
        case MenuBadge.INV_REMOTE: return "mp_specitem_remote";
        case MenuBadge.INV_SAFE: return "mp_specitem_safe";
        case MenuBadge.INV_STEER_WHEEL: return "mp_specitem_steer_wheel";
        case MenuBadge.INV_WEAPON: return "mp_specitem_weapons";
        case MenuBadge.INV_WEED: return "mp_specitem_weed";
        case MenuBadge.INV_RACE_FLAG_PLANE: return "race_air";
        case MenuBadge.INV_RACE_FLAG_BICYCLE: return "race_bike";
        case MenuBadge.INV_RACE_FLAG_BOAT_ANCHOR: return "race_boat";
        case MenuBadge.INV_RACE_FLAG_PERSON: return "race_foot";
        case MenuBadge.INV_RACE_FLAG_CAR: return "race_land";
        case MenuBadge.INV_RACE_FLAG_HELMET: return "race_offroad";
        case MenuBadge.INV_SHOOTING_RANGE: return "shooting_range";
        case MenuBadge.INV_SURVIVAL: return "survival";
        case MenuBadge.INV_TEAM_DEATHMATCH: return "team_deathmatch";
        case MenuBadge.INV_TENNIS: return "tennis";
        case MenuBadge.INV_VEHICLE_DEATHMATCH: return "vehicle_deathmatch";
        case MenuBadge.AUDIO_MUTE: return "leaderboard_audio_mute";
        case MenuBadge.AUDIO_INACTIVE: return "leaderboard_audio_inactive";
        case MenuBadge.AUDIO_VOL1: return "leaderboard_audio_1";
        case MenuBadge.AUDIO_VOL2: return "leaderboard_audio_2";
        case MenuBadge.AUDIO_VOL3: return "leaderboard_audio_3";
        case MenuBadge.COUNTRY_USA: return "vehicle_card_icons_flag_usa";
        case MenuBadge.COUNTRY_UK: return "vehicle_card_icons_flag_uk";
        case MenuBadge.COUNTRY_SWEDEN: return "vehicle_card_icons_flag_sweden";
        case MenuBadge.COUNTRY_KOREA: return "vehicle_card_icons_flag_korea";
        case MenuBadge.COUNTRY_JAPAN: return "vehicle_card_icons_flag_japan";
        case MenuBadge.COUNTRY_ITALY: return "vehicle_card_icons_flag_italy";
        case MenuBadge.COUNTRY_GERMANY: return "vehicle_card_icons_flag_germany";
        case MenuBadge.COUNTRY_FRANCE: return "vehicle_card_icons_flag_france";
        case MenuBadge.BRAND_ALBANY: return "albany";
        case MenuBadge.BRAND_ANNIS: return "annis";
        case MenuBadge.BRAND_BANSHEE: return "banshee";
        case MenuBadge.BRAND_BENEFACTOR: return "benefactor";
        case MenuBadge.BRAND_BF: return "bf";
        case MenuBadge.BRAND_BOLLOKAN: return "bollokan";
        case MenuBadge.BRAND_BRAVADO: return "bravado";
        case MenuBadge.BRAND_BRUTE: return "brute";
        case MenuBadge.BRAND_BUCKINGHAM: return "buckingham";
        case MenuBadge.BRAND_CANIS: return "canis";
        case MenuBadge.BRAND_CHARIOT: return "chariot";
        case MenuBadge.BRAND_CHEVAL: return "cheval";
        case MenuBadge.BRAND_CLASSIQUE: return "classique";
        case MenuBadge.BRAND_COIL: return "coil";
        case MenuBadge.BRAND_DECLASSE: return "declasse";
        case MenuBadge.BRAND_DEWBAUCHEE: return "dewbauchee";
        case MenuBadge.BRAND_DILETTANTE: return "dilettante";
        case MenuBadge.BRAND_DINKA: return "dinka";
        case MenuBadge.BRAND_DUNDREARY: return "dundreary";
        case MenuBadge.BRAND_EMPORER: return "emporer";
        case MenuBadge.BRAND_ENUS: return "enus";
        case MenuBadge.BRAND_FATHOM: return "fathom";
        case MenuBadge.BRAND_GALIVANTER: return "galivanter";
        case MenuBadge.BRAND_GROTTI: return "grotti";
        case MenuBadge.BRAND_HIJAK: return "hijak";
        case MenuBadge.BRAND_HVY: return "hvy";
        case MenuBadge.BRAND_IMPONTE: return "imponte";
        case MenuBadge.BRAND_INVETERO: return "invetero";
        case MenuBadge.BRAND_JACKSHEEPE: return "jacksheepe";
        case MenuBadge.BRAND_JOBUILT: return "jobuilt";
        case MenuBadge.BRAND_KARIN: return "karin";
        case MenuBadge.BRAND_LAMPADATI: return "lampadati";
        case MenuBadge.BRAND_MAIBATSU: return "maibatsu";
        case MenuBadge.BRAND_MAMMOTH: return "mammoth";
        case MenuBadge.BRAND_MTL: return "mtl";
        case MenuBadge.BRAND_NAGASAKI: return "nagasaki";
        case MenuBadge.BRAND_OBEY: return "obey";
        case MenuBadge.BRAND_OCELOT: return "ocelot";
        case MenuBadge.BRAND_OVERFLOD: return "overflod";
        case MenuBadge.BRAND_PED: return "ped";
        case MenuBadge.BRAND_PEGASSI: return "pegassi";
        case MenuBadge.BRAND_PFISTER: return "pfister";
        case MenuBadge.BRAND_PRINCIPE: return "principe";
        case MenuBadge.BRAND_PROGEN: return "progen";
        case MenuBadge.BRAND_SCHYSTER: return "schyster";
        case MenuBadge.BRAND_SHITZU: return "shitzu";
        case MenuBadge.BRAND_SPEEDOPHILE: return "speedophile";
        case MenuBadge.BRAND_STANLEY: return "stanley";
        case MenuBadge.BRAND_TRUFFADE: return "truffade";
        case MenuBadge.BRAND_UBERMACHT: return "ubermacht";
        case MenuBadge.BRAND_VAPID: return "vapid";
        case MenuBadge.BRAND_VULCAR: return "vulcar";
        case MenuBadge.BRAND_WEENY: return "weeny";
        case MenuBadge.BRAND_WESTERN: return "western";
        case MenuBadge.BRAND_WESTERNMOTORCYCLE: return "westernmotorcycle";
        case MenuBadge.BRAND_WILLARD: return "willard";
        case MenuBadge.BRAND_ZIRCONIUM: return "zirconium";
        case MenuBadge.BRAND_GROTTI2: return "grotti_2";
        case MenuBadge.BRAND_LCC: return "lcc";
        case MenuBadge.BRAND_PROGEN2: return "progen";
        case MenuBadge.BRAND_RUNE: return "rune";
        case MenuBadge.INFO: return "info_icon_32";
        default:
            return result;
    }
}
function GetBadgeDictionary(badge) {
    switch (badge) {
        case MenuBadge.MALE:
        case MenuBadge.FEMALE:
        case MenuBadge.AUDIO_MUTE:
        case MenuBadge.AUDIO_INACTIVE:
        case MenuBadge.AUDIO_VOL1:
        case MenuBadge.AUDIO_VOL2:
        case MenuBadge.AUDIO_VOL3:
            return "mpleaderboard";
        case MenuBadge.INV_ARM_WRESTLING:
        case MenuBadge.INV_BASEJUMP:
        case MenuBadge.INV_MISSION:
        case MenuBadge.INV_DARTS:
        case MenuBadge.INV_DEATHMATCH:
        case MenuBadge.INV_DRUG:
        case MenuBadge.INV_CASTLE:
        case MenuBadge.INV_GOLF:
        case MenuBadge.INV_BIKE:
        case MenuBadge.INV_BOAT:
        case MenuBadge.INV_ANCHOR:
        case MenuBadge.INV_CAR:
        case MenuBadge.INV_DOLLAR:
        case MenuBadge.INV_COKE:
        case MenuBadge.INV_KEY:
        case MenuBadge.INV_DATA:
        case MenuBadge.INV_HELI:
        case MenuBadge.INV_HEORIN:
        case MenuBadge.INV_KEYCARD:
        case MenuBadge.INV_METH:
        case MenuBadge.INV_BRIEFCASE:
        case MenuBadge.INV_LINK:
        case MenuBadge.INV_PERSON:
        case MenuBadge.INV_PLANE:
        case MenuBadge.INV_PLANE2:
        case MenuBadge.INV_QUESTIONMARK:
        case MenuBadge.INV_REMOTE:
        case MenuBadge.INV_SAFE:
        case MenuBadge.INV_STEER_WHEEL:
        case MenuBadge.INV_WEAPON:
        case MenuBadge.INV_WEED:
        case MenuBadge.INV_RACE_FLAG_PLANE:
        case MenuBadge.INV_RACE_FLAG_BICYCLE:
        case MenuBadge.INV_RACE_FLAG_BOAT_ANCHOR:
        case MenuBadge.INV_RACE_FLAG_PERSON:
        case MenuBadge.INV_RACE_FLAG_CAR:
        case MenuBadge.INV_RACE_FLAG_HELMET:
        case MenuBadge.INV_SHOOTING_RANGE:
        case MenuBadge.INV_SURVIVAL:
        case MenuBadge.INV_TEAM_DEATHMATCH:
        case MenuBadge.INV_TENNIS:
        case MenuBadge.INV_VEHICLE_DEATHMATCH:
            return "mpinventory";
        case MenuBadge.ADVERSARY:
        case MenuBadge.BASE_JUMPING:
        case MenuBadge.BRIEFCASE:
        case MenuBadge.MISSION_STAR:
        case MenuBadge.DEATHMATCH:
        case MenuBadge.CASTLE:
        case MenuBadge.TROPHY:
        case MenuBadge.RACE_FLAG:
        case MenuBadge.RACE_FLAG_PLANE:
        case MenuBadge.RACE_FLAG_BICYCLE:
        case MenuBadge.RACE_FLAG_PERSON:
        case MenuBadge.RACE_FLAG_CAR:
        case MenuBadge.RACE_FLAG_BOAT_ANCHOR:
        case MenuBadge.ROCKSTAR:
        case MenuBadge.STUNT:
        case MenuBadge.STUNT_PREMIUM:
        case MenuBadge.RACE_FLAG_STUNT_JUMP:
        case MenuBadge.SHIELD:
        case MenuBadge.TEAM_DEATHMATCH:
        case MenuBadge.VEHICLE_DEATHMATCH:
            return "commonmenutu";
        case MenuBadge.MP_AMMO_PICKUP:
        case MenuBadge.MP_AMMO:
        case MenuBadge.MP_CASH:
        case MenuBadge.MP_RP:
        case MenuBadge.MP_SPECTATING:
            return "mphud";
        case MenuBadge.SALE:
            return "mpshopsale";
        case MenuBadge.GLOBE_WHITE:
        case MenuBadge.GLOBE_RED:
        case MenuBadge.GLOBE_BLUE:
        case MenuBadge.GLOBE_YELLOW:
        case MenuBadge.GLOBE_GREEN:
        case MenuBadge.GLOBE_ORANGE:
            return "mprankbadge";
        case MenuBadge.COUNTRY_USA:
        case MenuBadge.COUNTRY_UK:
        case MenuBadge.COUNTRY_SWEDEN:
        case MenuBadge.COUNTRY_KOREA:
        case MenuBadge.COUNTRY_JAPAN:
        case MenuBadge.COUNTRY_ITALY:
        case MenuBadge.COUNTRY_GERMANY:
        case MenuBadge.COUNTRY_FRANCE:
        case MenuBadge.BRAND_ALBANY:
        case MenuBadge.BRAND_ANNIS:
        case MenuBadge.BRAND_BANSHEE:
        case MenuBadge.BRAND_BENEFACTOR:
        case MenuBadge.BRAND_BF:
        case MenuBadge.BRAND_BOLLOKAN:
        case MenuBadge.BRAND_BRAVADO:
        case MenuBadge.BRAND_BRUTE:
        case MenuBadge.BRAND_BUCKINGHAM:
        case MenuBadge.BRAND_CANIS:
        case MenuBadge.BRAND_CHARIOT:
        case MenuBadge.BRAND_CHEVAL:
        case MenuBadge.BRAND_CLASSIQUE:
        case MenuBadge.BRAND_COIL:
        case MenuBadge.BRAND_DECLASSE:
        case MenuBadge.BRAND_DEWBAUCHEE:
        case MenuBadge.BRAND_DILETTANTE:
        case MenuBadge.BRAND_DINKA:
        case MenuBadge.BRAND_DUNDREARY:
        case MenuBadge.BRAND_EMPORER:
        case MenuBadge.BRAND_ENUS:
        case MenuBadge.BRAND_FATHOM:
        case MenuBadge.BRAND_GALIVANTER:
        case MenuBadge.BRAND_GROTTI:
        case MenuBadge.BRAND_HIJAK:
        case MenuBadge.BRAND_HVY:
        case MenuBadge.BRAND_IMPONTE:
        case MenuBadge.BRAND_INVETERO:
        case MenuBadge.BRAND_JACKSHEEPE:
        case MenuBadge.BRAND_JOBUILT:
        case MenuBadge.BRAND_KARIN:
        case MenuBadge.BRAND_LAMPADATI:
        case MenuBadge.BRAND_MAIBATSU:
        case MenuBadge.BRAND_MAMMOTH:
        case MenuBadge.BRAND_MTL:
        case MenuBadge.BRAND_NAGASAKI:
        case MenuBadge.BRAND_OBEY:
        case MenuBadge.BRAND_OCELOT:
        case MenuBadge.BRAND_OVERFLOD:
        case MenuBadge.BRAND_PED:
        case MenuBadge.BRAND_PEGASSI:
        case MenuBadge.BRAND_PFISTER:
        case MenuBadge.BRAND_PRINCIPE:
        case MenuBadge.BRAND_PROGEN:
        case MenuBadge.BRAND_SCHYSTER:
        case MenuBadge.BRAND_SHITZU:
        case MenuBadge.BRAND_SPEEDOPHILE:
        case MenuBadge.BRAND_STANLEY:
        case MenuBadge.BRAND_TRUFFADE:
        case MenuBadge.BRAND_UBERMACHT:
        case MenuBadge.BRAND_VAPID:
        case MenuBadge.BRAND_VULCAR:
        case MenuBadge.BRAND_WEENY:
        case MenuBadge.BRAND_WESTERN:
        case MenuBadge.BRAND_WESTERNMOTORCYCLE:
        case MenuBadge.BRAND_WILLARD:
        case MenuBadge.BRAND_ZIRCONIUM:
            return "mpcarhud";
        case MenuBadge.BRAND_GROTTI2:
        case MenuBadge.BRAND_LCC:
        case MenuBadge.BRAND_PROGEN2:
        case MenuBadge.BRAND_RUNE:
            return "mpcarhud2";
        case MenuBadge.INFO:
            return "shared";
        default:
            return "commonmenu";
    }
}
const Enabled = true;
function GetBadgeColour(badge, selected) {
    if (selected === void 0) { selected = false; }
    switch (badge) {
        case MenuBadge.CROWN:
        case MenuBadge.TICK:
        case MenuBadge.MALE:
        case MenuBadge.FEMALE:
        case MenuBadge.LOCK:
        case MenuBadge.LOCK_ARENA:
        case MenuBadge.ADVERSARY:
        case MenuBadge.BASE_JUMPING:
        case MenuBadge.BRIEFCASE:
        case MenuBadge.MISSION_STAR:
        case MenuBadge.DEATHMATCH:
        case MenuBadge.CASTLE:
        case MenuBadge.TROPHY:
        case MenuBadge.RACE_FLAG:
        case MenuBadge.RACE_FLAG_PLANE:
        case MenuBadge.RACE_FLAG_BICYCLE:
        case MenuBadge.RACE_FLAG_PERSON:
        case MenuBadge.RACE_FLAG_CAR:
        case MenuBadge.RACE_FLAG_BOAT_ANCHOR:
        case MenuBadge.ROCKSTAR:
        case MenuBadge.STUNT:
        case MenuBadge.STUNT_PREMIUM:
        case MenuBadge.RACE_FLAG_STUNT_JUMP:
        case MenuBadge.SHIELD:
        case MenuBadge.TEAM_DEATHMATCH:
        case MenuBadge.VEHICLE_DEATHMATCH:
        case MenuBadge.MP_SPECTATING:
        case MenuBadge.GLOBE_WHITE:
        case MenuBadge.AUDIO_MUTE:
        case MenuBadge.AUDIO_INACTIVE:
        case MenuBadge.AUDIO_VOL1:
        case MenuBadge.AUDIO_VOL2:
        case MenuBadge.AUDIO_VOL3:
        case MenuBadge.BRAND_ALBANY:
        case MenuBadge.BRAND_ANNIS:
        case MenuBadge.BRAND_BANSHEE:
        case MenuBadge.BRAND_BENEFACTOR:
        case MenuBadge.BRAND_BF:
        case MenuBadge.BRAND_BOLLOKAN:
        case MenuBadge.BRAND_BRAVADO:
        case MenuBadge.BRAND_BRUTE:
        case MenuBadge.BRAND_BUCKINGHAM:
        case MenuBadge.BRAND_CANIS:
        case MenuBadge.BRAND_CHARIOT:
        case MenuBadge.BRAND_CHEVAL:
        case MenuBadge.BRAND_CLASSIQUE:
        case MenuBadge.BRAND_COIL:
        case MenuBadge.BRAND_DECLASSE:
        case MenuBadge.BRAND_DEWBAUCHEE:
        case MenuBadge.BRAND_DILETTANTE:
        case MenuBadge.BRAND_DINKA:
        case MenuBadge.BRAND_DUNDREARY:
        case MenuBadge.BRAND_EMPORER:
        case MenuBadge.BRAND_ENUS:
        case MenuBadge.BRAND_FATHOM:
        case MenuBadge.BRAND_GALIVANTER:
        case MenuBadge.BRAND_GROTTI:
        case MenuBadge.BRAND_HIJAK:
        case MenuBadge.BRAND_HVY:
        case MenuBadge.BRAND_IMPONTE:
        case MenuBadge.BRAND_INVETERO:
        case MenuBadge.BRAND_JACKSHEEPE:
        case MenuBadge.BRAND_JOBUILT:
        case MenuBadge.BRAND_KARIN:
        case MenuBadge.BRAND_LAMPADATI:
        case MenuBadge.BRAND_MAIBATSU:
        case MenuBadge.BRAND_MAMMOTH:
        case MenuBadge.BRAND_MTL:
        case MenuBadge.BRAND_NAGASAKI:
        case MenuBadge.BRAND_OBEY:
        case MenuBadge.BRAND_OCELOT:
        case MenuBadge.BRAND_OVERFLOD:
        case MenuBadge.BRAND_PED:
        case MenuBadge.BRAND_PEGASSI:
        case MenuBadge.BRAND_PFISTER:
        case MenuBadge.BRAND_PRINCIPE:
        case MenuBadge.BRAND_PROGEN:
        case MenuBadge.BRAND_SCHYSTER:
        case MenuBadge.BRAND_SHITZU:
        case MenuBadge.BRAND_SPEEDOPHILE:
        case MenuBadge.BRAND_STANLEY:
        case MenuBadge.BRAND_TRUFFADE:
        case MenuBadge.BRAND_UBERMACHT:
        case MenuBadge.BRAND_VAPID:
        case MenuBadge.BRAND_VULCAR:
        case MenuBadge.BRAND_WEENY:
        case MenuBadge.BRAND_WESTERN:
        case MenuBadge.BRAND_WESTERNMOTORCYCLE:
        case MenuBadge.BRAND_WILLARD:
        case MenuBadge.BRAND_ZIRCONIUM:
        case MenuBadge.BRAND_GROTTI2:
        case MenuBadge.BRAND_LCC:
        case MenuBadge.BRAND_PROGEN2:
        case MenuBadge.BRAND_RUNE:
            return selected ? (Enabled ? new Color(0, 0, 0) : new Color(50, 50, 50)) : (Enabled ? new Color(255, 255, 255) : new Color(109, 109, 109));
        case MenuBadge.GLOBE_BLUE:
            return Enabled ? new Color(10, 103, 166) : new Color(11, 62, 117);
        case MenuBadge.GLOBE_GREEN:
            return Enabled ? new Color(10, 166, 85) : new Color(5, 71, 22);
        case MenuBadge.GLOBE_ORANGE:
            return Enabled ? new Color(232, 145, 14) : new Color(133, 77, 12);
        case MenuBadge.GLOBE_RED:
            return Enabled ? new Color(207, 43, 31) : new Color(110, 7, 7);
        case MenuBadge.GLOBE_YELLOW:
            return Enabled ? new Color(232, 207, 14) : new Color(131, 133, 12);
        default:
            return Enabled ? new Color(255, 255, 255) : new Color(109, 109, 109);
    }
}
var MpInventoryTexture = new TextureDictionnary("mpinventory", [
    "deathmatch",
    "race_air",
    "race_bike",
    "race_boat",
    "race_foot",
    "race_land",
    "team_deathmatch",
    "vehicle_deathmatch"
]);
var CommonMenuTextureTu = new TextureDictionnary("commonmenutu", [
    "deathmatch",
    "race_air",
    "race_bike",
    "race_boat",
    "race_foot",
    "race_land",
    "team_deathmatch",
    "vehicle_deathmatch"
]);
var CommonMenuTexture = new TextureDictionnary("commonmenu", [
    "arrowleft",
    "arrowright",
    "bettingbox_centre",
    "bettingbox_left",
    "bettingbox_right",
    "common_medal",
    "gradient_bgd",
    "gradient_nav",
    "header_gradient_script",
    "interaction_bgd",
    "medal_bronze",
    "medal_gold",
    "medal_silver",
    "mp_alerttriangle",
    "mp_hostcrown",
    "mp_medal_bronze",
    "mp_medal_gold",
    "mp_medal_silver",
    "mp_specitem_cash",
    "mp_specitem_coke",
    "mp_specitem_heroin",
    "mp_specitem_meth",
    "mp_specitem_weed",
    "shop_ammo_icon_a",
    "shop_ammo_icon_b",
    "shop_armour_icon_a",
    "shop_armour_icon_b",
    "shop_arrows_upanddown",
    "shop_barber_icon_a",
    "shop_barber_icon_b",
    "shop_box_blank",
    "shop_box_blankb",
    "shop_box_cross",
    "shop_box_crossb",
    "shop_box_tick",
    "shop_box_tickb",
    "shop_clothing_icon_a",
    "shop_clothing_icon_b",
    "shop_franklin_icon_a",
    "shop_franklin_icon_b",
    "shop_garage_bike_icon_a",
    "shop_garage_bike_icon_b",
    "shop_garage_icon_a",
    "shop_garage_icon_b",
    "shop_gunclub_icon_a",
    "shop_gunclub_icon_b",
    "shop_health_icon_a",
    "shop_health_icon_b",
    "shop_lock",
    "shop_makeup_icon_a",
    "shop_makeup_icon_b",
    "shop_mask_icon_a",
    "shop_mask_icon_b",
    "shop_michael_icon_a",
    "shop_michael_icon_b",
    "shop_new_star",
    "shop_tattoos_icon_a",
    "shop_tattoos_icon_b",
    "shop_tick_icon",
    "shop_trevor_icon_a",
    "shop_trevor_icon_b"
]);

var SOUND_SELECT = new Sound("SELECT");
var SOUND_BACK = new Sound("BACK");
var SOUND_NAV_LEFT_RIGHT = new Sound("NAV_LEFT_RIGHT");
var SOUND_NAV_UP_DOWN = new Sound("NAV_UP_DOWN");
var MenuItem = (function () {
    function MenuItem(displayText, data, caption, badge, rightLabel, textColor, backgroundColor, hoverTextColor, hoverBackgroundColor) {
        if (caption === void 0) { caption = ""; }
        if (badge === void 0) { badge = NaN; }
        if (textColor === void 0) { textColor = new Color(255, 255, 255, 240); }
        if (backgroundColor === void 0) { backgroundColor = new Color(0, 0, 0, 120); }
        if (hoverTextColor === void 0) { hoverTextColor = new Color(0, 0, 0, 240); }
        if (hoverBackgroundColor === void 0) { hoverBackgroundColor = new Color(255, 255, 255, 170); }
        this.displayText = displayText;
        this.rightLabel = rightLabel;
        this.data = data;
        this.caption = caption;
        this.badge = badge;
        this._textColor = textColor;
        this._backgroundColor = backgroundColor;
        this._hoverTextColor = hoverTextColor;
        this._hoverBackgroundColor = hoverBackgroundColor;
        this._isSelect = false;
        this.onClickEvents = [];
        this.onSelectEvents = [];
    }
    Object.defineProperty(MenuItem.prototype, "isSelect", {
        set: function (value) {
            var _this = this;
            this._isSelect = value;
            if (this._isSelect && !(this instanceof CloseMenuItem)) {
                this.onSelectEvents.forEach(function (event) {
                    event.trigger(_this instanceof ListMenuItem ? _this.data[_this.dataCurrentIndex] : _this.data);
                });
                var currentMenuInstance = MenuPool.getCurrentMenu();
                if (currentMenuInstance.onEventMenu != null && typeof currentMenuInstance.onEventMenu.select !== "undefined") {
                    currentMenuInstance.onEventMenu.select(this, this instanceof ListMenuItem ? this.data[this.dataCurrentIndex] : this.data);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    MenuItem.prototype.addOnClickEvent = function (onClickEvent) {
        this.onClickEvents.push(onClickEvent);
    };
    MenuItem.prototype.addOnSelectEvent = function (onSelectEvent) {
        this.onSelectEvents.push(onSelectEvent);
    };
    MenuItem.prototype.render = function (x, y, yCaption) {
        var _this = this;
        this.draw(x, y, yCaption);
        if (this._isSelect && Date.now() - MainMenu.CONTROL_TICK_TIME_MS > MainMenu.LAST_TICK_TIME) {
            if (mp.game.controls.isControlJustReleased(0, Control.INPUT_FRONTEND_ACCEPT)) {
                SOUND_SELECT.playSound();
                this.onClickEvents.forEach(function (event) {
                    event.trigger(_this instanceof ListMenuItem ? _this.data[_this.dataCurrentIndex] : _this.data);
                });
                if (!(this instanceof CloseMenuItem)) {
                    var currentMenuInstance = MenuPool.getCurrentMenu();
                    if (currentMenuInstance.onEventMenu != null && typeof currentMenuInstance.onEventMenu.click !== "undefined") {
                        currentMenuInstance.onEventMenu.click(this, this instanceof ListMenuItem ? this.data[this.dataCurrentIndex] : this.data);
                    }
                }
                MainMenu.LAST_TICK_TIME = Date.now();
            }
        }
    };
    MenuItem.prototype.draw = function (x, y, yCaption) {
        mp.game.graphics.drawRect(x, y + MainMenu.MENU_DRAW_OFFSET_Y, MainMenu.MENU_WIDTH, MainMenu.MENU_HEIGHT, this.backgroundColor.red, this.backgroundColor.green, this.backgroundColor.blue, this.backgroundColor.alpha);
        var xOffset = x - MainMenu.MENU_DRAW_OFFSET_X + (0.004 * MainMenu.SCREEN_RATIO_WIDTH);
        var tt = " " +this.displayText;
        if (!isNaN(this.badge)) {
            const Dictonary = GetBadgeDictionary(this.badge);
            //tt += " D: " + Dictonary;
            const cdict = new TextureDictionnary(Dictonary, [
                MenuBadgeToSpriteName(this.badge, this._isSelect),
            ]);
            //switch (this.badge) {
            //    case 34:
            //    case 35:
            //    case 36:
            //        MpInventoryTexture.draw(MenuBadgeToSpriteName(this.badge, this._isSelect), x - MainMenu.MENU_DRAW_OFFSET_X + (0.015 * MainMenu.SCREEN_RATIO_WIDTH), y + MainMenu.MENU_DRAW_OFFSET_Y, (0.025 * MainMenu.SCREEN_RATIO_WIDTH), (0.035 * MainMenu.SCREEN_RATIO_HEIGHT), new Color(160, 160, 160), 0);
            //        break;
            //    default:
            //        CommonMenuTexture.draw(MenuBadgeToSpriteName(this.badge, this._isSelect), x - MainMenu.MENU_DRAW_OFFSET_X + (0.015 * MainMenu.SCREEN_RATIO_WIDTH), y + MainMenu.MENU_DRAW_OFFSET_Y, (0.025 * MainMenu.SCREEN_RATIO_WIDTH), (0.035 * MainMenu.SCREEN_RATIO_HEIGHT), new Color(160, 160, 160), 0);
            //        break;
            //}
            const badgeColor = GetBadgeColour(this.badge, this._isSelect);
            cdict.draw(MenuBadgeToSpriteName(this.badge, this._isSelect), x - MainMenu.MENU_DRAW_OFFSET_X + (0.015 * MainMenu.SCREEN_RATIO_WIDTH), y + MainMenu.MENU_DRAW_OFFSET_Y, (0.025 * MainMenu.SCREEN_RATIO_WIDTH), (0.035 * MainMenu.SCREEN_RATIO_HEIGHT), badgeColor, 0);
            xOffset += (0.023 * MainMenu.SCREEN_RATIO_WIDTH);
        }
        
        if (this._isSelect) {
            tt = tt.replace("~r~", "").replace("~g~", "").replace("~b~", "").replace("~o~","");
        } 
        drawText(tt, [xOffset, y + (0.005 * MainMenu.SCREEN_RATIO_HEIGHT)], this.textColor);

        if (typeof this.rightLabel !== "undefined" && this.rightLabel !== "null") {
            var right = this.rightLabel;
            drawText(right, [x + MainMenu.MENU_DRAW_OFFSET_X - ((right.length * 0.009) * MainMenu.SCREEN_RATIO_WIDTH), y + MainMenu.MENU_DRAW_OFFSET_Y - 0.010], this.textColor);
        }
        if (this._isSelect && this.caption.length > 0) {
            var numberOfLine = Math.ceil(getTextWidth(this.caption) + 0.01 / MainMenu.MENU_WIDTH);
            var textLengthPerLine = this.caption.length / numberOfLine;
            var textureHeight = MainMenu.MENU_HEIGHT * numberOfLine;
            CommonMenuTexture.draw("gradient_nav", x, yCaption + textureHeight / 2 - 0.005, MainMenu.MENU_WIDTH, textureHeight, new Color(this._backgroundColor.red, this._backgroundColor.green, this._backgroundColor.blue, 220), 270);
            for (var i = 0; i < numberOfLine; i++) {
                drawText(this.caption.substring(i * textLengthPerLine, (i + 1) * textLengthPerLine), [x - MainMenu.MENU_DRAW_OFFSET_X + (0.004 * MainMenu.SCREEN_RATIO_WIDTH), yCaption + (-0.001 * MainMenu.SCREEN_RATIO_HEIGHT) + i * MainMenu.MENU_HEIGHT], this._textColor);
            }
        }
    };
    Object.defineProperty(MenuItem.prototype, "hoverTextColor", {
        get: function () {
            return this._hoverTextColor;
        },
        set: function (value) {
            this._hoverTextColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuItem.prototype, "hoverBackgroundColor", {
        get: function () {
            return this._hoverBackgroundColor;
        },
        set: function (value) {
            this._hoverBackgroundColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuItem.prototype, "textColor", {
        get: function () {
            return this._isSelect ? this._hoverTextColor : this._textColor;
        },
        set: function (value) {
            this._textColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuItem.prototype, "backgroundColor", {
        get: function () {
            return this._isSelect ? this._hoverBackgroundColor : this._backgroundColor;
        },
        set: function (value) {
            this._backgroundColor = value;
        },
        enumerable: true,
        configurable: true
    });
    return MenuItem;
}());
var TextMenuItem = (function (_super) {
    __extends(TextMenuItem, _super);
    function TextMenuItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TextMenuItem;
}(MenuItem));
var CheckboxMenuItem = (function (_super) {
    __extends(CheckboxMenuItem, _super);
    function CheckboxMenuItem(displayText, data, caption, badge, textColor, backgroundColor, hoverTextColor, hoverBackgroundColor) {
        if (data === void 0) { data = false; }
        var _this = _super.call(this, displayText, data, caption, badge, textColor, backgroundColor, hoverTextColor, hoverBackgroundColor) || this;
        _this.addOnClickEvent({
            trigger: function (data) {
                _this.data = !_this.data;
            }
        });
        return _this;
    }
    ;
    CheckboxMenuItem.prototype.draw = function (x, y, yCaption) {
        _super.prototype.draw.call(this, x, y, yCaption);
        CommonMenuTexture.draw(this.data ? "shop_box_tick" : "shop_box_blank", x + MainMenu.MENU_DRAW_OFFSET_X - (0.015 * MainMenu.SCREEN_RATIO_WIDTH), y + MainMenu.MENU_DRAW_OFFSET_Y, (0.025 * MainMenu.SCREEN_RATIO_WIDTH), (0.035 * MainMenu.SCREEN_RATIO_HEIGHT), new Color(), 0);
    };
    return CheckboxMenuItem;
}(MenuItem));
var ListMenuItem = (function (_super) {
    __extends(ListMenuItem, _super);
    function ListMenuItem(displayText, data, defaultIndex, caption, badge, textColor, backgroundColor, hoverTextColor, hoverBackgroundColor) {
        if (defaultIndex === void 0) { defaultIndex = 0; }
        var _this = _super.call(this, displayText, data, caption, badge, textColor, backgroundColor, hoverTextColor, hoverBackgroundColor) || this;
        _this.onChangeEvents = [];
        _this.firstRender = true;
        _this.defaultIndex = defaultIndex;
        return _this;
    }
    ListMenuItem.prototype.addOnChangeEvent = function (onChangeEvent) {
        this.onChangeEvents.push(onChangeEvent);
    };
    ListMenuItem.prototype.render = function (x, y, yCaption) {
        if (this.data.length > 0) {
            if (this.firstRender) {
                this.setToItem(this.defaultIndex, false);
                this.firstRender = false;
            }
            if (this._isSelect && Date.now() - MainMenu.CONTROL_TICK_TIME_MS > MainMenu.LAST_TICK_TIME) {
                var newIndex = NaN;
                if (mp.game.controls.isControlPressed(0, Control.INPUT_CELLPHONE_RIGHT)) {
                    this.setToItem(this.dataCurrentIndex + 1, true);
                }
                else {
                    if (mp.game.controls.isControlPressed(0, Control.INPUT_CELLPHONE_LEFT)) {
                        this.setToItem(this.dataCurrentIndex - 1, true);
                    }
                }
            }
        }
        _super.prototype.render.call(this, x, y, yCaption);
    };
    ListMenuItem.prototype.draw = function (x, y, yCaption) {
        _super.prototype.draw.call(this, x, y, yCaption);
        if (this.data.length > 0) {
            if (!isNaN(this.dataCurrentIndex) && this.data[this.dataCurrentIndex].DisplayText != null) {
                var xRightArrowPosition = x + MainMenu.MENU_DRAW_OFFSET_X - (0.015 * MainMenu.SCREEN_RATIO_WIDTH);
                var xLeftArrowPosition = xRightArrowPosition - getTextWidth(this.data[this.dataCurrentIndex].DisplayText) - (0.015 * MainMenu.SCREEN_RATIO_WIDTH);
                CommonMenuTexture.draw("arrowleft", xLeftArrowPosition, y + MainMenu.MENU_DRAW_OFFSET_Y, (0.025 * MainMenu.SCREEN_RATIO_WIDTH), (0.035 * MainMenu.SCREEN_RATIO_HEIGHT), this.textColor, 0);
                CommonMenuTexture.draw("arrowright", xRightArrowPosition, y + MainMenu.MENU_DRAW_OFFSET_Y, (0.025 * MainMenu.SCREEN_RATIO_WIDTH), (0.035 * MainMenu.SCREEN_RATIO_HEIGHT), this.textColor, 0);
                drawText(this.data[this.dataCurrentIndex].DisplayText, [(xLeftArrowPosition + xRightArrowPosition) / 2, y + (0.005 * MainMenu.SCREEN_RATIO_HEIGHT)], this.textColor, 0, [0.35, 0.35], true);
            }
        }
    };
    ListMenuItem.prototype.setToItem = function (newIndex, withSound = false) {
        var _this = this;
        if (withSound === void 0) { withSound = true; }
        if (newIndex < 0) {
            this.dataCurrentIndex = this.data.length - 1;
        }
        else {
            this.dataCurrentIndex = newIndex % this.data.length;
        }
        if (withSound) {
            SOUND_NAV_LEFT_RIGHT.playSound();
        }
        MainMenu.LAST_TICK_TIME = Date.now();
        this.onChangeEvents.forEach(function (value) {
            value.trigger(_this.data[_this.dataCurrentIndex]);
        });
    };
    return ListMenuItem;
}(MenuItem));
var SliderMenuItem = (function (_super) {
    __extends(SliderMenuItem, _super);
    function SliderMenuItem(displayText, min, max, step, data, caption, badge, textColor, backgroundColor, hoverTextColor, hoverBackgroundColor) {
        if (data === void 0) { data = NaN; }
        var _this = _super.call(this, displayText, data, caption, badge, textColor, backgroundColor, hoverTextColor, hoverBackgroundColor) || this;
        _this.min = min;
        _this.max = max;
        _this.step = step;
        if (isNaN(data)) {
            _this.data = Math.floor((_this.min + _this.max) / 2);
        }
        _this.firstRender = true;
        _this.onChangeEvents = [];
        return _this;
    }
    ;
    SliderMenuItem.prototype.addOnChangeEvent = function (onChangeEvent) {
        this.onChangeEvents.push(onChangeEvent);
    };
    SliderMenuItem.prototype.render = function (x, y, yCaption) {
        if (this.firstRender) {
            this.setToValue(this.data, false);
            this.firstRender = false;
        }
        if (this._isSelect && Date.now() - MainMenu.CONTROL_TICK_TIME_MS > MainMenu.LAST_TICK_TIME) {
            if (mp.game.controls.isControlPressed(0, Control.INPUT_CELLPHONE_RIGHT)) {
                this.setToValue(this.data + this.step);
            }
            else {
                if (mp.game.controls.isControlPressed(0, Control.INPUT_CELLPHONE_LEFT)) {
                    this.setToValue(this.data - this.step);
                }
            }
        }
        _super.prototype.render.call(this, x, y, yCaption);
    };
    SliderMenuItem.prototype.draw = function (x, y, yCaption) {
        _super.prototype.draw.call(this, x, y, yCaption);
        var xMargin = (0.015 * MainMenu.SCREEN_RATIO_WIDTH);
        var xOffset = x + MainMenu.MENU_DRAW_OFFSET_X - xMargin;
        var sliderWidth = MainMenu.MENU_WIDTH / 2.5;
        var sliderHeight = MainMenu.MENU_HEIGHT / 4;
        var xPosition = xOffset - (sliderWidth / 2);
        mp.game.graphics.drawRect(xPosition, y + MainMenu.MENU_DRAW_OFFSET_Y, sliderWidth, sliderHeight, 52, 73, 94, 255);
        var xDataPosition = xOffset - sliderWidth + (sliderWidth / ((this.max - this.min) / this.step) * ((this.data + Math.abs(this.min)) / this.step));
        mp.game.graphics.drawRect(xDataPosition, y + MainMenu.MENU_DRAW_OFFSET_Y, 0.004, sliderHeight * 2, this.textColor.red, this.textColor.green, this.textColor.blue, this.textColor.alpha);
        var arrowWidth = (0.015 * MainMenu.SCREEN_RATIO_WIDTH);
        var xLeftArrowPosition = xOffset - sliderWidth - (arrowWidth / 2);
        CommonMenuTexture.draw("arrowleft", xLeftArrowPosition, y + MainMenu.MENU_DRAW_OFFSET_Y, arrowWidth, (0.025 * MainMenu.SCREEN_RATIO_HEIGHT), this.textColor, 0);
        CommonMenuTexture.draw("arrowright", xOffset + (arrowWidth / 2), y + MainMenu.MENU_DRAW_OFFSET_Y, arrowWidth, (0.025 * MainMenu.SCREEN_RATIO_HEIGHT), this.textColor, 0);
    };
    SliderMenuItem.prototype.setToValue = function (newValue, withSound) {
        var _this = this;
        if (withSound === void 0) { withSound = true; }
        if (newValue < this.min) {
            this.data = this.max;
        }
        else {
            if (newValue > this.max) {
                this.data = this.min;
            }
            else {
                this.data = newValue;
            }
        }
        if (withSound) {
            SOUND_NAV_LEFT_RIGHT.playSound();
        }
        MainMenu.LAST_TICK_TIME = Date.now();
        this.onChangeEvents.forEach(function (value) {
            value.trigger(_this.data);
        });
    };
    return SliderMenuItem;
}(MenuItem));
var CloseMenuItem = (function (_super) {
    __extends(CloseMenuItem, _super);
    function CloseMenuItem(displayText) {
        if (displayText === void 0) { displayText = "Close"; }
        var _this = _super.call(this, displayText, null) || this;
        _this._textColor = new Color(255, 255, 255, 255);
        _this._backgroundColor = new Color(242, 67, 67, 204);
        _this.hoverBackgroundColor = new Color(242, 67, 67, 255);
        _this.hoverTextColor = new Color(255, 255, 255, 255);
        return _this;
    }
    return CloseMenuItem;
}(TextMenuItem));
var Menu = (function () {
    function Menu(isVisible) {
        if (isVisible === void 0) { isVisible = true; }
        this.menuItems = [];
        this.currentIndexMenuItems = 0;
        this.onEventMenu = null;
        this._isVisible = isVisible;
        MenuPool.MenuInstances.push(this);
    }
    Menu.prototype.add = function (menuItem) {
        var _this = this;
        this.menuItems.push(menuItem);
        if (menuItem instanceof CloseMenuItem) {
            menuItem.addOnClickEvent({
                trigger: function () {
                    _this.isVisible = false;
                }
            });
        }
    };
    Menu.prototype.setEventMenu = function (eventMenu) {
        this.onEventMenu = eventMenu;
    };
    Menu.prototype.render = function (x, y) {
        this.draw(x, y);
    };
    Menu.prototype.draw = function (x, y) {
        if (this.currentIndexMenuItems >= MainMenu.MAX_MENU_DISPLAY) {
            CommonMenuTexture.draw("gradient_nav", x, y + MainMenu.MENU_ARROW_DOWN_HEIGHT / 2, MainMenu.MENU_WIDTH, MainMenu.MENU_ARROW_DOWN_HEIGHT, new Color(0, 0, 0, 190), 90);
            CommonMenuTexture.draw("arrowleft", x, y + MainMenu.MENU_ARROW_DOWN_HEIGHT / 2, (0.015 * MainMenu.SCREEN_RATIO_WIDTH), (0.025 * MainMenu.SCREEN_RATIO_HEIGHT), new Color(255, 255, 255, 200), 90);
            y += MainMenu.MENU_ARROW_DOWN_HEIGHT;
        }
        var i = Math.max(0, this.currentIndexMenuItems + 1 - MainMenu.MAX_MENU_DISPLAY);
        var to = Math.min(i + MainMenu.MAX_MENU_DISPLAY, this.menuItems.length);
        var captionYOffset = y + ((to - i) * MainMenu.MENU_HEIGHT) + (0.02 * MainMenu.SCREEN_RATIO_HEIGHT);
        for (; i < to; i++) {
            this.menuItems[i].render(x, y, captionYOffset);
            y += MainMenu.MENU_HEIGHT;
        }
        if (this.menuItems.length > MainMenu.MAX_MENU_DISPLAY && this.currentIndexMenuItems < this.menuItems.length - 1) {
            CommonMenuTexture.draw("gradient_nav", x, y + MainMenu.MENU_ARROW_DOWN_HEIGHT / 2, MainMenu.MENU_WIDTH, MainMenu.MENU_ARROW_DOWN_HEIGHT, new Color(0, 0, 0, 190), 270);
            CommonMenuTexture.draw("arrowleft", x, y + MainMenu.MENU_ARROW_DOWN_HEIGHT / 2, (0.015 * MainMenu.SCREEN_RATIO_WIDTH), (0.025 * MainMenu.SCREEN_RATIO_HEIGHT), new Color(255, 255, 255, 200), 270);
        } else {
            CommonMenuTexture.draw("gradient_nav", x, y + MainMenu.MENU_ARROW_DOWN_HEIGHT / 2, MainMenu.MENU_WIDTH, MainMenu.MENU_ARROW_DOWN_HEIGHT, new Color(0, 0, 0, 165), 270);
            CommonMenuTexture.draw("arrowleft", x, y + MainMenu.MENU_ARROW_DOWN_HEIGHT / 2, (0.015 * MainMenu.SCREEN_RATIO_WIDTH), (0.025 * MainMenu.SCREEN_RATIO_HEIGHT), new Color(255, 255, 255, 200), 270);
        }
    };
    Object.defineProperty(Menu.prototype, "isVisible", {
        get: function () {
            return this._isVisible;
        },
        set: function (value) {
            this._isVisible = value;
            try {
                if (value) {
                    this.setToItem(0, false);
                    //SOUND_NAV_LEFT_RIGHT.playSound();
                }
                else {
                    this.menuItems[this.currentIndexMenuItems].isSelect = false;
                    //SOUND_BACK.playSound();
                }
            } catch (e) {
                console.log(e);
            }
        },
        enumerable: true,
        configurable: true
    });
    Menu.prototype.setToItem = function (newIndex, withSound = false) {
        if (withSound === void 0) { withSound = true; }
        if (this.menuItems.length > 0) {
            this.menuItems[this.currentIndexMenuItems].isSelect = false;
            if (newIndex < 0) {
                newIndex = this.menuItems.length - 1;
            }
            else {
                newIndex %= this.menuItems.length;
            }
            if (withSound) {
                SOUND_NAV_UP_DOWN.playSound();
            }
            this.currentIndexMenuItems = newIndex;
            this.menuItems[this.currentIndexMenuItems].isSelect = true;
            MainMenu.LAST_TICK_TIME = new Date().getTime();
        }
    };
    return Menu;
}());
var SubMenuItem = (function (_super) {
    __extends(SubMenuItem, _super);
    function SubMenuItem(displayText, data, caption, badge, textColor, backgroundColor, hoverTextColor, hoverBackgroundColor) {
        var _this = _super.call(this, displayText, data, caption, badge, textColor, backgroundColor, hoverTextColor, hoverBackgroundColor) || this;
        _this.menu = new Menu(false);
        return _this;
    }
    SubMenuItem.prototype.add = function (menuItem) {
        this.menu.add(menuItem);
    };
    SubMenuItem.prototype.render = function (x, y, yCaption) {
        if (this._isSelect) {
            this.menu.render(x + MainMenu.MENU_WIDTH, y);
            if (Date.now() - MainMenu.CONTROL_TICK_TIME_MS > MainMenu.LAST_TICK_TIME) {
                if (mp.game.controls.isControlPressed(0, Control.INPUT_CELLPHONE_RIGHT)) {
                    MenuPool.displaySubMenu(this.menu);
                }
                else {
                    if (mp.game.controls.isControlPressed(0, Control.INPUT_CELLPHONE_LEFT)) {
                        MenuPool.removeSubMenu(this.menu);
                        MainMenu.LAST_TICK_TIME = Date.now();
                    }
                }
            }
        }
        this.draw(x, y, yCaption);
    };
    SubMenuItem.prototype.draw = function (x, y, yCaption) {
        _super.prototype.draw.call(this, x, y, yCaption);
        CommonMenuTexture.draw("arrowright", x + MainMenu.MENU_DRAW_OFFSET_X - (0.015 * MainMenu.SCREEN_RATIO_WIDTH), y + MainMenu.MENU_DRAW_OFFSET_Y, (0.025 * MainMenu.SCREEN_RATIO_WIDTH), (0.035 * MainMenu.SCREEN_RATIO_HEIGHT), this.textColor, 0);
    };
    return SubMenuItem;
}(MenuItem));
var menuHeader = new TextureDictionnary("mpentry", [
    "mp_main_gradient",
    "mp_modeselected_gradient",
    "mp_modenotselected_gradient",
]);
var spcityraces = new TextureDictionnary("spcityraces", [
    "airport",
    "citycircuit",
    "terminal",
	"vespuccicanal",
]);
var admin = new TextureDictionnary("spsearaces", [
	"canyon",
	"lossantos"
]);
var off = new TextureDictionnary("sproffroad", [
	"spr_offroad_1",
	"spr_offroad_2",
	"spr_offroad_3",
	"spr_offroad_4",
	"spr_offroad_5",
]);
var shopbarbier = new TextureDictionnary("shopui_title_barber4", ["shopui_title_barber4"]);
var shopDiscount = new TextureDictionnary("shopui_title_lowendfashion", ["shopui_title_lowendfashion"]);
var shopBinco = new TextureDictionnary("shopui_title_lowendfashion2", ["shopui_title_lowendfashion2"]);
var shopSuburban = new TextureDictionnary("shopui_title_midfashion", ["shopui_title_midfashion"]);
var shopPonsonbys = new TextureDictionnary("shopui_title_highendfashion", ["shopui_title_highendfashion"]);
var tanke = new TextureDictionnary("shopui_title_gasstation", ["shopui_title_gasstation"]);
var shop = new TextureDictionnary("shopui_title_conveniencestore", ["shopui_title_conveniencestore"]);
var gunshop = new TextureDictionnary("shopui_title_gunclub", ["shopui_title_gunclub"]);
var tattoo1 = new TextureDictionnary("shopui_title_tattoos", ["shopui_title_tattoos"]);
var tattoo2 = new TextureDictionnary("shopui_title_tattoos2", ["shopui_title_tattoos2"]);
var tattoo3 = new TextureDictionnary("shopui_title_tattoos3", ["shopui_title_tattoos3"]);
var tattoo4 = new TextureDictionnary("shopui_title_tattoos4", ["shopui_title_tattoos4"]);
var tattoo5 = new TextureDictionnary("shopui_title_tattoos5", ["shopui_title_tattoos5"]);
var lsc = new TextureDictionnary("shopui_title_carmod", ["shopui_title_carmod"]);
var beeker = new TextureDictionnary("shopui_title_carmod2", ["shopui_title_carmod2"]);

var MainMenu = (function (_super) {
    __extends(MainMenu, _super);
    function MainMenu(title, isVisible, header) {
        if (title === void 0) { title = ""; }
        if (isVisible === void 0) { isVisible = true; }
		if (header === void 0) { header = ""; }
        var _this = _super.call(this, isVisible) || this;
        _this.title = title;
        _this.firstRender = true;
		_this.header = header;
        return _this;
    }
    Object.defineProperty(MainMenu.prototype, "title", {
        set: function (value) {
            this._title = value;
        },
        enumerable: true,
        configurable: true
    });
    MainMenu.prototype.render = function (x, y) {
        if (this.isVisible) {
            if (this.firstRender) {
                this.setToItem(0, false);
                this.firstRender = false;
            }
            this.setResolutionRatio();
            if (x < MainMenu.MENU_DRAW_OFFSET_X) {
                x += MainMenu.MENU_DRAW_OFFSET_X;
            }
            if (y < MainMenu.MAIN_MENU_HEIGHT_OFFSET_Y) {
                y += MainMenu.MAIN_MENU_HEIGHT;
            }
            x = Math.min(x, 1 - MainMenu.MENU_DRAW_OFFSET_X);
            y = Math.min(y, 1 - MainMenu.MAIN_MENU_HEIGHT_OFFSET_Y);
			
			switch(this.header){
				case "lsc":
					lsc.draw("shopui_title_carmod", x, y, MainMenu.MENU_WIDTH, MainMenu.MAIN_MENU_HEIGHT + (MainMenu.MAIN_MENU_HEIGHT_OFFSET_Y - 0.015), new Color(255, 255, 255, 255), 0);
					break;
				case "beeker":
					beeker.draw("shopui_title_carmod2", x, y, MainMenu.MENU_WIDTH, MainMenu.MAIN_MENU_HEIGHT + (MainMenu.MAIN_MENU_HEIGHT_OFFSET_Y - 0.015), new Color(255, 255, 255, 255), 0);
					break;
				case "barbier":
					shopbarbier.draw("shopui_title_barber4", x, y, MainMenu.MENU_WIDTH, MainMenu.MAIN_MENU_HEIGHT + (MainMenu.MAIN_MENU_HEIGHT_OFFSET_Y - 0.015), new Color(255, 255, 255, 255), 0);
					break;
				case "shop":
					shop.draw("shopui_title_conveniencestore", x, y, MainMenu.MENU_WIDTH, MainMenu.MAIN_MENU_HEIGHT + (MainMenu.MAIN_MENU_HEIGHT_OFFSET_Y - 0.015), new Color(255, 255, 255, 255), 0);
					break;
				case "discount_store":
					shopDiscount.draw("shopui_title_lowendfashion", x, y, MainMenu.MENU_WIDTH, MainMenu.MAIN_MENU_HEIGHT + (MainMenu.MAIN_MENU_HEIGHT_OFFSET_Y - 0.015), new Color(255, 255, 255, 255), 0);
					break;
				case "binco":
					shopBinco.draw("shopui_title_lowendfashion2", x, y, MainMenu.MENU_WIDTH, MainMenu.MAIN_MENU_HEIGHT + (MainMenu.MAIN_MENU_HEIGHT_OFFSET_Y - 0.015), new Color(255, 255, 255, 255), 0);
					break;
				case "suburban":
					shopSuburban.draw("shopui_title_midfashion", x, y, MainMenu.MENU_WIDTH, MainMenu.MAIN_MENU_HEIGHT + (MainMenu.MAIN_MENU_HEIGHT_OFFSET_Y - 0.015), new Color(255, 255, 255, 255), 0);
					break;
				case "ponson":
					shopPonsonbys.draw("shopui_title_highendfashion", x, y, MainMenu.MENU_WIDTH, MainMenu.MAIN_MENU_HEIGHT + (MainMenu.MAIN_MENU_HEIGHT_OFFSET_Y - 0.015), new Color(255, 255, 255, 255), 0);
					break;
				case "tanke":
					tanke.draw("shopui_title_gasstation", x, y, MainMenu.MENU_WIDTH, MainMenu.MAIN_MENU_HEIGHT + (MainMenu.MAIN_MENU_HEIGHT_OFFSET_Y - 0.015), new Color(255, 255, 255, 255), 0);
					break;
				case "ammunation":
					gunshop.draw("shopui_title_gunclub", x, y, MainMenu.MENU_WIDTH, MainMenu.MAIN_MENU_HEIGHT + (MainMenu.MAIN_MENU_HEIGHT_OFFSET_Y - 0.015), new Color(255, 255, 255, 255), 0);
					break;
				case "tattoo1":
					tattoo1.draw("shopui_title_tattoos", x, y, MainMenu.MENU_WIDTH, MainMenu.MAIN_MENU_HEIGHT + (MainMenu.MAIN_MENU_HEIGHT_OFFSET_Y - 0.015), new Color(255, 255, 255, 255), 0);
					break;
				case "tattoo2":
					tattoo2.draw("shopui_title_tattoos2", x, y, MainMenu.MENU_WIDTH, MainMenu.MAIN_MENU_HEIGHT + (MainMenu.MAIN_MENU_HEIGHT_OFFSET_Y - 0.015), new Color(255, 255, 255, 255), 0);
					break;
				case "tattoo3":
					tattoo3.draw("shopui_title_tattoos3", x, y, MainMenu.MENU_WIDTH, MainMenu.MAIN_MENU_HEIGHT + (MainMenu.MAIN_MENU_HEIGHT_OFFSET_Y - 0.015), new Color(255, 255, 255, 255), 0);
					break;
				case "tattoo4":
					tattoo4.draw("shopui_title_tattoos4", x, y, MainMenu.MENU_WIDTH, MainMenu.MAIN_MENU_HEIGHT + (MainMenu.MAIN_MENU_HEIGHT_OFFSET_Y - 0.015), new Color(255, 255, 255, 255), 0);
					break;
				case "tattoo5":
					tattoo5.draw("shopui_title_tattoos5", x, y, MainMenu.MENU_WIDTH, MainMenu.MAIN_MENU_HEIGHT + (MainMenu.MAIN_MENU_HEIGHT_OFFSET_Y - 0.015), new Color(255, 255, 255, 255), 0);
					break;
				case "loginAir":
					spcityraces.draw("airport", x, y, MainMenu.MENU_WIDTH, MainMenu.MAIN_MENU_HEIGHT + (MainMenu.MAIN_MENU_HEIGHT_OFFSET_Y - 0.015), new Color(255, 255, 255, 255), 0);
					drawText(this._title, [x, y - (MainMenu.MAIN_MENU_HEIGHT_OFFSET_Y / 2)], new Color(0,0,255), 1, [1, 1], true);
					break;
				case "loginTerminal":
					spcityraces.draw("airport", x, y, MainMenu.MENU_WIDTH, MainMenu.MAIN_MENU_HEIGHT + (MainMenu.MAIN_MENU_HEIGHT_OFFSET_Y - 0.015), new Color(255, 255, 255, 255), 0);
					//drawText(this._title, [x, y - (MainMenu.MAIN_MENU_HEIGHT_OFFSET_Y / 2)], new Color(12,179,85,255), 4, [1, 1], true);
					break;
				case "admin":
					admin.draw("canyon", x, y, MainMenu.MENU_WIDTH, MainMenu.MAIN_MENU_HEIGHT + (MainMenu.MAIN_MENU_HEIGHT_OFFSET_Y - 0.015), new Color(255, 255, 255, 255), 0);
					drawText(this._title, [x, y - (MainMenu.MAIN_MENU_HEIGHT_OFFSET_Y / 2)], new Color(), 1, [1, 1], true);
					break;
				default:
					//CommonMenuTexture.draw("interaction_bgd", x, y, MainMenu.MENU_WIDTH, MainMenu.MAIN_MENU_HEIGHT + (MainMenu.MAIN_MENU_HEIGHT_OFFSET_Y - 0.015), new Color(255, 255, 255, 255), 0);
					spcityraces.draw("terminal", x, y, MainMenu.MENU_WIDTH, MainMenu.MAIN_MENU_HEIGHT + (MainMenu.MAIN_MENU_HEIGHT_OFFSET_Y - 0.015), new Color(255, 255, 255, 255), 0);
					drawText(this._title, [x, y - (MainMenu.MAIN_MENU_HEIGHT_OFFSET_Y / 2)], new Color(), 1, [1, 1], true);
					break;	
			}
            //drawText("123456789012345", [x, y - (MainMenu.MAIN_MENU_HEIGHT_OFFSET_Y / 2)], new Color(), 1, [1, 1], true);
            y += (MainMenu.MAIN_MENU_HEIGHT / 2) + MainMenu.MAIN_MENU_HEIGHT_OFFSET_Y - 0.026;
            var curr = (MenuPool.getCurrentMenu().currentIndexMenuItems + 1);
            if (curr < 10) curr = `0${curr}`;
            var maxx = MenuPool.getCurrentMenu().menuItems.length;
            if (maxx < 10) maxx = `0${maxx}`;
            drawText("Item: " + curr + "/" + maxx, [x + MainMenu.MENU_DRAW_OFFSET_X - (0.097 * MainMenu.SCREEN_RATIO_WIDTH), y + MainMenu.MENU_DRAW_OFFSET_Y - 0.033], new Color(255, 255, 255, 255), 7, [0.4,0.4]);

            var menuInstance = MenuPool.getCurrentMenu();
            if (Date.now() - MainMenu.CONTROL_TICK_TIME_MS > MainMenu.LAST_TICK_TIME) {
                if (mp.game.controls.isControlPressed(0, Control.INPUT_CELLPHONE_DOWN)) {
                    menuInstance.setToItem(menuInstance.currentIndexMenuItems + 1, true);
                }
                else {
                    if (mp.game.controls.isControlPressed(0, Control.INPUT_CELLPHONE_UP)) {
                        menuInstance.setToItem(menuInstance.currentIndexMenuItems - 1, true);
                    }
                }
            }
            _super.prototype.render.call(this, x, y);
        }
    };
    MainMenu.prototype.open = function () {
        this.isVisible = true;
    };
    MainMenu.prototype.close = function () {
        this.isVisible = false;
    };
    MainMenu.prototype.setResolutionRatio = function () {
        MainMenu.SCREEN_RATIO_WIDTH = 1024 / mp.game.graphics.getScreenActiveResolution(0, 0).x;
        MainMenu.SCREEN_RATIO_HEIGHT = 768 / mp.game.graphics.getScreenActiveResolution(0, 0).y;
        MainMenu.MENU_WIDTH = 0.27 * MainMenu.SCREEN_RATIO_WIDTH;
        MainMenu.MENU_WIDTH = Math.max(MainMenu.MENU_WIDTH, getTextWidth(this._title, 1, [1, 1]) + MainMenu.MENU_WIDTH / 5);
        MainMenu.MENU_HEIGHT = 0.04 * MainMenu.SCREEN_RATIO_HEIGHT;
        MainMenu.MAIN_MENU_HEIGHT = MainMenu.MENU_HEIGHT * 2.5;
        MainMenu.MENU_DRAW_OFFSET_X = MainMenu.MENU_WIDTH / 2;
        MainMenu.MENU_DRAW_OFFSET_Y = MainMenu.MENU_HEIGHT / 2;
        MainMenu.MAIN_MENU_HEIGHT_OFFSET_Y = MainMenu.MAIN_MENU_HEIGHT / 2;
        MainMenu.MENU_ARROW_DOWN_HEIGHT = MainMenu.MENU_HEIGHT / 3;
    };
    MainMenu.MAX_MENU_DISPLAY = 10;
    MainMenu.CONTROL_TICK_TIME_MS = 150;
    MainMenu.LAST_TICK_TIME = Date.now();
    return MainMenu;
}(Menu));
var MenuPool = (function () {
    function MenuPool() {
    }
    MenuPool.getCurrentMenu = function () {
        var visibleMenus = MenuPool.MenuInstances.filter(function (value) { return value.isVisible; });
        return visibleMenus[visibleMenus.length - 1];
    };
    MenuPool.displaySubMenu = function (menu) {
        if (MenuPool.MenuInstances.indexOf(menu) == -1) {
            MenuPool.MenuInstances.push(menu);
        }
        menu.isVisible = true;
    };
    MenuPool.removeSubMenu = function (menu) {
        if (MenuPool.MenuInstances.indexOf(menu) != -1) {
            MenuPool.MenuInstances.splice(MenuPool.MenuInstances.indexOf(menu), 1);
            menu.isVisible = false;
        }
    };
    MenuPool.MenuInstances = [];
    return MenuPool;
}());

}