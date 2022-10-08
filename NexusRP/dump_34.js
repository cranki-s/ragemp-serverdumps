{
let atmMenu = global.ConstrolsBrowser;
mp.events.add('Atm:OpenAtm', (info) => {
    atmMenu.execute(`window.locale ='${global.Language}'`)
    atmMenu.execute(`openInterface('atm')`);
    atmMenu.execute(`controls.openHome(${info})`);
    global.menuOpen()
})
mp.events.add('Atm:DestroyBrowser', () => {
    atmMenu.execute(`closeInterface()`);
    global.menuClose();
})
mp.events.add('Atm:AccountAction', (type, sum) => {
    NexusEvent.callRemote('Atm:AccountAction', type, sum);
})
mp.events.add('Atm:AccountActionCallBack', (info, type, status) => {
    atmMenu.execute(`controls.openHome(${info})`);
    atmMenu.execute(`controls.successNotify(${status})`);
})
mp.events.add('Atm:TransferAction', (number, sum) => {
    NexusEvent.callRemote('Atm:TransferAction', number, sum);
});
mp.events.add('Atm:TransferActionCallback', (info, status) => {
    atmMenu.execute(`controls.openHome(${info})`);
    atmMenu.execute(`controls.successNotify(${status})`);
})
let items = [
    {
        id:1,
        otype:'account',
        ammount:123123,
        date:'23/10/1999',
        time:'12:12'
    },
    {
        id:2,
        otype:'account',
        ammount:-123123,
        date:'23/10/1999',
        time:'12:12'
    },
    {
        id:3,
        otype:'transfer',
        ammount:123123,
        date:'23/10/1999',
        time:'12:12'
    },
    {
        id:4,
        otype:'transfer',
        ammount:-123123,
        date:'23/10/1999',
        time:'12:12'
    }
]
mp.events.add('Atm:SetHistory',(type)=>{
    console.log('Atm:SetHistory',type);
    let itemsCopy = JSON.parse(JSON.stringify(items))
    if(type === 'transfer'){
        itemsCopy = itemsCopy.filter(x=>x.otype === 'transfer');
    }
    if(type === 'put'){
        itemsCopy = itemsCopy.filter(x=>x.otype === 'account' && x.ammount>0);
    }
    if(type === 'get'){
        itemsCopy = itemsCopy.filter(x=>x.otype === 'account' && x.ammount<0);
    }
    atmMenu.execute(`controls.openHistory('${type}',${JSON.stringify(itemsCopy)})`);
});
}