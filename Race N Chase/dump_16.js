{
mp.events.add("StartTutorial", () => {
    if(ServerUI == null) return;
    IsInTutorial = true;

    var TutorialQuestions = [
        {
            type: 1,
            title: "Race 'N' Chase - First-time setup",
            description: "Welcome to Race 'N' Chase! You will now go through a short tutorial & first-time setup so you can \
            get started with your optimal settings."
        },
        {
            type: 2,
            title: "Voice Chat",
            description: "Race 'N' Chase has a voice chat with multiple modes, main one being the Proximity voice chat.\
            \nIf you enable it, you'll be able to talk with and hear other players, however if you disable it, you won't hear them \
            nor be able to talk with them.\nText-based chat exists.",
            value: true
        },
        {
            type: 3,
            title: "Language",
            description: "The main language on Race 'N' Chase is ENGLISH, however we have a special chat for various languages where players \
            can communicate in their own language. Select your language here:",
            options: ["English/None", "Spanish/Español", "French/Français", "Russian/Pусский", "Turkish/Türkçe", "Ex-Yugo/Balkanski", 
                      "Arabic/earabiun"],
            value: "English/None"
        },
        {
            type: 1,
            title: "Tutorial -",
            description: "Great! You finished the first-time setup.\nNow, you will be presented with a short tutorial. The gamemode is rather\
            simple, however we highly advise you to read it as you might learn something useful. ;-)"
        },
        {
            type: 1,
            title: "Tutorial - Basics",
            description: "You can open the <strong>Main Menu</strong> by pressing <strong>M</strong> on your keyboard.\n\
            Everything, from switching modes, to buying items, to changing settings, is done in the main menu.\n\n\
            Items are purchased with <strong>Points</strong, which can be earned by playing copchase, deathmatch, etc.\n\
            Some items have a level requirement - you can level up by earning <strong>XP</strong> through similar means as earning Points."
        },
        {
            type: 1,
            title: "Race 'N' Chase - Copchase",
            description: "The \"main\" gamemode of this server is considered to be the <strong>Copchase</strong> mode. It is played in <strong>rounds</strong>, where you'll \
            take the role of either a Cop, or a Fugitive.\nIf you die, you will have to wait in the lobby until the next round starts."
        },
        {
            type: 1,
            title: "Race 'N' Chase - Cop Team",
            description: "Cops are tasked with <strong>stopping the Fugitives by any means necessary</strong>. This can be done by either apprehending or neutralizing \
            them.\n<strong>If a fugitive hasn't opened fire first</strong> (visible by the SHOT TAG above their head), <strong>you are not allowed to kill them!</strong>\n\n\
            You can various equipment to stop the fugitives. For example, the MDC allows you to deploy spikes/stingers."
        },
        {
            type: 1,
            title: "Race 'N' Chase - Fugitive Team",
            description: "Fugitives must <strong>escape by any means necessary</strong>. This can be done by either surviving until the round ends, or killing all Cops.\n\
            The <strong>possibilities are endless</strong> and you will have to think fast in order to outsmart the Cops. Fugitives are outnumbered too.\n\n\
            For balancing purposes, after a certain round time passes, all Fugitives automatically receive the SHOT TAG, meaning they can be shot.\n\
            Also, <strong>fugitive vehicles have LIMITED FUEL</strong>. You can steal one of the many parked vehicles around the map if necessary."
        },
        {
            type: 1,
            title: "Tutorial - Copchase Items",
            description: "Both teams have access to an <strong>array of items and tools</strong> that can help them. The most basic item is the Medkit, which takes 10 seconds to equip and heals you.\n\
            There are also the Painkillers which will slowly regenerate your health over time, the advantage being the ability to move around.\n\n\
            <strong>Some items are team-specific</strong>. For example, Fugitives can buy Lockpicks to break into locked vehicles."
        },
        {
            type: 1,
            title: "Tutorial - Side-modes",
            description: "To prevent boredom while waiting in the lobby, Race 'N' Chase offers some <strong>side-modes which you can join at any time</strong>.\n\
            The first side-mode is <strong>Deathmatch</strong> which is set in multiple arenas and the goal is to kill other players.\n\
            The second side-mode is <strong>Derby</strong> where the goal is to survive the longest on the platform.\n\
            And last, but not least is <strong>Freeroam</strong> which lets you go wild. Spawn vehicles, tune them, spawn weapons - anything!"
        },
        {
            type: 1,
            title: "Tutorial - The End",
            description: "Bet you couldn't wait to get to the end of this tutorial. :) Well, whether you read it or not, we are sure you will catch the basics\n\
            and understand how this server works pretty quickly.\n\n\
            You will now be sent to the <strong>Character Creator</strong> to create your appearance. Have fun!"
        }
    ];
    ServerUI.execute(`
    gm.$refs.helpers.$refs.tutorial.pages = ${JSON.stringify(TutorialQuestions)};
    gm.$refs.helpers.$refs.tutorial.enabled = true;
    `);

    setTimeout(() => {
        mp.gui.cursor.show(true, true);
    }, 100);
    setTimeout(() => {
        mp.gui.cursor.show(true, true);
    }, 500);
    setTimeout(() => {
        mp.gui.cursor.show(true, true);
    }, 1000);

    let pos = mp.players.local.position;
    pos.x += 20;
    pos.y += 20;
    mp.players.local.position = pos;
});
// Results come in an array where INDEXES are in ORDER of QUESTIONS SET IN THE FIRST ARRAY [StartTutorial]
/* Values: [true, 3, ....]... [
    null,
    false,
    "German"
]*/
mp.events.add("OnFinishTutorial", (results) => {

    mp.events.callRemote(results);
    let resobj = JSON.parse(results);
    IsInTutorial = false;
    let useVoice = resobj[1];
    let language = resobj[2];

    mp.events.callLocal("login_StopMusic");
    mp.events.callRemote("Server_FinishTutorial", useVoice, language);
    mp.gui.cursor.show(false, false);
   // ServerUI.execute(`gm.$refs.hud.enabled = true;`);
});
}ϱ