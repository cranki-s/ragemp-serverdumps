{
﻿global.tuningStandart = JSON.parse(`
{
   "10":{
      "-1":5000,
      "0":10000,
      "1":15000,
      "2":20000,
      "3":30000
   },
   "11":{
      "-1":5000,
      "0":20000
   },
   "12":{
      "-1": 5000,
      "0": 3000,
      "1": 3900,
      "2": 4500,
      "3": 4500,
      "4": 4500,
      "5": 4500,
      "6": 4500,
      "7": 4500,
      "8": 4500,
      "9": 4500,
      "10": 4500,
      "11": 4500,
      "12": 4500,
      "13": 4500,
      "14": 4500,
      "15": 4500,
      "16": 4500,
      "17": 4500,
      "18": 4500,
      "19": 4500,
      "20": 4500,
      "21": 4500,
      "22": 4500,
      "23": 4500,
      "24": 4500,
      "25": 4500,
      "26": 4500,
      "27": 4500,
      "28": 4500,
      "29": 4500,
      "30": 4500,
      "31": 4500,
      "32": 4500,
      "33": 4500,
      "34": 4500
   },
   "13":{
      "-1":5000,
      "0":10000,
      "1":20000,
      "2":30000
   },
   "14":{
      "0":5000,
      "3":4500,
      "2":6000,
      "1":9000
   },
   "15":{
      "-1":5000,
      "0":9000,
      "1":12000,
      "2":18000,
      "3":25000
   },
   "16":{
      "-1":3000,
      "0":6000,
      "1":10000,
      "2":16000
   },
   "17":{
      "-1":1000,
      "0":5000,
      "1":5000,
      "2":5000,
      "3":5000,
      "4":5000,
      "5":5000,
      "6":5000,
      "7":5000,
      "8":5000,
      "9":5000,
      "10":5000,
      "11":5000,
      "12":5000
   },
   "18":{
      "0":500,
      "1":1000,
      "2":1000,
      "3":1000,
      "4":1000
   }
}

`);
global.tuningConf = JSON.parse(`
{
   "apriora":{ 
	  "0":[
		{ 
			"Item1": -1,
			"Item2": "Стандартный глушитель",
			"Item3": 5000
		}, 
		{ 
			"Item1": 0,
			"Item2": "Тюнингованный глушитель #1",
			"Item3": 8000
		}, 
		{ 
			"Item1": 1,
			"Item2": "Тюнингованный глушитель #2",
			"Item3": 12000
		}, 
		{ 
			"Item1": 2,
			"Item2": "Тюнингованный глушитель #3",
			"Item3": 15000
		}, 
		{ 
			"Item1": 3,
			"Item2": "Тюнингованный глушитель #4",
			"Item3": 20000
		}, 
		{ 
			"Item1": 4,
			"Item2": "Тюнингованный глушитель #5",
			"Item3": 25000
		}
	],
	   "1":[
		{ 
			"Item1": -1,
			"Item2": "Стандартные пороги",
			"Item3": 5000
		}, 
		{ 
			"Item1": 0,
			"Item2": "Тюнингованные пороги №1",
			"Item3": 10000
		}, 
		{ 
			"Item1": 1,
			"Item2": "Тюнингованные пороги №2",
			"Item3": 20000
		}
	], 
	  "2":[
	    { 
			"Item1": -1,
			"Item2": "Стандартный капот",
			"Item3": 5000
		}, 
		{ 
			"Item1": 0,
			"Item2": "Капот №1",
			"Item3": 25000
		}, 
		{ 
			"Item1": 1,
			"Item2": "Капот №2",
			"Item3": 35000
		}, 
		{ 
			"Item1": 2,
			"Item2": "Капот №3",
			"Item3": 45000
		}, 
		{ 
			"Item1": 3,
			"Item2": "Капот №4",
			"Item3": 55000 
		}
	], 
	  "3":[
		{
			"Item1": -1,
			"Item2": "Нет",
			"Item3": 1000
		}, 
		{ 
			"Item1": 0,
			"Item2": "Cпойлер №1",
			"Item3": 15000 
		}, 
		{ 
			"Item1": 1,
			"Item2": "Cпойлер №2",
			"Item3": 16000 
		},
		{ 
			"Item1": 2,
			"Item2": "Cпойлер №3",
			"Item3": 17000 
		},
		{ 
			"Item1": 3,
			"Item2": "Cпойлер №4",
			"Item3": 18000 
		}, 
	    { 
			"Item1": 4,
			"Item2": "Cпойлер №5",
			"Item3": 19000 
		}
	  ], 
	  "4":[
		{ 
			"Item1": -1,
			"Item2": "Стандартная решетка",
			"Item3": 3000
		}, 
		{ 
			"Item1": 0,
			"Item2": "Тюнингованная решетка №1",
			"Item3": 26000
		}, 
		{ 
			"Item1": 1,
			"Item2": "Тюнингованная решетка №2",
			"Item3": 36000 
		}, 
		{ 
			"Item1": 2,
			"Item2": "Тюнингованная решетка №3",
			"Item3": 46000 
		}, 
		{ 
			"Item1": 3,
			"Item2": "Тюнингованная решетка №4",
			"Item3": 56000 
		}
	  ], 
	  "8":[
		{ 
			"Item1": -1,
			"Item2": "Стандартный пер. бампер",
			"Item3": 5000 
		},
		{ 
			"Item1": 0,
			"Item2": "Тюнингованный пер.бампер №1",
			"Item3": 15000 
		}, 
		{ 
			"Item1": 1,
			"Item2": "Тюнингованный пер.бампер №2",
			"Item3": 20000
		}, 
		{ 
			"Item1": 2,
			"Item2": "Тюнингованный пер.бампер №3",
			"Item3": 25000 
		}, 
		{ 
			"Item1": 3,
			"Item2": "Тюнингованный пер.бампер №4",
			"Item3": 30000
		},
		{ 
			"Item1": 4,
			"Item2": "Тюнингованный пер.бампер №5",
			"Item3": 35000 
		}
	  ], 
	  "9":[
		{ 
			"Item1": -1,
			"Item2": "Стандартная крыша",
			"Item3": 5000
		}, 
		{ 
			"Item1": 0,
			"Item2": "Полоса",
			"Item3": 30000 
		}
	  ], 
	  "9":[
		{ 
			"Item1": -1,
			"Item2": "Стандартная зад. бампер", 
			"Item3": 5000 
		},
		{ 
			"Item1": 0,
			"Item2": "Тюнингованный зад.бампер №1",
			"Item3": 15000
		}, 
		{ 
			"Item1": 1,
			"Item2": "Тюнингованный зад.бампер №2",
			"Item3": 20000
        }
      ]
   },
   "Visione":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Auspuff 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Auspuff 1",
            "Item3":35000
         },
         {
            "Item1":2,
            "Item2":"Modifizierter Auspuff 1",
            "Item3":35000
         },
         {
            "Item1":3,
            "Item2":"Modifizierter Auspuff 1",
            "Item3":35000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierte Motorhaube 1",
            "Item3":20000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Kein Spoiler",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Spoiler 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Spoiler 2",
            "Item3":25000
         },
         {
            "Item1":2,
            "Item2":"Modifizierter Spoiler 3",
            "Item3":25000
         },
         {
            "Item1":3,
            "Item2":"Modifizierter Spoiler 4",
            "Item3":25000
         },
         {
            "Item1":4,
            "Item2":"Modifizierter Spoiler 5",
            "Item3":25000
         }
      ],
      "7":[
         {
            "Item1":-1,
            "Item2":"Keine Färbung",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Färbung 1",
            "Item3":30000
         },
         {
            "Item1":1,
            "Item2":"Färbung 2",
            "Item3":30000
         },
         {
            "Item1":2,
            "Item2":"Färbung 3",
            "Item3":30000
         },
         {
            "Item1":3,
            "Item2":"Färbung 4",
            "Item3":30000
         },
         {
            "Item1":4,
            "Item2":"Färbung 5",
            "Item3":30000
         },
         {
            "Item1":5,
            "Item2":"Färbung 6",
            "Item3":30000
         },
         {
            "Item1":6,
            "Item2":"Färbung 7",
            "Item3":30000
         },
         {
            "Item1":7,
            "Item2":"Färbung 8",
            "Item3":30000
         }
      ]
   },
   "Vagner":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Auspuff 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Auspuff 2",
            "Item3":20000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Kein Spoiler",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Spoiler 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Spoiler 2",
            "Item3":18000
         },
         {
            "Item1":2,
            "Item2":"Modifizierter Spoiler 3",
            "Item3":20000
         },
         {
            "Item1":3,
            "Item2":"Modifizierter Spoiler 4",
            "Item3":20000
         },
         {
            "Item1":4,
            "Item2":"Modifizierter Spoiler 5",
            "Item3":20000
         },
         {
            "Item1":5,
            "Item2":"Modifizierter Spoiler 1",
            "Item3":30000
         },
         {
            "Item1":6,
            "Item2":"Modifizierter Spoiler 2",
            "Item3":20000
         },
         {
            "Item1":7,
            "Item2":"Modifizierter Spoiler 3",
            "Item3":20000
         },
         {
            "Item1":8,
            "Item2":"Modifizierter Spoiler 4",
            "Item3":30000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Kundenspezifischer Stoßfänger 2",
            "Item3":20000
         },
         {
            "Item1":1,
            "Item2":"Kundenspezifischer Stoßfänger 2",
            "Item3":20000
         }
      ]
   },
   "Vacca":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Auspuff 1",
            "Item3":15000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierte Motorhaube 1",
            "Item3":20000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Kein Spoiler",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Spoiler 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Spoiler 2",
            "Item3":25000
         }
      ]
   },
   "Tempesta":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Auspuff 1",
            "Item3":15000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierte Motorhaube 1",
            "Item3":20000
         },
         {
            "Item1":1,
            "Item2":"Modifizierte Motorhaube 2",
            "Item3":20000
         },
         {
            "Item1":2,
            "Item2":"Modifizierte Motorhaube 1",
            "Item3":25000
         },
         {
            "Item1":3,
            "Item2":"Modifizierte Motorhaube 2",
            "Item3":20000
         },
         {
            "Item1":4,
            "Item2":"Modifizierte Motorhaube 1",
            "Item3":25000
         },
         {
            "Item1":5,
            "Item2":"Modifizierte Motorhaube 2",
            "Item3":20000
         },
         {
            "Item1":6,
            "Item2":"Modifizierte Motorhaube 1",
            "Item3":25000
         },
         {
            "Item1":7,
            "Item2":"Modifizierte Motorhaube 2",
            "Item3":20000
         },
         {
            "Item1":8,
            "Item2":"Modifizierte Motorhaube 2",
            "Item3":25000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Kein Spoiler",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Spoiler 1",
            "Item3":40000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Spoiler 2",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Modifizierter Spoiler 3",
            "Item3":15000
         },
         {
            "Item1":3,
            "Item2":"Modifizierter Spoiler 4",
            "Item3":20000
         },
         {
            "Item1":4,
            "Item2":"Modifizierter Spoiler 5",
            "Item3":25000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Kundenspezifischer Stoßfänger 2",
            "Item3":15000
         }
      ]
   },
   "T20":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Auspuff 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Auspuff 2",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Modifizierter Auspuff 3",
            "Item3":25000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierte Motorhaube 1",
            "Item3":20000
         },
         {
            "Item1":1,
            "Item2":"Modifizierte Motorhaube 2",
            "Item3":20000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Kundenspezifischer Stoßfänger 2",
            "Item3":15000
         }
      ]
   },
   "Sc1":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Auspuff 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Auspuff 2",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Modifizierter Auspuff 3",
            "Item3":25000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Kein Spoiler",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Spoiler 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Spoiler 2",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Modifizierter Spoiler 3",
            "Item3":25000
         },
         {
            "Item1":3,
            "Item2":"Modifizierter Spoiler 4",
            "Item3":35000
         },
         {
            "Item1":4,
            "Item2":"Modifizierter Spoiler 5",
            "Item3":25000
         },
         {
            "Item1":5,
            "Item2":"Modifizierter Spoiler 6",
            "Item3":40000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Kundenspezifischer Stoßfänger 2",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Kundenspezifischer Stoßfänger 3",
            "Item3":20000
         }
      ]
   },
   "Pfister811":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Auspuff 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Auspuff 2",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Modifizierter Auspuff 3",
            "Item3":25000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Kundenspezifischer Stoßfänger 2",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Kundenspezifischer Stoßfänger 3",
            "Item3":20000
         },
         {
            "Item1":3,
            "Item2":"Kundenspezifischer Stoßfänger 4",
            "Item3":25000
         },
         {
            "Item1":4,
            "Item2":"Kundenspezifischer Stoßfänger 4",
            "Item3":25000
         }
      ]
   },
   "Fmj":{
      "3":[
         {
            "Item1":-1,
            "Item2":"Kein Spoiler",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Spoiler 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Spoiler 2",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Modifizierter Spoiler 3",
            "Item3":25000
         },
         {
            "Item1":3,
            "Item2":"Modifizierter Spoiler 4",
            "Item3":25000
         },
         {
            "Item1":4,
            "Item2":"Modifizierter Spoiler 5",
            "Item3":25000
         }
      ]
   },
   "Cyclone":{
      "1":[
         {
            "Item1":-1,
            "Item2":"Keine Schürze",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Заказная юбка 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Заказная юбка 2",
            "Item3":20000
         },
         {
            "Item1":2,
            "Item2":"Заказная юбка 3",
            "Item3":15000
         },
         {
            "Item1":3,
            "Item2":"Заказная юбка 4",
            "Item3":20000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Kein Spoiler",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Spoiler 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Spoiler 2",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Modifizierter Spoiler 3",
            "Item3":25000
         },
         {
            "Item1":3,
            "Item2":"Modifizierter Spoiler 4",
            "Item3":15000
         },
         {
            "Item1":4,
            "Item2":"Modifizierter Spoiler 5",
            "Item3":15000
         },
         {
            "Item1":5,
            "Item2":"Modifizierter Spoiler 6",
            "Item3":25000
         },
         {
            "Item1":6,
            "Item2":"Modifizierter Spoiler 7",
            "Item3":15000
         },
         {
            "Item1":7,
            "Item2":"Modifizierter Spoiler 8",
            "Item3":15000
         },
         {
            "Item1":8,
            "Item2":"Modifizierter Spoiler 9",
            "Item3":25000
         }
      ],
      "7":[
         {
            "Item1":-1,
            "Item2":"Без раскраски",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Раскраска 1",
            "Item3":30000
         },
         {
            "Item1":1,
            "Item2":"Раскраска 2",
            "Item3":30000
         },
         {
            "Item1":2,
            "Item2":"Раскраска 3",
            "Item3":30000
         },
         {
            "Item1":3,
            "Item2":"Раскраска 4",
            "Item3":30000
         },
         {
            "Item1":4,
            "Item2":"Раскраска 5",
            "Item3":30000
         },
         {
            "Item1":5,
            "Item2":"Раскраска 6",
            "Item3":30000
         },
         {
            "Item1":6,
            "Item2":"Раскраска 7",
            "Item3":30000
         },
         {
            "Item1":7,
            "Item2":"Раскраска 8",
            "Item3":30000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger 1",
            "Item3":30000
         },
         {
            "Item1":1,
            "Item2":"Kundenspezifischer Stoßfänger 2",
            "Item3":35000
         },
         {
            "Item1":2,
            "Item2":"Kundenspezifischer Stoßfänger 3",
            "Item3":30000
         },
         {
            "Item1":3,
            "Item2":"Kundenspezifischer Stoßfänger 4",
            "Item3":35000
         }
      ]
   },
   "Cheetah":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Auspuff 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Auspuff 2",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Modifizierter Auspuff 3",
            "Item3":25000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Kein Spoiler",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Spoiler 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Spoiler 2",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Modifizierter Spoiler 3",
            "Item3":15000
         }
      ]
   },
   "Bullet":{

   },
   "Adder":{

   },
   "Verlierer2":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Auspuff 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Auspuff 2",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Modifizierter Auspuff 3",
            "Item3":25000
         },
         {
            "Item1":3,
            "Item2":"Modifizierter Auspuff 4",
            "Item3":30000
         },
         {
            "Item1":4,
            "Item2":"Modifizierter Auspuff 5",
            "Item3":30000
         }
      ],
      "1":[
         {
            "Item1":-1,
            "Item2":"Без юбки",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Заказная юбка 1",
            "Item3":15000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierte Motorhaube 1",
            "Item3":20000
         },
         {
            "Item1":1,
            "Item2":"Modifizierte Motorhaube 2",
            "Item3":20000
         },
         {
            "Item1":2,
            "Item2":"Modifizierte Motorhaube 3",
            "Item3":20000
         },
         {
            "Item1":3,
            "Item2":"Modifizierte Motorhaube 4",
            "Item3":20000
         },
         {
            "Item1":4,
            "Item2":"Modifizierte Motorhaube 5",
            "Item3":20000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Kein Spoiler",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Spoiler 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Spoiler 2",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Modifizierter Spoiler 3",
            "Item3":25000
         },
         {
            "Item1":3,
            "Item2":"Modifizierter Spoiler 4",
            "Item3":30000
         },
         {
            "Item1":4,
            "Item2":"Modifizierter Spoiler 5",
            "Item3":30000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger 1",
            "Item3":30000
         },
         {
            "Item1":1,
            "Item2":"Kundenspezifischer Stoßfänger 2",
            "Item3":30000
         },
         {
            "Item1":2,
            "Item2":"Kundenspezifischer Stoßfänger 3",
            "Item3":35000
         },
         {
            "Item1":3,
            "Item2":"Kundenspezifischer Stoßfänger 4",
            "Item3":30000
         },
         {
            "Item1":4,
            "Item2":"Kundenspezifischer Stoßfänger 5",
            "Item3":30000
         },
         {
            "Item1":5,
            "Item2":"Kundenspezifischer Stoßfänger 6",
            "Item3":30000
         }
      ]
   },
   "Specter2":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Auspuff 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Auspuff 2",
            "Item3":45000
         },
         {
            "Item1":2,
            "Item2":"Modifizierter Auspuff 3",
            "Item3":45000
         },
         {
            "Item1":3,
            "Item2":"Modifizierter Auspuff 4",
            "Item3":45000
         }
      ],
      "1":[
         {
            "Item1":-1,
            "Item2":"Без юбки",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Заказная юбка 1",
            "Item3":25000
         },
         {
            "Item1":1,
            "Item2":"Заказная юбка 2",
            "Item3":25000
         },
         {
            "Item1":2,
            "Item2":"Заказная юбка 3",
            "Item3":30000
         },
         {
            "Item1":3,
            "Item2":"Заказная юбка 4",
            "Item3":25000
         },
         {
            "Item1":4,
            "Item2":"Заказная юбка 5",
            "Item3":25000
         },
         {
            "Item1":5,
            "Item2":"Заказная юбка 6",
            "Item3":30000
         },
         {
            "Item1":6,
            "Item2":"Заказная юбка 7",
            "Item3":25000
         },
         {
            "Item1":7,
            "Item2":"Заказная юбка 8",
            "Item3":25000
         },
         {
            "Item1":8,
            "Item2":"Заказная юбка 9",
            "Item3":30000
         },
         {
            "Item1":9,
            "Item2":"Заказная юбка 10",
            "Item3":25000
         },
         {
            "Item1":10,
            "Item2":"Заказная юбка 11",
            "Item3":25000
         },
         {
            "Item1":11,
            "Item2":"Заказная юбка 12",
            "Item3":30000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Kein Spoiler",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Spoiler 1",
            "Item3":20000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Spoiler 2",
            "Item3":20000
         },
         {
            "Item1":2,
            "Item2":"Modifizierter Spoiler 3",
            "Item3":20000
         },
         {
            "Item1":3,
            "Item2":"Modifizierter Spoiler 4",
            "Item3":30000
         },
         {
            "Item1":4,
            "Item2":"Modifizierter Spoiler 5",
            "Item3":20000
         },
         {
            "Item1":5,
            "Item2":"Modifizierter Spoiler 6",
            "Item3":40000
         },
         {
            "Item1":6,
            "Item2":"Modifizierter Spoiler 7",
            "Item3":40000
         },
         {
            "Item1":7,
            "Item2":"Modifizierter Spoiler 8",
            "Item3":25000
         },
         {
            "Item1":8,
            "Item2":"Modifizierter Spoiler 1",
            "Item3":25000
         },
         {
            "Item1":9,
            "Item2":"Modifizierter Spoiler 2",
            "Item3":25000
         },
         {
            "Item1":10,
            "Item2":"Modifizierter Spoiler 3",
            "Item3":40000
         },
         {
            "Item1":11,
            "Item2":"Modifizierter Spoiler 4",
            "Item3":40000
         },
         {
            "Item1":12,
            "Item2":"Modifizierter Spoiler 5",
            "Item3":40000
         },
         {
            "Item1":13,
            "Item2":"Modifizierter Spoiler 6",
            "Item3":40000
         },
         {
            "Item1":14,
            "Item2":"Modifizierter Spoiler 7",
            "Item3":15000
         },
         {
            "Item1":15,
            "Item2":"Modifizierter Spoiler 8",
            "Item3":40000
         },
         {
            "Item1":16,
            "Item2":"Modifizierter Spoiler 8",
            "Item3":40000
         }
      ],
      "7":[
         {
            "Item1":-1,
            "Item2":"Без раскраски",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Раскраска 1",
            "Item3":30000
         },
         {
            "Item1":1,
            "Item2":"Раскраска 2",
            "Item3":30000
         },
         {
            "Item1":2,
            "Item2":"Раскраска 3",
            "Item3":30000
         },
         {
            "Item1":3,
            "Item2":"Раскраска 4",
            "Item3":30000
         },
         {
            "Item1":4,
            "Item2":"Раскраска 5",
            "Item3":30000
         },
         {
            "Item1":5,
            "Item2":"Раскраска 6",
            "Item3":30000
         },
         {
            "Item1":6,
            "Item2":"Раскраска 7",
            "Item3":30000
         },
         {
            "Item1":7,
            "Item2":"Раскраска 8",
            "Item3":30000
         },
         {
            "Item1":8,
            "Item2":"Раскраска 9",
            "Item3":30000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger 1",
            "Item3":30000
         },
         {
            "Item1":1,
            "Item2":"Kundenspezifischer Stoßfänger 2",
            "Item3":30000
         },
         {
            "Item1":2,
            "Item2":"Kundenspezifischer Stoßfänger 3",
            "Item3":35000
         },
         {
            "Item1":3,
            "Item2":"Kundenspezifischer Stoßfänger 4",
            "Item3":30000
         },
         {
            "Item1":4,
            "Item2":"Kundenspezifischer Stoßfänger 5",
            "Item3":30000
         },
         {
            "Item1":5,
            "Item2":"Kundenspezifischer Stoßfänger 6",
            "Item3":30000
         },
         {
            "Item1":6,
            "Item2":"Kundenspezifischer Stoßfänger 7",
            "Item3":35000
         },
         {
            "Item1":7,
            "Item2":"Kundenspezifischer Stoßfänger 8",
            "Item3":30000
         },
         {
            "Item1":8,
            "Item2":"Kundenspezifischer Stoßfänger 9",
            "Item3":30000
         },
         {
            "Item1":9,
            "Item2":"Kundenspezifischer Stoßfänger 10",
            "Item3":35000
         },
         {
            "Item1":10,
            "Item2":"Kundenspezifischer Stoßfänger 11",
            "Item3":30000
         },
         {
            "Item1":11,
            "Item2":"Kundenspezifischer Stoßfänger 12",
            "Item3":30000
         },
         {
            "Item1":12,
            "Item2":"Kundenspezifischer Stoßfänger 13",
            "Item3":35000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":1,
            "Item2":"Kundenspezifischer Stoßfänger 1",
            "Item3":30000
         },
         {
            "Item1":2,
            "Item2":"Kundenspezifischer Stoßfänger 2",
            "Item3":30000
         },
         {
            "Item1":3,
            "Item2":"Kundenspezifischer Stoßfänger 3",
            "Item3":30000
         },
         {
            "Item1":4,
            "Item2":"Kundenspezifischer Stoßfänger 4",
            "Item3":30000
         },
         {
            "Item1":5,
            "Item2":"Kundenspezifischer Stoßfänger 5",
            "Item3":40000
         },
         {
            "Item1":6,
            "Item2":"Kundenspezifischer Stoßfänger 6",
            "Item3":30000
         },
         {
            "Item1":7,
            "Item2":"Kundenspezifischer Stoßfänger 7",
            "Item3":30000
         },
         {
            "Item1":8,
            "Item2":"Kundenspezifischer Stoßfänger 8",
            "Item3":35000
         }
      ]
   },
   "Specter":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Auspuff 1",
            "Item3":15000
         }
      ],
      "1":[
         {
            "Item1":-1,
            "Item2":"Keine Schürze",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Inividuelle Schürze 1",
            "Item3":15000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Kein Spoiler",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Spoiler 1",
            "Item3":20000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger 1",
            "Item3":30000
         }
      ]
   },
   "Seven70":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Auspuff 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Auspuff 2",
            "Item3":15000
         }
      ],
      "1":[
         {
            "Item1":-1,
            "Item2":"Keine Schürze",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Inividuelle Schürze 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Inividuelle Schürze 2",
            "Item3":20000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Kein Spoiler",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Spoiler 1",
            "Item3":20000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Spoiler 2",
            "Item3":25000
         },
         {
            "Item1":2,
            "Item2":"Modifizierter Spoiler 3",
            "Item3":25000
         },
         {
            "Item1":3,
            "Item2":"Modifizierter Spoiler 4",
            "Item3":35000
         }
      ]
   },
   "Khamelion":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Auspuff 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Auspuff 2",
            "Item3":15000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierte Motorhaube 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Modifizierte Motorhaube 2",
            "Item3":15000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Kein Spoiler",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Spoiler 1",
            "Item3":20000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Spoiler 2",
            "Item3":25000
         }
      ],
      "6":[
         {
            "Item1":-1,
            "Item2":"Standard-Dach",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Maßgeschneidertes Dach 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Maßgeschneidertes Dach 2",
            "Item3":25000
         }
      ]
   },
   "Comet3":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Auspuff 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Auspuff 2",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Modifizierter Auspuff 3",
            "Item3":20000
         },
         {
            "Item1":3,
            "Item2":"Modifizierter Auspuff 4",
            "Item3":25000
         }
      ],
      "1":[
         {
            "Item1":-1,
            "Item2":"Keine Schürze",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Inividuelle Schürze 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Inividuelle Schürze 2",
            "Item3":20000
         },
         {
            "Item1":2,
            "Item2":"Inividuelle Schürze 3",
            "Item3":20000
         },
         {
            "Item1":3,
            "Item2":"Inividuelle Schürze 4",
            "Item3":20000
         },
         {
            "Item1":4,
            "Item2":"Inividuelle Schürze 5",
            "Item3":20000
         },
         {
            "Item1":5,
            "Item2":"Inividuelle Schürze 6",
            "Item3":20000
         },
         {
            "Item1":6,
            "Item2":"Inividuelle Schürze 7",
            "Item3":20000
         },
         {
            "Item1":7,
            "Item2":"Inividuelle Schürze 8",
            "Item3":20000
         },
         {
            "Item1":8,
            "Item2":"Inividuelle Schürze 9",
            "Item3":20000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierte Motorhaube 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Modifizierte Motorhaube 2",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Modifizierte Motorhaube 3",
            "Item3":20000
         },
         {
            "Item1":3,
            "Item2":"Modifizierte Motorhaube 4",
            "Item3":15000
         },
         {
            "Item1":4,
            "Item2":"Modifizierte Motorhaube 5",
            "Item3":15000
         },
         {
            "Item1":5,
            "Item2":"Modifizierte Motorhaube 6",
            "Item3":20000
         },
         {
            "Item1":6,
            "Item2":"Modifizierte Motorhaube 7",
            "Item3":15000
         },
         {
            "Item1":7,
            "Item2":"Modifizierte Motorhaube 8",
            "Item3":15000
         },
         {
            "Item1":8,
            "Item2":"Modifizierte Motorhaube 9",
            "Item3":20000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Kein Spoiler",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Spoiler 1",
            "Item3":20000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Spoiler 2",
            "Item3":25000
         },
         {
            "Item1":2,
            "Item2":"Modifizierter Spoiler 3",
            "Item3":30000
         },
         {
            "Item1":3,
            "Item2":"Modifizierter Spoiler 4",
            "Item3":30000
         },
         {
            "Item1":4,
            "Item2":"Modifizierter Spoiler 5",
            "Item3":40000
         },
         {
            "Item1":5,
            "Item2":"Modifizierter Spoiler 6",
            "Item3":40000
         },
         {
            "Item1":6,
            "Item2":"Modifizierter Spoiler 7",
            "Item3":40000
         },
         {
            "Item1":7,
            "Item2":"Modifizierter Spoiler 8",
            "Item3":30000
         }
      ],
      "7":[
         {
            "Item1":-1,
            "Item2":"Keine Färbung",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Färbung 1",
            "Item3":30000
         },
         {
            "Item1":1,
            "Item2":"Färbung 2",
            "Item3":30000
         },
         {
            "Item1":2,
            "Item2":"Färbung 3",
            "Item3":30000
         },
         {
            "Item1":3,
            "Item2":"Färbung 4",
            "Item3":30000
         },
         {
            "Item1":4,
            "Item2":"Färbung 5",
            "Item3":30000
         },
         {
            "Item1":5,
            "Item2":"Färbung 6",
            "Item3":30000
         },
         {
            "Item1":6,
            "Item2":"Färbung 7",
            "Item3":30000
         },
         {
            "Item1":7,
            "Item2":"Färbung 8",
            "Item3":30000
         },
         {
            "Item1":8,
            "Item2":"Färbung 9",
            "Item3":30000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger 1",
            "Item3":30000
         },
         {
            "Item1":1,
            "Item2":"Kundenspezifischer Stoßfänger 2",
            "Item3":30000
         },
         {
            "Item1":2,
            "Item2":"Kundenspezifischer Stoßfänger 3",
            "Item3":35000
         },
         {
            "Item1":3,
            "Item2":"Kundenspezifischer Stoßfänger 4",
            "Item3":30000
         },
         {
            "Item1":4,
            "Item2":"Kundenspezifischer Stoßfänger 5",
            "Item3":35000
         },
         {
            "Item1":5,
            "Item2":"Kundenspezifischer Stoßfänger 6",
            "Item3":30000
         },
         {
            "Item1":6,
            "Item2":"Kundenspezifischer Stoßfänger 7",
            "Item3":35000
         },
         {
            "Item1":7,
            "Item2":"Kundenspezifischer Stoßfänger 8",
            "Item3":30000
         },
         {
            "Item1":8,
            "Item2":"Kundenspezifischer Stoßfänger 9",
            "Item3":35000
         },
         {
            "Item1":9,
            "Item2":"Kundenspezifischer Stoßfänger 10",
            "Item3":30000
         },
         {
            "Item1":10,
            "Item2":"Kundenspezifischer Stoßfänger 11",
            "Item3":35000
         },
         {
            "Item1":11,
            "Item2":"Kundenspezifischer Stoßfänger 12",
            "Item3":30000
         },
         {
            "Item1":12,
            "Item2":"Kundenspezifischer Stoßfänger 13",
            "Item3":35000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger 1",
            "Item3":30000
         },
         {
            "Item1":1,
            "Item2":"Kundenspezifischer Stoßfänger 2",
            "Item3":30000
         },
         {
            "Item1":2,
            "Item2":"Kundenspezifischer Stoßfänger 3",
            "Item3":30000
         },
         {
            "Item1":3,
            "Item2":"Kundenspezifischer Stoßfänger 4",
            "Item3":30000
         }
      ]
   },
   "Dubsta3":{
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierte Motorhaube 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Modifizierte Motorhaube 2",
            "Item3":20000
         }
      ],
      "6":[
         {
            "Item1":-1,
            "Item2":"Standard-Dach",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Maßgeschneidertes Dach 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Maßgeschneidertes Dach 2",
            "Item3":25000
         },
         {
            "Item1":2,
            "Item2":"Maßgeschneidertes Dach 3",
            "Item3":25000
         },
         {
            "Item1":3,
            "Item2":"Maßgeschneidertes Dach 4",
            "Item3":25000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger 1",
            "Item3":30000
         },
         {
            "Item1":1,
            "Item2":"Kundenspezifischer Stoßfänger 2",
            "Item3":35000
         },
         {
            "Item1":2,
            "Item2":"Kundenspezifischer Stoßfänger 3",
            "Item3":35000
         },
         {
            "Item1":3,
            "Item2":"Kundenspezifischer Stoßfänger 4",
            "Item3":40000
         },
         {
            "Item1":4,
            "Item2":"Kundenspezifischer Stoßfänger 5",
            "Item3":30000
         },
         {
            "Item1":5,
            "Item2":"Kundenspezifischer Stoßfänger 6",
            "Item3":35000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger 1",
            "Item3":30000
         },
         {
            "Item1":1,
            "Item2":"Kundenspezifischer Stoßfänger 2",
            "Item3":35000
         }
      ]
   },
   "Tropos":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Auspuff 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Auspuff 2",
            "Item3":15000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierte Motorhaube 1",
            "Item3":15000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Kein Spoiler",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Spoiler 1",
            "Item3":20000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Spoiler 2",
            "Item3":25000
         }
      ],
      "7":[
         {
            "Item1":-1,
            "Item2":"Keine Färbung",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Färbung 1",
            "Item3":30000
         },
         {
            "Item1":1,
            "Item2":"Färbung 2",
            "Item3":30000
         }
      ]
   },
   "Tampa2":{
      "7":[
         {
            "Item1":-1,
            "Item2":"Keine Färbung",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Färbung 1",
            "Item3":30000
         },
         {
            "Item1":1,
            "Item2":"Färbung 2",
            "Item3":30000
         }
      ]
   },
   "Pariah":{
      "1":[
         {
            "Item1":-1,
            "Item2":"Keine Schürze",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Inividuelle Schürze 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Inividuelle Schürze 2",
            "Item3":25000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierte Motorhaube 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Modifizierte Motorhaube 2",
            "Item3":20000
         },
         {
            "Item1":2,
            "Item2":"Modifizierte Motorhaube 3",
            "Item3":20000
         },
         {
            "Item1":3,
            "Item2":"Modifizierte Motorhaube 4",
            "Item3":30000
         },
         {
            "Item1":4,
            "Item2":"Modifizierte Motorhaube 5",
            "Item3":15000
         },
         {
            "Item1":5,
            "Item2":"Modifizierte Motorhaube 6",
            "Item3":20000
         },
         {
            "Item1":6,
            "Item2":"Modifizierte Motorhaube 7",
            "Item3":20000
         },
         {
            "Item1":7,
            "Item2":"Modifizierte Motorhaube 8",
            "Item3":30000
         },
         {
            "Item1":8,
            "Item2":"Modifizierte Motorhaube 9",
            "Item3":15000
         },
         {
            "Item1":9,
            "Item2":"Modifizierte Motorhaube 10",
            "Item3":20000
         },
         {
            "Item1":10,
            "Item2":"Modifizierte Motorhaube 11",
            "Item3":20000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Kein Spoiler",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Spoiler 1",
            "Item3":20000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Spoiler 2",
            "Item3":25000
         },
         {
            "Item1":2,
            "Item2":"Modifizierter Spoiler 3",
            "Item3":30000
         },
         {
            "Item1":3,
            "Item2":"Modifizierter Spoiler 4",
            "Item3":30000
         },
         {
            "Item1":4,
            "Item2":"Modifizierter Spoiler 5",
            "Item3":30000
         },
         {
            "Item1":5,
            "Item2":"Modifizierter Spoiler 6",
            "Item3":30000
         },
         {
            "Item1":6,
            "Item2":"Modifizierter Spoiler 7",
            "Item3":30000
         },
         {
            "Item1":7,
            "Item2":"Modifizierter Spoiler 8",
            "Item3":30000
         },
         {
            "Item1":8,
            "Item2":"Modifizierter Spoiler 9",
            "Item3":30000
         },
         {
            "Item1":9,
            "Item2":"Modifizierter Spoiler 10",
            "Item3":45000
         },
         {
            "Item1":10,
            "Item2":"Modifizierter Spoiler 11",
            "Item3":45000
         },
         {
            "Item1":11,
            "Item2":"Modifizierter Spoiler 12",
            "Item3":50000
         }
      ],
      "6":[
         {
            "Item1":-1,
            "Item2":"Standard-Dach",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Maßgeschneidertes Dach 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Maßgeschneidertes Dach 2",
            "Item3":25000
         }
      ],
      "7":[
         {
            "Item1":-1,
            "Item2":"Keine Färbung",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Färbung 1",
            "Item3":30000
         },
         {
            "Item1":1,
            "Item2":"Färbung 2",
            "Item3":30000
         },
         {
            "Item1":2,
            "Item2":"Färbung 3",
            "Item3":30000
         },
         {
            "Item1":3,
            "Item2":"Färbung 4",
            "Item3":30000
         },
         {
            "Item1":4,
            "Item2":"Färbung 5",
            "Item3":30000
         },
         {
            "Item1":5,
            "Item2":"Färbung 6",
            "Item3":30000
         },
         {
            "Item1":6,
            "Item2":"Färbung 7",
            "Item3":30000
         },
         {
            "Item1":7,
            "Item2":"Färbung 8",
            "Item3":30000
         },
         {
            "Item1":8,
            "Item2":"Färbung 9",
            "Item3":30000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger 1",
            "Item3":30000
         },
         {
            "Item1":1,
            "Item2":"Kundenspezifischer Stoßfänger 2",
            "Item3":35000
         },
         {
            "Item1":2,
            "Item2":"Kundenspezifischer Stoßfänger 3",
            "Item3":35000
         },
         {
            "Item1":3,
            "Item2":"Kundenspezifischer Stoßfänger 4",
            "Item3":40000
         },
         {
            "Item1":4,
            "Item2":"Kundenspezifischer Stoßfänger 5",
            "Item3":30000
         },
         {
            "Item1":5,
            "Item2":"Kundenspezifischer Stoßfänger 6",
            "Item3":35000
         },
         {
            "Item1":6,
            "Item2":"Kundenspezifischer Stoßfänger 7",
            "Item3":35000
         },
         {
            "Item1":7,
            "Item2":"Kundenspezifischer Stoßfänger 8",
            "Item3":40000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger 1",
            "Item3":30000
         },
         {
            "Item1":1,
            "Item2":"Kundenspezifischer Stoßfänger 2",
            "Item3":35000
         }
      ]
   },
   "Lynx":{
      "1":[
         {
            "Item1":-1,
            "Item2":"Keine Schürze",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Inividuelle Schürze 1",
            "Item3":15000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierte Motorhaube 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Modifizierte Motorhaube 2",
            "Item3":20000
         },
         {
            "Item1":2,
            "Item2":"Modifizierte Motorhaube 3",
            "Item3":20000
         },
         {
            "Item1":3,
            "Item2":"Modifizierte Motorhaube 4",
            "Item3":30000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Kein Spoiler",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Spoiler 1",
            "Item3":20000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Spoiler 2",
            "Item3":25000
         },
         {
            "Item1":2,
            "Item2":"Modifizierter Spoiler 3",
            "Item3":30000
         },
         {
            "Item1":3,
            "Item2":"Modifizierter Spoiler 4",
            "Item3":30000
         }
      ],
      "7":[
         {
            "Item1":-1,
            "Item2":"Keine Färbung",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Färbung 1",
            "Item3":30000
         },
         {
            "Item1":1,
            "Item2":"Färbung 2",
            "Item3":30000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger 1",
            "Item3":30000
         },
         {
            "Item1":1,
            "Item2":"Kundenspezifischer Stoßfänger 2",
            "Item3":35000
         },
         {
            "Item1":2,
            "Item2":"Kundenspezifischer Stoßfänger 3",
            "Item3":35000
         },
         {
            "Item1":3,
            "Item2":"Kundenspezifischer Stoßfänger 4",
            "Item3":40000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger 1",
            "Item3":30000
         },
         {
            "Item1":1,
            "Item2":"Kundenspezifischer Stoßfänger 2",
            "Item3":35000
         },
         {
            "Item1":2,
            "Item2":"Kundenspezifischer Stoßfänger 3",
            "Item3":35000
         },
         {
            "Item1":3,
            "Item2":"Kundenspezifischer Stoßfänger 4",
            "Item3":40000
         },
         {
            "Item1":4,
            "Item2":"Kundenspezifischer Stoßfänger 5",
            "Item3":40000
         }
      ]
   },
   "Furoregt":{

   },
   "Alpha":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Auspuff 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Auspuff 2",
            "Item3":15000
         }
      ],
      "1":[
         {
            "Item1":-1,
            "Item2":"Keine Schürze",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Inividuelle Schürze 1",
            "Item3":15000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierte Motorhaube 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Modifizierte Motorhaube 2",
            "Item3":20000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Kein Spoiler",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Spoiler 1",
            "Item3":20000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Spoiler 2",
            "Item3":25000
         },
         {
            "Item1":2,
            "Item2":"Modifizierter Spoiler 3",
            "Item3":30000
         },
         {
            "Item1":3,
            "Item2":"Modifizierter Spoiler 4",
            "Item3":30000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger 1",
            "Item3":25000
         }
      ]
   },
   "Cognoscenti":{

   },
   "Cog55":{

   },
   "Contender":{

   },
   "Nightshade":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Auspuff 1",
            "Item3":20000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierte Motorhaube 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Modifizierte Motorhaube 2",
            "Item3":20000
         },
         {
            "Item1":2,
            "Item2":"Modifizierte Motorhaube 3",
            "Item3":25000
         },
         {
            "Item1":3,
            "Item2":"Modifizierte Motorhaube 4",
            "Item3":25000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Kein Spoiler",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Spoiler 1",
            "Item3":20000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Spoiler 2",
            "Item3":25000
         },
         {
            "Item1":2,
            "Item2":"Modifizierter Spoiler 3",
            "Item3":30000
         },
         {
            "Item1":3,
            "Item2":"Modifizierter Spoiler 4",
            "Item3":30000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger 1",
            "Item3":25000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger 1",
            "Item3":25000
         }
      ]
   },
   "Dominator2":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Auspuff 1",
            "Item3":20000
         }
      ],
      "1":[
         {
            "Item1":-1,
            "Item2":"Keine Schürze",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Inividuelle Schürze 1",
            "Item3":15000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierte Motorhaube 1",
            "Item3":15000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Kein Spoiler",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Spoiler 1",
            "Item3":20000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Spoiler 2",
            "Item3":30000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger 1",
            "Item3":25000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger 1",
            "Item3":25000
         }
      ]
   },
   "Cogcabrio":{

   },
   "Buffalo2":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Auspuff 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Auspuff 2",
            "Item3":18000
         },
         {
            "Item1":2,
            "Item2":"Modifizierter Auspuff 3",
            "Item3":20000
         },
         {
            "Item1":3,
            "Item2":"Modifizierter Auspuff 4",
            "Item3":20000
         },
         {
            "Item1":4,
            "Item2":"Modifizierter Auspuff 5",
            "Item3":20000
         }
      ],
      "1":[
         {
            "Item1":-1,
            "Item2":"Keine Schürze",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Inividuelle Schürze 1",
            "Item3":10000
         },
         {
            "Item1":1,
            "Item2":"Inividuelle Schürze 2",
            "Item3":10000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierte Motorhaube 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Modifizierte Motorhaube 2",
            "Item3":18000
         },
         {
            "Item1":2,
            "Item2":"Modifizierte Motorhaube 3",
            "Item3":20000
         },
         {
            "Item1":3,
            "Item2":"Modifizierte Motorhaube 4",
            "Item3":20000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Kein Spoiler",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Spoiler 1",
            "Item3":13000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Spoiler 2",
            "Item3":14000
         },
         {
            "Item1":2,
            "Item2":"Modifizierter Spoiler 3",
            "Item3":15000
         },
         {
            "Item1":3,
            "Item2":"Modifizierter Spoiler 4",
            "Item3":15000
         },
         {
            "Item1":4,
            "Item2":"Modifizierter Spoiler 5",
            "Item3":20000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Kundenspezifischer Stoßfänger 2",
            "Item3":17000
         },
         {
            "Item1":2,
            "Item2":"Kundenspezifischer Stoßfänger 3",
            "Item3":20000
         },
         {
            "Item1":3,
            "Item2":"Kundenspezifischer Stoßfänger 4",
            "Item3":23000
         },
         {
            "Item1":4,
            "Item2":"Kundenspezifischer Stoßfänger 5",
            "Item3":25000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Kundenspezifischer Stoßfänger 2",
            "Item3":17000
         }
      ]
   },
   "Warrener":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Auspuff 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Auspuff 2",
            "Item3":18000
         },
         {
            "Item1":2,
            "Item2":"Modifizierter Auspuff 3",
            "Item3":20000
         },
         {
            "Item1":3,
            "Item2":"Modifizierter Auspuff 4",
            "Item3":20000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierte Motorhaube 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Modifizierte Motorhaube 2",
            "Item3":18000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Kein Spoiler",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Spoiler 1",
            "Item3":10000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Spoiler 2",
            "Item3":10000
         },
         {
            "Item1":2,
            "Item2":"Modifizierter Spoiler 3",
            "Item3":12000
         },
         {
            "Item1":3,
            "Item2":"Modifizierter Spoiler 4",
            "Item3":13000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Kundenspezifischer Stoßfänger 2",
            "Item3":17000
         },
         {
            "Item1":2,
            "Item2":"Kundenspezifischer Stoßfänger 3",
            "Item3":20000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Kundenspezifischer Stoßfänger 2",
            "Item3":17000
         }
      ]
   },
   "Primo2":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Auspuff 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Auspuff 2",
            "Item3":18000
         },
         {
            "Item1":2,
            "Item2":"Modifizierter Auspuff 3",
            "Item3":20000
         },
         {
            "Item1":3,
            "Item2":"Modifizierter Auspuff 4",
            "Item3":20000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Kein Spoiler",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Spoiler 1",
            "Item3":10000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Spoiler 2",
            "Item3":10000
         }
      ],
      "7":[
         {
            "Item1":-1,
            "Item2":"Keine Färbung",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Färbung 1",
            "Item3":30000
         },
         {
            "Item1":1,
            "Item2":"Färbung 2",
            "Item3":30000
         },
         {
            "Item1":2,
            "Item2":"Färbung 3",
            "Item3":30000
         },
         {
            "Item1":3,
            "Item2":"Färbung 4",
            "Item3":30000
         },
         {
            "Item1":4,
            "Item2":"Färbung 5",
            "Item3":30000
         },
         {
            "Item1":5,
            "Item2":"Färbung 6",
            "Item3":30000
         },
         {
            "Item1":6,
            "Item2":"Färbung 7",
            "Item3":30000
         },
         {
            "Item1":7,
            "Item2":"Färbung 8",
            "Item3":30000
         },
         {
            "Item1":8,
            "Item2":"Färbung 9",
            "Item3":30000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Kundenspezifischer Stoßfänger 2",
            "Item3":17000
         },
         {
            "Item1":2,
            "Item2":"Kundenspezifischer Stoßfänger 3",
            "Item3":20000
         },
         {
            "Item1":3,
            "Item2":"Kundenspezifischer Stoßfänger 4",
            "Item3":20000
         }
      ]
   },
   "Rebel2":{

   },
   "Rebel":{
      "8":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Kundenspezifischer Stoßfänger 2",
            "Item3":17000
         }
      ]
   },
   "Bodhi2":{
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierte Motorhaube 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Modifizierte Motorhaube 2",
            "Item3":18000
         },
         {
            "Item1":2,
            "Item2":"Modifizierte Motorhaube 3",
            "Item3":20000
         },
         {
            "Item1":3,
            "Item2":"Modifizierte Motorhaube 4",
            "Item3":20000
         },
         {
            "Item1":4,
            "Item2":"Modifizierte Motorhaube 5",
            "Item3":20000
         },
         {
            "Item1":5,
            "Item2":"Modifizierte Motorhaube 6",
            "Item3":20000
         }
      ],
      "6":[
         {
            "Item1":-1,
            "Item2":"Motorraum öffnen",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Maßgeschneidertes Dach 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Maßgeschneidertes Dach 2",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Maßgeschneidertes Dach 3",
            "Item3":20000
         },
         {
            "Item1":3,
            "Item2":"Maßgeschneidertes Dach 4",
            "Item3":20000
         },
         {
            "Item1":4,
            "Item2":"Maßgeschneidertes Dach 5",
            "Item3":22000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Kundenspezifischer Stoßfänger 2",
            "Item3":17000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Kundenspezifischer Stoßfänger 2",
            "Item3":17000
         }
      ]
   },
   "Bfinjection":{

   },
   "Stalion2":{

   },
   "Sabregt2":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Auspuff 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Auspuff 2",
            "Item3":18000
         },
         {
            "Item1":2,
            "Item2":"Modifizierter Auspuff 3",
            "Item3":25000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierte Motorhaube 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Modifizierte Motorhaube 2",
            "Item3":18000
         },
         {
            "Item1":2,
            "Item2":"Modifizierte Motorhaube 3",
            "Item3":20000
         },
         {
            "Item1":3,
            "Item2":"Modifizierte Motorhaube 4",
            "Item3":25000
         },
         {
            "Item1":4,
            "Item2":"Modifizierte Motorhaube 5",
            "Item3":25000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Kein Spoiler",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Spoiler 1",
            "Item3":10000
         }
      ],
      "7":[
         {
            "Item1":-1,
            "Item2":"Keine Färbung",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Färbung 1",
            "Item3":30000
         },
         {
            "Item1":1,
            "Item2":"Färbung 2",
            "Item3":30000
         },
         {
            "Item1":2,
            "Item2":"Färbung 3",
            "Item3":30000
         },
         {
            "Item1":3,
            "Item2":"Färbung 4",
            "Item3":30000
         },
         {
            "Item1":4,
            "Item2":"Färbung 5",
            "Item3":30000
         },
         {
            "Item1":5,
            "Item2":"Färbung 6",
            "Item3":30000
         },
         {
            "Item1":6,
            "Item2":"Färbung 7",
            "Item3":30000
         },
         {
            "Item1":7,
            "Item2":"Färbung 8",
            "Item3":30000
         },
         {
            "Item1":8,
            "Item2":"Färbung 9",
            "Item3":30000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Kundenspezifischer Stoßfänger 2",
            "Item3":17000
         },
         {
            "Item1":2,
            "Item2":"Kundenspezifischer Stoßfänger 3",
            "Item3":19000
         },
         {
            "Item1":3,
            "Item2":"Kundenspezifischer Stoßfänger 4",
            "Item3":22000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger 1",
            "Item3":15000
         }
      ]
   },
   "Sabregt":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Auspuff 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Auspuff 2",
            "Item3":18000
         },
         {
            "Item1":2,
            "Item2":"Modifizierter Auspuff 3",
            "Item3":25000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierte Motorhaube 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Modifizierte Motorhaube 2",
            "Item3":18000
         },
         {
            "Item1":2,
            "Item2":"Modifizierte Motorhaube 3",
            "Item3":20000
         },
         {
            "Item1":3,
            "Item2":"Modifizierte Motorhaube 4",
            "Item3":25000
         },
         {
            "Item1":4,
            "Item2":"Modifizierte Motorhaube 5",
            "Item3":25000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Kein Spoiler",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Spoiler 1",
            "Item3":10000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Kundenspezifischer Stoßfänger 2",
            "Item3":17000
         },
         {
            "Item1":2,
            "Item2":"Kundenspezifischer Stoßfänger 3",
            "Item3":19000
         },
         {
            "Item1":3,
            "Item2":"Kundenspezifischer Stoßfänger 4",
            "Item3":22000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger 1",
            "Item3":15000
         }
      ]
   },
   "Gauntlet2":{

   },
   "Chino2":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Auspuff 1",
            "Item3":15000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierte Motorhaube 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Modifizierte Motorhaube 2",
            "Item3":10000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger 1",
            "Item3":15000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger 1",
            "Item3":15000
         }
      ]
   },
   "Chino":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Auspuff 1",
            "Item3":15000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierte Motorhaube 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Modifizierte Motorhaube 2",
            "Item3":10000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger 1",
            "Item3":15000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger 1",
            "Item3":15000
         }
      ]
   },
   "Blade":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Auspuff 1",
            "Item3":15000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierte Motorhaube 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Modifizierte Motorhaube 2",
            "Item3":10000
         },
         {
            "Item1":2,
            "Item2":"Modifizierte Motorhaube 3",
            "Item3":15000
         },
         {
            "Item1":3,
            "Item2":"Modifizierte Motorhaube 4",
            "Item3":15000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Kein Spoiler",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Spoiler 1",
            "Item3":10000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Spoiler 2",
            "Item3":15000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger 1",
            "Item3":15000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger 1",
            "Item3":15000
         }
      ]
   },
   "Shotaro":{

   },
   "Faggio2":{

   },
   "Sanchez2":{

   },
   "Enduro":{

   },
   "PCJ":{

   },
   "Hexer":{

   },
   "Lectro":{

   },
   "Nemesis":{

   },
   "Hakuchou":{

   },
   "Ruffian":{

   },
   "Bmx":{

   },
   "Scorcher":{

   },
   "BF400":{

   },
   "CarbonRS":{

   },
   "Bati":{

   },
   "Double":{

   },
   "Diablous":{

   },
   "Cliffhanger":{

   },
   "Akuma":{

   },
   "Thrust":{

   },
   "Nightblade":{

   },
   "Vindicator":{

   },
   "Ratbike":{

   },
   "Blazer":{

   },
   "Gargoyle":{

   },
   "Sanctus":{

   },
   "Bagger":{

   },
   "Diablous2":{

   },
   "Sovereign":{

   },
   "Avarus":{

   },
   "Bati2":{

   },
   "Daemon":{

   },
   "Daemon2":{

   },
   "Defiler":{

   },
   "Vortex":{

   },
   "Vader":{

   },
   "Coquette3":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Auspuff 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Auspuff 2",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Modifizierter Auspuff 3",
            "Item3":15000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierte Motorhaube 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Modifizierte Motorhaube 2",
            "Item3":10000
         },
         {
            "Item1":2,
            "Item2":"Modifizierte Motorhaube 3",
            "Item3":15000
         },
         {
            "Item1":3,
            "Item2":"Modifizierte Motorhaube 4",
            "Item3":15000
         },
         {
            "Item1":4,
            "Item2":"Modifizierte Motorhaube 5",
            "Item3":15000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Kundenspezifischer Stoßfänger 2",
            "Item3":15000
         }
      ]
   },
   "Viseris":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Auspuff 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Auspuff 2",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Modifizierter Auspuff 3",
            "Item3":15000
         },
         {
            "Item1":3,
            "Item2":"Modifizierter Auspuff 4",
            "Item3":15000
         },
         {
            "Item1":4,
            "Item2":"Modifizierter Auspuff 5",
            "Item3":15000
         },
         {
            "Item1":5,
            "Item2":"Modifizierter Auspuff 6",
            "Item3":25000
         },
         {
            "Item1":6,
            "Item2":"Modifizierter Auspuff 7",
            "Item3":30000
         }
      ],
      "1":[
         {
            "Item1":-1,
            "Item2":"Keine Schürze",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Inividuelle Schürze 1",
            "Item3":10000
         },
         {
            "Item1":1,
            "Item2":"Inividuelle Schürze 2",
            "Item3":10000
         },
         {
            "Item1":2,
            "Item2":"Inividuelle Schürze 3",
            "Item3":10000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierte Motorhaube 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Modifizierte Motorhaube 2",
            "Item3":10000
         },
         {
            "Item1":2,
            "Item2":"Modifizierte Motorhaube 3",
            "Item3":15000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Kein Spoiler",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Spoiler 1",
            "Item3":25000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Spoiler 2",
            "Item3":25000
         },
         {
            "Item1":2,
            "Item2":"Modifizierter Spoiler 3",
            "Item3":25000
         },
         {
            "Item1":3,
            "Item2":"Modifizierter Spoiler 4",
            "Item3":25000
         },
         {
            "Item1":4,
            "Item2":"Modifizierter Spoiler 5",
            "Item3":25000
         },
         {
            "Item1":5,
            "Item2":"Modifizierter Spoiler 6",
            "Item3":25000
         },
         {
            "Item1":6,
            "Item2":"Modifizierter Spoiler 7",
            "Item3":25000
         },
         {
            "Item1":7,
            "Item2":"Modifizierter Spoiler 8",
            "Item3":25000
         },
         {
            "Item1":8,
            "Item2":"Modifizierter Spoiler 9",
            "Item3":25000
         },
         {
            "Item1":9,
            "Item2":"Modifizierter Spoiler 10",
            "Item3":25000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Kundenspezifischer Stoßfänger 2",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Kundenspezifischer Stoßfänger 3",
            "Item3":15000
         },
         {
            "Item1":3,
            "Item2":"Kundenspezifischer Stoßfänger 4",
            "Item3":15000
         },
         {
            "Item1":4,
            "Item2":"Kundenspezifischer Stoßfänger 5",
            "Item3":15000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger",
            "Item3":15000
         }
      ]
   },
   "Torero":{
      "3":[
         {
            "Item1":-1,
            "Item2":"Kein Spoiler",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Spoiler 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Spoiler 2",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Modifizierter Spoiler 3",
            "Item3":15000
         },
         {
            "Item1":3,
            "Item2":"Modifizierter Spoiler 4",
            "Item3":15000
         },
         {
            "Item1":4,
            "Item2":"Modifizierter Spoiler 5",
            "Item3":15000
         },
         {
            "Item1":5,
            "Item2":"Modifizierter Spoiler 6",
            "Item3":15000
         }
      ],
      "6":[
         {
            "Item1":-1,
            "Item2":"Motorraum öffnen",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Geschlossener Motorraum",
            "Item3":25000
         },
         {
            "Item1":1,
            "Item2":"Maßgeschneidertes Dach 1",
            "Item3":25000
         },
         {
            "Item1":2,
            "Item2":"Maßgeschneidertes Dach 2",
            "Item3":25000
         },
         {
            "Item1":3,
            "Item2":"Maßgeschneidertes Dach 3",
            "Item3":25000
         },
         {
            "Item1":4,
            "Item2":"Maßgeschneidertes Dach 4",
            "Item3":35000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Kundenspezifischer Stoßfänger 2",
            "Item3":15000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Kundenspezifischer Stoßfänger 2",
            "Item3":15000
         }
      ]
   },
   "Swinger":{
      "7":[
         {
            "Item1":-1,
            "Item2":"Keine Färbung",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Färbung 1",
            "Item3":30000
         },
         {
            "Item1":1,
            "Item2":"Färbung 2",
            "Item3":30000
         },
         {
            "Item1":2,
            "Item2":"Färbung 3",
            "Item3":30000
         },
         {
            "Item1":3,
            "Item2":"Färbung 4",
            "Item3":30000
         },
         {
            "Item1":4,
            "Item2":"Färbung 5",
            "Item3":30000
         },
         {
            "Item1":5,
            "Item2":"Färbung 6",
            "Item3":30000
         },
         {
            "Item1":6,
            "Item2":"Färbung 7",
            "Item3":30000
         },
         {
            "Item1":7,
            "Item2":"Färbung 8",
            "Item3":30000
         },
         {
            "Item1":8,
            "Item2":"Färbung 9",
            "Item3":30000
         },
         {
            "Item1":9,
            "Item2":"Färbung 10",
            "Item3":30000
         }
      ]
   },
   "Rapidgt3":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Auspuff 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Auspuff 2",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Modifizierter Auspuff 3",
            "Item3":15000
         },
         {
            "Item1":3,
            "Item2":"Modifizierter Auspuff 4",
            "Item3":15000
         },
         {
            "Item1":4,
            "Item2":"Modifizierter Auspuff 5",
            "Item3":15000
         },
         {
            "Item1":5,
            "Item2":"Modifizierter Auspuff 6",
            "Item3":15000
         },
         {
            "Item1":6,
            "Item2":"Modifizierter Auspuff 7",
            "Item3":25000
         },
         {
            "Item1":7,
            "Item2":"Modifizierter Auspuff 8",
            "Item3":25000
         },
         {
            "Item1":8,
            "Item2":"Modifizierter Auspuff 9",
            "Item3":30000
         },
         {
            "Item1":9,
            "Item2":"Modifizierter Auspuff 10",
            "Item3":30000
         },
         {
            "Item1":10,
            "Item2":"Modifizierter Auspuff 11",
            "Item3":35000
         },
         {
            "Item1":11,
            "Item2":"Modifizierter Auspuff 12",
            "Item3":35000
         },
         {
            "Item1":12,
            "Item2":"Modifizierter Auspuff 13",
            "Item3":40000
         },
         {
            "Item1":13,
            "Item2":"Modifizierter Auspuff 14",
            "Item3":40000
         },
         {
            "Item1":14,
            "Item2":"Modifizierter Auspuff 15",
            "Item3":50000
         },
         {
            "Item1":15,
            "Item2":"Modifizierter Auspuff 16",
            "Item3":50000
         }
      ],
      "1":[
         {
            "Item1":-1,
            "Item2":"Keine Schürze",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Inividuelle Schürze",
            "Item3":10000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Kein Spoiler",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Spoiler 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Spoiler 2",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Modifizierter Spoiler 3",
            "Item3":15000
         },
         {
            "Item1":3,
            "Item2":"Modifizierter Spoiler 4",
            "Item3":15000
         },
         {
            "Item1":4,
            "Item2":"Modifizierter Spoiler 5",
            "Item3":15000
         }
      ],
      "7":[
         {
            "Item1":-1,
            "Item2":"Keine Färbung",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Färbung 1",
            "Item3":30000
         },
         {
            "Item1":1,
            "Item2":"Färbung 2",
            "Item3":30000
         },
         {
            "Item1":2,
            "Item2":"Färbung 3",
            "Item3":30000
         },
         {
            "Item1":3,
            "Item2":"Färbung 4",
            "Item3":30000
         },
         {
            "Item1":4,
            "Item2":"Färbung 5",
            "Item3":30000
         },
         {
            "Item1":5,
            "Item2":"Färbung 6",
            "Item3":30000
         },
         {
            "Item1":6,
            "Item2":"Färbung 7",
            "Item3":30000
         },
         {
            "Item1":7,
            "Item2":"Färbung 8",
            "Item3":30000
         },
         {
            "Item1":8,
            "Item2":"Färbung 9",
            "Item3":30000
         },
         {
            "Item1":9,
            "Item2":"Färbung 10",
            "Item3":30000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Kundenspezifischer Stoßfänger 2",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Kundenspezifischer Stoßfänger 3",
            "Item3":15000
         },
         {
            "Item1":3,
            "Item2":"Kundenspezifischer Stoßfänger 4",
            "Item3":15000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Kundenspezifischer Stoßfänger 2",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Kundenspezifischer Stoßfänger 3",
            "Item3":15000
         }
      ]
   },
   "Monroe":{

   },
   "Mamba":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Auspuff",
            "Item3":15000
         }
      ],
      "7":[
         {
            "Item1":-1,
            "Item2":"Keine Färbung",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Färbung 1",
            "Item3":30000
         },
         {
            "Item1":1,
            "Item2":"Färbung 2",
            "Item3":30000
         },
         {
            "Item1":2,
            "Item2":"Färbung 3",
            "Item3":30000
         },
         {
            "Item1":3,
            "Item2":"Färbung 4",
            "Item3":30000
         },
         {
            "Item1":4,
            "Item2":"Färbung 5",
            "Item3":30000
         },
         {
            "Item1":5,
            "Item2":"Färbung 6",
            "Item3":30000
         },
         {
            "Item1":6,
            "Item2":"Färbung 7",
            "Item3":30000
         },
         {
            "Item1":7,
            "Item2":"Färbung 8",
            "Item3":30000
         },
         {
            "Item1":8,
            "Item2":"Färbung 9",
            "Item3":30000
         },
         {
            "Item1":9,
            "Item2":"Färbung 10",
            "Item3":30000
         }
      ]
   },
   "Feltzer3":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Auspuff 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Auspuff 2",
            "Item3":15000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger",
            "Item3":20000
         }
      ]
   },
   "Cheetah2":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Auspuff 1",
            "Item3":10000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Auspuff 2",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Modifizierter Auspuff 3",
            "Item3":15000
         }
      ],
      "1":[
         {
            "Item1":-1,
            "Item2":"Keine Schürze",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Inividuelle Schürze",
            "Item3":10000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierte Motorhaube 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Modifizierte Motorhaube 2",
            "Item3":10000
         },
         {
            "Item1":2,
            "Item2":"Modifizierte Motorhaube 3",
            "Item3":15000
         },
         {
            "Item1":3,
            "Item2":"Modifizierte Motorhaube 4",
            "Item3":15000
         }
      ]
   },
   "Infernus2":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Auspuff 1",
            "Item3":10000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Auspuff 2",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Modifizierter Auspuff 3",
            "Item3":15000
         }
      ],
      "1":[
         {
            "Item1":-1,
            "Item2":"Keine Schürze",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Inividuelle Schürze",
            "Item3":10000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Kein Spoiler",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Spoiler 1",
            "Item3":10000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Spoiler 2",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Modifizierter Spoiler 3",
            "Item3":200000
         },
         {
            "Item1":3,
            "Item2":"Modifizierter Spoiler 4",
            "Item3":25000
         },
         {
            "Item1":4,
            "Item2":"Modifizierter Spoiler 5",
            "Item3":25000
         },
         {
            "Item1":5,
            "Item2":"Modifizierter Spoiler 6",
            "Item3":35000
         }
      ],
      "6":[
         {
            "Item1":-1,
            "Item2":"Закрытый отсек двигателя",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Открытый отсек двигателя",
            "Item3":25000
         }
      ]
   },
   "Bifta":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Auspuff 1",
            "Item3":10000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Auspuff 2",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Modifizierter Auspuff 3",
            "Item3":20000
         }
      ],
      "1":[
         {
            "Item1":-1,
            "Item2":"Keine Schürze",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Inividuelle Schürze",
            "Item3":10000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Kein Spoiler",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Spoiler 1",
            "Item3":10000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Spoiler 2",
            "Item3":10000
         }
      ],
      "6":[
         {
            "Item1":-1,
            "Item2":"Kein Dach",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Hartes Dach",
            "Item3":10000
         }
      ]
   },
   "Casco":{

   },
   "Massacro":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Auspuff",
            "Item3":10000
         }
      ],
      "1":[
         {
            "Item1":-1,
            "Item2":"Standard Schürze",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Inividuelle Schürze 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Inividuelle Schürze 2",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Inividuelle Schürze 3",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Inividuelle Schürze 4",
            "Item3":15000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Carbon-Motorhaube 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Modifizierte Motorhaube",
            "Item3":10000
         },
         {
            "Item1":2,
            "Item2":"Carbon-Motorhaube 2",
            "Item3":15000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Kein Spoiler",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Spoiler 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Spoiler 2",
            "Item3":20000
         },
         {
            "Item1":2,
            "Item2":"Modifizierter Spoiler 3",
            "Item3":25000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Kundenspezifischer Stoßfänger 2",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Kundenspezifischer Stoßfänger 3",
            "Item3":15000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger 1",
            "Item3":15000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger 2",
            "Item3":15000
         }
      ]
   },
   "Feltzer2":{
      "3":[
         {
            "Item1":-1,
            "Item2":"Kein Spoiler",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Spoiler 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Spoiler 2",
            "Item3":20000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger",
            "Item3":15000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger",
            "Item3":15000
         }
      ]
   },
   "Sandking2":{
      "1":[
         {
            "Item1":-1,
            "Item2":"Standard Schürze",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Inividuelle Schürze 1",
            "Item3":10000
         },
         {
            "Item1":1,
            "Item2":"Inividuelle Schürze 2",
            "Item3":10000
         }
      ],
      "4":[
         {
            "Item1":-1,
            "Item2":"Стандартная решётка",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Заказная решётка 1",
            "Item3":7000
         },
         {
            "Item1":1,
            "Item2":"Заказная решётка 2",
            "Item3":7000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger 1",
            "Item3":10000
         },
         {
            "Item1":1,
            "Item2":"Kundenspezifischer Stoßfänger 2",
            "Item3":10000
         },
         {
            "Item1":2,
            "Item2":"Kundenspezifischer Stoßfänger 2",
            "Item3":11000
         },
         {
            "Item1":3,
            "Item2":"Kundenspezifischer Stoßfänger 2",
            "Item3":20000
         }
      ]
   },
   "Sandking":{
      "1":[
         {
            "Item1":-1,
            "Item2":"Standard Schürze",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Inividuelle Schürze 1",
            "Item3":10000
         },
         {
            "Item1":1,
            "Item2":"Inividuelle Schürze 2",
            "Item3":10000
         }
      ],
      "4":[
         {
            "Item1":-1,
            "Item2":"Стандартная решётка",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Заказная решётка 1",
            "Item3":7000
         },
         {
            "Item1":1,
            "Item2":"Заказная решётка 2",
            "Item3":7000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger 1",
            "Item3":10000
         },
         {
            "Item1":1,
            "Item2":"Kundenspezifischer Stoßfänger 2",
            "Item3":10000
         },
         {
            "Item1":2,
            "Item2":"Kundenspezifischer Stoßfänger 2",
            "Item3":11000
         },
         {
            "Item1":3,
            "Item2":"Kundenspezifischer Stoßfänger 2",
            "Item3":20000
         }
      ]
   },
   "Brawler":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Keine Färbung",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Färbung 1",
            "Item3":30000
         }
      ],
      "6":[
         {
            "Item1":-1,
            "Item2":"Standard-Dach",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Maßgeschneidertes Dach 1",
            "Item3":10000
         },
         {
            "Item1":1,
            "Item2":"Maßgeschneidertes Dach 2",
            "Item3":10000
         },
         {
            "Item1":2,
            "Item2":"Maßgeschneidertes Dach 3",
            "Item3":10000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger 1",
            "Item3":10000
         },
         {
            "Item1":1,
            "Item2":"Kundenspezifischer Stoßfänger 2",
            "Item3":10000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger 1",
            "Item3":10000
         },
         {
            "Item1":1,
            "Item2":"Kundenspezifischer Stoßfänger 2",
            "Item3":10000
         }
      ]
   },
   "Revolter":{
      "7":[
         {
            "Item1":-1,
            "Item2":"Keine Färbung",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Färbung 1",
            "Item3":30000
         },
         {
            "Item1":1,
            "Item2":"Färbung 2",
            "Item3":30000
         },
         {
            "Item1":2,
            "Item2":"Färbung 3",
            "Item3":30000
         },
         {
            "Item1":3,
            "Item2":"Färbung 4",
            "Item3":30000
         },
         {
            "Item1":4,
            "Item2":"Färbung 5",
            "Item3":30000
         },
         {
            "Item1":5,
            "Item2":"Färbung 6",
            "Item3":30000
         },
         {
            "Item1":6,
            "Item2":"Färbung 7",
            "Item3":30000
         },
         {
            "Item1":7,
            "Item2":"Färbung 8",
            "Item3":30000
         },
         {
            "Item1":8,
            "Item2":"Färbung 9",
            "Item3":30000
         },
         {
            "Item1":9,
            "Item2":"Färbung 10",
            "Item3":30000
         },
         {
            "Item1":10,
            "Item2":"Färbung 11",
            "Item3":30000
         },
         {
            "Item1":11,
            "Item2":"Färbung 12",
            "Item3":30000
         },
         {
            "Item1":12,
            "Item2":"Färbung 13",
            "Item3":20000
         },
         {
            "Item1":13,
            "Item2":"Färbung 14",
            "Item3":30000
         },
         {
            "Item1":14,
            "Item2":"Färbung 15",
            "Item3":30000
         },
         {
            "Item1":15,
            "Item2":"Färbung 16",
            "Item3":30000
         },
         {
            "Item1":16,
            "Item2":"Färbung 17",
            "Item3":30000
         },
         {
            "Item1":17,
            "Item2":"Färbung 18",
            "Item3":30000
         },
         {
            "Item1":18,
            "Item2":"Färbung 19",
            "Item3":30000
         },
         {
            "Item1":19,
            "Item2":"Färbung 20",
            "Item3":30000
         },
         {
            "Item1":20,
            "Item2":"Färbung 21",
            "Item3":30000
         },
         {
            "Item1":21,
            "Item2":"Färbung 22",
            "Item3":30000
         },
         {
            "Item1":22,
            "Item2":"Färbung 23",
            "Item3":20000
         },
         {
            "Item1":23,
            "Item2":"Färbung 24",
            "Item3":30000
         },
         {
            "Item1":24,
            "Item2":"Färbung 25",
            "Item3":30000
         },
         {
            "Item1":25,
            "Item2":"Färbung 26",
            "Item3":30000
         },
         {
            "Item1":26,
            "Item2":"Färbung 27",
            "Item3":30000
         },
         {
            "Item1":27,
            "Item2":"Färbung 28",
            "Item3":30000
         },
         {
            "Item1":28,
            "Item2":"Färbung 29",
            "Item3":30000
         },
         {
            "Item1":29,
            "Item2":"Färbung 30",
            "Item3":30000
         },
         {
            "Item1":30,
            "Item2":"Färbung 31",
            "Item3":30000
         },
         {
            "Item1":31,
            "Item2":"Färbung 32",
            "Item3":30000
         },
         {
            "Item1":32,
            "Item2":"Färbung 33",
            "Item3":20000
         },
         {
            "Item1":33,
            "Item2":"Färbung 34",
            "Item3":30000
         },
         {
            "Item1":34,
            "Item2":"Färbung 35",
            "Item3":30000
         },
         {
            "Item1":35,
            "Item2":"Färbung 36",
            "Item3":30000
         },
         {
            "Item1":36,
            "Item2":"Färbung 37",
            "Item3":30000
         },
         {
            "Item1":37,
            "Item2":"Färbung 38",
            "Item3":30000
         },
         {
            "Item1":38,
            "Item2":"Färbung 39",
            "Item3":30000
         },
         {
            "Item1":39,
            "Item2":"Färbung 40",
            "Item3":30000
         }
      ]
   },
   "Futo":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Auspuff 1",
            "Item3":7000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Auspuff 2",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Modifizierter Auspuff 3",
            "Item3":20000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Carbon-Motorhaube 1",
            "Item3":10000
         },
         {
            "Item1":1,
            "Item2":"Carbon-Motorhaube 2",
            "Item3":10000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Kein Spoiler",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Spoiler 1",
            "Item3":7000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Spoiler 2",
            "Item3":10000
         },
         {
            "Item1":2,
            "Item2":"Modifizierter Spoiler 3",
            "Item3":15000
         },
         {
            "Item1":3,
            "Item2":"Modifizierter Spoiler 4",
            "Item3":15000
         }
      ],
      "4":[
         {
            "Item1":-1,
            "Item2":"Standard Grill",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Заказная решётка 1",
            "Item3":7000
         },
         {
            "Item1":1,
            "Item2":"Заказная решётка 2",
            "Item3":7000
         }
      ],
      "7":[
         {
            "Item1":-1,
            "Item2":"Keine Färbung",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Färbung 1",
            "Item3":30000
         },
         {
            "Item1":1,
            "Item2":"Ржавчина 1",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Ржавчина 2",
            "Item3":20000
         },
         {
            "Item1":3,
            "Item2":"Färbung 2",
            "Item3":30000
         },
         {
            "Item1":4,
            "Item2":"Färbung 3",
            "Item3":30000
         },
         {
            "Item1":5,
            "Item2":"Färbung 4",
            "Item3":30000
         },
         {
            "Item1":6,
            "Item2":"Färbung 5",
            "Item3":30000
         },
         {
            "Item1":7,
            "Item2":"Färbung 6",
            "Item3":30000
         },
         {
            "Item1":8,
            "Item2":"Färbung 7",
            "Item3":30000
         },
         {
            "Item1":9,
            "Item2":"Färbung 8",
            "Item3":30000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger 1",
            "Item3":10000
         },
         {
            "Item1":1,
            "Item2":"Kundenspezifischer Stoßfänger 2",
            "Item3":10000
         },
         {
            "Item1":2,
            "Item2":"Расширение",
            "Item3":35000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger 1",
            "Item3":10000
         },
         {
            "Item1":1,
            "Item2":"Kundenspezifischer Stoßfänger 2",
            "Item3":10000
         },
         {
            "Item1":2,
            "Item2":"Kundenspezifischer Stoßfänger 3",
            "Item3":10000
         }
      ]
   },
   "Moonbeam2":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Auspuff",
            "Item3":7000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Без колеса на багажнике",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"С колесом на багажнике",
            "Item3":6000
         }
      ],
      "4":[
         {
            "Item1":-1,
            "Item2":"Standard Grill",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Заказная решётка 1",
            "Item3":7000
         },
         {
            "Item1":1,
            "Item2":"Заказная решётка 2",
            "Item3":7000
         }
      ],
      "6":[
         {
            "Item1":-1,
            "Item2":"Standard-Dach",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Maßgeschneidertes Dach 1",
            "Item3":7000
         },
         {
            "Item1":1,
            "Item2":"Maßgeschneidertes Dach 2",
            "Item3":7000
         }
      ],
      "7":[
         {
            "Item1":-1,
            "Item2":"Keine Färbung",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Färbung 1",
            "Item3":30000
         },
         {
            "Item1":1,
            "Item2":"Färbung 2",
            "Item3":30000
         },
         {
            "Item1":2,
            "Item2":"Färbung 3",
            "Item3":30000
         },
         {
            "Item1":3,
            "Item2":"Färbung 4",
            "Item3":30000
         },
         {
            "Item1":4,
            "Item2":"Färbung 5",
            "Item3":30000
         },
         {
            "Item1":5,
            "Item2":"Färbung 6",
            "Item3":30000
         },
         {
            "Item1":6,
            "Item2":"Färbung 7",
            "Item3":30000
         },
         {
            "Item1":7,
            "Item2":"Färbung 8",
            "Item3":30000
         },
         {
            "Item1":8,
            "Item2":"Färbung 9",
            "Item3":30000
         }
      ]
   },
   "Hermes":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Auspuff",
            "Item3":10000
         }
      ],
      "1":[
         {
            "Item1":-1,
            "Item2":"Закрытые колёса сзади",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Открытые колёса сзади",
            "Item3":10000
         }
      ],
      "7":[
         {
            "Item1":-1,
            "Item2":"Keine Färbung",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Färbung 1",
            "Item3":30000
         },
         {
            "Item1":1,
            "Item2":"Färbung 2",
            "Item3":30000
         },
         {
            "Item1":2,
            "Item2":"Färbung 3",
            "Item3":30000
         },
         {
            "Item1":3,
            "Item2":"Färbung 4",
            "Item3":30000
         },
         {
            "Item1":4,
            "Item2":"Färbung 5",
            "Item3":30000
         },
         {
            "Item1":5,
            "Item2":"Ржавчина 1",
            "Item3":30000
         },
         {
            "Item1":6,
            "Item2":"Ржавчина 2",
            "Item3":30000
         },
         {
            "Item1":7,
            "Item2":"Färbung 6",
            "Item3":30000
         },
         {
            "Item1":8,
            "Item2":"Ржавчина 3",
            "Item3":30000
         },
         {
            "Item1":9,
            "Item2":"Färbung 7",
            "Item3":30000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger 1",
            "Item3":10000
         },
         {
            "Item1":1,
            "Item2":"Kundenspezifischer Stoßfänger 2",
            "Item3":10000
         },
         {
            "Item1":2,
            "Item2":"Kundenspezifischer Stoßfänger 3",
            "Item3":10000
         },
         {
            "Item1":3,
            "Item2":"Kundenspezifischer Stoßfänger 4",
            "Item3":10000
         },
         {
            "Item1":4,
            "Item2":"Kundenspezifischer Stoßfänger 5",
            "Item3":10000
         },
         {
            "Item1":5,
            "Item2":"Kundenspezifischer Stoßfänger 6",
            "Item3":10000
         },
         {
            "Item1":6,
            "Item2":"Kundenspezifischer Stoßfänger 7",
            "Item3":10000
         },
         {
            "Item1":7,
            "Item2":"Kundenspezifischer Stoßfänger 8",
            "Item3":10000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger 1",
            "Item3":10000
         },
         {
            "Item1":1,
            "Item2":"Kundenspezifischer Stoßfänger 2",
            "Item3":10000
         }
      ]
   },
   "Faction2":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Auspuff 1",
            "Item3":10000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Auspuff 2",
            "Item3":8000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierte Motorhaube",
            "Item3":7000
         }
      ],
      "7":[
         {
            "Item1":-1,
            "Item2":"Keine Färbung",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Färbung 1",
            "Item3":30000
         },
         {
            "Item1":1,
            "Item2":"Färbung 2",
            "Item3":30000
         },
         {
            "Item1":2,
            "Item2":"Färbung 3",
            "Item3":30000
         },
         {
            "Item1":3,
            "Item2":"Färbung 4",
            "Item3":30000
         },
         {
            "Item1":4,
            "Item2":"Färbung 5",
            "Item3":30000
         },
         {
            "Item1":5,
            "Item2":"Färbung 6",
            "Item3":30000
         },
         {
            "Item1":6,
            "Item2":"Färbung 7",
            "Item3":30000
         },
         {
            "Item1":7,
            "Item2":"Färbung 8",
            "Item3":30000
         }
      ]
   },
   "Faction":{

   },
   "Dukes":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Auspuff",
            "Item3":7000
         },
         {
            "Item1":1,
            "Item2":"Боковые глушители",
            "Item3":15000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierte Motorhaube",
            "Item3":7000
         },
         {
            "Item1":1,
            "Item2":"Haube mit Lufteinlass 1",
            "Item3":10000
         },
         {
            "Item1":2,
            "Item2":"Carbon-Motorhaube",
            "Item3":12000
         },
         {
            "Item1":3,
            "Item2":"Haube mit Lufteinlass 2",
            "Item3":15000
         },
         {
            "Item1":4,
            "Item2":"Haube mit Lufteinlass 3",
            "Item3":15000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Стандартный спойлер",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Spoiler",
            "Item3":7000
         }
      ],
      "6":[
         {
            "Item1":-1,
            "Item2":"Standard-Dach",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Цельная крыша",
            "Item3":7000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger",
            "Item3":7000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Zusatz Drag",
            "Item3":7000
         }
      ]
   },
   "Buccaneer2":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Seitenschalldämpfer",
            "Item3":7000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Haube mit Lufteinlass 1",
            "Item3":10000
         },
         {
            "Item1":1,
            "Item2":"Haube mit Lufteinlass 1",
            "Item3":7000
         },
         {
            "Item1":2,
            "Item2":"Haube mit Lufteinlass 1",
            "Item3":15000
         },
         {
            "Item1":3,
            "Item2":"Haube mit Lufteinlass 1",
            "Item3":15000
         }
      ],
      "4":[
         {
            "Item1":-1,
            "Item2":"Standard Grill",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Grill",
            "Item3":7000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger",
            "Item3":7000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger",
            "Item3":7000
         },
         {
            "Item1":1,
            "Item2":"Kundenspezifischer Stoßfänger Mit Zusatz Drag",
            "Item3":10000
         }
      ]
   },
   "Rhapsody":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Doppel-Barrel-Spoiler",
            "Item3":7000
         },
         {
            "Item1":1,
            "Item2":"Vierzylinder-Schalldämpfer",
            "Item3":11000
         },
         {
            "Item1":2,
            "Item2":"Seitenschalldämpfer",
            "Item3":15000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":1,
            "Item2":"Haube mit Lufteinlass 1",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Haube mit Lufteinlass 1",
            "Item3":15000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Kein Spoiler",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Erhöhter Spoiler",
            "Item3":7000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger",
            "Item3":7000
         }
      ]
   },
   "Panto":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Titan Auspuff",
            "Item3":7000
         },
         {
            "Item1":1,
            "Item2":"Chrome Schalldämpfer",
            "Item3":10000
         },
         {
            "Item1":2,
            "Item2":"Titan Auspuff Tuner",
            "Item3":12000
         },
         {
            "Item1":3,
            "Item2":"Shakotan-Schalldämpfer",
            "Item3":13000
         },
         {
            "Item1":4,
            "Item2":"Seitenschalldämpfer",
            "Item3":14000
         }
      ],
      "1":[
         {
            "Item1":-1,
            "Item2":"Standardschwellen",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Niedrige Schwellen",
            "Item3":10000
         },
         {
            "Item1":1,
            "Item2":"Sportschwellen",
            "Item3":11000
         },
         {
            "Item1":2,
            "Item2":"Schwellenwerte mit Aufklebern",
            "Item3":13000
         },
         {
            "Item1":3,
            "Item2":"Carbon Verkleidungen",
            "Item3":16000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Nein",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Lackierter Spoiler",
            "Item3":22000
         },
         {
            "Item1":1,
            "Item2":"Carbon-Spoiler",
            "Item3":26000
         },
         {
            "Item1":2,
            "Item2":"Drift-Spoiler",
            "Item3":16000
         },
         {
            "Item1":3,
            "Item2":"Dachträger",
            "Item3":13000
         },
         {
            "Item1":4,
            "Item2":"Dachkoffer mit Gerümpel.",
            "Item3":15000
         }
      ],
      "4":[
         {
            "Item1":-1,
            "Item2":"Standard Grill",
            "Item3":3000
         },
         {
            "Item1":0,
            "Item2":"Kenguryatniki",
            "Item3":10000
         },
         {
            "Item1":1,
            "Item2":"Kenguryatnik mit Aufklebern",
            "Item3":12000
         },
         {
            "Item1":2,
            "Item2":"Verstärkter Kenguryatnik",
            "Item3":14000
         }
      ],
      "6":[
         {
            "Item1":-1,
            "Item2":"Standard-Dach",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Carbon Dach",
            "Item3":10000
         },
         {
            "Item1":1,
            "Item2":"Dach und Hintertür",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Aufkleber Dach",
            "Item3":12000
         },
         {
            "Item1":3,
            "Item2":"Aufkleber Dach und die Tür",
            "Item3":16000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Normalspur Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Frontteiler",
            "Item3":13000
         },
         {
            "Item1":1,
            "Item2":"Kohlenstoffspalter",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Stoßstange Extreme Aero",
            "Item3":16000
         },
         {
            "Item1":3,
            "Item2":"Frontstoßstange mit Aufklebern",
            "Item3":15000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Carbon-Stoßstange",
            "Item3":13000
         },
         {
            "Item1":1,
            "Item2":"Hintere Stoßstange mit Aufklebern",
            "Item3":15000
         }
      ]
   },
   "Issi2":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Doppelter Schalldämpfer",
            "Item3":7000
         }
      ],
      "1":[
         {
            "Item1":-1,
            "Item2":"Standardschwellen",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Maßgeschneiderte Schwellenwerte",
            "Item3":8000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Haube mit Lufteinlass",
            "Item3":10000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Normalspur Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Frontteiler",
            "Item3":7000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Заказной зад. бампер",
            "Item3":8000
         }
      ]
   },
   "GP1":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Doppelter Schalldämpfer",
            "Item3":7000
         },
         {
            "Item1":1,
            "Item2":"Doppelter Schalldämpfer 2",
            "Item3":23000
         },
         {
            "Item1":2,
            "Item2":"Счетверенный глушитель LM",
            "Item3":15000
         },
         {
            "Item1":3,
            "Item2":"Глушитель LM (карбон)",
            "Item3":19000
         },
         {
            "Item1":4,
            "Item2":"Глушитель LM доп.цвета",
            "Item3":18000
         },
         {
            "Item1":5,
            "Item2":"Большой глушитель",
            "Item3":13000
         },
         {
            "Item1":6,
            "Item2":"Большой укороченный",
            "Item3":16000
         },
         {
            "Item1":7,
            "Item2":"Большой (карбон)",
            "Item3":11000
         },
         {
            "Item1":8,
            "Item2":"Большой доп.цвета",
            "Item3":17000
         },
         {
            "Item1":9,
            "Item2":"Глушитель Offset (карбон)",
            "Item3":10000
         },
         {
            "Item1":10,
            "Item2":"Глушитель Offset доп.цвета",
            "Item3":19000
         },
         {
            "Item1":11,
            "Item2":"Набор глушителей LM",
            "Item3":30000
         },
         {
            "Item1":12,
            "Item2":"Набор LM (карбон)",
            "Item3":25000
         },
         {
            "Item1":13,
            "Item2":"Набор LM доп.цвета",
            "Item3":13000
         },
         {
            "Item1":15,
            "Item2":"Большой набор (карбон)",
            "Item3":24000
         },
         {
            "Item1":16,
            "Item2":"Большой набор доп.цвета",
            "Item3":20000
         },
         {
            "Item1":17,
            "Item2":"Набор глушителей Offset",
            "Item3":21000
         },
         {
            "Item1":17,
            "Item2":"Набор Offset доп.цвета",
            "Item3":21000
         }
      ],
      "1":[
         {
            "Item1":-1,
            "Item2":"Standardschwellen",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Полуспортивные пороги",
            "Item3":20000
         },
         {
            "Item1":1,
            "Item2":"Sportschwellen",
            "Item3":21000
         },
         {
            "Item1":2,
            "Item2":"Maßgeschneiderte Schwellenwerte",
            "Item3":23000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierte Motorhaube",
            "Item3":16000
         },
         {
            "Item1":1,
            "Item2":"Carbon-Motorhaube",
            "Item3":16000
         },
         {
            "Item1":2,
            "Item2":"Haube mit Lufteinlass",
            "Item3":15000
         },
         {
            "Item1":3,
            "Item2":"Haube mit Lufteinlass 2",
            "Item3":15000
         },
         {
            "Item1":4,
            "Item2":"Капот с мелкой решеткой",
            "Item3":15000
         },
         {
            "Item1":5,
            "Item2":"Капот со шторками",
            "Item3":15000
         },
         {
            "Item1":6,
            "Item2":"Капот LM",
            "Item3":18000
         },
         {
            "Item1":7,
            "Item2":"Капот LM (карбон)",
            "Item3":20000
         },
         {
            "Item1":8,
            "Item2":"Трековый капот",
            "Item3":17000
         },
         {
            "Item1":9,
            "Item2":"Спортивный капот",
            "Item3":15000
         },
         {
            "Item1":10,
            "Item2":"Гоночный капот (карбон)",
            "Item3":15000
         },
         {
            "Item1":11,
            "Item2":"Капот GT",
            "Item3":20000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Nein",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Слегка Spoiler angehoben",
            "Item3":22000
         },
         {
            "Item1":1,
            "Item2":"Spoiler angehoben",
            "Item3":26000
         },
         {
            "Item1":2,
            "Item2":"Spoiler angehoben (карбон)",
            "Item3":16000
         },
         {
            "Item1":3,
            "Item2":"Спойлер Branch",
            "Item3":13000
         },
         {
            "Item1":4,
            "Item2":"Низкий спойлер",
            "Item3":15000
         },
         {
            "Item1":5,
            "Item2":"Спойлер Tuner",
            "Item3":15000
         },
         {
            "Item1":6,
            "Item2":"Двухцветный спойлер",
            "Item3":15000
         },
         {
            "Item1":7,
            "Item2":"Спойлер LM",
            "Item3":15000
         },
         {
            "Item1":8,
            "Item2":"GT Wing",
            "Item3":15000
         },
         {
            "Item1":9,
            "Item2":"Поднятый и LM спойлеры",
            "Item3":15000
         },
         {
            "Item1":10,
            "Item2":"Поднятый и LM (карбон)",
            "Item3":15000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Normalspur Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger",
            "Item3":13000
         },
         {
            "Item1":1,
            "Item2":"Концептуальный бампер",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Чемпионский бампер",
            "Item3":15000
         },
         {
            "Item1":3,
            "Item2":"Спортивный бампер",
            "Item3":15000
         },
         {
            "Item1":4,
            "Item2":"Бампер Tuner",
            "Item3":15000
         },
         {
            "Item1":5,
            "Item2":"Бампер LM",
            "Item3":15000
         },
         {
            "Item1":6,
            "Item2":"Турнирный бампер",
            "Item3":15000
         },
         {
            "Item1":7,
            "Item2":"Бампер Contest",
            "Item3":15000
         },
         {
            "Item1":8,
            "Item2":"Бампер GT",
            "Item3":15000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Стандартный зад. диффузор",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Карбоновый диффузор",
            "Item3":13000
         },
         {
            "Item1":1,
            "Item2":"Диффузор с цветной каймой",
            "Item3":15000
         }
      ]
   },
   "Omnis":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Titan Auspuff Tuner",
            "Item3":18000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Стандартный спойлер",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Nein",
            "Item3":3000
         },
         {
            "Item1":1,
            "Item2":"Гигантский спойлер",
            "Item3":26000
         }
      ],
      "7":[
         {
            "Item1":-1,
            "Item2":"Keine Färbung",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Раллийная классическая",
            "Item3":18000
         },
         {
            "Item1":1,
            "Item2":"Раллийная ретро",
            "Item3":10000
         }
      ]
   },
   "Reaper":{
      "3":[
         {
            "Item1":-1,
            "Item2":"Стандартный спойлер",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Маленький спойлер",
            "Item3":10000
         },
         {
            "Item1":1,
            "Item2":"Средний спойлер",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Высокий спойлер",
            "Item3":25000
         }
      ]
   },
   "Zentorno":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Двойной глушитель",
            "Item3":18000
         },
         {
            "Item1":1,
            "Item2":"Большой глушитель",
            "Item3":20000
         },
         {
            "Item1":2,
            "Item2":"Двойной овальный глушитель",
            "Item3":25000
         },
         {
            "Item1":3,
            "Item2":"Большой овальный глушитель",
            "Item3":22000
         }
      ],
      "1":[
         {
            "Item1":-1,
            "Item2":"Standardschwellen",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Пороги основного цвета",
            "Item3":10000
         },
         {
            "Item1":1,
            "Item2":"Пороги дополнительного цвета",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Карбоновые пороги",
            "Item3":16000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Капот без воздухозаборников",
            "Item3":20000
         },
         {
            "Item1":1,
            "Item2":"Полоса доп.цвета на капоте",
            "Item3":30000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Стандартный спойлер",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Низкий спойлер основного цвета",
            "Item3":10000
         },
         {
            "Item1":1,
            "Item2":"Низкий спойлер дополнительного цвета",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Низкий Carbon-Spoiler",
            "Item3":25000
         },
         {
            "Item1":3,
            "Item2":"Маленький спойлер основного цвета",
            "Item3":15000
         },
         {
            "Item1":4,
            "Item2":"Маленький спойлер дополнительного цвета",
            "Item3":20000
         },
         {
            "Item1":5,
            "Item2":"Маленький Carbon-Spoiler",
            "Item3":25000
         },
         {
            "Item1":6,
            "Item2":"GT спойлер",
            "Item3":40000
         }
      ]
   },
   "Italigtb2":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Двойной глушитель",
            "Item3":18000
         },
         {
            "Item1":1,
            "Item2":"Большой глушитель",
            "Item3":20000
         },
         {
            "Item1":2,
            "Item2":"Двойной овальный глушитель",
            "Item3":25000
         },
         {
            "Item1":3,
            "Item2":"Большой овальный глушитель",
            "Item3":22000
         }
      ],
      "1":[
         {
            "Item1":-1,
            "Item2":"Standardschwellen",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Maßgeschneiderte Schwellenwerte 1",
            "Item3":10000
         },
         {
            "Item1":1,
            "Item2":"Maßgeschneiderte Schwellenwerte 2",
            "Item3":15000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierte Motorhaube",
            "Item3":20000
         },
         {
            "Item1":1,
            "Item2":"Полоса на капоте 1",
            "Item3":30000
         },
         {
            "Item1":2,
            "Item2":"Полоса на капоте 2",
            "Item3":30000
         },
         {
            "Item1":3,
            "Item2":"Carbon-Motorhaube",
            "Item3":30000
         },
         {
            "Item1":4,
            "Item2":"Заказной Carbon-Motorhaube",
            "Item3":30000
         },
         {
            "Item1":8,
            "Item2":"Карбоновый Haube mit Lufteinlass",
            "Item3":30000
         },
         {
            "Item1":9,
            "Item2":"Капот с двумя воздухозаборниками",
            "Item3":30000
         },
         {
            "Item1":10,
            "Item2":"Капот с тремя воздухозаборниками",
            "Item3":35000
         },
         {
            "Item1":11,
            "Item2":"Капот с воздухозаборниками",
            "Item3":35000
         },
         {
            "Item1":12,
            "Item2":"Капот с воздухозаборниками",
            "Item3":35000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Стандартный спойлер",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Низкий спойлер 1",
            "Item3":10000
         },
         {
            "Item1":1,
            "Item2":"Низкий спойлер 2",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Низкий спойлер 3",
            "Item3":25000
         },
         {
            "Item1":3,
            "Item2":"Низкий Carbon-Spoiler 1",
            "Item3":15000
         },
         {
            "Item1":4,
            "Item2":"Низкий Carbon-Spoiler 2",
            "Item3":20000
         },
         {
            "Item1":5,
            "Item2":"Низкий Carbon-Spoiler 3",
            "Item3":25000
         },
         {
            "Item1":6,
            "Item2":"Низкий Carbon-Spoiler 4",
            "Item3":30000
         },
         {
            "Item1":7,
            "Item2":"Средний спойлер",
            "Item3":25000
         },
         {
            "Item1":8,
            "Item2":"Средний Carbon-Spoiler",
            "Item3":30000
         }
      ]
   },
   "Xa21":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Auspuff",
            "Item3":18000
         },
         {
            "Item1":1,
            "Item2":"Двойной глушитель",
            "Item3":20000
         },
         {
            "Item1":4,
            "Item2":"Двойной Modifizierter Auspuff",
            "Item3":25000
         },
         {
            "Item1":5,
            "Item2":"Четырехствольный глушитель 1",
            "Item3":22000
         },
         {
            "Item1":11,
            "Item2":"Четырехствольный глушитель 2",
            "Item3":30000
         },
         {
            "Item1":13,
            "Item2":"Четырехствольный глушитель 3",
            "Item3":35000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Стандартная Färbung двигателя",
            "Item3":5000
         },
         {
            "Item1":1,
            "Item2":"Основная Färbung двигателя 1",
            "Item3":10000
         },
         {
            "Item1":2,
            "Item2":"Дополнительная Färbung двигателя 1",
            "Item3":15000
         },
         {
            "Item1":4,
            "Item2":"Основная Färbung двигателя 2",
            "Item3":20000
         },
         {
            "Item1":5,
            "Item2":"Дополнительная Färbung двигателя 2",
            "Item3":25000
         },
         {
            "Item1":7,
            "Item2":"Основная Färbung двигателя 3",
            "Item3":25000
         },
         {
            "Item1":8,
            "Item2":"Дополнительная Färbung двигателя 3",
            "Item3":30000
         }
      ]
   },
   "Osiris":{
      "3":[
         {
            "Item1":-1,
            "Item2":"Nein",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Низкий Carbon-Spoiler",
            "Item3":7000
         },
         {
            "Item1":1,
            "Item2":"Поднятый Carbon-Spoiler",
            "Item3":8000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Normalspur Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger осн.цвета",
            "Item3":13000
         },
         {
            "Item1":1,
            "Item2":"Kundenspezifischer Stoßfänger доп.цвета",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Заказной карбоновый бампер",
            "Item3":20000
         },
         {
            "Item1":3,
            "Item2":"Спортивный бампер осн.цвета",
            "Item3":15000
         },
         {
            "Item1":4,
            "Item2":"Спортивный бампер доп.цвета",
            "Item3":20000
         },
         {
            "Item1":5,
            "Item2":"Спортивный карбоновый бампер",
            "Item3":25000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Стандартный зад. диффузор",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Карбоновый диффузор",
            "Item3":13000
         }
      ]
   },
   "Nero":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Schwarz глушитель",
            "Item3":7000
         },
         {
            "Item1":1,
            "Item2":"Четырехствольный глушитель",
            "Item3":10000
         },
         {
            "Item1":2,
            "Item2":"Четырехствольный Schwarz глушитель",
            "Item3":10000
         },
         {
            "Item1":3,
            "Item2":"Четырехствольный глушитель 2",
            "Item3":12000
         },
         {
            "Item1":4,
            "Item2":"Четырехствольный Schwarz глушитель 2",
            "Item3":12000
         }
      ],
      "1":[
         {
            "Item1":-1,
            "Item2":"Standardschwellen",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Maßgeschneiderte Schwellenwerte",
            "Item3":7000
         },
         {
            "Item1":0,
            "Item2":"Заказные карбоновые пороги",
            "Item3":9000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Линия на капоте",
            "Item3":10000
         },
         {
            "Item1":1,
            "Item2":"Двойная линия на капоте",
            "Item3":20000
         },
         {
            "Item1":2,
            "Item2":"Carbon-Motorhaube",
            "Item3":30000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Normalspur Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Заказной пер. бампер",
            "Item3":13000
         },
         {
            "Item1":0,
            "Item2":"Карбоновый пер. бампер",
            "Item3":15000
         }
      ]
   },
   "Primo":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Chrome Schalldämpfer",
            "Item3":7000
         },
         {
            "Item1":1,
            "Item2":"Расширенный глушитель",
            "Item3":10000
         },
         {
            "Item1":2,
            "Item2":"Titan Auspuff",
            "Item3":10000
         }
      ],
      "1":[
         {
            "Item1":-1,
            "Item2":"Standardschwellen",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Maßgeschneiderte Schwellenwerte",
            "Item3":7000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Nein",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Низкий спойлер",
            "Item3":7000
         },
         {
            "Item1":1,
            "Item2":"Spoiler angehoben",
            "Item3":8000
         }
      ],
      "4":[
         {
            "Item1":-1,
            "Item2":"Standard Grill",
            "Item3":3000
         },
         {
            "Item1":0,
            "Item2":"Хромированная решетка",
            "Item3":6000
         },
         {
            "Item1":1,
            "Item2":"Спортивная решетка",
            "Item3":5000
         },
         {
            "Item1":2,
            "Item2":"Сетчатая решетка",
            "Item3":7000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Normalspur Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Заказной пер. бампер",
            "Item3":13000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Заказной зад. бампер",
            "Item3":13000
         }
      ]
   },
   "Emperor":{

   },
   "Penetrator":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Doppeltes Titan",
            "Item3":7000
         },
         {
            "Item1":1,
            "Item2":"Двойной титановый (хром)",
            "Item3":30000
         },
         {
            "Item1":2,
            "Item2":"Парный гоночный",
            "Item3":10000
         },
         {
            "Item1":3,
            "Item2":"Двойной гоночный титановый",
            "Item3":12000
         },
         {
            "Item1":4,
            "Item2":"Парный гоночный титановый",
            "Item3":16000
         }
      ],
      "1":[
         {
            "Item1":-1,
            "Item2":"Standardschwellen",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Maßgeschneiderte Schwellenwerte",
            "Item3":30000
         },
         {
            "Item1":1,
            "Item2":"Carbon Verkleidungen",
            "Item3":11000
         },
         {
            "Item1":2,
            "Item2":"Полуспортивные пороги",
            "Item3":13000
         },
         {
            "Item1":3,
            "Item2":"Карбоновые пороги (чать)",
            "Item3":12000
         },
         {
            "Item1":4,
            "Item2":"Перевернутые пороги",
            "Item3":19000
         },
         {
            "Item1":5,
            "Item2":"Карбоновые пороги (все)",
            "Item3":16000
         },
         {
            "Item1":6,
            "Item2":"Пороги GT",
            "Item3":16000
         },
         {
            "Item1":7,
            "Item2":"Карбоновые GT (часть)",
            "Item3":16000
         },
         {
            "Item1":8,
            "Item2":"Перевернутые GT",
            "Item3":14000
         },
         {
            "Item1":9,
            "Item2":"Карбоновые GT (все)",
            "Item3":20000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Standard Motorhaube 2",
            "Item3":16000
         },
         {
            "Item1":1,
            "Item2":"Haube mit Lufteinlass",
            "Item3":14000
         },
         {
            "Item1":2,
            "Item2":"С забором воздуха (карбон)",
            "Item3":15000
         },
         {
            "Item1":3,
            "Item2":"Standard Motorhaube (карбон)",
            "Item3":15000
         },
         {
            "Item1":4,
            "Item2":"Carbon-Motorhaube",
            "Item3":15000
         },
         {
            "Item1":5,
            "Item2":"Haube mit Lufteinlass",
            "Item3":15000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Nein",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Drift-Spoiler",
            "Item3":22000
         },
         {
            "Item1":1,
            "Item2":"Carbon-Spoiler",
            "Item3":26000
         },
         {
            "Item1":2,
            "Item2":"Спойлер Tuner",
            "Item3":16000
         },
         {
            "Item1":3,
            "Item2":"Carbon-Spoiler 2",
            "Item3":13000
         },
         {
            "Item1":4,
            "Item2":"GT Wing",
            "Item3":15000
         }
      ],
      "4":[
         {
            "Item1":-1,
            "Item2":"Стандартный двигатель",
            "Item3":3000
         },
         {
            "Item1":0,
            "Item2":"Модификация для двигателя 1",
            "Item3":6000
         },
         {
            "Item1":1,
            "Item2":"Модификация для двигателя 2",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Модификация для двигателя 3",
            "Item3":17000
         },
         {
            "Item1":3,
            "Item2":"Модификация для двигателя 4",
            "Item3":27000
         },
         {
            "Item1":4,
            "Item2":"Модификация для двигателя 5",
            "Item3":17000
         },
         {
            "Item1":5,
            "Item2":"Модификация для двигателя 6",
            "Item3":27000
         }
      ],
      "6":[
         {
            "Item1":-1,
            "Item2":"Стандартный двигатель",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Хромированный двигатель",
            "Item3":10000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Normalspur Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Бампер с радиатором",
            "Item3":13000
         },
         {
            "Item1":1,
            "Item2":"Бампер Chin (карбон)",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"С радиатором (карбон)",
            "Item3":15000
         },
         {
            "Item1":3,
            "Item2":"Kohlenstoffspalter",
            "Item3":15000
         },
         {
            "Item1":4,
            "Item2":"Решетка со сплиттером",
            "Item3":15000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Хромированные сплиттеры",
            "Item3":13000
         },
         {
            "Item1":1,
            "Item2":"Kundenspezifischer Stoßfänger",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Stoßstange vorne (карбон)",
            "Item3":17000
         },
         {
            "Item1":3,
            "Item2":"Задний бампер (карбон)",
            "Item3":17000
         },
         {
            "Item1":4,
            "Item2":"Бампер Aero (карбон)",
            "Item3":17000
         },
         {
            "Item1":5,
            "Item2":"Задний бампер Aero (карбон)",
            "Item3":17000
         }
      ]
   },
   "Bison3":{

   },
   "Turismor":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Овальный глушитель",
            "Item3":7000
         },
         {
            "Item1":1,
            "Item2":"Chrome Schalldämpfer",
            "Item3":10000
         },
         {
            "Item1":2,
            "Item2":"Гоночный глушитель",
            "Item3":15000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Nein",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Carbon-Spoiler",
            "Item3":22000
         },
         {
            "Item1":1,
            "Item2":"GT Wing",
            "Item3":26000
         }
      ],
      "6":[
         {
            "Item1":-1,
            "Item2":"Standard-Dach",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Крашеная крыша",
            "Item3":30000
         }
      ]
   },
   "Jester2":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Овальный глушитель",
            "Item3":7000
         },
         {
            "Item1":1,
            "Item2":"Chrome Schalldämpfer",
            "Item3":14000
         },
         {
            "Item1":2,
            "Item2":"Гоночный глушитель",
            "Item3":16000
         }
      ],
      "1":[
         {
            "Item1":-1,
            "Item2":"Standardschwellen",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Maßgeschneiderte Schwellenwerte",
            "Item3":30000
         },
         {
            "Item1":1,
            "Item2":"Sportschwellen",
            "Item3":11000
         },
         {
            "Item1":2,
            "Item2":"Carbon Verkleidungen",
            "Item3":13000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Nein",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Carbon-Spoiler",
            "Item3":22000
         },
         {
            "Item1":1,
            "Item2":"Lackierter Spoiler",
            "Item3":26000
         },
         {
            "Item1":2,
            "Item2":"Carbon-Spoiler 2",
            "Item3":16000
         },
         {
            "Item1":3,
            "Item2":"GT Wing",
            "Item3":13000
         }
      ],
      "6":[
         {
            "Item1":-1,
            "Item2":"Standard-Dach",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Hinterer Abweiser",
            "Item3":30000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Normalspur Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Frontteiler",
            "Item3":13000
         },
         {
            "Item1":1,
            "Item2":"Сплиттер с канардами",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Сплиттер с крылышками",
            "Item3":15000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Крашеный задний диффузор",
            "Item3":13000
         },
         {
            "Item1":1,
            "Item2":"Карбоновый зад. диффузор",
            "Item3":15000
         }
      ]
   },
   "Neon":{
      "1":[
         {
            "Item1":-1,
            "Item2":"Standardschwellen",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Пороги осн.цвета",
            "Item3":20000
         },
         {
            "Item1":1,
            "Item2":"Пороги доп.цвета",
            "Item3":11000
         },
         {
            "Item1":2,
            "Item2":"Карбоновые пороги",
            "Item3":13000
         },
         {
            "Item1":3,
            "Item2":"Гоночные осн.цвета",
            "Item3":16000
         },
         {
            "Item1":4,
            "Item2":"Гоночный доп.цвета",
            "Item3":16000
         },
         {
            "Item1":5,
            "Item2":"Карбоновые гоночные",
            "Item3":13000
         },
         {
            "Item1":6,
            "Item2":"Competition осн.цвета",
            "Item3":16000
         },
         {
            "Item1":7,
            "Item2":"Competition доп.цвета",
            "Item3":19000
         },
         {
            "Item1":8,
            "Item2":"Карбоновые Competition",
            "Item3":20000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Две полосы",
            "Item3":16000
         },
         {
            "Item1":1,
            "Item2":"Одна полоса",
            "Item3":14000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Nein",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Спойлер осн.цвета",
            "Item3":22000
         },
         {
            "Item1":1,
            "Item2":"Спойлер доп.цвета",
            "Item3":26000
         },
         {
            "Item1":2,
            "Item2":"Carbon-Spoiler",
            "Item3":16000
         },
         {
            "Item1":3,
            "Item2":"Гоночный спойлер",
            "Item3":13000
         },
         {
            "Item1":4,
            "Item2":"Туринговый спойлер",
            "Item3":15000
         },
         {
            "Item1":5,
            "Item2":"Спойлер Competition",
            "Item3":15000
         }
      ],
      "5":[
         {
            "Item1":-1,
            "Item2":"Стандартное зеркало",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Зеркало 1",
            "Item3":12000
         },
         {
            "Item1":1,
            "Item2":"Зеркало 2",
            "Item3":12000
         },
         {
            "Item1":2,
            "Item2":"Зеркало 3",
            "Item3":12000
         },
         {
            "Item1":3,
            "Item2":"Зеркало 4",
            "Item3":12000
         },
         {
            "Item1":4,
            "Item2":"Зеркало 5",
            "Item3":12000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Normalspur Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Сплиттер осн.цвета",
            "Item3":13000
         },
         {
            "Item1":1,
            "Item2":"Сплиттер доп.цвета",
            "Item3":13000
         },
         {
            "Item1":2,
            "Item2":"Kohlenstoffspalter",
            "Item3":15000
         },
         {
            "Item1":3,
            "Item2":"Сплиттер Competition",
            "Item3":15000
         },
         {
            "Item1":4,
            "Item2":"Competition доп.цвета",
            "Item3":15000
         },
         {
            "Item1":5,
            "Item2":"Карбоновый Competition",
            "Item3":17000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Стандартный зад.диффузор",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Гоночный диффузор",
            "Item3":13000
         },
         {
            "Item1":1,
            "Item2":"Гоночный диффузор (карбон)",
            "Item3":15000
         }
      ]
   },
   "Massacro2":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Титановые насадки",
            "Item3":7000
         }
      ],
      "1":[
         {
            "Item1":-1,
            "Item2":"Standardschwellen",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Боковой обтекатель",
            "Item3":30000
         },
         {
            "Item1":1,
            "Item2":"Карбоновый боковой",
            "Item3":11000
         },
         {
            "Item1":2,
            "Item2":"Гоночный боковой",
            "Item3":13000
         },
         {
            "Item1":3,
            "Item2":"Гоночный карбоновый",
            "Item3":16000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Carbon-Motorhaube",
            "Item3":16000
         },
         {
            "Item1":1,
            "Item2":"Haube mit Lufteinlass",
            "Item3":14000
         },
         {
            "Item1":2,
            "Item2":"Гоночный Carbon-Motorhaube",
            "Item3":15000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Nein",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Низкий спойлер",
            "Item3":22000
         },
         {
            "Item1":1,
            "Item2":"Низкий Carbon-Spoiler",
            "Item3":26000
         },
         {
            "Item1":2,
            "Item2":"Гоночное крыло",
            "Item3":16000
         },
         {
            "Item1":3,
            "Item2":"Крыло GT",
            "Item3":13000
         }
      ],
      "5":[
         {
            "Item1":-1,
            "Item2":"Стандартное крыло",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Гоночные воздухозаборники",
            "Item3":22000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Normalspur Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kohlenstoffspalter",
            "Item3":13000
         },
         {
            "Item1":1,
            "Item2":"Сплиттер",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Гоночный сплиттер",
            "Item3":16000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Задний диффузор",
            "Item3":13000
         },
         {
            "Item1":1,
            "Item2":"Гоночный задний диффузор",
            "Item3":15000
         }
      ]
   },
   "Turismo2":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Auspuff 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Auspuff 2",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Modifizierter Auspuff 3",
            "Item3":15000
         },
         {
            "Item1":3,
            "Item2":"Modifizierter Auspuff 4",
            "Item3":15000
         }
      ],
      "1":[
         {
            "Item1":-1,
            "Item2":"Standardschwellen",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Пороги доп.цвета",
            "Item3":30000
         },
         {
            "Item1":1,
            "Item2":"Пороги (карбон)",
            "Item3":11000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Капот с полосой",
            "Item3":16000
         },
         {
            "Item1":1,
            "Item2":"Вентилируемый капот",
            "Item3":14000
         },
         {
            "Item1":2,
            "Item2":"Вентилируемый с полосой",
            "Item3":15000
         },
         {
            "Item1":3,
            "Item2":"Гоночный капот",
            "Item3":12000
         },
         {
            "Item1":4,
            "Item2":"Гоночный с полосой",
            "Item3":14000
         },
         {
            "Item1":5,
            "Item2":"Капот GT",
            "Item3":15000
         },
         {
            "Item1":6,
            "Item2":"Капот GT с полосой",
            "Item3":15000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Nein",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Стандартный спойлер",
            "Item3":22000
         },
         {
            "Item1":1,
            "Item2":"Спойлер доп.цвета",
            "Item3":26000
         },
         {
            "Item1":2,
            "Item2":"Carbon-Spoiler",
            "Item3":16000
         },
         {
            "Item1":3,
            "Item2":"Крыло GT",
            "Item3":13000
         },
         {
            "Item1":4,
            "Item2":"Крыло GT доп.цвета",
            "Item3":15000
         },
         {
            "Item1":5,
            "Item2":"Крыло GT (карбон)",
            "Item3":12000
         },
         {
            "Item1":6,
            "Item2":"Гоночное крыло",
            "Item3":16000
         },
         {
            "Item1":7,
            "Item2":"Гоночное крыло доп.цвета",
            "Item3":13000
         },
         {
            "Item1":8,
            "Item2":"Гоночное крыло (карбон)",
            "Item3":18000
         },
         {
            "Item1":9,
            "Item2":"Турнирный спойлер",
            "Item3":20000
         },
         {
            "Item1":10,
            "Item2":"Турнирный доп.цвета",
            "Item3":21000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Normalspur Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Облегченный бампер",
            "Item3":13000
         },
         {
            "Item1":1,
            "Item2":"Классический бампер",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Гоночный пер. бампер",
            "Item3":15000
         },
         {
            "Item1":3,
            "Item2":"Гоночный бампер (карбон)",
            "Item3":15000
         },
         {
            "Item1":4,
            "Item2":"Stoßstange vorne GT",
            "Item3":15000
         },
         {
            "Item1":5,
            "Item2":"Бампер GT (карбон)",
            "Item3":15000
         }
      ]
   },
   "EntityXF":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Doppelter Schalldämpfer",
            "Item3":7000
         },
         {
            "Item1":1,
            "Item2":"Тройной глушитель",
            "Item3":10000
         }
      ],
      "1":[
         {
            "Item1":-1,
            "Item2":"Standardschwellen",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Карбоновые пороги",
            "Item3":30000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Nein",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Carbon-Spoiler",
            "Item3":22000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Normalspur Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Сплиттер с канардами",
            "Item3":15000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Карбоновый зад. диффузор",
            "Item3":13000
         }
      ]
   },
   "Banshee2":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Doppelter Schalldämpfer",
            "Item3":7000
         },
         {
            "Item1":1,
            "Item2":"Гоночный глушитель",
            "Item3":10000
         },
         {
            "Item1":2,
            "Item2":"Chrome Schalldämpfer",
            "Item3":12000
         },
         {
            "Item1":3,
            "Item2":"Doppelter Schalldämpfer 2",
            "Item3":14000
         },
         {
            "Item1":4,
            "Item2":"Насадка на выхлоп",
            "Item3":16000
         }
      ],
      "1":[
         {
            "Item1":-1,
            "Item2":"Standardschwellen",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Maßgeschneiderte Schwellenwerte",
            "Item3":30000
         },
         {
            "Item1":1,
            "Item2":"Niedrige Schwellen",
            "Item3":11000
         },
         {
            "Item1":2,
            "Item2":"Полуспортивные пороги",
            "Item3":13000
         },
         {
            "Item1":3,
            "Item2":"Sportschwellen",
            "Item3":16000
         },
         {
            "Item1":4,
            "Item2":"Carbon Verkleidungen",
            "Item3":16000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Haube mit Lufteinlass",
            "Item3":16000
         },
         {
            "Item1":1,
            "Item2":"Carbon-Motorhaube",
            "Item3":14000
         },
         {
            "Item1":2,
            "Item2":"Накладные арки",
            "Item3":15000
         },
         {
            "Item1":3,
            "Item2":"Гладкий капот",
            "Item3":15000
         },
         {
            "Item1":4,
            "Item2":"Двойной воздухозабор",
            "Item3":15000
         },
         {
            "Item1":5,
            "Item2":"Двойной воздухозабор (накл)",
            "Item3":15000
         },
         {
            "Item1":6,
            "Item2":"Капот с фильтром",
            "Item3":15000
         },
         {
            "Item1":7,
            "Item2":"Открытый воздухозаборник",
            "Item3":15000
         },
         {
            "Item1":8,
            "Item2":"Капот с фильтром (хром)",
            "Item3":15000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Nein",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Spoiler angehoben",
            "Item3":22000
         },
         {
            "Item1":1,
            "Item2":"Средний спойлер",
            "Item3":26000
         },
         {
            "Item1":2,
            "Item2":"Drift-Spoiler",
            "Item3":16000
         },
         {
            "Item1":3,
            "Item2":"Крыло GT (высокое)",
            "Item3":13000
         },
         {
            "Item1":4,
            "Item2":"Спойлер Экстрим",
            "Item3":15000
         },
         {
            "Item1":5,
            "Item2":"Крыло Атака на асфальт",
            "Item3":16000
         }
      ],
      "4":[
         {
            "Item1":-1,
            "Item2":"Стандартная задняя дверь",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Задний багажник",
            "Item3":13000
         },
         {
            "Item1":1,
            "Item2":"Накладной багажник",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Багажник (карбон)",
            "Item3":15000
         },
         {
            "Item1":3,
            "Item2":"Багажник и панели (карбон)",
            "Item3":15000
         }
      ],
      "5":[
         {
            "Item1":-1,
            "Item2":"Стандартное крыло",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Задние надкрылки",
            "Item3":22000
         },
         {
            "Item1":1,
            "Item2":"Задние надкрылки (карбон)",
            "Item3":22000
         }
      ],
      "6":[
         {
            "Item1":-1,
            "Item2":"Standard-Dach",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Кабрио",
            "Item3":30000
         }
      ],
      "7":[
         {
            "Item1":-1,
            "Item2":"Без винил",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Винилы 1",
            "Item3":13000
         },
         {
            "Item1":1,
            "Item2":"Винилы 2",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Винилы 3",
            "Item3":15000
         },
         {
            "Item1":3,
            "Item2":"Винилы 4",
            "Item3":18000
         },
         {
            "Item1":4,
            "Item2":"Винилы 5",
            "Item3":19000
         },
         {
            "Item1":5,
            "Item2":"Винилы 6",
            "Item3":20000
         },
         {
            "Item1":6,
            "Item2":"Винилы 7",
            "Item3":35000
         },
         {
            "Item1":7,
            "Item2":"Винилы 8",
            "Item3":45000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Normalspur Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Карбоновый Stoßstange vorne",
            "Item3":13000
         },
         {
            "Item1":1,
            "Item2":"Накладные арки",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Классический бампер RS",
            "Item3":15000
         },
         {
            "Item1":3,
            "Item2":"Дрифтовый бампер RS",
            "Item3":15000
         },
         {
            "Item1":4,
            "Item2":"Бампер GT",
            "Item3":15000
         },
         {
            "Item1":5,
            "Item2":"Бампер Street SPL",
            "Item3":15000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Стандартная зад. бампер",
            "Item3":5000
         }
      ]
   },
   "Banshee":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Расширенный глушитель",
            "Item3":7000
         },
         {
            "Item1":1,
            "Item2":"Doppelter Schalldämpfer",
            "Item3":10000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Haube mit Lufteinlass",
            "Item3":12000
         },
         {
            "Item1":1,
            "Item2":"Carbon-Motorhaube",
            "Item3":15000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Nein",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Spoiler angehoben",
            "Item3":12000
         },
         {
            "Item1":1,
            "Item2":"Средний спойлер",
            "Item3":16000
         },
         {
            "Item1":2,
            "Item2":"Drift-Spoiler",
            "Item3":16000
         }
      ],
      "6":[
         {
            "Item1":-1,
            "Item2":"Standard-Dach",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Кабрио",
            "Item3":30000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Normalspur Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Карбоновый пер. бампер",
            "Item3":13000
         }
      ]
   },
   "BestiaGTS":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Овальный глушитель",
            "Item3":10000
         }
      ],
      "1":[
         {
            "Item1":-1,
            "Item2":"Standardschwellen",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Carbon Verkleidungen",
            "Item3":6000
         },
         {
            "Item1":1,
            "Item2":"Полуспортивные пороги",
            "Item3":7000
         },
         {
            "Item1":2,
            "Item2":"Sportschwellen",
            "Item3":8000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Гладкий капот",
            "Item3":16000
         },
         {
            "Item1":1,
            "Item2":"Двойной забор воздуха",
            "Item3":14000
         },
         {
            "Item1":2,
            "Item2":"Двойной карбоновый",
            "Item3":15000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Nein",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Низкий спойлер",
            "Item3":22000
         },
         {
            "Item1":1,
            "Item2":"Средний спойлер",
            "Item3":26000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Normalspur Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Евробампер",
            "Item3":13000
         },
         {
            "Item1":1,
            "Item2":"Гоночный бампер",
            "Item3":15000
         },
         {
            "Item1":3,
            "Item2":"Дрифт-бампер",
            "Item3":15000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         }
      ]
   },
   "BJXL":{
      "1":[
         {
            "Item1":-1,
            "Item2":"Standardschwellen",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Подножки",
            "Item3":6000
         }
      ],
      "6":[
         {
            "Item1":-1,
            "Item2":"Standard-Dach",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Dachträger",
            "Item3":7000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Normalspur Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Силовой бампер",
            "Item3":13000
         }
      ]
   },
   "Comet2":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Глушитель двустволка",
            "Item3":25000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Стандартный спойлер",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Spoiler angehoben",
            "Item3":22000
         },
         {
            "Item1":1,
            "Item2":"GT Wing",
            "Item3":26000
         }
      ],
      "5":[
         {
            "Item1":-1,
            "Item2":"Nein",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Надкрылки",
            "Item3":22000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Normalspur Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Сплиттер с канардами",
            "Item3":19000
         },
         {
            "Item1":1,
            "Item2":"Сплиттер с канардами 2",
            "Item3":22000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         }
      ]
   },
   "Coquette":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Овальный глушитель",
            "Item3":25000
         },
         {
            "Item1":1,
            "Item2":"Chrome Schalldämpfer",
            "Item3":26000
         },
         {
            "Item1":2,
            "Item2":"Расширенный глушитель",
            "Item3":26000
         },
         {
            "Item1":3,
            "Item2":"Titan Auspuff",
            "Item3":30000
         }
      ],
      "1":[
         {
            "Item1":-1,
            "Item2":"Standardschwellen",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Maßgeschneiderte Schwellenwerte",
            "Item3":25000
         },
         {
            "Item1":1,
            "Item2":"Carbon Verkleidungen",
            "Item3":26000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":2000
         },
         {
            "Item1":0,
            "Item2":"Haube mit Lufteinlass",
            "Item3":11000
         },
         {
            "Item1":1,
            "Item2":"С двойным забором воздуха",
            "Item3":11000
         },
         {
            "Item1":2,
            "Item2":"Carbon-Motorhaube 1",
            "Item3":14000
         },
         {
            "Item1":3,
            "Item2":"Carbon-Motorhaube 2",
            "Item3":15000
         },
         {
            "Item1":4,
            "Item2":"Спортивный капот",
            "Item3":16000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Nein",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Spoiler angehoben",
            "Item3":22000
         },
         {
            "Item1":1,
            "Item2":"Средний спойлер",
            "Item3":26000
         },
         {
            "Item1":2,
            "Item2":"Спойлер Tuner",
            "Item3":26000
         },
         {
            "Item1":3,
            "Item2":"Drift-Spoiler",
            "Item3":26000
         },
         {
            "Item1":4,
            "Item2":"GT Wing",
            "Item3":26000
         }
      ],
      "5":[
         {
            "Item1":-1,
            "Item2":"Стандартное крыло",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Карбоновые панели",
            "Item3":22000
         }
      ],
      "6":[
         {
            "Item1":-1,
            "Item2":"Standard-Dach",
            "Item3":3000
         },
         {
            "Item1":0,
            "Item2":"Кабрио",
            "Item3":9000
         },
         {
            "Item1":1,
            "Item2":"Maßgeschneidertes Dach",
            "Item3":9000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Normalspur Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Frontteiler",
            "Item3":19000
         },
         {
            "Item1":1,
            "Item2":"Крашенный сплиттер",
            "Item3":22000
         },
         {
            "Item1":2,
            "Item2":"Kohlenstoffspalter",
            "Item3":22000
         },
         {
            "Item1":3,
            "Item2":"Бампер Extremo Aero",
            "Item3":22000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Крашеный задний бампер",
            "Item3":19000
         },
         {
            "Item1":1,
            "Item2":"Карбоновый зад. диффузор",
            "Item3":22000
         },
         {
            "Item1":2,
            "Item2":"Kundenspezifische Heckstoßstange",
            "Item3":22000
         },
         {
            "Item1":3,
            "Item2":"Карбоновый дифф. и крюк",
            "Item3":22000
         }
      ]
   },
   "Windsor":{
      "7":[
         {
            "Item1":-1,
            "Item2":"Keine Färbung",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Монограмма Sessanta Nove",
            "Item3":18000
         },
         {
            "Item1":1,
            "Item2":"Многоцв. Sessanta Nove",
            "Item3":10000
         },
         {
            "Item1":2,
            "Item2":"Геометр. Sessanta Nove",
            "Item3":14000
         },
         {
            "Item1":3,
            "Item2":"Монограмма Perseus Wings",
            "Item3":16000
         },
         {
            "Item1":4,
            "Item2":"Моногр. Perseus Green Wings",
            "Item3":16000
         },
         {
            "Item1":5,
            "Item2":"Santo Capra Python",
            "Item3":16000
         },
         {
            "Item1":6,
            "Item2":"Santo Capra Cheetah",
            "Item3":16000
         },
         {
            "Item1":7,
            "Item2":"Yeti Mall Ninja",
            "Item3":16000
         }
      ]
   },
   "Superd":{

   },
   "Huntley":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Chrome Schalldämpfer",
            "Item3":25000
         },
         {
            "Item1":1,
            "Item2":"Doppelter Schalldämpfer",
            "Item3":26000
         },
         {
            "Item1":2,
            "Item2":"Doppeltes Titan",
            "Item3":26000
         },
         {
            "Item1":3,
            "Item2":"Расширенный глушитель",
            "Item3":30000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Haube mit Lufteinlass",
            "Item3":25000
         },
         {
            "Item1":1,
            "Item2":"С двойным забором воздуха",
            "Item3":26000
         },
         {
            "Item1":2,
            "Item2":"Carbon-Motorhaube",
            "Item3":26000
         },
         {
            "Item1":3,
            "Item2":"Carbon-Motorhaube 2",
            "Item3":30000
         }
      ],
      "6":[
         {
            "Item1":-1,
            "Item2":"Standard-Dach",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Dachträger",
            "Item3":25000
         }
      ]
   },
   "Baller3":{

   },
   "Dubsta2":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Titan Auspuff",
            "Item3":25000
         },
         {
            "Item1":1,
            "Item2":"Doppeltes Titan",
            "Item3":26000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Капот внедорожника",
            "Item3":25000
         },
         {
            "Item1":1,
            "Item2":"Капот с запаской",
            "Item3":26000
         }
      ],
      "5":[
         {
            "Item1":-1,
            "Item2":"Стандартное левое крыло",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Шноркель",
            "Item3":25000
         }
      ],
      "6":[
         {
            "Item1":-1,
            "Item2":"Standard-Dach",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Dachträger",
            "Item3":25000
         },
         {
            "Item1":1,
            "Item2":"Багажник с прожекторами",
            "Item3":25000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Normalspur Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Кунгурятник с дугой",
            "Item3":19000
         },
         {
            "Item1":1,
            "Item2":"Кунгурятник с дугой и фары",
            "Item3":22000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         }
      ]
   },
   "Carbonizzare":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Doppelter Schalldämpfer",
            "Item3":25000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Carbon-Motorhaube",
            "Item3":25000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Nein",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Средний спойлер",
            "Item3":22000
         },
         {
            "Item1":1,
            "Item2":"Spoiler angehoben",
            "Item3":26000
         }
      ]
   },
   "Infernus":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Сдвоенный заказной",
            "Item3":25000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Nein",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Spoiler angehoben",
            "Item3":22000
         },
         {
            "Item1":1,
            "Item2":"GT Wing",
            "Item3":26000
         }
      ]
   },
   "Elegy2":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Doppelter Schalldämpfer",
            "Item3":26000
         },
         {
            "Item1":1,
            "Item2":"Гоночный глушитель",
            "Item3":10000
         }
      ],
      "1":[
         {
            "Item1":-1,
            "Item2":"Standardschwellen",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Maßgeschneiderte Schwellenwerte 1",
            "Item3":30000
         },
         {
            "Item1":1,
            "Item2":"Maßgeschneiderte Schwellenwerte 2",
            "Item3":11000
         },
         {
            "Item1":2,
            "Item2":"Maßgeschneiderte Schwellenwerte 3",
            "Item3":13000
         },
         {
            "Item1":3,
            "Item2":"Maßgeschneiderte Schwellenwerte 4",
            "Item3":16000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Haube mit Lufteinlass",
            "Item3":16000
         },
         {
            "Item1":1,
            "Item2":"С двойным забором воздуха",
            "Item3":14000
         },
         {
            "Item1":2,
            "Item2":"Carbon-Motorhaube",
            "Item3":15000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Nein",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Низкий спойлер",
            "Item3":22000
         },
         {
            "Item1":1,
            "Item2":"Spoiler angehoben",
            "Item3":26000
         },
         {
            "Item1":2,
            "Item2":"Спойлер Tuner",
            "Item3":16000
         },
         {
            "Item1":3,
            "Item2":"Carbon-Spoiler",
            "Item3":13000
         },
         {
            "Item1":4,
            "Item2":"GT Wing",
            "Item3":15000
         }
      ],
      "4":[
         {
            "Item1":-1,
            "Item2":"Standard Grill",
            "Item3":3000
         },
         {
            "Item1":0,
            "Item2":"Черная решетка",
            "Item3":26000
         },
         {
            "Item1":1,
            "Item2":"Открытый интеркулер",
            "Item3":11000
         }
      ],
      "6":[
         {
            "Item1":-1,
            "Item2":"Standard-Dach",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Carbon Dach",
            "Item3":30000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Normalspur Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kohlenstoffspalter",
            "Item3":13000
         },
         {
            "Item1":1,
            "Item2":"Сплиттер с канардами",
            "Item3":15000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Карбоновый зад. диффузор",
            "Item3":13000
         },
         {
            "Item1":1,
            "Item2":"Крашеный задний бампер",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Крашеный бампер и дифф.",
            "Item3":17000
         }
      ]
   },
   "Jester":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Овальный глушитель",
            "Item3":26000
         },
         {
            "Item1":1,
            "Item2":"Хромированный титановый",
            "Item3":10000
         },
         {
            "Item1":2,
            "Item2":"Гоночный глушитель",
            "Item3":14000
         }
      ],
      "1":[
         {
            "Item1":-1,
            "Item2":"Standardschwellen",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Maßgeschneiderte Schwellenwerte",
            "Item3":30000
         },
         {
            "Item1":1,
            "Item2":"Sportschwellen",
            "Item3":11000
         },
         {
            "Item1":2,
            "Item2":"Carbon Verkleidungen",
            "Item3":13000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Nein",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Carbon-Spoiler",
            "Item3":22000
         },
         {
            "Item1":1,
            "Item2":"Lackierter Spoiler",
            "Item3":26000
         },
         {
            "Item1":2,
            "Item2":"Carbon-Spoiler 2",
            "Item3":11000
         },
         {
            "Item1":3,
            "Item2":"GT Wing",
            "Item3":15000
         }
      ],
      "6":[
         {
            "Item1":-1,
            "Item2":"Standard-Dach",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Hinterer Abweiser",
            "Item3":26000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Normalspur Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Frontteiler",
            "Item3":13000
         },
         {
            "Item1":1,
            "Item2":"Сплиттер с канардами",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Сплиттер с крылышками",
            "Item3":17600
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Крашеный задний диффузор",
            "Item3":13000
         },
         {
            "Item1":1,
            "Item2":"Карбоновый зад. диффузор",
            "Item3":15000
         }
      ]
   },
   "Ninef2":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Chrome Schalldämpfer",
            "Item3":26000
         },
         {
            "Item1":1,
            "Item2":"Doppeltes Titan",
            "Item3":30000
         },
         {
            "Item1":2,
            "Item2":"Расширенный глушитель",
            "Item3":14000
         }
      ],
      "1":[
         {
            "Item1":-1,
            "Item2":"Standardschwellen",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Maßgeschneiderte Schwellenwerte",
            "Item3":30000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Carbon-Motorhaube",
            "Item3":14000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Nein",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Низкий спойлер",
            "Item3":15000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Normalspur Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Frontteiler",
            "Item3":17600
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifische Heckstoßstange",
            "Item3":13000
         }
      ]
   },
   "Ninef":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Chrome Schalldämpfer",
            "Item3":16000
         }
      ],
      "1":[
         {
            "Item1":-1,
            "Item2":"Standardschwellen",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Maßgeschneiderte Schwellenwerte",
            "Item3":30000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Carbon-Motorhaube",
            "Item3":11000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Nein",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Низкий спойлер",
            "Item3":15000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Normalspur Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Frontteiler",
            "Item3":17600
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifische Heckstoßstange",
            "Item3":17600
         }
      ]
   },
   "Sultan":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":2000
         },
         {
            "Item1":0,
            "Item2":"Titan Auspuff Tuner",
            "Item3":8000
         }
      ],
      "1":[
         {
            "Item1":-1,
            "Item2":"Standardschwellen",
            "Item3":3000
         },
         {
            "Item1":0,
            "Item2":"Maßgeschneiderte Schwellenwerte",
            "Item3":9000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":2000
         },
         {
            "Item1":0,
            "Item2":"С двойным забором воздуха",
            "Item3":11000
         },
         {
            "Item1":1,
            "Item2":"Carbon-Motorhaube 1",
            "Item3":14000
         },
         {
            "Item1":2,
            "Item2":"Carbon-Motorhaube 2",
            "Item3":15000
         },
         {
            "Item1":3,
            "Item2":"Haube mit Lufteinlass",
            "Item3":16000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Nein",
            "Item3":1000
         },
         {
            "Item1":0,
            "Item2":"Низкий спойлер",
            "Item3":6000
         },
         {
            "Item1":1,
            "Item2":"Spoiler angehoben",
            "Item3":8000
         },
         {
            "Item1":2,
            "Item2":"GT Wing",
            "Item3":12000
         }
      ],
      "6":[
         {
            "Item1":-1,
            "Item2":"Standard-Dach",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Полоса на лобовое стекло",
            "Item3":2000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Normalspur Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Frontteiler",
            "Item3":14000
         },
         {
            "Item1":1,
            "Item2":"Сплиттер и интеркулер",
            "Item3":18000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Карбоновый зад. диффузор",
            "Item3":18000
         }
      ]
   },
   "SultanRS":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":2000
         },
         {
            "Item1":0,
            "Item2":"Titan Auspuff Tuner",
            "Item3":8000
         },
         {
            "Item1":1,
            "Item2":"Titan Auspuff Tuner",
            "Item3":9000
         },
         {
            "Item1":2,
            "Item2":"Раздвоенный глушитель",
            "Item3":15000
         },
         {
            "Item1":3,
            "Item2":"Раздвоенный короткий глушитель",
            "Item3":14000
         },
         {
            "Item1":4,
            "Item2":"Титановый короткий глушитель Tuner",
            "Item3":10000
         }
      ],
      "1":[
         {
            "Item1":-1,
            "Item2":"Standardschwellen",
            "Item3":3000
         },
         {
            "Item1":0,
            "Item2":"Брызговики чёрного цвета",
            "Item3":9000
         },
         {
            "Item1":1,
            "Item2":"Брызговики основного цвета",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Брызговики дополнительного цвета",
            "Item3":15000
         },
         {
            "Item1":3,
            "Item2":"Maßgeschneiderte Schwellenwerte",
            "Item3":12000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":2000
         },
         {
            "Item1":0,
            "Item2":"С двойным забором воздуха",
            "Item3":11000
         },
         {
            "Item1":1,
            "Item2":"Carbon-Motorhaube 1",
            "Item3":14000
         },
         {
            "Item1":2,
            "Item2":"Carbon-Motorhaube 2",
            "Item3":15000
         },
         {
            "Item1":3,
            "Item2":"Carbon-Motorhaube 3",
            "Item3":16000
         },
         {
            "Item1":4,
            "Item2":"Carbon-Motorhaube 4",
            "Item3":17000
         },
         {
            "Item1":5,
            "Item2":"Изрисованный капот",
            "Item3":25000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Nein",
            "Item3":1000
         },
         {
            "Item1":0,
            "Item2":"Низкий спойлер 1",
            "Item3":6000
         },
         {
            "Item1":1,
            "Item2":"Erhöhter Spoiler 1",
            "Item3":8000
         },
         {
            "Item1":2,
            "Item2":"GT Wing 1",
            "Item3":12000
         },
         {
            "Item1":3,
            "Item2":"Низкий спойлер 2",
            "Item3":11000
         },
         {
            "Item1":4,
            "Item2":"Низкий спойлер 3",
            "Item3":11000
         },
         {
            "Item1":5,
            "Item2":"Низкий спойлер 4",
            "Item3":11000
         },
         {
            "Item1":6,
            "Item2":"Низкий спойлер 5",
            "Item3":11000
         },
         {
            "Item1":7,
            "Item2":"Низкий спойлер 6",
            "Item3":11000
         },
         {
            "Item1":8,
            "Item2":"Erhöhter Spoiler 2",
            "Item3":13000
         },
         {
            "Item1":9,
            "Item2":"Erhöhter Spoiler 3",
            "Item3":15000
         },
         {
            "Item1":10,
            "Item2":"Carbon-Spoiler 1",
            "Item3":20000
         },
         {
            "Item1":11,
            "Item2":"Carbon-Spoiler 2",
            "Item3":20000
         },
         {
            "Item1":12,
            "Item2":"Carbon-Spoiler 3",
            "Item3":20000
         },
         {
            "Item1":13,
            "Item2":"Массивный Carbon-Spoiler",
            "Item3":21000
         },
         {
            "Item1":14,
            "Item2":"Высокий спойлер",
            "Item3":25000
         },
         {
            "Item1":15,
            "Item2":"Комбо-спойлер",
            "Item3":27000
         }
      ],
      "4":[
         {
            "Item1":-1,
            "Item2":"Стандартный радиатор",
            "Item3":1000
         },
         {
            "Item1":0,
            "Item2":"Заказной радиатор",
            "Item3":10000
         },
         {
            "Item1":1,
            "Item2":"Спортивный радиатор",
            "Item3":15000
         }
      ],
      "5":[
         {
            "Item1":-1,
            "Item2":"Nein",
            "Item3":1000
         },
         {
            "Item1":0,
            "Item2":"Расширение основного цвета",
            "Item3":10000
         },
         {
            "Item1":1,
            "Item2":"Расширение черного цвета",
            "Item3":15000
         },
         {
            "Item1":5,
            "Item2":"Максимальное расширение",
            "Item3":20000
         }
      ],
      "6":[
         {
            "Item1":-1,
            "Item2":"Standard-Dach",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Спойлер на крыше",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Острая крыша",
            "Item3":10000
         },
         {
            "Item1":2,
            "Item2":"Carbon Dach",
            "Item3":15000
         },
         {
            "Item1":3,
            "Item2":"Спойлер с карбоновой крышей",
            "Item3":20000
         },
         {
            "Item1":4,
            "Item2":"Острая Carbon Dach",
            "Item3":13000
         }
      ],
      "7":[
         {
            "Item1":-1,
            "Item2":"Keine Färbung",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Streifen an den Seiten",
            "Item3":18000
         },
         {
            "Item1":1,
            "Item2":"Schwarz Färbung SULTAN RS",
            "Item3":20000
         },
         {
            "Item1":2,
            "Item2":"Weiß Färbung SULTAN RS",
            "Item3":20000
         },
         {
            "Item1":3,
            "Item2":"Blauer Streifen an der Seite",
            "Item3":25000
         },
         {
            "Item1":4,
            "Item2":"Färbung KARIN",
            "Item3":26000
         },
         {
            "Item1":5,
            "Item2":"Färbung REDWOOD",
            "Item3":26000
         },
         {
            "Item1":6,
            "Item2":"Färbung KARIN 2",
            "Item3":26000
         },
         {
            "Item1":7,
            "Item2":"Anime Färbung",
            "Item3":40000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Normalspur Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Stoßstange vorne 1",
            "Item3":14000
         },
         {
            "Item1":1,
            "Item2":"Stoßstange vorne 2",
            "Item3":18000
         },
         {
            "Item1":2,
            "Item2":"Stoßstange vorne 3",
            "Item3":20000
         },
         {
            "Item1":3,
            "Item2":"Stoßstange vorne 4",
            "Item3":18000
         },
         {
            "Item1":4,
            "Item2":"Stoßstange vorne 5",
            "Item3":15000
         },
         {
            "Item1":5,
            "Item2":"Stoßstange vorne 6",
            "Item3":17000
         },
         {
            "Item1":6,
            "Item2":"Stoßstange vorne 7",
            "Item3":16000
         },
         {
            "Item1":7,
            "Item2":"Stoßstange vorne 8",
            "Item3":15000
         },
         {
            "Item1":8,
            "Item2":"Stoßstange vorne 9",
            "Item3":20000
         },
         {
            "Item1":9,
            "Item2":"Stoßstange vorne 10",
            "Item3":25000
         },
         {
            "Item1":10,
            "Item2":"Stoßstange vorne 11",
            "Item3":23000
         },
         {
            "Item1":11,
            "Item2":"Stoßstange vorne 12",
            "Item3":20000
         },
         {
            "Item1":12,
            "Item2":"Stoßstange vorne 13",
            "Item3":21000
         },
         {
            "Item1":13,
            "Item2":"Stoßstange vorne 14",
            "Item3":18000
         },
         {
            "Item1":14,
            "Item2":"Stoßstange vorne 15",
            "Item3":30000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Hintere Stoßstange 1",
            "Item3":18000
         },
         {
            "Item1":1,
            "Item2":"Hintere Stoßstange 2",
            "Item3":20000
         },
         {
            "Item1":2,
            "Item2":"Hintere Stoßstange 3",
            "Item3":22000
         },
         {
            "Item1":3,
            "Item2":"Hintere Stoßstange 4",
            "Item3":19000
         },
         {
            "Item1":4,
            "Item2":"Hintere Stoßstange 5",
            "Item3":21000
         },
         {
            "Item1":5,
            "Item2":"Hintere Stoßstange 6",
            "Item3":25000
         },
         {
            "Item1":6,
            "Item2":"Hintere Stoßstange 7",
            "Item3":23000
         },
         {
            "Item1":7,
            "Item2":"Hintere Stoßstange 8",
            "Item3":20000
         }
      ]
   },
   "Fugitive":{

   },
   "Tailgater":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Titan Auspuff",
            "Item3":8000
         },
         {
            "Item1":1,
            "Item2":"Doppeltes Titan",
            "Item3":10000
         },
         {
            "Item1":2,
            "Item2":"Chrome Schalldämpfer",
            "Item3":14000
         },
         {
            "Item1":3,
            "Item2":"Doppelter Schalldämpfer",
            "Item3":16000
         }
      ],
      "1":[
         {
            "Item1":-1,
            "Item2":"Standardschwellen",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Maßgeschneiderte Schwellenwerte",
            "Item3":9000
         },
         {
            "Item1":1,
            "Item2":"Niedrige Schwellen",
            "Item3":11000
         },
         {
            "Item1":2,
            "Item2":"Semi-Sport-Schwellenwerte",
            "Item3":13000
         },
         {
            "Item1":3,
            "Item2":"Sportschwellen",
            "Item3":16000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Haube mit Lufteinlass",
            "Item3":16000
         },
         {
            "Item1":1,
            "Item2":"Carbon-Motorhaube",
            "Item3":14000
         },
         {
            "Item1":2,
            "Item2":"Haube mit Lufteinlass 2",
            "Item3":15000
         },
         {
            "Item1":3,
            "Item2":"Спортивный капот",
            "Item3":19000
         },
         {
            "Item1":4,
            "Item2":"Haube mit Lufteinlass",
            "Item3":9000
         },
         {
            "Item1":5,
            "Item2":"С двойным забором воздуха",
            "Item3":11000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Nein",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Лип-спойлер",
            "Item3":6000
         },
         {
            "Item1":1,
            "Item2":"Низкий спойлер",
            "Item3":8000
         },
         {
            "Item1":2,
            "Item2":"Средний спойлер",
            "Item3":11000
         },
         {
            "Item1":3,
            "Item2":"Spoiler angehoben",
            "Item3":13000
         },
         {
            "Item1":4,
            "Item2":"Carbon-Spoiler",
            "Item3":15000
         }
      ],
      "4":[
         {
            "Item1":-1,
            "Item2":"Standard Grill",
            "Item3":3000
         },
         {
            "Item1":0,
            "Item2":"Черная решетка",
            "Item3":7000
         },
         {
            "Item1":1,
            "Item2":"Хромированная решетка",
            "Item3":11000
         },
         {
            "Item1":2,
            "Item2":"Сетчатая решетка",
            "Item3":13000
         },
         {
            "Item1":3,
            "Item2":"Разделенная решетка",
            "Item3":15000
         },
         {
            "Item1":4,
            "Item2":"Спортивная решетка",
            "Item3":17000
         }
      ],
      "5":[
         {
            "Item1":-1,
            "Item2":"Стандартное крыло",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Надкрылки",
            "Item3":8000
         },
         {
            "Item1":1,
            "Item2":"Хромовые арки",
            "Item3":10000
         }
      ],
      "6":[
         {
            "Item1":-1,
            "Item2":"Standard-Dach",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Carbon Dach",
            "Item3":9000
         },
         {
            "Item1":1,
            "Item2":"Багажник над крышой",
            "Item3":7000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Normalspur Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Крашеный сплиттер",
            "Item3":13000
         },
         {
            "Item1":1,
            "Item2":"Frontteiler",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Краш. бампер и сплиттер",
            "Item3":17000
         },
         {
            "Item1":3,
            "Item2":"Сплиттер и интеркулер",
            "Item3":17600
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Карбоновый зад. диффузор",
            "Item3":13000
         },
         {
            "Item1":1,
            "Item2":"Крашеный Hintere Stoßstange",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Спортивный Hintere Stoßstange",
            "Item3":17000
         },
         {
            "Item1":3,
            "Item2":"Крашеный бампер и дифф.",
            "Item3":17600
         }
      ]
   },
   "Kuruma":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Двойной глушитель",
            "Item3":10000
         }
      ],
      "1":[
         {
            "Item1":-1,
            "Item2":"Standardschwellen",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Maßgeschneiderte Schwellenwerte осн.цвета",
            "Item3":11000
         },
         {
            "Item1":1,
            "Item2":"Maßgeschneiderte Schwellenwerte доп.цвета",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Заказные карбоновые пороги",
            "Item3":20000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Стандартный спойлер",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Спойлер доп.цвета",
            "Item3":7000
         },
         {
            "Item1":1,
            "Item2":"Низкий Carbon-Spoiler",
            "Item3":11000
         },
         {
            "Item1":2,
            "Item2":"Низкий спойлер осн.цвета",
            "Item3":13000
         },
         {
            "Item1":3,
            "Item2":"Средний Carbon-Spoiler",
            "Item3":15000
         },
         {
            "Item1":4,
            "Item2":"GT Wing",
            "Item3":25000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Normalspur Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger осн.цвета",
            "Item3":11000
         },
         {
            "Item1":1,
            "Item2":"Kundenspezifischer Stoßfänger доп.цвета",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Заказной карбоновый бампер",
            "Item3":15000
         }
      ]
   },
   "Sentinel":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Doppelter Schalldämpfer",
            "Item3":10000
         },
         {
            "Item1":1,
            "Item2":"Titan Auspuff",
            "Item3":12000
         },
         {
            "Item1":2,
            "Item2":"Расширенный глушитель",
            "Item3":14000
         }
      ],
      "1":[
         {
            "Item1":-1,
            "Item2":"Standardschwellen",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Maßgeschneiderte Schwellenwerte",
            "Item3":11000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Carbon-Motorhaube",
            "Item3":17000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Nein",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Лип-спойлер",
            "Item3":7000
         },
         {
            "Item1":1,
            "Item2":"Средний спойлер",
            "Item3":11000
         },
         {
            "Item1":2,
            "Item2":"Spoiler angehoben",
            "Item3":13000
         },
         {
            "Item1":3,
            "Item2":"Carbon-Spoiler",
            "Item3":15000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Normalspur Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Открытый интеркулер",
            "Item3":11000
         },
         {
            "Item1":1,
            "Item2":"Сплиттер с канардами",
            "Item3":15000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Карбоновый зад. диффузор",
            "Item3":11000
         },
         {
            "Item1":1,
            "Item2":"Карбоновый дифф. и крюк",
            "Item3":15000
         }
      ]
   },
   "F620":{

   },
   "Schwarzer":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Doppelter Schalldämpfer",
            "Item3":10000
         },
         {
            "Item1":1,
            "Item2":"Doppeltes Titan",
            "Item3":13000
         },
         {
            "Item1":2,
            "Item2":"Овальный глушитель",
            "Item3":15000
         },
         {
            "Item1":3,
            "Item2":"Гоночный глушитель",
            "Item3":17000
         }
      ],
      "1":[
         {
            "Item1":-1,
            "Item2":"Standardschwellen",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Maßgeschneiderte Schwellenwerte 1",
            "Item3":11000
         },
         {
            "Item1":1,
            "Item2":"Maßgeschneiderte Schwellenwerte 2",
            "Item3":13000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Carbon-Motorhaube",
            "Item3":13000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Nein",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Spoiler Entenschwanz",
            "Item3":11000
         },
         {
            "Item1":1,
            "Item2":"Spoiler angehoben",
            "Item3":13000
         },
         {
            "Item1":2,
            "Item2":"Carbon-Spoiler",
            "Item3":17000
         }
      ],
      "4":[
         {
            "Item1":-1,
            "Item2":"Standard Grill",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Решетка с логотипом",
            "Item3":7000
         }
      ],
      "6":[
         {
            "Item1":-1,
            "Item2":"Standard-Dach",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Carbon Dach",
            "Item3":11000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Normalspur Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Евробампер",
            "Item3":9000
         },
         {
            "Item1":1,
            "Item2":"Открытый интеркулер",
            "Item3":11000
         },
         {
            "Item1":2,
            "Item2":"Сплиттер и интеркулер",
            "Item3":13000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Карбоновый зад. диффузор",
            "Item3":13000
         }
      ]
   },
   "Exemplar":{

   },
   "Felon":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Овальный глушитель",
            "Item3":15000
         }
      ],
      "1":[
         {
            "Item1":-1,
            "Item2":"Standardschwellen",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Maßgeschneiderte Schwellenwerte",
            "Item3":13000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Haube mit Lufteinlass",
            "Item3":13000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Nein",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Низкий спойлер",
            "Item3":9000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Normalspur Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Frontteiler",
            "Item3":9000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Карбоновый зад. диффузор",
            "Item3":11000
         }
      ]
   },
   "Schafter2":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Овальный глушитель",
            "Item3":13000
         },
         {
            "Item1":1,
            "Item2":"Chrome Schalldämpfer",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Doppelter Schalldämpfer",
            "Item3":17000
         },
         {
            "Item1":3,
            "Item2":"Titan Auspuff",
            "Item3":19000
         }
      ],
      "1":[
         {
            "Item1":-1,
            "Item2":"Standardschwellen",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Maßgeschneiderte Schwellenwerte 1",
            "Item3":11000
         },
         {
            "Item1":1,
            "Item2":"Carbon Verkleidungen",
            "Item3":13000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Haube mit Lufteinlass",
            "Item3":13000
         },
         {
            "Item1":1,
            "Item2":"Carbon-Motorhaube 1",
            "Item3":17000
         },
         {
            "Item1":2,
            "Item2":"Carbon-Motorhaube 2",
            "Item3":19000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Nein",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Лип-спойлер",
            "Item3":9000
         },
         {
            "Item1":1,
            "Item2":"Carbon-Spoiler",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Spoiler angehoben",
            "Item3":19000
         }
      ],
      "4":[
         {
            "Item1":-1,
            "Item2":"Standard Grill",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Хромированная решетка",
            "Item3":9000
         },
         {
            "Item1":1,
            "Item2":"Спортивная решетка",
            "Item3":13000
         }
      ],
      "6":[
         {
            "Item1":-1,
            "Item2":"Standard-Dach",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Carbon Dach",
            "Item3":15000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Normalspur Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Frontteiler",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Kohlenstoffspalter",
            "Item3":17000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":15000
         },
         {
            "Item1":0,
            "Item2":"Заказной зад. бампер",
            "Item3":17000
         }
      ]
   },
   "Patriot":{

   },
   "Cavalcade":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Улучшенный глушитель",
            "Item3":9000
         }
      ],
      "4":[
         {
            "Item1":-1,
            "Item2":"Решетка радиатора с прорезями",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Сетчетая решетка",
            "Item3":7000
         },
         {
            "Item1":1,
            "Item2":"Хромированная решетка",
            "Item3":11000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Normalspur Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Frontteiler",
            "Item3":9000
         },
         {
            "Item1":1,
            "Item2":"Stoßstange Extreme Aero",
            "Item3":13000
         }
      ]
   },
   "Landstalker":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Chrome Schalldämpfer",
            "Item3":9000
         }
      ],
      "6":[
         {
            "Item1":-1,
            "Item2":"Standard-Dach",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Dachträger",
            "Item3":9000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Normalspur Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Frontteiler",
            "Item3":13000
         }
      ]
   },
   "Baller":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Auspuff",
            "Item3":13000
         }
      ],
      "1":[
         {
            "Item1":-1,
            "Item2":"Standardschwellen",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Maßgeschneiderte Schwellenwerte",
            "Item3":14000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Normalspur Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Заказной передний 1",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Заказной передний 2",
            "Item3":17000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":15000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifische Heckstoßstange",
            "Item3":17000
         }
      ]
   },
   "Seminole":{

   },
   "RancherXL":{

   },
   "Buffalo":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Titan Auspuff Tuner",
            "Item3":15000
         }
      ],
      "1":[
         {
            "Item1":-1,
            "Item2":"Standardschwellen",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Maßgeschneiderte Schwellenwerte",
            "Item3":16000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Nein",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Низкий спойлер",
            "Item3":14000
         }
      ]
   },
   "Gauntlet":{

   },
   "Phoenix":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Расширенный глушитель",
            "Item3":9000
         },
         {
            "Item1":1,
            "Item2":"Titan Auspuff Tuner",
            "Item3":11000
         }
      ],
      "1":[
         {
            "Item1":-1,
            "Item2":"Standardschwellen",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Maßgeschneiderte Schwellenwerte",
            "Item3":13000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Капот с забралом",
            "Item3":9000
         },
         {
            "Item1":1,
            "Item2":"Тройной суперчарджер",
            "Item3":11000
         },
         {
            "Item1":2,
            "Item2":"Суперчарджер",
            "Item3":13000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Nein",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Средний спойлер",
            "Item3":9000
         },
         {
            "Item1":1,
            "Item2":"Spoiler angehoben",
            "Item3":11000
         }
      ],
      "4":[
         {
            "Item1":-1,
            "Item2":"Standard Grill",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Железная маска",
            "Item3":9000
         }
      ],
      "6":[
         {
            "Item1":-1,
            "Item2":"Standard-Dach",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Стеклянная крыша",
            "Item3":13000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Normalspur Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Широкий передний спойлер",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Spoiler",
            "Item3":17000
         }
      ]
   },
   "Radi":{

   },
   "Glendale":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Расширенный глушитель",
            "Item3":9000
         },
         {
            "Item1":1,
            "Item2":"Двойной глушитель",
            "Item3":11000
         },
         {
            "Item1":2,
            "Item2":"Глушитель двустволка",
            "Item3":13000
         }
      ],
      "1":[
         {
            "Item1":-1,
            "Item2":"Standardschwellen",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Maßgeschneiderte Schwellenwerte",
            "Item3":11000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Доп. цвет капота",
            "Item3":9000
         },
         {
            "Item1":1,
            "Item2":"Классический капот",
            "Item3":11000
         },
         {
            "Item1":2,
            "Item2":"Доп. классический капот",
            "Item3":13000
         },
         {
            "Item1":3,
            "Item2":"Капот в полоску",
            "Item3":15000
         },
         {
            "Item1":4,
            "Item2":"Доп. капот в полоску",
            "Item3":17000
         }
      ],
      "6":[
         {
            "Item1":-1,
            "Item2":"Standard-Dach",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Dachträger",
            "Item3":5000
         },
         {
            "Item1":1,
            "Item2":"Багажник для поездки",
            "Item3":5000
         },
         {
            "Item1":2,
            "Item2":"Загруженный багаж",
            "Item3":7000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Normalspur Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Stoßfänger",
            "Item3":7000
         }
      ]
   },
   "Serrano":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Расширенный глушитель",
            "Item3":6000
         },
         {
            "Item1":1,
            "Item2":"Doppelter Schalldämpfer",
            "Item3":7000
         },
         {
            "Item1":2,
            "Item2":"Titan Auspuff",
            "Item3":8000
         },
         {
            "Item1":3,
            "Item2":"Chrome Schalldämpfer",
            "Item3":9000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Carbon-Motorhaube",
            "Item3":9000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Nein",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Спойлер на крыше",
            "Item3":9000
         }
      ],
      "4":[
         {
            "Item1":-1,
            "Item2":"Standard Grill",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Решетка с логотипом",
            "Item3":9000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Normalspur Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Заказной передний спойлер",
            "Item3":9000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifische Heckstoßstange",
            "Item3":11000
         }
      ]
   },
   "Zion":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Расширенный глушитель",
            "Item3":9000
         },
         {
            "Item1":1,
            "Item2":"Doppelter Schalldämpfer",
            "Item3":11000
         }
      ],
      "1":[
         {
            "Item1":-1,
            "Item2":"Standardschwellen",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Maßgeschneiderte Schwellenwerte",
            "Item3":13000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Nein",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Spoiler angehoben",
            "Item3":11000
         },
         {
            "Item1":1,
            "Item2":"Средний спойлер",
            "Item3":13000
         },
         {
            "Item1":2,
            "Item2":"Carbon-Spoiler",
            "Item3":15000
         }
      ],
      "6":[
         {
            "Item1":-1,
            "Item2":"Standard Grill",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Carbon Dach",
            "Item3":14000
         }
      ]
   },
   "Surge":{
      "1":[
         {
            "Item1":-1,
            "Item2":"Standardschwellen",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Maßgeschneiderte Schwellenwerte",
            "Item3":7000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Nein",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Спойлер Tuner",
            "Item3":9000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Normalspur Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Frontteiler",
            "Item3":10800
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifische Heckstoßstange",
            "Item3":9000
         }
      ]
   },
   "Stanier":{

   },
   "Stratum":{

   },
   "Tampa":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Расширенный глушитель",
            "Item3":7000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Простой воздухозаборник",
            "Item3":7000
         },
         {
            "Item1":1,
            "Item2":"Двойной воздухозаборник",
            "Item3":9000
         },
         {
            "Item1":2,
            "Item2":"Тройной суперчарджер",
            "Item3":11000
         },
         {
            "Item1":3,
            "Item2":"Суперчарджер",
            "Item3":13000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Nein",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Дрэг-спойлер",
            "Item3":9000
         },
         {
            "Item1":1,
            "Item2":"Spoiler Entenschwanz",
            "Item3":11000
         },
         {
            "Item1":2,
            "Item2":"Низкий спойлер",
            "Item3":12000
         }
      ],
      "4":[
         {
            "Item1":-1,
            "Item2":"Standard Grill",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Разделенная решетка",
            "Item3":7000
         },
         {
            "Item1":1,
            "Item2":"Хромированная решетка",
            "Item3":9000
         },
         {
            "Item1":2,
            "Item2":"Открытая решетка",
            "Item3":10000
         },
         {
            "Item1":3,
            "Item2":"Открытая решетка",
            "Item3":11000
         }
      ],
      "6":[
         {
            "Item1":-1,
            "Item2":"Standard-Dach",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Крашеная крыша",
            "Item3":9000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Normalspur Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Заказной передний спойлер",
            "Item3":7000
         },
         {
            "Item1":1,
            "Item2":"Широкий передний спойлер",
            "Item3":8000
         },
         {
            "Item1":2,
            "Item2":"Перекрашеный бампер",
            "Item3":9000
         },
         {
            "Item1":3,
            "Item2":"Перекрашеный спойлер",
            "Item3":11000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Покрашенный бампер",
            "Item3":7000
         },
         {
            "Item1":1,
            "Item2":"Крашеные отражатели",
            "Item3":9000
         },
         {
            "Item1":2,
            "Item2":"Крашеная задняя часть",
            "Item3":11000
         }
      ]
   },
   "Prairie":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Titan Auspuff Tuner",
            "Item3":7000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Carbon-Motorhaube",
            "Item3":7000
         },
         {
            "Item1":1,
            "Item2":"Облегченный капот",
            "Item3":8000
         },
         {
            "Item1":2,
            "Item2":"Облегченный капот (карбон)",
            "Item3":9000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Nein",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Низкий спойлер",
            "Item3":7000
         },
         {
            "Item1":1,
            "Item2":"Carbon-Spoiler",
            "Item3":9000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Normalspur Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Сплитер с канардами",
            "Item3":9000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Карбоновый дифф. и крюк",
            "Item3":9000
         }
      ]
   },
   "XLS":{

   },
   "Gresley":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Стандартные глушитель",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Doppelter Schalldämpfer",
            "Item3":9000
         }
      ],
      "1":[
         {
            "Item1":-1,
            "Item2":"Standardschwellen",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Maßgeschneiderte Schwellenwerte",
            "Item3":8000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Капот с забралом",
            "Item3":13000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Normalspur Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kohlenstoffspalter",
            "Item3":15000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Карбоновый зад. диффузор",
            "Item3":15000
         }
      ]
   },
   "Surano":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Стандартные глушитель",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Chrome Schalldämpfer",
            "Item3":13000
         }
      ],
      "1":[
         {
            "Item1":-1,
            "Item2":"Standardschwellen",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Maßgeschneiderte Schwellenwerte",
            "Item3":11000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Haube mit Lufteinlass",
            "Item3":13000
         },
         {
            "Item1":1,
            "Item2":"Carbon-Motorhaube",
            "Item3":15000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Стандартный спойлер",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Lackierter Spoiler",
            "Item3":9000
         },
         {
            "Item1":1,
            "Item2":"Spoiler angehoben",
            "Item3":12000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Normalspur Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Frontteiler",
            "Item3":15000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Карбоновый зад. диффузор",
            "Item3":17000
         }
      ]
   },
   "Tornado3":{

   },
   "Tornado4":{

   },
   "Emperor2":{

   },
   "Voodoo2":{

   },
   "Regina":{

   },
   "Ingot":{

   },
   "Picador":{

   },
   "Manana":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Стандартные глушитель",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Глушитель Двустволка",
            "Item3":7000
         },
         {
            "Item1":1,
            "Item2":"Двойной глушитель",
            "Item3":9000
         }
      ],
      "5":[
         {
            "Item1":-1,
            "Item2":"Стандартное крыло",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Дуговые огни",
            "Item3":11000
         }
      ],
      "6":[
         {
            "Item1":-1,
            "Item2":"Standard-Dach",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Полоса на лобовое стекло",
            "Item3":9000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Normalspur Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Бампер и нижняя губа",
            "Item3":7000
         },
         {
            "Item1":1,
            "Item2":"Отделка бампера",
            "Item3":9000
         },
         {
            "Item1":2,
            "Item2":"Нижняя губа",
            "Item3":11000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Габаритные усы",
            "Item3":11000
         }
      ]
   },
   "Asea":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standardschwellen",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Titan Auspuff Tuner",
            "Item3":5000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Carbon-Motorhaube",
            "Item3":3000
         },
         {
            "Item1":2,
            "Item2":"Капот в наклейках",
            "Item3":5000
         },
         {
            "Item1":3,
            "Item2":"Накладка и наклейки",
            "Item3":7000
         }
      ],
      "5":[
         {
            "Item1":-1,
            "Item2":"Стандартное левое крыло",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Левое крыло в наклейках",
            "Item3":3000
         },
         {
            "Item1":1,
            "Item2":"Стандартное правое крыло",
            "Item3":3000
         },
         {
            "Item1":2,
            "Item2":"Правое крыло в наклейках",
            "Item3":3000
         }
      ],
      "6":[
         {
            "Item1":-1,
            "Item2":"Standard-Dach",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Carbon Dach",
            "Item3":5000
         },
         {
            "Item1":1,
            "Item2":"Кузов в наклейках",
            "Item3":5000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Normalspur Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Frontteiler",
            "Item3":3000
         },
         {
            "Item1":1,
            "Item2":"Открытый интеркулер",
            "Item3":5000
         },
         {
            "Item1":2,
            "Item2":"Раллийный бампер",
            "Item3":5000
         },
         {
            "Item1":3,
            "Item2":"Бампер в наклейках",
            "Item3":5000
         }
      ]
   },
   "Elegy":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standardschwellen",
            "Item3":5000
         },
         {
            "Item1":5,
            "Item2":"Titan Auspuff Tuner",
            "Item3":10000
         },
         {
            "Item1":6,
            "Item2":"Двойной глушитель",
            "Item3":15000
         },
         {
            "Item1":7,
            "Item2":"Двойной Titan Auspuff",
            "Item3":17000
         }
      ],
      "1":[
         {
            "Item1":-1,
            "Item2":"Standardschwellen",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Maßgeschneiderte Schwellenwerte осн.цвета",
            "Item3":10000
         },
         {
            "Item1":0,
            "Item2":"Maßgeschneiderte Schwellenwerte доп.цвета",
            "Item3":12000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Изрисованный капот",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Haube mit Lufteinlass 1",
            "Item3":10000
         },
         {
            "Item1":3,
            "Item2":"Haube mit Lufteinlass 2",
            "Item3":13000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Nein",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Низкий спойлер 1",
            "Item3":5000
         },
         {
            "Item1":1,
            "Item2":"Низкий спойлер 2",
            "Item3":6000
         },
         {
            "Item1":2,
            "Item2":"Низкий спойлер 3",
            "Item3":7000
         },
         {
            "Item1":3,
            "Item2":"Низкий спойлер 4",
            "Item3":8000
         },
         {
            "Item1":4,
            "Item2":"Низкий спойлер 5",
            "Item3":9000
         },
         {
            "Item1":5,
            "Item2":"Средний бампер доп.цвета 1",
            "Item3":15000
         },
         {
            "Item1":9,
            "Item2":"Средний бампер доп.цвета 2",
            "Item3":25000
         },
         {
            "Item1":19,
            "Item2":"Modifizierter Spoiler",
            "Item3":35000
         }
      ],
      "4":[
         {
            "Item1":-1,
            "Item2":"Nein",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Kühlergrill 1",
            "Item3":5000
         },
         {
            "Item1":1,
            "Item2":"Kundenspezifischer Kühlergrill 2",
            "Item3":6000
         }
      ],
      "5":[
         {
            "Item1":-1,
            "Item2":"Стандартное расширение",
            "Item3":5000
         },
         {
            "Item1":2,
            "Item2":"Расширение 1",
            "Item3":5000
         },
         {
            "Item1":3,
            "Item2":"Расширение 2",
            "Item3":8000
         }
      ],
      "7":[
         {
            "Item1":-1,
            "Item2":"Keine Färbung",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Двойная белая полоса",
            "Item3":18000
         },
         {
            "Item1":1,
            "Item2":"Двойная черная полоса",
            "Item3":20000
         },
         {
            "Item1":2,
            "Item2":"Färbung Ракета",
            "Item3":20000
         },
         {
            "Item1":3,
            "Item2":"Färbung Luxe",
            "Item3":30000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Normalspur Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Изрисованный бампер",
            "Item3":15000
         },
         {
            "Item1":1,
            "Item2":"Карбоновый бампер 1",
            "Item3":12000
         },
         {
            "Item1":2,
            "Item2":"Бампер осн.цвета",
            "Item3":13000
         },
         {
            "Item1":4,
            "Item2":"Карбоновый бампер 2",
            "Item3":17000
         },
         {
            "Item1":5,
            "Item2":"Карбоновый бампер 3",
            "Item3":20000
         }
      ]
   },
   "Baller2":{

   },
   "Cavalcade2":{

   },
   "Rocoto":{

   },
   "Dubsta":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Titan Auspuff ",
            "Item3":9000
         },
         {
            "Item1":1,
            "Item2":"Doppeltes Titan ",
            "Item3":11000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Капот внедорожника",
            "Item3":11000
         },
         {
            "Item1":1,
            "Item2":"Капот с запаской",
            "Item3":13000
         }
      ],
      "4":[
         {
            "Item1":-1,
            "Item2":"Standard Grill",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Сетчатая решетка",
            "Item3":9000
         },
         {
            "Item1":1,
            "Item2":"Черная решетка",
            "Item3":10000
         },
         {
            "Item1":2,
            "Item2":"Хромированная решетка",
            "Item3":11000
         }
      ],
      "5":[
         {
            "Item1":-1,
            "Item2":"Стандартное левое крыло",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Шноркель",
            "Item3":11000
         }
      ],
      "6":[
         {
            "Item1":-1,
            "Item2":"Standard-Dach",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Dachträger",
            "Item3":7000
         },
         {
            "Item1":1,
            "Item2":"Багажник с прожекторами",
            "Item3":9000
         },
         {
            "Item1":2,
            "Item2":"Schwarz Dachträger",
            "Item3":11000
         },
         {
            "Item1":3,
            "Item2":"Багажник с прожекторами",
            "Item3":13000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Normalspur Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Хромированный кенгурятник",
            "Item3":9000
         },
         {
            "Item1":1,
            "Item2":"Кенгурятник с дугой",
            "Item3":11000
         },
         {
            "Item1":2,
            "Item2":"Кенгурятник с фарами",
            "Item3":13000
         },
         {
            "Item1":3,
            "Item2":"Кенгурятник с дугой и фары",
            "Item3":15000
         },
         {
            "Item1":4,
            "Item2":"Schwarz кенгурятник",
            "Item3":13000
         },
         {
            "Item1":5,
            "Item2":"Кенгурятник с дугой и фыры",
            "Item3":15000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Хромированный бампер",
            "Item3":11000
         },
         {
            "Item1":1,
            "Item2":"Schwarz бампер",
            "Item3":13000
         }
      ]
   },
   "Oracle2":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Chrome Schalldämpfer",
            "Item3":9000
         },
         {
            "Item1":0,
            "Item2":"Doppelter Schalldämpfer",
            "Item3":11000
         },
         {
            "Item1":0,
            "Item2":"Titan Auspuff",
            "Item3":13000
         }
      ]
   },
   "Oracle":{

   },
   "Ruiner":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Расширенный глушитель",
            "Item3":3000
         },
         {
            "Item1":1,
            "Item2":"Doppeltes Titan",
            "Item3":5000
         },
         {
            "Item1":2,
            "Item2":"Titan Auspuff Tuner",
            "Item3":6000
         },
         {
            "Item1":3,
            "Item2":"Shakotan-Schalldämpfer",
            "Item3":7000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Carbon-Motorhaube",
            "Item3":3000
         },
         {
            "Item1":1,
            "Item2":"Haube mit Lufteinlass",
            "Item3":15000
         },
         {
            "Item1":2,
            "Item2":"Капот и протекторы фар",
            "Item3":6000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Nein",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Средний спойлер",
            "Item3":5000
         },
         {
            "Item1":1,
            "Item2":"Spoiler angehoben",
            "Item3":6000
         },
         {
            "Item1":2,
            "Item2":"Дрэг-спойлер",
            "Item3":7000
         },
         {
            "Item1":3,
            "Item2":"GT Wing",
            "Item3":9000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Normalspur Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Spoiler",
            "Item3":5000
         },
         {
            "Item1":1,
            "Item2":"Спойлер и охладитель масла",
            "Item3":7000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         }
      ]
   },
   "Minivan":{

   },
   "Blista2":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Doppelter Schalldämpfer Tuner",
            "Item3":3000
         },
         {
            "Item1":1,
            "Item2":"Расширенный глушитель",
            "Item3":5000
         },
         {
            "Item1":2,
            "Item2":"Гоночный глушитель",
            "Item3":6000
         }
      ],
      "1":[
         {
            "Item1":-1,
            "Item2":"Standardschwellen",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Maßgeschneiderte Schwellenwerte",
            "Item3":5000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Carbon-Motorhaube",
            "Item3":5000
         },
         {
            "Item1":1,
            "Item2":"Haube mit Lufteinlass",
            "Item3":6000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Nein",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Низкий спойлер",
            "Item3":3000
         },
         {
            "Item1":1,
            "Item2":"Крашенный спойлер",
            "Item3":5000
         },
         {
            "Item1":2,
            "Item2":"Спойлер Tuner",
            "Item3":6000
         }
      ],
      "6":[
         {
            "Item1":-1,
            "Item2":"Standard-Dach",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Полоса на лобовое стекло",
            "Item3":3000
         }
      ]
   },
   "Stalion":{
      "6":[
         {
            "Item1":-1,
            "Item2":"Standard-Dach",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Кабрио",
            "Item3":7000
         },
         {
            "Item1":0,
            "Item2":"Maßgeschneidertes Dach",
            "Item3":9000
         }
      ]
   },
   "Asterope":{

   },
   "Washington":{

   },
   "Premier":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Овальный глушитель",
            "Item3":3000
         },
         {
            "Item1":1,
            "Item2":"Расширенный глушитель",
            "Item3":5000
         }
      ],
      "1":[
         {
            "Item1":-1,
            "Item2":"Standardschwellen",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Maßgeschneiderte Schwellenwerte",
            "Item3":5000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Nein",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Спойлер Tuner",
            "Item3":7000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Normalspur Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Frontteiler",
            "Item3":7000
         }
      ]
   },
   "Intruder":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Chrome Schalldämpfer ",
            "Item3":5000
         }
      ],
      "1":[
         {
            "Item1":-1,
            "Item2":"Standardschwellen",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Боковые пороги Bippu",
            "Item3":3000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Nein",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Низкий спойлер",
            "Item3":5000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Normalspur Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Заказной Stoßstange vorne",
            "Item3":5000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifische Heckstoßstange",
            "Item3":5000
         }
      ]
   },
   "Dilettante":{

   },
   "Voodoo":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Двойной глушитель",
            "Item3":3000
         },
         {
            "Item1":1,
            "Item2":"Двойной Doppelter Schalldämpfer",
            "Item3":5000
         }
      ],
      "4":[
         {
            "Item1":-1,
            "Item2":"Standard Grill",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Хромированная решетка",
            "Item3":3000
         },
         {
            "Item1":1,
            "Item2":"Тонкая хроом. решетка",
            "Item3":5000
         },
         {
            "Item1":2,
            "Item2":"Зубастая решетка радиатора",
            "Item3":6000
         }
      ],
      "7":[
         {
            "Item1":-1,
            "Item2":"Стандартная Färbung",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Зеленые полосы",
            "Item3":7000
         },
         {
            "Item1":1,
            "Item2":"Синие полосы",
            "Item3":7000
         },
         {
            "Item1":2,
            "Item2":"Зеленые полосы с фреской",
            "Item3":8000
         },
         {
            "Item1":3,
            "Item2":"Синие полосы с фреской",
            "Item3":8000
         },
         {
            "Item1":4,
            "Item2":"Искусно-Dunkelblau",
            "Item3":11000
         },
         {
            "Item1":5,
            "Item2":"Искусно-Orange",
            "Item3":11000
         },
         {
            "Item1":6,
            "Item2":"Запутанная геометрия",
            "Item3":2000
         },
         {
            "Item1":7,
            "Item2":"Формы",
            "Item3":10000
         },
         {
            "Item1":8,
            "Item2":"Саккубус",
            "Item3":3000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Normalspur Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Обтекаемый хромированный",
            "Item3":5000
         },
         {
            "Item1":1,
            "Item2":"Мощный хромированный",
            "Item3":7000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         }
      ]
   },
   "FQ2":{

   },
   "Dominator":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Titan Auspuff ",
            "Item3":9000
         }
      ],
      "1":[
         {
            "Item1":-1,
            "Item2":"Standardschwellen",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Maßgeschneiderte Schwellenwerte",
            "Item3":9000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Carbon-Motorhaube",
            "Item3":11000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Nein",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Spoiler Entenschwanz",
            "Item3":11000
         },
         {
            "Item1":1,
            "Item2":"Spoiler angehoben",
            "Item3":13000
         }
      ],
      "4":[
         {
            "Item1":-1,
            "Item2":"Standard Grill",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifischer Kühlergrill",
            "Item3":11000
         }
      ],
      "6":[
         {
            "Item1":-1,
            "Item2":"Standard-Dach",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Hinterer Abweiser",
            "Item3":7000
         },
         {
            "Item1":1,
            "Item2":"Carbon Dach",
            "Item3":9000
         },
         {
            "Item1":2,
            "Item2":"Abweiser und Dachkohle",
            "Item3":11000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Normalspur Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Frontteiler",
            "Item3":11000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Eingefärbte Heckstoßstange",
            "Item3":11000
         }
      ]
   },
   "Jackal":{
      "0":[
         {
            "Item1":-1,
            "Item2":"Standard Auspuff",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Doppelter Schalldämpfer",
            "Item3":9000
         }
      ],
      "1":[
         {
            "Item1":-1,
            "Item2":"Standardschwellen",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Maßgeschneiderte Schwellenwerte",
            "Item3":11000
         }
      ],
      "2":[
         {
            "Item1":-1,
            "Item2":"Standard Motorhaube",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Haube mit Lufteinlass",
            "Item3":9000
         },
         {
            "Item1":1,
            "Item2":"Haube mit Lufteinlass",
            "Item3":11000
         }
      ],
      "3":[
         {
            "Item1":-1,
            "Item2":"Nein",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Modifizierter Spoiler 1",
            "Item3":9000
         },
         {
            "Item1":1,
            "Item2":"Modifizierter Spoiler 2",
            "Item3":13000
         }
      ],
      "8":[
         {
            "Item1":-1,
            "Item2":"Normalspur Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Frontteiler",
            "Item3":11000
         }
      ],
      "9":[
         {
            "Item1":-1,
            "Item2":"Standard-Stoßstange",
            "Item3":5000
         },
         {
            "Item1":0,
            "Item2":"Kundenspezifische Heckstoßstange",
            "Item3":13000
         }
      ]
   }
}
`);
global.tuningWheels = JSON.parse(`
{
   "0":{
      "-1":2000,
      "0":27600,
      "1":39000,
      "2":42000,
      "3":39600,
      "4":41000,
      "5":42000,
      "6":41400,
      "7":36000,
      "8":36300,
      "9":39000,
      "10":45900,
      "11":36900,
      "12":32700,
      "13":39000,
      "14":33600,
      "15":39600,
      "16":28200,
      "17":45000,
      "18":39700,
      "19":45000,
      "20":39600,
      "21":42000,
      "22":49800,
      "23":36000,
      "24":39000
   },
   "1":{
      "-1":2000,
      "0":24000,
      "1":23000,
      "2":24950,
      "3":21000,
      "4":26500,
      "5":25800,
      "6":23700,
      "7":21000,
      "8":23000,
      "9":21000,
      "10":22000,
      "11":20950,
      "12":22000,
      "13":25000,
      "14":26000,
      "15":27000,
      "16":24000,
      "17":21000
   },
   "2":{
      "-1":2000,
      "0":18300,
      "1":19500,
      "2":18300,
      "3":20700,
      "4":21000,
      "5":21600,
      "6":22500,
      "7":24000,
      "8":25500,
      "9":25500,
      "10":20500,
      "11":18000,
      "12":18300,
      "13":21000,
      "14":24000
   },
   "3":{
      "-1":2000,
      "0":18000,
      "1":24000,
      "2":27000,
      "3":20300,
      "4":17100,
      "5":20100,
      "6":26100,
      "7":21600,
      "8":26400,
      "9":30000
   },
   "4":{
      "-1":2000,
      "0":18000,
      "1":19500,
      "2":18900,
      "3":13700,
      "4":14000,
      "5":17600,
      "6":18900,
      "7":15600,
      "8":16700,
      "9":12200,
      "10":18600,
      "11":19800,
      "12":14000,
      "13":18000,
      "14":14900,
      "15":18600,
      "16":15000
   },
   "5":{
      "-1":2000,
      "0":21600,
      "1":24000,
      "2":24600,
      "3":30600,
      "4":27300,
      "5":26100,
      "6":27600,
      "7":24300,
      "8":27600,
      "9":22500,
      "10":30900,
      "11":24300,
      "12":27600,
      "13":30000,
      "14":29700,
      "15":24600,
      "16":27300,
      "17":28500,
      "18":24600,
      "19":27900,
      "20":28800,
      "21":29100,
      "22":24600,
      "23":21900
   },
   "7":{
      "-1":2000,
      "0":36000,
      "1":31000,
      "2":24600,
      "3":26000,
      "4":34000,
      "5":26400,
      "6":26000,
      "7":32000,
      "8":26000,
      "9":30000,
      "10":38000,
      "11":35300,
      "12":42300,
      "13":40300,
      "14":45300,
      "15":48030,
      "16":46300,
      "17":48300,
      "18":54000,
      "19":41300
   }
}
`);
}