{
const NativeUI = require("nativeui");
const Menu = NativeUI.Menu;
const UIMenuItem = NativeUI.UIMenuItem;
const UIMenuListItem = NativeUI.UIMenuListItem;
const Point = NativeUI.Point;
const ItemsCollection = NativeUI.ItemsCollection;
const ListItem = NativeUI.ListItem;

let existingUi = null;

mp.rpc("clothesedit:edit", (isProp, index, drawableId, drawableDataJson) => {
    if (existingUi) {
        existingUi.Close();
    }

    let drawableData = JSON.parse(drawableDataJson);
    existingUi = new Menu("Editar " + index, "Indice " + drawableId, new Point(50, 500));
    const listOfMany = [];
    const nameList = [drawableData.name];
    for (let i = 0; i < 400; i++) listOfMany.push(i.toString());
    let txtNum = new UIMenuListItem("Max txt", "", new ItemsCollection(listOfMany), drawableData.maxTextures);
    let torsoNum = new UIMenuListItem("Torso", "", new ItemsCollection(listOfMany), drawableData.torso);
    let undershirtNum = new UIMenuListItem("Undershirt", "", new ItemsCollection(listOfMany), drawableData.undershirt);
    let nameOpt = new UIMenuListItem("Name", "", new ItemsCollection(nameList), 0);
    existingUi.AddItem(txtNum);
    existingUi.AddItem(torsoNum);
    existingUi.AddItem(undershirtNum);
    existingUi.AddItem(nameOpt);
    existingUi.ItemSelect.on(item => {
        let result = {
            maxTextures: parseInt(txtNum.SelectedItem.DisplayText),
            torso: parseInt(torsoNum.SelectedItem.DisplayText),
            undershirt: parseInt(undershirtNum.SelectedItem.DisplayText)
        };
        mp.events.callRemote("clothesedit:on_accept", JSON.stringify(result), item === nameOpt);
        setTimeout(() => {
            existingUi.Close();
            existingUi = null;
        }, 1);
    });
    existingUi.ListChange.on((item, idx) => {
        if (isProp) {
            mp.players.local.setPropIndex(index, drawableId, parseInt(txtNum.SelectedItem.DisplayText), true);
        } else {
            mp.players.local.setComponentVariation(3, parseInt(torsoNum.SelectedItem.DisplayText), 0, 2);
            mp.players.local.setComponentVariation(8, parseInt(undershirtNum.SelectedItem.DisplayText), 0, 2);
            mp.players.local.setComponentVariation(index, drawableId, parseInt(txtNum.SelectedItem.DisplayText), 2);
        }
    });
    existingUi.MenuClose.on(() => {
        setTimeout(() => {
            if (existingUi) {
                existingUi.Close();
                existingUi = null;
            }
        }, 1);
    });
    if (isProp) {
        mp.players.local.setPropIndex(index, drawableId, drawableData.maxTextures, true);
    } else {
        mp.players.local.setComponentVariation(3, drawableData.torso, 0, 2);
        mp.players.local.setComponentVariation(8, drawableData.undershirt, 0, 2);
        mp.players.local.setComponentVariation(index, drawableId, drawableData.maxTextures, 2);
    }
    existingUi.Open();
});
}