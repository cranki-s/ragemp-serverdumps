{
var characterSelectorCEF = null;

mp.events.add({
    'CharacterSelector::showCharacterSelector': (CharacterData = null) => {
        if (characterSelectorCEF != null && mp.browsers.exists(characterSelectorCEF)) return;
        
        characterSelectorCEF = mp.browsers.new("http://package/gtalife/CharacterSelection/index.html");
        if(CharacterData != null) characterSelectorCEF.execute(`Initialize(${CharacterData});`);
        mp.gui.cursor.show(true, true);
        mp.gui.chat.show(true);
    },
    'CharacterSelector::hideCharacterSelector': () => {
        if (characterSelectorCEF == null && !mp.browsers.exists(characterSelectorCEF)) return;

        characterSelectorCEF.destroy();
        characterSelectorCEF = null;
        mp.gui.cursor.show(false, false);
    },
    'CharacterSelector::spawnCharacter': () => {
        if (characterSelectorCEF == null && !mp.browsers.exists(characterSelectorCEF)) return;
        mp.events.callRemote('CharacterSelector::spawnCharacter');
    },
    'CharacterSelector::loadSpawns': (characterID) => {
        if (characterSelectorCEF == null && !mp.browsers.exists(characterSelectorCEF)) return;
        characterSelectorCEF.execute(`LoadSpawnSelection(${characterID});`);
    },
    'CharacterSelector::selectSpawnPoint': (spawnName) => {
        if (characterSelectorCEF == null && !mp.browsers.exists(characterSelectorCEF)) return;
        mp.events.callRemote('CharacterSelector::selectSpawnPoint', spawnName);
    },
    'CharacterSelector::createNewCharacter': (type) => {
        if (characterSelectorCEF == null && !mp.browsers.exists(characterSelectorCEF)) return;
        mp.events.callRemote('CharacterSelector::createNewCharacter', type);
    },
    'CharacterSelector::enoughCharacterSlots': (type) => {
        if (characterSelectorCEF == null && !mp.browsers.exists(characterSelectorCEF)) return;
        characterSelectorCEF.execute(`InitializeCreateButton("${type}")`);
    },
    'CharacterSelector::changeSpawnView': (characterID) => {
        if (characterSelectorCEF == null && !mp.browsers.exists(characterSelectorCEF)) return;
        mp.events.callRemote('CharacterSelector::changeSpawnView', characterID);
    }
});
}