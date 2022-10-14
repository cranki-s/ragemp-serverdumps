{




mp.events.add('Phone.Initialize', ()=>{
    if(mp.players.local.browserPhone!=null) return;

    mp.players.local.phoneOpened = false;
    mp.players.local.browserPhone =  mp.browsers.new('http://package/systems/player/phone/FRONT/index.html');
    mp.players.local.browserPhone.name = 'nexusbrowser';
    if(!mp.storage.data.phone){ mp.storage.data.phone = {}; mp.storage.flush(); } 
    ///////DESKTOP////////
    if(!mp.storage.data.phone.homeOptions){ mp.storage.data.phone.homeOptions = {}; mp.storage.flush(); } 
        if(mp.storage.data.phone.homeOptions.apps) mp.players.local.browserPhone.execute(`phone.homeOptions.apps=${mp.storage.data.phone.homeOptions.apps}`);
        if(mp.storage.data.phone.homeOptions.WallPaper) mp.players.local.browserPhone.execute(`phone.selectWallpaper(${mp.storage.data.phone.homeOptions.WallPaper})`);
    ////////SETTINGS////////////
    if(!mp.storage.data.phone.settingsOptions){ mp.storage.data.phone.settingsOptions = {}; mp.storage.flush(); } 
        if(mp.storage.data.phone.settingsOptions.options) mp.players.local.browserPhone.execute(`phone.settingsOptions.options=${mp.storage.data.phone.settingsOptions.options}`);

    ////CONTACTS///////
    if(mp.storage.data.phone.contactsOptions) mp.players.local.browserPhone.execute(`phone.contactsOptions=${mp.storage.data.phone.contactsOptions}`);

    ///////MESSAGES///////
    if(mp.storage.data.phone.messageOptions) mp.players.local.browserPhone.execute(`phone.setMessages('${mp.storage.data.phone.messageOptions}')`);
    mp.players.local.browserPhone.execute(`phone.removeNPCmessages()`);
    
});

mp.events.call('Phone.Initialize');

////////////////////// GLOBAL ///////////////////////////////////

mp.keys.bind(Keys.VK_UP, false, async function () { //
    if (!loggedin || chatActive || editing || mp.game.ui.isPauseMenuActive() || (global.menuCheck() && (!mp.players.local.phoneOpened)) || cuffed || mp.game.ui.isPauseMenuActive() || mp.players.local.getVariable('InDeath') == true || mp.players.local.getVariable('seats') == true || talking) return;

        if(mp.players.local.browserPhone==null) mp.events.call('Phone.Initialize');

        mp.players.local.phoneOpened = !mp.players.local.phoneOpened;
        mp.players.local.browserPhone.execute(`window.locale = '${global.Language}'`)
        mp.players.local.browserPhone.execute(`phone.phoneHandler(${mp.players.local.phoneOpened})`);
        mp.players.local.browserPhone.execute(`phone.wasBlocked=${!mp.players.local.phoneOpened}`);
        mp.gui.cursor.visible = mp.players.local.phoneOpened;
        global.menuOpened = mp.players.local.phoneOpened;
        mp.events.call('Phone.ChangeHudStatus');
        if(mp.players.local.phoneOpened){           
            if (!mp.game.streaming.hasAnimDictLoaded("cellphone@str")) {
            mp.game.streaming.requestAnimDict("cellphone@str");
            do await mp.game.waitAsync(10);
            while (!mp.game.streaming.hasAnimDictLoaded("cellphone@str"))
            }            
            mp.events.call('addLocal','Phone')
           // mp.players.local.taskPlayAnim("cellphone@str", "cellphone_text_press_a", 8, 0, -1, 49, 0, !1, !1, !1)
            //NewEvent.callRemote('playAnim',"cellphone@str", "cellphone_text_press_a", 8);
            NewEvent.callRemote('Phone:OpenTask');
        }else{            
            //NewEvent.callRemote('DetachPlayerPhone');
            mp.events.call('removeLocal','Phone')
            NewEvent.callRemote('Phone:CloseTask');
           //NewEvent.callRemote('stopTaskAnim');
            //mp.players.local.stopAnimTask("cellphone@str", "cellphone_text_press_a", 3);

        }
});

mp.events.addDataHandler("PhoneData", function(a, b) {
    if (0 !== a.handle){
        if(b == true){
            if (a == mp.players.local) {
                mp.game.mobile.createMobilePhone(0), 
                mp.game.mobile.setMobilePhoneScale(0)
                return;
            }
            a.taskPlayAnim("cellphone@str", "cellphone_text_press_a", 8, 0, -1, 49, 0, !1, !1, !1);
        }else{
            if (a == mp.players.local) {
                 mp.game.invoke("0x3BC861DF703E5097");
                 return;
            }
            a.stopAnimTask("cellphone@str", "cellphone_text_press_a", 3);
        }
    }           
});
//mp.attachmentMngr.register("playerSmartPhone", "p_cs_cam_phone", 28422, new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 30));
mp.events.add('Phone.ChangeHudStatus', () =>{
    if(mp.players.local.phoneOpened){
        mp.events.call('Hud.InfoButtons.Add', JSON.stringify(['BACKSPACE']), 'Телефон | Назад');
        mp.events.call('Hud.InfoButtons.Remove', JSON.stringify(['arrowup']));
    } else{
        mp.events.call('Hud.InfoButtons.Add', JSON.stringify(['arrowup']),'Телефон');
        mp.events.call('Hud.InfoButtons.Remove', JSON.stringify(['BACKSPACE']));
    }
})

mp.events.add('Phone.Close', () => {
    mp.gui.cursor.visible = false;
    mp.players.local.phoneOpened = false;
    mp.players.local.browserPhone.execute(`phone.wasBlocked=true`);
    mp.players.local.browserPhone.execute(`phone.phoneHandler(${mp.players.local.phoneOpened})`);
    global.menuOpened = false;
    mp.events.call('Phone.ChangeHudStatus');
    NewEvent.callRemote('Phone:CloseTask');
    mp.events.call('removeLocal','Phone')
    //mp.players.local.stopAnimTask("cellphone@str", "cellphone_text_press_a", 3);
    //NewEvent.callRemote('stopTaskAnim');
});

mp.events.add('Phone.SendSIM', (sim) =>{
    mp.events.call('Phone.ChangeHudStatus');
    mp.players.local.browserPhone.execute(`phone.myPhoneNumber='${sim}'`);
});

mp.events.add('Phone:Home:AppsOptionsSave', (data) => {
    mp.storage.data.phone.homeOptions.apps = data;
    mp.storage.flush();
    // Сохранение настроек приложений (Например при перемещение 1-го из них -> обновляем данные в .storage)
});

mp.events.add('Phone:Contacts:ContactsOptionsSave', (data) => {
    mp.storage.data.phone.contactsOptions = data;
    mp.storage.flush();
    // Обновление контактов при любых действиях: добавление нового/(удаление/добавление в избранные)/недавние и.т.д. 
});

mp.events.add('Phone:Settings:SettingsOptionsOptionsSave', (data) => {
    mp.storage.data.phone.settingsOptions.options = data;
    mp.storage.flush();
    // Обновление настроек
});

mp.events.add('Phone.OpenInput', (type, number) =>{

    if (!loggedin || !chatActive) return;

        mp.players.local.phoneOpened = true;
        mp.players.local.browserPhone.execute(`phone.phoneHandler(${mp.players.local.phoneOpened})`);
        mp.players.local.browserPhone.execute(`phone.wasBlocked=${!mp.players.local.phoneOpened}`);
        mp.gui.cursor.visible = mp.players.local.phoneOpened;
        global.menuOpened = mp.players.local.phoneOpened;
        mp.events.call('Phone.ChangeHudStatus');

    if(type=='call'){
        mp.players.local.browserPhone.execute(`phone.$eb.$emit('telephone-change-route', '/contacts/keyboard')`);
        mp.players.local.browserPhone.execute(`phone.$eb.$emit('telephone-contacts-keyboard-call', { phone: ${number} })`);
    }

    if(type=='sms'){
        mp.players.local.browserPhone.execute(`phone.$eb.$emit('telephone-change-route', '/message/new')`);
    mp.players.local.browserPhone.execute(`phone.$eb.$emit('telephone-message-new-contact-select', { phone: ${number} })`);
    }
});


//iconTypes: announcement, bank, call, events, message, music, navigation, safari, settings, special-service, taxi, transport
mp.events.add('Phone.Notify.Push', (iconType, description) =>{
    mp.players.local.browserPhone.execute(`phone.$eb.$emit('telephone-alert', {
        appIcon: '${iconType}.svg',
        timeToHide: 5000,
        title: '<p style="color: #7692a0;">${global.GetText('Уведомление')}</p>',
        description: '${description}',
        navbarBackground: '#daf4fd',
        contentBackground: '#cae8f3'
        });`);
});

mp.events.add('Phone:Settings:SelectWallpaper', (data) => {
    //mp.players.local.browserPhone.execute(`phone.selectWallpaper({ type: 'animated', current: '1.webm' })`);
    
    var temp1 = JSON.parse(data);
    var temp = {};
    temp.type = temp1.type;
    temp.current = temp1.url;
    //mp.players.local.browserPhone.execute(`console.log(${JSON.stringify(temp)})`);
    mp.storage.data.phone.homeOptions.WallPaper = JSON.stringify(temp);
    mp.storage.flush();
    mp.players.local.browserPhone.execute(`phone.selectWallpaper(${JSON.stringify(temp)})`);

    //send onEvery LOGIN
    // Изменение фона
    // Incoming data
    // {
    //     type: 'static'
    //     url: '1.png'
    // }
    // Тут отправляется callRemote который должен проверить есть ли в игрока этот фон, если есть то сетаем и делаем выбранным -> отправляем execute на phone.selectWallpaper();
    // phone.selectWallpaper({ type: 'animated', current: '1.webm' });
    // Данные которые должны прийти в phone.selectWallpaper():
    // {
    //     type: 'static'
    //     current: '1.png'
    // }
    // Когда игрок заходи на сервер надо отправить execute в phone.background то есть до этого надо сохранять фон который был активный в игрока. Я не сохранял это в .storage т.к. эти данные можно изменить, а у нас некоторые фоны платные. (Данные такие же как и phone.settingsWallpaperChange())
    // Так же надо сделать execute в settingsOptions.availableWallpaper чтобы установить все доступные фоны в игрока
    // Было бы еще хорошо если бы они сортировались по типу, то есть те у которых тип animated - шли в конец
});

//////////////////////////////////////////////////////////////

/////////////////////// MESSAGES //////////////////////////////////

mp.events.add('Phone:Message:MessageOptionsSave', (data) => {
    mp.storage.data.phone.messageOptions = data;
    mp.storage.flush();
    // Обновление сообщений
});

mp.events.add('Phone:Message:SendMessage', (data) => {


    NewEvent.callRemote('Phone.Message.Send', data);
   // mp.players.local.browserPhone.execute(`phone.messageHandler(${JSON.stringify(temp)})`);
    // Incoming data
    // { phone: '1111110', message: 'dfg', myPhoneNumber: '1123412' }
    // phone - До кого сообщение,
    // message - Само сообщение
    // myPhoneNumber - Номер телефона отправителя
    // Сообщение автоматически не добавляется в отправителя! Это сделано для того чтобы избежать пролагов из-за которых сообщение может не дойти к получателю.
    // Для того чтобы отправить сообщение обеим сторонам надо сделать execute на phone.messageHandler() с обьектом:

    // Для того кто отправил, пример:
    // { phone: '1111110', message: 'dfg', myself: true }
    // phone - номер которому было отправлено сообщение
    // message - Сообщение
    // myself - Для того чтобы сделать его зеленым цветом то есть показать его как сообщение отправителя

    // Для того кто должен получить:
    // { phone: '1111110' message: 'dfg', myself: false }
    // phone - номер который отправил сообщение
    // message - само сообщение
    // myself - Для того чтобы сделать сообщение серым цветом, это сообщение будет как сообщение от отправителя
});
mp.events.add('Phone.Message.SendSuccess', (smsJSON) => {
    var sms = JSON.parse(smsJSON);
    sms.myself = true;
    mp.players.local.browserPhone.execute(`phone.messageHandler('${JSON.stringify(sms)}')`);
});
mp.events.add('Phone.Message.Push', (smsJSON) => {
    var sms = JSON.parse(smsJSON);
    sms.myself = false;
    mp.players.local.browserPhone.execute(`phone.messageHandler('${JSON.stringify(sms)}')`);
    if(!mp.players.local.phoneOpened) mp.gui.execute(`sound.sound='package://sound/iphone_message.mp3'`);
});

mp.events.add('Phone:Message:MessageSave', (data)=>{
    mp.storage.data.phone.messageOptions = JSON.parse(data);
    mp.storage.flush();
})

//////////////////////////////////////////////////////////////////

//////////////////////////// TAXI //////////////////////////////

mp.events.add('Phone:Taxi:GetCurrentPosition', () => {
    var street = mp.game.pathfind.getStreetNameAtCoord(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, 0, 0);
    mp.players.local.browserPhone.execute(`phone.taxiChangeCurrentPosition('${mp.game.ui.getStreetNameFromHashKey(street.streetName)}')`);
    // Получение позиции игрока (улица/квартал)
    // Вызываеться при каждом открытие приложение "Такси"
    // Execute на phone.taxiChangeCurrentPosition() с назвой позиции
});

mp.events.add('Phone:Taxi:AcceptOrder', (order) => {
    NewEvent.callRemote('Phone.Taxi.OrderTaxi');
    // Подтверждение заказа
    // Incoming data
    // { class: 'economy' }
    // Потом надо отправить execute на phone.taxiHandler() с статусом true/false
    // Если статус true то кнопка "Заказать" меняеться на "Отменить" 
});
mp.events.add('Phone.Taxi.SendStatus', (status) => {
    mp.players.local.browserPhone.execute(`phone.taxiHandler(${status})`);
});

mp.events.add('Phone:Taxi:GetOrderStatus', () => {
    // триггерится при открытии приложения (ПОКА НЕ НУЖНО)
    // Получение актуального orderStatus
    // Надо сделать execute на phone.taxiHandler() с статусом true/false
});

mp.events.add('Phone:Taxi:DeclineOrder', () => {
    NewEvent.callRemote('Phone.Taxi.CancelOrder');
    // Отменение заказа
    // Отправляется колбек 'Phone.Taxi.SendStatus' со статусом false если отмена прошла успешно
});

/////////////////////////////////////////////////////////////////////

///////////////////////// TRANSPORT //////////////////////////////

mp.events.add('Phone:Transport:GetTransportList', () => {
    NewEvent.callRemote('Phone.Transport.GetMyTransport');
    // При каждом открытие приложения "Транспорт" вызывается этот тригер.
    // Нужно вызвать execute на phone.transportOptions.transportList чтобы установить актуальный список машин игрока (пример обьекта phone.js:438)
});
mp.events.add('Phone.Transport.PushAll', (transportListJSON) => {
    mp.players.local.browserPhone.execute(`phone.transportOptions.transportList=${transportListJSON}`);
});

mp.events.add('Phone:Transport:RepairTransport', (transportJSON) => {
    NewEvent.callRemote('Phone.Transport.Repair', transportJSON);
    // Подтверждение восстановление транспорта
    // Incoming data
    // {
    //     name: 'Mercedes-benz AMG GT',
    //     number: '80ELY993',
    //     image: 'amggt.png',
    //     sellPrice: 1000000
    // }
});
mp.events.add('Phone:Transport:FindTransport', (transportJSON) => {
    NewEvent.callRemote('Phone.Transport.Find', transportJSON);
    // Подтверждение восстановление транспорта
    // Incoming data
    // {
    //     name: 'Mercedes-benz AMG GT',
    //     number: '80ELY993',
    //     image: 'amggt.png',
    //     sellPrice: 1000000
    // }
});
mp.events.add('Phone:Transport:EvacuateTransport', (transportJSON) => {
    NewEvent.callRemote('Phone.Transport.Evacuate', transportJSON);
    // Подтверждение эвакуирование транспорта
    // Incoming data
    // {
    //     name: 'Mercedes-benz AMG GT',
    //     number: '80ELY993',
    //     image: 'amggt.png',
    //     sellPrice: 1000000
    // }
});

mp.events.add('Phone:Transport:SellTransport', (transportJSON) => {
    NewEvent.callRemote('Phone.Transport.Sell', transportJSON);
    // Подтверждение продажи транспорта
    // в случае успешной продажи  вызвать execute на phone.transportOptions.transportList с новым полным списком транспорта
    // Incoming data
    // {
    //     name: 'Mercedes-benz AMG GT',
    //     number: '80ELY993',
    //     image: 'amggt.png',
    //     sellPrice: 1000000
    // }
});
mp.events.add('Phone.Transport.Sell-Success', (name) =>{
    mp.events.call('Phone.Notify.Push', 'transport', global.GetText('Автомобиль ') +name+ global.GetText(' продан государству.<br>Средства поступили на банковский счет.'));
    mp.players.local.browserPhone.execute(`phone.$eb.$emit('telephone-change-route', '/transport/transport');`);
});



let talking = false;

mp.events.add('Phone:Call:PhoneCall', (data) => {
    NewEvent.callRemote('Phone.Call.Remote', data);
    //mp.players.local.browserPhone.execute(`console.log(${data})`);
    // Тут нужно отправить callRemote который должен у 2 игроков вызвать execute на phone.callHandler() с обьектом:
    // {
    //     phone: '2347235', // Кому звонок
    //     myPhoneNumber: '1123412', // Кто звонит
    //     type: 'incoming',
    //     status: 'Звонок завершен', // Есть только у declineCall т.к. когда собеседник сбрасывает звонок нужно написать "Звонок завершен" или если ты звонишь ему и линия занята надо написать "Занято"
    // }
    // outgoing - Когда ты звонишь кому-то надо кинуть тригер на звонок (2 игрокам)
    // incoming - Когда тебе звонят ты принимаешь (Когда он принял долже сработать тригер на callHandler с типом acceptCall чтобы запустить таймер)
    // acceptCall - Чтобы запустить таймер (статус когда разговор начался)
    // declineCall - Когда собеседник нажал кнопку завершить разговор - нужно завершить его и у других
    // skipped - когда человек разговаривает надо вызвать чтобы показать что пропущенный (оно не включит звонок)
});
mp.events.add('Phone.Call.CallBack', (data) => {
    if(!mp.players.local.phoneOpened){
        mp.players.local.browserPhone.execute(`phone.phoneHandler(true)`);
        //mp.gui.cursor.visible = phoneOpened;
    }
    talking = JSON.parse(data).type=="acceptCall";
    mp.players.local.browserPhone.execute(`phone.callHandler(${data})`);
});

// Тут callRemote который должен у 2 игроков вызвать execute на phone.callHandler();

mp.events.add('Phone:Call:ChangeCallParameter', (type) => {
    if(type=='mute'){
        NewEvent.callRemote('Phone.Mute');
    }
    // Изменение статуса микрофона в звонке (true/false)
    // type - mute/speaker
    //mp.players.local.browserPhone.execute(`phone.changeCallControllerStatus("${type}", true)`);
});
mp.events.add('Phone.Mute.CallBack', (flag) =>{
    mp.players.local.browserPhone.execute(`phone.changeCallControllerStatus("mute", ${flag})`);
});

mp.events.add('Phone:Navigation:SelectNavigation', (data) => {
    var point = JSON.parse(data);
    if(point.x!=null && point.y!=null){
        mp.game.ui.setNewWaypoint(point.x, point.y);
        mp.events.call('Phone.Notify.Push', 'navigation', global.GetText('Точка установлена на карте'));
    }else if(point.type!=null){
        if(point.type=='ATM') NewEvent.callRemote('Phone.NearestATM');
        else NewEvent.callRemote('Phone.NearestBusiness', point.type);
    }
});
mp.events.add('Phone.NearestBusiness.CallBack', (x, y) =>{
    mp.game.ui.setNewWaypoint(x, y);
    mp.events.call('Phone.Notify.Push', 'navigation', global.GetText('Ближайший магазин установлен на карте'));
});
mp.events.add('Phone.NearestATM.CallBack', (x, y) =>{
    mp.game.ui.setNewWaypoint(x, y);
    mp.events.call('Phone.Notify.Push', 'navigation', global.GetText('Ближайший банкомат установлен на карте'));
});

mp.events.add('Phone:Announcement:GetAnnouncementList', () => {//ПОКА НЕ НАДО
    // Тригер на получение актуального списка обьявлений
    // Отправляеться каждый раз при заходе в приложение
    // Надо сделать execute на phone.announcementOptions.announcementList и запушить туда актуальный список (пример обьекта в phone.js:389)
    // Не забываем про чат (туда оно тоже должно отправляеться (обьявление))
});

mp.events.add('Phone:Announcement:sendAnnouncement', (announcement) => {
    NewEvent.callRemote('Phone.News.Send', announcement);
    // Подтверждение отправки обьявления
    // announcement - Текст обьявления
});

mp.events.add('Phone.Announcement.Push', (announcementJSON) => {
    //SHIFT OBJECT AND IF ARRAY LENGTH > 10 ARRAY.POP()
    mp.players.local.browserPhone.execute(`phone.addAnnouncement(${announcementJSON})`);
});

/////////////////////////////////////// 911 ////////////////////////////////////////////////

mp.events.add('Phone:SpecialService:CallService', (type, text = '---') => {
    if(type=='medical'){
        NewEvent.callRemote('Phone.CallEMS', false);
    }
    if(type=='police'){
        NewEvent.callRemote('Phone.CallPolice', text);
    }
    // Вызов спец. службы
    // Incoming data
    // medical/police
});
mp.events.add('Phone.CallPolice.CallBack', () => {
    mp.events.call('Phone.Notify.Push', 'special-service', global.GetText('Вызов принят. Ожидайте прибытия патрульной службы.'));
    mp.players.local.browserPhone.execute(`phone.$eb.$emit('telephone-change-route', '/special-service/special-service')`);
});

///////////////////////////////////////////////////////////////////////////////////////////

mp.events.add('Phone:Bank:BankGetInformation', () => {
    NewEvent.callRemote('Phone.Bank.LoadData');
    // Получение данных игрока о его счетах и.т.д. (все что связано с банком)
    // Отправляеться каждый раз при заходе в приложение Банк и при переходе между страницами в нем (для актуализации данных)
    // bankOptions phone.js:454
    // Пример:
    /*let obj = {
        bankBank: {
            accountNumber: 9843172848,
            balance: 128000
        },
        bankHome: {
            homeNumber: 43,
            paymentOn: 12,
            homeBalance: 25000
        },
        bankBusiness: {
            businessName: 'Туалет на остановке',
            paymentOn: 12,
            businessBalance: 15222
        },
        bankTelephone: {
            telephoneNumber: 1123412,
            telephoneBalance: 1200
        },
        bankFine: {
            commonSumOfFine: 8634
        }
    }*/
});
mp.events.add('Phone.Bank.PushData', (bankDataJSON) =>{
    mp.players.local.browserPhone.execute(`phone.bankOptions = ${bankDataJSON}`);
});

mp.events.add('Phone:Bank:BankHomeUpBalance', (sum) => {
    NewEvent.callRemote('Phone.House.Pay', sum);
    // Пополнение счета дома
    // После того как счет оплачен надо отправить execute на phone.bankHandler() с типом "bankHome" для того чтобы сообщить об успехе
    // И не забываем об execute на phone.bankOptions.bankHome с обновленными данными
});
mp.events.add('Phone.House.PayCallBack', (bankHomeJSON)=>{
    mp.players.local.browserPhone.execute(`phone.bankOptions.bankHome = ${bankHomeJSON}`);
});

mp.events.add('Phone:Bank:BankBusinessUpBalance', (sum) => {
    NewEvent.callRemote('Phone.Business.Pay', sum);
    // Пополнение счета бизнеса
    // После того как счет оплачен надо отправить execute на phone.bankHandler() с типом "bankBusiness" для того чтобы сообщить об успехе
    // И не забываем об execute на phone.bankOptions.bankBusiness с обновленными данными
});
mp.events.add('Phone.Business.PayCallBack', (businessJSON)=>{
    mp.players.local.browserPhone.execute(`phone.bankOptions.bankBusiness = ${businessJSON}`);
});

mp.events.add('Phone:Bank:BankTelephoneUpBalance', (sum) => {// ПОКА НЕ НУЖНО
    // Пополнение счета телефона
    // После того как счет оплачен надо отправить execute на phone.bankHandler() с типом "bankTelephone" для того чтобы сообщить об успехе
    // И не забываем об execute на phone.bankOptions.bankTelephone с обновленными данными
});

mp.events.add('Phone:Bank:BankFineUpBalance', (sum) => {// ПОКА НЕ НУЖНО
    // Сумма для снятие штрафа
    // После того как счет оплачен надо отправить execute на phone.bankHandler() с типом "bankFine" для того чтобы сообщить об успехе
    // И не забываем об execute на phone.bankOptions.bankFine с обновленными данными
});

mp.events.add('Phone:Bank:BankMakeTransaction', (transactionTo, transactionSum) => {
    NewEvent.callRemote('Phone.Bank.SendMoney', transactionTo, transactionSum);
    // Перевод средств
    // Incoming data
    // transactionTo - номер счета
    // transactionSum - сумма перевода
    // После того как перевод совершен надо отправить execute на phone.bankHandler() с типом "bankTransaction" для того чтобы сообщить об успехе
    // И не забываем об execute на phone.bankOptions.bankBank с обновленными данными
    //console.log(transactionTo, transactionSum);
});
mp.events.add('Phone.Bank.SendMoneyCallback', (bankBankJSON)=>{
    mp.players.local.browserPhone.execute(`phone.bankOptions.bankBank = ${bankBankJSON}`);
});
}