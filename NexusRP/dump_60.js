{
let familyCreationMenu;
var familyCreationMenuWindow = null;
var familyCreationMenuOpened = false;


mp.events.add('openFamilyCreationMenu', (data) => {
    if (familyCreationMenu == null) {
        familyCreationMenu = mp.browsers.new('http://package/systems/families/creation/FRONT/familyCreationMenu.html');
        familyCreationMenu.name = 'nexusbrowser';
    }
    var jsonFamilyCreation = JSON.parse(data);
    familyCreationMenu.execute(`familyCreationMenu.locale ='${global.Language}'`);
    familyCreationMenu.execute(`familyCreationMenu.setNationList(${JSON.stringify(jsonFamilyCreation['Nations'])})`);
    familyCreationMenu.execute(`familyCreationMenu.setMinimalLVL(${jsonFamilyCreation['MinimumLVL']})`);
    familyCreationMenu.execute(`familyCreationMenu.setCreationPrice(${jsonFamilyCreation['CreationPrice']})`);
    familyCreationMenu.execute(`familyCreationMenu.setFamilyList(${JSON.stringify(jsonFamilyCreation['Families'])})`);
    familyCreationMenu.execute("familyCreationMenu.showFamilyCreationMenu();");
	global.menuOpen();
});

mp.events.add('createFamily', (jsonFamily) => {
    familyCreationMenu.execute('familyCreationMenu.hide();');
    var Family=JSON.parse(jsonFamily);
    NexusEvent.callRemote('createNewFamily',Family['name'],Family['description'],Family['nation']);
	global.menuClose();
});

mp.events.add('closeFamilyCreationMenu', () => {
    global.menuClose();
    familyCreationMenu.destroy();
	familyCreationMenu = null;
});


}