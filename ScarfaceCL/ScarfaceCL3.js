{
﻿const NativeUI = require("nativeui");
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

let menuRoupas = new Menu("Clothes", "", new Point(50, 50));
menuRoupas.AddItem(menuRoupasItem1 = new UIMenuItem("Masks", "Select your mask."));
menuRoupas.AddItem(menuRoupasItem2 = new UIMenuItem("Hats", "Select your hat."));
menuRoupas.AddItem(menuRoupasItem3 = new UIMenuItem("Jackets", "Select your jacket."));
menuRoupas.AddItem(menuRoupasItem4 = new UIMenuItem("Shirts", "Select your shirt."));
menuRoupas.AddItem(menuRoupasItem5 = new UIMenuItem("Legs", "Select your pant."));
menuRoupas.AddItem(menuRoupasItem6 = new UIMenuItem("Shoes", "Select your shoes."));
menuRoupas.AddItem(menuRoupasItem7 = new UIMenuItem("Hands", "Select your hands."));
menuRoupas.AddItem(menuRoupasItem8 = new UIMenuItem("Glasses", "Select your glasses."));
menuRoupas.AddItem(menuRoupasItem9 = new UIMenuItem("Acessories", "Select your acessories."));
menuRoupas.AddItem(menuRoupasItem10 = new UIMenuItem("Bags", "Select your bag."));
menuRoupas.AddItem(menuRoupasItem11 = new UIMenuItem("Bulletproof", "Select your bulletproof."));

menuRoupas.Visible = false;
todosMenus.push(menuRoupas);

///////////////////////////////////////////////////////
// MENU MASCARAS COMPONENT 1
///////////////////////////////////////////////////////

let mascarasDrawable = [];
for (i = 0; i < player.getNumberOfDrawableVariations(1) + 1; i++) mascarasDrawable.push(i.toString());

let mascarasTextureArray = [];
let mascarasTextureLimite = player.getNumberOfTextureVariations(1, player.getDrawableVariation(1));
for (i = 0; i < mascarasTextureLimite + 1; i++) mascarasTextureArray.push(i.toString());

const menuRoupasMascaras = new Menu("Masks", "", new Point(50, 50));
let mascarasItem = new UIMenuListItem("Masks", "Select your mask.", new ItemsCollection(mascarasDrawable), player.getDrawableVariation(1));
let mascarasTextureItem = new UIMenuListItem("Color", "Select your mask's color.", new ItemsCollection(mascarasTextureArray), player.getTextureVariation(1));
menuRoupasMascaras.AddItem(mascarasItem);
menuRoupasMascaras.AddItem(mascarasTextureItem);
menuRoupasMascaras.Visible = false;
todosMenus.push(menuRoupasMascaras);

menuRoupasMascaras.ListChange.on((item, listIndex) => {
    let drawable = parseInt(mascarasItem.SelectedItem.DisplayText);
    let texture = parseInt(mascarasTextureItem.SelectedItem.DisplayText);
    switch (item) {
        case mascarasItem:
            mp.events.callRemote('setClothes', 1, drawable, 0);
            mascarasTextureNewArray = [];
            for (i = 0; i < player.getNumberOfTextureVariations(1, player.getDrawableVariation(1)) + 1; i++) mascarasTextureNewArray.push(i.toString());
            mascarasTextureItem.Collection = new NativeUI.ItemsCollection(mascarasTextureNewArray).getListItems();
            mascarasTextureItem.Index = 0;
        break

        case mascarasTextureItem:
            mp.events.callRemote('setClothes', 1, drawable, texture);
    }
});

///////////////////////////////////////////////////////
// MENU CHAPÉUS PROP 0
///////////////////////////////////////////////////////

// Drawable
let chapeusDrawable = [];
for (i = 0; i < player.getNumberOfPropDrawableVariations(0) + 1; i++) chapeusDrawable.push(i.toString())
// Texture
let chapeusTexture = [];
let chapeusTextureLimite = player.getNumberOfPropTextureVariations(0, player.getPropIndex(0));
for (i = 0; i < chapeusTextureLimite + 1; i++) chapeusTexture.push(i.toString());

const menuRoupasChapeus = new Menu("Hats", "", new Point(50, 50));
let chapeusItem = new UIMenuListItem("Hats", "Select your hat.", new ItemsCollection(chapeusDrawable), player.getPropIndex(0));
let chapeusTextureItem = new UIMenuListItem("Color", "Select your hat's color.", new ItemsCollection(chapeusTexture), player.getPropTextureIndex(0));
menuRoupasChapeus.AddItem(chapeusItem);
menuRoupasChapeus.AddItem(chapeusTextureItem);
menuRoupasChapeus.Visible = false;
todosMenus.push(menuRoupasChapeus);

menuRoupasChapeus.ListChange.on((item, listIndex) => {
	let drawable = parseInt(chapeusItem.SelectedItem.DisplayText);
	let texture = parseInt(chapeusTextureItem.SelectedItem.DisplayText);
    switch (item) {
    	case chapeusItem:
    		mp.events.callRemote('setProp', 0, drawable, 0);
    		chapeusTextureNewArray = [];
			for (i = 0; i < player.getNumberOfPropTextureVariations(0, player.getPropIndex(0)) + 1; i++) chapeusTextureNewArray.push(i.toString());
    		chapeusTextureItem.Collection = new NativeUI.ItemsCollection(chapeusTextureNewArray).getListItems();
    		chapeusTextureItem.Index = 0;
    	break

    	case chapeusTextureItem:
    		mp.events.callRemote('setProp', 0, drawable, texture);
    }
});
///////////////////////////////////////////////////////
// MENU JAQUETAS COMPONENT 11
///////////////////////////////////////////////////////

// Drawable
let jaquetasDrawable = [];
for (i = 0; i < player.getNumberOfDrawableVariations(11) + 1; i++) jaquetasDrawable.push(i.toString());
// Texture
let jaquetasTextureArray = [];
let jaquetasTextureLimite = player.getNumberOfTextureVariations(11, player.getDrawableVariation(11));
for (i = 0; i < jaquetasTextureLimite + 1; i++) jaquetasTextureArray.push(i.toString());

const menuRoupasJaquetas = new Menu("Jackets", "", new Point(50, 50));
let jaquetasItem = new UIMenuListItem("Jackets", "Select your jacket.", new ItemsCollection(jaquetasDrawable), player.getDrawableVariation(11));
let jaquetasTextureItem = new UIMenuListItem("Color", "Select your jacket's color.", new ItemsCollection(jaquetasTextureArray), player.getTextureVariation(11));
menuRoupasJaquetas.AddItem(jaquetasItem);
menuRoupasJaquetas.AddItem(jaquetasTextureItem);
menuRoupasJaquetas.Visible = false;
todosMenus.push(menuRoupasJaquetas);

menuRoupasJaquetas.ListChange.on((item, listIndex) => {
	let drawable = parseInt(jaquetasItem.SelectedItem.DisplayText);
	let texture = parseInt(jaquetasTextureItem.SelectedItem.DisplayText);
    switch (item) {
    	case jaquetasItem:
    		mp.events.callRemote('setClothes', 11, drawable, 0);
    		jaquetasTextureNewArray = [];
			for (i = 0; i < player.getNumberOfTextureVariations(11, player.getDrawableVariation(11)) + 1; i++) jaquetasTextureNewArray.push(i.toString());
    		jaquetasTextureItem.Collection = new NativeUI.ItemsCollection(jaquetasTextureNewArray).getListItems();
    		jaquetasTextureItem.Index = 0;
    	break

    	case jaquetasTextureItem:
    		mp.events.callRemote('setClothes', 11, drawable, texture);
    }
});
///////////////////////////////////////////////////////
// MENU CAMISAS COMPONENT 8
///////////////////////////////////////////////////////


let camisasDrawable = [];
for (i = 0; i < player.getNumberOfDrawableVariations(8) + 1; i++) camisasDrawable.push(i.toString());

let camisasTextureArray = [];
let camisasTextureLimite = player.getNumberOfTextureVariations(8, player.getDrawableVariation(8));
for (i = 0; i < camisasTextureLimite + 1; i++) camisasTextureArray.push(i.toString());

const menuRoupasCamisas = new Menu("Shirts", "", new Point(50, 50));
let camisasItem = new UIMenuListItem("Shirts", "Select your shirt.", new ItemsCollection(camisasDrawable), player.getDrawableVariation(8));
let camisasTextureItem = new UIMenuListItem("Color", "Select your shirt's color.", new ItemsCollection(camisasTextureArray), player.getTextureVariation(8));
menuRoupasCamisas.AddItem(camisasItem);
menuRoupasCamisas.AddItem(camisasTextureItem);
menuRoupasCamisas.Visible = false;
todosMenus.push(menuRoupasCamisas);

menuRoupasCamisas.ListChange.on((item, listIndex) => {
	let drawable = parseInt(camisasItem.SelectedItem.DisplayText);
	let texture = parseInt(camisasTextureItem.SelectedItem.DisplayText);
    switch (item) {
    	case camisasItem:
    		mp.events.callRemote('setClothes', 8, drawable, 0);
    		camisasTextureNewArray = [];
			for (i = 0; i < player.getNumberOfTextureVariations(8, player.getDrawableVariation(8)) + 1; i++) camisasTextureNewArray.push(i.toString());
    		camisasTextureItem.Collection = new NativeUI.ItemsCollection(camisasTextureNewArray).getListItems();
    		camisasTextureItem.Index = 0;
    	break

    	case camisasTextureItem:
    		mp.events.callRemote('setClothes', 8, drawable, texture);
    }
});

///////////////////////////////////////////////////////
// MENU CALÇAS COMPONENT 4
///////////////////////////////////////////////////////

let calcasDrawable = [];
for (i = 0; i < player.getNumberOfDrawableVariations(4) + 1; i++) calcasDrawable.push(i.toString());

let calcasTextureArray = [];
let calcasTextureLimite = player.getNumberOfTextureVariations(4, player.getDrawableVariation(4));
for (i = 0; i < calcasTextureLimite + 1; i++) calcasTextureArray.push(i.toString());

const menuRoupasCalcas = new Menu("Legs", "", new Point(50, 50));
let calcasItem = new UIMenuListItem("Legs", "Select your pants.", new ItemsCollection(calcasDrawable), player.getDrawableVariation(4));
let calcasTextureItem = new UIMenuListItem("Color", "Select your pants color.", new ItemsCollection(calcasTextureArray), player.getTextureVariation(4));
menuRoupasCalcas.AddItem(calcasItem);
menuRoupasCalcas.AddItem(calcasTextureItem);
menuRoupasCalcas.Visible = false;
todosMenus.push(menuRoupasCalcas);

menuRoupasCalcas.ListChange.on((item, listIndex) => {
    let drawable = parseInt(calcasItem.SelectedItem.DisplayText);
    let texture = parseInt(calcasTextureItem.SelectedItem.DisplayText);
    switch (item) {
        case calcasItem:
            mp.events.callRemote('setClothes', 4, drawable, 0);
            calcasTextureNewArray = [];
            for (i = 0; i < player.getNumberOfTextureVariations(4, player.getDrawableVariation(4)) + 1; i++) calcasTextureNewArray.push(i.toString());
            calcasTextureItem.Collection = new NativeUI.ItemsCollection(calcasTextureNewArray).getListItems();
            calcasTextureItem.Index = 0;
        break

        case calcasTextureItem:
            mp.events.callRemote('setClothes', 4, drawable, texture);
    }
});

///////////////////////////////////////////////////////
// MENU SAPATOS COMPONENT 6
///////////////////////////////////////////////////////

let sapatosDrawable = [];
for (i = 0; i < player.getNumberOfDrawableVariations(6) + 1; i++) sapatosDrawable.push(i.toString());

let sapatosTextureArray = [];
let sapatosTextureLimite = player.getNumberOfTextureVariations(6, player.getDrawableVariation(6));
for (i = 0; i < sapatosTextureLimite + 1; i++) sapatosTextureArray.push(i.toString());

const menuRoupasSapatos = new Menu("Shoes", "", new Point(50, 50));
let sapatosItem = new UIMenuListItem("Shoes", "Select your shoes.", new ItemsCollection(sapatosDrawable), player.getDrawableVariation(6));
let sapatosTextureItem = new UIMenuListItem("Color", "Select your shoes color.", new ItemsCollection(sapatosTextureArray), player.getTextureVariation(6));
menuRoupasSapatos.AddItem(sapatosItem);
menuRoupasSapatos.AddItem(sapatosTextureItem);
menuRoupasSapatos.Visible = false;
todosMenus.push(menuRoupasSapatos);

menuRoupasSapatos.ListChange.on((item, listIndex) => {
    let drawable = parseInt(sapatosItem.SelectedItem.DisplayText);
    let texture = parseInt(sapatosTextureItem.SelectedItem.DisplayText);
    switch (item) {
        case sapatosItem:
            mp.events.callRemote('setClothes', 6, drawable, 0);
            sapatosTextureNewArray = [];
            for (i = 0; i < player.getNumberOfTextureVariations(6, player.getDrawableVariation(6)) + 1; i++) sapatosTextureNewArray.push(i.toString());
            sapatosTextureItem.Collection = new NativeUI.ItemsCollection(sapatosTextureNewArray).getListItems();
            sapatosTextureItem.Index = 0;
        break

        case sapatosTextureItem:
            mp.events.callRemote('setClothes', 6, drawable, texture);
    }
});

///////////////////////////////////////////////////////
// MENU MÃOS COMPONENT 3
///////////////////////////////////////////////////////

let maosDrawable = [];
for (i = 0; i < player.getNumberOfDrawableVariations(3) + 1; i++) maosDrawable.push(i.toString());

let maosTextureArray = [];
let maosTextureLimite = player.getNumberOfTextureVariations(3, player.getDrawableVariation(3));
for (i = 0; i < maosTextureLimite + 1; i++) maosTextureArray.push(i.toString());

const menuRoupasMaos = new Menu("Hands", "", new Point(50, 50));
let maosItem = new UIMenuListItem("Hands", "Select your hands.", new ItemsCollection(maosDrawable), player.getDrawableVariation(3));
let maosTextureItem = new UIMenuListItem("Color", "Select your hands variation.", new ItemsCollection(maosTextureArray), player.getTextureVariation(3));
menuRoupasMaos.AddItem(maosItem);
menuRoupasMaos.AddItem(maosTextureItem);
menuRoupasMaos.Visible = false;
todosMenus.push(menuRoupasMaos);

menuRoupasMaos.ListChange.on((item, listIndex) => {
    let drawable = parseInt(maosItem.SelectedItem.DisplayText);
    let texture = parseInt(maosTextureItem.SelectedItem.DisplayText);
    switch (item) {
        case maosItem:
            mp.events.callRemote('setClothes', 3, drawable, 0);
            maosTextureNewArray = [];
            for (i = 0; i < player.getNumberOfTextureVariations(3, player.getDrawableVariation(3)) + 1; i++) maosTextureNewArray.push(i.toString());
            maosTextureItem.Collection = new NativeUI.ItemsCollection(maosTextureNewArray).getListItems();
            maosTextureItem.Index = 0;
        break

        case maosTextureItem:
            mp.events.callRemote('setClothes', 3, drawable, texture);
    }
});

///////////////////////////////////////////////////////
// MENU ÓCULOS PROP 1
///////////////////////////////////////////////////////

// Drawable
let oculosDrawable = [];
for (i = 0; i < player.getNumberOfPropDrawableVariations(1) + 1; i++) oculosDrawable.push(i.toString())
// Texture
let oculosTexture = [];
let oculosTextureLimite = player.getNumberOfPropTextureVariations(1, player.getPropIndex(0));
for (i = 0; i < oculosTextureLimite + 1; i++) oculosTexture.push(i.toString());

const menuRoupasOculos = new Menu("Glasses", "", new Point(50, 50));
let oculosItem = new UIMenuListItem("Glasses", "Select your glasses.", new ItemsCollection(oculosDrawable), player.getPropIndex(0));
let oculosTextureItem = new UIMenuListItem("Color", "Select your glasses color.", new ItemsCollection(oculosTexture), player.getPropTextureIndex(1));
menuRoupasOculos.AddItem(oculosItem);
menuRoupasOculos.AddItem(oculosTextureItem);
menuRoupasOculos.Visible = false;
todosMenus.push(menuRoupasOculos);

menuRoupasOculos.ListChange.on((item, listIndex) => {
	let drawable = parseInt(oculosItem.SelectedItem.DisplayText);
	let texture = parseInt(oculosTextureItem.SelectedItem.DisplayText);
    switch (item) {
    	case oculosItem:
    		mp.events.callRemote('setProp', 1, drawable, 0);
    		oculosTextureNewArray = [];
			for (i = 0; i < player.getNumberOfPropTextureVariations(1, player.getPropIndex(1)) + 1; i++) oculosTextureNewArray.push(i.toString());
    		oculosTextureItem.Collection = new NativeUI.ItemsCollection(oculosTextureNewArray).getListItems();
    		oculosTextureItem.Index = 0;
    	break

    	case oculosTextureItem:
    		mp.events.callRemote('setProp', 1, drawable, texture);
    }
});

///////////////////////////////////////////////////////
// MENU ACESSÓRIOS COMPONENT 7
///////////////////////////////////////////////////////

let acessoriosDrawable = [];
for (i = 0; i < player.getNumberOfDrawableVariations(7) + 1; i++) acessoriosDrawable.push(i.toString());

let acessoriosTextureArray = [];
let acessoriosTextureLimite = player.getNumberOfTextureVariations(7, player.getDrawableVariation(7));
for (i = 0; i < acessoriosTextureLimite + 1; i++) acessoriosTextureArray.push(i.toString());

const menuRoupasAcessorios = new Menu("Acessories", "", new Point(50, 50));
let acessoriosItem = new UIMenuListItem("Acessories", "Select your acessories.", new ItemsCollection(acessoriosDrawable), player.getDrawableVariation(7));
let acessoriosTextureItem = new UIMenuListItem("Color", "Select your acessories color.", new ItemsCollection(acessoriosTextureArray), player.getTextureVariation(7));
menuRoupasAcessorios.AddItem(acessoriosItem);
menuRoupasAcessorios.AddItem(acessoriosTextureItem);
menuRoupasAcessorios.Visible = false;
todosMenus.push(menuRoupasAcessorios);

menuRoupasAcessorios.ListChange.on((item, listIndex) => {
    let drawable = parseInt(acessoriosItem.SelectedItem.DisplayText);
    let texture = parseInt(acessoriosTextureItem.SelectedItem.DisplayText);
    switch (item) {
        case acessoriosItem:
            mp.events.callRemote('setClothes', 7, drawable, 0);
            acessoriosTextureNewArray = [];
            for (i = 0; i < player.getNumberOfTextureVariations(7, player.getDrawableVariation(7)) + 1; i++) acessoriosTextureNewArray.push(i.toString());
            acessoriosTextureItem.Collection = new NativeUI.ItemsCollection(acessoriosTextureNewArray).getListItems();
            acessoriosTextureItem.Index = 0;
        break

        case acessoriosTextureItem:
            mp.events.callRemote('setClothes', 7, drawable, texture);
    }
});

///////////////////////////////////////////////////////
// MENU MOCHILAS COMPONENT 5
///////////////////////////////////////////////////////

let mochilasDrawable = [];
for (i = 0; i < player.getNumberOfDrawableVariations(5) + 1; i++) mochilasDrawable.push(i.toString());

let mochilasTextureArray = [];
let mochilasTextureLimite = player.getNumberOfTextureVariations(5, player.getDrawableVariation(5));;
for (i = 0; i < mochilasTextureLimite + 1; i++) mochilasTextureArray.push(i.toString());

const menuRoupasMochilas = new Menu("Bags", "", new Point(50, 50));
let mochilasItem = new UIMenuListItem("Bags", "Select your bag.", new ItemsCollection(mochilasDrawable), player.getDrawableVariation(5));
let mochilasTextureItem = new UIMenuListItem("Color", "Select your bag's color.", new ItemsCollection(mochilasTextureArray), player.getTextureVariation(5));
menuRoupasMochilas.AddItem(mochilasItem);
menuRoupasMochilas.AddItem(mochilasTextureItem);
menuRoupasMochilas.Visible = false;
todosMenus.push(menuRoupasMochilas);

menuRoupasMochilas.ListChange.on((item, listIndex) => {
    let drawable = parseInt(mochilasItem.SelectedItem.DisplayText);
    let texture = parseInt(mochilasTextureItem.SelectedItem.DisplayText);
    switch (item) {
        case mochilasItem:
            mp.events.callRemote('setClothes', 5, drawable, 0);
            mochilasTextureNewArray = [];
            for (i = 0; i < player.getNumberOfTextureVariations(5, player.getDrawableVariation(5)) + 1; i++) mochilasTextureNewArray.push(i.toString());
            mochilasTextureItem.Collection = new NativeUI.ItemsCollection(mochilasTextureNewArray).getListItems();
            mochilasTextureItem.Index = 0;
        break

        case mochilasTextureItem:
            mp.events.callRemote('setClothes', 5, drawable, texture);
    }
});

///////////////////////////////////////////////////////
// MENU bullet COMPONENT 9
///////////////////////////////////////////////////////

// Drawable
let bulletDrawable = [];
for (i = 0; i < player.getNumberOfDrawableVariations(11) + 1; i++) bulletDrawable.push(i.toString());
// Texture
let bulletTextureArray = [];
let bulletTextureLimite = player.getNumberOfTextureVariations(11, player.getDrawableVariation(11));
for (i = 0; i < bulletTextureLimite + 1; i++) bulletTextureArray.push(i.toString());

const menuRoupasBullet = new Menu("Bulletproof", "", new Point(50, 50));
let bulletItem = new UIMenuListItem("Bulletproof", "Select your bulletproof.", new ItemsCollection(bulletDrawable), player.getDrawableVariation(11));
let bulletTextureItem = new UIMenuListItem("Color", "Select your bulletproof's color.", new ItemsCollection(bulletTextureArray), player.getTextureVariation(11));
menuRoupasBullet.AddItem(bulletItem);
menuRoupasBullet.AddItem(bulletTextureItem);
menuRoupasBullet.Visible = false;
todosMenus.push(menuRoupasBullet);

menuRoupasBullet.ListChange.on((item, listIndex) => {
	let drawable = parseInt(bulletItem.SelectedItem.DisplayText);
	let texture = parseInt(bulletTextureItem.SelectedItem.DisplayText);
    switch (item) {
    	case bulletItem:
    		mp.events.callRemote('setClothes', 9, drawable, 0);
    		bulletTextureNewArray = [];
			for (i = 0; i < player.getNumberOfTextureVariations(11, player.getDrawableVariation(11)) + 1; i++) bulletTextureNewArray.push(i.toString());
    		bulletTextureItem.Collection = new NativeUI.ItemsCollection(bulletTextureNewArray).getListItems();
    		bulletTextureItem.Index = 0;
    	break

    	case bulletTextureItem:
    		mp.events.callRemote('setClothes', 9, drawable, texture);
    }
});

///////////////////////////////////////////////////////////////////////////////////////////////////

menuRoupas.BindMenuToItem(menuRoupasMascaras, menuRoupasItem1);
menuRoupas.BindMenuToItem(menuRoupasChapeus, menuRoupasItem2);
menuRoupas.BindMenuToItem(menuRoupasJaquetas, menuRoupasItem3);
menuRoupas.BindMenuToItem(menuRoupasCamisas, menuRoupasItem4);
menuRoupas.BindMenuToItem(menuRoupasCalcas, menuRoupasItem5);
menuRoupas.BindMenuToItem(menuRoupasSapatos, menuRoupasItem6);
menuRoupas.BindMenuToItem(menuRoupasMaos, menuRoupasItem7);
menuRoupas.BindMenuToItem(menuRoupasOculos, menuRoupasItem8);
menuRoupas.BindMenuToItem(menuRoupasAcessorios, menuRoupasItem9);
menuRoupas.BindMenuToItem(menuRoupasMochilas, menuRoupasItem10);
menuRoupas.BindMenuToItem(menuRoupasBullet, menuRoupasItem11);

mp.events.add('responseClothingMenu', () => {
    if (menuRoupas.Visible | menuRoupasMascaras.Visible | 
        menuRoupasChapeus.Visible | 
        menuRoupasJaquetas.Visible | 
        menuRoupasCamisas.Visible | 
        menuRoupasCalcas.Visible | 
        menuRoupasSapatos.Visible | 
        menuRoupasMaos.Visible | 
        menuRoupasOculos.Visible | 
        menuRoupasAcessorios.Visible | 
        menuRoupasMochilas.Visible | 
        menuRoupasBullet.Visible) {
        todosMenus.forEach(function(element, index, array){element.Close()});
    } else {
        
        menuRoupas.Open();
        mp.gui.cursor.visible = false;
    }
});

mp.keys.bind(0x75, false, () => {
    mp.events.callRemote('requestClothingMenu');
});

menuRoupas.MenuClose.on(() => {
    mp.gui.cursor.visible = false;
});

}罩풖Ī