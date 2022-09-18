{

global.familypad = global.ConstrolsBrowser;;
mp.events.add('Constrols:FamilyOpenFractionPad', (members, count, pages, names, padtype) => {            
        familypad.execute(`window.locale='${global.Language}'`);
        familypad.execute(`openInterface('organization')`);
        familypad.execute(`controls.setData('${padtype}','${names}')`);
        global.OpenedType = padtype;
        global.menuOpen();
        familypad.execute(`controls.openMembers(${members},${Number(count)},${Number(pages)})`)
});

mp.events.add('Constrols:FamilyopenMemberEditor',(editableMember,shortRanks)=>{
    if (familypad != null) {
        if (global.OpenedType == "family") {
            familypad.execute(`controls.openMemberEditor(${editableMember},${shortRanks})`);
        }
    }
})

let showfracplayers = false;
mp.events.add('Controls:FamilySetNavigationTabCallBack',(route,a,b,c)=>{
    if(familypad != null)
    {
        if (global.OpenedType == "family") 
        {
            if (route === 'logs') {
                familypad.execute(`controls.openLogs(${a},${b},${c})`);
            }
            else if (route === 'ranks') {
                familypad.execute(`controls.openRanks(${a},${b})`);
            }
            else if (route === 'vehicles') {
                familypad.execute(`controls.openVehicles(${a})`);            
            } else if (route == 'actions') {
                let t = showfracplayers ? "включено" : "выключено";
                a = JSON.parse(a);
                a.find(x => x.id == "showMembers").value = t;
                a = JSON.stringify(a);
                familypad.execute(`controls.openActions(${a},${b})`);
            }
        }
    }
})
mp.events.add('Constrols:FamilyopenVehicleEditor',(editableVehicle,shortRanks)=>{
    if(familypad != null && global.OpenedType == "family"){
        familypad.execute(`controls.openVehicleEditor(${editableVehicle},${shortRanks})`);
    }
})
mp.events.add('Controls:FamilyUpdateVehicle',(vehicle,types)=>{
    if(familypad != null && global.OpenedType == "family"){
        familypad.execute(`controls.updateVehicle(${vehicle})`);        
        if(types){
            familypad.execute(`controls.route='vehicles'`);
        }
    }
})
mp.events.add('Controls:FamilyrankChangePermissionsCallBack',(rank)=>{
    if(familypad != null && global.OpenedType == "family"){
        familypad.execute(`controls.openRanksEdit(${rank})`);
    }
})



mp.events.add('Controls:FamilyEditRankNameCallback', (rankId) => {
    if (familypad != null && global.OpenedType == "family") {
        familypad.execute(`controls.openRankNameEditor(${rankId})`);
    }
})

mp.events.add('Controls:FamilysetRankNameCallBack', (rankId, rankname, date, time) => {
    if (familypad != null && global.OpenedType == "family") {
        familypad.execute(`controls.updateRankName(${rankId},'${rankname}','${date}','${time}')`);
    }
})



mp.events.add('Controls:FamilyDeleteRankCallBack',(rankId)=>{
    if(familypad != null && global.OpenedType == "family"){
        familypad.execute(`controls.deleteRank(${rankId})`);
    }    
})
mp.events.add('Controls:FamilyAddRankCallBack',(newRank)=>{
    if(familypad != null && global.OpenedType == "family"){
        familypad.execute(`controls.addRank(${newRank})`);
    }
})


mp.events.add('Controls:FamilyUpdateMember', (member, types) => {
    if (familypad != null && global.OpenedType == "family") {
        familypad.execute(`controls.updateMember(${member})`);
        if (types) {
            familypad.execute(`controls.route='members'`);
        }
    }
})

mp.events.add('Controls:FamilyDeleteMemberCallBack',(members,count)=>{
    if (familypad != null && global.OpenedType == "family") {
        familypad.execute(`controls.members = ${members}`);
        familypad.execute(`controls.membersCount = ${count}`);
    }
})
}