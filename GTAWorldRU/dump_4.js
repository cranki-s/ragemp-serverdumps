{
﻿function TestFunctionEx(){
    return mp.gui.chat.push(`TEST`);
}

var blacklisted_male_comp = [
    [11, 540],
    [11, 539],
    [11, 537],
    [11, 536],
    [11, 535],
    [11, 534],
    [11, 533],
    [11, 532],
    [11, 531],
    [11, 530],
    [11, 529],
    [11, 528],
    [11, 527],
    [11, 526],
    [11, 525], 
    [11, 524], 
    [11, 509],
    [11, 508],
    [11, 507],
    [11, 505],
    [11, 504],
    [11, 503],
    [11, 492],
    [11, 490],
    [11, 489],
    [11, 479],
    [11, 478],
    [11, 428],
    [11, 427],
    [11, 426], 
    [11, 424],
    [11, 423],
    [11, 404],
    [11, 403],
    [11, 402],
    [11, 401],
    [11, 399],
    [11, 397],
    [11, 396],
    [11, 395],
    [11, 394],
    [11, 319],
    [11, 318],
    [11, 317],
    [11, 316],
    [11, 55],

    [8, 231],
    [8, 230],
    [8, 229],
    [8, 228],
    [8, 219],
    [8, 212],
    [8, 211],
    [8, 210],
    [8, 209],
    [8, 208],
    [8, 207],
    [8, 206], 
    [8, 205],
    [8, 204],
    [8, 193],
    [8, 192],
    [8, 191],
    [8, 190],
    [8, 189],
    [8, 153],
    [8, 129],
    [8, 122],
    [8, 97],
    [8, 58],

    [4, 184],
    [4, 181],
    [4, 167],
    [4, 166],
    [4, 84],

    [0, 201],
    [0, 200],
    [0, 199],
    [0, 170],
    [0, 168],
    [0, 165],
    [0, 149],
    [0, 148],
    [0, 147],
    [0, 119],
    [0, 118],
    [0, 117],
    [0, 116],
    [0, 46],
];

var blacklisted_female_comp = [
    [11, 48],
    [11, 331],
    [11, 417],
    [11, 418],
    [11, 419],
    [11, 420],
    [11, 421],
    [11, 422],
    [11, 423],
    [11, 424],
    [11, 425],
    [11, 426],
    [11, 427],
    [11, 428],
    [11, 433],
    [11, 434],
    [11, 464],
    [11, 465],
    [11, 466],
    [11, 471],
    [11, 472],
    [11, 473],
    [11, 498],
    [11, 544],
    [11, 553],
    [11, 554],
    [11, 557],
    [11, 558],
    [11, 559],
    [11, 574],
    [11, 575],
    [11, 576],
    [11, 577],
    [11, 578],
    [11, 581],
    [11, 594],
    [11, 595],
    [11, 596],
    [11, 597],
    [11, 598],
    [11, 599],
    [11, 600],
    [11, 601],
    [11, 602],
    [11, 603],
    [11, 604],
    [11, 605],
    [11, 606],
    [11, 607],
    [11, 608],
    [11, 609],
    [11, 610],
    [11, 611],

    [8, 35],
    [8, 105],
    [8, 152],
    [8, 159],
    [8, 160],
    [8, 189],
    [8, 190],
    [8, 191],
    [8, 238],
    [8, 240],
    [8, 247],
    [8, 274],
    [8, 300],
    [8, 301],
    [8, 302],
    [8, 303],
    [8, 304],
    [8, 305],
    [8, 306],
    [8, 307],
    [8, 308],
    [8, 309],
    [8, 310],
    [8, 311],
    [8, 312],
    [8, 313],
    [8, 314],
    [8, 315],
    [8, 316],

    [4, 197],
    [4, 196],
    [4, 179],
    [4, 178],
    [4, 177],
    [4, 176],
    [4, 162],
    [4, 131],
    [4, 127],
    [4, 126],
    [4, 86],
];

function findNextAvailableSlotFemale(component, drawable, max, direction) {
    for (let i = 0; i < blacklisted_female_comp.length; i++) {
        if (blacklisted_female_comp[i][0] === component) {
            if(direction == 0){ //forward
                for (let j = drawable; j < max; j++) {
                    if(!isVariantBlacklistedFemale(component, j)) return j;
                }
            }else{
                for (let j = drawable; j > 0; j--) {
                    if(!isVariantBlacklistedFemale(component, j)) return j;
                }
            }
        }
    }
    return 0;
}

function findNextAvailableSlotMale(component, drawable, max, direction) {
    for (let i = 0; i < blacklisted_male_comp.length; i++) {
        if (blacklisted_male_comp[i][0] === component) {
            if(direction == 0){ //forward
                for (let j = drawable; j < max; j++) {
                    if(!isVariantBlacklistedMale(component, j)) return j;
                }
            }else{
                for (let j = drawable; j > 0; j--) {
                    if(!isVariantBlacklistedMale(component, j)) return j;
                }
            }
        }
    }
    return 0;
}

function isVariantBlacklistedFemale(comp, draw){
    if (blacklist_items === false)
        return false;

    const item = blacklisted_female_comp.find(item => { return (item[0] === comp && item[1] === draw); });
    let found = true;
    if(item === undefined || item === null) found = false;
    return found;
}

function isVariantBlacklistedMale(comp, draw){
    if (blacklist_items === false)
        return false;

    const item = blacklisted_male_comp.find(item => { return (item[0] === comp && item[1] === draw); });
    let found = true;
    if(item === undefined || item === null) found = false;
    return found;
}
}ç