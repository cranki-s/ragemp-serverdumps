{
//govnojopa
let controlsBusiness = global.ConstrolsBrowser;
let actions = [
    {
        id: 'moneyAction',
        img: 'account',
        title: 'Положить/снять <br> деньги со счета бизнеса',
        type: 'default',
        content: 'Открыть',
    },
    {
        id: 'getOrder',
        img: 'order',
        title: 'Сделать <br> заказ товара',
        type: 'default',
        content: 'Заказать'
    },
    {
        id: 'changePrice',
        img: 'price',
        title: 'Изменить <br> стоимость товара',
        type: 'default',
        content: 'Изменить'
    },
    {
        id: 'sellBusiness',
        img: 'selling',
        title: 'Продать <br> бизнес',
        type: 'default',
        content: 'Продать'
    }
]


mp.events.add('Controls-Business:Openpad', (mainInfo,maxmarkup) => {
    controlsBusiness.execute(`window.locale='${global.Language}'`)
    controlsBusiness.execute(`openInterface('business')`);
    controlsBusiness.execute(`controls.openInformation(${JSON.stringify(actions)},${mainInfo},${maxmarkup})`);
    global.menuOpen();      
})

mp.events.add('Controls-Business:DestroyBrowser',()=>{
    controlsBusiness.execute(`closeInterface()`);
    global.menuClose();
})
mp.events.add('Controls-Business:SetNavigationTab', (route) => {
    Nexus.callRemote('Controls-Business:SetNavigationTab',route);   
})
mp.events.add('Controls-Business:SetNavigationTabCallBack', (route,info, price) => {
    if (route === 'information') {
        controlsBusiness.execute(`controls.openInformation(${JSON.stringify(actions)},${info}, ${price})`);
    }
    if (route === 'schedule') {
        controlsBusiness.execute(`controls.openSchedule(${info})`);
    }
})
mp.events.add('Controls-Business:MoneyAction', (type, value) => {
    Nexus.callRemote('Controls-Business:MoneyAction',type,value)
})
mp.events.add('Controls-Business:MarkupChange', (value) => {
    Nexus.callRemote("Controls-Business:MarkupChange",value);
})
mp.events.add('Controls-Business:SellBusiness', () => {
    Nexus.callRemote("Controls-Business:SellBusiness");

})
mp.events.add('Controls-Business:getOrder', (delivery, amount) => {
    Nexus.callRemote('Controls-Business:getOrder',amount, delivery)
})
mp.events.add('Controls-Business:SendNotify', (type, layout,msg,time) => {
    if (controlsBusiness != null) {
        controlsBusiness.execute(`notify(${type},${layout},"${msg}",${time})`);
    }
})

}