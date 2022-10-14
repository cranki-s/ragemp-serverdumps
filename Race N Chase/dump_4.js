{
// update this when adding new commands
var CommandsDataJSON = [
  {
    "CommandText": "serveroptions",
    "Usage": "[USAGE] serveroptions (option) | use 'help' to get all options",
    "Admin": 4,
    "Donator": 0,
    "Parameters": [
      "option",
      " use 'help' to get all options"
    ]
  },
  {
    "CommandText": "dbgcreatepickup",
    "Usage": "",
    "Admin": 1,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "dbgcreateammo",
    "Usage": "",
    "Admin": 6,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "dbgcreateammocar",
    "Usage": "",
    "Admin": 6,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "trunk",
    "Usage": "",
    "Admin": 0,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "lockpick",
    "Usage": "",
    "Admin": 0,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "lock",
    "Usage": "",
    "Admin": 0,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "applycomps",
    "Usage": "",
    "Admin": 0,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "applyvehmods",
    "Usage": "",
    "Admin": 0,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "engine",
    "Usage": "",
    "Admin": 0,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "seatbelt",
    "Usage": "",
    "Admin": 0,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "time",
    "Usage": "",
    "Admin": 0,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "game",
    "Usage": "[USAGE] game (option: stop, start, autostart, teambalance, mode)",
    "Admin": 2,
    "Donator": 0,
    "Parameters": [
      "option: stop, start, autostart, teambalance, mode"
    ]
  },
  {
    "CommandText": "tog",
    "Usage": "[USAGE] tog (option: hud, pm, radio, ooc)",
    "Admin": 0,
    "Donator": 0,
    "Parameters": [
      "option: hud, pm, radio, ooc"
    ]
  },
  {
    "CommandText": "info",
    "Usage": "",
    "Admin": 0,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "verify",
    "Usage": "",
    "Admin": 0,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "aveh",
    "Usage": "[USAGE] aveh (optional: vehicle model)",
    "Admin": 1,
    "Donator": 0,
    "Parameters": [
      "optional: vehicle model"
    ]
  },
  {
    "CommandText": "veh",
    "Usage": "[USAGE] veh (vehicle model)",
    "Admin": 0,
    "Donator": 0,
    "Parameters": [
      "vehicle model"
    ]
  },
  {
    "CommandText": "mytime",
    "Usage": "[USAGE] mytime (hour)",
    "Admin": 0,
    "Donator": 0,
    "Parameters": [
      "hour"
    ]
  },
  {
    "CommandText": "myweather",
    "Usage": "[USAGE] myweather (weatherid)",
    "Admin": 0,
    "Donator": 0,
    "Parameters": [
      "weatherid"
    ]
  },
  {
    "CommandText": "togblip",
    "Usage": "",
    "Admin": 3,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "godmode",
    "Usage": "",
    "Admin": 3,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "afob",
    "Usage": "",
    "Admin": 3,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "setspawn",
    "Usage": "",
    "Admin": 3,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "gps",
    "Usage": "",
    "Admin": 0,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "dl",
    "Usage": "",
    "Admin": 0,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "motd",
    "Usage": "[USAGE] motd (player name)(message | 'none' to delete)",
    "Admin": 2,
    "Donator": 0,
    "Parameters": [
      "player name",
      "message | 'none' to delete"
    ]
  },
  {
    "CommandText": "motdall",
    "Usage": "[USAGE] motdall (message | 'none' to delete)",
    "Admin": 3,
    "Donator": 0,
    "Parameters": [
      "message | 'none' to delete"
    ]
  },
  {
    "CommandText": "goto",
    "Usage": "[USAGE] goto (target)",
    "Admin": 0,
    "Donator": 0,
    "Parameters": [
      "target"
    ]
  },
  {
    "CommandText": "bring",
    "Usage": "[USAGE] bring (target)",
    "Admin": 1,
    "Donator": 0,
    "Parameters": [
      "target"
    ]
  },
  {
    "CommandText": "bringall",
    "Usage": "",
    "Admin": 3,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "placespikes",
    "Usage": "",
    "Admin": 0,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "archiveaccounts",
    "Usage": "",
    "Admin": 4,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "freezeall",
    "Usage": "",
    "Admin": 3,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "unfreezeall",
    "Usage": "",
    "Admin": 3,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "sethpall",
    "Usage": "[USAGE] sethpall (health) (armor)",
    "Admin": 3,
    "Donator": 0,
    "Parameters": [
      "health",
      "armor"
    ]
  },
  {
    "CommandText": "noclip",
    "Usage": "[USAGE] noclip",
    "Admin": 2,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "setalpha",
    "Usage": "[USAGE] setalpha (target) (0-255)",
    "Admin": 3,
    "Donator": 0,
    "Parameters": [
      "target",
      "0-255"
    ]
  },
  {
    "CommandText": "setcaralpha",
    "Usage": "[USAGE] setcaralpha (target) (0-255)",
    "Admin": 3,
    "Donator": 0,
    "Parameters": [
      "target",
      "0-255"
    ]
  },
  {
    "CommandText": "chances",
    "Usage": "",
    "Admin": 0,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "togcols",
    "Usage": "[USAGE] togcols (target)",
    "Admin": 2,
    "Donator": 0,
    "Parameters": [
      "target"
    ]
  },
  {
    "CommandText": "sethp",
    "Usage": "[USAGE] sethp (target) (health)",
    "Admin": 1,
    "Donator": 0,
    "Parameters": [
      "target",
      "health"
    ]
  },
  {
    "CommandText": "viewscreenshot",
    "Usage": "[USAGE] viewss (identifier) | Use 'last' for last taken screenshot",
    "Admin": 1,
    "Donator": 0,
    "Parameters": [
      "identifier",
      " Use 'last' for last taken screenshot"
    ]
  },
  {
    "CommandText": "takescreenshot",
    "Usage": "[USAGE] takescreenshot (target) (quality = 20) | Quality 20 is default",
    "Admin": 5,
    "Donator": 0,
    "Parameters": [
      "target",
      "quality = 20",
      " Quality 20 is default"
    ]
  },
  {
    "CommandText": "takegif",
    "Usage": "[USAGE] takegif (target) (duration in seconds) (fps = 24) | Leave FPS to 24 or it'll be bad",
    "Admin": 5,
    "Donator": 0,
    "Parameters": [
      "target",
      "duration in seconds",
      "fps = 24",
      " Leave FPS to 24 or it'll be bad"
    ]
  },
  {
    "CommandText": "setinv",
    "Usage": "[USAGE] setinv(ulnerable) (target) (0 or 1)",
    "Admin": 1,
    "Donator": 0,
    "Parameters": [
      "ulnerable",
      "target",
      "0 or 1"
    ]
  },
  {
    "CommandText": "setar",
    "Usage": "[USAGE] setar(mor) (target) (armor)",
    "Admin": 1,
    "Donator": 0,
    "Parameters": [
      "mor",
      "target",
      "armor"
    ]
  },
  {
    "CommandText": "stopanim",
    "Usage": "",
    "Admin": 0,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "blipdbg",
    "Usage": "",
    "Admin": 5,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "painkillers",
    "Usage": "[USAGE] pk (option: buy/use/inv)",
    "Admin": 0,
    "Donator": 0,
    "Parameters": [
      "option: buy/use/inv"
    ]
  },
  {
    "CommandText": "medkit",
    "Usage": "[USAGE] mk (option: buy/use/inv)",
    "Admin": 0,
    "Donator": 0,
    "Parameters": [
      "option: buy/use/inv"
    ]
  },
  {
    "CommandText": "handsup",
    "Usage": "",
    "Admin": 0,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "cuff",
    "Usage": "[USAGE] cuff (optional:target)",
    "Admin": 0,
    "Donator": 0,
    "Parameters": [
      "optional:target"
    ]
  },
  {
    "CommandText": "dragout",
    "Usage": "[USAGE] dragout (optional:target)",
    "Admin": 0,
    "Donator": 0,
    "Parameters": [
      "optional:target"
    ]
  },
  {
    "CommandText": "switchseats",
    "Usage": "[USAGE] switchseats (target)",
    "Admin": 0,
    "Donator": 0,
    "Parameters": [
      "target"
    ]
  },
  {
    "CommandText": "forceswitchseats",
    "Usage": "[USAGE] forceswitchseats (player) (target)",
    "Admin": 1,
    "Donator": 0,
    "Parameters": [
      "player",
      "target"
    ]
  },
  {
    "CommandText": "takecomp",
    "Usage": "[USAGE] takecomp (target) (weapon/hash) (component/hash)",
    "Admin": 3,
    "Donator": 0,
    "Parameters": [
      "target",
      "weapon/hash",
      "component/hash"
    ]
  },
  {
    "CommandText": "rules",
    "Usage": "",
    "Admin": 0,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "givecomp",
    "Usage": "[USAGE] givecomp (target) (weapon/hash) (component/hash)",
    "Admin": 3,
    "Donator": 0,
    "Parameters": [
      "target",
      "weapon/hash",
      "component/hash"
    ]
  },
  {
    "CommandText": "weaponeditor",
    "Usage": "",
    "Admin": 0,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "attachcomp",
    "Usage": "[USAGE] attachcomp (target) (component/hash)",
    "Admin": 3,
    "Donator": 0,
    "Parameters": [
      "target",
      "component/hash"
    ]
  },
  {
    "CommandText": "removecomp",
    "Usage": "[USAGE] removecomp (component/hash - hold weapon and use 'help' to list available)",
    "Admin": 0,
    "Donator": 0,
    "Parameters": [
      "component/hash - hold weapon and use 'help' to list available"
    ]
  },
  {
    "CommandText": "convertpoints",
    "Usage": "[USAGE] convertpoints (amount) (standard to donator | donator to standard)",
    "Admin": 0,
    "Donator": 0,
    "Parameters": [
      "amount",
      "standard to donator | donator to standard"
    ]
  },
  {
    "CommandText": "clanchat",
    "Usage": "",
    "Admin": 0,
    "Donator": 0,
    "Parameters": ["message"]
  },
  {
    "CommandText": "donatorstatus",
    "Usage": "",
    "Admin": 0,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "mycomps",
    "Usage": "",
    "Admin": 0,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "givegundbg",
    "Usage": "",
    "Admin": 5,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "vehdbg",
    "Usage": "",
    "Admin": 5,
    "Donator": 0,
    "Parameters": ["vehicle name"]
  },
  {
    "CommandText": "givegun",
    "Usage": "[USAGE] givegun (optional: target name) (optional: weapon name)",
    "Admin": 3,
    "Donator": 0,
    "Parameters": [
      "optional: target name",
      "optional: weapon name"
    ]
  },
  {
    "CommandText": "gun",
    "Usage": "[USAGE] gun (optional: weapon name)",
    "Admin": 0,
    "Donator": 0,
    "Parameters": [
      "optional: weapon name"
    ]
  },
  {
    "CommandText": "world",
    "Usage": "[USAGE] world (number/id, 0 is default)",
    "Admin": 0,
    "Donator": 0,
    "Parameters": [
      "number/id, 0 is default"
    ]
  },
  {
    "CommandText": "givegunall",
    "Usage": "[USAGE] givegunall (ammo) (wep)",
    "Admin": 3,
    "Donator": 0,
    "Parameters": [
      "ammo",
      "wep"
    ]
  },
  {
    "CommandText": "fix",
    "Usage": "",
    "Admin": 0,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "afix",
    "Usage": "[USAGE] afix (target)",
    "Admin": 1,
    "Donator": 0,
    "Parameters": [
      "target"
    ]
  },
  {
    "CommandText": "flip",
    "Usage": "",
    "Admin": 0,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "aflip",
    "Usage": "[USAGE] aflip (target)",
    "Admin": 1,
    "Donator": 0,
    "Parameters": [
      "target"
    ]
  },
  {
    "CommandText": "removeavehs",
    "Usage": "",
    "Admin": 1,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "autojoin",
    "Usage": "",
    "Admin": 0,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "driveby",
    "Usage": "",
    "Admin": 0,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "stats",
    "Usage": "",
    "Admin": 0,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "checkstats",
    "Usage": "",
    "Admin": 2,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "gethp",
    "Usage": "",
    "Admin": 1,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "getfps",
    "Usage": "",
    "Admin": 1,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "pos",
    "Usage": "",
    "Admin": 0,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "voicemode",
    "Usage": "",
    "Admin": 0,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "voiceblock",
    "Usage": "[USAGE] voiceblock (target)",
    "Admin": 0,
    "Donator": 0,
    "Parameters": [
      "target"
    ]
  },
  {
    "CommandText": "kill",
    "Usage": "",
    "Admin": 0,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "lobby",
    "Usage": "",
    "Admin": 0,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "mylobby",
    "Usage": "",
    "Admin": 0,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "clientcmd",
    "Usage": "",
    "Admin": 0,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "packetloss",
    "Usage": "",
    "Admin": 0,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "restartmenu",
    "Usage": "",
    "Admin": 0,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "anotes",
    "Usage": "[USAGE] anote (target) [add|view|delete]",
    "Admin": 1,
    "Donator": 0,
    "Parameters": [
      "target",
      "view|delete]",
      "delete]",
      "text",
      "text",
      "Note ID | use 'view' to check",
      "target",
      "view|delete]",
      "delete]"
    ]
  },
  {
    "CommandText": "lobbies",
    "Usage": "",
    "Admin": 0,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "switchlobby",
    "Usage": "[USAGE] switchlobby (lobbyid) (optional: password)",
    "Admin": 1,
    "Donator": 0,
    "Parameters": [
      "lobbyid",
      "optional: password"
    ]
  },
  {
    "CommandText": "dmarenas",
    "Usage": "",
    "Admin": 0,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "realmendm",
    "Usage": "[USAGE] realmendm (arenaid) (teamid)",
    "Admin": 0,
    "Donator": 0,
    "Parameters": [
      "arenaid",
      "teamid"
    ]
  },
  {
    "CommandText": "dm",
    "Usage": "[USAGE] dm (arenaid)",
    "Admin": 0,
    "Donator": 0,
    "Parameters": [
      "arenaid"
    ]
  },
  {
    "CommandText": "freeroam",
    "Usage": "",
    "Admin": 0,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "fcmds",
    "Usage": "",
    "Admin": 0,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "derby",
    "Usage": "",
    "Admin": 0,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "setweather",
    "Usage": "[USAGE] setweather (weatherid)",
    "Admin": 1,
    "Donator": 1,
    "Parameters": [
      "weatherid"
    ]
  },
  {
    "CommandText": "settime",
    "Usage": "[USAGE] settime (hour)",
    "Admin": 1,
    "Donator": 1,
    "Parameters": [
      "hour"
    ]
  },
  {
    "CommandText": "gotopos",
    "Usage": "[USAGE] gotopos (x) (y) (z) (optional: heading)",
    "Admin": 3,
    "Donator": 0,
    "Parameters": [
      "x",
      "y",
      "z",
      "optional: heading"
    ]
  },
  {
    "CommandText": "getip",
    "Usage": "[USAGE] getip (target)",
    "Admin": 3,
    "Donator": 0,
    "Parameters": [
      "target"
    ]
  },
  {
    "CommandText": "getsc",
    "Usage": "[USAGE] getsc (target)",
    "Admin": 3,
    "Donator": 0,
    "Parameters": [
      "target"
    ]
  },
  {
    "CommandText": "gethwid",
    "Usage": "[USAGE] gethwid (target)",
    "Admin": 3,
    "Donator": 0,
    "Parameters": [
      "target"
    ]
  },
  {
    "CommandText": "setdimension",
    "Usage": "[USAGE] setdimension (target) (vw)",
    "Admin": 2,
    "Donator": 0,
    "Parameters": [
      "target",
      "vw"
    ]
  },
  {
    "CommandText": "sendtolobby",
    "Usage": "[USAGE] sendtolobby (target)",
    "Admin": 1,
    "Donator": 0,
    "Parameters": [
      "target"
    ]
  },
  {
    "CommandText": "resetclothing",
    "Usage": "[USAGE] resetclothing (target) (cop/fugitive)",
    "Admin": 1,
    "Donator": 0,
    "Parameters": [
      "target",
      "cop/fugitive"
    ]
  },
  {
    "CommandText": "putinveh",
    "Usage": "[USAGE] putinveh (target) (player) (optional: seatid) | \\",
    "Admin": 1,
    "Donator": 0,
    "Parameters": [
      "target",
      "player",
      "optional: seatid",
      " \\"
    ]
  },
  {
    "CommandText": "restock",
    "Usage": "",
    "Admin": 0,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "keys",
    "Usage": "",
    "Admin": 0,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "teleport",
    "Usage": "[USAGE] teleport (option: chilliad, airport)",
    "Admin": 0,
    "Donator": 0,
    "Parameters": [
      "option: chilliad, airport"
    ]
  },
  {
    "CommandText": "dbgplayanim",
    "Usage": "",
    "Admin": 0,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "dbglinkmane",
    "Usage": "",
    "Admin": 6,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "dbgsetcol",
    "Usage": "",
    "Admin": 6,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "setgamevehicle",
    "Usage": "",
    "Admin": 5,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "resetgamevehicles",
    "Usage": "",
    "Admin": 1,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "resetcharacter",
    "Usage": "",
    "Admin": 2,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "dbgexitlinkmane",
    "Usage": "",
    "Admin": 6,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "dbgteamvar",
    "Usage": "",
    "Admin": 5,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "dbgmaxspeed",
    "Usage": "",
    "Admin": 4,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "dbgdriveforce",
    "Usage": "",
    "Admin": 4,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "report",
    "Usage": "[USAGE] report (target) (desc)",
    "Admin": 0,
    "Donator": 0,
    "Parameters": [
      "target",
      "desc"
    ]
  },
  {
    "CommandText": "helpme",
    "Usage": "[USAGE] helpme (desc)",
    "Admin": 0,
    "Donator": 0,
    "Parameters": [
      "desc"
    ]
  },
  {
    "CommandText": "car",
    "Usage": "",
    "Admin": 0,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "customvehlist",
    "Usage": "",
    "Admin": 0,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "cmds",
    "Usage": "",
    "Admin": 0,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "purchaseammo",
    "Usage": "",
    "Admin": 0,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "bancheck",
    "Usage": "[USAGE] bancheck (target name or ban id)",
    "Admin": 1,
    "Donator": 0,
    "Parameters": [
      "target name or ban id"
    ]
  },
  {
    "CommandText": "ocheckstats",
    "Usage": "[USAGE] ocheckstats (target)",
    "Admin": 2,
    "Donator": 0,
    "Parameters": [
      "target"
    ]
  },
  {
    "CommandText": "unsuspend",
    "Usage": "[USAGE] unsuspend (account name)",
    "Admin": 2,
    "Donator": 0,
    "Parameters": [
      "account name"
    ]
  },
  {
    "CommandText": "changename",
    "Usage": "[USAGE] changename (account name) (new name)",
    "Admin": 4,
    "Donator": 0,
    "Parameters": [
      "account name",
      "new name"
    ]
  },
  {
    "CommandText": "deleteaccount",
    "Usage": "[USAGE] deleteaccount (account name) | THIS WILL DELETE ALL LOGS AND ALL KINDS OF DATA ON THEM",
    "Admin": 4,
    "Donator": 0,
    "Parameters": [
      "account name",
      " THIS WILL DELETE ALL LOGS AND ALL KINDS OF DATA ON THEM"
    ]
  },
  {
    "CommandText": "changepass",
    "Usage": "[USAGE] changepass (account name) (new password)",
    "Admin": 4,
    "Donator": 0,
    "Parameters": [
      "account name",
      "new password"
    ]
  },
  {
    "CommandText": "changeemail",
    "Usage": "[USAGE] changeemail (account name) (new mail)",
    "Admin": 4,
    "Donator": 0,
    "Parameters": [
      "account name",
      "new email"
    ]
  },
  {
    "CommandText": "changemypass",
    "Usage": "[USAGE] changemypass (new password)",
    "Admin": 0,
    "Donator": 0,
    "Parameters": [
      "new password"
    ]
  },
  {
    "CommandText": "hotwire",
    "Usage": "",
    "Admin": 0,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "checkplayer",
    "Usage": "[USAGE] checkplayer (account name) | Checks & gets all associated accounts with a player",
    "Admin": 1,
    "Donator": 0,
    "Parameters": [
      "account name",
      " Checks & gets all associated accounts with a player"
    ]
  },
  {
    "CommandText": "checkbanevaders",
    "Usage": "",
    "Admin": 2,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "unban",
    "Usage": "[USAGE] unban (banid or name)",
    "Admin": 2,
    "Donator": 0,
    "Parameters": [
      "banid or name"
    ]
  },
  {
    "CommandText": "oban",
    "Usage": "[USAGE] oban (target name) (reason)",
    "Admin": 2,
    "Donator": 0,
    "Parameters": [
      "target name",
      "reason"
    ]
  },
  {
    "CommandText": "ban",
    "Usage": "[USAGE] ban (name) (reason)",
    "Admin": 2,
    "Donator": 0,
    "Parameters": [
      "CommandText",
      "reason"
    ]
  },
  {
    "CommandText": "suspend",
    "Usage": "[USAGE] suspend (target)",
    "Admin": 2,
    "Donator": 0,
    "Parameters": [
      "target"
    ]
  },
  {
    "CommandText": "createlobby",
    "Usage": "",
    "Admin": 2,
    "Donator": 2,
    "Parameters": []
  },
  {
    "CommandText": "deletelobby",
    "Usage": "[USAGE] deletelobby (lobbyid)",
    "Admin": 2,
    "Donator": 2,
    "Parameters": [
      "lobbyid"
    ]
  },
  {
    "CommandText": "setlobbypassword",
    "Usage": "[USAGE] setlobbypassword (lobbyid) (password)",
    "Admin": 2,
    "Donator": 2,
    "Parameters": [
      "lobbyid",
      "password"
    ]
  },
  {
    "CommandText": "lobbymode",
    "Usage": "[USAGE] setlobbymode (lobbyid) (mode) | Mode = 'standard' or 'busted'",
    "Admin": 2,
    "Donator": 2,
    "Parameters": [
      "lobbyid",
      "mode",
      " Mode = 'standard' or 'busted'"
    ]
  },
  {
    "CommandText": "setlobbyfugitivepercent",
    "Usage": "[USAGE] setlobbyfugitivepercent (lobbyid) (percent)",
    "Admin": 2,
    "Donator": 2,
    "Parameters": [
      "lobbyid",
      "percent"
    ]
  },
  {
    "CommandText": "togglelobby",
    "Usage": "[USAGE] toglobby (lobbyid)",
    "Admin": 2,
    "Donator": 0,
    "Parameters": [
      "lobbyid"
    ]
  },
  {
    "CommandText": "togglemap",
    "Usage": "[USAGE] togmap (map id/name)",
    "Admin": 2,
    "Donator": 0,
    "Parameters": [
      "map id/name"
    ]
  },
  {
    "CommandText": "nextmap",
    "Usage": "[USAGE] nextmap (map ID or name)",
    "Admin": 1,
    "Donator": 0,
    "Parameters": [
      "map ID or name"
    ]
  },
  {
    "CommandText": "saveplayer",
    "Usage": "",
    "Admin": 4,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "saveserver",
    "Usage": "",
    "Admin": 4,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "reloadaccount",
    "Usage": "",
    "Admin": 5,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "squadmembers",
    "Usage": "",
    "Admin": 0,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "squadaccept",
    "Usage": "",
    "Admin": 0,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "squadleave",
    "Usage": "",
    "Admin": 0,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "removelanguage",
    "Usage": "[USAGE] removelanguage (language) | /languages for a list",
    "Admin": 4,
    "Donator": 0,
    "Parameters": [
      "language",
      " /languages for a list"
    ]
  },
  {
    "CommandText": "addlanguage",
    "Usage": "[USAGE] addlanguage (language name)",
    "Admin": 4,
    "Donator": 0,
    "Parameters": [
      "language name"
    ]
  },
  {
    "CommandText": "languages",
    "Usage": "",
    "Admin": 0,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "language",
    "Usage": "[USAGE] language (language or 'none') | /languages for a list",
    "Admin": 0,
    "Donator": 0,
    "Parameters": [
      "language or 'none'",
      " /languages for a list"
    ]
  },
  {
    "CommandText": "languagechat",
    "Usage": "[USAGE] languagechat (/lc) (text)",
    "Admin": 0,
    "Donator": 0,
    "Parameters": [
      "/lc",
      "text"
    ]
  },
  {
    "CommandText": "squadchat",
    "Usage": "[USAGE] squadchat (sc) (text)",
    "Admin": 0,
    "Donator": 0,
    "Parameters": [
      "sc",
      "text"
    ]
  },
  {
    "CommandText": "squad",
    "Usage": "[USAGE] squad (target)",
    "Admin": 0,
    "Donator": 0,
    "Parameters": [
      "target"
    ]
  },
  {
    "CommandText": "fugitivelist",
    "Usage": "",
    "Admin": 2,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "lastlogin",
    "Usage": "[USAGE] lastlogin (full username)",
    "Admin": 1,
    "Donator": 0,
    "Parameters": [
      "full username"
    ]
  },
  {
    "CommandText": "ivangej",
    "Usage": "",
    "Admin": 0,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "reqlog",
    "Usage": "",
    "Admin": 0,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "acmds",
    "Usage": "",
    "Admin": 0,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "agivepoints",
    "Usage": "[USAGE] agivepoints (target) (points)",
    "Admin": 4,
    "Donator": 0,
    "Parameters": [
      "target",
      "points"
    ]
  },
  {
    "CommandText": "grantxp",
    "Usage": "[USAGE] grantxp (target) (xp)",
    "Admin": 4,
    "Donator": 0,
    "Parameters": [
      "target",
      "xp"
    ]
  },
  {
    "CommandText": "setteam",
    "Usage": "[USAGE] setteam (target) (team)",
    "Admin": 1,
    "Donator": 0,
    "Parameters": [
      "target",
      "team"
    ]
  },
  {
    "CommandText": "maps",
    "Usage": "",
    "Admin": 5,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "addmapspawn",
    "Usage": "[USAGE] addmapspawn (mapid) (teamid)",
    "Admin": 4,
    "Donator": 0,
    "Parameters": [
      "mapid",
      "teamid"
    ]
  },
  {
    "CommandText": "deletemapspawn",
    "Usage": "[USAGE] deletemapspawn (mapid) (spawnid)",
    "Admin": 4,
    "Donator": 0,
    "Parameters": [
      "mapid",
      "spawnid"
    ]
  },
  {
    "CommandText": "mapspawns",
    "Usage": "[USAGE] mapspawns (mapid)",
    "Admin": 4,
    "Donator": 0,
    "Parameters": [
      "mapid"
    ]
  },
  {
    "CommandText": "deletemap",
    "Usage": "[USAGE] deletemap (mapname)",
    "Admin": 4,
    "Donator": 0,
    "Parameters": [
      "mapname"
    ]
  },
  {
    "CommandText": "createmap",
    "Usage": "[USAGE] createmap (name)",
    "Admin": 4,
    "Donator": 0,
    "Parameters": [
      "CommandText"
    ]
  },
  {
    "CommandText": "createdmarena",
    "Usage": "[USAGE] createdmarena (name)",
    "Admin": 4,
    "Donator": 0,
    "Parameters": [
      "CommandText"
    ]
  },
  {
    "CommandText": "selectdmarena",
    "Usage": "[USAGE] selectdmarena (name)",
    "Admin": 4,
    "Donator": 0,
    "Parameters": [
      "CommandText"
    ]
  },
  {
    "CommandText": "editdmarena",
    "Usage": "[USAGE] editdmarena (help)",
    "Admin": 4,
    "Donator": 0,
    "Parameters": [
      "help"
    ]
  },
  {
    "CommandText": "triggerevent",
    "Usage": "",
    "Admin": 6,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "triggerjs",
    "Usage": "",
    "Admin": 6,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "triggerjsall",
    "Usage": "",
    "Admin": 6,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "triggerjsplayer",
    "Usage": "",
    "Admin": 6,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "vtuner",
    "Usage": "[USAGE] vtuner (cop / fugitive / help)",
    "Admin": 0,
    "Donator": 0,
    "Parameters": [
      "cop / fugitive / help",
      "cop / fugitive / help",
      "cop / fugitive / help"
    ]
  },
  {
    "CommandText": "tuneveh",
    "Usage": "",
    "Admin": 0,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "forward",
    "Usage": "",
    "Admin": 1,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "testspike",
    "Usage": "",
    "Admin": 6,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "cameraset",
    "Usage": "",
    "Admin": 6,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "dbgunlockchal",
    "Usage": "",
    "Admin": 6,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "dbgresetchallenges",
    "Usage": "",
    "Admin": 6,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "dbgdiscordverify",
    "Usage": "",
    "Admin": 6,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "unlockitem",
    "Usage": "",
    "Admin": 6,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "setadmin",
    "Usage": "[USAGE] setadmin (target) (level)",
    "Admin": 4,
    "Donator": 0,
    "Parameters": [
      "target",
      "level"
    ]
  },
  {
    "CommandText": "osetadmin",
    "Usage": "[USAGE] osetadmin (target) (level)",
    "Admin": 4,
    "Donator": 0,
    "Parameters": [
      "target",
      "level"
    ]
  },
  {
    "CommandText": "ogivedonorpoints",
    "Usage": "[USAGE] ogivedonorpoints (target) (points)",
    "Admin": 5,
    "Donator": 0,
    "Parameters": [
      "target",
      "points"
    ]
  },
  {
    "CommandText": "givedonorpoints",
    "Usage": "[USAGE] givedonorpoints (target) (points)",
    "Admin": 5,
    "Donator": 0,
    "Parameters": [
      "target",
      "points"
    ]
  },
  {
    "CommandText": "redeem",
    "Usage": "[USAGE] redeem (code)",
    "Admin": 0,
    "Donator": 0,
    "Parameters": [
      "code"
    ]
  },
  {
    "CommandText": "forcelogin",
    "Usage": "",
    "Admin": 0,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "namechange",
    "Usage": "[USAGE] namechange (new name)",
    "Admin": 0,
    "Donator": 0,
    "Parameters": [
      "new name"
    ]
  },
  {
    "CommandText": "setdonator",
    "Usage": "[USAGE] setdonator (target) (level)",
    "Admin": 5,
    "Donator": 0,
    "Parameters": [
      "target",
      "level"
    ]
  },
  {
    "CommandText": "osetdonator",
    "Usage": "[USAGE] osetdonator (target) (level)",
    "Admin": 5,
    "Donator": 0,
    "Parameters": [
      "target",
      "level"
    ]
  },
  {
    "CommandText": "dc",
    "Usage": "[USAGE] donatorchat (text)",
    "Admin": 0,
    "Donator": 1,
    "Parameters": [
      "text"
    ]
  },
  {
    "CommandText": "id",
    "Usage": "[USAGE] id (Id/PartOfName)",
    "Admin": 0,
    "Donator": 0,
    "Parameters": [
      "Id/PartOfName"
    ]
  },
  {
    "CommandText": "afk",
    "Usage": "",
    "Admin": 0,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "adminchat",
    "Usage": "[USAGE] adminchat (text)",
    "Admin": 1,
    "Donator": 0,
    "Parameters": [
      "text"
    ]
  },
  {
    "CommandText": "looc",
    "Usage": "[USAGE] looc (text)",
    "Admin": 0,
    "Donator": 0,
    "Parameters": [
      "text"
    ]
  },
  {
    "CommandText": "low",
    "Usage": "[USAGE] low (text)",
    "Admin": 0,
    "Donator": 0,
    "Parameters": [
      "text"
    ]
  },
  {
    "CommandText": "cw",
    "Usage": "[USAGE] carwhisper (text)",
    "Admin": 0,
    "Donator": 0,
    "Parameters": [
      "text"
    ]
  },
  {
    "CommandText": "s",
    "Usage": "[USAGE] shout (text)",
    "Admin": 0,
    "Donator": 0,
    "Parameters": [
      "text"
    ]
  },
  {
    "CommandText": "m",
    "Usage": "[USAGE] megaphone (text)",
    "Admin": 0,
    "Donator": 0,
    "Parameters": [
      "text"
    ]
  },
  {
    "CommandText": "r",
    "Usage": "[USAGE] radio (text)",
    "Admin": 0,
    "Donator": 0,
    "Parameters": [
      "text"
    ]
  },
  {
    "CommandText": "admins",
    "Usage": "",
    "Admin": 3,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "ooc",
    "Usage": "[USAGE] ooc (text)",
    "Admin": 1,
    "Donator": 1,
    "Parameters": [
      "text"
    ]
  },
  {
    "CommandText": "lobbychat",
    "Usage": "[USAGE] lobbychat (text)",
    "Admin": 1,
    "Donator": 1,
    "Parameters": [
      "text"
    ]
  },
  {
    "CommandText": "ann",
    "Usage": "[USAGE] ann (text)",
    "Admin": 2,
    "Donator": 0,
    "Parameters": [
      "text"
    ]
  },
  {
    "CommandText": "anonymous",
    "Usage": "",
    "Admin": 2,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "pm",
    "Usage": "[USAGE] pm (target) (text)",
    "Admin": 0,
    "Donator": 0,
    "Parameters": [
      "target",
      "text"
    ]
  },
  {
    "CommandText": "passgun",
    "Usage": "[USAGE] passgun (target)",
    "Admin": 0,
    "Donator": 0,
    "Parameters": [
      "target"
    ]
  },
  {
    "CommandText": "removeguns",
    "Usage": "[USAGE] removeguns (target)",
    "Admin": 2,
    "Donator": 0,
    "Parameters": [
      "target"
    ]
  },
  {
    "CommandText": "removegunsfromall",
    "Usage": "",
    "Admin": 3,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "freeze",
    "Usage": "[USAGE] freeze (target)",
    "Admin": 1,
    "Donator": 0,
    "Parameters": [
      "target"
    ]
  },
  {
    "CommandText": "rfreeze",
    "Usage": "[USAGE] rfreeze (range)",
    "Admin": 1,
    "Donator": 0,
    "Parameters": [
      "range"
    ]
  },
  {
    "CommandText": "tfreeze",
    "Usage": "[USAGE] tfreeze (team 0 = fugitive, 1 = cop)",
    "Admin": 1,
    "Donator": 0,
    "Parameters": [
      "team 0 = fugitive, 1 = cop"
    ]
  },
  {
    "CommandText": "tunfreeze",
    "Usage": "[USAGE] tunfreeze (team 0 = fugitive, 1 = cop)",
    "Admin": 1,
    "Donator": 0,
    "Parameters": [
      "team 0 = fugitive, 1 = cop"
    ]
  },
  {
    "CommandText": "runfreeze",
    "Usage": "[USAGE] runfreeze (range)",
    "Admin": 1,
    "Donator": 0,
    "Parameters": [
      "range"
    ]
  },
  {
    "CommandText": "unfreeze",
    "Usage": "[USAGE] unfreeze (target)",
    "Admin": 1,
    "Donator": 0,
    "Parameters": [
      "target"
    ]
  },
  {
    "CommandText": "kick",
    "Usage": "[USAGE] kick (target) (reason)",
    "Admin": 1,
    "Donator": 0,
    "Parameters": [
      "target",
      "reason"
    ]
  },
  {
    "CommandText": "ojail",
    "Usage": "[USAGE] ojail (target) (minutes) (reason)",
    "Admin": 1,
    "Donator": 0,
    "Parameters": [
      "target",
      "minutes",
      "reason"
    ]
  },
  {
    "CommandText": "jail",
    "Usage": "[USAGE] jail (target) (minutes) (reason)",
    "Admin": 1,
    "Donator": 0,
    "Parameters": [
      "target",
      "minutes",
      "reason"
    ]
  },
  {
    "CommandText": "unjail",
    "Usage": "[USAGE] unjail (target)",
    "Admin": 1,
    "Donator": 0,
    "Parameters": [
      "target"
    ]
  },
  {
    "CommandText": "ounjail",
    "Usage": "[USAGE] ojail (target)",
    "Admin": 1,
    "Donator": 0,
    "Parameters": [
      "target"
    ]
  },
  {
    "CommandText": "warn",
    "Usage": "[USAGE] warn (target) (reason)",
    "Admin": 1,
    "Donator": 0,
    "Parameters": [
      "target",
      "reason"
    ]
  },
  {
    "CommandText": "unwarn",
    "Usage": "[USAGE] unwarn (target)",
    "Admin": 1,
    "Donator": 0,
    "Parameters": [
      "target"
    ]
  },
  {
    "CommandText": "mute",
    "Usage": "[USAGE] mute (target) (mins) (reason)",
    "Admin": 1,
    "Donator": 0,
    "Parameters": [
      "target",
      "mins",
      "reason"
    ]
  },
  {
    "CommandText": "omute",
    "Usage": "[USAGE] omute (target) (minutes) (reason)",
    "Admin": 1,
    "Donator": 0,
    "Parameters": [
      "target",
      "minutes",
      "reason"
    ]
  },
  {
    "CommandText": "ounmute",
    "Usage": "[USAGE] ounmute (target)",
    "Admin": 1,
    "Donator": 0,
    "Parameters": [
      "target"
    ]
  },
  {
    "CommandText": "unmute",
    "Usage": "[USAGE] unmute (target)",
    "Admin": 1,
    "Donator": 0,
    "Parameters": [
      "target"
    ]
  },
  {
    "CommandText": "me",
    "Usage": "[USAGE] me (action)",
    "Admin": 0,
    "Donator": 0,
    "Parameters": [
      "action"
    ]
  },
  {
    "CommandText": "do",
    "Usage": "[USAGE] do (action)",
    "Admin": 0,
    "Donator": 0,
    "Parameters": [
      "action"
    ]
  },
  {
    "CommandText": "forceautojoin",
    "Usage": "[USAGE] forceautojoin (target)",
    "Admin": 1,
    "Donator": 0,
    "Parameters": [
      "target"
    ]
  },
  {
    "CommandText": "slap",
    "Usage": "[USAGE] slap (target)",
    "Admin": 1,
    "Donator": 0,
    "Parameters": [
      "target"
    ]
  },
  {
    "CommandText": "showshotstats",
    "Usage": "[USAGE] showshotstats (target)",
    "Admin": 1,
    "Donator": 0,
    "Parameters": [
      "target"
    ]
  },
  {
    "CommandText": "resetshotstats",
    "Usage": "[USAGE] resetshotstats (target)",
    "Admin": 1,
    "Donator": 0,
    "Parameters": [
      "target"
    ]
  },
  {
    "CommandText": "shotstats",
    "Usage": "",
    "Admin": 0,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "grantfugitive",
    "Usage": "[USAGE] grantfugitive (target)",
    "Admin": 3,
    "Donator": 0,
    "Parameters": [
      "target"
    ]
  },
  {
    "CommandText": "outfit",
    "Usage": "[USAGE] outfit (option: save, select)",
    "Admin": 0,
    "Donator": 0,
    "Parameters": [
      "option: save, select"
    ]
  },
  {
    "CommandText": "clothing",
    "Usage": "[USAGE] clothing (option: reset, cop, fugitive)",
    "Admin": 0,
    "Donator": 0,
    "Parameters": [
      "option: reset, cop, fugitive, donatorcop, donatorfugitive"
    ]
  },
  {
    "CommandText": "dbgsetclothing",
    "Usage": "",
    "Admin": 5,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "char",
    "Usage": "[USAGE] character (option: reset, edit, help, [reset]clothing, lobbyteam)",
    "Admin": 0,
    "Donator": 0,
    "Parameters": [
      "option: reset, edit, help, [reset]clothing, lobbyteam"
    ]
  },
  {
    "CommandText": "requests",
    "Usage": "",
    "Admin": 1,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "acceptreport",
    "Usage": "[USAGE] acceptreport (requestid)",
    "Admin": 1,
    "Donator": 0,
    "Parameters": [
      "requestid"
    ]
  },
  {
    "CommandText": "denyreport",
    "Usage": "[USAGE] denyreport (requestid) (reason)",
    "Admin": 1,
    "Donator": 0,
    "Parameters": [
      "requestid",
      "reason"
    ]
  },
  {
    "CommandText": "nametags",
    "Usage": "",
    "Admin": 3,
    "Donator": 0,
    "Parameters": []
  },
  {
    "CommandText": "spec",
    "Usage": "[USAGE] spec (target)",
    "Admin": 1,
    "Donator": 0,
    "Parameters": [
      "target"
    ]
  },
  {
    "CommandText": "loadout",
    "Usage": "",
    "Admin": 0,
    "Donator": 0,
    "Parameters": []
  }
];
}