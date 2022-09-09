{

///* --------------------------------------------------------------------------------
// * sacararma.js
// *
// *
// *
// * Descripción: Script para la animación de sacar y guardar el arma
// *
// * -------------------------------------------------------------------------------- */

// Vamos a declarar la lista de armas. Si no está declarado aquí, usará el sistema nativo del GTA.
// Holster: Nos indica si se puede guardar en un holster. Si está en un holster, se sacará mucho más rápido el arma.
var guardado = true;
var bloqueado = false;
var mostrarArma = false;
/* Categorias:
0 - Cuerpo a cuerpo
1 - Pistolas
2 - Ametralladoras ligeras
3 - Rifles de asalto
4 - Rifles de francotirador
5 - Escopetas
6 - Armas pesadas
7 - Lanzables
8 - Paracaídas
*/
var listaArmas = {
    // PISTOLAS (Entre "" poner el tipoObjeto de nuestra bd 8 = Pistola y añadir el tipo de cargador Cargador pistola = 1741) **HACER TODOS ASÍ**
    "0": {
        nombre: "Desarmado",
        holster: false,
        ignorar: false,
        categoria: 0,
        tipoCargador: 0,
        imagen: 'unarmed',
        hash: '0'
    },
    "2": {
        nombre: "Fusil de francotirador",
        holster: false,
        ignorar: false,
        categoria: 4,
        tipoCargador: 1757,
        imagen: 'sniperrifle',
        hash: '0x5FC3C11'
    },
    "3": {
        nombre: "Extintor",
        holster: false,
        ignorar: false,
        categoria: 7,
        tipoCargador: 0,
        imagen: "fireextinguisher",
        hash: "0x60EC506"
    },
    "4": {
        nombre: "Pistola vintage",
        holster: true,
        ignorar: false,
        categoria: 1,
        tipoCargador: 1748,
        imagen: "vintagepistol",
        hash: "0x83839C4"
    },
    "5": {
        nombre: "ADP de combate",
        holster: false,
        ignorar: false,
        categoria: 2,
        tipoCargador: 1770,
        imagen: "combatpdw",
        hash: "0xA3D4D34"
    },
    "6": {
        nombre: "Fusil de francotirador pesado",
        holster: false,
        ignorar: false,
        categoria: 4,
        tipoCargador: 1758,
        imagen: "heavysniper",
        hash: "0xC472FE2"
    },
    "7": {
        nombre: "Microsubfusil",
        holster: false,
        ignorar: false,
        categoria: 2,
        tipoCargador: 1751,
        imagen: "microsmg",
        hash: "0x13532244"
    },
    "8": {
        nombre: "Pistola",
        holster: true,
        ignorar: false,
        categoria: 1,
        tipoCargador: 1741,
        imagen: "pistol",
        hash: "0x1B06D571"
    },
    "9": {
        nombre: "Escopeta",
        holster: false,
        ignorar: false,
        categoria: 5,
        tipoCargador: 1724,
        imagen: "pumpshotgun",
        hash: "0x1D073A89"
    },
    "10": {
        nombre: "Pelota",
        holster: false,
        ignorar: false,
        categoria: 7,
        tipoCargador: 0,
        imagen: "ball",
        hash: "0x23C9F95C"
    },
    "11": {
        nombre: "Cóctel molotov",
        holster: false,
        ignorar: false,
        categoria: 7,
        tipoCargador: 0,
        imagen: "molotov",
        hash: "0x24B17070"
    },
    "12": {
        nombre: "Subfusil",
        holster: false,
        ignorar: false,
        categoria: 2,
        tipoCargador: 1750,
        imagen: "smg",
        hash: "0x2BE6766B"
    },
    "13": {
        nombre: "Lata de combustible",
        holster: false,
        ignorar: false,
        categoria: 7,
        tipoCargador: 0,
        imagen: "petrolcan",
        hash: "0x34A67B97"
    },
    "14": {
        nombre: "Taser",
        holster: false,
        ignorar: false,
        categoria: 1,
        tipoCargador: 0,
        imagen: "stungun",
        hash: "0x3656C8C1"
    },
    "15": {
        nombre: "Escopeta pesada",
        holster: false,
        ignorar: false,
        categoria: 5,
        tipoCargador: 1766,
        imagen: "heavyshotgun",
        hash: "0x3AABBBAA"
    },
    "16": {
        nombre: "Palo de golf",
        holster: false,
        ignorar: false,
        categoria: 0,
        tipoCargador: 0,
        imagen: "golfclub",
        hash: "0x440E4788"
    },
    "17": {
        nombre: "Pistola de bengalas",
        holster: true,
        ignorar: false,
        categoria: 1,
        tipoCargador: 1963,
        imagen: "flaregun",
        hash: "0x47757124"
    },
    "18": {
        nombre: "Bengala",
        holster: false,
        ignorar: false,
        categoria: 7,
        tipoCargador: 0,
        imagen: "flare",
        hash: "0x497FACC3"
    },
    "19": {
        nombre: "Martillo",
        holster: false,
        ignorar: false,
        categoria: 0,
        tipoCargador: 0,
        imagen: "hammer",
        hash: "0x4E875F73"
    },
    "20": {
        nombre: "Pistola de combate",
        holster: true,
        ignorar: false,
        categoria: 1,
        tipoCargador: 1743,
        imagen: "combatpistol",
        hash: "0x5EF9FEC4"
    },
    "21": {
        nombre: "Gusenberg Sweeper",
        holster: false,
        ignorar: false,
        categoria: 2,
        tipoCargador: 1787,
        imagen: "gusenberg",
        hash: "0x61012683"
    },
    "22": {
        nombre: "Porra policial",
        holster: false,
        ignorar: false,
        categoria: 0,
        tipoCargador: 0,
        imagen: "nightstick",
        hash: "0x678B81B1"
    },
    "23": {
        nombre: "Escopeta recortada",
        holster: false,
        ignorar: false,
        categoria: 5,
        tipoCargador: 1835,
        imagen: "sawnoffshotgun",
        hash: "0x7846A318"
    },
    "24": {
        nombre: "Fusil Bullpup",
        holster: false,
        ignorar: false,
        categoria: 3,
        tipoCargador: 1762,
        imagen: "bullpuprifle",
        hash: "0x7F229F94"
    },
    "26": {
        nombre: "Ametralladora de combate",
        holster: false,
        ignorar: false,
        categoria: 3,
        tipoCargador: 1760,
        imagen: "combatmg",
        hash: "0x7FD62962"
    },
    "27": {
        nombre: "Carabina",
        holster: false,
        ignorar: false,
        categoria: 3,
        tipoCargador: 1788,
        imagen: "carbinerifle",
        hash: "0x83BF0278"

    },
    "28": {
        nombre: "Palanca",
        holster: false,
        ignorar: false,
        categoria: 0,
        tipoCargador: 0,
        imagen: "crowbar",
        hash: "0x84BD7BFD"
    },
    "29": {
        nombre: "Linterna",
        holster: false,
        ignorar: false,
        categoria: 0,
        tipoCargador: 0,
        imagen: "flashlight",
        hash: "0x8BB05FD7"
    },
    "30": {
        nombre: "Daga",
        holster: false,
        ignorar: false,
        categoria: 0,
        tipoCargador: 0,
        imagen: "dagger",
        hash: "0x92A27487"
    },
    "31": {
        nombre: "Bate",
        holster: false,
        ignorar: false,
        categoria: 0,
        tipoCargador: 0,
        imagen: "bat",
        hash: "0x958A4A8F"
    },
    "32": {
        nombre: "Pistola de calibre 50",
        holster: true,
        ignorar: false,
        categoria: 1,
        tipoCargador: 1744,
        imagen: "pistol50",
        hash: "0x99AEEB3B"
    },
    "33": {
        nombre: "Cuchillo",
        holster: false,
        ignorar: false,
        categoria: 0,
        tipoCargador: 0,
        imagen: "knife",
        hash: "0x99B507EA"
    },
    "34": {
        nombre: "Llave inglesa",
        holster: false,
        ignorar: false,
        categoria: 0,
        tipoCargador: 0,
        imagen: "wrench",
        hash: "0x19044EE0"
    },
    "35": {
        nombre: "Escopeta Bullpup",
        holster: false,
        ignorar: false,
        categoria: 5,
        tipoCargador: 1839,
        imagen: "bullpupshotgun",
        hash: "0x9D61E50F"
    },

    "36": {
        nombre: "Gas lacrimógeno",
        holster: false,
        ignorar: false,
        categoria: 7,
        tipoCargador: 0,
        imagen: "bzgas",
        hash: "0xA0973D5E"
    },
    "37": {
        nombre: "Mosquete",
        holster: false,
        ignorar: false,
        categoria: 4,
        tipoCargador: 1857,
        imagen: "musket",
        hash: "0xA89CB99E"
    },
    "38": {
        nombre: "Fusil avanzado",
        holster: false,
        ignorar: false,
        categoria: 3,
        tipoCargador: 1756,
        imagen: "advancedrifle",
        hash: "0xAF113F99"
    },
    "39": {
        nombre: "Pistola cutre",
        holster: true,
        ignorar: false,
        categoria: 1,
        tipoCargador: 1745,
        imagen: "snspistol",
        hash: "0xBFD21232"
    },
    "40": {
        nombre: "Fusil de asalto",
        holster: false,
        ignorar: false,
        categoria: 3,
        tipoCargador: 1754,
        imagen: "assaultrifle",
        hash: "0xBFEFFF6D"
    },
    "41": {
        nombre: "Carabina especial",
        holster: false,
        ignorar: false,
        categoria: 3,
        tipoCargador: 1761,
        imagen: "specialcarbine",
        hash: "0xC0A3098D"

    },
    "42": {
        nombre: "Fusil de tirador",
        holster: false,
        ignorar: false,
        categoria: 4,
        tipoCargador: 1767,
        imagen: "heavysniper",
        hash: "0xC472FE2"
    },
    "43": {
        nombre: "Pistola pesada",
        holster: true,
        ignorar: false,
        categoria: 1,
        tipoCargador: 1746,
        imagen: "heavypistol",
        hash: "0xD205520E"

    },
    "44": {
        nombre: "Machete",
        holster: false,
        ignorar: false,
        categoria: 0,
        tipoCargador: 0,
        imagen: "machete",
        hash: "0xDD5DF8D9"
    },
    "45": {
        nombre: "Escopeta de asalto",
        holster: false,
        ignorar: false,
        categoria: 5,
        tipoCargador: 1753,
        imagen: "assaultshotgun",
        hash: "0x5A96BA4"
    },
    "46": {
        nombre: "Subfusil de asalto",
        holster: false,
        ignorar: false,
        categoria: 2,
        tipoCargador: 1752,
        imagen: "assaultsmg",
        hash: "0x5A96BA4"
    },
    "47": {
        nombre: "Hacha",
        holster: false,
        ignorar: false,
        categoria: 0,
        tipoCargador: 0,
        imagen: "hatchet",
        hash: "0xF9DCBF2D"
    },
    "48": {
        nombre: "Botella rota",
        holster: false,
        ignorar: false,
        categoria: 0,
        tipoCargador: 0,
        imagen: "bottle",
        hash: "0xF9E6AA4B"
    },
    "49": {
        nombre: "Granada de humo",
        holster: false,
        ignorar: false,
        categoria: 7,
        tipoCargador: 0,
        imagen: "smokegrenade",
        hash: "0x4DD2DC56"
    },
    "50": {
        nombre: "Paracaídas",
        holster: false,
        ignorar: true,
        categoria: 8,
        tipoCargador: 0,
        imagen: "parachute",
        hash: "0xFBAB5776"
    },
    "184": {
        nombre: "C4",
        holster: false,
        ignorar: true,
        categoria: 7,
        tipoCargador: 0,
        imagen: "stickybomb",
        hash: "0x2C3731D9"


    },
    "214": {
        nombre: "Bola de nieve",
        holster: false,
        ignorar: false,
        categoria: 0,
        tipoCargador: 0,
        imagen: "snowball",
        hash: "0x787F0BB"
    },
    "215": {
        nombre: "Pistola perforante",
        holster: true,
        ignorar: false,
        categoria: 1,
        tipoCargador: 1742,
        imagen: "appistol",
        hash: "0x22D8FE39"
    },
    "217": {
        nombre: "Hacha de batalla",
        holster: false,
        ignorar: false,
        categoria: 0,
        tipoCargador: 0,
        imagen: "stone_hatchet",
        hash: "0x3813FC08"
    },
    "218": {
        nombre: "Taco de billar",
        holster: false,
        ignorar: false,
        categoria: 0,
        tipoCargador: 0,
        imagen: "poolcue",
        hash: "0x94117305"
    },
    "220": {
        nombre: "Mina de aproximación",
        holster: false,
        ignorar: false,
        categoria: 7,
        tipoCargador: 0,
        imagen: "proxmine",
        hash: "0xAB564B93"
    },
    "221": {
        nombre: "Granada",
        holster: false,
        ignorar: false,
        categoria: 7,
        tipoCargador: 0,
        imagen: "grenade",
        hash: "0x93E220BD"
    },
    "222": {
        nombre: "Mina con detonador",
        holster: false,
        ignorar: false,
        categoria: 7,
        tipoCargador: 0,
        imagen: "proxmine",
        hash: "0xAB564B93"
    },
    "223": {
        nombre: "Cañón de pirotecnia",
        holster: false,
        ignorar: false,
        categoria: 6,
        tipoCargador: 1965,
        imagen: "firework",
        hash: "0x7F7497E5"
    },
    "224": {
        nombre: "Lanzahumo",
        holster: false,
        ignorar: false,
        categoria: 7,
        tipoCargador: 1964,
        imagen: "smokegrenade",
        hash: "0xFDBC8A50"
    },
    "225": {
        nombre: "Lanzacohetes guiado",
        holster: false,
        ignorar: false,
        categoria: 6,
        tipoCargador: 1970,
        imagen: "hominglauncher",
        hash: "0x63AB0442"
    },
    "226": {
        nombre: "Lanzacohetes",
        holster: false,
        ignorar: false,
        categoria: 6,
        tipoCargador: 1966,
        imagen: "rpg",
        hash: "0xB1CA77B1"
    },
    "227": {
        nombre: "SMG MkII",
        holster: false,
        ignorar: false,
        categoria: 2,
        tipoCargador: 1782,
        imagen: "smg_mk2",
        hash: "0x78A97CD0"
    },
    "228": {
        nombre: "Ametralladora",
        holster: false,
        ignorar: false,
        categoria: 2,
        tipoCargador: 1759,
        imagen: "mg",
        hash: "0x7FD62962"
    },
    "229": {
        nombre: "Ametralladora rotatoria",
        holster: false,
        ignorar: false,
        categoria: 6,
        tipoCargador: 1967,
        imagen: "minigun",
        hash: "0x42BF8A85"
    },
    "231": {
        nombre: "Ametralladora pesada MkII",
        holster: false,
        ignorar: false,
        categoria: 3,
        tipoCargador: 1791,
        imagen: "combatmg_mk2",
        hash: "0xDBBD7280"
    },
    "232": {
        nombre: "Fusil compacto",
        holster: false,
        ignorar: false,
        categoria: 3,
        tipoCargador: 1771,
        imagen: "compactrifle",
        hash: "0x624FE830"
    },
    "233": {
        nombre: "Fusil de asalto MkII",
        holster: false,
        ignorar: false,
        categoria: 3,
        tipoCargador: 1781,
        imagen: "assaultrifle_mk2",
        hash: "0x394F415C"
    },
    "234": {
        nombre: "Carabina MkII",
        holster: false,
        ignorar: false,
        categoria: 3,
        tipoCargador: 1789,
        imagen: "carbinerifle_mk2",
        hash: "0xFAD1F1C9"
    },
    "235": {
        nombre: "Carabina especial MkII",
        holster: false,
        ignorar: false,
        categoria: 3,
        tipoCargador: 1764,
        imagen: "specialcarbine_mk2",
        hash: "0x969C3D67"
    },
    "236": {
        nombre: "Fusil Bullpup MkII",
        holster: false,
        ignorar: false,
        categoria: 3,
        tipoCargador: 1763,
        imagen: "bullpuprifle_mk2",
        hash: "0x84D6FAFD"
    },
    "237": {
        nombre: "Fusil de francotirador pesado MkII",
        holster: false,
        ignorar: false,
        categoria: 4,
        tipoCargador: 1783,
        imagen: "heavysniper_mk2",
        hash: "0xA914799"
    },
    "238": {
        nombre: "Fusil de tirador MkII",
        holster: false,
        ignorar: false,
        categoria: 4,
        tipoCargador: 1792,
        imagen: "marksmanrifle_mk2",
        hash: "0x6A6C02E0"
    },
    "239": {
        nombre: "Escopeta de dos cañones",
        holster: false,
        ignorar: false,
        categoria: 5,
        tipoCargador: 1837,
        imagen: "dbshotgun",
        hash: "0xEF951FBB"
    },
    "240": {
        nombre: "Escopeta de goma",
        holster: false,
        ignorar: false,
        categoria: 5,
        tipoCargador: 1961,
        imagen: "pumpshotgun_mk2",
        hash: "0x555AF99A"
    },
    "241": {
        nombre: "Fusil electromagnético",
        holster: false,
        ignorar: false,
        categoria: 6,
        tipoCargador: 1968,
        imagen: "railgun",
        hash: "0x6D544C99"
    },
    "242": {
        nombre: "Puño americano",
        holster: false,
        ignorar: false,
        categoria: 0,
        tipoCargador: 0,
        imagen: "knuckle",
        hash: "0xD8DF3C3C"
    },
    "243": {
        nombre: "Navaja",
        holster: false,
        ignorar: false,
        categoria: 0,
        tipoCargador: 0,
        imagen: "switchblade",
        hash: "0xDFE37640"
    },
    "244": {
        nombre: "Pistola de tirador",
        holster: true,
        ignorar: false,
        categoria: 1,
        tipoCargador: 1844,
        imagen: "marksmanpistol",
        hash: "0xDC4DB296"
    },
    "245": {
        nombre: "Revólver pesado",
        holster: false,
        ignorar: false,
        categoria: 1,
        tipoCargador: 1840,
        imagen: "revolver",
        hash: "0xC1B3C3D1"
    },
    "246": {
        nombre: "Revólver de doble acción",
        holster: false,
        ignorar: false,
        categoria: 1,
        tipoCargador: 1842,
        imagen: "doubleaction",
        hash: "0x97EA20B8"
    },
    "247": {
        nombre: "Pistola MkII",
        holster: true,
        ignorar: false,
        categoria: 1,
        tipoCargador: 1749,
        imagen: "pistol_mk2",
        hash: "0xBFE256D4"
    },
    "248": {
        nombre: "Pistola cutre MkII",
        holster: true,
        ignorar: false,
        categoria: 1,
        tipoCargador: 1747,
        imagen: "snspistol_mk2",
        hash: "0x88374054"
    },
    "249": {
        nombre: "Revólver MkII",
        holster: false,
        ignorar: false,
        categoria: 1,
        tipoCargador: 1841,
        imagen: "revolver_mk2",
        hash: "0xCB96392F"
    },
    "250": {
        nombre: "Pistola ametralladora",
        holster: true,
        ignorar: false,
        categoria: 2,
        tipoCargador: 1772,
        imagen: "machinepistol",
        hash: "0xDB1AA450"
    },
    "251": {
        nombre: "Minisubfusil",
        holster: false,
        ignorar: false,
        categoria: 2,
        tipoCargador: 1780,
        imagen: "minismg",
        hash: "0xBD248B55"
    },
    "252": {
        nombre: "Escopeta Sweeper",
        holster: false,
        ignorar: false,
        categoria: 5,
        tipoCargador: 1836,
        imagen: "autoshotgun",
        hash: "0x12E82D3D"
    },
    "253": {
        nombre: "Lanzagranadas compacto",
        holster: false,
        ignorar: false,
        categoria: 6,
        tipoCargador: 1971,
        imagen: "compactlauncher",
        hash: "0x781FE4A"
    },
    "254": {
        nombre: "Granada casera",
        holster: false,
        ignorar: false,
        categoria: 7,
        tipoCargador: 0,
        imagen: "pipebomb",
        hash: "0xBA45E8B8"
    },
    "465": {
        nombre: "Palo de golf (Purga)",
        holster: false,
        ignorar: false,
        categoria: 0,
        tipoCargador: 0,
        imagen: "golfclub",
        hash: "0x440E4788"
    },
    "466": {
        nombre: "Martillo (Purga)",
        holster: false,
        ignorar: false,
        categoria: 0,
        tipoCargador: 0,
        imagen: "hammer",
        hash: "0x4E875F73"
    },
    "467": {
        nombre: "Porra policial (Purga)",
        holster: false,
        ignorar: false,
        categoria: 0,
        tipoCargador: 0,
        imagen: "nightstick",
        hash: "0x678B81B1"
    },
    "468": {
        nombre: "Palanca (Purga)",
        holster: false,
        ignorar: false,
        categoria: 0,
        tipoCargador: 0,
        imagen: "crowbar",
        hash: "0x84BD7BFD"
    },
    "469": {
        nombre: "Linterna (Purga)",
        holster: false,
        ignorar: false,
        categoria: 0,
        tipoCargador: 0,
        imagen: "flashlight",
        hash: "0x8BB05FD7"
    },
    "470": {
        nombre: "Daga (Purga)",
        holster: false,
        ignorar: false,
        categoria: 0,
        tipoCargador: 0,
        imagen: "dagger",
        hash: "0x92A27487"
    },
    "471": {
        nombre: "Bate (Purga)",
        holster: false,
        ignorar: false,
        categoria: 0,
        tipoCargador: 0,
        imagen: "bat",
        hash: "0x958A4A8F"
    },
    "472": {
        nombre: "Cuchillo (Purga)",
        holster: false,
        ignorar: false,
        categoria: 0,
        tipoCargador: 0,
        imagen: "knife",
        hash: "0x99B507EA"
    },
    "473": {
        nombre: "Llave inglesa (Purga)",
        holster: false,
        ignorar: false,
        categoria: 0,
        tipoCargador: 0,
        imagen: "wrench",
        hash: "0x19044EE0"
    },
    "474": {
        nombre: "Machete (Purga)",
        holster: false,
        ignorar: false,
        categoria: 0,
        tipoCargador: 0,
        imagen: "machete",
        hash: "0xDD5DF8D9"
    },
    "475": {
        nombre: "Hacha (Purga)",
        holster: false,
        ignorar: false,
        categoria: 0,
        tipoCargador: 0,
        imagen: "hatchet",
        hash: "0xF9DCBF2D"
    },
    "476": {
        nombre: "Hacha de batalla (Purga)",
        holster: false,
        ignorar: false,
        categoria: 0,
        tipoCargador: 0,
        imagen: "stone_hatchet",
        hash: "0x3813FC08"
    },
    "477": {
        nombre: "Taco de billar (Purga)",
        holster: false,
        ignorar: false,
        categoria: 0,
        tipoCargador: 0,
        imagen: "poolcue",
        hash: "0x94117305"
    },
    "478": {
        nombre: "Puño americano (Purga)",
        holster: false,
        ignorar: false,
        categoria: 0,
        tipoCargador: 0,
        imagen: "knuckle",
        hash: "0xD8DF3C3C"
    },
    "479": {
        nombre: "Navaja (Purga)",
        holster: false,
        ignorar: false,
        categoria: 0,
        tipoCargador: 0,
        imagen: "switchblade",
        hash: "0xDFE37640"
    },
    "480": {
        nombre: "Fusil de francotirador (Purga)",
        holster: false,
        ignorar: false,
        categoria: 3,
        tipoCargador: 480,
        imagen: "sniperrifle",
        hash: "0x5FC3C11"
    },
    "481": {
        nombre: "Pistola vintage (Purga)",
        holster: true,
        ignorar: false,
        categoria: 1,
        tipoCargador: 1748,
        imagen: "vintagepistol",
        hash: "0x83839C4"
    },
    "482": {
        nombre: "ADP de combate (Purga)",
        holster: false,
        ignorar: false,
        categoria: 2,
        tipoCargador: 1770,
        imagen: "combatpdw",
        hash: "0xA3D4D34"
    },
    "483": {
        nombre: "Fusil de francotirador pesado (Purga)",
        holster: false,
        ignorar: false,
        categoria: 3,
        tipoCargador: 1758,
        imagen: "heavysniper",
        hash: "0xC472FE2"
    },
    "484": {
        nombre: "Microsubfusil (Purga)",
        holster: false,
        ignorar: false,
        categoria: 2,
        tipoCargador: 1751,
        imagen: "microsmg",
        hash: "0x13532244"
    },
    "485": {
        nombre: "Pistola (Purga)",
        holster: true,
        ignorar: false,
        categoria: 1,
        tipoCargador: 1741,
        imagen: "pistol",
        hash: "0x1B06D571"
    },
    "486": {
        nombre: "Escopeta (Purga)",
        holster: false,
        ignorar: false,
        categoria: 5,
        tipoCargador: 1845,
        imagen: "pumpshotgun",
        hash: "0x1D073A89"
    },
    "487": {
        nombre: "SMG (Purga)",
        holster: false,
        ignorar: false,
        categoria: 2,
        tipoCargador: 1750,
        imagen: "smg",
        hash: "0x2BE6766B"
    },
    "488": {
        nombre: "Taser (Purga)",
        holster: false,
        ignorar: false,
        categoria: 1,
        tipoCargador: 0,
        imagen: "stungun",
        hash: "0x3656C8C1"
    },

    "489": {
        nombre: "Escopeta pesada (Purga)",
        holster: false,
        ignorar: false,
        categoria: 5,
        tipoCargador: 1766,
        imagen: "heavyshotgun",
        hash: "0x3AABBBAA"
    },
    "490": {
        nombre: "Pistola de bengalas (Purga)",
        holster: true,
        ignorar: false,
        categoria: 1,
        tipoCargador: 1763,
        imagen: "flaregun",
        hash: "0x47757124"
    },
    "491": {
        nombre: "Pistola de combate (Purga)",
        holster: true,
        ignorar: false,
        categoria: 1,
        tipoCargador: 1743,
        imagen: "combatpistol",
        hash: "0x5EF9FEC4"
    },
    "492": {
        nombre: "Gusenberg (Purga)",
        holster: false,
        ignorar: false,
        categoria: 2,
        tipoCargador: 1787,
        imagen: "gusenberg",
        hash: "0x61012683"
    },
    "493": {
        nombre: "Escopeta recortada (Purga)",
        holster: false,
        ignorar: false,
        categoria: 5,
        tipoCargador: 1835,
        imagen: "sawnoffshotgun",
        hash: "0x7846A318"
    },
    "494": {
        nombre: "Fusil bullpup (Purga)",
        holster: false,
        ignorar: false,
        categoria: 3,
        tipoCargador: 1762,
        imagen: "bullpuprifle",
        hash: "0x7F229F94"
    },
    "495": {
        nombre: "Ametralladora de combate (Purga)",
        holster: false,
        ignorar: false,
        categoria: 3,
        tipoCargador: 1760,
        imagen: "combatmg",
        hash: "0x7FD62962"
    },
    "496": {
        nombre: "Carabina",
        holster: false,
        ignorar: false,
        categoria: 3,
        tipoCargador: 1788,
        imagen: "carbinerifle",
        hash: "0x83BF0278"
    },
    "497": {
        nombre: "Desert Eagle (Purga)",
        holster: false,
        ignorar: false,
        categoria: 1,
        tipoCargador: 1744,
        imagen: "pistol50",
        hash: "0x99AEEB3B"
    },
    "498": {
        nombre: "Escopeta Bullpup (Purga)",
        holster: false,
        ignorar: false,
        categoria: 5,
        tipoCargador: 1839,
        imagen: "bullpupshotgun",
        hash: "0x9D61E50F"
    },
    "499": {
        nombre: "Mosquete (Purga)",
        holster: false,
        ignorar: false,
        categoria: 4,
        tipoCargador: 1857,
        imagen: "musket",
        hash: "0xA89CB99E"
    },
    "500": {
        nombre: "Fusil avanzado (Purga)",
        holster: false,
        ignorar: false,
        categoria: 3,
        tipoCargador: 1756,
        imagen: "advancedrifle",
        hash: "0xAF113F99"
    },
    "501": {
        nombre: "Pistola cutre (Purga)",
        holster: true,
        ignorar: false,
        categoria: 1,
        tipoCargador: 1745,
        imagen: "snspistol",
        hash: "0xBFD21232"
    },
    "502": {
        nombre: "Fusil de asalto (Purga)",
        holster: false,
        ignorar: false,
        categoria: 3,
        tipoCargador: 1754,
        imagen: "assaultrifle",
        hash: "0xBFEFFF6D"
    },
    "503": {
        nombre: "Carabina especial (Purga)",
        holster: false,
        ignorar: false,
        categoria: 3,
        tipoCargador: 1761,
        imagen: "specialcarbine",
        hash: "0xC0A3098D"
    },
    "504": {
        nombre: "Fusil de francotirador pesado (Purga)",
        holster: false,
        ignorar: false,
        categoria: 4,
        tipoCargador: 1767,
        imagen: "heavysniper",
        hash: "0xC472FE2"
    },
    "505": {
        nombre: "Pistola pesada (Purga)",
        holster: true,
        ignorar: false,
        categoria: 1,
        tipoCargador: 1746,
        imagen: "heavypistol",
        hash: "0xD205520E"
    },
    "506": {
        nombre: "Escopeta de asalto (Purga)",
        holster: false,
        ignorar: false,
        categoria: 5,
        tipoCargador: 1753,
        imagen: "assaultshotgun",
        hash: "0x5A96BA4"
    },
    "507": {
        nombre: "Subfusil de asalto (Purga)",
        holster: false,
        ignorar: false,
        categoria: 2,
        tipoCargador: 1752,
        imagen: "assaultsmg",
        hash: "0x5A96BA4"
    },
    "508": {
        nombre: "Pistola perforante (Purga)",
        holster: false,
        ignorar: false,
        categoria: 1,
        tipoCargador: 1742,
        imagen: "appistol",
        hash: "0x22D8FE39"
    },
    "509": {
        nombre: "Cañón de pirotecnia (Purga)",
        holster: false,
        ignorar: false,
        categoria: 6,
        tipoCargador: 1765,
        imagen: "firework",
        hash: "0x7F7497E5"
    },
    "510": {
        nombre: "Lanzacohetes guiado (Purga)",
        holster: false,
        ignorar: false,
        categoria: 4,
        tipoCargador: 1970,
        imagen: "hominglauncher",
        hash: "0x63AB0442"
    },
    "511": {
        nombre: "Lanzacohetes (Purga)",
        holster: false,
        ignorar: false,
        categoria: 6,
        tipoCargador: 1966,
        imagen: "rpg",
        hash: "0xB1CA77B1"
    },
    "512": {
        nombre: "Ametralladora (Purga)",
        holster: false,
        ignorar: false,
        categoria: 2,
        tipoCargador: 1759,
        imagen: "mg",
        hash: "0x7FD62962"
    },
    "513": {
        nombre: "Ametralladora rotatoria (Purga)",
        holster: false,
        ignorar: false,
        categoria: 6,
        tipoCargador: 1967,
        imagen: "minigun",
        hash: "0x42BF8A85"
    },
    "514": {
        nombre: "Fusil compacto (Purga)",
        holster: false,
        ignorar: false,
        categoria: 3,
        tipoCargador: 1771,
        imagen: "compactrifle",
        hash: "0x624FE830"
    },
    "515": {
        nombre: "Escopeta recortada (Purga)",
        holster: false,
        ignorar: false,
        categoria: 5,
        tipoCargador: 1835,
        imagen: "sawnoffshotgun",
        hash: "0x7846A318"
    },
    "516": {
        nombre: "Railgun (Purga)",
        holster: false,
        ignorar: false,
        categoria: 6,
        tipoCargador: 1968,
        imagen: "railgun",
        hash: "0x6D544C99"
    },
    "517": {
        nombre: "Navaja (Purga)",
        holster: false,
        ignorar: false,
        categoria: 0,
        tipoCargador: 0,
        imagen: "switchblade",
        hash: "0xDFE37640"
    },
    "518": {
        nombre: "Pistola de tirador (Purga)",
        holster: true,
        ignorar: false,
        categoria: 1,
        tipoCargador: 1844,
        imagen: "marksmanpistol",
        hash: "0xDC4DB296"
    },
    "519": {
        nombre: "Revólver (Purga)",
        holster: false,
        ignorar: false,
        categoria: 1,
        tipoCargador: 1840,
        imagen: "revolver",
        hash: "0xC1B3C3D1"
    },
    "520": {
        nombre: "Pistola ametralladora (Purga)",
        holster: false,
        ignorar: false,
        categoria: 2,
        tipoCargador: 1751,
        imagen: "machinepistol",
        hash: "0x13532244"
    },
    "521": {
        nombre: "Minisubfusil (Purga)",
        holster: false,
        ignorar: false,
        categoria: 2,
        tipoCargador: 1780,
        imagen: "minismg",
        hash: "0xBD248B55"
    },
    "522": {
        nombre: "Escopeta Sweeper (Purga)",
        holster: false,
        ignorar: false,
        categoria: 5,
        tipoCargador: 1836,
        imagen: "autoshotgun",
        hash: "0x12E82D3D"
    },
    "523": {
        nombre: "Lanzagranadas compacto (Purga)",
        holster: false,
        ignorar: false,
        categoria: 6,
        tipoCargador: 1971,
        imagen: "compactlauncher",
        hash: "0x781FE4A"
    },
    "793": {
        nombre: "Viuda negra",
        holster: false,
        ignorar: false,
        categoria: 6,
        tipoCargador: 0, // NI SIQUIERA EXISTE
        imagen: "rayminigun", 
        hash: "0xB62D1F67" 
    },
    "794": {
        nombre: "Satanás del infierno",
        holster: false,
        ignorar: false,
        categoria: 3,
        tipoCargador: 0, // NI SIQUIERA EXISTE
        imagen: "raycarbine",
        hash: "0x476BF155"
    },
    "1089": {
        nombre: "Lanzagranadas",
        holster: false,
        ignorar: false,
        categoria: 6,
        tipoCargador: 1969,
        imagen: "grenadelauncher",
        hash: "0xA284510B"
    },
    "1090": {
        nombre: "Hacha de piedra",
        holster: false,
        ignorar: false,
        categoria: 0,
        tipoCargador: 0,
        imagen: "stone_hatchet",
        hash: "0x3813FC08"
    },
    "1091": {
        nombre: "Bidón peligroso",
        holster: false,
        ignorar: false,
        categoria: 7,
        tipoCargador: 0,
        imagen: "hazardcan",
        hash: "0xBA536372"
    },
    "1092": {
        nombre: "Up-n-Atomizer",
        holster: false,
        ignorar: false,
        categoria: 1,
        tipoCargador: 0,
        imagen: "raypistol",
        hash: "0xAF3696A1"
    },
    "1093": {
        nombre: "Pistola de cerámica",
        holster: true,
        ignorar: false,
        categoria: 1,
        tipoCargador: 1769,
        imagen: "ceramicpistol",
        hash: "0x2B5EF5EC"
    },
    "1094": {
        nombre: "Revólver de la Marina",
        holster: false,
        ignorar: false,
        categoria: 1,
        tipoCargador: 1843,
        imagen: "navyrevolver",
        hash: "0x917F6C8C"
    },
    "1648": {
        nombre: "Revólver pesado MkII (Purga)",
        holster: false,
        ignorar: false,
        categoria: 1,
        tipoCargador: 1841,
        imagen: "revolver_mk2",
        hash: "0xCB96392F"
    },
    "1649": {
        nombre: "Pistola cutre MkII (Purga)",
        holster: true,
        ignorar: false,
        categoria: 1,
        tipoCargador: 1747,
        imagen: "snspistol_mk2",
        hash: "0x88374054"
    },
    "1650": {
        nombre: "Pistola MkII (Purga)",
        holster: true,
        ignorar: false,
        categoria: 1,
        tipoCargador: 1749,
        imagen: "pistol_mk2",
        hash: "0xBFE256D4"
    },
    "1651": {
        nombre: "Fusil de tirador MkII (Purga)",
        holster: false,
        ignorar: false,
        categoria: 3,
        tipoCargador: 1792,
        imagen: "marksmanrifle_mk2",
        hash: "0x6A6C02E0"
    },

    "1652": {
        nombre: "Fusil de francotirador pesado MkII (Purga)",
        holster: false,
        ignorar: false,
        categoria: 4,
        tipoCargador: 1783,
        imagen: "heavysniper_mk2",
        hash: "0xA914799"
    },
    "1653": {
        nombre: "Fusil Bullpup MkII (Purga)",
        holster: false,
        ignorar: false,
        categoria: 3,
        tipoCargador: 1763,
        imagen: "bullpuprifle_mk2",
        hash: "0x84D6FAFD"
    },
    "1654": {
        nombre: "Carabina especial MkII (Purga)",
        holster: false,
        ignorar: false,
        categoria: 3,
        tipoCargador: 1764,
        imagen: "specialcarbine_mk2",
        hash: "0x969C3D67"
    },
    "1655": {
        nombre: "Carabina MkII (Purga)",
        holster: false,
        ignorar: false,
        categoria: 3,
        tipoCargador: 1789,
        imagen: "carbinerifle_mk2",
        hash: "0xFAD1F1C9"
    },
    "1656": {
        nombre: "Fusil de asalto MkII (Purga)",
        holster: false,
        ignorar: false,
        categoria: 3,
        tipoCargador: 1781,
        imagen: "assaultrifle_mk2",
        hash: "0x394F415C"
    },
    "1657": {
        nombre: "SMG MkII (Purga)",
        holster: false,
        ignorar: false,
        categoria: 2,
        tipoCargador: 1782,
        imagen: "smg_mk2",
        hash: "0x78A97CD0"
    },
    "1658": {
        nombre: "Ametralladora pesada MkII (Purga)",
        holster: false,
        ignorar: false,
        categoria: 3,
        tipoCargador: 231,
        imagen: "combatmg_mk2",
        hash: "0xDBBD7280"
    },
    "1671": {
        nombre: "Revolver Pesado MK2 (Purga)",
        holster: false,
        ignorar: false,
        categoria: 1,
        tipoCargador: 1841,
        imagen: "revolver_mk2",
        hash: "0xCB96392F"
    },
    "1672": {
        nombre: "Pistola Perico (Purga)",
        holster: true,
        ignorar: false,
        categoria: 1,
        tipoCargador: 1723,
        imagen: "gadgetpistol",
        hash: "0x57A4368C"
    },
    "1673": {
        nombre: "Escopeta de combate (Purga)",
        holster: false,
        ignorar: false,
        categoria: 5,
        tipoCargador: 1849,
        imagen: "combatshotgun",
        hash: "0x5A96BA4"
    },
    "1674": {
        nombre: "Fusil Militar (Purga)",
        holster: false,
        ignorar: false,
        categoria: 3,
        tipoCargador: 1768,
        imagen: "militaryrifle",
        hash: "0x9D1F17E6"
    },
    "1675": {
        nombre: "Botella rota (Purga)",
        holster: false,
        ignorar: false,
        categoria: 0,
        tipoCargador: 0,
        imagen: "bottle",
        hash: "0xF9E6AA4B"
    },
    "1676": {
        nombre: "Hacha de piedra (Purga)",
        holster: false,
        ignorar: false,
        categoria: 0,
        tipoCargador: 0,
        imagen: "stone_hatchet",
        hash: "0x3813FC08"
    },
    "1677": {
        nombre: "Revólver de doble acción (Purga)",
        holster: false,
        ignorar: false,
        categoria: 1,
        tipoCargador: 1842,
        imagen: "doubleaction",
        hash: "0x97EA20B8"
    },
    "1678": {
        nombre: "Pistola de cerámica (Purga)",
        holster: false,
        ignorar: false,
        categoria: 1,
        tipoCargador: 1769,
        imagen: "ceramicpistol",
        hash: "0x2B5EF5EC"
    },
    "1679": {
        nombre: "Revólver de la Marina (Purga)",
        holster: false,
        ignorar: false,
        categoria: 1,
        tipoCargador: 1843,
        imagen: "navyrevolver",
        hash: "0x917F6C8C"
    },
    "1680": {
        nombre: "Escopeta de dos cañones (Purga)",
        holster: false,
        ignorar: false,
        categoria: 5,
        tipoCargador: 1837,
        imagen: "dbshotgun",
        hash: "0xEF951FBB"
    },
    "1681": {
        nombre: "Carabina (Purga)",
        holster: false,
        ignorar: false,
        categoria: 3,
        tipoCargador: 1788,
        imagen: "carbinerifle",
        hash: "0x83BF0278"
    },
    "1682": {
        nombre: "Granada (Purga)",
        holster: false,
        ignorar: false,
        categoria: 7,
        tipoCargador: 0,
        imagen: "grenade",
        hash: "0x93E220BD"
    },
    "1683": {
        nombre: "Gas lacrimógeno (Purga)",
        holster: false,
        ignorar: false,
        categoria: 7,
        tipoCargador: 0,
        imagen: "bzgas",
        hash: "0xA0973D5E"
    },
    "1684": {
        nombre: "Cóctel molotov (Purga)",
        holster: false,
        ignorar: false,
        categoria: 7,
        tipoCargador: 0,
        imagen: "molotov",
        hash: "0x24B17070"
    },
    "1685": {
        nombre: "Mina con detonador (Purga)",
        holster: false,
        ignorar: false,
        categoria: 7,
        tipoCargador: 0,
        imagen: "proxmine",
        hash: "0xAB564B93"
    },
    "1686": {
        nombre: "Mina de aproximación (Purga)",
        holster: false,
        ignorar: false,
        categoria: 7,
        tipoCargador: 0,
        imagen: "proxmine",
        hash: "0xAB564B93"
    },
    "1687": {
        nombre: "Bomba casera (Purga)",
        holster: false,
        ignorar: false,
        categoria: 7,
        tipoCargador: 0,
        imagen: "pipebomb",
        hash: "0xBA45E8B8"
    },
    "1688": {
        nombre: "Granada de humo (Purga)",
        holster: false,
        ignorar: false,
        categoria: 7,
        tipoCargador: 0,
        imagen: "smokegrenade",
        hash: "0x4DD2DC56"
    },
    "1689": {
        nombre: "Bengala (Purga)",
        holster: false,
        ignorar: false,
        categoria: 7,
        tipoCargador: 0,
        imagen: "flare",
        hash: "0x497FACC3"
    },
    "1690": {
        nombre: "Pistola de calibre 50 (purga)",
        holster: true,
        ignorar: false,
        categoria: 1,
        tipoCargador: 1744,
        imagen: "pistol50",
        hash: "0x99AEEB3B"
    },
    "1693": {
        nombre: "Fusil de francotirador (Purga)",
        holster: false,
        ignorar: false,
        categoria: 4,
        tipoCargador: 1757,
        imagen: "sniperrifle",
        hash: "0x05FC3C11"
    },
    "1832": {
        nombre: "Pistola perico",
        holster: true,
        ignorar: false,
        categoria: 1,
        tipoCargador: 1723,
        imagen: "gadgetpistol",
        hash: "0x57A4368C"
    },
    "1833": {
        nombre: "Fusil militar",
        holster: false,
        ignorar: false,
        categoria: 3,
        tipoCargador: 1768,
        imagen: "militaryrifle",
        hash: "0x9D1F17E6"
    },
    "1834": {
        nombre: "Escopeta de combate",
        holster: false,
        ignorar: false,
        categoria: 5,
        tipoCargador: 1838,
        imagen: "combatshotgun",
        hash: "0x5A96BA4"
    },
    "2060": {
        nombre: "Maletín",
        holster: false,
        ignorar: true,
        categoria: 0,
        tipoCargador: 0,
        imagen: "combatshotgun",
        hash: "0x88C78EB7"
    },
    "2074": {
        nombre: "Rifle tactico",
        holster: false,
        ignorar: false,
        categoria: 4,
        tipoCargador: 1838,
        imagen: "combatshotgun",
        hash: "0xD1D5F52B"
    },
    "2075": {
        nombre: "Rifle de precision",
        holster: false,
        ignorar: false,
        categoria: 4,
        tipoCargador: 1838,
        imagen: "combatshotgun",
        hash: "0x6E7DDDEC"
    },
    "2076": {
        nombre: "Detector de metales",
        holster: false,
        ignorar: true,
        categoria: 0,
        tipoCargador: 0,
        imagen: "combatshotgun",
        hash: "0xDBA2E809"
    },
};

// y por que male y no female? fascstas machistas de mierda....
var arrayHolster = {
    7: [
        {
            id: 104,
            male: true
        },
        {
            id: 45,
            male: false
        }
    ],

    8: [
        {
            id: 78,
            male: true
        },
        {
            id: 81,
            male: false
        },
        {
            id: 122,
            male: true
        },
        {
            id: 152,
            male: false
        },
        {
            id: 126,
            male: true
        },
        {
            id: 156,
            male: false
        },
        {
            id: 130,
            male: true
        },
        {
            id: 160,
            male: false
        },
        {
            id: 137,
            male: true
        },
        {
            id: 174,
            male: false
        },
        {
            id: 143,
            male: true
        },
        {
            id: 143,
            male: false
        }
    ]
};

var timeoutSacararma = null;
var timeoutGuardararma = null;

function holsterEquipado() {
    for (const _comp in arrayHolster) {
        const comp = parseInt(_comp);
        const array = arrayHolster[comp];
        for (const obj of array) {
            if (obj.male != player_local.isMale()) continue;
            if (obj.id == player_local.getDrawableVariation(comp)) {
                return true;
            }
        }
    }
    
    return false;
    // if (arrayHolster.includes(mp.players.local.getDrawableVariation(8)) || arrayHolster.includes(mp.players.local.getDrawableVariation(7))) {
    //     return true;
    // } else {
    //     return false;
    // }
}

function bloquearacciones() {
    if (bloqueado == true) {
        mp.game.controls.disableControlAction(32, 25, true);
        mp.game.controls.disableControlAction(32, 140, true);
        mp.game.controls.disableControlAction(32, 141, true);
        mp.game.controls.disableControlAction(32, 142, true);
        mp.game.controls.disableControlAction(32, 23, true);
        mp.game.controls.disableControlAction(32, 22, true);
        mp.game.controls.disableControlAction(32, 55, true);
        mp.game.player.disableFiring(true);
    }
}
function sacarArma(hashArma, soloVariables = false) {
    if (timeoutGuardararma != null) {
        pararTimeout(timeoutGuardararma);
        timeoutGuardararma = null;
    }

    if (soloVariables) {
        guardado = false;
        bloqueado = false;
        mostrarArma = false;
        return;
    }
    
    if (!purga) { // No creo que sea muy gracioso para el usuario que esto esté activado durante la purga.
        if (listaArmas[hashArma] && listaArmas[hashArma].ignorar == false) {
            if (guardado) {
                if (player_local.isRagdoll()) {
                    return;
                }
                mostrarArma = false;
                let estadoHolster = holsterEquipado();
                if (!estadoHolster || listaArmas[hashArma].holster == false) {
                    if (mp.players.local.getAnimCurrentTime("reaction@intimidation@1h", "outro") > 0.00) {
                        mp.players.local.clearTasks();
                    }
                    bloqueado = true;
                    mp.events.callRemote("aplicar_animacion_sincronizada", "reaction@intimidation@1h", "intro", 8.0, 8.0, 1500, 48);
                    mp.events.add('render', bloquearacciones); // Impedimos que use cualquier método para disparar en lo que saca el arma.
                    mp.events.add('render', renderAnimSpeed1);
                    timeoutSacararma = crearTimeout(() => {
                        mostrarArma = true;
                        timeoutSacararma = crearTimeout(() => {
                            guardado = false;
                            bloqueado = false;
                            mp.events.remove('render', bloquearacciones);
                            mp.events.remove('render', renderAnimSpeed1);
                            mostrarArma = false;

                            pararTimeout(timeoutSacararma);
                            timeoutSacararma = null;
                        }, 2000);
                    }, 600);
                }
                if (estadoHolster && listaArmas[hashArma].holster == true) {
                    if (mp.players.local.getAnimCurrentTime("reaction@intimidation@1h", "outro") > 0.00) {
                        mp.players.local.clearTasks();
                    }
                    bloqueado = true;
                    mp.events.callRemote("aplicar_animacion_sincronizada", "rcmjosh4", "josh_leadout_cop2", 8.0, 0.8, 600, 48);
                    mp.events.add('render', bloquearacciones); // Impedimos que use cualquier método para disparar en lo que saca el arma.
                    mp.events.add('render', renderAnimSpeed2);
                    timeoutSacararma = crearTimeout(() => {
                        if (bloqueado) {
                            bloqueado = false;
                            guardado = false;
                            mp.events.remove('render', bloquearacciones);
                            mp.events.remove('render', renderAnimSpeed2);

                            pararTimeout(timeoutSacararma);
                            timeoutSacararma = null;
                        }
                    }, 900);
                }
            }
        }
    }
}

function renderAnimSpeed1() {
    player_local.setAnimSpeed("reaction@intimidation@1h", "intro", 1.8);
}
function renderAnimSpeed2() {
    player_local.setAnimSpeed("rcmjosh4", "josh_leadout_cop2", 1.8);
}

function guardarArma(soloVariables = false) {
    if (timeoutSacararma != null) {
        pararTimeout(timeoutSacararma);
        timeoutSacararma = null;
    }

    if (soloVariables) {
        guardado = true;
        bloqueado = false;
        mostrarArma = true;
        return;
    }
    bloqueado = true;
    mp.events.add('render', bloquearacciones);
    mostrarArma = false;
    let estadoHolster = holsterEquipado();
    if (!estadoHolster || listaArmas[armaActiva.tipoObjeto].holster == false) {
        if (!mp.players.local.hasAnimFinished("reaction@intimidation@1h", "intro", 3)) {
            mp.players.local.clearTasks();
        }
        mp.events.callRemote("aplicar_animacion_sincronizada", "reaction@intimidation@1h", "outro", 8.0, 3.0, 900, 48);
        timeoutGuardararma = crearTimeout(() => {
            mostrarArma = true;
            timeoutGuardararma = crearTimeout(() => {
                guardado = true;
                bloqueado = false;
                mp.events.remove('render', bloquearacciones);
                mostrarArma = true;

                pararTimeout(timeoutGuardararma);
                timeoutGuardararma = null;
            }, 1000)
        }, 700);
    } else {
        if (!mp.players.local.hasAnimFinished("rcmjosh4", "josh_leadout_cop2", 3)) {
            mp.players.local.clearTasks();
        }
        mp.events.callRemote("aplicar_animacion_sincronizada", "weapons@pistol@", "aim_2_holster", 8.0, 5.0, 500, 48);
        timeoutGuardararma = crearTimeout(() => {
            mostrarArma = true;
            timeoutGuardararma = crearTimeout(() => {
                guardado = true;
                bloqueado = false;
                mp.events.remove('render', bloquearacciones);
                mostrarArma = true;
                
                pararTimeout(timeoutGuardararma);
                timeoutGuardararma = null;
            }, 500)
        }, 200);
    }
}

mp.events.add('desbug_arma', () => {
    mostrarAviso("success", 5500, "Tu estado será reiniciado en 3 segundos.");
    logInfo("DEBUG", "g: " + guardado + ", b: " + bloqueado + ", m: " + mostrarArma);
    if (adminservicio) {
        mp.gui.chat.push("!{yellow}DEBUG: g:" + guardado + ", b: " + bloqueado + ", m: " + mostrarArma);
    }
    crearTimeout(() => {
        guardado = true;
        bloqueado = false;
        mostrarArma = false;
        if (timeoutGuardararma != null) {
            pararTimeout(timeoutGuardararma);
            timeoutGuardararma = null;
            if (adminservicio) {
                mostrarAviso("success", 5500, "Limpiado el timeout del guardado.");
            }
        }
        if (timeoutSacararma != null) {
            pararTimeout(timeoutSacararma);
            timeoutSacararma = null;
            if (adminservicio) {
                mostrarAviso("success", 5500, "Limpiado el timeout del sacado.");
            }
        }
    }, 3000)
});
}