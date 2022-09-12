{
const NativeUI = require("nativeui");
const UIMenu = NativeUI.Menu;
const UIMenuItem = NativeUI.UIMenuItem;
const BadgeStyle = NativeUI.BadgeStyle;
const Point = NativeUI.Point;

// Script data
const weaponData = require("./weaponspawner/weaponData");

const groupNames = {
    "GROUP_UNARMED": "Fists",
    "GROUP_MELEE": "Melee Weapons",
    "GROUP_PISTOL": "Pistols",
    "GROUP_STUNGUN": "Stun Gun",
    "GROUP_SMG": "Submachine Guns",
    "GROUP_SHOTGUN": "Shotguns",
    "GROUP_RIFLE": "Rifles"
    /*"GROUP_MG": "Machine Guns",
    "GROUP_SNIPER": "Sniper Rifles",
    "GROUP_HEAVY": "Heavy Weapons",
    "GROUP_THROWN": "Thrown Weapons",
    "GROUP_PETROLCAN": "Jerry Can",
    "GROUP_FIREEXTINGUISHER": "Fire Extinguisher"*/
};

const natives = {
    "HAS_PED_GOT_WEAPON": "0x8DECB02F88F428BC",
    "HAS_PED_GOT_WEAPON_COMPONENT": "0xC593212475FAE340",
    "GET_PED_WEAPON_TINT_INDEX": "0x2B9EEDC07BD06B9F"
};

// Misc. variables
let menusReady = false;
let currentWeapon = null;
let menuTransition = false;
let optionTransition = false;

let mainMenu = null;
let optionsMenu = null;
let componentMenu = null;
let tintMenu = null;

// Functions
function truncateText(text, maxLength) {
    // NativeUI has issues with long descriptions
    if (text.length >= maxLength) {
        return text.substring(0, maxLength) + "...";
    } else {
        return text;
    }
}

function setMenuSubtitle(menu, subtitle) {
    // menu.Subtitle setter waiting room
    menu.subtitle = subtitle;
    menu._subtitle.caption = subtitle;
}

// NativeUI hell below
function createMainMenu() {
    if (mainMenu !== null) {
        return;
    }

    mainMenu = new UIMenu("", "SELECT A CATEGORY", new Point(0, 0), "shopui_title_gr_gunmod", "shopui_title_gr_gunmod");

    mainMenu.MenuChange.on((newMenu, forward) => {
        if (forward) menuTransition = true;
    });

    mainMenu.MenuClose.on(() => {
        mp.gui.chat.show(true);
    });
}

function createOptionsMenu() {
    if (optionsMenu !== null) {
        return;
    }

    optionsMenu = new UIMenu("", "SELECT AN OPTION", new Point(0, 0), "shopui_title_gr_gunmod", "shopui_title_gr_gunmod");
    optionsMenu.Visible = false;

    optionsMenu.MenuChange.on((newMenu, forward) => {
        if (forward) optionTransition = true;
    });

    optionsMenu.ItemSelect.on((selectedItem, selectedIdx) => {
        if(!mp.players.local.getVariable("freeroam")) return;
        switch (selectedIdx) {
            case 0:
                // Give
                const weaponHash = mp.game.joaat(currentWeapon);
                optionsMenu.MenuItems[1].Enabled = Object.keys(weaponData[weaponHash].Components).length > 0;
                optionsMenu.MenuItems[2].Enabled = Object.keys(weaponData[weaponHash].Tints).length > 0;
                optionsMenu.MenuItems[3].Enabled = true;

                mp.events.callRemote("weaponSpawner:give", currentWeapon);
            break;

            case 3:
                // Remove
                mp.events.callRemote("weaponSpawner:remove", currentWeapon);
                optionsMenu.GoBack();
            break;
        }
    });
}

function createComponentMenu() {
    if (componentMenu !== null) {
        return;
    }

    componentMenu = new UIMenu("", "SELECT A COMPONENT", new Point(0, 0), "shopui_title_gr_gunmod", "shopui_title_gr_gunmod");
    componentMenu.Visible = false;
    componentMenu.ParentMenu = optionsMenu;

    componentMenu.ItemSelect.on((selectedItem) => {
        if(!mp.players.local.getVariable("freeroam")) return;
        if (optionTransition) {
            optionTransition = false;
            return;
        }

        const weaponHash = mp.game.joaat(currentWeapon);
        const componentHash = mp.game.joaat(selectedItem.RepresentsComponent);
        const hasComponent = mp.game.invoke(natives.HAS_PED_GOT_WEAPON_COMPONENT, mp.players.local.handle, weaponHash >> 0, componentHash >> 0);
        mp.events.callRemote("weaponSpawner:updateComponent", currentWeapon, selectedItem.RepresentsComponent, hasComponent);
    });
}

function createTintMenu() {
    if (tintMenu !== null) {
        return;
    }

    tintMenu = new UIMenu("", "SELECT A TINT", new Point(0, 0), "shopui_title_gr_gunmod", "shopui_title_gr_gunmod");
    tintMenu.Visible = false;
    tintMenu.ParentMenu = optionsMenu;

    tintMenu.ItemSelect.on((selectedItem, selectedIdx) => {
        if(!mp.players.local.getVariable("freeroam")) return;
        if (optionTransition) {
            optionTransition = false;
            return;
        }

        mp.events.callRemote("weaponSpawner:updateTint", currentWeapon, selectedIdx);

        // Update badge
        for (const item of tintMenu.MenuItems) item.SetLeftBadge(BadgeStyle.None);
        selectedItem.SetLeftBadge(BadgeStyle.Tick);
    });
}

function createGroupMenu(name, sortedWeapons) {
    const groupMenu = new UIMenu("", `CATEGORY: ${name.toUpperCase()}`, new Point(0, 0), "shopui_title_gr_gunmod", "shopui_title_gr_gunmod");
    groupMenu.ParentMenu = mainMenu;
    groupMenu.Visible = false;

    for (const weapon of sortedWeapons) {
        const weaponItem = new UIMenuItem(weapon.Name, truncateText(weapon.Description, 90));
        weaponItem.RepresentsWeapon = weapon.HashKey;

        groupMenu.AddItem(weaponItem);
    }

    groupMenu.ItemSelect.on((selectedItem) => {
        if(!mp.players.local.getVariable("freeroam")) return;
        if (menuTransition) {
            menuTransition = false;
            return;
        }

        currentWeapon = selectedItem.RepresentsWeapon;
        groupMenu.Visible = false;

        // Update options menu
        const weaponHash = mp.game.joaat(currentWeapon);
        const hasWeapon = mp.game.invoke(natives.HAS_PED_GOT_WEAPON, mp.players.local.handle, weaponHash >> 0, false);
        const componentCount = Object.keys(weaponData[weaponHash].Components).length;
        const tintCount = Object.keys(weaponData[weaponHash].Tints).length;

        setMenuSubtitle(optionsMenu, `OPTIONS: ${weaponData[weaponHash].Name.toUpperCase()}`);
        optionsMenu.RefreshIndex();
        optionsMenu.ParentMenu = groupMenu;
        optionsMenu.MenuItems[1].Enabled = componentCount > 0 && hasWeapon;
        optionsMenu.MenuItems[2].Enabled = tintCount > 0 && hasWeapon;
        optionsMenu.MenuItems[3].Enabled = hasWeapon;
        optionsMenu.Visible = true;

        // Update components menu
        if (componentCount > 0) {
            componentMenu.Clear();

            const sortedComponents = Object.entries(weaponData[weaponHash].Components).sort((a, b) => a[1].Name.localeCompare(b[1].Name));
            for (const [componentHash, component] of sortedComponents) {
                const tempComponentItem = new UIMenuItem(component.Name, truncateText(component.Description, 90));
                tempComponentItem.RepresentsComponent = component.HashKey;

                if (mp.game.invoke(natives.HAS_PED_GOT_WEAPON_COMPONENT, mp.players.local.handle, weaponHash >> 0, componentHash >> 0)) tempComponentItem.SetLeftBadge(BadgeStyle.Tick);
                componentMenu.AddItem(tempComponentItem);
            }

            setMenuSubtitle(componentMenu, `COMPONENTS: ${weaponData[weaponHash].Name.toUpperCase()}`);
            componentMenu.RefreshIndex();
        }

        // Update tints menu
        if (tintCount > 0) {
            tintMenu.Clear();

            for (const tint of weaponData[weaponHash].Tints) tintMenu.AddItem(new UIMenuItem(tint.Name, `${tint.Name} for selected weapon.`));

            let currentTintIdx = mp.game.invoke(natives.GET_PED_WEAPON_TINT_INDEX, mp.players.local.handle, weaponHash >> 0);
            if (currentTintIdx === -1) currentTintIdx = 0;

            tintMenu.MenuItems[currentTintIdx].SetLeftBadge(BadgeStyle.Tick);
            tintMenu.CurrentSelection = currentTintIdx;
            setMenuSubtitle(tintMenu, `TINTS: ${weaponData[weaponHash].Name.toUpperCase()}`);
        }
    });

    const tempGroupItem = new UIMenuItem(name, `${sortedWeapons.length} weapon(s) in this category.`);
    mainMenu.AddItem(tempGroupItem);
    mainMenu.BindMenuToItem(groupMenu, tempGroupItem);
}

// Events
mp.events.add("weaponSpawner:componentsUpdated", (weaponName) => {
    if (weaponName === currentWeapon) {
        const weaponHash = mp.game.joaat(weaponName);

        for (const item of componentMenu.MenuItems) {
            const componentHash = mp.game.joaat(item.RepresentsComponent);
            const hasComponent = mp.game.invoke(natives.HAS_PED_GOT_WEAPON_COMPONENT, mp.players.local.handle, weaponHash >> 0, componentHash >> 0);
            item.SetLeftBadge(hasComponent ? BadgeStyle.Tick : BadgeStyle.None);
        }
    }
});

// Commands
mp.events.add("playerCommand", (command) => {
    if (command.toLowerCase() === "weapons" || command.toLowerCase() === "wep") {
        if(!mp.players.local.getVariable("freeroam")) return;
        if (!menusReady) {
            // Create basic menus
            createMainMenu();
            createOptionsMenu();
            createComponentMenu();
            createTintMenu();

            // Fill options menu
            optionsMenu.AddItem(new UIMenuItem("Give", "Spawn selected weapon with max. ammo."));

            let tempOptionItem = new UIMenuItem("Components", "Customize selected weapon with components.");
            optionsMenu.AddItem(tempOptionItem);
            optionsMenu.BindMenuToItem(componentMenu, tempOptionItem);

            tempOptionItem = new UIMenuItem("Tints", "Customize selected weapon with tints.");
            optionsMenu.AddItem(tempOptionItem);
            optionsMenu.BindMenuToItem(tintMenu, tempOptionItem);

            optionsMenu.AddItem(new UIMenuItem("Remove", "Remove selected weapon."));

            // Create group menus
            for (const [key, name] of Object.entries(groupNames)) {
                createGroupMenu(name, Object.values(weaponData).filter(w => w.Group === key).sort((a, b) => a.Name.localeCompare(b.Name)));
            }

            menusReady = true;
        }

        mainMenu.Visible = true;
        mp.gui.chat.show(false);
    }
});
}