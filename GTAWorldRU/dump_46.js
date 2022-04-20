{
﻿var currentMenu = null;

mp.events.add('CreateGenericMenu', (id, title, subtitle) => {
    currentMenu = mp.browsers.new("package://gtalife/cefmenu/cefmenu.html");
    mp.gui.cursor.show(true, true);

    currentMenu.execute(`setID('` + id + `')`)
    currentMenu.execute(`setTitle('` + title + `')`);
    currentMenu.execute(`setSubtitle('` + subtitle + `')`);
});

mp.events.add('GenericMenu_AddItem', (itemData) => {
    currentMenu.execute(`addItem('` + itemData + `');`);
});
}唃Ⱦ