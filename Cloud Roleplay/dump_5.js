{
var clothingshop = null;
let ClothingShopId = null;
let PlayerClothesJson = null;

mp.events.add('Client:CreateClothingShop', (ShopId, ItemsJson, ClothesJson) => {
    try {

        if (clothingshop == null) {
            clothingshop = mp.browsers.new("package://cef/ClothingShop/index.html");
            clothingshop.active = true;
            mp.gui.cursor.show(true, true);
            mp.game.ui.displayRadar(false);
            mp.players.local.freezePosition(true);
            ClothingShopId = ShopId;
            PlayerClothesJson = ClothesJson;
            setTimeout(() => {
                clothingshop.execute(`SetMpDefinde()`);
                clothingshop.execute(`SetClothingShopItems('${ItemsJson}')`);
                clothingshop.execute(`SetPlayerSpiderRotationValue(${mp.players.local.getHeading()})`);
            }, 500);
            mp.events.call('client:setcam', true);
            mp.events.call('client:setcamflag', 0);
        }
    } catch (error) {
        mp.game.graphics.notify(error);
    }
});

mp.events.add('Client:DestoryClothingShop', () => {
    try {
        if (clothingshop != null) {
            clothingshop.active = false;
            clothingshop.destroy();
            clothingshop = null;
            mp.gui.cursor.show(false, false);
            mp.game.ui.displayRadar(true);
            mp.players.local.freezePosition(false);
            ClothingShopId = null;
            mp.events.callRemote("ClothingShop:Close");
            setTimeout(() => {
                mp.gui.cursor.show(false, false);
            }, 250);
            mp.events.call('client:setcam', false);
        }
    } catch (error) {
        mp.game.graphics.notify(error);
    }
});

mp.events.add('Client:GetNumberOfDrawableVariations', (componentid, drawableid, is_accessories) => {
    try {
        if (is_accessories) {
            if (clothingshop != null) {
                clothingshop.execute(`SetClothingMaxTexture(${mp.players.local.getNumberOfPropTextureVariations(componentid, drawableid)})`);
            }
        } else {
            if (clothingshop != null) {
                clothingshop.execute(`SetClothingMaxTexture(${mp.players.local.getNumberOfTextureVariations(componentid, drawableid) - 1})`);
            }
        }
    } catch (error) {
        mp.game.graphics.notify(error);
    }
});

mp.events.add('Client:TryClothes', (component, drawable, texture, is_accessories) => {
    if (clothingshop != null) {
        if (is_accessories) {
            mp.players.local.setPropIndex(parseInt(component), parseInt(drawable), parseInt(texture), true);
        } else {
            mp.players.local.setComponentVariation(parseInt(component), parseInt(drawable), parseInt(texture), 0);
        }
    }
});

mp.events.add('Client:BuyClothes', (Item_Id, Item_Texture) => {
    if (clothingshop != null) {
        mp.events.callRemote('ClothingShop:BuyClothingItem', ClothingShopId, Item_Id, Item_Texture)
    }
});

mp.events.add('Client:SetClothingStorage', (clothesJson) => {
    if (clothingshop != null) {
        PlayerClothesJson = clothesJson;
    }
});

mp.events.add('Client:ResotrePlayerClothes', () => {
    if (clothingshop != null) {
        if (PlayerClothesJson != null) {
            let element = JSON.parse(PlayerClothesJson);

            mp.players.local.setComponentVariation(1, parseInt(element.MaskDrawable), parseInt(element.MaskTexture), 0);
            mp.players.local.setComponentVariation(3, parseInt(element.TorsoDrawable), parseInt(element.TorsoTexture), 0);
            mp.players.local.setComponentVariation(4, parseInt(element.LegsDrawable), parseInt(element.LegsTexture), 0);
            mp.players.local.setComponentVariation(5, parseInt(element.BagsNParachuteDrawable), parseInt(element.BagsNParachuteTexture), 0);
            mp.players.local.setComponentVariation(6, parseInt(element.ShoeDrawable), parseInt(element.ShoeTexture), 0);
            mp.players.local.setComponentVariation(7, parseInt(element.AccessiorDrawable), parseInt(element.AccessiorTexture), 0);
            mp.players.local.setComponentVariation(8, parseInt(element.UndershirtDrawable), parseInt(element.UndershirtTexture), 0);
            mp.players.local.setComponentVariation(9, parseInt(element.BodyArmorDrawable), parseInt(element.BodyArmorTexture), 0);
            mp.players.local.setComponentVariation(11, parseInt(element.TopDrawable), parseInt(element.TopTexture), 0);

            mp.players.local.setPropIndex(0, parseInt(element.HatsDrawable), parseInt(element.HatsTexture), true);
            mp.players.local.setPropIndex(1, parseInt(element.GlassesDrawable), parseInt(element.GlassesTexture), true);
            mp.players.local.setPropIndex(6, parseInt(element.WatchesDrawable), parseInt(element.WatchesTexture), true);
            mp.players.local.setPropIndex(2, parseInt(element.EarsDrawable), parseInt(element.EarsTexture), true);
        }
    }
});

mp.events.add('Client:ClothingShopPlayStayAnimation', (toggle, animdic, animname) => {
    if (toggle) {
        mp.game.streaming.requestAnimDict(animdic);
        mp.players.local.taskPlayAnim(animdic, animname, 8.0, 1.0, -1, 1, 1.0, false, false, false);
    } else {
        mp.players.local.stopAnim(animdic, animname, 0.7);
    }
});
}