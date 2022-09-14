{
﻿var indexList = null;
var isMenuOpen = false;
var first = true;
var lastUpdateTickCount = 0;
var changedTick = 0;
var positive;
var boosted = false;
var objectList = null;
var itemPerPage = 9;
var currentMenu = null
var menu = null;
var currentPage = 1;
var currentID = null;
var pageShowed = null;
var resolution = mp.game.graphics.getScreenResolution(0, 0);
var posX = 1920 * 0.7;
var posY = 1080 * 0.3;

const NativeUI = require("gtalife/nativeui");
const Menu = NativeUI.Menu;
const UIMenuItem = NativeUI.UIMenuItem;
const UIMenuListItem = NativeUI.UIMenuListItem;
const UIMenuCheckboxItem = NativeUI.UIMenuCheckboxItem;
const BadgeStyle = NativeUI.BadgeStyle;
const Point = NativeUI.Point;
const ItemsCollection = NativeUI.ItemsCollection;
const Color = NativeUI.Color;


function listChangeEventItem(item, index) {
    var i = 0;
    if (currentMenu == undefined)
        return;
    if (item.Text === "Page") {
        var saveItem = item;
        currentMenu.Clear();// TODO
        currentMenu.AddItem(saveItem);
        menuAtPage(item.Index + 1, currentMenu);
        currentMenu.RefreshIndex();
        return;
    }

    for (var j = 0; j < objectList.length; j++) {
        if (item.Text.endsWith(objectList[j].Name)) {
            i = j;
        }
    }

    var currentTimeInMilliseconds = new Date().getTime();
    if (currentTimeInMilliseconds - lastUpdateTickCount < 500) {
        if (indexList[i] !== item.Index) {
            changedTick = changedTick + 1;
            boosted = false;
            lastUpdateTickCount = currentTimeInMilliseconds;
        }
        var old_positive = positive;
        if (indexList[i] < item.Index) {
            positive = (item.Index !== objectList[i].MaxList);
        } else if (indexList[i] > item.Index) {
            positive = (item.Index === objectList[i].MinList);
        }
        if (old_positive !== positive)
            changedTick = 0;
    } else {
        lastUpdateTickCount = currentTimeInMilliseconds;
        changedTick = 0;
    }

    if (changedTick > 5) {
        var amount = 1;
        if (changedTick > 10)
            amount = 2;
        else if (changedTick > 15)
            amount = 3;
        else if (changedTick > 20)
            amount = 4;
        if (boosted === false) {
            boosted = true;
            if (positive) {
                if (item.Index !== objectList[i].MaxList && item.Index !== objectList[i].MinList) {
                    if (item.Index + amount < objectList[i].MaxList)
                        item.Index = item.Index + amount;
                }
            } else {
                if (item.Index !== objectList[i].MinList && item.Index !== objectList[i].MaxList) {
                    if (item.Index - amount > objectList[i].MinList)
                        item.Index = item.Index - amount;
                }
            }
        }
    }

    indexList[i] = item.Index;
    if (objectList[i].Type === 6 || objectList[i].Type === 3) {
        mp.events.callRemote('menu_handler_listchanged_item_generic', currentID, i, objectList[i].Name, objectList[i].List[item.Index]);
    }
}

setInterval(() => {
    if (currentMenu == undefined)
        return;
    if (currentMenu !== null && currentMenu.Visible === true) {
        var incr = pageShowed ? 1 : 0;
        if (mp.keys.isDown(97) === true) {
            currentMenu.CurrentSelection = 0 + incr;
        } else if (mp.keys.isDown(98) === true) {
            currentMenu.CurrentSelection = 1 + incr;
        } else if (mp.keys.isDown(98) === true) {
            currentMenu.CurrentSelection = 2 + incr;
        } else if (mp.keys.isDown(99) === true) {
            currentMenu.CurrentSelection = 3 + incr;
        } else if (mp.keys.isDown(100) === true) {
            currentMenu.CurrentSelection = 4 + incr;
        } else if (mp.keys.isDown(101) === true) {
            currentMenu.CurrentSelection = 5 + incr;
        } else if (mp.keys.isDown(102) === true) {
            currentMenu.CurrentSelection = 6 + incr;
        } else if (mp.keys.isDown(103) === true) {
            currentMenu.CurrentSelection = 7 + incr;
        } else if (mp.keys.isDown(104) === true) {
            currentMenu.CurrentSelection = 8 + incr;
        }
    }
}, 500);

function menuAtPage(page, menu) {
    currentPage = page;
    var counter = (page - 1) * itemPerPage;
    for (var j = 0; j + counter < objectList.length && j < itemPerPage; j++) {
        var i = j + counter;
        var listItem = null;
        var obj = objectList[i];
        if (obj.Type === undefined) return;
        switch (obj.Type) {
            case 1:
                if (obj.BackgroundColor !== null && obj.FrontColor !== null)
                    listItem = new UIMenuItem((j + 1) + " - " + obj.Name, obj.Description !== null ? obj.Description : "",
                        obj.BackgroundColor, obj.FrontColor);
                else
                    listItem = new UIMenuItem("~r~" + (j + 1) + "~s~ - " + obj.Name, obj.Description !== null ? obj.Description : "");
                if (obj.RightLabel !== null && obj.RightLabel !== undefined)
                    listItem.SetRightLabel(obj.RightLabel);
                break;
            case 6:
            case 2:
                indexList[i] = 0;
                obj.List = convertValueToList(obj.MinList, obj.MaxList);
                listItem = new UIMenuListItem("~r~" + (j + 1) + "~s~ - " + obj.Name, obj.Description !== null ? obj.Description : obj.MinList + " - " + obj.MaxList, new ItemsCollection(obj.List), obj.StartIndex);
                if (obj.StartItem != undefined && obj.StartItem >= obj.MinList && obj.StartItem <= obj.MaxList)
                    listItem.Index = obj.StartItem - obj.MinList;
                break;
            case 3:
                indexList[i] = 0;
                var list = [];
                for (var i = 0; obj.StringList[i] !== undefined; i++) {
                    list.push(obj.StringList[i]);
                }
                obj.List = list;
                listItem = new UIMenuListItem("~r~" + (j + 1) + "~s~ - " + obj.Name, obj.Description !== null ? obj.Description : " - ", new ItemsCollection(obj.List), obj.StartIndex);
                break;
            case 4:
                break;
            case 5:
                listItem = new UIMenuCheckboxItem("~r~" + (j + 1) + "~s~ - " + obj.Name, obj.IsTicked, obj.Description !== null ? obj.Description : "");
                break;
        }
        if (obj.Badge !== null && obj.Badge !== undefined)
            listItem.SetLeftBadge(BadgeStyle.Lock);
        menu.AddItem(listItem);
    }
}


function convertValueToList(valueMin, valueMax) {
    var list = [];
    if (valueMin > valueMax)
        return list;
    for (var i = valueMin; i <= valueMax; i++) {
        list.push(i.toString());
    }
    return list;
}

function convertValueToNegativeList(value) {
    var list = [];
    if (value <= 0)
        list.push("0");
    for (var i = -value + 1; i < value; i++) {
        list.push(i.toString());
    }
    return list;
}

mp.events.add(
    {
        "triggerevent": (cNative) => {
            var tmp;
            for (var i = 0; i < cNative.Count - 1; i++) {
                tmp[i] = cNative[i + 1];
            }
            mp.game.invoke(cNative, tmp);
        },

        /*
	"menu_handler_close_menu" : () => {
        isMenuOpen = false;
        if (currentMenu !== undefined && currentMenu !== null)
        {
			currentMenu.Visible = false;
			currentMenu.Close();
		}
        currentID = "";
	},
    */

        "menu_handler_input_text": (dText, dLen) => {
            var defaultText = dText;
            var len = dLen;
            //var str = API.getUserInput(defaultText, len); TODO
            mp.gui.chat.push("~b~Use /input with the text to write to confirm your choice.");
            mp.events.callRemote('menu_handler_input_text', "");
        },

        "menu_handler_create_menu_generic": (cName, cBanner, cSubtitle, cExit, cJson, cSource, cSource1) => {
            var tmpIndex = 0;
            objectList = JSON.parse(cJson);

            //mp.gui.chat.push(`ID: ${currentID}, cname: ${cName}`);
            if (currentID === cName) {
                if (objectList.length > ((currentPage - 1) * itemPerPage + currentMenu.CurrentSelection))
                    tmpIndex = currentMenu.CurrentSelection;
                else {
                    currentPage = Math.ceil((objectList.length) / itemPerPage);
                    tmpIndex = ((objectList.length - 1) % itemPerPage) + 1;
                }
            } else {
                currentPage = 1;
            }

            if (currentMenu != undefined)
                currentMenu.Visible = false;

            indexList = [];
            currentID = cName;
            var banner = cBanner;
            var subtitle = cSubtitle;
            var noExit = cExit;
            /*
            itemsName = args[4];
            itemsDesc = args.Count > 5 ? args[5] : [];
            var typeList = args[6];
            minList = args[7];
            maxList = args[8];
            */
            menu = null;
            //var menu = null;
            //if (banner === null)
            menu = new Menu(banner, subtitle, new Point(posX, posY));
            /*menu = API.createMenu(subtitle, 0, 0, 6);
        else
            menu = API.createMenu(banner, subtitle, 0, 0, 6);*/
            currentMenu = menu;
            if (noExit) {
                menu.ResetKey(menuControl.Back);
            }
            pageShowed = objectList.length > itemPerPage;
            // Add a page indicator
            var added = 0;
            if (pageShowed) {
                var pageItem = new UIMenuListItem(cSource, cSource1, new ItemsCollection(convertValueToList(1, Math.ceil(objectList.length / itemPerPage))), 0);
                pageItem.Index = currentPage - 1;
                menu.AddItem(pageItem);
            }
            if (menu == undefined)
                return;
            menuAtPage(currentPage, menu);

            //menu.RefreshIndex();
            menu.CurrentSelection = tmpIndex;
            menu.ItemSelect.on(function (item, selectedIndex) {
                var index = pageShowed ? selectedIndex - 1 + ((currentPage - 1) * itemPerPage) : selectedIndex;
                if (index >= 0) {
                    if (objectList[index] !== undefined && objectList[index] !== null) {
                        if (objectList[index].Type === 1) {
                            isMenuOpen = false;
                            menu.Visible = false;
                            var valueList = [];
                            for (var i = 0; i < indexList.length; i++) {
                                if (indexList[i] !== undefined) {
                                    var loopIndex = indexList[i];
                                    valueList[i] = objectList[i].List[loopIndex];
                                }
                            }
                            mp.events.callRemote('menu_handler_select_item_generic', currentID, index, objectList[index].Name, JSON.stringify(valueList));
                            //currentMenu = null;
                        } else if (objectList[index].Type === 2) {
                            /*var str = API.getUserInput("", 10);
                            var tmpInd = objectList[index].List.IndexOf(str);
                            if (tmpInd > -1) {
                                item.Index = tmpInd;
                                indexList[index] = tmpInd;
                            }*/ //TODO
                        }
                    }
                }
            });
            menu.MenuClose.on(function (item, index) {
                mp.events.callRemote("menu_handler_on_close");
                //currentMenu = null;
                //currentPage = 1;
                isMenuOpen = false;
                if (currentID === "dealership_menu_preview") {
                    mp.events.callRemote("delete_dealership_car");
                }
            });

            menu.ListChange.on(listChangeEventItem);

            menu.CheckboxChange.on(function (menu, item, checked) {
                var tmpInd = 0;
                if (item == null || item === undefined)
                    return;
                for (var i = 0; i < objectList.length; i++)
                    if (item.Text.endsWith(objectList[i].Name))
                        tmpInd = i;
                mp.events.callRemote("menu_handler_checked_item_generic", currentID, tmpInd, objectList[tmpInd].Name, JSON.stringify(indexList), checked);
            });
            menu.Visible = true;
            isMenuOpen = true;
            menu.Open();
        },

        "menu_handler_create_menu": (cID, cBanner, cSubtitle, cExit, cItems, cDesc) => {
            var callbackId = cID;
            var banner = cBanner;
            var subtitle = cSubtitle;
            var noExit = cExit;
            menu = null;
            //if (banner == null)
            menu = new Menu(banner, subtitle, new Point(posX, posY));
            //currentMenu = menu;
            //else menu = new Menu(banner, subtitle, new Point(50, 50));
            var items = cItems.split(';');
            var itemsDesc = cDesc;
            for (var i = 0; i < items.length; i++) {
                if (items[i].length <= 1)
                    continue;
                var listItem = new UIMenuItem(items[i], "");
                menu.AddItem(listItem);
            }

            //menu.RefreshIndex();
            if (menu == undefined)
                return;

            menu.ItemSelect.on(function (item, selectedIndex) {
                isMenuOpen = false;
                mp.events.callRemote("menu_handler_select_item", callbackId, selectedIndex, items[selectedIndex]);
                menu.Visible = false;
            });

            menu.MenuClose.on(function (item, index) {
                isMenuOpen = false;
                if (callbackId === "dealership_menu_preview") {
                    mp.events.callRemote('delete_dealership_car');
                }
            });
            menu.Visible = true;
            menu.Open();
            isMenuOpen = true;
        },

        "menu_handler_close_menu": (dText, dLen) => {
            isMenuOpen = false;
            if (menu !== null && menu !== undefined) {
                menu.Visible = false;
                menu.Close();
                menu = null;
            }
            currentID = "";
        },

        "update_menu_position": (x, y) => {
            posX = resolution.x * x;
            posY = resolution.y * y;
        }
    });
var res = false;
mp.events.add('render', () => {
    if (!res) {
        resolution = mp.game.graphics.getScreenResolution(0, 0);
        if (resolution.x < 1920) {
            posX = resolution.x * 0.75;
            posY = resolution.y * 0.3;
        }
        res = true;
    }
});
}