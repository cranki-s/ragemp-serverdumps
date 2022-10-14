{
let adminReportBrowser;
let adminReportOpened = false;

mp.keys.bind(Keys.VK_F7, true, ()=>{
    if (!loggedin || chatActive || editing || mp.game.ui.isPauseMenuActive() || global.menuCheck() || cuffed || mp.game.ui.isPauseMenuActive() || mp.players.local.getVariable('InDeath') == true || mp.players.local.getVariable('seats') == true) return;
    if(adminReportOpened){
        mp.events.call('AdminReport:Close');
    }else{
        NewEvent.callRemote('AdminReport.Open');
    }
});
mp.events.add('AdminReport.Open.CallBack', (objJSON)=>{
    if(adminReportBrowser==null){ adminReportBrowser = mp.browsers.new('http://package/systems/adminSys/AdminReport/FRONT/index.html');
    adminReportBrowser.name ='default'
}
    adminReportOpened = true;
    global.menuOpen();
    mp.gui.cursor.visible = true;
    adminReportBrowser.execute(`adminReport.locale='${global.Language}'`);
    var object = JSON.parse(objJSON);
    if(object.reportList!=null) adminReportBrowser.execute(`adminReport.reportList=${JSON.stringify(object.reportList)}`);
    if(object.chat==null) object.chat ={};
     adminReportBrowser.execute(`adminReport.chat=${JSON.stringify(object.chat)}`);

});

mp.events.add('AdminReport.NewReport', (report) => {
    if(adminReportBrowser!=null) adminReportBrowser.execute(`adminReport.addReportToList(${report})`);
    else mp.gui.execute(`notify(4, 9, 'Новий репорт!', 5000)`);
});



mp.events.add('AdminReport:SelectReport', (reportJSON) => {
    NewEvent.callRemote('AdminReport.SelectReport', reportJSON);

    // Сюда приходит обьект репорта при его выборе.
    // Всего есть 3 типа репортов:
    // 1. default - новый репорт который никтоне выбрал и никогда на него никто не отвечал
    // 2. selected - репорт который уже выбран другим администратором (на них висит pointer-events: none; что блокирует его выбор, по логике это репорт невозможно выбрать и сюда такой не прилитит но все такие НА ВСЯКИЙ случай нужно сделать проверку на беке)
    // 3. returned - репорт на который отвечал другой администратор но в итоге нажал на кнопку "Вернуть репорт"
    // То есть сюда может прийти только default/returned
    // Пример обьекта -> adminReport.reportList:7
    // Если все хорошо делаем execute на adminReport.chat с обьектом.
    // Пример обьекта -> adminReport.chat:30
    // Так же после проделанных манипуляций не забываем обновить список репортов.
    // Execute на window.adminReport.reportListHandler(action, data); // action -> mount, add, remove
    // mount - Перезаписать массив полностью
    // add - добавить новый обьект
    // remove - удалть обьект, для этого надо отправить в data:
    // {
    //     id: 1
    // }
});

mp.events.add('AdminReport.SelectConfirm', (chatJSON) => {
    if(adminReportBrowser!=null) adminReportBrowser.execute(`window.adminReport.chat=${chatJSON}`);
    // window.adminReport.reportListHandler(remove)
 });

mp.events.add('AdminReport.RemoveFromList', (id) => {
    if(adminReportBrowser!=null) adminReportBrowser.execute(`adminReport.removeReportFromList(${id})`);
});

mp.events.add('AdminReport:SendMessage', (message) => {
    NewEvent.callRemote('AdminReport.SendMessage', message)
    // Отправка сообщение
    // message - Object
    // message.text - String
    // message.date - Wed Sep 29 2021 02:52:42 GMT+0300 (Москва, стандартное время)
    // Не забываем сделать execute на window.adminReport.chatHandler() с самим сообщение (чтобы его добавить)
    // Пример:
    // {
    //     myself: true,
    //     date: 'Wed Sep 29 2021 00:02:22 GMT+0300 (Москва, стандартное время)',
    //     text: 'На 2',
    //     adminName: 'Hanako_Yashiro'
    // }
    // myself - администратору отправлять true, а игроку false если сообщение поступило от Администратора (так же это работает и для игрока но наоборот)
    // adminName - не нужно если сообщение не от администратора
});

mp.events.add('AdminReport.Notify', (msg)=>{
    if(adminReportBrowser!=null) adminReportBrowser.execute(`notify(2, 9, '${msg}', 5000)`);
        else mp.gui.execute(`notify(2, 9, '${msg}', 5000)`);
});

mp.events.add('AdminReport.PushNewMsg', (msg) => {
    if(adminReportBrowser!=null) adminReportBrowser.execute(`adminReport.chatHandler(${msg})`);
        else mp.gui.execute(`notify(2, 9, ${global.GetText('Поступило новое сообщение в ваш репорт')}, 5000)`);
    // window.adminReport.reportListHandler(remove)
 });

mp.events.add('AdminReport:Action', (action) => {
    if(action=='returnReport'){
        adminReportBrowser.execute(`window.adminReport.chat={}`);
    }
    NewEvent.callRemote('AdminReport.Action', action);
    // action - string
    // Вернуть репорт - returnReport
    // Закрыть репорт - closeReport
    // Не забываем обновить список репортов, execute на window.adminReport.reportListHandler(action, data); // action -> mount, add, remove
    // Не забываем очистить window.adminReport.chat чтобы скрыть чат
});

mp.events.add('AdminReport.ClearChat', () => {
    if(adminReportBrowser!=null) adminReportBrowser.execute(`adminReport.chat={}`);
    // window.adminReport.reportListHandler(remove)
 });

mp.events.add('AdminReport.AdminReturned', (report) => {
    if(adminReportBrowser!=null) adminReportBrowser.execute(`adminReport.addReportToList(${report})`);
   // window.adminReport.reportListHandler(remove)
});

mp.events.add('AdminReport:QuickAnswerAction', (action, answer) => {
    // action - add/remove/edit
    // answer:
    // add
    // {
    //     text: 'test'
    // }
    // remove
    // {
    //     id: 1,
    // }
    // edit
    // {
    //    id: 1,
    //    text: 'test123'
    // }
    // Execute на window.phone.quickAnswerHandler(action, data) // action -> mount, add, remove
});

mp.events.add('AdminReport:SelectHotKey', (command) => {
    if(command=='/tp'){
        NewEvent.callRemote('AdminReport.Tp');
        return;
    }

    if(command=='/sp'){
        NewEvent.callRemote('AdminReport.Sp');
        return;
    }

    if(command=='/gm'){
        NewEvent.callRemote('AdminReport.Gm');
        return;
    }
    // command - string
    // Example - /tp
});

mp.events.add('AdminReport:Close', () => {
    if(adminReportBrowser!=null) {
        adminReportBrowser.destroy();
        adminReportBrowser = null;
        mp.gui.cursor.visible = false;
    }
    adminReportOpened = false;
    global.menuClose();
    // Закрытие
});
}