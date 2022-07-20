{
class Achievement{
    constructor(ID, name, description, rewardXP, rewardPoints, unlocked, background){
        this.ID = ID;
        this.name = name;
        this.description = description;
        this.rewardXP = rewardXP;
        this.rewardPoints = rewardPoints;
        this.unlocked = unlocked;
        this.background = background;
    }
}
class DailyChallenge{
    constructor(ID, description, rewardXP, rewardPoints, expireDate, completed, target, progress, type, item){
        this.ID = ID;
        this.description = description;
        this.rewardXP = rewardXP;
        this.rewardPoints = rewardPoints;          
        this.expireDate = expireDate;
        this.completed = completed;
        this.target = target;
        this.progress = progress;
        this.type = type;
        this.item = item;
    }
}
/*class WeeklyChallenge{
    constructor(ID, description, rewardXP, rewardPoints, expireDate){
        this.ID = ID;
        this.description = description;
        this.rewardXP = rewardXP;
        this.rewardPoints = rewardPoints;       
        this.expireDate = expireDate;
    }
}*/

let Achievements = [];
let DailyChallenges = [];
//let WeeklyChallenges = [];

mp.events.add("addAchievement", (id, name, desc, rXP, rPts, isUnlocked, bg) => {
    let a = new Achievement(id, name, desc, rXP, rPts, isUnlocked, bg);
    Achievements.push(a);
});
mp.events.add("addDailyChallenge", (id, desc, rXP, rPts, expireDate, completed, target, progress, type, item) => {
    let c = new DailyChallenge(id,  desc, rXP, rPts, expireDate, completed, target, progress, type, item);
    DailyChallenges.push(c);
});
mp.events.add("clearDailyChallenges", () => {
    UIMenu.execute(`gm.$refs.profile.$refs.ProfileTabs.$refs.Challenges.chals = []`);
    DailyChallenges = [];
})

/*
mp.events.add("addWeeklyChallenge", (id, name, desc, rXP, rPts, expireDate) => {
    let realDate = new Date(expireDate*1000);

    let c = new WeeklyChallenge(id, name, desc, rXP, rPts, realDate);
    WeeklyChallenges.push(c);
});
*/

function getchalbackgroundpic(cht){
    let bgshit = "package://Artwork/Achievements/no_shooting_win.png";
    switch(cht){
        case 0:{
            bgshit = "package://Artwork/Achievements/first_kill.png";
        }
        break;
        case 1:{
            bgshit = "package://Artwork/Achievements/first_vehicle.png";
        }
        break;
        case 2:{
            bgshit = "package://Artwork/Achievements/serial_killer.png";
        }
        break;
        case 3:{
            bgshit = "package://Artwork/Achievements/first_bankrob_cop.png";
        }
        break;
        case 4:{
            bgshit = "package://Artwork/Achievements/first_loadout.png";
        }
        break;
    }
    return bgshit;
}

let weekChalProg = 0;
let weekChalUnix = 0;

mp.events.add("addChallengesToMenu", (weekChallengeProgress, weekChallengeUnix) => {
    let json = `gm.$refs.profile.$refs.ProfileTabs.$refs.Challenges.cats = [`;
    let chstr = "";   
    weekChalProg = weekChallengeProgress;
    weekChalUnix = weekChallengeUnix;
    json += `
        {
            name: "Weekly",
            timer: ${weekChallengeUnix},
            chals: 
            [
                {
                    name: "Daily Challenge 7-day streak",
                    description: "Complete at least one challenge per day for 7 days in a row.",
                    progress: ${weekChallengeProgress},
                    goal: 7,
                    background: "package://Artwork/Achievements/reach_level_100.png"
                }
            ]
       },
       {
           name: "Daily",
           timer: ${DailyChallenges[i].expireDate},
           chals: [`


    for(let i = 0 ; i < DailyChallenges.length; i++){
        chstr = `{
            name: "",
            description: "${DailyChallenges[i].description}",
            progress: ${DailyChallenges[i].progress},
            goal: ${DailyChallenges[i].target},
            background: "${getchalbackgroundpic(DailyChallenges[i].type)}"
        },`;
        json += chstr;
    }
    json += `]}]`;
    UIMenu.execute(json);
});
mp.events.add("advanceChallenge", (arrayID, cht, chi, chp) => {
    
    if(arrayID == 1)
    {
        let chunlock = DailyChallenges.find(a => a.type == cht && a.item == chi);
        if(!chunlock) return;

        DailyChallenges.find(a => a.type == cht && a.item == chi).progress = chp;
        
        UIMenu.execute(`if(gm.$refs.profile.$refs.ProfileTabs.$refs.Challenges.cats[${arrayID}].chals.find(chNig => chNig.description == "${chunlock.description}") != null){
            gm.$refs.profile.$refs.ProfileTabs.$refs.Challenges.cats[${arrayID}].chals.find(chNig => chNig.description == "${chunlock.description}").progress = ${chp};
        }`);
    }
    else{ // weekly
        UIMenu.execute(`if(gm.$refs.profile.$refs.ProfileTabs.$refs.Challenges.cats[${arrayID}].chals.find(chNig => chNig.name == "Daily Challenge 7-day streak") != null){
            gm.$refs.profile.$refs.ProfileTabs.$refs.Challenges.cats[${arrayID}].chals.find(chNig => chNig.name == "Daily Challenge 7-day streak").progress = ${chp};
        }`);
    }
});

mp.events.add("unlockChallenge", (cht, chi) => {
    let chunlock = DailyChallenges.find(a => a.type == cht && a.item == chi);
    if(!chunlock) return;

    DailyChallenges.find(a => a.type == cht && a.item == chi).completed = true;

    let rewardstr = "";
    if(chunlock.rewardXP > 0) rewardstr += `+${chunlock.rewardXP} XP`;
    if(chunlock.rewardPoints > 0){
        if(rewardstr == "") rewardstr += `+${chunlock.rewardPoints} points`;
        else rewardstr += `& +${chunlock.rewardPoints} points`;
    }

    let bgshit = getchalbackgroundpic(cht);

    if(UIHud != null && UIHud != undefined){
        UIHud.execute(`gm.sendAch("Challenge completed!", "${chunlock.description}", "${bgshit}", "${rewardstr}", 6000);`);
    }
    mp.game.audio.playSoundFrontend(-1, "PROPERTY_PURCHASE", "HUD_AWARDS", true);

    mp.events.callLocal("addChallengesToMenu", weekChalProg, weekChalUnix);
});

mp.events.add("sendAchievementNotify", (title, description, background, reward, time, playSound) => {
    if(UIHud != null && UIHud != undefined){
        UIHud.execute(`gm.sendAch("${title}", "${description}", "${background}", "${reward}", ${time});`);
    }    
    if(playSound){
        mp.game.audio.playSoundFrontend(-1, "PROPERTY_PURCHASE", "HUD_AWARDS", true);
    }
});



mp.events.add("addAchievementsToMenu", () => {
    let json = `gm.$refs.profile.$refs.ProfileTabs.$refs.Achievements.achvs = [`;
    let achstr = "";
    for(let i = 0 ; i < Achievements.length; i++){
        achstr = `{
            "name":"${Achievements[i].name}", 
            "description":"${Achievements[i].description}", 
            "unlocked":${Achievements[i].unlocked},
            "background":"${Achievements[i].background}"
        },`;
        json += achstr;
    }
    json += "]";
    UIMenu.execute(json);
});
mp.events.add("unlockAchievement", (achievementName) => {
    let achunlock = Achievements.find(a => a.name == achievementName);
    if(!achunlock) return;

    achunlock.unlocked = true;
    UIMenu.execute(`gm.$refs.profile.$refs.ProfileTabs.$refs.Achievements.achvs.find(a => a.name === "${achievementName}").unlocked = true`);

    let rewardstr = "";
    if(achunlock.rewardXP > 0) rewardstr += `+${achunlock.rewardXP} XP`;
    if(achunlock.rewardPoints > 0){
        if(rewardstr == "") rewardstr += `+${achunlock.rewardPoints} points`;
        else rewardstr += `& +${achunlock.rewardPoints} points`;
    }

    if(UIHud != null && UIHud != undefined){
        UIHud.execute(`gm.sendAch("${achunlock.name}", "${achunlock.description}", "${achunlock.background}", "${rewardstr}", 6000);`);
    }
    mp.game.audio.playSoundFrontend(-1, "PROPERTY_PURCHASE", "HUD_AWARDS", true);

});
}