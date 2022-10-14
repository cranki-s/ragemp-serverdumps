{
const NativeUI = require("nativeui");
const Menu = NativeUI.Menu;
const UIMenuItem = NativeUI.UIMenuItem;
const UIMenuListItem = NativeUI.UIMenuListItem;
const UIMenuCheckboxItem = NativeUI.UIMenuCheckboxItem;
const UIMenuSliderItem = NativeUI.UIMenuSliderItem;
const BadgeStyle = NativeUI.BadgeStyle;
const Point = NativeUI.Point;
const ItemsCollection = NativeUI.ItemsCollection;
const Color = NativeUI.Color;
const ListItem = NativeUI.ListItem;

let player = mp.players.local;

let todosMenus = [];

let menuClothing = new Menu("Clothes", "", new Point(50, 50));
menuClothingExit = null;
menuClothing.AddItem(menuClothingItem2 = new UIMenuItem("Hats", "Select your hat."));
menuClothing.AddItem(menuClothingItem3 = new UIMenuItem("Shirts", "Select your shirt."));
menuClothing.AddItem(menuClothingItem7 = new UIMenuItem("Torso", "Change arms and torso."));
menuClothing.AddItem(menuClothingItem4 = new UIMenuItem("Undershirts", "Select your undershirt."));
menuClothing.AddItem(menuClothingItem5 = new UIMenuItem("Pants", "Select your pant."));
menuClothing.AddItem(menuClothingItem6 = new UIMenuItem("Shoes", "Select your shoes."));
menuClothing.AddItem(menuClothingItem8 = new UIMenuItem("Glasses", "Select your glasses."));
menuClothing.AddItem(menuClothingItem10 = new UIMenuItem("Bags", "Select your bag."));
menuClothing.AddItem(menuClothingItem1 = new UIMenuItem("Masks", "Select your mask."));
menuClothing.AddItem(menuClothingItem9 = new UIMenuItem("Accessories", "Select your accessories."));

menuClothing.Visible = false;
todosMenus.push(menuClothing);

///////////////////////////////////////////////////////
// MENU Masks COMPONENT 1
///////////////////////////////////////////////////////

let MasksDrawable = [];
for (i = 0; i < player.getNumberOfDrawableVariations(1) + 1; i++) MasksDrawable.push(i.toString());


let numMasksInstalled = 0; // EXTRA INSTALLED THROUGH ADOON PACK THAT APPEAR AT LAST.
MasksDrawable.splice(MasksDrawable.length-141+numMasksInstalled);

let MasksTextureArray = [];
let MasksTextureLimite = player.getNumberOfTextureVariations(1, player.getDrawableVariation(1));
for (i = 0; i < MasksTextureLimite + 1; i++) MasksTextureArray.push(i.toString());

const menuClothingMasks = new Menu("Masks", "", new Point(50, 50));
menuClothingMasksExit = null;
let MasksItem = new UIMenuListItem("Masks", "Select your mask.", new ItemsCollection(MasksDrawable), player.getDrawableVariation(1));
let MasksTextureItem = new UIMenuListItem("Color", "Select your mask's color.", new ItemsCollection(MasksTextureArray), player.getTextureVariation(1));
menuClothingMasks.AddItem(MasksItem);
menuClothingMasks.AddItem(MasksTextureItem);
menuClothingMasks.ParentMenu = menuClothing;
menuClothingMasks.Visible = false;
todosMenus.push(menuClothingMasks);

menuClothingMasks.ListChange.on((item, listIndex) => {
    let drawable = parseInt(MasksItem.SelectedItem.DisplayText);
    let texture = parseInt(MasksTextureItem.SelectedItem.DisplayText);
    switch (item) {
        case MasksItem:
            mp.events.callRemote('RequestSetClothes', 1, drawable, 0);
            MasksTextureNewArray = [];
            for (i = 0; i < player.getNumberOfTextureVariations(1, player.getDrawableVariation(1)) + 1; i++) MasksTextureNewArray.push(i.toString());
            MasksTextureItem.Collection = new NativeUI.ItemsCollection(MasksTextureNewArray).getListItems();
            MasksTextureItem.Index = 0;
        break

        case MasksTextureItem:
            mp.events.callRemote('RequestSetClothes', 1, drawable, texture);
    }
});


menuClothingMasks.ItemSelect.on((item, index) => {
    switch (item.Text) {

        case "Exit":
            menuClothingMasks.RemoveItem(menuClothingMasksExit);
            menuClothingMasksExit = null;

            menuClothingMasks.Visible = false;
            menuClothing.Visible = true;
        break;
    }
});

// HATS ITEM

// Drawable
let HatsDrawable = [];

HatsDrawable.push("-1")  // -1 = none.
for (i = 0; i < player.getNumberOfPropDrawableVariations(0) + 1; i++) 
{        
    if (!((i >= 16 && i <= 18) || i == 39 || (i >= 47 && i <= 53) || 
        i == 38 || (i >= 66 && i <= 75) || (i >= 77 && i <= 82) || 
        (i >= 83 && i <= 94) || i == 111 || (i >= 114 && i <= 119) || 
        (i >= 125 && i <= 128) || i == 144 || i == 150 || i == 112 || i == 143 || i == 149 || i == 124))
    {
        HatsDrawable.push(i.toString())  // Unfair helmets blocked above. 
    }
}

let numHatsInstalled = 0; // EXTRA HATS INSTALLED THROUGH ADOON PACK THAT APPEAR AT LAST.
HatsDrawable.splice(HatsDrawable.length-21+numHatsInstalled);

// Texture
let HatsTexture = [];
let HatsTextureLimite = player.getNumberOfPropTextureVariations(0, player.getPropIndex(0));
for (i = 0; i < HatsTextureLimite + 1; i++) HatsTexture.push(i.toString());

const menuClothingHats = new Menu("Hats", "", new Point(50, 50));
menuClothingHatsExit = null;
let HatsItem = new UIMenuListItem("Hats", "Select your hat.", new ItemsCollection(HatsDrawable), player.getPropIndex(0));
let HatsTextureItem = new UIMenuListItem("Color", "Select your hat's color.", new ItemsCollection(HatsTexture), player.getPropTextureIndex(0));
menuClothingHats.AddItem(HatsItem);
menuClothingHats.AddItem(HatsTextureItem);
menuClothingHats.ParentMenu = menuClothing;
menuClothingHats.Visible = false;
todosMenus.push(menuClothingHats);

menuClothingHats.ListChange.on((item, listIndex) => {
	let drawable = parseInt(HatsItem.SelectedItem.DisplayText);
	let texture = parseInt(HatsTextureItem.SelectedItem.DisplayText);
    switch (item) {
    	case HatsItem:
    		mp.events.callRemote('RequestSetHat', drawable, 0);
    		HatsTextureNewArray = [];
			for (i = 0; i < player.getNumberOfPropTextureVariations(0, player.getPropIndex(0)) + 1; i++) HatsTextureNewArray.push(i.toString());
    		HatsTextureItem.Collection = new NativeUI.ItemsCollection(HatsTextureNewArray).getListItems();
    		HatsTextureItem.Index = 0;
    	break

    	case HatsTextureItem:
    		mp.events.callRemote('RequestSetHat', drawable, texture);
    }
});

menuClothingHats.ItemSelect.on((item, index) => {
    switch (item.Text) {

        case "Exit":
            menuClothingHats.RemoveItem(menuClothingHatsExit);
            menuClothingHatsExit = null;

            menuClothingHats.Visible = false;
            menuClothing.Visible = true;
        break;
    }
});
///////////////////////////////////////////////////////
// MENU Jackets COMPONENT 11
///////////////////////////////////////////////////////

// Drawable
let JacketsDrawable = [];
for (i = 0; i < player.getNumberOfDrawableVariations(11) + 1; i++) JacketsDrawable.push(i.toString());


let numJacketsInstalled = 0; // EXTRA INSTALLED THROUGH ADOON PACK THAT APPEAR AT LAST.
JacketsDrawable.splice(JacketsDrawable.length-141+numJacketsInstalled);

// Texture
let JacketsTextureArray = [];
let JacketsTextureLimite = player.getNumberOfTextureVariations(11, player.getDrawableVariation(11));
for (i = 0; i < JacketsTextureLimite + 1; i++) JacketsTextureArray.push(i.toString());

const menuClothingJackets = new Menu("Shirts", "", new Point(50, 50));
menuClothingJacketsExit = null;
let JacketsItem = new UIMenuListItem("Shirts", "Select your shirt.", new ItemsCollection(JacketsDrawable), player.getDrawableVariation(11));
let JacketsTextureItem = new UIMenuListItem("Color", "Select your shirt's color.", new ItemsCollection(JacketsTextureArray), player.getTextureVariation(11));
menuClothingJackets.AddItem(JacketsItem);
menuClothingJackets.AddItem(JacketsTextureItem);
menuClothingJackets.ParentMenu = menuClothing;
menuClothingJackets.Visible = false;
todosMenus.push(menuClothingJackets);

menuClothingJackets.ListChange.on((item, listIndex) => {
	let drawable = parseInt(JacketsItem.SelectedItem.DisplayText);
	let texture = parseInt(JacketsTextureItem.SelectedItem.DisplayText);
    switch (item) {
    	case JacketsItem:
    		mp.events.callRemote('RequestSetClothes', 11, drawable, 0);
    		JacketsTextureNewArray = [];
			for (i = 0; i < player.getNumberOfTextureVariations(11, player.getDrawableVariation(11)) + 1; i++) JacketsTextureNewArray.push(i.toString());
    		JacketsTextureItem.Collection = new NativeUI.ItemsCollection(JacketsTextureNewArray).getListItems();
    		JacketsTextureItem.Index = 0;
    	break

    	case JacketsTextureItem:
    		mp.events.callRemote('RequestSetClothes', 11, drawable, texture);
    }
});

menuClothingJackets.ItemSelect.on((item, index) => {
    switch (item.Text) {

        case "Exit":
            menuClothingJackets.RemoveItem(menuClothingJacketsExit);
            menuClothingJacketsExit = null;

            menuClothingJackets.Visible = false;
            menuClothing.Visible = true;
        break;
    }
});
///////////////////////////////////////////////////////
// MENU Shirts COMPONENT 8
///////////////////////////////////////////////////////


let ShirtsDrawable = [];
for (i = 0; i < player.getNumberOfDrawableVariations(8) + 1; i++) ShirtsDrawable.push(i.toString());


let numShirtsInstalled = 0; // EXTRA INSTALLED THROUGH ADOON PACK THAT APPEAR AT LAST.
ShirtsDrawable.splice(ShirtsDrawable.length-160+numShirtsInstalled);

let ShirtsTextureArray = [];
let ShirtsTextureLimite = player.getNumberOfTextureVariations(8, player.getDrawableVariation(8));
for (i = 0; i < ShirtsTextureLimite + 1; i++) ShirtsTextureArray.push(i.toString());

const menuClothingShirts = new Menu("Undershirts", "", new Point(50, 50));
menuClothingShirtsExit = null;
let ShirtsItem = new UIMenuListItem("Undershirts", "Select your undershirt.", new ItemsCollection(ShirtsDrawable), player.getDrawableVariation(8));
let ShirtsTextureItem = new UIMenuListItem("Color", "Select your undershirt's color.", new ItemsCollection(ShirtsTextureArray), player.getTextureVariation(8));
menuClothingShirts.AddItem(ShirtsItem);
menuClothingShirts.AddItem(ShirtsTextureItem);
menuClothingShirts.ParentMenu = menuClothing;
menuClothingShirts.Visible = false;
todosMenus.push(menuClothingShirts);

menuClothingShirts.ListChange.on((item, listIndex) => {
	let drawable = parseInt(ShirtsItem.SelectedItem.DisplayText);
	let texture = parseInt(ShirtsTextureItem.SelectedItem.DisplayText);
    switch (item) {
    	case ShirtsItem:
    		mp.events.callRemote('RequestSetClothes', 8, drawable, 0);
    		ShirtsTextureNewArray = [];
			for (i = 0; i < player.getNumberOfTextureVariations(8, player.getDrawableVariation(8)) + 1; i++) ShirtsTextureNewArray.push(i.toString());
    		ShirtsTextureItem.Collection = new NativeUI.ItemsCollection(ShirtsTextureNewArray).getListItems();
    		ShirtsTextureItem.Index = 0;
    	break

    	case ShirtsTextureItem:
    		mp.events.callRemote('RequestSetClothes', 8, drawable, texture);
    }
});

menuClothingShirts.ItemSelect.on((item, index) => {
    switch (item.Text) {

        case "Exit":
            menuClothingShirts.RemoveItem(menuClothingShirtsExit);
            menuClothingShirtsExit = null;

            menuClothingShirts.Visible = false;
            menuClothing.Visible = true;
        break;
    }
});

///////////////////////////////////////////////////////
// MENU CALÇAS COMPONENT 4
///////////////////////////////////////////////////////

let PantsDrawable = [];
for (i = 0; i < player.getNumberOfDrawableVariations(4) + 1; i++) PantsDrawable.push(i.toString());


let numPantsInstalled = 0; // EXTRA INSTALLED THROUGH ADOON PACK THAT APPEAR AT LAST.
PantsDrawable.splice(PantsDrawable.length-161+numPantsInstalled);

let PantsTextureArray = [];
let PantsTextureLimite = player.getNumberOfTextureVariations(4, player.getDrawableVariation(4));
for (i = 0; i < PantsTextureLimite + 1; i++) PantsTextureArray.push(i.toString());

const menuClothingPants = new Menu("Pants", "", new Point(50, 50));
menuClothingPantsExit = null;
let PantsItem = new UIMenuListItem("Pants", "Select your pants.", new ItemsCollection(PantsDrawable), player.getDrawableVariation(4));
let PantsTextureItem = new UIMenuListItem("Color", "Select your pants color.", new ItemsCollection(PantsTextureArray), player.getTextureVariation(4));
menuClothingPants.AddItem(PantsItem);
menuClothingPants.AddItem(PantsTextureItem);
menuClothingPants.ParentMenu = menuClothing;
menuClothingPants.Visible = false;
todosMenus.push(menuClothingPants);

menuClothingPants.ListChange.on((item, listIndex) => {
    let drawable = parseInt(PantsItem.SelectedItem.DisplayText);
    let texture = parseInt(PantsTextureItem.SelectedItem.DisplayText);
    switch (item) {
        case PantsItem:
            mp.events.callRemote('RequestSetClothes', 4, drawable, 0);
            PantsTextureNewArray = [];
            for (i = 0; i < player.getNumberOfTextureVariations(4, player.getDrawableVariation(4)) + 1; i++) PantsTextureNewArray.push(i.toString());
            PantsTextureItem.Collection = new NativeUI.ItemsCollection(PantsTextureNewArray).getListItems();
            PantsTextureItem.Index = 0;
        break

        case PantsTextureItem:
            mp.events.callRemote('RequestSetClothes', 4, drawable, texture);
    }
});

menuClothingPants.ItemSelect.on((item, index) => {
    switch (item.Text) {

        case "Exit":
            menuClothingPants.RemoveItem(menuClothingPantsExit);
            menuClothingPantsExit = null;

            menuClothingPants.Visible = false;
            menuClothing.Visible = true;
        break;
    }
});

///////////////////////////////////////////////////////
// MENU Shoes COMPONENT 6
///////////////////////////////////////////////////////

let ShoesDrawable = [];
for (i = 0; i < player.getNumberOfDrawableVariations(6) + 1; i++) ShoesDrawable.push(i.toString());

let numShoesInstalled = 0; // EXTRA INSTALLED THROUGH ADOON PACK THAT APPEAR AT LAST.
ShoesDrawable.splice(ShoesDrawable.length-151+numShoesInstalled);

let ShoesTextureArray = [];
let ShoesTextureLimite = player.getNumberOfTextureVariations(6, player.getDrawableVariation(6));
for (i = 0; i < ShoesTextureLimite + 1; i++) ShoesTextureArray.push(i.toString());

const menuClothingShoes = new Menu("Shoes", "", new Point(50, 50));
menuClothingShoesExit = null;
let ShoesItem = new UIMenuListItem("Shoes", "Select your shoes.", new ItemsCollection(ShoesDrawable), player.getDrawableVariation(6));
let ShoesTextureItem = new UIMenuListItem("Color", "Select your shoes color.", new ItemsCollection(ShoesTextureArray), player.getTextureVariation(6));
menuClothingShoes.AddItem(ShoesItem);
menuClothingShoes.AddItem(ShoesTextureItem);
menuClothingShoes.ParentMenu = menuClothing;
menuClothingShoes.Visible = false;
todosMenus.push(menuClothingShoes);

menuClothingShoes.ListChange.on((item, listIndex) => {
    let drawable = parseInt(ShoesItem.SelectedItem.DisplayText);
    let texture = parseInt(ShoesTextureItem.SelectedItem.DisplayText);
    switch (item) {
        case ShoesItem:
            mp.events.callRemote('RequestSetClothes', 6, drawable, 0);
            ShoesTextureNewArray = [];
            for (i = 0; i < player.getNumberOfTextureVariations(6, player.getDrawableVariation(6)) + 1; i++) ShoesTextureNewArray.push(i.toString());
            ShoesTextureItem.Collection = new NativeUI.ItemsCollection(ShoesTextureNewArray).getListItems();
            ShoesTextureItem.Index = 0;
        break

        case ShoesTextureItem:
            mp.events.callRemote('RequestSetClothes', 6, drawable, texture);
    }
});

menuClothingShoes.ItemSelect.on((item, index) => {
    switch (item.Text) {

        case "Exit":
            menuClothingShoes.RemoveItem(menuClothingShoesExit);
            menuClothingShoesExit = null;

            menuClothingShoes.Visible = false;
            menuClothing.Visible = true;
        break;
    }
});

///////////////////////////////////////////////////////
// MENU MÃOS COMPONENT 3
///////////////////////////////////////////////////////

let TorsoDrawable = [];
for (i = 0; i < player.getNumberOfDrawableVariations(3) + 1; i++) TorsoDrawable.push(i.toString());


let numTorsoInstalled = 0; // EXTRA INSTALLED THROUGH ADOON PACK THAT APPEAR AT LAST.
TorsoDrawable.splice(TorsoDrawable.length-141+numTorsoInstalled);

let TorsoTextureArray = [];
let TorsoTextureLimite = player.getNumberOfTextureVariations(3, player.getDrawableVariation(3));
for (i = 0; i < TorsoTextureLimite + 1; i++) TorsoTextureArray.push(i.toString());

const menuClothingTorso = new Menu("Torso", "", new Point(50, 50));
menuClothingTorsoExit = null;
let TorsoItem = new UIMenuListItem("Torso", "Select your torso.", new ItemsCollection(TorsoDrawable), player.getDrawableVariation(3));
let TorsoTextureItem = new UIMenuListItem("Color", "Select your torso variation.", new ItemsCollection(TorsoTextureArray), player.getTextureVariation(3));
menuClothingTorso.AddItem(TorsoItem);
menuClothingTorso.AddItem(TorsoTextureItem);
menuClothingTorso.ParentMenu = menuClothing;
menuClothingTorso.Visible = false;
todosMenus.push(menuClothingTorso);

menuClothingTorso.ListChange.on((item, listIndex) => {
    let drawable = parseInt(TorsoItem.SelectedItem.DisplayText);
    let texture = parseInt(TorsoTextureItem.SelectedItem.DisplayText);
    switch (item) {
        case TorsoItem:
            mp.events.callRemote('RequestSetClothes', 3, drawable, 0);
            TorsoTextureNewArray = [];
            for (i = 0; i < player.getNumberOfTextureVariations(3, player.getDrawableVariation(3)) + 1; i++) TorsoTextureNewArray.push(i.toString());
            TorsoTextureItem.Collection = new NativeUI.ItemsCollection(TorsoTextureNewArray).getListItems();
            TorsoTextureItem.Index = 0;
        break

        case TorsoTextureItem:
            mp.events.callRemote('RequestSetClothes', 3, drawable, texture);
    }
});

menuClothingTorso.ItemSelect.on((item, index) => {
    switch (item.Text) {

        case "Exit":
            menuClothingTorso.RemoveItem(menuClothingTorsoExit);
            menuClothingTorsoExit = null;

            menuClothingTorso.Visible = false;
            menuClothing.Visible = true;
        break;
    }
});

///////////////////////////////////////////////////////
// MENU ÓCULOS PROP 1
///////////////////////////////////////////////////////

// Drawable
let GlassesDrawable = [];
for (i = 0; i < player.getNumberOfPropDrawableVariations(1) + 1; i++) GlassesDrawable.push(i.toString())

let numGlassesInstalled = 0; // EXTRA INSTALLED THROUGH ADOON PACK THAT APPEAR AT LAST.
GlassesDrawable.splice(GlassesDrawable.length-17+numGlassesInstalled);

// Texture
let GlassesTexture = [];
let GlassesTextureLimite = player.getNumberOfPropTextureVariations(1, player.getPropIndex(0));
for (i = 0; i < GlassesTextureLimite + 1; i++) GlassesTexture.push(i.toString());

const menuClothingGlasses = new Menu("Glasses", "", new Point(50, 50));
menuClothingGlassesExit = null;
let GlassesItem = new UIMenuListItem("Glasses", "Select your glasses.", new ItemsCollection(GlassesDrawable), player.getPropIndex(0));
let GlassesTextureItem = new UIMenuListItem("Color", "Select your glasses color.", new ItemsCollection(GlassesTexture), player.getPropTextureIndex(1));
menuClothingGlasses.AddItem(GlassesItem);
menuClothingGlasses.AddItem(GlassesTextureItem);
menuClothingGlasses.ParentMenu = menuClothing;
menuClothingGlasses.Visible = false;
todosMenus.push(menuClothingGlasses);

menuClothingGlasses.ListChange.on((item, listIndex) => {
	let drawable = parseInt(GlassesItem.SelectedItem.DisplayText);
	let texture = parseInt(GlassesTextureItem.SelectedItem.DisplayText);
    switch (item) {
    	case GlassesItem:
    		mp.events.callRemote('RequestSetGlasses', drawable, 0);
    		GlassesTextureNewArray = [];
			for (i = 0; i < player.getNumberOfPropTextureVariations(1, player.getPropIndex(1)) + 1; i++) GlassesTextureNewArray.push(i.toString());
    		GlassesTextureItem.Collection = new NativeUI.ItemsCollection(GlassesTextureNewArray).getListItems();
    		GlassesTextureItem.Index = 0;
    	break

    	case GlassesTextureItem:
    		mp.events.callRemote('RequestSetGlasses', drawable, texture);
    }
});

menuClothingGlasses.ItemSelect.on((item, index) => {
    switch (item.Text) {

        case "Exit":
            menuClothingGlasses.RemoveItem(menuClothingGlassesExit);
            menuClothingGlassesExit = null;

            menuClothingGlasses.Visible = false;
            menuClothing.Visible = true;
        break;
    }
});

///////////////////////////////////////////////////////
// MENU ACESSÓRIOS COMPONENT 7
///////////////////////////////////////////////////////

let AccessoriesDrawable = [];
for (i = 0; i < player.getNumberOfDrawableVariations(7) + 1; i++) AccessoriesDrawable.push(i.toString());


let numAccessoriesInstalled = 0; // EXTRA INSTALLED THROUGH ADOON PACK THAT APPEAR AT LAST.
AccessoriesDrawable.splice(AccessoriesDrawable.length-161+numAccessoriesInstalled);

let AccessoriesTextureArray = [];
let AccessoriesTextureLimite = player.getNumberOfTextureVariations(7, player.getDrawableVariation(7));
for (i = 0; i < AccessoriesTextureLimite + 1; i++) AccessoriesTextureArray.push(i.toString());

const menuClothingAccessories = new Menu("Accessories", "", new Point(50, 50));
menuClothingAccessoriesExit = null;
let AccessoriesItem = new UIMenuListItem("Accessories", "Select your accessories.", new ItemsCollection(AccessoriesDrawable), player.getDrawableVariation(7));
let AccessoriesTextureItem = new UIMenuListItem("Color", "Select your accessories color.", new ItemsCollection(AccessoriesTextureArray), player.getTextureVariation(7));
menuClothingAccessories.AddItem(AccessoriesItem);
menuClothingAccessories.AddItem(AccessoriesTextureItem);
menuClothingAccessories.ParentMenu = menuClothing;
menuClothingAccessories.Visible = false;
todosMenus.push(menuClothingAccessories);

menuClothingAccessories.ListChange.on((item, listIndex) => {
    let drawable = parseInt(AccessoriesItem.SelectedItem.DisplayText);
    let texture = parseInt(AccessoriesTextureItem.SelectedItem.DisplayText);
    switch (item) {
        case AccessoriesItem:
            mp.events.callRemote('RequestSetClothes', 7, drawable, 0);
            AccessoriesTextureNewArray = [];
            for (i = 0; i < player.getNumberOfTextureVariations(7, player.getDrawableVariation(7)) + 1; i++) AccessoriesTextureNewArray.push(i.toString());
            AccessoriesTextureItem.Collection = new NativeUI.ItemsCollection(AccessoriesTextureNewArray).getListItems();
            AccessoriesTextureItem.Index = 0;
        break

        case AccessoriesTextureItem:
            mp.events.callRemote('RequestSetClothes', 7, drawable, texture);
    }
});

menuClothingAccessories.ItemSelect.on((item, index) => {
    switch (item.Text) {

        case "Exit":
            menuClothingAccessories.RemoveItem(menuClothingAccessoriesExit);
            menuClothingAccessoriesExit = null;

            menuClothingAccessories.Visible = false;
            menuClothing.Visible = true;
        break;
    }
});

///////////////////////////////////////////////////////
// MENU Bags COMPONENT 5
///////////////////////////////////////////////////////

let BagsDrawable = [];
for (i = 0; i < player.getNumberOfDrawableVariations(5) + 1; i++) BagsDrawable.push(i.toString());


let numBagsInstalled = 0; // EXTRA INSTALLED THROUGH ADOON PACK THAT APPEAR AT LAST.
BagsDrawable.splice(BagsDrawable.length-151+numBagsInstalled);

let BagsTextureArray = [];
let BagsTextureLimite = player.getNumberOfTextureVariations(5, player.getDrawableVariation(5));;
for (i = 0; i < BagsTextureLimite + 1; i++) BagsTextureArray.push(i.toString());

const menuClothingBags = new Menu("Bags", "", new Point(50, 50));
menuClothingBagsExit = null;
let BagsItem = new UIMenuListItem("Bags", "Select your bag.", new ItemsCollection(BagsDrawable), player.getDrawableVariation(5));
let BagsTextureItem = new UIMenuListItem("Color", "Select your bag's color.", new ItemsCollection(BagsTextureArray), player.getTextureVariation(5));
menuClothingBags.AddItem(BagsItem);
menuClothingBags.AddItem(BagsTextureItem);
menuClothingBags.ParentMenu = menuClothing;
menuClothingBags.Visible = false;
todosMenus.push(menuClothingBags);

menuClothingBags.ListChange.on((item, listIndex) => {
    let drawable = parseInt(BagsItem.SelectedItem.DisplayText);
    let texture = parseInt(BagsTextureItem.SelectedItem.DisplayText);
    switch (item) {
        case BagsItem:
            mp.events.callRemote('RequestSetClothes', 5, drawable, 0);
            BagsTextureNewArray = [];
            for (i = 0; i < player.getNumberOfTextureVariations(5, player.getDrawableVariation(5)) + 1; i++) BagsTextureNewArray.push(i.toString());
            BagsTextureItem.Collection = new NativeUI.ItemsCollection(BagsTextureNewArray).getListItems();
            BagsTextureItem.Index = 0;
        break

        case BagsTextureItem:
            mp.events.callRemote('RequestSetClothes', 5, drawable, texture);
    }
});

menuClothingBags.ItemSelect.on((item, index) => {
    switch (item.Text) {

        case "Exit":
            menuClothingBags.RemoveItem(menuClothingBagsExit);
            menuClothingBagsExit = null;

            menuClothingBags.Visible = false;
            menuClothing.Visible = true;
        break;
    }
});

///////////////////////////////////////////////////////////////////////////////////////////////////
/*
menuClothing.BindMenuToItem(menuClothingMasks, menuClothingItem1);
menuClothing.BindMenuToItem(menuClothingHats, menuClothingItem2);
menuClothing.BindMenuToItem(menuClothingJackets, menuClothingItem3);
menuClothing.BindMenuToItem(menuClothingShirts, menuClothingItem4);
menuClothing.BindMenuToItem(menuClothingPants, menuClothingItem5);
menuClothing.BindMenuToItem(menuClothingShoes, menuClothingItem6);
menuClothing.BindMenuToItem(menuClothingTorso, menuClothingItem7);
menuClothing.BindMenuToItem(menuClothingGlasses, menuClothingItem8);
menuClothing.BindMenuToItem(menuClothingAccessories, menuClothingItem9);
menuClothing.BindMenuToItem(menuClothingBags, menuClothingItem10);*/


menuClothing.ItemSelect.on((item, index) => {
    switch (index) {
        case 0:
            menuClothing.Visible = false;
            menuClothingHats.Visible = true;

            if(menuClothingHatsExit == null)
            {
                menuClothingHatsExit = new UIMenuItem("Exit", "Go back to last menu.");
                menuClothingHatsExit.ForeColor = new Color(127, 237, 28);
                menuClothingHats.AddItem(menuClothingHatsExit);
            }
        break;

        case 1:
            menuClothing.Visible = false;
            menuClothingJackets.Visible = true;

            if(menuClothingJacketsExit == null)
            {
                menuClothingJacketsExit = new UIMenuItem("Exit", "Go back to last menu.");
                menuClothingJacketsExit.ForeColor = new Color(127, 237, 28);
                menuClothingJackets.AddItem(menuClothingJacketsExit);
            }
        break;

        case 2:
            menuClothing.Visible = false;
            menuClothingTorso.Visible = true;

            if(menuClothingTorsoExit == null)
            {
                menuClothingTorsoExit = new UIMenuItem("Exit", "Go back to last menu.");
                menuClothingTorsoExit.ForeColor = new Color(127, 237, 28);
                menuClothingTorso.AddItem(menuClothingTorsoExit);
            }
        break;

        case 3:
            menuClothing.Visible = false;
            menuClothingShirts.Visible = true;

            if(menuClothingShirtsExit == null)
            {
                menuClothingShirtsExit = new UIMenuItem("Exit", "Go back to last menu.");
                menuClothingShirtsExit.ForeColor = new Color(127, 237, 28);
                menuClothingShirts.AddItem(menuClothingShirtsExit);
            }
        break;

        case 4:
            menuClothing.Visible = false;
            menuClothingPants.Visible = true;

            if(menuClothingPantsExit == null)
            {
                menuClothingPantsExit = new UIMenuItem("Exit", "Go back to last menu.");
                menuClothingPantsExit.ForeColor = new Color(127, 237, 28);
                menuClothingPants.AddItem(menuClothingPantsExit);
            }
        break;

        case 5:
            menuClothing.Visible = false;
            menuClothingShoes.Visible = true;

            if(menuClothingShoesExit == null)
            {
                menuClothingShoesExit = new UIMenuItem("Exit", "Go back to last menu.");
                menuClothingShoesExit.ForeColor = new Color(127, 237, 28);
                menuClothingShoes.AddItem(menuClothingShoesExit);
            }
        break;

        case 6:
            menuClothing.Visible = false;
            menuClothingGlasses.Visible = true;

            if(menuClothingGlassesExit == null)
            {
                menuClothingGlassesExit = new UIMenuItem("Exit", "Go back to last menu.");
                menuClothingGlassesExit.ForeColor = new Color(127, 237, 28);
                menuClothingGlasses.AddItem(menuClothingGlassesExit);
            }
        break;

        case 7:
            menuClothing.Visible = false;
            menuClothingBags.Visible = true;

            if(menuClothingBagsExit == null)
            {
                menuClothingBagsExit = new UIMenuItem("Exit", "Go back to last menu.");
                menuClothingBagsExit.ForeColor = new Color(127, 237, 28);
                menuClothingBags.AddItem(menuClothingBagsExit);
            }
        break;

        case 8:
            menuClothing.Visible = false;
            menuClothingMasks.Visible = true;

            if(menuClothingMasksExit == null)
            {
                menuClothingMasksExit = new UIMenuItem("Exit", "Go back to last menu.");
                menuClothingMasksExit.ForeColor = new Color(127, 237, 28);
                menuClothingMasks.AddItem(menuClothingMasksExit);
            }
        break;

        case 9:
            menuClothing.Visible = false;
            menuClothingAccessories.Visible = true;

            if(menuClothingAccessoriesExit == null)
            {
                menuClothingAccessoriesExit = new UIMenuItem("Exit", "Go back to last menu.");
                menuClothingAccessoriesExit.ForeColor = new Color(127, 237, 28);
                menuClothingAccessories.AddItem(menuClothingAccessoriesExit);
            }
        break;

        case 10:
            menuClothing.Close();
        break;
    }
});

mp.events.add("ShowClothesMenu", () =>
{
    if (menuClothing.Visible | menuClothingMasks.Visible | 
        menuClothingHats.Visible | 
        menuClothingJackets.Visible | 
        menuClothingShirts.Visible | 
        menuClothingPants.Visible | 
        menuClothingShoes.Visible | 
        menuClothingTorso.Visible | 
        menuClothingGlasses.Visible | 
        menuClothingAccessories.Visible | 
        menuClothingBags.Visible) {
        todosMenus.forEach(function(element, index, array){element.Close()});
    } else {
        
        menuClothing.Open();
        if(menuClothingExit == null)
        {
            menuClothingExit = new UIMenuItem("Exit", "Go back to last menu.");
            menuClothingExit.ForeColor = new Color(127, 237, 28);
            menuClothing.AddItem(menuClothingExit);
        }
        
        activateChat(false);
        mp.gui.cursor.visible = false;
    }
});

menuClothing.MenuClose.on(() => {
    menuClothing.RemoveItem(menuClothingExit);
    menuClothingExit = null;
    activateChat(true);
    mp.gui.cursor.visible = false;

    mp.events.callRemote("CloseDonatorClothesMenu");
});

}