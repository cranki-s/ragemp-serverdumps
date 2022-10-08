{
let ChemistryBrowser = null;
const AllChemestryQuestions = [
    {
    title: "Сульфат міді",
    items: ["O4", "S", "O2", "Cu", "H2"],
    answer: ["Cu", "S", "O4"]
    },
    {
    title: "Карбонат натрію",
    items: ["Na2", "2Na", "O2", "C", "O3"],
    answer: ["Na2", "C", "O3"]
    },
    {
    title: "Гідроксид натрію",
    items: ["Na", "H2", "O2", "O", "H"],
    answer: ["Na", "O", "H"]
    },
    {
    title: "Оксид заліза(III)",
    items: ["Fe", "Fe2", "O2", "O3", "H2"],
    answer: ["Fe2", "O3"]
    },
    {
    title: "Соляна кислота",
    items: ["2Na", "H", "O2", "Cl", "H2"],
    answer: ["H", "Cl"]
    },
    {
    title: "Метасилікат натрію",
    items: ["Na2", "Si", "O2", "O3", "H2"],
    answer: ["Na2", "Si", "O3"]
    },
    {
    title: "Гідросульфат натрію",
    items: ["Na", "H", "O4", "H2", "S"],
    answer: ["Na", "H", "S", "O4"]
    },
    {
    title: "Оксид водню",
    items: ["H", "H2", "O2", "O", "Cl"],
    answer: ["H2", "O"]
    },
    {
    title: "Діоксид вуглецю",
    items: ["C", "C2", "O3", "O2", "H2"],
    answer: ["C", "O2"]
    },
    {
    title: "Хлорид алюмінію",
    items: ["Na", "S", "Cl3", "Al", "O2"],
    answer: ["Al", "Cl3"]
    },
    {
    title: "Гідроксид калію",
    items: ["K", "S", "O", "H", "O4"],
    answer: ["K", "O", "H"]
    },
    {
    title: "Сульфід натрію",
    items: ["Na", "S", "O4", "Na2", "O2"],
    answer: ["Na2", "S"]
    },
    {
    title: "Хлорид алюмінію",
    items: ["Na", "S", "Cl3", "Al", "O2"],
    answer: ["Al", "Cl3"]
    },
    {
    title: "Оксид цинку",
    items: ["Zn", "S", "O", "H2", "Zn2"],
    answer: ["Zn", "O"]
    },
    {
    title: "Оксид азоту(II)",
    items: ["N", "O2", "O", "Al", "Na"],
    answer: ["N", "O"]
    },
    {
    title: "Азотна кислота",
    items: ["H", "H2", "N", "O2", "O3"],
    answer: ["H", "N", "O3"]
    },
    {
    title: "Бромід заліза(III)",
    items: ["Br", "Br2", "Br3", "Fe", "O3"],
    answer: ["Fe", "Br3"]
    },
    {
    title: "Нітрат срібла(I)",
    items: ["Ag", "2Ag", "N", "O2", "O3"],
    answer: ["Ag", "N", "O3"]
    },
    {
    title: "Ортофосфатна кислота",
    items: ["H3", "H2", "P", "O4", "O3"],
    answer: ["H3", "P", "O4"]
    }
  ]
mp.events.add('September.Chemistry.StartGame',()=>{
    if(!ChemistryBrowser){
        ChemistryBrowser = mp.browsers.new('http://package/systems/player/Quest/Chemistry/index.html');
    }
    ChemistryBrowser.execute(`сhemist.open(${JSON.stringify(getMultipleRandom(AllChemestryQuestions, 4))})`)
    global.menuOpen();
});
mp.events.add('September.Chemistry.Finish',(result)=>{
    if(ChemistryBrowser){
        ChemistryBrowser.destroy();
        ChemistryBrowser = null;
    }
    global.menuClose();
    NexusEvent.callRemote('September.Chemistry.Finish',result * 2);
});
function getMultipleRandom(arr, num) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
  
    return shuffled.slice(0, num);
  }

mp.events.add("September.Question.Pass", (result)=>{
    NexusEvent.callRemote('September.Question.Pass.Server', result);
})

mp.events.add('September.Questions.Start', ()=>{
    NexusEvent.callRemote('September.TakeQuest.Question');
})

mp.events.add('September.Questions.End', ()=>{
    NexusEvent.callRemote('September.FinishQuest.Question');
})

mp.events.add('September.ConfirmBuy', (amount)=>{
    let value = parseInt(amount);
    global.menuClose();
    if(isNaN(value)) return;
    NexusEvent.callRemote('September.Buy', value);
});


let robBlip = null;
mp.events.add('Paint.CreateBlip', (position)=>{
    mp.events.call('Paint.DestroyBlip');
    robBlip = mp.blips.new(0, position,
        {
            name: global.GetText("Киностудия"),
            scale: 1,
            color: 49,
            alpha: 255,
            drawDistance: 100,
            shortRange: false,
            rotation: 0,
            dimension: 0,
        });
});

mp.events.add('Paint.DestroyBlip', ()=>{
    if(robBlip!=null){
        robBlip.destroy();
        robBlip = null;
    }
});


/////////////////////////////////////////////






var markers = [];

mp.events.add('Quest.Ckeckpoint.Add', function (uid, type, position, scale, dimension, r, g, b, dir) {
    if (typeof markers[uid] != "undefined") 
    {
        markers[uid].destroy();
        markers[uid] = undefined;
    }
    if (dir != undefined) {
        markers[uid] = mp.checkpoints.new(type, position, scale,
            {
                direction: dir,
                color: [r, g, b, 200],
                visible: true,
                dimension: dimension
            });
    }
    else {
        markers[uid] = mp.markers.new(type, position, scale,
            {
                visible: true,
                dimension: dimension,
                color: [r, g, b, 255]
            });
    }
});

mp.events.add('Quest.Checkpoint.Remove', function (uid) {
    if (typeof markers[uid] == "undefined") return;
    markers[uid].destroy();
    markers[uid] = undefined;
});


/////////////////BLIPS////////////////////////


var blips = [];
mp.events.add('Quest.Blip.Add', function (uid, type, position, text, shortRange) {
    if (typeof blips[uid] != "undefined") 
    {
        blips[uid].destroy();
        blips[uid] = undefined;
    }
    blips[uid] = mp.blips.new(type, position,
        {
            name: text,
            scale: 1.2,
            color: 47,
            alpha: 255,
            drawDistance: 100,
            shortRange: shortRange,
            rotation: 0,
            dimension: 0,
        });
});

mp.events.add('Quest.Blip.Remove', function (uid) {
    if (typeof blips[uid] == "undefined") return;
    blips[uid].destroy();
    blips[uid] = undefined;
});



////////////////////////////////////////////////////////////////////

let questIcons = [];
let hidedIcon = null;

mp.events.add('Quest.NpcIcon.addQuest',(npcName)=>{
    questIcons.push(npcName);
});

mp.events.add('Quest.NpcIcon.removeQuest',(npcName)=>{
    questIcons.splice(questIcons.indexOf(npcName), 1);
});

mp.events.add('Quest.NpcIcon.hideQuest',(npcName)=>{
    questIcons.splice(questIcons.indexOf(npcName), 1);
    hidedIcon = npcName;
});



mp.events.add('render', ()=>{
   // try{
        if(questIcons.length>0){
            var vector = new mp.Vector3(mp.players.local.getCoords(true).x, mp.players.local.getCoords(true).y, mp.players.local.getCoords(true).z);
            questIcons.forEach(npcName => {
                try{
                var dist = vector.subtract(Peds[npcName].position).length();
                if(dist<17)
                mp.game.graphics.drawText("?", [Peds[npcName].entity.getCoords(true).x, Peds[npcName].entity.getCoords(true).y, Peds[npcName].entity.getCoords(true).z+1.1+(dist/65)], { 
                    font: 7, 
                    color: [205, 123, 0, (-dist*7.5)+150], 
                    scale: calculateScale(dist), 
                    outline: true,
                    centre: true
                });
                } catch(e){}
            });
        }
  //  }catch(e){}
});


function calculateScale(distance){
    return [-Math.sqrt((distance/4)+10)+4.35, -Math.sqrt((distance/4)+10)+4.35];
}



/////////////////////////////////////////////////////////////

let repliqueArray = null;
let npcName = null;
mp.events.add('Quest.Dialogue.Start',(dialogueJSON, npc)=>{
    repliqueArray = JSON.parse(dialogueJSON);    
    global.browser.execute(`App.$router.push(${JSON.stringify({path : '/dialogs'})})`);
    npcName = Peds[npc].labelText;
    global.browser.open();
    global.NPCDialogOpened = true;
    mp.events.call('NPC.cameraOn', npc, 1500);  
    mp.events.call('Quest.NpcIcon.hideQuest', npc);  
});
mp.events.add('Dialog:GetReplique',(repiqueId)=>{
    global.browser.execute(`RPC.resolve('Dialog:GetReplique', ${JSON.stringify(repliqueArray.find(x=>x.id==repiqueId))}, '${npcName}')`);
});

mp.events.add('Quest.Quest.DialogueEnd', finished => {
    mp.events.call('NPC.cameraOff', 1500);
    if(finished){
        hidedIcon = null;
    }else{
        questIcons.push(hidedIcon);
    }
    NexusEvent.callRemote('Quest.Dialogue.Finish', finished);
});

mp.events.add('Dialog:CloseDialog', ()=>{
    mp.events.call('NPC.cameraOff', 1500);
    setTimeout(()=>{
        global.NPCDialogOpened = false;
    }, 1000);
});

mp.events.add('NPCDialogue.End', callback => {
    if(callback!="null"){
        NexusEvent.callRemote(callback);
    }
});

mp.events.add('Dialog:HideBrowser', ()=>{
    global.browser.close();
});

mp.events.add('NPCDialogue.callback', callback => {
    if(callback!="null"){
        NexusEvent.callRemote(callback);
    }
});





////////////////SPECIAL EVENTS/////////////

mp.events.add('Quest.Builder.Start', () => {
    NexusEvent.callRemote('Quest.Special.StartBuilder');
});


/////////////// Police Dialogues //////////////////////////

mp.events.add('Police.Car.KeyDuplicate', (number)=>{
    NexusEvent.callRemote('Police.Car.KeyDuplicate.Server', number);
});

mp.events.add('Police.Car.ChangeLock', (number)=>{
    NexusEvent.callRemote('Police.Car.ChangeLock.Server', number);
})




}褅ϛ