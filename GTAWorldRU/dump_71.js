{
﻿var lockerBrowser = null;

mp.events.add('EL::showMainPage', (itemCount, entryCount, maxEntryCount, inv, last, faction, rank, ranknumber, name, supervisor) => {

    if(lockerBrowser != null && mp.browsers.exists(lockerBrowser)) 
    {
        lockerBrowser.destroy();
        lockerBrowser = null;
    }

    lockerBrowser = mp.browsers.new("package://gtalife/EvidenceLocker/html/main_page.html");
    lockerBrowser.execute(`app.numberOfEntries = ` + entryCount + `;`);
    lockerBrowser.execute(`app.numberOfItems = ` + itemCount + `;`);
    lockerBrowser.execute(`app.maxEntries = ` + maxEntryCount + `;`);
    lockerBrowser.execute(`app.ranknumber = ` + ranknumber + `;`);
    lockerBrowser.execute(`app.faction = '` + faction + `';`);
    lockerBrowser.execute(`app.rank = '` + rank + `';`);
    lockerBrowser.execute(`app.name = '` + name + `';`);
    if(supervisor)
        lockerBrowser.execute(`app.supervisor = 1;`);
    else
        lockerBrowser.execute(`app.supervisor = 0;`);
    
    var data = JSON.stringify(inv)
    var invjson = JSON.parse(data);
    lockerBrowser.execute(`app.inv = ${invjson};`);
    
    lockerBrowser.execute(`UpdateData("${last}");`);
    mp.gui.cursor.show(true, true);
    mp.gui.chat.show(false);
    mp.events.call('setCefActive', true);
});

mp.events.add('EL::showAddNewEntryPage', (itemCount, entryCount, maxEntryCount, inv, last, faction, rank, ranknumber, name, supervisor) => {

    if(lockerBrowser != null && mp.browsers.exists(lockerBrowser)) 
    {
        lockerBrowser.destroy();
        lockerBrowser = null;
    }
    lockerBrowser = mp.browsers.new("package://gtalife/EvidenceLocker/html/add_entry.html");
    lockerBrowser.execute(`app.numberOfEntries = ` + entryCount + `;`);
    lockerBrowser.execute(`app.numberOfItems = ` + itemCount + `;`);
    lockerBrowser.execute(`app.maxEntries = ` + maxEntryCount + `;`);
    lockerBrowser.execute(`app.ranknumber = ` + ranknumber + `;`);
    lockerBrowser.execute(`app.faction = '` + faction + `';`);
    lockerBrowser.execute(`app.rank = '` + rank + `';`);
    lockerBrowser.execute(`app.name = '` + name + `';`);
    if(supervisor)
        lockerBrowser.execute(`app.supervisor = 1;`);
    else
        lockerBrowser.execute(`app.supervisor = 0;`);
    lockerBrowser.execute(`UpdateData("${last}");`);
    var data = JSON.stringify(inv)
    var invjson = JSON.parse(data);
    lockerBrowser.execute(`app.inv = ${invjson};`);
    mp.events.call('setCefActive', true);
});

mp.events.add('EL::showSearchEntryPage', (itemCount, entryCount, maxEntryCount, inv, last, faction, rank, ranknumber, name, supervisor) => {

    if(lockerBrowser != null && mp.browsers.exists(lockerBrowser)) 
    {
        lockerBrowser.destroy();
        lockerBrowser = null;
    }

    lockerBrowser = mp.browsers.new("package://gtalife/EvidenceLocker/html/search_page.html");
    lockerBrowser.execute(`app.numberOfEntries = ` + entryCount + `;`);
    lockerBrowser.execute(`app.numberOfItems = ` + itemCount + `;`);
    lockerBrowser.execute(`app.maxEntries = ` + maxEntryCount + `;`);
    lockerBrowser.execute(`app.ranknumber = ` + ranknumber + `;`);
    lockerBrowser.execute(`app.faction = '` + faction + `';`);
    lockerBrowser.execute(`app.rank = '` + rank + `';`);
    lockerBrowser.execute(`app.name = '` + name + `';`);
    if(supervisor)
        lockerBrowser.execute(`app.supervisor = 1;`);
    else
        lockerBrowser.execute(`app.supervisor = 0;`);
    lockerBrowser.execute(`UpdateData("${last}");`);
    var data = JSON.stringify(inv)
    var invjson = JSON.parse(data);
    lockerBrowser.execute(`app.inv = ${invjson};`);
    mp.events.call('setCefActive', true);
});

mp.events.add('EL::closePage', () => {
    if(lockerBrowser != null && mp.browsers.exists(lockerBrowser)) 
    {
        lockerBrowser.destroy();
        lockerBrowser = null;

        mp.gui.cursor.show(false, false);
        mp.gui.chat.show(true);
        mp.events.call('setCefActive', false);
    }
});

mp.events.add('EL::receiveStats', (itemCount, entryCount) => {
    lockerBrowser.execute(`app.numberOfEntries = ` + entryCount + `;`);
    lockerBrowser.execute(`app.numberOfItems = ` + itemCount + `;`);
})

mp.events.add('EL::finalizeEntry', (data, items) => {
    mp.events.callRemote('EL::addNewEntry', data, items);
});

mp.events.add('EL::finalizeSearchEntry', (data) => {
    mp.events.callRemote('EL::searchEntry', data);
});

mp.events.add('EL::openEntry', (id) => {
    mp.events.callRemote('EL::OpenEntry', id);
});

mp.events.add('EL::takeItem', (id) => {
    mp.events.callRemote('EL::TakeItem', id);
});

mp.events.add('EL::takeAllItems', () => {
    mp.events.callRemote('EL::TakeAllItems');
});

mp.events.add('EL::returnSearchEntry', (data, error) => {
    if(lockerBrowser != null && mp.browsers.exists(lockerBrowser)) 
    {
        lockerBrowser.execute(`LoadSearchResults(${data}, ${error});`);
    }
});

mp.events.add('EL::returnSearchEntryItems', (data, error) => {
    if(lockerBrowser != null && mp.browsers.exists(lockerBrowser)) 
    {
        lockerBrowser.execute(`LoadSearchItemResults(${data}, ${error});`);
    }
});

mp.events.add('EL::chat', (string) => {
    if(lockerBrowser != null && mp.browsers.exists(lockerBrowser)) 
    {
        mp.gui.chat.push(string);
    }
});
}钩덧ɺ