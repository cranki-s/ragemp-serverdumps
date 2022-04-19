{
//------------------------------------
const AUTO_NAMES = { 
//Эконом  
"apriora": "Priora",
"ae86": "Toyota ae86",
"bnr32": "Nissan Skyline r32",
"evo9": "Mitsibishi EVO9",
"chevelle1970": "Chevrolet Chevelle",
"tundra": "Toyota Tundra",
"mark100": "Toyota Mark II",
"chaser": "Toyota Chaser",
"bmwe46": "BMW M3 E46",
"gcmlc300": "Toyota Land Cruiser 300",
"bnr34": "Nissan Skyline BNR34",
"brz13": "Subaru BRZ 13",
"mustang19": "Ford Mustang GT 2019",
"v447": "Mercedes-Benz v477",
"camry18": "Toyota Camry V70",
"fd3s": "Mazda RX7",
"SubaruSTI7": "Subaru STI7",

//Премиум
"m8": "BMW M8",
"gle63": "Mercedes-Benz GLE63",
"cls17": "Mercedes-Benz CLS",
"s63": "Mercedes-Benz S63 AMG",
"g63": "Mercedes-Benz G63",
"taycan": "Porshe taycan",
"918": "Porsche 918 Spyder",
"rrover17": "Rang Rover Sport",
"r820": "Audi R8",
"gtrr50": "Nissan GTR R50",
"m4comp": "BMW M4",
"m4f82": "BMW M4 F82",
"ftype15": "Juagar Ftype15",
"survolt": "Citroen Survolt",
"488pista": "Ferrari 488",
"teslaroad": "Tesla Roadster",
"rrcullinan": "RR Cullinan",
"wraith": "Rolls-Royce Wraith",
"svj": "Lamborghini SVJ",
"chiron": "Bugatti Chiron",
"ageraone": "Koenigsegg Agera RS",
"jesko": "Koenigsegg Jesko",
"gemera": "Koenigsegg Gemera",

    //Люкс
"mcjcw20": "Mini Cooper S",
"s15": "Nissan Silvia S15",
"m5e60": "BMW M5 E60",
"c63scoupe": "BENZ C63S ",
"golf7r": "Volkswagen Golf VII",
"focusrs": "Ford Focus RS",
"vantage": "Aston Martin Vantage",
"bmwx7": "BMW X7 2021",
"bmwz4": "BMW Z4",
"a80":"Toyota Supra A80",
"rs6": "Audi RS6",
"gls63": "Mercedes-AMG GLS 63",
"panamera18": "Porsche Panamera Turbo",
"maybach": "Mercedes-Benz Maybach",
"g65": "Mercedes-Benz G65",
"e63s": "Mercedes-Benz E63S AMG",
"a90": "Toyota Supra A90",
"urus": "Lamba URUS",
"rmodjeep": "Grand Cheroke",
"esca": "Cadillac Escalade",
"velociraptor": "Ford Raptor 6x6",
"g636x6": "Mercedes-Benz 6x6 AMG",
"SCLKUZ": "Toyota Land Cruiser 2020 ",
"bmwm5": "BMW M5 F90",
"amggt63s": "Mercedes-Benz AMG GT63S",
"modelx": "Tesla Model X",
"porsche2021": "Porshe 911",
"huracan": "Lamborghini Huracan Performante",
"exigev6": "Lotus Exige",
"rs520": "Audi RS5",
"ford_gt17": "Ford GT'17",

//Донат
"vision6": "Mercedes-Benz Vision",
"avtr": "Mercedes-Benz AVTR",
"exp100": "Bentley EXP 100 GT",
"gta5rp_veh_ferrari19": "Ferrari LaFerrari",
"regera": "Koenigsegg Regera",
"divo": "Bugatti Divo",
"lc500": "Lexus LC 500",
"bugatti": "Bugatti Veyron V6",
"slr": "Mercedes-Benz SLR",
"venenor": "Lamborghini Veneno 2014",
"mvisiongt": "Mercedes-Benz Vision GT",
"rmodbacalar": "Bentley Cupe",
"rmodbugatti": "Bugatti 6",
"rmodbolide": "Bugatti bolid",
"zondar": "Pagani Zonda R",
"rcsultanrs": "RC Sultan RS",
"bugatticentodieci": "Bugatti Centodieci",
"pro1": "Mercedes-Benz PRO",
"bmwvision":"BMW Vision",
//мотосалон
"Bmx": "BMX",
"Faggio2": "Faggio",
"Blazer": "Blazer",
"Enduro": "Enduro",
"Thrust": "Thrust",
"PCJ": "PCJ",
"Hexer": "Hexer",
"lectro": "Lectro",
"Nemesis": "Nemesis",
"Scorcher": "Scorcher",
"Double": "Double",
"Diablous": "Diablous",
"Cliffhanger": "Cliffhanger",
"Nightblade": "Nightblade",
"Vindicator": "Vindicator",
"Gargoyle": "Gargoyle",
"Sanchez2": "Sanchez",
"Akuma": "Akuma",
"Ratbike": "Ratbike",
"CarbonRS": "Carbon RS",
"Ruffian": "Ruffian",
"Hakuchou": "Hakuchou",
"Bati": "Bati",
"BF400": "BF400",
"Sanctus": "Sanctus",
"zx10rr": "Kawasaki Ninja ZX-10R",
"h2r": "Kawasaki Ninja H2R",
"r62008": "Yamaha YZF-R6",
"h2carb": "Kawasaki H2",
"r6": "Yamaha R6",
"gsx1000": "Suzuki GSX1000",
"cbr1000rrr": "Honda CBR1000RR",
"goldwing": "GoldWing",
"cb500x": "Honda CB500x",
"rmz2": "Suzuki RMZ2",
"20r1": "Yamaha R1",
"s1000rr": "BMW KM100",
"sxf450sm":"KTM SX-F 450",
"banshee87":"Yamaha Banshee",

    "shatoro": "Shatoro", //мастак

//ДРУГИЕ
    "bmwm5mc":"BMW M5 F90",
    "mersa45":"Mercedes-Benz A45",
    "g63d":"Mercedes-Benz G63",
    "evija":"Lotus Evija",
    "mansm8":"BMW M8 TDM ",
    "bdivo":"Bugatti Divo",
    "mcst":"McLaren LongTail",
    "sf90":"Ferrari SF90",
    "veyronss":"Bugatti Veyron SS",
    "caliburn":"Caliburn",
    "e34":"BMW M5 E34",
    "cybertruck":"Tesla Cybertruck",
    "lambc":" Lamborghini Concept",
    "mbbs20":"Mercedes-Benz AMG GT",
    "vulcan":"Aston Martin Vulcan",
    "m3gtr":"BMW M3 GTR ",
    "w463a1":"Mercedes-Benz G63 BRABUS",
    "dawn":"Rolls-Roys Dawn",
    "chrolls":"Rolls-Roys Cullinan Mansory",
    "bmwx6mham":"BMW X6M Hamann",
    "fxxk":"Ferrari FXX-K",
    "00excursion":"Ford-Monster",
    "rmodlegosenna":"McLaren Senna LEGO",
    "gt1":"Porsche 911 GT1",
    "regalia":"Quartz Regalia",
    "rtruck":"Mercedes-Benz Truck",
    "s900unmarked":"Mercedes-Benz S900",
    "freshpolice":"Mercedes-Benz W140",
    "rmodmonstergt":"Mercedes-Benz GT Truck",
    "bcps":"Bugatti Chiron SS",
    "bentyaga18":"Bentley Bentayga",
    "fm488":"Ferrari 488 Mansory",
    "610dtm":"Lamborghini Huracan DTM",
    "gls600":"Mercedes-Benz GLS600",
    "600lts":"Maclaren 600 LTS",
    "bmwg05":"BMW X5M",
    "survolt":"Citroen Survolt",
    "ocnetrongt":"Audi e-tron",
    "g632019":"Mercedes-Benz EQG",
    "gcmeqs2022":"Mercedes-Benz EQS",
    "Mb400":"Mercedes-Benz EQC",
    "dk350z":"Lamborghini Aventador Mansory",
    "21sierra":"GMC Sierra",
    "fd3s":"Mazda RX-7",
    "SubaruSTI7":"Subaru WRX STI'7",
    "mache":"Ford Mustang Mach-E ",
    "h6x6":"Hummer EV 6X6",
    "lada2114":"Lada 2114",
    "ie":"Apollo Intensa Emozione",
    "gtam21":"Alfa Romeo Guilia",
    "exigev6":"Lotus Exige",
    "fenyr":"Fenyr SuperSport",
    "camry18":"Toyota Camry",
    "redeye":"Dodge Challenger SRT",
    "mgt18lb":"Maserati GranTurismo Liberty Walk",
    "H1":"Hummer H1",
    "rs520":"Audi RS5",
    "e36rb":"BMW M3 E36 Rocket Bunny",
    "rsq8m":"Audi RSQ8",
    "pullman":"Rolls Royce pullman",
    "CONTSS18":"Bentley Continental",
    "rrphantom":"Rolls-Royce Phantom",
    "BMWVISIONM":"BMW VISION M",
    "ldsv":"Lamborgini Diablo",
    "g12":"BMW G12",
    "ts1":"Zenwo St1",
    "rolls08":"Rolls-Royce Sweptail",
    "x5e53":"BMW X5 E53",
    "rs7":"Audi RS7",
    "evo10":"Mitsubishi Lancer EVO10",
    "touaregr50":"Volkswagen Touareg",
    "lx470":"Lexus LX470",
    "chall70":"Dodge Challenger 1970",

}

//------------------------------------
exports.get = function (value) { return AUTO_NAMES[value] }


}Ʈʚ