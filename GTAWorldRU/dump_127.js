{
﻿function DEFAULT_ANIMATION(){ return "checkbody1"}
function SEPARATOR(){return "|" }


function GET_DICTIONARY_ANIM_FROM_NAME(name = DEFAULT_ANIMATION()){
    if (name == "checkbody1")
        return ["amb@medic@standing@kneel@idle_a", "idle_a"]
    
}

let VALKYRIE_SEATS = [
    {index: 0, position : {x : .4, y : 2, z: 0.325}, rotation : {x: 0, y: 0, z: 270}, exit : {x: 2.5, y: 2, z: 0}},
    {index: 1, position : {x : .4, y : 1, z: 0.325}, rotation : {x: 0, y: 0, z: 270}, exit : {x: 2.5, y: 1, z: 0}},
    {index: 2, position : {x : -.3, y : 2, z: 0.325}, rotation : {x: 0, y: 0, z: 90}, exit : {x: -2, y: 2, z: 0}},
    {index: 3, position : {x : -.3, y : 1, z: 0.325}, rotation : {x: 0, y: 0, z: 90}, exit : {x: -2, y: 1, z: 0}}
]

let GRANGER_SEATS = [
    {index: 0, position : {x : 1.17, y : -.2, z: 0.58}, rotation : {x: 0, y: 0, z: 0}, exit : {x: 1.5, y: -.2, z: 0}, animation : "hangpassenger1", static : true},
    {index: 1, position : {x : 1.17, y : -.5, z: 0.58}, rotation : {x: 0, y: 0, z: 0}, exit : {x: 1.5, y: -.5, z: 0}, animation : "hangpassenger1", static : true},
    {index: 2, position : {x : 1.17, y : -.8, z: 0.58}, rotation : {x: 0, y: 0, z: 0}, exit : {x: 1.5, y: -.8, z: 0}, animation : "hangpassenger1", static : true},
    {index: 3, position : {x : 1.17, y : -1, z: 0.58}, rotation : {x: 0, y: 0, z: 0}, exit : {x: 1.5, y: -1, z: 0}, animation : "hangpassenger1", static : true},

    {index: 4, position : {x : -1.17, y : -.2, z: 0.58}, rotation : {x: 0, y: 0, z: 0}, exit : {x: -1.5, y: -.2, z: 0}, animation : "hangpassenger2", static : true},
    {index: 5, position : {x : -1.17, y : -.5, z: 0.58}, rotation : {x: 0, y: 0, z: 0}, exit : {x: -1.5, y: -.5, z: 0}, animation : "hangpassenger2", static : true},
    {index: 6, position : {x : -1.17, y : -.8, z: 0.58}, rotation : {x: 0, y: 0, z: 0}, exit : {x: -1.5, y: -.8, z: 0}, animation : "hangpassenger2", static : true},
    {index: 7, position : {x : -1.17, y : -1, z: 0.58}, rotation : {x: 0, y: 0, z: 0}, exit : {x: -1.5, y: -1, z: 0}, animation : "hangpassenger2", static : true},
]


let BEARCAT_SEATS = [
    {index: 0, position : {x : -1.384, y : -.2, z: 1.03}, rotation : {x: 0, y: 0, z: 0}, exit : {x: -1.5, y: -.2, z: 0}, animation : "hangpassengera2", static : true},
    {index: 1, position : {x : -1.384, y : -.0, z: 1.03}, rotation : {x: 0, y: 0, z: 0}, exit : {x: -1.5, y: 0, z: 0}, animation : "hangpassengera2", static : true},
    {index: 2, position : {x : -1.45, y : -3, z: 1.03}, rotation : {x: 0, y: 0, z: 0}, exit : {x: -1.5, y: -3.1, z: 0}, animation : "hangpassengera2", static : true},
    {index: 3, position : {x : 1.45, y : -.2, z: 1.04}, rotation : {x: 0, y: 0, z: 0}, exit : {x: 1.6, y: -.2, z: 0}, animation : "hangpassengera1", static : true},
    {index: 4, position : {x : 1.45, y : -.0, z: 1.04}, rotation : {x: 0, y: 0, z: 0}, exit : {x: 1.6, y: 0, z: 0}, animation : "hangpassengera1", static : true},
    {index: 5, position : {x : 1.45, y : -3.1, z: 1.04}, rotation : {x: 0, y: 0, z: 0}, exit : {x: 1.6, y: -3.1, z: 0}, animation : "hangpassengera1", static : true},
    {index: 6, position : {x : 0, y : -.8, z: 2}, rotation : {x: 0, y: 0, z: 0}, exit : {x: 3, y: 0, z: 0}, animation : "aim3", shooting: true},
]

let LSFD_ENGINE = [
    {index: 0, position : {x : .1, y : 1.4, z: .9}, rotation : {x: 0, y: 0, z: 0}, exit : {x: 2, y: 1.4, z: 0}, animation : "sit", static : true},
    {index: 1, position : {x : -.64, y : 1.9, z: .9}, rotation : {x: 0, y: 0, z: 180}, exit : {x: -2, y: 1.9, z: 0}, animation : "sit", static : true},
    {index: 2, position : {x : .66, y : 1.9, z: .9}, rotation : {x: 0, y: 0, z: 180}, exit : {x: 2, y: 1.9, z: 0}, animation : "sit", static : true},
]

let LSFD_CARA = [
    {index: 0, position : {x : 0, y : -1.1, z: 1.3}, rotation : {x: 0, y: 0, z: 180}, exit : {x: 1, y: -1, z: 0}},
    {index: 1, position : {x : 0, y : -2.1, z: 1.3}, rotation : {x: 0, y: 0, z: 0}, exit : {x: 1, y: -2.2, z: 0}},
]

let STOCKADE = [
    {index: 0, position : {x : .4, y : -1.5, z: 1.5}, rotation : {x: 0, y: 0, z: 90}, exit : {x: .4, y: -4.5, z: 0}, animation : "sit", static : true},
    {index: 1, position : {x : .4, y : -2.1, z: 1.5}, rotation : {x: 0, y: 0, z: 90}, exit : {x: .4, y: -4.5, z: 0}, animation : "sit", static : true},
    {index: 2, position : {x : -.5, y : -2.1, z: 1.5}, rotation : {x: 0, y: 0, z: 270}, exit : {x: -.5, y: -4.5, z: 0}, animation : "sit", static : true},
    {index: 3, position : {x : -.5, y : -1.5, z: 1.5}, rotation : {x: 0, y: 0, z: 270}, exit : {x: -.5, y: -4.5, z: 0}, animation : "sit", static : true},
]

let TACO = [
    {index: 0, position : {x : 0, y : -1, z: .7}, rotation : {x: 0, y: 0, z: 270}, exit : {x: 0, y: -4.5, z: 0}, animation : "idle3"},
    {index: 1, position : {x : 0, y : -2.5, z: .7}, rotation : {x: 0, y: 0, z: 270}, exit : {x: 0, y: -4.5, z: 0}, animation : "leaningtable2"},
]

let EXECUTIONER = [
    {index: 0, position : {x : -1.2, y : -.9, z: 0.5}, rotation : {x: 0, y: 0, z: 0}, exit : {x: -2, y: -.9, z: 0}, animation : "hangpassenger2", static : true},
    {index: 1, position : {x : -1.2, y : -.3, z: 0.5}, rotation : {x: 0, y: 0, z: 0}, exit : {x: -2, y: -.3, z: 0}, animation : "hangpassenger2", static : true},
    {index: 2, position : {x : -1.2, y : .3, z: 0.5}, rotation : {x: 0, y: 0, z: 0}, exit : {x: -2, y: .3, z: 0}, animation : "hangpassenger2", static : true},
    {index: 3, position : {x : 1.2, y : -.9, z: 0.5}, rotation : {x: 0, y: 0, z: 0}, exit : {x: 2, y: -.9, z: 0}, animation : "hangpassenger1", static : true},
    {index: 4, position : {x : 1.2, y : -.3, z: 0.5}, rotation : {x: 0, y: 0, z: 0}, exit : {x: 2, y: -.3, z: 0}, animation : "hangpassenger1", static : true},
    {index: 5, position : {x : 1.2, y : .3, z: 0.5}, rotation : {x: 0, y: 0, z: 0}, exit : {x: 2, y: .3, z: 0}, animation : "hangpassenger1", static : true},
]

let SWATEXECUTIONER = [
    {index: 0, position : {x : -1.2, y : -.7, z: 0.63}, rotation : {x: 0, y: 0, z: 0}, exit : {x: -2, y: -.7, z: 0}, animation : "hangpassenger2", static : true},
    {index: 1, position : {x : -1.2, y : -1.2, z: 0.63}, rotation : {x: 0, y: 0, z: 0}, exit : {x: -2, y: -1.2, z: 0}, animation : "hangpassenger2", static : true},
    {index: 2, position : {x : -1.2, y : -1.8, z: 0.63}, rotation : {x: 0, y: 0, z: 0}, exit : {x: -2, y: -1.8, z: 0}, animation : "hangpassenger2", static : true},
    {index: 3, position : {x : -1.2, y : -2.5, z: 0.63}, rotation : {x: 0, y: 0, z: 0}, exit : {x: -2, y: -2.5, z: 0}, animation : "hangpassenger2", static : true},
    {index: 4, position : {x : 1.2, y : -.7, z: 0.63}, rotation : {x: 0, y: 0, z: 0}, exit : {x: 2, y: -.7, z: 0}, animation : "hangpassenger1", static : true},
    {index: 5, position : {x : 1.2, y : -1.2, z: 0.63}, rotation : {x: 0, y: 0, z: 0}, exit : {x: 2, y: -1.2, z: 0}, animation : "hangpassenger1", static : true},
    {index: 6, position : {x : 1.2, y : -1.8, z: 0.63}, rotation : {x: 0, y: 0, z: 0}, exit : {x: 2, y: -1.8, z: 0}, animation : "hangpassenger1", static : true},
    {index: 7, position : {x : 1.2, y : -2.5, z: 0.63}, rotation : {x: 0, y: 0, z: 0}, exit : {x: 2, y: -2.5, z: 0}, animation : "hangpassenger1", static : true},

]

let MODELS = {
    1543134283 : VALKYRIE_SEATS, 
    2694714877 : VALKYRIE_SEATS, 
    2539873798 : VALKYRIE_SEATS,
    1780283536 : VALKYRIE_SEATS,
    2519238556 : GRANGER_SEATS,
    1947925897 : BEARCAT_SEATS,
    3615375545 : LSFD_ENGINE,
    608134768 : LSFD_CARA,
    1747439474 : STOCKADE,
    1951180813 : TACO,
    2216412592 : EXECUTIONER,
    1728477661 : SWATEXECUTIONER,
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