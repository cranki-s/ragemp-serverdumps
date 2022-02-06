{
class WorldObjectManager{
    constructor(){
        try{
            mp.game.entity.createModelHide(377, -1631, 28, 10, mp.game.joaat("prop_sec_gate_01c"), true) // Davis Station Garage
        } catch(exception){
            this.Error(exception, "WorldObject@Constructor")
        }
    }

    Error(exception, where) {
        try{
            mp.console.logError("Exception@ ->" + where  +  " -> " + exception.message, false, true)
        } catch {
            mp.console.logError("PoliceRadar@Exception: Print-Error", false, true)
        }
    }
}

new WorldObjectManager() 
}