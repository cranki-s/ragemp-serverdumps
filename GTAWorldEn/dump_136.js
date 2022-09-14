{
require('./gtalife/VehicleSeats/SeatDatabase.js')

function DEFAULT_ANIMATION(){ return "checkbody1"}
function SEPARATOR(){return "|" }


function GET_DICTIONARY_ANIM_FROM_NAME(name = DEFAULT_ANIMATION()){
    if (name == "checkbody1")
        return ["amb@medic@standing@kneel@idle_a", "idle_a"]
    
}

let MODELS = {
    1543134283 : VALKYRIE_SEATS, 
    2694714877 : VALKYRIE_SEATS, 
    2539873798 : VALKYRIE_SEATS,
    1780283536 : VALKYRIE_SEATS,
    2519238556 : GRANGER_SEATS,
    3523245962 : AMBULANCE,
    1947925897 : BEARCAT_SEATS,
    3615375545 : LSFD_ENGINE,
    608134768  : LSFD_CARA,
    1747439474 : STOCKADE,
    3414953959 : LSFDQUINT,
    1951180813 : TACO,
    3885454465 : TACO,
    2216412592 : EXECUTIONER,
    1728477661 : SWATEXECUTIONER,
    3695398481 : SADLER,
    1716730624 : SADLER,
    734217681  : SADLER, 
    417112088  : SADLER,
    685195277  : SADLER,
    259624274  : SADLER,
}

function GetSeatData(model){
    return MODELS[model]
}

let CONTROLS = {
    INPUT_JUMP : 22,
    INPUT_VEH_ENTER : 23,
    MOVE_LEFT : 34, 
    MOVE_RIGHT : 35, 
}

function GetControls(name){
    return CONTROLS[name]
}

function TURN_SPEED(){
    return 2
}

function SerializeVectorF(v){
    return `${v.x},${v.y},${v.z}`
}

function ParseVectorF(v){
    try{
        if (!v) return null 
        let [x, y, z] = v.split(",")
        return new mp.Vector3(parseFloat(x), parseFloat(y), parseFloat(z))
    } catch{
    }
}

}