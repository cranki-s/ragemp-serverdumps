{
﻿var currentPlayerAlert = null;

mp.events.add('CEFNotification_ShowForPlayer', (header, content, type, style) => {
    if(currentPlayerAlert != null && mp.browsers.exists(currentPlayerAlert))
    {
        currentPlayerAlert.destroy();
    }

    currentPlayerAlert = mp.browsers.new("package://gtalife/genericcef/CEFNotification.html");

    currentPlayerAlert.execute(`setupAlert('${header}', '${content}', ${type}, '${style}')`);
});

mp.events.add('CEFNotification_Elapsed', () => {
    if(currentPlayerAlert != null && mp.browsers.exists(currentPlayerAlert))
    {
        currentPlayerAlert.destroy();
    }
});
}Ⱦ