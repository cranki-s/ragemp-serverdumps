{
var propertyManagerCEF = null;

mp.events.add({
    'PropertyManager::showPropertyManager': (PropertyData) => {
        if (propertyManagerCEF == null && !mp.browsers.exists(propertyManagerCEF)){
            propertyManagerCEF = mp.browsers.new("package://gtalife/PropertyManager/index.html");
            propertyManagerCEF.execute(`Initialize(${PropertyData});`);
            mp.events.call('toggleHUDForPlayer', false);
            mp.gui.cursor.show(true, true);
            mp.events.call('setCefActive', true);
        }
    },
    'PropertyManager::hidePropertyManager': () => {
        if(!IsManagerActive) return;
        propertyManagerCEF.destroy();
        mp.gui.cursor.show(false, false);
        mp.events.call('toggleHUDForPlayer', true);
        mp.events.call('setCefActive', false);
        propertyManagerCEF = null;
    },
    'PropertyManager::reloadPropertyManager': (PropertyData) => {
        if(!IsManagerActive) return;
        propertyManagerCEF.execute(`Initialize(${PropertyData});`);
    },
    'PropertyManager::accessPropertyInventory': (propertyID) => {
        if(!IsManagerActive) return;
        mp.events.callRemote('PropertyManager::accessPropertyInventory', propertyID);
    },
    'PropertyManager::sellPropertyToState': (propertyID) => {
        if(!IsManagerActive) return;
        mp.events.callRemote('PropertyManager::sellPropertyToState', propertyID);
    },
    'PropertyManager::sellPropertyToPlayer': (propertyID, sellerName, sellerPrice) => {
        if(!IsManagerActive) return;
        mp.events.callRemote('PropertyManager::sellPropertyToPlayer', propertyID, sellerName, sellerPrice);
    },
    'PropertyManager::changeIntVariants': (propertyID) => {
        if(!IsManagerActive) return;
        mp.events.callRemote('PropertyManager::changeIntVariants', propertyID);
    },
    'PropertyManager::manageFurnitures': (propertyID) => {
        if(!IsManagerActive) return;
        mp.events.callRemote('PropertyManager::manageFurnitures', propertyID);
    },
    // 'saveRentalPrice': (propertyID, rentalPrice) => {
    //     if(!IsManagerActive) return;
    //     mp.events.callRemote('saveRentalPrice', propertyID, rentalPrice);
    // },
    'PropertyManager::savePermissions': (propertyID, constructionRights, inventoryRights, propertyLocked) => {
        if(!IsManagerActive) return;
        mp.events.callRemote('PropertyManager::savePermissions', propertyID, constructionRights, inventoryRights, propertyLocked);
    },
    'PropertyManager::saveSettings': (propertyID, propertyWeather, propertyTime, freezingState, reloadingState) => {
        if(!IsManagerActive) return;
        mp.events.callRemote('PropertyManager::saveSettings', propertyID, propertyWeather, propertyTime, freezingState, reloadingState);
    },
    'PropertyManager::evictAllTenants': (propertyID) => {
        if(!IsManagerActive) return;
        mp.events.callRemote('PropertyManager::evictAllTenants', propertyID);
    },
    'PropertyManager::removeTenant': (propertyID, tenantID) => {
        if(!IsManagerActive) return;
        mp.events.callRemote('PropertyManager::removeTenant', propertyID, tenantID);
    },
});

function IsManagerActive() { return (propertyManagerCEF != null && mp.browsers.exists(propertyManagerCEF)) ? true : false; } 
}