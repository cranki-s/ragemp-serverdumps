/* Main RageServer */
require('./RageServer/NativeMenu');
require('./RageServer')

/* AntiCheat Minimal */
require('./RageServer/AntiCheat');

/* Pacoheist */
require('./RageServer/heistisland');

/* IPLloader */
//require('./RageServer/IPLloader');

/* FlatBed Testing */
//require('./RageServer/FlatBed');

/* TimeCycle dings */
//require('./RageServer/timecyclemod');

/* Remove GTA MAP */
//require('./RageServer/removegtamap');

/* Load GTA5 Prologue */
//require('./RageServer/HimelLoader');

/* Helicam */
require('./RageServer/helicam');
require('./RageServer/flashlight_fix');

/* Minigame Motor An */
require('./CircuitBreaker');

require('gamedata');

// Ticket 37 Testing Hair Overlay (Client Shit) Called from Server und Ticket 72
//require('hair-overlay')

//Armwrestling (In Testing State when enable)
require('ArmWrestling/index.min.js')

//Testing MirReichts
//require('./RageServer/vehicleDamage.js');
require('./RageServer/Casino/blackjack')
require('./RageServer/Casino/roulette')
require('./RageServer/Casino/slots')