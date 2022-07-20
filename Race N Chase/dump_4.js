{
// update this when adding new commands
var CommandsDataJSON = [
    {
      "CommandText": "serveroptions",
      "Parameters": [
        "action"
      ],
      "Admin": 4
    },
    {
      "CommandText": "trunk",
      "Parameters": [],
      "Admin": 0
    },
    {
      "CommandText": "lock",
      "Parameters": [],
      "Admin": 0
    },
    {
      "CommandText": "applycomps",
      "Parameters": [],
      "Admin": 0
    },
    {
      "CommandText": "applyvehmods",
      "Parameters": [],
      "Admin": 0
    },
    {
      "CommandText": "engine",
      "Parameters": [],
      "Admin": 0
    },
    {
      "CommandText": "seatbelt",
      "Parameters": [],
      "Admin": 0
    },
    {
      "CommandText": "time",
      "Parameters": [],
      "Admin": 0
    },
    {
      "CommandText": "game",
      "Parameters": [
        "action"
      ],
      "Admin": 2
    },
    {
      "CommandText": "tog",
      "Parameters": [
        "action"
      ],
      "Admin": 0
    },
    {
      "CommandText": "info",
      "Parameters": [],
      "Admin": 0
    },
    {
      "CommandText": "verify",
      "Parameters": [],
      "Admin": 0
    },
    {
      "CommandText": "aveh",
      "Parameters": [
        "carname",
        "col1",
        "col2"
      ],
      "Admin": 1
    },
    {
      "CommandText": "veh",
      "Parameters": [
        "carname",
        "col1",
        "col2"
      ],
      "Admin": 0
    },
    {
      "CommandText": "mytime",
      "Parameters": [
        "hour"
      ],
      "Admin": 0
    },
    {
      "CommandText": "myweather",
      "Parameters": [
        "weatherid"
      ],
      "Admin": 0
    },
    {
      "CommandText": "togblip",
      "Parameters": [],
      "Admin": 3
    },
    {
      "CommandText": "godmode",
      "Parameters": [],
      "Admin": 3
    },
    {
      "CommandText": "afob",
      "Parameters": [],
      "Admin": 3
    },
    {
      "CommandText": "setspawn",
      "Parameters": [],
      "Admin": 3
    },
    {
      "CommandText": "gps",
      "Parameters": [],
      "Admin": 0
    },
    {
      "CommandText": "dl",
      "Parameters": [],
      "Admin": 0
    },
    {
      "CommandText": "motd",
      "Parameters": [
        "targetName",
        "message"
      ],
      "Admin": 2
    },
    {
      "CommandText": "motdall",
      "Parameters": [
        "message"
      ],
      "Admin": 3
    },
    {
      "CommandText": "goto",
      "Parameters": [
        "target"
      ],
      "Admin": 1
    },
    {
      "CommandText": "bring",
      "Parameters": [
        "target"
      ],
      "Admin": 1
    },
    {
      "CommandText": "bringall",
      "Parameters": [],
      "Admin": 3
    },
    {
      "CommandText": "freezeall",
      "Parameters": [],
      "Admin": 3
    },
    {
      "CommandText": "unfreezeall",
      "Parameters": [],
      "Admin": 3
    },
    {
      "CommandText": "sethpall",
      "Parameters": [
        "health",
        "armor"
      ],
      "Admin": 3
    },
    {
      "CommandText": "noclip",
      "Parameters": [],
      "Admin": 2
    },
    {
      "CommandText": "setalpha",
      "Parameters": [
        "target",
        "alpha"
      ],
      "Admin": 3
    },
    {
      "CommandText": "setcaralpha",
      "Parameters": [
        "target",
        "alpha"
      ],
      "Admin": 3
    },
    {
      "CommandText": "chances",
      "Parameters": [],
      "Admin": 0
    },
    {
      "CommandText": "sethp",
      "Parameters": [
        "target",
        "health"
      ],
      "Admin": 1
    },
    {
      "CommandText": "viewscreenshot",
      "Parameters": [
        "identifier"
      ],
      "Admin": 1
    },
    {
      "CommandText": "takescreenshot",
      "Parameters": [
        "target",
        "quality"
      ],
      "Admin": 1
    },
    {
      "CommandText": "takegif",
      "Parameters": [
        "target",
        "duration",
        "fps",
        "24"
      ],
      "Admin": 1
    },
    {
      "CommandText": "setinv",
      "Parameters": [
        "target",
        "status"
      ],
      "Admin": 1
    },
    {
      "CommandText": "setar",
      "Parameters": [
        "target",
        "armour"
      ],
      "Admin": 1
    },
    {
      "CommandText": "stopanim",
      "Parameters": [],
      "Admin": 0
    },
    {
      "CommandText": "painkillers",
      "Parameters": [
        "option"
      ],
      "Admin": 0
    },
    {
      "CommandText": "medkit",
      "Parameters": [
        "option"
      ],
      "Admin": 0
    },
    {
      "CommandText": "handsup",
      "Parameters": [],
      "Admin": 0
    },
    {
      "CommandText": "cuff",
      "Parameters": [
        "target",
        "null"
      ],
      "Admin": 0
    },
    {
      "CommandText": "dragout",
      "Parameters": [
        "target",
        "null"
      ],
      "Admin": 0
    },
    {
      "CommandText": "switchseats",
      "Parameters": [
        "target"
      ],
      "Admin": 0
    },
    {
      "CommandText": "forceswitchseats",
      "Parameters": [
        "player",
        "target"
      ],
      "Admin": 1
    },
    {
      "CommandText": "takecomp",
      "Parameters": [
        "target",
        "wep",
        "component"
      ],
      "Admin": 3
    },
    {
      "CommandText": "rules",
      "Parameters": [],
      "Admin": 0
    },
    {
      "CommandText": "attachcomp",
      "Parameters": [
        "target",
        "component"
      ],
      "Admin": 3
    },
    {
      "CommandText": "removecomp",
      "Parameters": [
        "component"
      ],
      "Admin": 0
    },
    {
      "CommandText": "convertpoints",
      "Parameters": [
        "amount",
        "type"
      ],
      "Admin": 0
    },
    {
      "CommandText": "buycomp",
      "Parameters": [
        "component"
      ],
      "Admin": 0
    },
    {
      "CommandText": "mycomps",
      "Parameters": [],
      "Admin": 0
    },
    {
      "CommandText": "givegun",
      "Parameters": [
        "target",
        "ammo",
        "wep"
      ],
      "Admin": 3
    },
    {
      "CommandText": "gun",
      "Parameters": [
        "ammo",
        "wep"
      ],
      "Admin": 0
    },
    {
      "CommandText": "world",
      "Parameters": [
        "worldid"
      ],
      "Admin": 0
    },
    {
      "CommandText": "givegunall",
      "Parameters": [
        "ammo",
        "wep"
      ],
      "Admin": 3
    },
    {
      "CommandText": "fix",
      "Parameters": [],
      "Admin": 0
    },
    {
      "CommandText": "afix",
      "Parameters": [
        "target"
      ],
      "Admin": 1
    },
    {
      "CommandText": "flip",
      "Parameters": [],
      "Admin": 0
    },
    {
      "CommandText": "removeavehs",
      "Parameters": [],
      "Admin": 1
    },
    {
      "CommandText": "autojoin",
      "Parameters": [],
      "Admin": 0
    },
    {
      "CommandText": "driveby",
      "Parameters": [],
      "Admin": 0
    },
    {
      "CommandText": "stats",
      "Parameters": [],
      "Admin": 0
    },
    {
      "CommandText": "gethp",
      "Parameters": [
        "target"
      ],
      "Admin": 1
    },
    {
      "CommandText": "getfps",
      "Parameters": [
        "target"
      ],
      "Admin": 1
    },
    {
      "CommandText": "pos",
      "Parameters": [],
      "Admin": 0
    },
    {
      "CommandText": "voicemode",
      "Parameters": [],
      "Admin": 0
    },
    {
      "CommandText": "kill",
      "Parameters": [],
      "Admin": 0
    },
    {
      "CommandText": "lobby",
      "Parameters": [],
      "Admin": 0
    },
    {
      "CommandText": "mylobby",
      "Parameters": [],
      "Admin": 0
    },
    {
      "CommandText": "clientcmd",
      "Parameters": [],
      "Admin": 0
    },
    {
      "CommandText": "restartmenu",
      "Parameters": [],
      "Admin": 0
    },
    {
      "CommandText": "lobbies",
      "Parameters": [],
      "Admin": 0
    },
    {
      "CommandText": "switchlobby",
      "Parameters": [
        "args"
      ],
      "Admin": 0
    },
    {
      "CommandText": "dmarenas",
      "Parameters": [],
      "Admin": 0
    },
    {
      "CommandText": "realmendm",
      "Parameters": [
        "arenaid",
        "teamid"
      ],
      "Admin": 0
    },
    {
      "CommandText": "dm",
      "Parameters": [
        "arenaid"
      ],
      "Admin": 0
    },
    {
      "CommandText": "freeroam",
      "Parameters": [],
      "Admin": 0
    },
    {
      "CommandText": "fcmds",
      "Parameters": [],
      "Admin": 0
    },
    {
      "CommandText": "derby",
      "Parameters": [],
      "Admin": 0
    },
    {
      "CommandText": "setweather",
      "Parameters": [
        "weatherid"
      ],
      "Admin": 1
    },
    {
      "CommandText": "settime",
      "Parameters": [
        "hour"
      ],
      "Admin": 1
    },
    {
      "CommandText": "gotopos",
      "Parameters": [
        "x",
        "y",
        "z"
      ],
      "Admin": 3
    },
    {
      "CommandText": "getip",
      "Parameters": [
        "target"
      ],
      "Admin": 3
    },
    {
      "CommandText": "getsc",
      "Parameters": [
        "target"
      ],
      "Admin": 3
    },
    {
      "CommandText": "gethwid",
      "Parameters": [
        "target"
      ],
      "Admin": 3
    },
    {
      "CommandText": "setdimension",
      "Parameters": [
        "target",
        "vw"
      ],
      "Admin": 2
    },
    {
      "CommandText": "sendtolobby",
      "Parameters": [
        "target"
      ],
      "Admin": 1
    },
    {
      "CommandText": "resetclothing",
      "Parameters": [
        "target",
        "team"
      ],
      "Admin": 1
    },
    {
      "CommandText": "putinveh",
      "Parameters": [
        "target",
        "toputin",
        "seat",
        "0"
      ],
      "Admin": 1
    },
    {
      "CommandText": "restock",
      "Parameters": [],
      "Admin": 0
    },
    {
      "CommandText": "keys",
      "Parameters": [],
      "Admin": 0
    },
    {
      "CommandText": "teleport",
      "Parameters": [
        "tp"
      ],
      "Admin": 0
    },
    {
      "CommandText": "setgamevehicle",
      "Parameters": [
        "target",
        "team",
        "car"
      ],
      "Admin": 0
    },
    {
      "CommandText": "resetcharacter",
      "Parameters": [
        "target"
      ],
      "Admin": 2
    },
    {
      "CommandText": "report",
      "Parameters": [
        "target",
        "description"
      ],
      "Admin": 0
    },
    {
      "CommandText": "helpme",
      "Parameters": [
        "description"
      ],
      "Admin": 0
    },
    {
      "CommandText": "car",
      "Parameters": [],
      "Admin": 0
    },
    {
      "CommandText": "cmds",
      "Parameters": [],
      "Admin": 0
    },
    {
      "CommandText": "purchaseammo",
      "Parameters": [],
      "Admin": 0
    },
    {
      "CommandText": "bancheck",
      "Parameters": [
        "sqlorname"
      ],
      "Admin": 1
    },
    {
      "CommandText": "ocheckstats",
      "Parameters": [
        "name"
      ],
      "Admin": 2
    },
    {
      "CommandText": "unsuspend",
      "Parameters": [
        "name"
      ],
      "Admin": 2
    },
    {
      "CommandText": "changename",
      "Parameters": [
        "name",
        "newname"
      ],
      "Admin": 4
    },
    {
      "CommandText": "deleteaccount",
      "Parameters": [
        "name"
      ],
      "Admin": 4
    },
    {
      "CommandText": "changepass",
      "Parameters": [
        "name",
        "newpass"
      ],
      "Admin": 4
    },
    {
      "CommandText": "changemypass",
      "Parameters": [
        "newpass"
      ],
      "Admin": 0
    },
    {
      "CommandText": "checkplayer",
      "Parameters": [
        "accountname"
      ],
      "Admin": 1
    },
    {
      "CommandText": "checkbanevaders",
      "Parameters": [],
      "Admin": 2
    },
    {
      "CommandText": "unban",
      "Parameters": [
        "sqlorname"
      ],
      "Admin": 2
    },
    {
      "CommandText": "oban",
      "Parameters": [
        "name",
        "reason"
      ],
      "Admin": 2
    },
    {
      "CommandText": "ban",
      "Parameters": [
        "target",
        "reason"
      ],
      "Admin": 2
    },
    {
      "CommandText": "suspend",
      "Parameters": [
        "target"
      ],
      "Admin": 2
    },
    {
      "CommandText": "createlobby",
      "Parameters": [],
      "Admin": 2
    },
    {
      "CommandText": "deletelobby",
      "Parameters": [
        "lobbyid"
      ],
      "Admin": 2
    },
    {
      "CommandText": "setlobbypassword",
      "Parameters": [
        "lobbyid",
        "password"
      ],
      "Admin": 2
    },
    {
      "CommandText": "lobbymode",
      "Parameters": [
        "lobbyid",
        "mode"
      ],
      "Admin": 2
    },
    {
      "CommandText": "setlobbyfugitivepercent",
      "Parameters": [
        "lobbyid",
        "percent"
      ],
      "Admin": 2
    },
    {
      "CommandText": "togglelobby",
      "Parameters": [
        "lobbyid"
      ],
      "Admin": 2
    },
    {
      "CommandText": "togglemap",
      "Parameters": [
        "map"
      ],
      "Admin": 2
    },
    {
      "CommandText": "nextmap",
      "Parameters": [
        "map"
      ],
      "Admin": 1
    },
    {
      "CommandText": "saveserver",
      "Parameters": [],
      "Admin": 4
    },
    {
      "CommandText": "squadmembers",
      "Parameters": [],
      "Admin": 0
    },
    {
      "CommandText": "squadaccept",
      "Parameters": [],
      "Admin": 0
    },
    {
      "CommandText": "squadleave",
      "Parameters": [],
      "Admin": 0
    },
    {
      "CommandText": "removelanguage",
      "Parameters": [
        "language"
      ],
      "Admin": 4
    },
    {
      "CommandText": "addlanguage",
      "Parameters": [
        "language"
      ],
      "Admin": 4
    },
    {
      "CommandText": "languages",
      "Parameters": [],
      "Admin": 0
    },
    {
      "CommandText": "language",
      "Parameters": [
        "language"
      ],
      "Admin": 0
    },
    {
      "CommandText": "languagechat",
      "Parameters": [
        "message"
      ],
      "Admin": 0
    },
    {
      "CommandText": "squadchat",
      "Parameters": [
        "message"
      ],
      "Admin": 0
    },
    {
      "CommandText": "squad",
      "Parameters": [
        "target"
      ],
      "Admin": 0
    },
    {
      "CommandText": "fugitivelist",
      "Parameters": [],
      "Admin": 2
    },
    {
      "CommandText": "lastlogin",
      "Parameters": [
        "target"
      ],
      "Admin": 1
    },
    {
      "CommandText": "agivepoints",
      "Parameters": [
        "target",
        "points"
      ],
      "Admin": 4
    },
    {
      "CommandText": "grantxp",
      "Parameters": [
        "target",
        "xp"
      ],
      "Admin": 4
    },
    {
      "CommandText": "setteam",
      "Parameters": [
        "target",
        "team"
      ],
      "Admin": 1
    },
    {
      "CommandText": "maps",
      "Parameters": [],
      "Admin": 5
    },
    {
      "CommandText": "addmapspawn",
      "Parameters": [
        "mapid",
        "teamid"
      ],
      "Admin": 4
    },
    {
      "CommandText": "deletemapspawn",
      "Parameters": [
        "mapid",
        "spawnid"
      ],
      "Admin": 4
    },
    {
      "CommandText": "mapspawns",
      "Parameters": [
        "mapid"
      ],
      "Admin": 4
    },
    {
      "CommandText": "deletemap",
      "Parameters": [
        "mapname"
      ],
      "Admin": 4
    },
    {
      "CommandText": "createmap",
      "Parameters": [
        "mapname"
      ],
      "Admin": 4
    },
    {
      "CommandText": "createdmarena",
      "Parameters": [
        "name"
      ],
      "Admin": 4
    },
    {
      "CommandText": "selectdmarena",
      "Parameters": [
        "name"
      ],
      "Admin": 4
    },
    {
      "CommandText": "editdmarena",
      "Parameters": [
        "options"
      ],
      "Admin": 4
    },
    {
      "CommandText": "vtuner",
      "Parameters": [
        "team"
      ],
      "Admin": 0
    },
    {
      "CommandText": "tuneveh",
      "Parameters": [],
      "Admin": 0
    },
    {
      "CommandText": "cameraset",
      "Parameters": [
        "x",
        "y",
        "z",
        "rx",
        "ry",
        "rz",
        "viewangle"
      ],
      "Admin": 6
    },
    {
      "CommandText": "setadmin",
      "Parameters": [
        "target",
        "level"
      ],
      "Admin": 4
    },
    {
      "CommandText": "osetadmin",
      "Parameters": [
        "name",
        "level"
      ],
      "Admin": 4
    },
    {
      "CommandText": "ogivedonorpoints",
      "Parameters": [
        "name",
        "points"
      ],
      "Admin": 5
    },
    {
      "CommandText": "givedonorpoints",
      "Parameters": [
        "target",
        "points"
      ],
      "Admin": 5
    },
    {
      "CommandText": "setdonator",
      "Parameters": [
        "target",
        "level"
      ],
      "Admin": 5
    },
    {
      "CommandText": "osetdonator",
      "Parameters": [
        "name",
        "level"
      ],
      "Admin": 5
    },
    {
      "CommandText": "dc",
      "Parameters": [
        "text"
      ],
      "Admin": 0
    },
    {
      "CommandText": "id",
      "Parameters": [
        "name"
      ],
      "Admin": 0
    },
    {
      "CommandText": "afk",
      "Parameters": [],
      "Admin": 0
    },
    {
      "CommandText": "looc",
      "Parameters": [
        "text"
      ],
      "Admin": 0
    },
    {
      "CommandText": "low",
      "Parameters": [
        "text"
      ],
      "Admin": 0
    },
    {
      "CommandText": "cw",
      "Parameters": [
        "text"
      ],
      "Admin": 0
    },
    {
      "CommandText": "s",
      "Parameters": [
        "text"
      ],
      "Admin": 0
    },
    {
      "CommandText": "m",
      "Parameters": [
        "text"
      ],
      "Admin": 0
    },
    {
      "CommandText": "r",
      "Parameters": [
        "text"
      ],
      "Admin": 0
    },
    {
      "CommandText": "admins",
      "Parameters": [],
      "Admin": 1
    },
    {
      "CommandText": "ooc",
      "Parameters": [
        "text"
      ],
      "Admin": 1
    },
    {
      "CommandText": "lobbychat",
      "Parameters": [
        "text"
      ],
      "Admin": 0
    },
    {
      "CommandText": "ann",
      "Parameters": [
        "text"
      ],
      "Admin": 2
    },
    {
      "CommandText": "anonymous",
      "Parameters": [],
      "Admin": 2
    },
    {
      "CommandText": "pm",
      "Parameters": [
        "target",
        "text"
      ],
      "Admin": 0
    },
    {
      "CommandText": "passgun",
      "Parameters": [
        "target"
      ],
      "Admin": 0
    },
    {
      "CommandText": "removeguns",
      "Parameters": [
        "target"
      ],
      "Admin": 2
    },
    {
      "CommandText": "removegunsfromall",
      "Parameters": [],
      "Admin": 3
    },
    {
      "CommandText": "freeze",
      "Parameters": [
        "target"
      ],
      "Admin": 1
    },
    {
      "CommandText": "rfreeze",
      "Parameters": [
        "range"
      ],
      "Admin": 1
    },
    {
      "CommandText": "tfreeze",
      "Parameters": [
        "teamid"
      ],
      "Admin": 1
    },
    {
      "CommandText": "tunfreeze",
      "Parameters": [
        "teamid"
      ],
      "Admin": 1
    },
    {
      "CommandText": "runfreeze",
      "Parameters": [
        "range"
      ],
      "Admin": 1
    },
    {
      "CommandText": "unfreeze",
      "Parameters": [
        "target"
      ],
      "Admin": 1
    },
    {
      "CommandText": "kick",
      "Parameters": [
        "target",
        "reason"
      ],
      "Admin": 1
    },
    {
      "CommandText": "ojail",
      "Parameters": [
        "name",
        "minutes",
        "reason"
      ],
      "Admin": 1
    },
    {
      "CommandText": "jail",
      "Parameters": [
        "target",
        "mins",
        "reason"
      ],
      "Admin": 1
    },
    {
      "CommandText": "unjail",
      "Parameters": [
        "target"
      ],
      "Admin": 1
    },
    {
      "CommandText": "ounjail",
      "Parameters": [
        "name"
      ],
      "Admin": 1
    },
    {
      "CommandText": "warn",
      "Parameters": [
        "target",
        "reason"
      ],
      "Admin": 1
    },
    {
      "CommandText": "unwarn",
      "Parameters": [
        "target"
      ],
      "Admin": 1
    },
    {
      "CommandText": "mute",
      "Parameters": [
        "target",
        "mins",
        "reason"
      ],
      "Admin": 1
    },
    {
      "CommandText": "omute",
      "Parameters": [
        "name",
        "minutes",
        "reason"
      ],
      "Admin": 1
    },
    {
      "CommandText": "ounmute",
      "Parameters": [
        "name"
      ],
      "Admin": 1
    },
    {
      "CommandText": "unmute",
      "Parameters": [
        "target"
      ],
      "Admin": 1
    },
    {
      "CommandText": "me",
      "Parameters": [
        "text"
      ],
      "Admin": 0
    },
    {
      "CommandText": "do",
      "Parameters": [
        "text"
      ],
      "Admin": 0
    },
    {
      "CommandText": "archiveaccounts",
      "Parameters": [
        "min_inactive_days"
      ],
      "Admin": 4
    },
    {
      "CommandText": "forceautojoin",
      "Parameters": [
        "target"
      ],
      "Admin": 1
    },
    {
      "CommandText": "slap",
      "Parameters": [
        "target"
      ],
      "Admin": 1
    },
    {
      "CommandText": "showshotstats",
      "Parameters": [
        "target"
      ],
      "Admin": 1
    },
    {
      "CommandText": "resetshotstats",
      "Parameters": [
        "target"
      ],
      "Admin": 1
    },
    {
      "CommandText": "shotstats",
      "Parameters": [],
      "Admin": 0
    },
    {
      "CommandText": "outfit",
      "Parameters": [
        "option"
      ],
      "Admin": 0
    },
    {
      "CommandText": "clothing",
      "Parameters": [
        "team"
      ],
      "Admin": 0
    },
    {
      "CommandText": "char",
      "Parameters": [
        "action"
      ],
      "Admin": 0
    },
    {
      "CommandText": "requests",
      "Parameters": [],
      "Admin": 1
    },
    {
      "CommandText": "acceptreport",
      "Parameters": [
        "requestid"
      ],
      "Admin": 1
    },
    {
      "CommandText": "denyreport",
      "Parameters": [
        "requestid",
        "reason"
      ],
      "Admin": 1
    },
    {
      "CommandText": "nametags",
      "Parameters": [],
      "Admin": 3
    },
    {
      "CommandText": "spec",
      "Parameters": [
        "target"
      ],
      "Admin": 0
    },
    {
      "CommandText": "loadout",
      "Parameters": [],
      "Admin": 0
    },
  ];
}