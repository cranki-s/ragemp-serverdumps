{
const fathers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 42, 43, 44];
const mothers = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 45];
const fatherNames = ["Benjamin", "Daniel", "Joshua", "Noah", "Andrew", "Juan", "Alex", "Isaac", "Evan", "Ethan", "Vincent", "Angel", "Diego", "Adrian", "Gabriel", "Michael", "Santiago", "Kevin", "Louis", "Samuel", "Anthony", "Claude", "Niko", "John"];
const motherNames = ["Hannah", "Aubrey", "Jasmine", "Gisele", "Amelia", "Isabella", "Zoe", "Ava", "Camila", "Violet", "Sophia", "Evelyn", "Nicole", "Ashley", "Gracie", "Brianna", "Natalie", "Olivia", "Elizabeth", "Charlotte", "Emma", "Misty"];
const featureNames = ["Nose Width", "Nose Bottom Height", "Nose Tip Length", "Nose Bridge Depth", "Nose Tip Height", "Nose Broken", "Brow Height", "Brow Depth", "Cheekbone Height", "Cheekbone Width", "Cheek Depth", "Eye Size", "Lip Thickness", "Jaw Width", "Jaw Shape", "Chin Height", "Chin Depth", "Chin Width", "Chin Indent", "Neck Width"];
const appearanceNames = ["Blemishes", "Facial Hair", "Eyebrows", "Ageing", "Makeup", "Blush", "Complexion", "Sun Damage", "Lipstick", "Moles & Freckles", "Chest Hair"];

const appearanceItemNames = [
    // blemishes
    ["None", "Measles", "Pimples", "Spots", "Break Out", "Blackheads", "Build Up", "Pustules", "Zits", "Full Acne", "Acne", "Cheek Rash", "Face Rash", "Picker", "Puberty", "Eyesore", "Chin Rash", "Two Face", "T Zone", "Greasy", "Marked", "Acne Scarring", "Full Acne Scarring", "Cold Sores", "Impetigo"],
    // facial hair
    ["None", "Light Stubble", "Balbo", "Circle Beard", "Goatee", "Chin", "Chin Fuzz", "Pencil Chin Strap", "Scruffy", "Musketeer", "Mustache", "Trimmed Beard", "Stubble", "Thin Circle Beard", "Horseshoe", "Pencil and 'Chops", "Chin Strap Beard", "Balbo and Sideburns", "Mutton Chops", "Scruffy Beard", "Curly", "Curly & Deep Stranger", "Handlebar", "Faustic", "Otto & Patch", "Otto & Full Stranger", "Light Franz", "The Hampstead", "The Ambrose", "Lincoln Curtain"],
    // eyebrows
    ["None", "Balanced", "Fashion", "Cleopatra", "Quizzical", "Femme", "Seductive", "Pinched", "Chola", "Triomphe", "Carefree", "Curvaceous", "Rodent", "Double Tram", "Thin", "Penciled", "Mother Plucker", "Straight and Narrow", "Natural", "Fuzzy", "Unkempt", "Caterpillar", "Regular", "Mediterranean", "Groomed", "Bushels", "Feathered", "Prickly", "Monobrow", "Winged", "Triple Tram", "Arched Tram", "Cutouts", "Fade Away", "Solo Tram"],
    // ageing
    ["None", "Crow's Feet", "First Signs", "Middle Aged", "Worry Lines", "Depression", "Distinguished", "Aged", "Weathered", "Wrinkled", "Sagging", "Tough Life", "Vintage", "Retired", "Junkie", "Geriatric"],
    // makeup
    ["None", "Smoky Black", "Bronze", "Soft Gray", "Retro Glam", "Natural Look", "Cat Eyes", "Chola", "Vamp", "Vinewood Glamour", "Bubblegum", "Aqua Dream", "Pin Up", "Purple Passion", "Smoky Cat Eye", "Smoldering Ruby", "Pop Princess"],
    // blush
    ["None", "Full", "Angled", "Round", "Horizontal", "High", "Sweetheart", "Eighties"],
    // complexion
    ["None", "Rosy Cheeks", "Stubble Rash", "Hot Flush", "Sunburn", "Bruised", "Alchoholic", "Patchy", "Totem", "Blood Vessels", "Damaged", "Pale", "Ghostly"],
    // sun damage
    ["None", "Uneven", "Sandpaper", "Patchy", "Rough", "Leathery", "Textured", "Coarse", "Rugged", "Creased", "Cracked", "Gritty"],
    // lipstick
    ["None", "Color Matte", "Color Gloss", "Lined Matte", "Lined Gloss", "Heavy Lined Matte", "Heavy Lined Gloss", "Lined Nude Matte", "Liner Nude Gloss", "Smudged", "Geisha"],
    // freckles
    ["None", "Cherub", "All Over", "Irregular", "Dot Dash", "Over the Bridge", "Baby Doll", "Pixie", "Sun Kissed", "Beauty Marks", "Line Up", "Modelesque", "Occasional", "Speckled", "Rain Drops", "Double Dip", "One Sided", "Pairs", "Growth"],
    // chest hair
    ["None", "Natural", "The Strip", "The Tree", "Hairy", "Grisly", "Ape", "Groomed Ape", "Bikini", "Lightning Bolt", "Reverse Lightning", "Love Heart", "Chestache", "Happy Face", "Skull", "Snail Trail", "Slug and Nips", "Hairy Arms"]
];

const hairList = [
    [
       {
          "ID":0
       },
       {
          "ID":1
       },
       {
          "ID":2
       },
       {
          "ID":3
       },
       {
          "ID":4
       },
       {
          "ID":5
       },
       {
          "ID":6
       },
       {
          "ID":7
       },
       {
          "ID":8
       },
       {
          "ID":9
       },
       {
          "ID":10
       },
       {
          "ID":11
       },
       {
          "ID":12
       },
       {
          "ID":13
       },
       {
          "ID":14
       },
       {
          "ID":15
       },
       {
          "ID":16
       },
       {
          "ID":17
       },
       {
          "ID":18
       },
       {
          "ID":19
       },
       {
          "ID":20
       },
       {
          "ID":21
       },
       {
          "ID":22
       },
       {
          "ID":24
       },
       {
          "ID":25
       },
       {
          "ID":26
       },
       {
          "ID":27
       },
       {
          "ID":28
       },
       {
          "ID":29
       },
       {
          "ID":30
       },
       {
          "ID":31
       },
       {
          "ID":32
       },
       {
          "ID":33
       },
       {
          "ID":34
       },
       {
          "ID":35
       },
       {
          "ID":36
       },
       {
          "ID":37
       },
       {
          "ID":38
       },
       {
          "ID":39
       },
       {
          "ID":40
       },
       {
          "ID":41
       },
       {
          "ID":42
       },
       {
          "ID":43
       },
       {
          "ID":44
       },
       {
          "ID":45
       },
       {
          "ID":46
       },
       {
          "ID":47
       },
       {
          "ID":48
       },
       {
          "ID":49
       },
       {
          "ID":50
       },
       {
          "ID":51
       },
       {
          "ID":52
       },
       {
          "ID":53
       },
       {
          "ID":54
       },
       {
          "ID":55
       },
       {
          "ID":56
       },
       {
          "ID":57
       },
       {
          "ID":58
       },
       {
          "ID":59
       },
       {
          "ID":60
       },
       {
          "ID":61
       },
       {
          "ID":62
       },
       {
          "ID":63
       },
       {
          "ID":64
       },
       {
          "ID":65
       },
       {
          "ID":66
       },
       {
          "ID":67
       },
       {
          "ID":68
       },
       {
          "ID":69
       },
       {
          "ID":70
       },
       {
          "ID":71
       },
       {
          "ID":72
       },
       {
          "ID":73
       },
       {
          "ID":74
       },
       {
          "ID":75
       },
       {
          "ID":76
       }
    ],
    // female
    [
        {
           "ID":0
        },
        {
           "ID":1
        },
        {
           "ID":2
        },
        {
           "ID":3
        },
        {
           "ID":4
        },
        {
           "ID":5
        },
        {
           "ID":6
        },
        {
           "ID":7
        },
        {
           "ID":8
        },
        {
           "ID":9
        },
        {
           "ID":10
        },
        {
           "ID":11
        },
        {
           "ID":12
        },
        {
           "ID":13
        },
        {
           "ID":14
        },
        {
           "ID":15
        },
        {
           "ID":16
        },
        {
           "ID":17
        },
        {
           "ID":18
        },
        {
           "ID":19
        },
        {
           "ID":20
        },
        {
           "ID":21
        },
        {
           "ID":22
        },
        {
           "ID":23
        },
        {
           "ID":25
        },
        {
           "ID":26
        },
        {
           "ID":27
        },
        {
           "ID":28
        },
        {
           "ID":29
        },
        {
           "ID":30
        },
        {
           "ID":31
        },
        {
           "ID":32
        },
        {
           "ID":33
        },
        {
           "ID":34
        },
        {
           "ID":35
        },
        {
           "ID":36
        },
        {
           "ID":37
        },
        {
           "ID":38
        },
        {
           "ID":39
        },
        {
           "ID":40
        },
        {
           "ID":41
        },
        {
           "ID":42
        },
        {
           "ID":43
        },
        {
           "ID":44
        },
        {
           "ID":45
        },
        {
           "ID":46
        },
        {
           "ID":47
        },
        {
           "ID":48
        },
        {
           "ID":49
        },
        {
           "ID":50
        },
        {
           "ID":51
        },
        {
           "ID":52
        },
        {
           "ID":53
        },
        {
           "ID":54
        },
        {
           "ID":55
        },
        {
           "ID":56
        },
        {
           "ID":57
        },
        {
           "ID":58
        },
        {
           "ID":59
        },
        {
           "ID":60
        },
        {
           "ID":61
        },
        {
           "ID":62
        },
        {
           "ID":63
        },
        {
           "ID":64
        },
        {
           "ID":65
        },
        {
           "ID":66
        },
        {
           "ID":67
        },
        {
           "ID":68
        },
        {
           "ID":69
        },
        {
           "ID":70
        },
        {
           "ID":71
        },
        {
           "ID":72
        },
        {
           "ID":73
        },
        {
           "ID":74
        },
        {
           "ID":75
        },
        {
           "ID":76
        },
        {
           "ID":77
        },
        {
           "ID":78
        },
        {
           "ID":79
        },
        {
           "ID":80
        }
    ]
];

const eyeColors = ["Green", "Emerald", "Light Blue", "Ocean Blue", "Light Brown", "Dark Brown", "Hazel", "Dark Gray", "Light Gray", "Pink", "Yellow", "Purple", "Blackout", "Shades of Gray", "Tequila Sunrise", "Atomic", "Warp", "ECola", "Space Ranger", "Ying Yang", "Bullseye", "Lizard", "Dragon", "Extra Terrestrial", "Goat", "Smiley", "Possessed", "Demon", "Infected", "Alien", "Undead", "Zombie"];

exports = {
    fathers: fathers,
    mothers: mothers,
    fatherNames: fatherNames,
    motherNames: motherNames,
    featureNames: featureNames,
    appearanceNames: appearanceNames,
    appearanceItemNames: appearanceItemNames,
    hairList: hairList,
    eyeColors: eyeColors,
    maxHairColor: 64,
    maxEyeColor: 32,
    maxBlushColor: 27,
    maxLipstickColor: 32
};
}