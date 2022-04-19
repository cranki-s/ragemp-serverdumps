{
﻿const vehheading = require("/utils/VehicleRotator.js");
const vehicleNames = require('./player/autos.js')

mp.players.local.freezePosition(false);

global.menuOpened = true;
global.menu = null;
global.casinoOpened = false;
// Color picker //
global.colorp = mp.browsers.new('package://cef/color.html');
mp.events.add('showColorp', () => {
    global.colorp.execute(`show(${true})`);
})
mp.events.add('hideColorp', () => {
    global.colorp.execute(`show(${false})`);
})
// Button events
mp.events.add('colors', (btn) => {
    switch (btn) {
        case "apply":
            //onapply
            break;
        case "cancel":
            //onbreak
            break;
    }
})
// Selected color event
mp.events.add('scolor', (c) => {
    // JSON String
    // c = {r: 255, g: 255, b: 255}
    c = JSON.parse(c);
    mp.events.call("tunColor", c)
})

global.menuCheck = function() {
  if (global.menu !== null) {
    //mp.gui.chat.push('menu:yes');
    if (global.menuOpened) {
      //mp.gui.chat.push('menuOpen:yes');
      return true;
    }
    //mp.gui.chat.push('menuOpen:no');
    return false;
  } else {
    //mp.gui.chat.push('menu:no');
    return true;
  }
};

global.hudWasOpened = true;
global.chatWasOpened = true;

global.menuClose = function() {
  mp.gui.cursor.visible = false;
  global.menuOpened = false;
  mp.events.call("showHUD", hudWasOpened);
  mp.gui.chat.show(chatWasOpened);
};
global.menuOpen = function() {
  mp.gui.cursor.visible = true;
  global.menuOpened = true;
  hudWasOpened = global.showhud;
  chatWasOpened = global.showchat;
  mp.events.call("showHUD", false);
  mp.gui.chat.show(false);
};

mp.events.add('client_press_key_to', (act, data) => {
  switch (act) {
      case 'open':
          if (global.menuCheck()) return;
          global.menu.execute(`presskeyto.open('${data}')`);
          break;
      case 'close':
          if (global.menuCheck()) return;
          global.menu.execute(`presskeyto.close()`);
          break;
  }
});
mp.events.add("playerQuit", (player, exitType, reason) => {
  if (global.menu !== null) {
    if (player.name === localplayer.name) {
      global.menuClose();
      global.menu.destroy();
      global.menu = null;
    }
  }
});
mp.keys.bind(Keys.VK_Y, false, function () { // Телепорт
    if (!loggedin || chatActive || editing || global.menuCheck() || cuffed || localplayer.getVariable('InDeath') == true) return;
    if (!global.localplayer.getVariable('IS_ADMIN')) return;
		if (mp.game.invoke('0x1DD1F58F493F1DA5')){
			let b = mp.game.invoke('0x186E5D252FA50E7D');
            let t = mp.game.invoke('0x9A3FF3DE163034E8');
            let f = mp.game.invoke('0x1BEDE233E6CD2A1F', b);
            let n = mp.game.invoke('0x14F96AA50D6FBEA7', b);
			for (let i = f, bc = 0; bc != t; bc++, i = n) {
                if (mp.game.invoke('0x1FC877464A04FC4F', i) == 8) {
                    var coord = mp.game.ui.getBlipInfoIdCoord(i);
                    mp.game.graphics.notify("~g~Телепорт на метку");
					localplayer.position = new mp.Vector3(coord.x, coord.y, 700);

					setTimeout( () => { localplayer.position = new mp.Vector3(coord.x, coord.y, mp.game.gameplay.getGroundZFor3dCoord(coord.x, coord.y, 700, parseFloat(0), false));}, 300 );
                    break;
                }
            }
		}
    lastCheck = new Date().getTime();
});

let alcoUI = null;
const ClubNames = {
  10: "Багама Мама",
  11: "Ванилла",
  12: "Виски GO GO",
  13: "Comedy Club",
};
const ClubAlcos = {
  10: ["«Martini Asti»", "«Sambuca»", "«Campari»"],
  11: ["«На корке лимона»", "«На бруснике»", "«Русский стандарт»"],
  12: ["«Asahi»", "«Midori»", "«Yamazaki»"],
  13: ["«Дживан»", "«Арарат»", "«Noyan Tapan»"],
};
const ClubDrinks = [75, 115, 150];
var selectedAlco = 0;
mp.events.add("openAlco", (club, modief, isOwner, stock) => {
  selectedAlco = 0;
  global.menuOpen();
  mp.gui.cursor.visible = false;
  var res = mp.game.graphics.getScreenActiveResolution(0, 0);
  const UIPositions = {
    RightMiddle: new Point(res.x - 180, res.y / 2),
    LeftMiddle: new Point(0, res.y / 2 - 200),
  };
  alcoUI = new Menu("Клуб", ClubNames[club], UIPositions.LeftMiddle);

  var drinks = [
    ` ${ClubAlcos[club][0]} ${(ClubDrinks[0] * modief).toFixed()}$`,
    ` ${ClubAlcos[club][1]} ${(ClubDrinks[1] * modief).toFixed()}$`,
    ` ${ClubAlcos[club][2]} ${(ClubDrinks[2] * modief).toFixed()}$`,
  ];

  alcoUI.AddItem(
    new UIMenuListItem(
      "Напитки",
      "Вы можете выбрать любой напиток",
      new ItemsCollection(drinks)
    )
  );

  if (isOwner) {
    alcoUI.AddItem(
      new UIMenuItem(
        "Инфо",
        `Материалы: ${stock[0]}\n${ClubAlcos[club][0]} - ${stock[1]}\n${
          ClubAlcos[club][1]
        } - ${stock[2]}\n${ClubAlcos[club][2]} - ${stock[3]}`
      )
    );
    alcoUI.AddItem(
      new UIMenuItem("Взять", "Взять выбранный напиток со склада")
    );
    alcoUI.AddItem(new UIMenuItem("Скрафтить", "Скрафтить выбранный напиток"));
    alcoUI.AddItem(
      new UIMenuItem(
        "Установить цену",
        "Установить модификатор цены для всех продуктов (от 50% до 150%)"
      )
    );
  }

  alcoUI.AddItem(new UIMenuItem("Купить", "Купить выбранный напиток"));

  var uiItem = new UIMenuItem("Закрыть", "Закрыть меню");
  uiItem.BackColor = new Color(255, 0, 0);
  alcoUI.AddItem(uiItem);

  alcoUI.ItemSelect.on((item) => {
    if (new Date().getTime() - global.lastCheck < 100) return;
    global.lastCheck = new Date().getTime();
    if (item.Text == "Купить") {
      mp.events.callRemote("menu_alco", 0, selectedAlco);
    } else if (item.Text == "Взять") {
      mp.events.callRemote("menu_alco", 1, selectedAlco);
    } else if (item.Text == "Скрафтить") {
      mp.events.callRemote("menu_alco", 2, selectedAlco);
    } else if (item.Text == "Установить цену") {
      global.menuClose();
      alcoUI.Close();
      mp.events.callRemote("menu_alco", 3, 0);
    } else if (item.Text == "Закрыть") {
      global.menuClose();
      alcoUI.Close();
    }
  });

  alcoUI.ListChange.on((item, index) => {
    selectedAlco = index;
  });

  alcoUI.Open();
});

// // // // //
global.input = {
  head: "",
  desc: "",
  len: "",
  cBack: "",
  set: function(h, d, l, c) {
    (this.head = h), (this.desc = d);
    (this.len = l), (this.cBack = c);
    if (global.menuCheck()) return;
    global.menu.execute(
      `input.set("${this.head}","${this.desc}","${this.len}");`
    );
  },
  open: function() {
    if (global.menuCheck()) return;
    global.menu.execute("input.active=1");
    global.menuOpen();
    mp.events.call("startScreenEffect", "MenuMGHeistIn", 1, true);
  },
  close: function() {
    global.menuClose();
    global.menu.execute("input.active=0");
    mp.events.call("stopScreenEffect", "MenuMGHeistIn");
  },
};
mp.events.add("input", (text) => {
  if (input.cBack == "") return;
  if (input.cBack == "setCruise") mp.events.call("setCruiseSpeed", text);
  else mp.events.callRemote("inputCallback", input.cBack, text);
  input.cBack = "";
  input.close();
});
mp.events.add("openInput", (h, d, l, c) => {
  if (global.menuCheck()) return;
  input.set(h, d, l, c);
  input.open();
});
mp.events.add("closeInput", () => {
  input.close();
});
let menuWasopened = false;
global.dialog = {
  question: "",
  cBack: "",
  lastTime: false,
  open: function() {
    global.dialog.lastTime = 0;
    if (global.menu != null) {
      global.menu.execute(`dialog.title='${global.dialog.question}'`);
      global.menu.execute(`dialog.active=1`);
    }
    menuWasopened = global.menuOpened;
    mp.gui.cursor.visible = true;
    if (!global.menuOpened) global.menuOpen();
    mp.events.call("startScreenEffect", "MenuMGHeistIn", 1, true);
  },
  openMED: function() {
    global.dialog.lastTime = 0;
    if (global.menu != null) {
      global.menu.execute(`death.title='${global.dialog.cBack}'`);
	  global.menu.execute(`death.nones='${global.dialog.question}'`);
      global.menu.execute(`death.active=1`);
	  global.menu.execute(`death.buttonact=true`);
	  global.menu.execute(`death.time=""`);
    }
    menuWasopened = global.menuOpened;
    mp.gui.cursor.visible = true;
    if (!global.menuOpened) global.menuOpen();
  },
  close: function() {
	mp.events.call("stopScreenEffect", "MenuMGHeistIn");
    if (global.menu != null) global.menu.execute("dialog.active=0");
    if (!menuWasopened) global.menuClose();
  },
  closeMED: function() {
    if (global.menu != null) global.menu.execute("death.active=0");
	  if (menuWasopened != undefined) 
      global.menuClose();
  },
};
mp.events.add("openDialog", (c, q) => {
  global.dialog.cBack = c;
  global.dialog.question = q;
  global.dialog.open();
  mp.gui.cursor.visible = true;
});

mp.events.add("openDialogMED", (c, q) => {
  global.dialog.cBack = c;
  global.dialog.question = q;
  global.dialog.openMED();
  mp.gui.cursor.visible = true;
});

mp.events.add("closeDialog", () => {
  global.dialog.close();
});
mp.events.add("closeDialogMED", () => {
  global.dialog.closeMED();
  global.menu.execute(`death.closeMED()`);
});
mp.events.add("dialogCallback", (state) => {
  if (global.dialog.cBack == "tuningbuy") mp.events.call("tunbuy", state);
  else mp.events.callRemote("dialogCallback", global.dialog.cBack, state);
  global.dialog.close();
});

mp.events.add("closekpz", () => { global.menuClose(); });
mp.events.add("sendkpz", (title, time) => {mp.events.callRemote("sendkpz", title, time); });
mp.events.add("openkpz", (title) => { if (global.menuCheck()) return; global.menu.execute(`kpz.open('${title}')`); global.menuOpen();});

mp.events.add("dialogCallbackMED", (state) => {
  mp.events.callRemote("dialogCallbackMEDIC", state);
});
// DIAL //
mp.events.add("dial", (act, val, reset) => {
  switch (act) {
    case "open":
      if (reset == true) {
        global.menu.execute("dial.hide()");
        global.menuClose();
      }
      var off = Math.random(2, 5);
      global.menu.execute(`dial.val=${val};dial.off=${off};dial.show();`);
      global.menuOpen();
      break;
    case "close":
      global.menu.execute("dial.hide()");
      global.menuClose();
      break;
    case "call":
      mp.events.callRemote("dialPress", val);
      global.menuClose();
      break;
  }
});
// STOCK //
mp.events.add("openStock", (data) => {
  if (global.menuCheck()) return;
  global.menu.execute(`stock.count=JSON.parse('${data}');stock.show();`);
  global.menuOpen();
});
mp.events.add("closeStock", () => {
  global.menuClose();
});
mp.events.add("stockTake", (index) => {
  global.menuClose();
  switch (index) {
    case 3: //mats
      mp.events.callRemote("setStock", "mats");
      global.input.set("Взять маты", "Введите кол-во матов", 10, "take_stock");
      global.input.open();
      break;
    case 0: //cash
      mp.events.callRemote("setStock", "money");
      global.input.set(
        "Взять деньги",
        "Введите кол-во денег",
        10,
        "take_stock"
      );
      global.input.open();
      break;
    case 1: //healkit
      mp.events.callRemote("setStock", "medkits");
      global.input.set(
        "Взять аптечки",
        "Введите кол-во аптечек",
        10,
        "take_stock"
      );
      global.input.open();
      break;
    case 2: //weed
      mp.events.callRemote("setStock", "drugs");
      global.input.set(
        "Взять наркотики",
        "Введите кол-во наркоты",
        10,
        "take_stock"
      );
      global.input.open();
      break;
    case 4: //weapons stock
      mp.events.callRemote("openWeaponStock");
      break;
	 case 5:
	 mp.events.callRemote("setStock", "armor");
      global.input.set(
        "Взять бронежилеты",
        "Введите кол-во бронежилетов",
        10,
        "take_stock"
      );
      global.input.open();
      break;
	  case 6:
	 mp.events.callRemote("setStock", "koko");
      global.input.set(
        "Взять листья коки",
        "Введите кол-во листьев",
        10,
        "take_stock"
      );
      global.input.open();
      break;
  }
});
mp.events.add("stockPut", (index) => {
  global.menuClose();
  switch (index) {
    case 3: //mats
      mp.events.callRemote("setStock", "mats");
      global.input.set(
        "Положить маты",
        "Введите кол-во матов",
        10,
        "put_stock"
      );
      global.input.open();
      break;
    case 0: //cash
      mp.events.callRemote("setStock", "money");
      global.input.set(
        "Положить деньги",
        "Введите кол-во денег",
        10,
        "put_stock"
      );
      global.input.open();
      break;
    case 1: //healkit
      mp.events.callRemote("setStock", "medkits");
      global.input.set(
        "Положить аптечки",
        "Введите кол-во аптечек",
        10,
        "put_stock"
      );
      global.input.open();
      break;
    case 2: //weed
      mp.events.callRemote("setStock", "drugs");
      global.input.set(
        "Положить наркотики",
        "Введите кол-во наркоты",
        10,
        "put_stock"
      );
      global.input.open();
      break;
    case 4: //weapons stock
      mp.events.callRemote("openWeaponStock");
      break;
	case 5:
	mp.events.callRemote("setStock", "armor");
      global.input.set(
        "Положить бронежилеты",
        "Введите кол-во бронежилетов",
        10,
        "put_stock"
      );
      global.input.open();
      break;
	case 6:
	mp.events.callRemote("setStock", "koko");
      global.input.set(
        "Положить листья коки",
        "Введите кол-во листьев",
        10,
        "put_stock"
      );
      global.input.open();
      break;
  }
});
mp.events.add("stockExit", () => {
  global.menuClose();
});
// POLICE PC //
var pcSubmenu;
mp.events.add("pcMenu", (index) => {
  switch (index) {
    case 1:
      global.menu.execute("pc.clearWanted()");
      pcSubmenu = "clearWantedLvl";
      return;
    case 2:
      global.menu.execute("pc.openCar()");
      pcSubmenu = "checkNumber";
      return;
    case 3:
      global.menu.execute("pc.openPerson()");
      pcSubmenu = "checkPerson";
      return;
    case 4:
      mp.events.callRemote("checkWantedList");
      pcSubmenu = "wantedList";
      return;
    case 5:
      global.menu.execute("pc.hide()");
      global.menuClose();
      return;
  }
});
mp.events.add("pcMenuInput", (data) => {
  mp.events.callRemote(pcSubmenu, data);
});
mp.events.add("executeWantedList", (data) => {
  global.menu.execute(`pc.openWanted('${data}')`);
});
mp.events.add("executeCarInfo", (model, holder) => {
  global.menu.execute(`pc.openCar("${model}","${holder}")`);
});
mp.events.add(
  "executePersonInfo",
  (name, lastname, uuid, gender, wantedlvl, lic, number, states) => {
    global.menu.execute(
      `pc.openPerson("${name}","${lastname}","${uuid}","${gender}","${wantedlvl}","${lic}","${number}", "${states}")`
    );
  }
);

let clUI = null;

const TypesClothes = ['1','2','3','4','5','6','7','8','9','10','11'];
const NameClothes = ['Маска','Причёска','Торс','Брюки','Рюкзаки','Обувь','Аксессуары','Нижняя одежда','Бронежилеты','Декали','Верхняя одежда'];
var name = "Маска";
let type = 1;
let variation = 0;
let texture = 0;

const Lifts = ['-1','0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','16','17','18','19','20'];

mp.events.add('client::acceptPressed', function () {
	menuClose();
	global.menu.execute(`infosss.hides()`);
	mp.events.callRemote("acceptPressed");
});

mp.events.add('client::closeinfo', function () {
	menuClose();
	global.menu.execute(`infosss.hides()`);
});

mp.events.add('client::openanswer', function (ayf) {
	if (global.menuCheck()) return;
    menuOpen();
	global.menu.execute(`infosss.show('${ayf}')`);
});

function openClothes() {
	if (global.menuCheck()) return;
	global.menuOpen();
    mp.gui.cursor.visible = false;

	var res = mp.game.graphics.getScreenActiveResolution(0, 0);
    const UIPositions = {
        RightMiddle: new Point(res.x - 180, res.y / 2),
        LeftMiddle: new Point(0, res.y / 2 - 200),
    };
	
	const AllClothes = [];

	for (let i=0; i < 500; i++)
	{
		AllClothes.push(i.toString());
	}
	
	clUI = new Menu("Одежда", "by koltr", UIPositions.LeftMiddle);
	
	name = "Маска";
	
	// TYPE
	clUI.AddItem(new UIMenuListItem( "Тип:", "Тип одежды", new ItemsCollection(NameClothes)));
	
	// VARIATION
	clUI.AddItem(new UIMenuListItem( "Вариация:", "Вариация одежды", new ItemsCollection(Lifts)));
	
	// TEXTURE
	clUI.AddItem(new UIMenuListItem( "Текстура:", "Текстура одежды", new ItemsCollection(Lifts)));
	
	// REFRESH
	clUI.AddItem(new UIMenuItem("Очистить", "Убирает всю одежду с персонажа"));
	
	// CLOSE
	clUI.AddItem(new UIMenuItem("Закрыть", "Закрыть меню"));
	
	clUI.ListChange.on((item, index) => {
		if (item.Text == "Тип:")
		{
			name = NameClothes[index];
			type = parseInt(index) + 1;
		}
		else if (item.Text == "Вариация:")
		{
			variation = parseInt(index);
		}
		else if (item.Text == "Текстура:")
		{
			texture = parseInt(index);
		}
		mp.game.graphics.notify(`~g~АУФ`);
	});
	
	clUI.Open();
	
	clUI.ItemSelect.on(item => {
        if (item.Text == "Закрыть") {
            global.menuClose();
            clUI.Close();
        }
		else if (item.Text == "Очистить")
		{
			localplayer.setComponentVariation(3, 15, 0, 0);
            localplayer.setComponentVariation(4, 14, 0, 0);
            localplayer.setComponentVariation(6, 35, 0, 0);
            localplayer.setComponentVariation(8, 15, 0, 0);
            localplayer.setComponentVariation(11, 15, 0, 0);
		}
		else
		{
			localplayer.setComponentVariation(type, variation, texture, 0);
		}
	});
	
}

let tunUI = null;
//const Lifts = ['-1','0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','16','17','18','19','20'];
const Spoilers = [];
const FrontBampers = [];
const RearBampers = [];
const Roofs = [];
const Wings = [];
const Lattices = [];
const Hoods = [];
const SideSkirts = [];
const Mufflers = [];
var selecttun = 0;

function openTun() {
	if (global.menuCheck()) return;
	global.menuOpen();
    mp.gui.cursor.visible = false;
	
	Spoilers.length = 0;
	FrontBampers.length = 0;
	RearBampers.length = 0;
	Roofs.length = 0;
	Wings.length = 0;
	Lattices.length = 0;
	Hoods.length = 0;
	SideSkirts.length = 0;
	Mufflers.length = 0;
	
	var res = mp.game.graphics.getScreenActiveResolution(0, 0);
    const UIPositions = {
        RightMiddle: new Point(res.x - 180, res.y / 2),
        LeftMiddle: new Point(0, res.y / 2 - 200),
    };
	
	tunUI = new Menu("Тюнинг", "by koltr", UIPositions.LeftMiddle);
	
	// CHECK
    tunUI.AddItem(new UIMenuItem("Проверка", "Проверяет есть ли у машины тюнинг"));
	
	// RETURN
    tunUI.AddItem(new UIMenuItem("Вернуть", "Возвращает весь тюнинг на -1"));
	
	// SPOILER
	tunUI.AddItem(new UIMenuListItem( "Спойлер", "Список спойлеров", new ItemsCollection(Lifts)));
	
	// FRONT BUMBPER
	tunUI.AddItem(new UIMenuListItem( "Передний бампер", "Список бамперов", new ItemsCollection(Lifts)));
	
	// REAR BUMBPER
	tunUI.AddItem(new UIMenuListItem( "Задний бампер", "Список бамперов", new ItemsCollection(Lifts)));
	
	// ROOF
	tunUI.AddItem(new UIMenuListItem( "Крыша", "Список крыш", new ItemsCollection(Lifts)));
	
	// WINGS
	tunUI.AddItem(new UIMenuListItem( "Крыло", "Список крыльев", new ItemsCollection(Lifts)));
	
	// LATTICE
	tunUI.AddItem(new UIMenuListItem( "Решётка", "Список каркасов", new ItemsCollection(Lifts)));
	
	// HOOD
	tunUI.AddItem(new UIMenuListItem( "Капот", "Список капюшонов", new ItemsCollection(Lifts)));
	
	// SIDE SKIRT
	tunUI.AddItem(new UIMenuListItem( "Боковые пороги", "Список боковых порогов", new ItemsCollection(Lifts)));
	
	// MUFFLER
	tunUI.AddItem(new UIMenuListItem( "Глушитель", "Список глушителей", new ItemsCollection(Lifts)));
	
	// SAVE
    tunUI.AddItem(new UIMenuItem("Сохранить", "Сохранение всех списков"));
	
	// CLOSE
    tunUI.AddItem(new UIMenuItem("Закрыть", "Закрыть меню"));
	
	// ON USE BUTTON
	tunUI.ItemSelect.on(item => {
        if (item.Text == "Закрыть") {
            global.menuClose();
            tunUI.Close();
        }
		else if (item.Text == "Спойлер")
		{
			for (let i=0; i< Spoilers.length; i++)
			  if (Spoilers[i] == selecttun)
			  {
				  Spoilers.splice(i, 1);
				  return;
			  }

			Spoilers.push(selecttun);
		}
		else if (item.Text == "Передний бампер")
		{
			for (let i=0; i< FrontBampers.length; i++)
			  if (FrontBampers[i] == selecttun)
			  {
				  FrontBampers.splice(i, 1);
				  return;
			  }
			
			FrontBampers.push(selecttun);
		}
		else if (item.Text == "Задний бампер")
		{
			for (let i=0; i< RearBampers.length; i++)
			  if (RearBampers[i] == selecttun)
			  {
				  RearBampers.splice(i, 1);
				  return;
			  }
			
			RearBampers.push(selecttun);
		}
		else if (item.Text == "Крыша")
		{
			for (let i=0; i< Roofs.length; i++)
			  if (Roofs[i] == selecttun)
			  {
				  Roofs.splice(i, 1);
				  return;
			  }
			
			Roofs.push(selecttun);
		}
		else if (item.Text == "Крыло")
		{
			for (let i=0; i< Roofs.length; i++)
			  if (Roofs[i] == selecttun)
			  {
				  Wings.splice(i, 1);
				  return;
			  }
			
			Wings.push(selecttun);
		}
		else if (item.Text == "Решётка")
		{
			for (let i=0; i< Lattices.length; i++)
			  if (Lattices[i] == selecttun)
			  {
				  Lattices.splice(i, 1);
				  return;
			  }
			
			Lattices.push(selecttun);
		}
		else if (item.Text == "Капот")
		{
			for (let i=0; i< Hoods.length; i++)
			  if (Hoods[i] == selecttun)
			  {
				  Hoods.splice(i, 1);
				  return;
			  }
			
			Hoods.push(selecttun);
		}
		else if (item.Text == "Боковые пороги")
		{
			for (let i=0; i< SideSkirts.length; i++)
			  if (SideSkirts[i] == selecttun)
			  {
				  SideSkirts.splice(i, 1);
				  return;
			  }
			  
			SideSkirts.push(selecttun);
		}
		else if (item.Text == "Глушитель")
		{
			for (let i=0; i< Mufflers.length; i++)
			  if (Mufflers[i] == selecttun)
			  {
				  Mufflers.splice(i, 1);
				  return;
			  }
			
			Mufflers.push(selecttun);
		}
		else if (item.Text == "Сохранить")
		{
			mp.game.graphics.notify(`~g~Сохранение...`);
			mp.events.callRemote('savemytun', JSON.stringify(Spoilers), JSON.stringify(FrontBampers), JSON.stringify(RearBampers), JSON.stringify(Roofs), JSON.stringify(Wings), JSON.stringify(Lattices), JSON.stringify(Hoods), JSON.stringify(SideSkirts), JSON.stringify(Mufflers));
		}
		else if (item.Text == "Проверка")
		{
			localplayer.vehicle.setMod(0, 0);
			localplayer.vehicle.setMod(1, 0);
			localplayer.vehicle.setMod(2, 0);
			localplayer.vehicle.setMod(10, 0);
			localplayer.vehicle.setMod(8, 0);
			localplayer.vehicle.setMod(6, 0);
			localplayer.vehicle.setMod(7, 0);
			localplayer.vehicle.setMod(3, 0);
			localplayer.vehicle.setMod(4, 0);
		}
		else if (item.Text == "Вернуть")
		{
			localplayer.vehicle.setMod(0, -1);
			localplayer.vehicle.setMod(1, -1);
			localplayer.vehicle.setMod(2, -1);
			localplayer.vehicle.setMod(10, -1);
			localplayer.vehicle.setMod(8, -1);
			localplayer.vehicle.setMod(6, -1);
			localplayer.vehicle.setMod(7, -1);
			localplayer.vehicle.setMod(3, -1);
			localplayer.vehicle.setMod(4, -1);
		}
    });
	
	// ON USE LIST
	tunUI.ListChange.on((item, index) => {
		selecttun = index - 1;
		if (item.Text == "Спойлер")
		{
			localplayer.vehicle.setMod(0, index - 1);
		}
		else if (item.Text == "Передний бампер")
		{
			localplayer.vehicle.setMod(1, index - 1);
		}
		else if (item.Text == "Задний бампер")
		{
			localplayer.vehicle.setMod(2, index - 1);
		}
		else if (item.Text == "Крыша")
		{
			localplayer.vehicle.setMod(10, index - 1);
		}
		else if (item.Text == "Крыло")
		{
			localplayer.vehicle.setMod(8, index - 1);
		}
		else if (item.Text == "Решётка")
		{
			localplayer.vehicle.setMod(6, index - 1);
		}
		else if (item.Text == "Капот")
		{
			localplayer.vehicle.setMod(7, index - 1);
		}
		else if (item.Text == "Боковые пороги")
		{
			localplayer.vehicle.setMod(3, index - 1);
		}
		else if (item.Text == "Глушитель")
		{
			localplayer.vehicle.setMod(4, index - 1);
		}
    });
	
	tunUI.Open();
	
}

mp.events.add("openPc", () => {
  if (global.menuCheck()) return;
  global.menu.execute("pc.show()");
  global.menuOpen();
});
mp.events.add("closePc", () => {
  if (global.menu !== null) {
    global.menu.execute("pc.hide()");
    global.menuClose();
  }
});
// DOCS //
mp.events.add("passport", (data) => {
  if (global.menu !== null) {
    global.menu.execute(`passport.set('${data}');`);
    if (global.menuCheck()) return;
    global.menu.execute("passport.show()");
    global.menuOpen();
  }
});
mp.events.add("plastic", (data) => {
  if (global.menu !== null) {
    global.menu.execute(`plastic.set('${data}');`);
    if (global.menuCheck()) return;
    global.menu.execute("plastic.show()");
    global.menuOpen();
  }
});
mp.events.add("licenses", (data) => {
  global.menu.execute(`license.set('${data}');`);
  if (global.menuCheck()) return;
  global.menu.execute("license.show()");
  global.menuOpen();
});

mp.events.add('ydovgov', (data) => {
        if (global.menu !== null) {
            global.menu.execute(`ydovgov.set('${data}');`);
            if (global.menuCheck()) return;
            global.menu.execute('ydovgov.show()');
            global.menuOpen();
        }
    });

mp.events.add('ydovpolice', (data) => {
        if (global.menu !== null) {
            global.menu.execute(`ydovpolice.set('${data}');`);
            if (global.menuCheck()) return;
            global.menu.execute('ydovpolice.show()');
            global.menuOpen();
        }
    });

mp.events.add('ydovems', (data) => {
        if (global.menu !== null) {
            global.menu.execute(`ydovems.set('${data}');`);
            if (global.menuCheck()) return;
            global.menu.execute('ydovems.show()');
            global.menuOpen();
        }
    });

mp.events.add('ydovfib', (data) => {
        if (global.menu !== null) {
            global.menu.execute(`ydovfib.set('${data}');`);
            if (global.menuCheck()) return;
            global.menu.execute('ydovfib.show()');
            global.menuOpen();
        }
    });

mp.events.add('ydovarmy', (data) => {
        if (global.menu !== null) {
            global.menu.execute(`ydovarmy.set('${data}');`);
            if (global.menuCheck()) return;
            global.menu.execute('ydovarmy.show()');
            global.menuOpen();
        }
    });

mp.events.add('ydovnews', (data) => {
        if (global.menu !== null) {
            global.menu.execute(`ydovnews.set('${data}');`);
            if (global.menuCheck()) return;
            global.menu.execute('ydovnews.show()');
            global.menuOpen();
        }
    });

mp.events.add('ydovmws', (data) => {
        if (global.menu !== null) {
            global.menu.execute(`ydovmws.set('${data}');`);
            if (global.menuCheck()) return;
            global.menu.execute('ydovmws.show()');
            global.menuOpen();
        }
    });	
mp.events.add('ydovgr6', (data) => {
        if (global.menu !== null) {
            global.menu.execute(`ydovgr6.set('${data}');`);
            if (global.menuCheck()) return;
            global.menu.execute('ydovgr6.show()');
            global.menuOpen();
        }
    });		

mp.events.add("dochide", () => {
  global.menuClose();
});

mp.events.add("showJobMenu", (level, currentjob, id) => {
  mp.gui.cursor.visible = true;
  menu.execute(`openWorks(${level},${currentjob},${id});`);
});

mp.events.add("closeJobMenu", () => {
  mp.gui.cursor.visible = false;
  menu.execute(`jobselector.active=false;`);
});

mp.events.add("selectJob", (jobid) => {
  if (new Date().getTime() - global.lastCheck < 1000) return;
  global.lastCheck = new Date().getTime();
  mp.events.callRemote("jobjoin", jobid);
});

// SIMPLE MENU //
function openSM(type, data) {
  if (global.menuCheck()) return;
  global.menu.execute("menu.show()");
  switch (type) {
        //case 0: menu.execute(`openWorks(${data});`); break;
        case 1: menu.execute(`openShop('${data}');`); break;
        case 2: menu.execute(`openBlack('${data}');`); break;
        case 3: menu.execute(`openFib('${data}');`); break;
        case 4: menu.execute(`openLspd('${data}');`); break;
        case 5: menu.execute(`openArmy('${data}');`); break;
        case 6: menu.execute(`openGov('${data}');`); break;
        case 7: menu.execute(`openArmygun('${data}');`); break;
        case 8: menu.execute(`openGang('${data}');`); break;
        case 9: menu.execute(`openMafia('${data}');`); break;
		case 10:menu.execute(`openMwc('${data}');`);   break;
		case 11: menu.execute(`openFishShop('${data}');`); break;
		case 12:menu.execute(`openNac('${data}');`);   break;
		case 13: menu.execute(`openFracAuto('${data}');`); break;
		case 14: menu.execute(`openAutoShop('${data}');`); break;
		case 15: menu.execute(`openContainer('${data}');`); break;
		case 16: menu.execute(`openGarage('${data}');`); break;
		case 17: menu.execute(`openAirShop('${data}');`); break;
		case 18: menu.execute(`openGarageARMY('${data}');`); break;
    case 19: menu.execute(`openArendaCar('${data}');`); break;
    case 20: menu.execute(`openRentMenu('${data}');`); break;
  }
  global.menuOpen();
}
mp.events.add('RentMenu', (json) => {
  let data = JSON.parse(json);
  openSM(20, JSON.stringify(data));
});
function closeSM() {
  global.menu.execute("menu.hide()");
  global.menuClose();
}
mp.events.add("smExit", () => {
  //mp.gui.chat.push('exit');
  closeSM();
});
mp.events.add("smOpen", (type, data) => {
  openSM(type, data);
});
mp.events.add("menu", (action, data) => {
  switch (action) {
    case "resign":
            mp.events.callRemote('jobjoin', -1);
            break;
        case "work":
            mp.events.callRemote('jobjoin', data);
            break;
        case "shop":
            mp.events.callRemote('shop', data);
            break;
        case "black":
            mp.events.callRemote('mavrbuy', data);
            break;
        case "fib":
            mp.events.callRemote('fbigun', data);
            break;
        case "lspd":
            mp.events.callRemote('lspdgun', data);
            break;
        case "gov":
            mp.events.callRemote('govgun', data);
            break;
		case "army":
            mp.events.callRemote('armygun', data);
            break;
        case "gang":
            mp.events.callRemote('gangmis', data);
            break;
        case "mafia":
            mp.events.callRemote('mafiamis', data);
            break;
		case "mwc":
			mp.events.callRemote("mwcgun", data);
			break;
		case "fishshop":
			mp.events.callRemote('fishshop', data);
            break;
		case "nac":
            mp.events.callRemote('nacgun', data);
            break;	
		case "fracauto":
            mp.events.callRemote('fracauto', data);
            break;
		case "garagearmy":
            mp.events.callRemote('garagearmy', data);
            break;
		case "autoshop":
            mp.events.callRemote('autoshop', data);
            break;		
    case "rentmenu":
            mp.events.callRemote('rentmenu', data);
            break;			
  }
});

// SM DATA //


mp.events.add('policeg', () => {
    let data = [
        "Дубинка",
        "Пистолет",
        "SMG",
        "Дробовик",
        "Tazer",
        "Бронежилет",
        "Аптечка",
        "Пистолетный калибр x12",
        "Малый калибр x30",
        "Дробь x6",
    ];
    openSM(4, JSON.stringify(data));
});
mp.events.add('fbiguns', () => {
    let data = [
        "Tazer",
        "Пистолет",
        "ПОС",
        "Карабин",
        "Снайперская винтовка",
        "Бронежилет",
        "Аптечка",
        "Пистолетный калибр x12",
        "Малый калибр x30",
        "Автоматный калибр x30",
        "Снайперский калибр x5",
        "Бейдж",
    ];
    openSM(3, JSON.stringify(data));
});
mp.events.add('govguns', () => {
    let data = [
        "Tazer",
        "Пистолет",
        "Advanced Rifle",
        "Gusenberg Sweeper",
        "Бронежилет",
        "Аптечка",
        "Пистолетный калибр x12",
        "Малый калибр x30",
        "Автоматный калибр x30",
    ];
    openSM(6, JSON.stringify(data));
});
mp.events.add('armyguns', () => {
    let data = [
        "Шокер",
        "Пистолет",
        "SMG",
        "Pump Shotgun",
        "Укор. Пистолет",	
		    "Штурмовой SMG",
		    "Боевой пулемёт",
		    "Продвинутая Винтовка",
		    "Компактная винтовка",
		    "Heavy Sniper",
		    "Sniper Rifle",
		    "Мощный дробовик",
		    "Тяжелый дробовик",	
        "Бронежилет",
        "Аптечка",
        "Пистолетный калибр x12",
        "Малый калибр x30",
        "Автоматный калибр x30",
        "Снайперский калибр x5",
		    "Дробь x6",
    ];
    openSM(7, JSON.stringify(data));
});
mp.events.add('mavrshop', () => {
    let data = [
        ["Услуга по отмыву денег", "",12],
        ["Отмычка для замков", "15$",11],
        ["Военная отмычка", "85$",16],
        ["Стяжки", "43$",18],
        ["Мешок", "72$",17],
        ["Понизить розыск", "14300$",40],
        ["Программатор", "10000$",1872]
    ];
    openSM(2, JSON.stringify(data));
});
mp.events.add('gangmis', () => {
    let data = [
        "Угон автотранспорта",
        "Перевозка автотранспорта",
    ];
    openSM(8, JSON.stringify(data));
});
mp.events.add('mafiamis', () => {
    let data = [
        "Перевозка оружия",
        "Перевозка денег",
        "Перевозка трупов",
    ];
    openSM(9, JSON.stringify(data));
});
mp.events.add('shop', (json) => {
    let data = JSON.parse(json);
    openSM(1, JSON.stringify(data));
});

mp.events.add("mwcguns", () => {
  let data = [
        "Шокер",
        "Пистолет",
        "Пистолет-пулемёт",
        "Дробовик",
        "Укор. Пистолет",
        "Карабин",
		"Пистолет 50 калибр",		
		"Винтажный пистолет",
		"Автомат. пистолет",		
		"Штурмовой SMG",
		"Боевой пулемёт",
		"Обрез",
		"Мощный дробовик",
		"Тяжелый дробовик",	
        "Бронежилет",
        "Аптечка",
        "Пистолетный калибр x12",
        "Малый калибр x30",
        "Автоматный калибр x30",
		"Дробь x6",
  ];
  openSM(10, JSON.stringify(data));
});

mp.events.add('fishshop', (json) => {
    let data = JSON.parse(json);
    global.openSM(11, JSON.stringify(data));
});

mp.events.add("nacguns", () => {
  let data = [
        "Tazer",
        "Пистолет",
        "ПОС",
        "Карабин",
        "Бронежилет",
        "Аптечка",
        "Пистолетный калибр x12",
        "Малый калибр x30",
        "Автоматный калибр x30",
  ];
  openSM(12, JSON.stringify(data));
});
mp.events.add('fracauto', (json) => {
    let data = JSON.parse(json);
    openSM(13, JSON.stringify(data));
});

mp.events.add('autoshop', (json) => {
    let data = JSON.parse(json);
    openSM(14, JSON.stringify(data));
});

mp.events.add('container', (json) => {
    let data = JSON.parse(json);
    openSM(15, JSON.stringify(data));
});

mp.events.add('garagearmy', (json) => {
    let data = JSON.parse(json);
    openSM(18, JSON.stringify(data));
});
mp.events.add('arenda', (json) => {
  let data = JSON.parse(json);
  openSM(19, JSON.stringify(data));
});


// ATM //
var atmIndex = 0;
mp.events.add("openatm", () => {
  if (global.menuCheck()) return;
  global.menu.execute("atm.active=1");
  global.menuOpen();
});
mp.events.add("closeatm", () => {
  global.menuClose();
  global.menu.execute("atm.reset();atm.active=0");
});
mp.events.add("setatm", (num, name, bal, sub) => {
  global.menu.execute(`atm.set('${num}','${name}','${bal}','${sub}')`);
});
mp.events.add("setbank", (bal) => {
  global.menu.execute(`atm.balance="${bal}"`);
});
mp.events.add("atmCB", (type, data) => {
  mp.events.callRemote("atmCB", type, data);
});
var atmTcheck = 0;
mp.events.add("atmVal", (data) => {
  if (new Date().getTime() - atmTcheck < 1000) {
    mp.events.callRemote("atmDP");
  } else {
    mp.events.callRemote("atmVal", data);
    atmTcheck = new Date().getTime();
  }
});
mp.events.add("atmOpen", (data) => {
  global.menu.execute(`atm.open(${data})`);
});
mp.events.add("atmOpenBiz", (data1, data2) => {
  global.menu.execute(`atm.open([3, ${data1}, ${data2}])`);
});

mp.events.add("atmOpenComp", (data1, data2) => {
  global.menu.execute(`atm.open([4, ${data1}, ${data2}])`);
});

mp.events.add("atmOpenBizp", (data1, data2) => {
  global.menu.execute(`atm.open([5, ${data1}, ${data2}])`);
});

mp.events.add("atm", (index, data) => {
  if (index == 4) {
    ATMTemp = data;
    global.menu.execute("atm.change(44)");
  } else if (index == 44) {
    mp.events.callRemote("atm", 4, data, ATMTemp);
    global.menu.execute("atm.reset()");
    return;
  } else if (index == 33) {
    mp.events.callRemote("atm", 3, data, ATMTemp);
  } else {
    mp.events.callRemote("atm", index, data);
    global.menu.execute("atm.reset()");
  }
});
let ATMTemp = "";
// ELEVATOR //
var liftcBack = "";
function openLift(type, cBack) {
  if (global.menuCheck()) return;
  let floors = [["Гараж", "1 этаж", "49 этаж", "Крыша"]];
  let json = JSON.stringify(floors[type]);
  global.menu.execute(`lift.set('${json}');lift.active=1;`);
  global.menuOpen();
  liftcBack = cBack;
}
function closeLift() {
  global.menuClose();
  global.menu.execute("lift.active=0;lift.reset();");
  liftcBack = "";
}
mp.events.add("openlift", (type, cBack) => {
  openLift(type, cBack);
});
mp.events.add("lift", (act, data) => {
  switch (act) {
    case "stop":
      closeLift();
      break;
    case "start":
      mp.events.callRemote(liftcBack, data);
      closeLift();
      break;
  }
});
// PETROL //
mp.events.add("petrol", (data, card) => {
  mp.events.callRemote("petrol", data, card);
  //
  global.menuClose();
  global.menu.execute("petrol.reset()");
});
mp.events.add("petrol.full", (card) => {
  mp.events.callRemote("petrol", 9999, card);
  //
  global.menuClose();
  global.menu.execute("petrol.reset()");
});
mp.events.add("petrol.gov", () => {
  mp.events.callRemote("petrol", 99999, false);
  //
  global.menuClose();
  global.menu.execute("petrol.reset()");
});
mp.events.add("openPetrol", (fuel) => {
  if (global.menuCheck()) return;
  global.menuOpen();
  global.menu.execute("petrol.active=1");
  global.menu.execute(`petrol.fuel=${fuel}`);
});
mp.events.add("closePetrol", () => {
  global.menuClose();
  global.menu.execute("petrol.reset()");
});

// FRACTION MENU //

mp.events.add("openfm", (name, logs, ranks) => {
  if (global.menuCheck()) return;
  global.menuOpen();
  global.menu.execute("fmenu.active=1");
  global.menu.execute(`fmenu.menu=1`);
  global.menu.execute(`fmenu.btnactive[1]=true`);
  global.menu.execute(`fmenu.submenu=true`);
  global.menu.execute(`fmenu.name='${name}'`);
  global.menu.execute(`fmenu.setlogs(${logs})`);
  global.menu.execute(`fmenu.setranks(${ranks})`);
});

mp.events.add("setmem", (json, count, on, off) => {
  global.menu.execute(`fmenu.set('${json}',${count},${on},${off});`);
});

mp.events.add("closefm", () => {
  global.menuClose();
});

mp.events.add("fmenu", (act, data1, data2) => {
  mp.events.callRemote("fmenu", act, data1, data2);
  global.menuClose();
});

mp.keys.bind(0x4B, false, function() {
	if (!loggedin || chatActive || editing || cuffed || localplayer.getVariable('InDeath') == true) return;
	mp.events.callRemote("helpfire");
});
mp.events.add("matsOpen", (isArmy, isMed) => {
  if (global.menuCheck()) return;
  global.menuOpen();
  global.menu.execute(`mats.show(${isArmy},${isMed})`);
});
mp.events.add("matsL", (act) => {
  //load
  global.menuClose();
  switch (act) {
    case 1:
      global.input.set("Загрузить маты", "Введите кол-во матов", 4, "loadmats");
      global.input.open();
      break;
    case 2:
      global.input.set("Загрузить маты", "Введите кол-во матов", 4, "loadmats");
      global.input.open();
      break;
    case 3:
      global.input.set(
        "Загрузить наркоту",
        "Введите кол-во наркоты",
        4,
        "loaddrugs"
      );
      global.input.open();
      break;
    case 4:
      global.input.set(
        "Загрузить аптечки",
        "Введите кол-во аптечек",
        4,
        "loadmedkits"
      );
      global.input.open();
      break;
  }
});
mp.events.add("matsU", (act) => {
  //unload
  global.menuClose();
  switch (act) {
    case 1:
      global.input.set(
        "Выгрузить маты",
        "Введите кол-во матов",
        4,
        "unloadmats"
      );
      global.input.open();
      break;
    case 2:
      global.input.set(
        "Выгрузить маты",
        "Введите кол-во матов",
        4,
        "unloadmats"
      );
      global.input.open();
      break;
    case 3:
      global.input.set(
        "Выгрузить наркоту",
        "Введите кол-во наркоты",
        4,
        "unloaddrugs"
      );
      global.input.open();
      break;
    case 4:
      global.input.set(
        "Выгрузить аптечки",
        "Введите кол-во аптечек",
        4,
        "unloadmedkits"
      );
      global.input.open();
      break;
  }
});
// BODY SEARCH //
mp.events.add("bsearch", (act) => {
  global.menuClose();
  switch (act) {
    case 1:
      mp.events.callRemote("pSelected", circleEntity, "Посмотреть лицензии");
      break;
    case 2:
      mp.events.callRemote("pSelected", circleEntity, "Посмотреть паспорт");
      break;
  }
});
mp.events.add("bsearchOpen", (data) => {
  if (global.menuCheck()) return;
  global.menuOpen();
  global.menu.execute(`bsearch.active=true`);
  global.menu.execute(`bsearch.set('${data}')`);
});
// BODY CUSTOM //
function getCameraOffset(pos, angle, dist) {
  //mp.gui.chat.push(`Sin: ${Math.sin(angle)} | Cos: ${Math.cos(angle)}`);

  angle = angle * 0.0174533;

  pos.y = pos.y + dist * Math.sin(angle);
  pos.x = pos.x + dist * Math.cos(angle);

  //mp.gui.chat.push(`X: ${pos.x} | Y: ${pos.y}`);

  return pos;
}
var bodyCamValues = {
  hair: { Angle: 0, Dist: 0.5, Height: 0.7 },
  beard: { Angle: 0, Dist: 0.5, Height: 0.7 },
  eyebrows: { Angle: 0, Dist: 0.5, Height: 0.7 },
  chesthair: { Angle: 0, Dist: 1, Height: 0.2 },
  lenses: { Angle: 0, Dist: 0.5, Height: 0.7 },
  lipstick: { Angle: 0, Dist: 0.5, Height: 0.7 },
  blush: { Angle: 0, Dist: 0.5, Height: 0.7 },
  makeup: { Angle: 0, Dist: 0.5, Height: 0.7 },

  torso: [
    { Angle: 0, Dist: 1, Height: 0.2 },
    { Angle: 0, Dist: 1, Height: 0.2 },
    { Angle: 0, Dist: 1, Height: 0.2 },
    { Angle: 180, Dist: 1, Height: 0.2 },
    { Angle: 180, Dist: 1, Height: 0.2 },
    { Angle: 180, Dist: 1, Height: 0.2 },
    { Angle: 180, Dist: 1, Height: 0.2 },
    { Angle: 305, Dist: 1, Height: 0.2 },
    { Angle: 55, Dist: 1, Height: 0.2 },
  ],
  head: [
    { Angle: 0, Dist: 1, Height: 0.5 },
    { Angle: 305, Dist: 1, Height: 0.5 },
    { Angle: 55, Dist: 1, Height: 0.5 },
    { Angle: 180, Dist: 1, Height: 0.5 },
    { Angle: 0, Dist: 0.5, Height: 0.5 },
    { Angle: 0, Dist: 0.5, Height: 0.5 },
  ],
  leftarm: [
    { Angle: 55, Dist: 1, Height: 0.0 },
    { Angle: 55, Dist: 1, Height: 0.1 },
    { Angle: 55, Dist: 1, Height: 0.1 },
  ],
  rightarm: [
    { Angle: 305, Dist: 1, Height: 0.0 },
    { Angle: 305, Dist: 1, Height: 0.1 },
    { Angle: 305, Dist: 1, Height: 0.1 },
  ],
  leftleg: [
    { Angle: 55, Dist: 1, Height: -0.6 },
    { Angle: 55, Dist: 1, Height: -0.6 },
  ],
  rightleg: [
    { Angle: 305, Dist: 1, Height: -0.6 },
    { Angle: 305, Dist: 1, Height: -0.6 },
  ],
};
global.bodyCam = null;
global.bodyCamStart = new mp.Vector3(0, 0, 0);

var tattooValues = [0, 0, 0, 0, 0, 0];
var tattooIds = ["torso", "head", "leftarm", "rightarm", "leftleg", "rightleg"];

var barberValues = {};
barberValues["hair"] = { Style: 0, Color: 0 };
barberValues["beard"] = { Style: 255, Color: 0 };
barberValues["eyebrows"] = { Style: 255, Color: 0 };
barberValues["chesthair"] = { Style: 255, Color: 0 };
barberValues["lenses"] = { Style: 0, Color: 0 };
barberValues["lipstick"] = { Style: 255, Color: 0 };
barberValues["blush"] = { Style: 255, Color: 0 };
barberValues["makeup"] = { Style: 255, Color: 0 };
var barberIds = [
  "hair",
  "beard",
  "eyebrows",
  "chesthair",
  "lenses",
  "lipstick",
  "blush",
  "makeup",
];

mp.events.add("barber", (act, id, val) => {
  if (new Date().getTime() - global.lastCheck < 50) return;
  global.lastCheck = new Date().getTime();
  switch (act) {
    case "buy":
      mp.events.callRemote(
        "buyBarber",
        id,
        barberValues[id].Style,
        barberValues[id].Color
      );
      break;
    case "style":
      switch (id) {
        case "hair":
          let gender = localplayer.getVariable("GENDER") ? 0 : 1;
          barberValues["hair"].Style = hairIDList[gender][val];
          localplayer.setComponentVariation(
            2,
            barberValues["hair"].Style,
            0,
            0
          );
          localplayer.setHairColor(barberValues["hair"].Color, 0);
          break;
        case "beard":
          barberValues["beard"].Style = val == 0 ? 255 : val - 1;
          localplayer.setHeadOverlay(
            1,
            barberValues["beard"].Style,
            100,
            barberValues["beard"].Color,
            barberValues["beard"].Color
          );
          break;
        case "eyebrows":
          barberValues["eyebrows"].Style = val == 0 ? 255 : val - 1;
          localplayer.setHeadOverlay(
            2,
            barberValues["eyebrows"].Style,
            100,
            barberValues["eyebrows"].Color,
            barberValues["eyebrows"].Color
          );
          break;
        case "chesthair":
          barberValues["chesthair"].Style = val == 0 ? 255 : val - 1;
          localplayer.setHeadOverlay(
            10,
            barberValues["chesthair"].Style,
            100,
            barberValues["chesthair"].Color,
            barberValues["chesthair"].Color
          );
          break;
        case "lenses":
          barberValues["lenses"].Style = val;
          localplayer.setEyeColor(val);
          break;
        case "lipstick":
          barberValues["lipstick"].Style = val == 0 ? 255 : val - 1;
          localplayer.setHeadOverlay(
            8,
            barberValues["lipstick"].Style,
            100,
            barberValues["lipstick"].Color,
            barberValues["lipstick"].Color
          );
          break;
        case "blush":
          barberValues["blush"].Style = val == 0 ? 255 : val - 1;
          localplayer.setHeadOverlay(
            5,
            barberValues["blush"].Style,
            100,
            barberValues["blush"].Color,
            barberValues["blush"].Color
          );
          break;
        case "makeup":
          barberValues["makeup"].Style = val == 0 ? 255 : val - 1;
          localplayer.setHeadOverlay(
            4,
            barberValues["makeup"].Style,
            100,
            barberValues["makeup"].Color,
            barberValues["makeup"].Color
          );
          break;
      }

      const camValues = bodyCamValues[id];
      const camPos = getCameraOffset(
        new mp.Vector3(
          bodyCamStart.x,
          bodyCamStart.y,
          bodyCamStart.z + camValues.Height
        ),
        localplayer.getRotation(2).z + 90 + camValues.Angle,
        camValues.Dist
      );

      bodyCam.setCoord(camPos.x, camPos.y, camPos.z);
      bodyCam.pointAtCoord(
        bodyCamStart.x,
        bodyCamStart.y,
        bodyCamStart.z + camValues.Height
      );
      break;
    case "color":
      switch (id) {
        case "hair":
          barberValues["hair"].Color = val;
          localplayer.setComponentVariation(
            2,
            barberValues["hair"].Style,
            0,
            0
          );
          localplayer.setHairColor(barberValues["hair"].Color, 0);
          break;
        case "beard":
          barberValues["beard"].Color = val;
          localplayer.setHeadOverlay(
            1,
            barberValues["beard"].Style,
            100,
            barberValues["beard"].Color,
            barberValues["beard"].Color
          );
          break;
        case "eyebrows":
          barberValues["eyebrows"].Color = val;
          localplayer.setHeadOverlay(
            2,
            barberValues["eyebrows"].Style,
            100,
            barberValues["eyebrows"].Color,
            barberValues["eyebrows"].Color
          );
          break;
        case "chesthair":
          barberValues["chesthair"].Color = val;
          localplayer.setHeadOverlay(
            10,
            barberValues["chesthair"].Style,
            100,
            barberValues["chesthair"].Color,
            barberValues["chesthair"].Color
          );
          break;
        case "lipstick":
          barberValues["lipstick"].Color = val;
          localplayer.setHeadOverlay(
            8,
            barberValues["lipstick"].Style,
            100,
            barberValues["lipstick"].Color,
            barberValues["lipstick"].Color
          );
          break;
        case "blush":
          barberValues["blush"].Color = val;
          localplayer.setHeadOverlay(
            5,
            barberValues["blush"].Style,
            100,
            barberValues["blush"].Color,
            barberValues["blush"].Color
          );
          break;
      }
      break;
  }
});
mp.events.add("tattoo", (act, id, val) => {
  if (new Date().getTime() - global.lastCheck < 50) return;
  global.lastCheck = new Date().getTime();
  switch (act) {
    case "buy":
      mp.events.callRemote(
        "buyTattoo",
        tattooIds.indexOf(id),
        tattooValues[tattooIds.indexOf(id)]
      );
      break;
    case "style":
      var tId = tattooIds.indexOf(id);
      tattooValues[tId] = val;

      const tattoo = tattoos[id][val];
      var hash = localplayer.getVariable("GENDER")
        ? tattoo.MaleHash
        : tattoo.FemaleHash;
      localplayer.clearDecorations();

      var playerTattoos = JSON.parse(localplayer.getVariable("TATTOOS"));
      for (let x = 0; x < playerTattoos[tId].length; x++) {
        // Очищаем ненужные татушки

        for (let i = 0; i < tattoo.Slots.length; i++) {
          if (playerTattoos[tId][x].Slots.indexOf(tattoo.Slots[i]) != -1) {
            playerTattoos[tId][x] = null;
            break;
          }
        }
      }

      for (
        let x = 0;
        x < 6;
        x++ // Восстанавливаем старые татуировки игрока, кроме тех, которые занимают очищенные слоты
      )
        if (playerTattoos[x] != null)
          for (let i = 0; i < playerTattoos[x].length; i++)
            if (playerTattoos[x][i] != null)
              localplayer.setDecoration(
                mp.game.joaat(playerTattoos[x][i].Dictionary),
                mp.game.joaat(playerTattoos[x][i].Hash)
              );

      localplayer.setDecoration(
        mp.game.joaat(tattoo.Dictionary),
        mp.game.joaat(hash)
      ); // Ну и применяем выбранную татуировку

      const camValues = bodyCamValues[id][tattoo.Slots[0]];
      const camPos = getCameraOffset(
        new mp.Vector3(
          bodyCamStart.x,
          bodyCamStart.y,
          bodyCamStart.z + camValues.Height
        ),
        localplayer.getRotation(2).z + 90 + camValues.Angle,
        camValues.Dist
      );

      bodyCam.setCoord(camPos.x, camPos.y, camPos.z);
      bodyCam.pointAtCoord(
        bodyCamStart.x,
        bodyCamStart.y,
        bodyCamStart.z + camValues.Height
      );
      break;
  }
});
mp.events.add("openBody", (isBarber, price) => {
  if (global.menuCheck()) return;

  if (isBarber) {
    barberValues["hair"] = { Style: 0, Color: 0 };
    barberValues["beard"] = { Style: 255, Color: 0 };
    barberValues["eyebrows"] = { Style: 255, Color: 0 };
    barberValues["chesthair"] = { Style: 255, Color: 0 };
    barberValues["lenses"] = { Style: 0, Color: 0 };
    barberValues["lipstick"] = { Style: 255, Color: 0 };
    barberValues["blush"] = { Style: 255, Color: 0 };
    barberValues["makeup"] = { Style: 255, Color: 0 };

    for (let i = 0; i < 8; i++) {
      let id = barberIds[i];
      let bizBarberPrices = [];
      let barberSkip = [];

      for (let x = 0; x < barberPrices[id].length; x++) {
        let tempPrice = (barberPrices[id][x] / 100) * price;
        bizBarberPrices[x] = tempPrice.toFixed();
      }

      mp.events.call(
        "setBody",
        id,
        JSON.stringify(bizBarberPrices),
        JSON.stringify(barberSkip)
      );
    }

    bodyCamStart = localplayer.position;
  } else {
    tattooValues = [0, 0, 0, 0, 0, 0];

    let gender = localplayer.getVariable("GENDER");

    for (let i = 0; i < 6; i++) {
      let id = tattooIds[i];

      let tattooPrices = [];
      let tattooSkips = [];

      for (let x = 0; x < tattoos[id].length; x++) {
        let tempPrice = (tattoos[id][x].Price / 100) * price;
        tattooPrices[x] = tempPrice.toFixed();

        let hash = gender ? tattoos[id][x].MaleHash : tattoos[id][x].FemaleHash;
        if (hash == "") tattooSkips.push(x);
      }

      bodyCamStart = new mp.Vector3(324.9798, 180.6418, 103.6665);

      mp.events.call(
        "setBody",
        id,
        JSON.stringify(tattooPrices),
        JSON.stringify(tattooSkips)
      );
    }
  }

  var camValues = isBarber ? bodyCamValues["hair"] : bodyCamValues["torso"][0];
  var pos = getCameraOffset(
    new mp.Vector3(
      bodyCamStart.x,
      bodyCamStart.y,
      bodyCamStart.z + camValues.Height
    ),
    localplayer.getRotation(2).z + 90 + camValues.Angle,
    camValues.Dist
  );
  bodyCam = mp.cameras.new("default", pos, new mp.Vector3(0, 0, 0), 50);
  bodyCam.pointAtCoord(
    bodyCamStart.x,
    bodyCamStart.y,
    bodyCamStart.z + camValues.Height
  );
  bodyCam.setActive(true);
  mp.game.cam.renderScriptCams(true, false, 500, true, false);

  global.menuOpen();
  global.menu.execute(`body.isBarber=${isBarber}`);
  global.menu.execute(`body.active=true`);

  mp.events.call("camMenu", true);
});
mp.events.add("closeBody", () => {
  if (new Date().getTime() - global.lastCheck < 50) return;
  global.lastCheck = new Date().getTime();
  global.menuClose();

  bodyCam.destroy();
  mp.game.cam.renderScriptCams(false, false, 500, true, false);

  localplayer.clearDecorations();
  mp.events.callRemote("cancelBody");

  mp.events.call("camMenu", false);
});
mp.events.add("setBody", (id, data1, data2) => {
  global.menu.execute(`body.set('${id}','${data1}','${data2}')`);
});


let autoColors = [
  "Черный",
  "Белый",
  "Красный",
  "Оранжевый",
  "Желтый",
  "Зеленый",
  "Голубой",
  "Синий",
  "Фиолетовый",
];
let autoModels = null;

let colors = {};
colors["Черный"] = [0, 0, 0];
colors["Белый"] = [225, 225, 225];
colors["Красный"] = [230, 0, 0];
colors["Оранжевый"] = [255, 115, 0];
colors["Желтый"] = [240, 240, 0];
colors["Зеленый"] = [0, 230, 0];
colors["Голубой"] = [0, 205, 255];
colors["Синий"] = [0, 0, 230];
colors["Фиолетовый"] = [190, 60, 165];

let auto = {
  model: null,
  color: null,
  entity: null,
  x: null,
  y: null,
  z: null
};

//const vehheading = rotator;


const cameraRotator = require("cef/js/vie.js");

function createCam(x, y, z, rx, ry, rz, viewangle, up) {
    // camera = mp.cameras.new("Cam", {x, y, z}, {x: rx, y: ry, z: rz}, viewangle);
    camera = mp.cameras.new("default");
    camera.setCoord(x, y, z);
    camera.setRot(rx, ry, rz, 2);
    camera.setFov(viewangle);
    camera.setActive(true);

    var vehPosition = new mp.Vector3(x, y, z); // спавн авто
    cameraRotator.start(camera, vehPosition, vehPosition, new mp.Vector3(-3.0 - up, 3.5 + up, 0.5), 180);
    cameraRotator.setZBound(-0.8, 1);
    cameraRotator.setZUpMultipler(5);
    cameraRotator.pause(true);

    mp.game.cam.renderScriptCams(true, false, 3000, true, false);
}


mp.events.add("auto", (act, value) => {
  switch (act) {
    case "model":
	  auto.model = autoModels[value];
	  mp.events.callRemote('createlveh', autoModels[value], colors[auto.color][0], colors[auto.color][1], colors[auto.color][2], auto.x, auto.y, auto.z);
      break;
    case "color":
      auto.color = autoColors[value];
      mp.events.callRemote('vehchangecolor', colors[auto.color][0], colors[auto.color][1], colors[auto.color][2]);
      break;
  }
});

mp.events.add("buyAuto", () => {
  if (new Date().getTime() - global.lastCheck < 50) return;
  global.lastCheck = new Date().getTime();
  //mp.gui.chat.push('auto buy');

  global.menuClose();
  if (inair)
	global.menu.execute("air.active=0");
  else
	global.menu.execute("auto.active=0");
  
  localplayer.setAlpha(255);

  mp.events.callRemote("carroomBuy", auto.model, auto.color);
  cameraRotator.stop();
  
  inair = false;
});
mp.events.add("closeAuto", () => {
  if (new Date().getTime() - global.lastCheck < 50) return;
  global.menu.execute(`auto.cur='$'`);
  global.lastCheck = new Date().getTime();
  global.menuClose();
  if (inair)
	global.menu.execute("air.active=0");
  else
	global.menu.execute("auto.active=0");
  
  localplayer.setAlpha(255);

  mp.events.callRemote("carroomCancel");
  cameraRotator.stop();
  
  inair = false;

});

mp.events.add('testAuto', () => {
    if(new Date().getTime() - global.lastCheck < 50) return; 
    global.lastCheck = new Date().getTime();
    global.menuClose();
    if (inair)
		global.menu.execute("air.active=0");
    else
		global.menu.execute("auto.active=0");
	
	vehheading.stop();
	 
	localplayer.setAlpha(255);

    mp.events.callRemote('carromtestdrive', auto.model, colors[auto.color][0], colors[auto.color][1], colors[auto.color][2]);

	inair = false;

    if (auto.entity == null) return;
    auto.entity.destroy();
    auto.entity = null;
    
})

let inair = 0;

mp.events.add('openAuto', (models, prices, x,y,z) => {
    if (global.menuCheck()) return;
    autoModels = JSON.parse(models);
    let autoNames = [];
    autoModels.forEach(model => {
        autoNames.push(vehicleNames.get(model) || "ModelName")
    });
	
	let fov = 50;
	let add = 0.0;
	let up = 2.3;
	let upz = 0.0;
	let upx = 0.0;
	
	if (autoModels[0] === 'microlight') { inair = 1}
	
	if (autoModels[0] === 'boxville4'){ up = 6; }
	else if (inair) { upz = 2.5; up = 6; }
		
	createCam(x + upx, y - add, z + add + upz, 0, 0, 285.854,fov, up); // координаты камеры и ротация
	cameraRotator.pause(false);

    setAuto('models', models);
    setAuto('modelsName', JSON.stringify(autoNames));
    setAuto('colors', JSON.stringify(autoColors));
    setAuto('prices', prices);
	if (autoModels[0] === 's15mak') global.menu.execute(`auto.cur='CC'`);
	else global.menu.execute(`auto.cur='$'`);
	
	auto.x = x;
	auto.y = y;
	auto.z = z;

    mp.events.callRemote('createlveh', autoModels[0], 0, 0, 0, x, y, z);
    auto.color = "Черный";
    auto.model = autoModels[0];
	
	localplayer.setAlpha(0);
	
    global.menuOpen();
	if (inair)
		global.menu.execute(`air.active=true`);
	else
		global.menu.execute(`auto.active=true`);
});

// PETSHOP

let petModels = null;
let petHashes = null;

let pet = {
  model: null,
  entity: null,
  dimension: 0,
};

function setPet(type, jsonstr) {
  global.menu.execute(`petshop.${type}=${jsonstr}`);
}
mp.events.add("petshop", (act, value) => {
  switch (act) {
    case "model":
      pet.model = petModels[value];
      if (pet.entity != null) {
        pet.entity.destroy();
        pet.entity = mp.peds.new(
          petHashes[value],
          new mp.Vector3(-758.2859, 320.9569, 175.2784), 218.8, pet.dimension
        );
      }
      break;
  }
});
mp.events.add("buyPet", () => {
  if (new Date().getTime() - global.lastCheck < 50) return;
  global.lastCheck = new Date().getTime();

  global.menuClose();
  global.menu.execute("petshop.active=0");

  mp.events.callRemote("petshopBuy", pet.model);

  if (pet.entity == null) return;
  pet.entity.destroy();
  pet.entity = null;
});
mp.events.add("closePetshop", () => {
  if (new Date().getTime() - global.lastCheck < 50) return;
  global.lastCheck = new Date().getTime();
  global.menuClose();
  global.menu.execute("petshop.active=0");

  mp.events.callRemote("petshopCancel");

  if (pet.entity == null) return;
  pet.entity.destroy();
  pet.entity = null;
});
mp.events.add("openPetshop", (models, hashes, prices, dim) => {
  if (global.menuCheck()) return;

  petModels = JSON.parse(models);
  petHashes = JSON.parse(hashes);

  setPet("models", models);
  setPet("hashes", hashes);
  setPet("prices", prices);

  pet.entity = mp.peds.new(
    petHashes[0],
    new mp.Vector3(-758.2859, 320.9569, 175.2784),
    218.8,
    dim
  );
  pet.dimension = dim;
  localplayer.setRotation(0, 0, 0, 2, true);
  pet.model = petModels[0];

  global.menuOpen();
  global.menu.execute(`petshop.active=true`);

  cam = mp.cameras.new(
    "default",
    new mp.Vector3(-755.5227, 320.0132, 177.302),
    new mp.Vector3(0, 0, 0),
    50
  );
  cam.pointAtCoord(-758.2859, 320.9569, 175.7484);
  cam.setActive(true);
  mp.game.cam.renderScriptCams(true, false, 0, true, false);
});
//
//types: models, colors, prices
function setAuto(type, jsonstr) {
	if (inair)
		global.menu.execute(`air.${type}=${jsonstr}`);
	else
		global.menu.execute(`auto.${type}=${jsonstr}`);
}
// CAM //
global.camMenu = false;
//var camMenuCEF = mp.browsers.new("package://cef/cam.html");
var camMenuValues = { Angle: 0, Dist: 1, Height: 0 };

mp.events.add("camMenu", (status) => {
	try{
		global.camMenu = status;
		if (global.menu != undefined && global.menu != null)
			  {
			  if (global.camMenu) {
				//camMenuValues = { Angle: 0, Dist: 1, Height: 0 };
				global.menu.execute("show()");
			  } else {
				global.menu.execute("hide()");
			  }
		}
	}
	catch (e) {}
});
mp.events.add("camCB", (act, val) => {
  switch (act) {
    case "rotate":
      camMenuValues.Angle = val;
      break;
    case "height":
      camMenuValues.Height = val;
      break;
    case "depth":
      camMenuValues.Dist = val;
      break;
  }
  const camPos = getCameraOffset(
    new mp.Vector3(
      bodyCamStart.x,
      bodyCamStart.y,
      bodyCamStart.z + camMenuValues.Height
    ),
    localplayer.getRotation(2).z + 90 + camMenuValues.Angle,
    camMenuValues.Dist
  );

  bodyCam.setCoord(camPos.x, camPos.y, camPos.z);
  bodyCam.pointAtCoord(
    bodyCamStart.x,
    bodyCamStart.y,
    bodyCamStart.z + camMenuValues.Height
  );
});





// Clothes Shop //

var clothesCamValues = [
  { Angle: 0, Dist: 0.7, Height: 0.6 },
  { Angle: 0, Dist: 1.4, Height: 0.2 },
  { Angle: 0, Dist: 1.4, Height: 0.2 },
  { Angle: 0, Dist: 1.4, Height: -0.4 },
  { Angle: 0, Dist: 1.2, Height: -0.7 },
  { Angle: 0, Dist: 1, Height: -0.2 },
  { Angle: 74, Dist: 1, Height: 0 },
  { Angle: 0, Dist: 0.7, Height: 0.6 },
  { Angle: 0, Dist: 1, Height: 0.3 },
  { Angle: 0, Dist: 1.3, Height: 0.5 }, //отдоление для слота дополнительно в одежде
];
let clothes = {
  type: 0,
  style: 0,
  color: 0,
  colors: [0, 0, 0],
  price: 0,
};
mp.events.add("clothes", (act, value) => {
  const gender = localplayer.getVariable("GENDER") ? 1 : 0;

  switch (act) {
    case "style":
      //mp.gui.chat.push('clothes style' + value);

      switch (clothes.type) {
        case 0:
          var colors = clothesHats[gender][value].Colors;
          setClothes("colors", JSON.stringify(colors));

          clothes.style = clothesHats[gender][value].Variation;
          clothes.color = colors[0];
          clothes.colors = colors;

          localplayer.setPropIndex(0, clothes.style, clothes.color, true);
          return;
        case 1:
          var colors = clothesTops[gender][value].Colors;
          setClothes("colors", JSON.stringify(colors));

          clothes.style = clothesTops[gender][value].Variation;
          clothes.color = colors[0];
          clothes.colors = colors;

          localplayer.setComponentVariation(11,  clothes.style,  clothes.color, 0 );
          localplayer.setComponentVariation(3, validTorsos[gender][clothes.style],  0, 0  );
          return;
        case 2:
          var colors = clothesUnderwears[gender][value].Colors;
          setClothes("colors", JSON.stringify(colors));

          clothes.style = clothesUnderwears[gender][value].Top;
          clothes.color = colors[0];
          clothes.colors = colors;

          localplayer.setComponentVariation(
            11,
            clothes.style,
            clothes.color,
            0
          );
          localplayer.setComponentVariation(
            3,
            validTorsos[gender][clothes.style],
            0,
            0
          );
          return;
        case 3:
          var colors = clothesLegs[gender][value].Colors;
          setClothes("colors", JSON.stringify(colors));

          clothes.style = clothesLegs[gender][value].Variation;
          clothes.color = colors[0];
          clothes.colors = colors;

          localplayer.setComponentVariation(4, clothes.style, clothes.color, 0);
          return;
        case 4:
          var colors = clothesFeets[gender][value].Colors;
          setClothes("colors", JSON.stringify(colors));

          clothes.style = clothesFeets[gender][value].Variation;
          clothes.color = colors[0];
          clothes.colors = colors;

          localplayer.setComponentVariation(6, clothes.style, clothes.color, 0);
          return;
        case 5:
          var colors = clothesGloves[gender][value].Colors;
          setClothes("colors", JSON.stringify(colors));

          clothes.style = clothesGloves[gender][value].Variation;
          clothes.color = colors[0];
          clothes.colors = colors;

          localplayer.setComponentVariation(3, correctGloves[gender][clothes.style][15],clothes.color, 0 );
          return;
        case 6:
          var colors = clothesWatches[gender][value].Colors;
          setClothes("colors", JSON.stringify(colors));

          clothes.style = clothesWatches[gender][value].Variation;
          clothes.color = colors[0];
          clothes.colors = colors;

          localplayer.setPropIndex(6, clothes.style, clothes.color, true);
          return;
        case 7:
          var colors = clothesGlasses[gender][value].Colors;
          setClothes("colors", JSON.stringify(colors));

          clothes.style = clothesGlasses[gender][value].Variation;
          clothes.color = colors[0];
          clothes.colors = colors;

          localplayer.setPropIndex(1, clothes.style, clothes.color, true);
          return;
        case 8:
          var colors = clothesJewerly[gender][value].Colors;
          setClothes("colors", JSON.stringify(colors));

          clothes.style = clothesJewerly[gender][value].Variation;
          clothes.color = colors[0];
          clothes.colors = colors;

          localplayer.setComponentVariation(7, clothes.style, clothes.color, 0);
          return;
		 case 9:
          var colors = clothesBag[gender][value].Colors;
          setClothes("colors", JSON.stringify(colors));

          clothes.style = clothesBag[gender][value].Variation;
          clothes.color = colors[0];
          clothes.colors = colors;

          localplayer.setComponentVariation(5, clothes.style, clothes.color, 0);
          return;
		  
      }
      break;
    case "color":
      //mp.gui.chat.push('clothes color' + value);

      switch (clothes.type) {
        case 0:
          clothes.color = clothes.colors[value];
          localplayer.setPropIndex(0, clothes.style, clothes.color, true);
          return;
        case 1:
          clothes.color = clothes.colors[value];
          localplayer.setComponentVariation(
            11,
            clothes.style,
            clothes.color,
            0
          );
          return;
        case 2:
          clothes.color = clothes.colors[value];
          localplayer.setComponentVariation(
            11,
            clothes.style,
            clothes.color,
            0
          );
          return;
        case 3:
          clothes.color = clothes.colors[value];
          localplayer.setComponentVariation(4, clothes.style, clothes.color, 0);
          return;
        case 4:
          clothes.color = clothes.colors[value];
          localplayer.setComponentVariation(6, clothes.style, clothes.color, 0);
          return;
        case 5:
          clothes.color = clothes.colors[value];
          localplayer.setComponentVariation(
            3,
            correctGloves[gender][clothes.style][15],
            clothes.color,
            0
          );
          return;
        case 6:
          clothes.color = clothes.colors[value];
          localplayer.setPropIndex(6, clothes.style, clothes.color, true);
          return;
        case 7:
          clothes.color = clothes.colors[value];
          localplayer.setPropIndex(1, clothes.style, clothes.color, true);
          return;
        case 8:
          clothes.color = clothes.colors[value];
          localplayer.setComponentVariation(7, clothes.style, clothes.color, 0);
          return;
		 case 9:
          clothes.color = clothes.colors[value];
          localplayer.setComponentVariation(5, clothes.style, clothes.color, 0);
          return; 
      }
      break;
    case "cat": //category
      //some shit with 0-4 ids
      //clearClothes();

      var clothesArr = {};
      if (value == 0) clothesArr = clothesHats[gender];
      else if (value == 1) clothesArr = clothesTops[gender];
      else if (value == 2) clothesArr = clothesUnderwears[gender];
      else if (value == 3) clothesArr = clothesLegs[gender];
      else if (value == 4) clothesArr = clothesFeets[gender];
      else if (value == 5) clothesArr = clothesGloves[gender];
      else if (value == 6) clothesArr = clothesWatches[gender];
      else if (value == 7) clothesArr = clothesGlasses[gender];
      else if (value == 8) clothesArr = clothesJewerly[gender];
	  else if (value == 9) clothesArr = clothesBag[gender];
	  else if (value == 10) clothesArr = clothesTopsNew[gender];

      var styles = [];
      var prices = [];
      var values = [];
      var colors = clothesArr[0].Colors;

      clothesArr.forEach((item) => {
        let tempPrice = (item.Price / 100) * clothes.price;
        prices.push(tempPrice.toFixed());
        values.push(item.Value)
        if (value == 2) styles.push(item.Top);
        else styles.push(item.Variation);
      });

      setClothes("styles", JSON.stringify(styles));
      setClothes("colors", JSON.stringify(colors));
      setClothes("prices", JSON.stringify(prices));
      setClothes("value", JSON.stringify(values));
      clothes.type = value;
      clothes.style = styles[0];
      clothes.color = colors[0];
      clothes.colors = colors;

      if (value == 0) {
        localplayer.setPropIndex(0, clothes.style, clothes.color, true);
      } else if (value == 1 || value == 2) {
        localplayer.setComponentVariation(11, clothes.style, clothes.color, 0);
        localplayer.setComponentVariation(3, validTorsos[gender][clothes.style], 0,  0 );
      } else if (value == 3) {
        localplayer.setComponentVariation(4, clothes.style, clothes.color, 0);
      } else if (value == 4) {
        localplayer.setComponentVariation(6, clothes.style, clothes.color, 0);
      } else if (value == 5) {
        localplayer.setComponentVariation(3, correctGloves[gender][clothes.style][15], clothes.color, 0  );
      } else if (value == 6) {
        localplayer.setPropIndex(6, clothes.style, clothes.color, true);
      } else if (value == 7) {
        localplayer.setPropIndex(1, clothes.style, clothes.color, true);
      } else if (value == 8) {
        localplayer.setComponentVariation(7, clothes.style, clothes.color, 0);
      } else if (value == 9) {
        localplayer.setComponentVariation(5, clothes.style, clothes.color, 0);
      }

      const camValues = clothesCamValues[value];
      const camPos = getCameraOffset(
        new mp.Vector3(
          bodyCamStart.x,
          bodyCamStart.y,
          bodyCamStart.z + camValues.Height
        ),
        localplayer.getRotation(2).z + 90 + camValues.Angle,
        camValues.Dist
      );

      bodyCam.setCoord(camPos.x, camPos.y, camPos.z);
      bodyCam.pointAtCoord(
        bodyCamStart.x,
        bodyCamStart.y,
        bodyCamStart.z + camValues.Height
      );
      break;
  }
});
mp.events.add("buyClothes", (indexvalue) => {
  if (new Date().getTime() - global.lastCheck < 50) return;
  global.lastCheck = new Date().getTime();
  mp.events.callRemote(
    "buyClothes",
    clothes.type,
    clothes.style,
    clothes.color,
    indexvalue
  );
});
mp.events.add("closeClothes", () => {
  if (new Date().getTime() - global.lastCheck < 50) return;
  global.lastCheck = new Date().getTime();
  global.menuClose();
  global.menu.execute("clothes.active=0");

  mp.events.call("camMenu", false);

  bodyCam.destroy();
  mp.game.cam.renderScriptCams(false, false, 500, true, false);
  
  vehheading.stop();

  mp.events.callRemote("cancelClothes");
});
mp.events.add("openClothes", (price) => {
  if (global.menuCheck()) return;

  bodyCamStart = localplayer.position;
  var camValues = {
    Angle: localplayer.getRotation(2).z + 90,
    Dist: 1.3,
    Height: 0.3,
  };
  var pos = getCameraOffset(
    new mp.Vector3(
      bodyCamStart.x,
      bodyCamStart.y,
      bodyCamStart.z + camValues.Height
    ),
    camValues.Angle,
    camValues.Dist
  );
  bodyCam = mp.cameras.new("default", pos, new mp.Vector3(0, 0, 0), 50);
  bodyCam.pointAtCoord(
    bodyCamStart.x,
    bodyCamStart.y,
    bodyCamStart.z + camValues.Height
  );
  bodyCam.setActive(true);
  mp.game.cam.renderScriptCams(true, false, 500, true, false);

  const gender = localplayer.getVariable("GENDER") ? 1 : 0;

  var styles = [];
  var prices = [];
  var colors = clothesHats[gender][0].Colors;

  clothesHats[gender].forEach((hat) => {
    let tempPrice = (hat.Price / 100) * price;
    prices.push(tempPrice.toFixed());

    styles.push(hat.Variation);
  });

  setClothes("styles", JSON.stringify(styles));
  setClothes("colors", JSON.stringify(colors));
  setClothes("prices", JSON.stringify(prices));

  clothes = {
    type: 0,
    style: styles[0],
    color: colors[0],
    colors: colors,
    price: price,
  };

  clearClothes();

  global.menuOpen();
  global.menu.execute(`clothes.active=true`);
  

  mp.events.call("camMenu", true);
  
  vehheading.startveh(mp.players.local);
});

function clearClothes() {
  const gender = localplayer.getVariable("GENDER") ? 1 : 0;

  localplayer.clearProp(0);
  localplayer.clearProp(1);
  localplayer.clearProp(2);
  localplayer.clearProp(6);
  localplayer.clearProp(7);

  localplayer.setComponentVariation(1, clothesEmpty[gender][1], 0, 0);
  localplayer.setComponentVariation(3, clothesEmpty[gender][3], 0, 0);
  localplayer.setComponentVariation(4, clothesEmpty[gender][4], 0, 0);
  localplayer.setComponentVariation(5, clothesEmpty[gender][5], 0, 0);
  localplayer.setComponentVariation(6, clothesEmpty[gender][6], 0, 0);
  localplayer.setComponentVariation(7, clothesEmpty[gender][7], 0, 0);
  localplayer.setComponentVariation(8, clothesEmpty[gender][8], 0, 0);
  localplayer.setComponentVariation(9, clothesEmpty[gender][9], 0, 0);
  localplayer.setComponentVariation(10, clothesEmpty[gender][10], 0, 0);
  localplayer.setComponentVariation(11, clothesEmpty[gender][11], 0, 0);
}
//types: styles, colors, prices
function setClothes(type, jsonstr) {
  global.menu.execute(`clothes.${type}=${jsonstr}`);
  if (type == "colors") global.menu.execute(`clothes.indexC=0`);
  else if (type == "styles") global.menu.execute(`clothes.indexS=0`);
}

mp.events.add("closeMasks", () => {
  if (new Date().getTime() - global.lastCheck < 50) return;
  global.lastCheck = new Date().getTime();
  global.menuClose();
  global.menu.execute("masks.active=0");

  mp.events.call("camMenu", false);

  bodyCam.destroy();
  mp.game.cam.renderScriptCams(false, false, 500, true, false);

  mp.events.callRemote("cancelMasks");
});
mp.events.add("masks", (act, value) => {
  switch (act) {
    case "style":
      var colors = clothesMasks[value].Colors;
      setMaskCEF("colors", JSON.stringify(colors));

      clothes.style = clothesMasks[value].Variation;
      clothes.color = colors[0];
      clothes.colors = colors;

      localplayer.setComponentVariation(1, clothes.style, clothes.color, 0);
      return;
    case "color":
      clothes.color = clothes.colors[value];
      localplayer.setComponentVariation(1, clothes.style, clothes.color, 0);
      return;
  }
});
mp.events.add("buyMasks", () => {
  if (new Date().getTime() - global.lastCheck < 50) return;
  global.lastCheck = new Date().getTime();
  mp.events.callRemote("buyMasks", clothes.style, clothes.color);
});
mp.events.add("openMasks", (price) => {
  if (global.menuCheck()) return;

  bodyCamStart = localplayer.position;
  var camValues = {
    Angle: localplayer.getRotation(2).z + 90,
    Dist: 0.7,
    Height: 0.6,
  };
  var pos = getCameraOffset(
    new mp.Vector3(
      bodyCamStart.x,
      bodyCamStart.y,
      bodyCamStart.z + camValues.Height
    ),
    camValues.Angle,
    camValues.Dist
  );
  bodyCam = mp.cameras.new("default", pos, new mp.Vector3(0, 0, 0), 50);
  bodyCam.pointAtCoord(
    bodyCamStart.x,
    bodyCamStart.y,
    bodyCamStart.z + camValues.Height
  );
  bodyCam.setActive(true);
  mp.game.cam.renderScriptCams(true, false, 500, true, false);

  var styles = [];
  var prices = [];
  var colors = clothesMasks[0].Colors;

  clothesMasks.forEach((mask) => {
    let tempPrice = (mask.Price / 100) * price;
    prices.push(tempPrice.toFixed());

    styles.push(mask.Variation);
  });

  setMaskCEF("styles", JSON.stringify(styles));
  setMaskCEF("colors", JSON.stringify(colors));
  setMaskCEF("prices", JSON.stringify(prices));

  clothes = {
    type: 0,
    style: styles[0],
    color: colors[0],
    colors: colors,
    price: price,
  };

  localplayer.setComponentVariation(1, styles[0], colors[0], 0);

  global.menuOpen();
  global.menu.execute(`masks.active=true`);

  mp.events.call("camMenu", true);

  localplayer.clearProp(0);
  localplayer.clearProp(1);
});

function setMaskCEF(type, jsonstr) {
  global.menu.execute(`masks.${type}=${jsonstr}`);
  if (type == "colors") global.menu.execute(`masks.indexC=0`);
  else if (type == "styles") global.menu.execute(`masks.indexS=0`);
}
// INFOBOX //
mp.events.add("ib-exit", () => {
  global.menuClose();
});
mp.events.add("ib-open", (head, id) => {
  if (global.menuCheck()) return;
  global.menuOpen();

  menu.execute(`infobox.set('${head}',${id})`);
});
// Button events
mp.events.add("colors", (btn) => {
  switch (btn) {
    case "apply":
      break;
    case "cancel":
      break;
  }
});
// Selected color event
mp.events.add("scolor", (c) => {
  c = JSON.parse(c);
  mp.events.call("tunColor", c);
});

// Advert menu
var adverts = null;
var advertsloaded = false;
var advertsactive = false;

mp.events.add("enableadvert", (toggle) => {
  try {
    if (toggle) adverts = mp.browsers.new("package://cef/adverts.html");
    advertsloaded = toggle;
  } catch (e) {}
});

mp.events.add("addadvert", (id_, author_, quest_) => {
  try {
    if (adverts != null)
      adverts.execute(`addAdvert(${id_},'${author_}','${quest_}', false, '')`);
    mp.events.call("notify", 0, 2, "Пришло новое объявление!", 3000);
  } catch (e) {}
});
mp.events.add("setadvert", (id, name) => {
  try {
    if (adverts != null) adverts.execute(`setStatus(${id}, '${name}')`);
  } catch (e) {}
});
mp.events.add("deladvert", (id) => {
  try {
    if (adverts != null) adverts.execute(`deleteAdvert(${id})`);
  } catch (e) {}
});
mp.events.add("takeadvert", (id, r) => {
  if (new Date().getTime() - global.lastCheck < 50) return;
  global.lastCheck = new Date().getTime();
  mp.events.callRemote("takeadvert", id, r);
});
mp.events.add("sendadvert", (id, a) => {
  if (new Date().getTime() - global.lastCheck < 50) return;
  global.lastCheck = new Date().getTime();
  mp.events.callRemote("sendadvert", id, a);
});
mp.events.add("exitadvert", () => {
  global.menuClose();
  advertsactive = false;
  mp.gui.cursor.visible = false;
});
mp.keys.bind(Keys.VK_M, false, function() {
  // F2 key advert menu
  if (
    !loggedin ||
    chatActive ||
    editing ||
    !advertsloaded ||
    new Date().getTime() - global.lastCheck < 1000
  )
    return;
  global.lastCheck = new Date().getTime();
  if (!global.menuOpened) {
    global.menuOpen();
    mp.gui.cursor.visible = true;
    if (!advertsactive) adverts.execute(`app.playerName='${localplayer.name}'`);
    advertsactive = true;
    if (adverts != null) adverts.execute("app.active=true;");
  } else {
    if (adverts != null) adverts.execute("app.active=false;");
    global.menuClose();
    advertsactive = false;
    mp.gui.cursor.visible = false;
  }
});



// Roulete //
var roulete = null;

mp.events.add("rouletecfg", function(a, b, c) {
  if (roulete != null) {
    if (a == 0) roulete.execute(`startrotate(` + b + `);`);
    else if (a == 1) {
      if (b == 0) roulete.execute(`buttonstate(0,2);`);
    } else if (a == 2) roulete.execute(`timercfg(` + b + `,` + c + `);`);
    else if (a == 3) roulete.execute(`updatebank(` + b + `);`);
    else if (a == 4) roulete.execute(`wonmoney(` + b + `,` + c + `);`);
    else if (a == 5) {
      if (roulete != null) {
        roulete.destroy();
        roulete = null;
        mp.events.callRemote("End", 0);
        global.menuClose();
        mp.gui.cursor.visible = false;
        mp.game.cam.renderScriptCams(false, true, 500, true, true);
      }
    }
  }
});

mp.events.add("placedbet", function(a, b, c) {
  if (new Date().getTime() - global.lastCheck < 100) return;
  global.lastCheck = new Date().getTime();
  if (roulete != null) {
    mp.events.callRemote("PlacedBet", a, b, c);
  }
});





}