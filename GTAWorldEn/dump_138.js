{
var VALKYRIE_SEATS = [
    {index: 0, position : {x : .4, y : 2, z: 0.325}, rotation : {x: 0, y: 0, z: 270}, exit : {x: 2.5, y: 2, z: 0}},
    {index: 1, position : {x : .4, y : 1, z: 0.325}, rotation : {x: 0, y: 0, z: 270}, exit : {x: 2.5, y: 1, z: 0}},
    {index: 2, position : {x : -.3, y : 2, z: 0.325}, rotation : {x: 0, y: 0, z: 90}, exit : {x: -2, y: 2, z: 0}},
    {index: 3, position : {x : -.3, y : 1, z: 0.325}, rotation : {x: 0, y: 0, z: 90}, exit : {x: -2, y: 1, z: 0}}
]

var GRANGER_SEATS = [
    {index: 0, position : {x : 1.17, y : -.2, z: 0.58}, rotation : {x: 0, y: 0, z: 0}, exit : {x: 1.5, y: -.2, z: 0}, animation : "hangpassenger1", static : true},
    {index: 1, position : {x : 1.17, y : -.5, z: 0.58}, rotation : {x: 0, y: 0, z: 0}, exit : {x: 1.5, y: -.5, z: 0}, animation : "hangpassenger1", static : true},
    {index: 2, position : {x : 1.17, y : -.8, z: 0.58}, rotation : {x: 0, y: 0, z: 0}, exit : {x: 1.5, y: -.8, z: 0}, animation : "hangpassenger1", static : true},
    {index: 3, position : {x : 1.17, y : -1, z: 0.58}, rotation : {x: 0, y: 0, z: 0}, exit : {x: 1.5, y: -1, z: 0}, animation : "hangpassenger1", static : true},

    {index: 4, position : {x : -1.17, y : -.2, z: 0.58}, rotation : {x: 0, y: 0, z: 0}, exit : {x: -1.5, y: -.2, z: 0}, animation : "hangpassenger2", static : true},
    {index: 5, position : {x : -1.17, y : -.5, z: 0.58}, rotation : {x: 0, y: 0, z: 0}, exit : {x: -1.5, y: -.5, z: 0}, animation : "hangpassenger2", static : true},
    {index: 6, position : {x : -1.17, y : -.8, z: 0.58}, rotation : {x: 0, y: 0, z: 0}, exit : {x: -1.5, y: -.8, z: 0}, animation : "hangpassenger2", static : true},
    {index: 7, position : {x : -1.17, y : -1, z: 0.58}, rotation : {x: 0, y: 0, z: 0}, exit : {x: -1.5, y: -1, z: 0}, animation : "hangpassenger2", static : true},
]


var BEARCAT_SEATS = [
    {index: 0, position : {x : -1.384, y : -.2, z: 1.03}, rotation : {x: 0, y: 0, z: 0}, exit : {x: -1.5, y: -.2, z: 0}, animation : "hangpassengera2", static : true},
    {index: 1, position : {x : -1.384, y : -.0, z: 1.03}, rotation : {x: 0, y: 0, z: 0}, exit : {x: -1.5, y: 0, z: 0}, animation : "hangpassengera2", static : true},
    {index: 2, position : {x : -1.45, y : -3, z: 1.03}, rotation : {x: 0, y: 0, z: 0}, exit : {x: -1.5, y: -3.1, z: 0}, animation : "hangpassengera2", static : true},
    {index: 3, position : {x : 1.45, y : -.2, z: 1.04}, rotation : {x: 0, y: 0, z: 0}, exit : {x: 1.6, y: -.2, z: 0}, animation : "hangpassengera1", static : true},
    {index: 4, position : {x : 1.45, y : -.0, z: 1.04}, rotation : {x: 0, y: 0, z: 0}, exit : {x: 1.6, y: 0, z: 0}, animation : "hangpassengera1", static : true},
    {index: 5, position : {x : 1.45, y : -3.1, z: 1.04}, rotation : {x: 0, y: 0, z: 0}, exit : {x: 1.6, y: -3.1, z: 0}, animation : "hangpassengera1", static : true},
    {index: 6, position : {x : 0, y : -.8, z: 2}, rotation : {x: 0, y: 0, z: 0}, exit : {x: 3, y: 0, z: 0}, animation : "aim3", shooting: true},
]

var LSFD_ENGINE = [
    {index: 0, position : {x : .1, y : 1.4, z: .9}, rotation : {x: 0, y: 0, z: 0}, exit : {x: 2, y: 1.4, z: 0}, animation : "sit", static : true},
    {index: 1, position : {x : -.64, y : 1.9, z: .9}, rotation : {x: 0, y: 0, z: 180}, exit : {x: -2, y: 1.9, z: 0}, animation : "sit", static : true},
    {index: 2, position : {x : .66, y : 1.9, z: .9}, rotation : {x: 0, y: 0, z: 180}, exit : {x: 2, y: 1.9, z: 0}, animation : "sit", static : true},
]

var LSFD_CARA = [
    {index: 0, position : {x : 0, y : -1.1, z: 1.3}, rotation : {x: 0, y: 0, z: 180}, exit : {x: 1, y: -1, z: 0}},
    {index: 1, position : {x : 0, y : -2.1, z: 1.3}, rotation : {x: 0, y: 0, z: 0}, exit : {x: 1, y: -2.2, z: 0}},
]

var STOCKADE = [
    {index: 0, position : {x : .4, y : -1.5, z: 1.5}, rotation : {x: 0, y: 0, z: 90}, exit : {x: .4, y: -4.5, z: 0}, animation : "sit", static : true},
    {index: 1, position : {x : .4, y : -2.1, z: 1.5}, rotation : {x: 0, y: 0, z: 90}, exit : {x: .4, y: -4.5, z: 0}, animation : "sit", static : true},
    {index: 2, position : {x : -.5, y : -2.1, z: 1.5}, rotation : {x: 0, y: 0, z: 270}, exit : {x: -.5, y: -4.5, z: 0}, animation : "sit", static : true},
    {index: 3, position : {x : -.5, y : -1.5, z: 1.5}, rotation : {x: 0, y: 0, z: 270}, exit : {x: -.5, y: -4.5, z: 0}, animation : "sit", static : true},
]

var TACO = [
    {index: 0, position : {x : 0, y : -1, z: .7}, rotation : {x: 0, y: 0, z: 270}, exit : {x: 0, y: -4.5, z: 0}, animation : "idle3"},
    {index: 1, position : {x : 0, y : -2.5, z: .7}, rotation : {x: 0, y: 0, z: 270}, exit : {x: 0, y: -4.5, z: 0}, animation : "leaningtable2"},
]

var EXECUTIONER = [
    {index: 0, position : {x : -1.2, y : -.9, z: 0.5}, rotation : {x: 0, y: 0, z: 0}, exit : {x: -2, y: -.9, z: 0}, animation : "hangpassenger2", static : true},
    {index: 1, position : {x : -1.2, y : -.3, z: 0.5}, rotation : {x: 0, y: 0, z: 0}, exit : {x: -2, y: -.3, z: 0}, animation : "hangpassenger2", static : true},
    {index: 2, position : {x : -1.2, y : .3, z: 0.5}, rotation : {x: 0, y: 0, z: 0}, exit : {x: -2, y: .3, z: 0}, animation : "hangpassenger2", static : true},
    {index: 3, position : {x : 1.2, y : -.9, z: 0.5}, rotation : {x: 0, y: 0, z: 0}, exit : {x: 2, y: -.9, z: 0}, animation : "hangpassenger1", static : true},
    {index: 4, position : {x : 1.2, y : -.3, z: 0.5}, rotation : {x: 0, y: 0, z: 0}, exit : {x: 2, y: -.3, z: 0}, animation : "hangpassenger1", static : true},
    {index: 5, position : {x : 1.2, y : .3, z: 0.5}, rotation : {x: 0, y: 0, z: 0}, exit : {x: 2, y: .3, z: 0}, animation : "hangpassenger1", static : true},
]

var SWATEXECUTIONER = [
    {index: 0, position : {x : -1.2, y : -.7, z: 0.63}, rotation : {x: 0, y: 0, z: 0}, exit : {x: -2, y: -.7, z: 0}, animation : "hangpassenger2", static : true},
    {index: 1, position : {x : -1.2, y : -1.2, z: 0.63}, rotation : {x: 0, y: 0, z: 0}, exit : {x: -2, y: -1.2, z: 0}, animation : "hangpassenger2", static : true},
    {index: 2, position : {x : -1.2, y : -1.8, z: 0.63}, rotation : {x: 0, y: 0, z: 0}, exit : {x: -2, y: -1.8, z: 0}, animation : "hangpassenger2", static : true},
    {index: 3, position : {x : -1.2, y : -2.5, z: 0.63}, rotation : {x: 0, y: 0, z: 0}, exit : {x: -2, y: -2.5, z: 0}, animation : "hangpassenger2", static : true},
    {index: 4, position : {x : 1.2, y : -.7, z: 0.63}, rotation : {x: 0, y: 0, z: 0}, exit : {x: 2, y: -.7, z: 0}, animation : "hangpassenger1", static : true},
    {index: 5, position : {x : 1.2, y : -1.2, z: 0.63}, rotation : {x: 0, y: 0, z: 0}, exit : {x: 2, y: -1.2, z: 0}, animation : "hangpassenger1", static : true},
    {index: 6, position : {x : 1.2, y : -1.8, z: 0.63}, rotation : {x: 0, y: 0, z: 0}, exit : {x: 2, y: -1.8, z: 0}, animation : "hangpassenger1", static : true},
    {index: 7, position : {x : 1.2, y : -2.5, z: 0.63}, rotation : {x: 0, y: 0, z: 0}, exit : {x: 2, y: -2.5, z: 0}, animation : "hangpassenger1", static : true},
]

var SADLER = [
    {index: 0, position : {x : .24, y : -1.6, z: 1.1}, rotation : {x: 0, y: 0, z: 71}, exit : {x: .2, y: -3.4, z: 0}, animation : "sitchair5", static : false},
    {index: 1, position : {x : -.24, y : -1.9, z: 1.1}, rotation : {x: 0, y: 0, z: 252}, exit : {x: -.2, y: -3.4, z: 0}, animation : "sitchair5", static : false},
]

var AMBULANCE = [
    {index: 0, position : {x : .5, y : -1.7, z: .8}, rotation : {x: 0, y: 0, z: 0}, exit : {x: 1.5, y: -1.7, z: 0}, animation : "sitchair5", static : false},
    {index: 1, position : {x : -.5, y : -1.7, z: .8}, rotation : {x: 0, y: 0, z: 0}, exit : {x: -1.5, y: -1.7, z: 0}, animation : "sitchair5", static : false},
]


var LSFDQUINT = [
    {index: 0, position : {x : .5, y : 1.8, z: .8}, rotation : {x: 0, y: 0, z: 0}, exit : {x: .4, y: -5, z: 0}, animation : "sitchair5", static : false},
    {index: 1, position : {x : -.5, y : 1.8, z: .8}, rotation : {x: 0, y: 0, z: 0}, exit : {x: .4, y: -5, z: 0}, animation : "sitchair5", static : false},
]

}