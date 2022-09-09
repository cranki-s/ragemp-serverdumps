{
/* --------------------------------------------------------------------------------
 * puertas.js
 *
 * Autor: Kenshin
 *
 * Descripción: Sistema de puertas (cliente)
 *
 * -------------------------------------------------------------------------------- */
// const doors = [
//     // Banks
//     { id: 0, name: 'Pacific Standard Bank Main Doors', hash: 110411286, locked: false, position: new mp.Vector3(232.6054, 214.1584, 106.4049) },   // Right
//     { id: 1, name: 'Pacific Standard Bank Main Doors', hash: 110411286, locked: false, position: new mp.Vector3(231.5123, 216.5177, 106.4049) },   // Left
//     { id: 2, name: 'Pacific Standard Bank Main Doors', hash: 110411286, locked: false, position: new mp.Vector3(260.6432, 203.2052, 106.4049) },   // Right
//     { id: 3, name: 'Pacific Standard Bank Main Doors', hash: 110411286, locked: false, position: new mp.Vector3(258.2022, 204.1005, 106.4049) },   // Left
//     { id: 4, name: 'Pacific Standard Bank Door To Upstair', hash: 1956494919, locked: false, position: new mp.Vector3(237.7704, 227.87, 106.426) },
//     { id: 5, name: 'Pacific Standard Bank Upstair Door', hash: 1956494919, locked: false, position: new mp.Vector3(236.5488, 228.3147, 110.4328) },
//     { id: 6, name: 'Pacific Standard Bank Back To Hall Doors', hash: 110411286, locked: false, position: new mp.Vector3(259.9831, 215.2468, 106.4049) },   // Right
//     { id: 7, name: 'Pacific Standard Bank Back To Hall Doors', hash: 110411286, locked: false, position: new mp.Vector3(259.0879, 212.8062, 106.4049) },   // Left
//     { id: 8, name: 'Pacific Standard Bank Upstair Door To Offices', hash: 1956494919, locked: false, position: new mp.Vector3(256.6172, 206.1522, 110.4328) },
//     { id: 9, name: 'Pacific Standard Bank Big Office Door', hash: 964838196, locked: false, position: new mp.Vector3(260.8579, 210.4453, 110.4328) },
//     { id: 10, name: 'Pacific Standard Bank Small Office Door', hash: 964838196, locked: false, position: new mp.Vector3(262.5366, 215.0576, 110.4328) },

//     { id: 13, name: 'Blaine County Savings Bank Paleto', hash: mp.game.gameplay.getHashKey("v_ilev_bank4door02"), locked: false, position: new mp.Vector3(-111.48, 6463.94, 31.985) },   // Right
//     { id: 14, name: 'Blaine County Savings Bank Paleto', hash: mp.game.gameplay.getHashKey("v_ilev_bank4door01"), locked: false, position: new mp.Vector3(-109.65, 6462.11, 31.985) },   // Left
//     { id: 15, name: 'Fleeca Banham Canyon', hash: mp.game.gameplay.getHashKey("v_ilev_genbankdoor1"), locked: false, position: new mp.Vector3(-2965.821, 481.63, 16.048) },   // Right
//     { id: 16, name: 'Fleeca Banham Canyon', hash: mp.game.gameplay.getHashKey("v_ilev_genbankdoor2"), locked: false, position: new mp.Vector3(-2965.71, 484.219, 16.048) },   // Left
//     { id: 17, name: 'Fleeca Ruta 68', hash: mp.game.gameplay.getHashKey("v_ilev_genbankdoor1"), locked: false, position: new mp.Vector3(1176.49, 2703.61, 38.44) },
//     { id: 18, name: 'Fleeca Ruta 68', hash: mp.game.gameplay.getHashKey("v_ilev_genbankdoor2"), locked: false, position: new mp.Vector3(1173.9, 2703.61, 38.44) },
//     { id: 19, name: 'Fleeca Grapeseed', hash: mp.game.gameplay.getHashKey("v_ilev_genbankdoor1"), locked: false, position: new mp.Vector3(1656.25, 4852.24, 42.35) },   // Right
//     { id: 20, name: 'Fleeca Grapeseed', hash: mp.game.gameplay.getHashKey("v_ilev_genbankdoor2"), locked: false, position: new mp.Vector3(1656.57, 4849.66, 42.35) },   // Left
//     { id: 21, name: 'Fleeca Del Perro', hash: mp.game.gameplay.getHashKey("v_ilev_genbankdoor1"), locked: false, position: new mp.Vector3(-1215.39, -328.52, 38.13) },
//     { id: 22, name: 'Fleeca Del Perro', hash: mp.game.gameplay.getHashKey("v_ilev_genbankdoor2"), locked: false, position: new mp.Vector3(-1213.07, -327.35, 38.13) },
//     { id: 23, name: 'Fleeca Legion', hash: mp.game.gameplay.getHashKey("v_ilev_genbankdoor1"), locked: false, position: new mp.Vector3(149.63, -1037.23, 29.72) },
//     { id: 24, name: 'Fleeca Legion', hash: mp.game.gameplay.getHashKey("v_ilev_genbankdoor2"), locked: false, position: new mp.Vector3(152.06, -1038.12, 29.72) },
//     { id: 23, name: 'Fleeca Alta', hash: mp.game.gameplay.getHashKey("v_ilev_genbankdoor1"), locked: false, position: new mp.Vector3(313.96, -275.6, 54.52) },
//     { id: 24, name: 'Fleeca Alta', hash: mp.game.gameplay.getHashKey("v_ilev_genbankdoor2"), locked: false, position: new mp.Vector3(316.39, -276.49, 54.52) },
//     { id: 25, name: 'Fleeca Burro', hash: mp.game.gameplay.getHashKey("v_ilev_genbankdoor1"), locked: false, position: new mp.Vector3(-348.81, -47.26, 49.39) },
//     { id: 26, name: 'Fleeca Burro', hash: mp.game.gameplay.getHashKey("v_ilev_genbankdoor2"), locked: false, position: new mp.Vector3(-351.26, -46.41, 49.39) },
//     { id: 27, name: 'Mazebank Del Perro', hash: mp.game.gameplay.getHashKey("v_ilev_genbankdoor1"), locked: false, position: new mp.Vector3(-348.81, -47.26, 49.39) },
//     { id: 28, name: 'Mazebank Del Perro', hash: mp.game.gameplay.getHashKey("v_ilev_genbankdoor2"), locked: false, position: new mp.Vector3(-351.26, -46.41, 49.39) },

//     // Shops      
//     { id: 100, name: 'Discount Store South Enter Door', hash: -1148826190, locked: false, position: new mp.Vector3(82.38156, -1390.476, 29.52609) },   // Right
//     { id: 101, name: 'Discount Store South Enter Door', hash: 868499217, locked: false, position: new mp.Vector3(82.38156, -1390.752, 29.52609) },   // Left
//     { id: 110, name: 'Los Santos Customs Popular Street Door', hash: 270330101, locked: false, position: new mp.Vector3(723.116, -1088.831, 23.23201) },
//     { id: 111, name: 'Los Santos Customs Carcer Way Door', hash: -550347177, locked: false, position: new mp.Vector3(-356.0905, -134.7714, 40.01295) },
//     { id: 111, name: 'Los Santos Customs Greenwich Parkway Door', hash: -550347177, locked: false, position: new mp.Vector3(-1145.898, -1991.144, 14.18357) },
//     { id: 113, name: 'Los Santos Customs Route 68 Doors', hash: -822900180, locked: false, position: new mp.Vector3(1174.656, 2644.159, 40.50673) },    // Right
//     { id: 114, name: 'Los Santos Customs Route 68 Doors', hash: -822900180, locked: false, position: new mp.Vector3(1182.307, 2644.166, 40.50784) },    // Left
//     { id: 115, name: 'Los Santos Customs Route 68 Office Door', hash: 1335311341, locked: false, position: new mp.Vector3(1187.202, 2644.95, 38.55176) },
//     { id: 116, name: 'Los Santos Customs Route 68 Office Door', hash: 1544229216, locked: false, position: new mp.Vector3(1182.646, 2641.182, 39.31031) },
//     //{id: 117, name: 'Beekers Garage Paleto Bay Doors',                     hash: -822900180,   locked: false, position: new mp.Vector3(114.3135, 6623.233, 32.67305)},    // Right Quitado por Ticket
//     //{id: 118, name: 'Beekers Garage Paleto Bay Doors',                     hash: -822900180,   locked: false, position: new mp.Vector3(108.8502, 6617.877, 32.67305)},    // Left Quitado por Ticket
//     { id: 119, name: 'Beekers Garage Paleto Bay Office Door', hash: 1335311341, locked: false, position: new mp.Vector3(105.1518, 6614.655, 32.58521) },
//     { id: 120, name: 'Beekers Garage Paleto Bay Interior Door', hash: 1544229216, locked: false, position: new mp.Vector3(105.7772, 6620.532, 33.34266) },
//     { id: 121, name: 'Ammu Nation Vespucci Boulevard Doors', hash: -8873588, locked: false, position: new mp.Vector3(842.7685, -1024.539, 28.34478) },   // Right
//     { id: 122, name: 'Ammu Nation Vespucci Boulevard Doors', hash: 97297972, locked: false, position: new mp.Vector3(845.3694, -1024.539, 28.34478) },   // Left
//     { id: 123, name: 'Ammu Nation Lindsay Circus Doors', hash: -8873588, locked: false, position: new mp.Vector3(-662.6415, -944.3256, 21.97915) },  // Right
//     { id: 124, name: 'Ammu Nation Lindsay Circus Doors', hash: 97297972, locked: false, position: new mp.Vector3(-665.2424, -944.3256, 21.97915) },  // Left
//     { id: 125, name: 'Ammu Nation Popular Street Doors', hash: -8873588, locked: false, position: new mp.Vector3(810.5769, -2148.27, 29.76892) },    // Right
//     { id: 126, name: 'Ammu Nation Popular Street Doors', hash: 97297972, locked: false, position: new mp.Vector3(813.1779, -2148.27, 29.76892) },     // Left
//     { id: 128, name: 'Ammu Nation Pillbox Doors', hash: -8873588, locked: false, position: new mp.Vector3(18.572, -1115.495, 29.94694) },    // Right
//     { id: 129, name: 'Ammu Nation Pillbox Doors', hash: 97297972, locked: false, position: new mp.Vector3(16.12787, -1114.606, 29.94694) },     // Left
//     { id: 130, name: 'Ammu Nation Pillbox Shotrange Doors', hash: 452874391, locked: false, position: new mp.Vector3(6.81789, -1098.209, 29.94685) },
//     { id: 131, name: 'Ammu Nation Vinewood Plaza Doors', hash: -8873588, locked: false, position: new mp.Vector3(243.8379, -46.52324, 70.09098) },   // Right
//     { id: 132, name: 'Ammu Nation Vinewood Plaza Doors', hash: 97297972, locked: false, position: new mp.Vector3(244.7275, -44.07911, 70.09098) },   // Left
//     { id: 133, name: 'Ammu Nation Del Perro', hash: mp.game.gameplay.getHashKey("v_ilev_gc_door04"), locked: false, position: new mp.Vector3(-1313.826, -389.1259, 36.84573) },   // Right
//     { id: 134, name: 'Ammu Nation Del Perro', hash: mp.game.gameplay.getHashKey("v_ilev_gc_door03"), locked: false, position: new mp.Vector3(-1314.465, -391.6472, 36.84573) },   // Left
//     { id: 135, name: 'Ammu Nation Montañas Tataviam', hash: mp.game.gameplay.getHashKey("v_ilev_gc_door04"), locked: false, position: new mp.Vector3(2570.905, 303.3556, 108.8848) },   // Right
//     { id: 136, name: 'Ammu Nation Montañas Tataviam', hash: mp.game.gameplay.getHashKey("v_ilev_gc_door03"), locked: false, position: new mp.Vector3(2568.304, 303.3556, 108.8848) },   // Left
//     { id: 137, name: 'Ammu Nation Sandy Shore', hash: mp.game.gameplay.getHashKey("v_ilev_gc_door04"), locked: false, position: new mp.Vector3(1698.176, 3751.506, 34.85526) },   // Right
//     { id: 138, name: 'Ammu Nation Sandy Shore', hash: mp.game.gameplay.getHashKey("v_ilev_gc_door03"), locked: false, position: new mp.Vector3(1699.937, 3753.42, 34.85526) },   // Left
//     { id: 139, name: 'Ammu Nation Río Zancudo', hash: mp.game.gameplay.getHashKey("v_ilev_gc_door04"), locked: false, position: new mp.Vector3(-1114.009, 2689.77, 18.70407) },   // Right
//     { id: 140, name: 'Ammu Nation Río Zancudo', hash: mp.game.gameplay.getHashKey("v_ilev_gc_door03"), locked: false, position: new mp.Vector3(-1112.071, 2691.505, 18.70407) },   // Left
//     { id: 141, name: 'Ammu Nation Chumash', hash: mp.game.gameplay.getHashKey("v_ilev_gc_door04"), locked: false, position: new mp.Vector3(-3164.845, 1081.392, 20.98866) },   // Right
//     { id: 142, name: 'Ammu Nation Chumash', hash: mp.game.gameplay.getHashKey("v_ilev_gc_door03"), locked: false, position: new mp.Vector3(-3163.812, 1083.778, 20.98866) },   // Left
//     { id: 143, name: 'Ammu Nation Paleto Bay', hash: mp.game.gameplay.getHashKey("v_ilev_gc_door04"), locked: false, position: new mp.Vector3(-326.1122, 6075.27, 31.6047) },   // Right
//     { id: 144, name: 'Ammu Nation Paleto Bay', hash: mp.game.gameplay.getHashKey("v_ilev_gc_door03"), locked: false, position: new mp.Vector3(-324.2731, 6077.109, 31.6047) },   // Left


//     { id: 150, name: 'Ponsonbys Portola Drive Door', hash: -1922281023, locked: false, position: new mp.Vector3(-715.6154, -157.2561, 37.67493) },  // Right
//     { id: 151, name: 'Ponsonbys Portola Drive Door', hash: -1922281023, locked: false, position: new mp.Vector3(-716.6755, -155.42, 37.67493) },    // Left
//     { id: 152, name: 'Ponsonbys Portola Drive Door', hash: -1922281023, locked: false, position: new mp.Vector3(-1456.201, -233.3682, 50.05648) },  // Right
//     { id: 153, name: 'Ponsonbys Portola Drive Door', hash: -1922281023, locked: false, position: new mp.Vector3(-1454.782, -231.7927, 50.05649) },  // Left
//     { id: 154, name: 'Ponsonbys Rockford Plaza Door', hash: -1922281023, locked: false, position: new mp.Vector3(-156.439, -304.4294, 39.99308) },   // Right
//     { id: 155, name: 'Ponsonbys Rockford Plaza Door', hash: -1922281023, locked: false, position: new mp.Vector3(-157.1293, -306.4341, 39.99308) },  // Left
//     { id: 156, name: 'Sub Urban Prosperity Street Promenade Door', hash: 1780022985, locked: false, position: new mp.Vector3(-1201.435, -776.8566, 17.99184) },
//     { id: 157, name: 'Sub Urban Hawick Avenue Door', hash: 1780022985, locked: false, position: new mp.Vector3(127.8201, -211.8274, 55.22751) },
//     { id: 158, name: 'Sub Urban Route 68 Door', hash: 1780022985, locked: false, position: new mp.Vector3(617.2458, 2751.022, 42.75777) },
//     { id: 159, name: 'Sub Urban Chumash Plaza Door', hash: 1780022985, locked: false, position: new mp.Vector3(-3167.75, 1055.536, 21.53288) },
//     { id: 160, name: 'Robs Liquor Route 1 Main Enter Door', hash: -1212951353, locked: false, position: new mp.Vector3(-2973.535, 390.1414, 15.18735) },
//     { id: 161, name: 'Robs Liquor Route 1 Personnal Door', hash: 1173348778, locked: false, position: new mp.Vector3(-2965.648, 386.7928, 15.18735) },
//     { id: 162, name: 'Robs Liquor Route 1 Back Door', hash: 1173348778, locked: false, position: new mp.Vector3(-2961.749, 390.2573, 15.19322) },
//     { id: 163, name: 'Robs Liquor Prosperity Street Main Enter Door', hash: -1212951353, locked: false, position: new mp.Vector3(-1490.411, -383.8453, 40.30745) },
//     { id: 164, name: 'Robs Liquor Prosperity Street Personnal Door', hash: 1173348778, locked: false, position: new mp.Vector3(-1482.679, -380.153, 40.30745) },
//     { id: 165, name: 'Robs Liquor Prosperity Street Back Door', hash: 1173348778, locked: false, position: new mp.Vector3(-1482.693, -374.9365, 40.31332) },
//     { id: 166, name: 'Robs Liquor San Andreas Avenue Main Enter Door', hash: -1212951353, locked: false, position: new mp.Vector3(-1226.894, -903.1218, 12.47039) },
//     { id: 167, name: 'Robs Liquor San Andreas Avenue Personnal Door', hash: 1173348778, locked: false, position: new mp.Vector3(-1224.755, -911.4182, 12.47039) },
//     { id: 168, name: 'Robs Liquor San Andreas Avenue Back Door', hash: 1173348778, locked: false, position: new mp.Vector3(-1219.633, -912.406, 12.47626) },
//     { id: 169, name: 'Robs Liquor El Rancho Boulevard Main Enter Door', hash: -1212951353, locked: false, position: new mp.Vector3(1141.038, -980.3225, 46.55986) },
//     { id: 170, name: 'Robs Liquor El Rancho Boulevard Personnal Door', hash: 1173348778, locked: false, position: new mp.Vector3(1132.645, -978.6059, 46.55986) },
//     { id: 171, name: 'Robs Liquor El Rancho Boulevard Back Door', hash: 1173348778, locked: false, position: new mp.Vector3(129.51, -982.7756, 46.56573) },
//     { id: 180, name: 'Bob Mulét Barber Shop Door', hash: 145369505, locked: false, position: new mp.Vector3(-822.4442, -188.3924, 37.81895) },  // Right
//     { id: 181, name: 'Bob Mulét Barber Shop Door', hash: -1663512092, locked: false, position: new mp.Vector3(-823.2001, -187.0831, 37.81895) },  // Left
//     { id: 182, name: 'Hair on Hawick Barber Shop Door', hash: -1844444717, locked: false, position: new mp.Vector3(-29.86917, -148.1571, 57.22648) },
//     { id: 183, name: 'OSheas Barber Shop Door', hash: -1844444717, locked: false, position: new mp.Vector3(1932.952, 3725.154, 32.9944) },
//     { id: 190, name: 'Premium Deluxe Motorsport Parking Doors', hash: 1417577297, locked: false, position: new mp.Vector3(-37.33113, -1108.873, 26.7198) },   // Right
//     { id: 191, name: 'Premium Deluxe Motorsport Parking Doors', hash: 2059227086, locked: false, position: new mp.Vector3(-39.13366, -1108.218, 26.7198) },   // Left
//     { id: 192, name: 'Premium Deluxe Motorsport Main Doors', hash: 1417577297, locked: false, position: new mp.Vector3(-60.54582, -1094.749, 26.88872) },  // Right
//     { id: 193, name: 'Premium Deluxe Motorsport Main Doors', hash: 2059227086, locked: false, position: new mp.Vector3(-59.89302, -1092.952, 26.88362) },  // Left
//     { id: 194, name: 'Premium Deluxe Motorsport Right Office Door', hash: -2051651622, locked: false, position: new mp.Vector3(-33.80989, -1107.579, 26.57225) },
//     { id: 195, name: 'Premium Deluxe Motorsport Left Office Door', hash: -2051651622, locked: false, position: new mp.Vector3(-31.72353, -1101.847, 26.57225) },

//     // Houses   v_ilev_trev_doorfront, v_ilev_trev_doorfront, 0, 3056179003
//     { id: 300, name: 'Franklin House Enter Door', hash: 520341586, locked: true, position: new mp.Vector3(-14.86892, -1441.182, 31.19323) },
//     { id: 301, name: 'Franklin House Garage Door', hash: 703855057, locked: true, position: new mp.Vector3(-25.2784, -1431.061, 30.83955) },
//     { id: 302, name: 'Trevor House Playa Door', hash: mp.game.gameplay.getHashKey("v_ilev_trev_doorfront"), locked: true, position: new mp.Vector3(-1149.709, -1521.088, 10.78267) },
//     { id: 303, name: 'Puerta clubhouse', hash: mp.game.gameplay.getHashKey("v_ilev_lostdoor"), locked: true, position: new mp.Vector3(981.1506, -103.2552, 74.99358) },
//     { id: 304, name: 'Puerta casa franklin rockford plaza', hash: mp.game.gameplay.getHashKey("v_ilev_janitor_frontdoor"), locked: true, position: new mp.Vector3(-107.5373, -9.018098, 70.67085) },
//     { id: 305, name: 'Madrazo (Fuente blanca)', hash: mp.game.gameplay.getHashKey("v_ilev_ra_door1_l"), locked: true, position: new mp.Vector3(1390.666, 1131.117, 114.4808) },
//     { id: 306, name: 'Madrazo (Fuente blanca)', hash: mp.game.gameplay.getHashKey("v_ilev_ra_door1_r"), locked: true, position: new mp.Vector3(1390.666, 1133.317, 114.4808) },
//     { id: 307, name: 'Madrazo (Fuente blanca)', hash: mp.game.gameplay.getHashKey("v_ilev_ra_door4r"), locked: true, position: new mp.Vector3(1395.92, 1140.705, 114.7902) },
//     { id: 308, name: 'Madrazo (Fuente blanca)', hash: mp.game.gameplay.getHashKey("v_ilev_ra_door4l"), locked: true, position: new mp.Vector3(1395.92, 1142.904, 114.7902) },
//     { id: 309, name: 'Madrazo (Fuente blanca)', hash: mp.game.gameplay.getHashKey("v_ilev_ra_door1_l"), locked: true, position: new mp.Vector3(1390.411, 1161.241, 114.4873) },
//     { id: 310, name: 'Madrazo (Fuente blanca)', hash: mp.game.gameplay.getHashKey("v_ilev_ra_door1_r"), locked: true, position: new mp.Vector3(1390.424, 1163.438, 114.4873) },
//     { id: 311, name: 'Madrazo (Fuente blanca)', hash: mp.game.gameplay.getHashKey("v_ilev_ra_door1_r"), locked: true, position: new mp.Vector3(1408.166, 1165.834, 114.4873) },
//     { id: 312, name: 'Madrazo (Fuente blanca)', hash: mp.game.gameplay.getHashKey("v_ilev_ra_door1_l"), locked: true, position: new mp.Vector3(1408.171, 1163.633, 114.4873) },
//     { id: 313, name: 'Madrazo (Fuente blanca)', hash: mp.game.gameplay.getHashKey("v_ilev_ra_door1_r"), locked: true, position: new mp.Vector3(1408.167, 1161.155, 114.4873) },
//     { id: 314, name: 'Madrazo (Fuente blanca)', hash: mp.game.gameplay.getHashKey("v_ilev_ra_door1_l"), locked: true, position: new mp.Vector3(1408.157, 1158.956, 114.4873) },
//     { id: 315, name: 'Madrazo (Fuente blanca)', hash: mp.game.gameplay.getHashKey("v_ilev_ra_door1_r"), locked: true, position: new mp.Vector3(1409.292, 1150.654, 114.4869) },
//     { id: 316, name: 'Madrazo (Fuente blanca)', hash: mp.game.gameplay.getHashKey("v_ilev_ra_door1_l"), locked: true, position: new mp.Vector3(1409.292, 1148.454, 114.4869) },
//     { id: 317, name: 'Madrazo (Fuente blanca)', hash: mp.game.gameplay.getHashKey("v_ilev_ra_door1_r"), locked: true, position: new mp.Vector3(1409.292, 1148.454, 114.4869) },
//     { id: 318, name: 'Madrazo (Fuente blanca)', hash: mp.game.gameplay.getHashKey("v_ilev_ra_door1_l"), locked: true, position: new mp.Vector3(1409.292, 1146.254, 114.4869) },
//     { id: 319, name: 'Madrazo (Fuente blanca)', hash: mp.game.gameplay.getHashKey("v_ilev_ra_door1_r"), locked: true, position: new mp.Vector3(1409.292, 1146.254, 114.4869) },
//     { id: 320, name: 'Madrazo (Fuente blanca)', hash: mp.game.gameplay.getHashKey("v_ilev_ra_door1_l"), locked: true, position: new mp.Vector3(1409.292, 1144.054, 114.4869) },
//     { id: 321, name: 'Madrazo (Fuente blanca)', hash: mp.game.gameplay.getHashKey("v_ilev_ra_door1_r"), locked: true, position: new mp.Vector3(1399.393, 1128.314, 114.4836) },
//     { id: 322, name: 'Madrazo (Fuente blanca)', hash: mp.game.gameplay.getHashKey("v_ilev_ra_door1_l"), locked: true, position: new mp.Vector3(1401.59, 1128.314, 114.4836) },
//     { id: 323, name: 'Madrazo (Fuente blanca)', hash: mp.game.gameplay.getHashKey("v_ilev_ra_door4r"), locked: true, position: new mp.Vector3(1407.547, 1128.329, 114.4855) },

//     // Others
//     { id: 500, name: 'Vanilla Unicorn Main Enter Door', hash: -1116041313, locked: true, position: new mp.Vector3(127.9552, -1298.503, 29.41962) },
//     { id: 501, name: 'Vanilla Unicorn Back Enter Door', hash: 668467214, locked: true, position: new mp.Vector3(96.09197, -1284.854, 29.43878) },
//     { id: 502, name: 'Vanilla Unicorn Office Door', hash: -626684119, locked: true, position: new mp.Vector3(99.08321, -1293.701, 29.41868) },
//     { id: 503, name: 'Vanilla Unicorn Dress Door', hash: -495720969, locked: true, position: new mp.Vector3(113.9822, -1297.43, 29.41868) },
//     { id: 504, name: 'Vanilla Unicorn Private Rooms Door', hash: -1881825907, locked: true, position: new mp.Vector3(116.0046, -1294.692, 29.41947) },
//     { id: 505, name: 'Matadero (Cerca del puerto)', hash: mp.game.gameplay.getHashKey("prop_abat_slide"), locked: false, position: new mp.Vector3(962.9084, -2105.813, 32.52716) },
//     { id: 506, name: 'Matadero (Cerca del puerto)', hash: mp.game.gameplay.getHashKey("v_ilev_abbmaindoor"), locked: false, position: new mp.Vector3(962.0066, -2183.816, 31.06194) },
//     { id: 507, name: 'Matadero (Cerca del puerto)', hash: mp.game.gameplay.getHashKey("v_ilev_abbmaindoor2"), locked: false, position: new mp.Vector3(961.705, -2187.069, 31.06195) },

//     { id: 508, name: 'Aeropuerto', hash: mp.game.gameplay.getHashKey("prop_nclink_02gate6_r"), locked: true, position: new mp.Vector3(-967.4473, -2778.495, 14.409) },
//     { id: 509, name: 'Aeropuerto', hash: mp.game.gameplay.getHashKey("prop_nclink_02gate6_l"), locked: true, position: new mp.Vector3(-974.5734, -2774.381, 14.4099) },
//     { id: 510, name: 'Aeropuerto', hash: mp.game.gameplay.getHashKey("prop_nclink_02gate6_r"), locked: true, position: new mp.Vector3(-971.1018, -2776.385, 14.409) },
//     { id: 511, name: 'Aeropuerto', hash: mp.game.gameplay.getHashKey("prop_nclink_02gate6_l"), locked: true, position: new mp.Vector3(-970.9188, -2776.491, 14.409) },
//     { id: 512, name: 'Aeropuerto', hash: mp.game.gameplay.getHashKey("prop_nclink_02gate6_r"), locked: true, position: new mp.Vector3(-935.2114, -2767.397, 14.3882) },
//     { id: 513, name: 'Aeropuerto', hash: mp.game.gameplay.getHashKey("prop_nclink_02gate6_l"), locked: true, position: new mp.Vector3(-933.1581, -2763.955, 14.3882) },
//     { id: 514, name: 'Aeropuerto', hash: mp.game.gameplay.getHashKey("prop_nclink_02gate6_r"), locked: true, position: new mp.Vector3(-933.0535, -2763.779, 14.3882) },
//     { id: 515, name: 'Aeropuerto', hash: mp.game.gameplay.getHashKey("prop_nclink_02gate6_l"), locked: true, position: new mp.Vector3(-931.0002, -2760.337, 14.3882) },
//     { id: 516, name: 'Aeropuerto', hash: mp.game.gameplay.getHashKey("prop_nclink_02gate6_r"), locked: true, position: new mp.Vector3(-773.2438, -2842.677, 14.2715) },
//     { id: 517, name: 'Aeropuerto', hash: mp.game.gameplay.getHashKey("prop_nclink_02gate6_l"), locked: true, position: new mp.Vector3(-769.7721, -2844.682, 14.2715) },
//     { id: 518, name: 'Aeropuerto', hash: mp.game.gameplay.getHashKey("prop_nclink_02gate6_r"), locked: true, position: new mp.Vector3(-769.6071, -2844.777, 14.2715) },
//     { id: 519, name: 'Aeropuerto', hash: mp.game.gameplay.getHashKey("prop_nclink_02gate6_l"), locked: true, position: new mp.Vector3(-766.1354, -2846.781, 14.2715) },
//     { id: 520, name: 'Aeropuerto', hash: mp.game.gameplay.getHashKey("prop_nclink_09gate1"), locked: true, position: new mp.Vector3(-828.9456, -2964.304, 14.2758) },
//     { id: 521, name: 'Aeropuerto', hash: mp.game.gameplay.getHashKey("prop_nclink_09gate1"), locked: true, position: new mp.Vector3(-907.7999, -3100.874, 14.2808) },
//     { id: 522, name: 'Aeropuerto', hash: mp.game.gameplay.getHashKey("prop_nclink_09gate1"), locked: true, position: new mp.Vector3(-833.4395, -3186.709, 14.267) },
//     { id: 523, name: 'Aeropuerto', hash: mp.game.gameplay.getHashKey("prop_nclink_09gate1"), locked: true, position: new mp.Vector3(-830.0544, -3391.163, 14.1972) },
//     { id: 524, name: 'Aeropuerto', hash: mp.game.gameplay.getHashKey("prop_nclink_09gate1"), locked: true, position: new mp.Vector3(-913.0834, -3534.97, 14.1924) },
//     { id: 525, name: 'Aeropuerto', hash: mp.game.gameplay.getHashKey("prop_nclink_09gate1"), locked: true, position: new mp.Vector3(-971.6149, -3549.152, 14.2727) },
//     { id: 526, name: 'Aeropuerto', hash: mp.game.gameplay.getHashKey("prop_nclink_09gate1"), locked: true, position: new mp.Vector3(-1017.692, -3563.217, 14.2767) },
//     { id: 527, name: 'Aeropuerto', hash: mp.game.gameplay.getHashKey("prop_nclink_09gate1"), locked: true, position: new mp.Vector3(-1146.831, -3546.638, 14.2595) },
//     { id: 528, name: 'Aeropuerto', hash: mp.game.gameplay.getHashKey("prop_nclink_09gate1"), locked: true, position: new mp.Vector3(-1260.897, -3480.764, 14.1721) },
//     { id: 529, name: 'Aeropuerto', hash: mp.game.gameplay.getHashKey("prop_nclink_09gate1"), locked: true, position: new mp.Vector3(-1351.133, -3404.162, 14.1721) },
//     { id: 530, name: 'Aeropuerto', hash: mp.game.gameplay.getHashKey("prop_nclink_09gate1"), locked: true, position: new mp.Vector3(-1409.507, -3370.461, 14.2068) },
//     { id: 531, name: 'Aeropuerto', hash: mp.game.gameplay.getHashKey("prop_nclink_09gate1"), locked: true, position: new mp.Vector3(-1831.804, -3224.966, 14.3119) },
//     { id: 532, name: 'Aeropuerto', hash: mp.game.gameplay.getHashKey("prop_nclink_09gate1"), locked: true, position: new mp.Vector3(-1942.289, -3161.19, 14.2981) },
//     { id: 533, name: 'Aeropuerto', hash: mp.game.gameplay.getHashKey("prop_nclink_09gate1"), locked: true, position: new mp.Vector3(-1927.563, -3076.269, 14.4569) },
//     { id: 534, name: 'Aeropuerto', hash: mp.game.gameplay.getHashKey("prop_nclink_09gate1"), locked: true, position: new mp.Vector3(-1951.696, -3003.846, 14.4418) },
//     { id: 535, name: 'Aeropuerto', hash: mp.game.gameplay.getHashKey("prop_nclink_09gate1"), locked: true, position: new mp.Vector3(-1836.875, -2804.969, 14.4557) },
//     { id: 536, name: 'Aeropuerto', hash: mp.game.gameplay.getHashKey("prop_nclink_09gate1"), locked: true, position: new mp.Vector3(-1802.692, -2745.761, 14.448) },
//     { id: 537, name: 'Aeropuerto', hash: mp.game.gameplay.getHashKey("prop_acgate_01"), locked: true, position: new mp.Vector3(-1099.531, -2020.803, 12.1745) },
//     { id: 538, name: 'Aeropuerto', hash: mp.game.gameplay.getHashKey("prop_acgate_01"), locked: true, position: new mp.Vector3(-994.4996, -2341.648, 12.9448) },
//     { id: 539, name: 'Aeropuerto', hash: mp.game.gameplay.getHashKey("prop_acgate_01"), locked: true, position: new mp.Vector3(-984.0709, -2348.4, 12.9448) },
//     { id: 540, name: 'Lester', hash: mp.game.gameplay.getHashKey("v_ilev_lester_doorront"), locked: true, position: new mp.Vector3(-1099.531, -2020.803, 12.1745) },
//     { id: 541, name: 'Lester', hash: mp.game.gameplay.getHashKey("v_ilev_tort_door"), locked: true, position: new mp.Vector3(-994.4996, -2341.648, 12.9448) },
//     { id: 542, name: 'Lester', hash: mp.game.gameplay.getHashKey("v_ilev_lester_doorront"), locked: true, position: new mp.Vector3(1273.82, -1720.7, 54.92) },
//     { id: 543, name: 'Garaje', hash: mp.game.gameplay.getHashKey("prop_ch3_01_trlrdoor_l"), locked: true, position: new mp.Vector3(2333.23, 2574.97, 47.03) },
//     { id: 544, name: 'Garaje', hash: mp.game.gameplay.getHashKey("prop_ch3_01_trlrdoor_r"), locked: true, position: new mp.Vector3(2329.65, 2576.64, 47.03) },

//     // Police   
//     { id: 1000, name: 'Mission Row Police Station Main Enter Doors', hash: 320433149, locked: true, position: new mp.Vector3(434.7479, -983.2151, 30.83926) },  // Right
//     { id: 1001, name: 'Mission Row Police Station Main Enter Doors', hash: -1215222675, locked: true, position: new mp.Vector3(434.7479, -980.6184, 30.83926) },  // Left
//     { id: 1002, name: 'Mission Row Police Station Back Enter Doors', hash: -2023754432, locked: true, position: new mp.Vector3(469.9679, -1014.452, 26.53623) },  // Right
//     { id: 1003, name: 'Mission Row Police Station Back Enter Doors', hash: -2023754432, locked: true, position: new mp.Vector3(467.3716, -1014.452, 26.53623) },  // Left

//     { id: 1004, name: 'Mission Row Police Station Back To Cells Door', hash: -1033001619, locked: true, position: new mp.Vector3(463.4782, -1003.538, 25.00599) },
//     { id: 1005, name: 'Mission Row Police Station Cell Door 1', hash: 631614199, locked: true, position: new mp.Vector3(461.8065, -994.4086, 25.06443) },
//     { id: 1006, name: 'Mission Row Police Station Cell Door 2', hash: 631614199, locked: true, position: new mp.Vector3(461.8065, -997.6583, 25.06443) },
//     { id: 1007, name: 'Mission Row Police Station Cell Door 3', hash: 631614199, locked: true, position: new mp.Vector3(461.8065, -1001.302, 25.06443) },
//     { id: 1008, name: 'Mission Row Police Station Door To Cells Door', hash: 631614199, locked: true, position: new mp.Vector3(464.5701, -992.6641, 25.06443) },
//     { id: 1009, name: 'Mission Row Police Station Captans Office Door', hash: -1320876379, locked: true, position: new mp.Vector3(446.5728, -980.0106, 30.8393) },
//     { id: 1010, name: 'Mission Row Police Station Armory Double Door', hash: 185711165, locked: true, position: new mp.Vector3(450.1041, -984.0915, 30.8393) },  // Right
//     { id: 1011, name: 'Mission Row Police Station Armory Double Door', hash: 185711165, locked: true, position: new mp.Vector3(450.1041, -981.4915, 30.8393) },  // Left

//     { id: 1012, name: 'Mission Row Police Station Armory Secure Door', hash: 749848321, locked: true, position: new mp.Vector3(453.0793, -983.1895, 30.83926) },
//     { id: 1013, name: 'Mission Row Police Station Locker Rooms Door', hash: 1557126584, locked: true, position: new mp.Vector3(450.1041, -985.7384, 30.8393) },
//     { id: 1014, name: 'Mission Row Police Station Locker Room 1 Door', hash: -2023754432, locked: true, position: new mp.Vector3(452.6248, -987.3626, 30.8393) },
//     { id: 1015, name: 'Mission Row Police Station Roof Access Door', hash: 749848321, locked: true, position: new mp.Vector3(461.2865, -985.3206, 30.83926) },
//     { id: 1016, name: 'Mission Row Police Station Roof Door', hash: -340230128, locked: true, position: new mp.Vector3(464.3613, -984.678, 43.83443) },
//     { id: 1017, name: 'Mission Row Police Station Cell And Briefing Doors', hash: 185711165, locked: true, position: new mp.Vector3(443.4078, -989.4454, 30.8393) },  // Right
//     { id: 1018, name: 'Mission Row Police Station Cell And Briefing Doors', hash: 185711165, locked: true, position: new mp.Vector3(446.0079, -989.4454, 30.8393) },  // Left
//     { id: 1019, name: 'Mission Row Police Station Briefing Doors', hash: -131296141, locked: true, position: new mp.Vector3(443.0298, -991.941, 30.8393) },   // Right
//     { id: 1020, name: 'Mission Row Police Station Briefing Doors', hash: -131296141, locked: true, position: new mp.Vector3(443.0298, -994.5412, 30.8393) },  // Left
//     { id: 1021, name: 'Mission Row Police Station Back Gate Door', hash: -1603817716, locked: true, position: new mp.Vector3(489.301, -1020.029, 28.078) },

//     // PUERTAS MODS NUEVOS
//     // gabz_mrpd_door_04
//     { id: 1, locked: true, door: [{pos: new mp.Vector3(440.5201, -977.6011, 30.82319), hash: -1406685646}], timer: 5000, distAper: 2, posAper: null, trabajos: [1], negocios: [], facciones: [], personajes: []},
//     // gabz_mrpd_door_05
//     { id: 2, locked: true, door: [{pos: [new mp.Vector3(440.5201, -986.2335, 30.82319)], hash: -96679321}], timer: 5000, distAper: 2, posAper: null, trabajos: [1], negocios: [], facciones: [], personajes: []},
//     // gabz_mrpd_reception_entrancedoor
//     { id: 3, locked: true, door: {pos: [new mp.Vector3(440.7392, -998.7462, 30.8153), new mp.Vector3(443.0618, -998.7462, 30.8153)], hash: [-1547307588, -1547307588]}, timer: 5000, distAper: 2, posAper: null, trabajos: [1], negocios: [], facciones: [], personajes: []},
//     { id: 4, locked: true, door: {pos: [new mp.Vector3(455.8862, -972.2543, 30.81531), new mp.Vector3(458.2087, -972.2543, 30.81531)], hash: [-1547307588, -1547307588]}, timer: 5000, distAper: 2, posAper: null, trabajos: [1], negocios: [], facciones: [], personajes: []},
//     // gabz_mrpd_door_03
//     { id: 5, locked: true, door: {pos: [new mp.Vector3(464.3086, -984.5284, 43.77124)], hash: [mp.game.gameplay.getHashKey("gabz_mrpd_door_03")]}, timer: 5000, distAper: 2, posAper: null, trabajos: [1], negocios: [], facciones: [], personajes: []},

//     { id: 6, locked: true, door: {pos: [new mp.Vector3(467.3686, -1014.406, 26.48382), new mp.Vector3(469.7743, -1014.406, 26.48382)], hash: [mp.game.gameplay.getHashKey("gabz_mrpd_door_03"), mp.game.gameplay.getHashKey("gabz_mrpd_door_03")]}, timer: 5000, distAper: 2, posAper: null, trabajos: [1], negocios: [], facciones: [], personajes: []},

//     { id: 7, locked: true, door: {pos: [new mp.Vector3(476.6157, -1008.875, 26.48005)], hash: [mp.game.gameplay.getHashKey("gabz_mrpd_cells_door")]}, timer: 5000, distAper: 2, posAper: null, trabajos: [1], negocios: [], facciones: [], personajes: []},
//     { id: 8, locked: true, door: {pos: [new mp.Vector3(464.1591, -974.6656, 26.3707)], hash: [mp.game.gameplay.getHashKey("gabz_mrpd_room13_parkingdoor")]}, timer: 5000, distAper: 2, posAper: null, trabajos: [1], negocios: [], facciones: [], personajes: []},
//     { id: 9, locked: true, door: {pos: [new mp.Vector3(464.1566, -997.5093, 26.3707)], hash: [mp.game.gameplay.getHashKey("gabz_mrpd_room13_parkingdoor")]}, timer: 5000, distAper: 2, posAper: null, trabajos: [1], negocios: [], facciones: [], personajes: []},
//     { id: 10, locked: true, door: {pos: [new mp.Vector3(431.4119, -1000.772, 26.69661)], hash: [mp.game.gameplay.getHashKey("gabz_mrpd_garage_door")]}, timer: 5000, distAper: 2, posAper: null, trabajos: [1], negocios: [], facciones: [], personajes: []},
//     { id: 11, locked: true, door: {pos: [new mp.Vector3(452.3005, -1000.772, 26.69661)], hash: [mp.game.gameplay.getHashKey("gabz_mrpd_garage_door")]}, timer: 5000, distAper: 2, posAper: null, trabajos: [1], negocios: [], facciones: [], personajes: []},
//     // Puerta armeria no tiene hash en el txt
//     { id: 12, locked: true, door: {pos: [new mp.Vector3(479.7507, -999.629, 30.78917)], hash: [mp.game.gameplay.getHashKey("gabz_mrpd_garage_door")]}, timer: 5000, distAper: 2, posAper: null, trabajos: [1], negocios: [], facciones: [], personajes: []},
    
//     // DAVIS
//     { id: 13, locked: true, door: {pos: [new mp.Vector3(356.7303, -1591.257, 29.44246), new mp.Vector3(358.711, -1592.919, 29.44246)], hash: [mp.game.gameplay.getHashKey("sc1_sd_door_hall"), mp.game.gameplay.getHashKey("sc1_sd_door_hall")]}, timer: 5000, distAper: 2, posAper: null, trabajos: [1], negocios: [], facciones: [], personajes: []},
//     { id: 14, locked: true, door: {pos: [new mp.Vector3(372.1991, -1585.902, 29.44176), new mp.Vector3(370.537, -1587.883, 29.44176)], hash: [mp.game.gameplay.getHashKey("sc1_sd_door_hall"), mp.game.gameplay.getHashKey("sc1_sd_door_hall")]}, timer: 5000, distAper: 2, posAper: null, trabajos: [1], negocios: [], facciones: [], personajes: []},
    
//     { id: 14, locked: true, door: {pos: [new mp.Vector3(349.4737, -1600.773, 29.6148)], hash: [mp.game.gameplay.getHashKey("sc1_sh_d_jail")]}, timer: 5000, distAper: 2, posAper: null, trabajos: [1], negocios: [], facciones: [], personajes: []},
//     { id: 14, locked: true, door: {pos: [new mp.Vector3(372.1991, -1585.902, 29.44176), new mp.Vector3(370.537, -1587.883, 29.44176)], hash: [mp.game.gameplay.getHashKey("sc1_sd_door_hall"), mp.game.gameplay.getHashKey("sc1_sd_door_hall")]}, timer: 5000, distAper: 2, posAper: null, trabajos: [1], negocios: [], facciones: [], personajes: []},


//     //ROCKFORD COMISARIA
//     //Acceso comisaria puerta principal
//     { id: 1026, hash: mp.game.gameplay.getHashKey("prompt_pd_enter_door_slide"), locked: true, position: [new mp.Vector3(-550.6035, -115.4399, 37.5114), new mp.Vector3(-553.0624, -116.4788, 37.5114)], trabajos: [2] },
//     { id: 1026, hash: mp.game.gameplay.getHashKey("prompt_pd_enter_door_slide"), locked: true, position: [new mp.Vector3(-550.6035, -115.4399, 37.5114), new mp.Vector3(-553.0624, -116.4788, 37.5114)], trabajos: [2] },
//     //Acceso celdas puerta principal
//     { id: 1026, hash: mp.game.gameplay.getHashKey("v_ilev_arm_secdoor"), locked: true, position: [new mp.Vector3(-556.127, -111.6793, 38.60493)], trabajos: [2] },
//     //Acceso celdas garaje
//     { id: 1026, hash: mp.game.gameplay.getHashKey("prompt_pd_detroit_door"), locked: true, position: [new mp.Vector3(-576.1089, -102.9607, 33.82674), new mp.Vector3(-577.0359, -100.7081, 33.82674)], trabajos: [2] },
//     { id: 1026, hash: mp.game.gameplay.getHashKey("prompt_pd_detroit_door"), locked: true, position: [new mp.Vector3(-576.1089, -102.9607, 33.82674), new mp.Vector3(-577.0359, -100.7081, 33.82674)], trabajos: [2] },
//     //Armeria
//     { id: 1026, hash: mp.game.gameplay.getHashKey("v_ilev_arm_secdoor"), locked: true, position: [new mp.Vector3(-596.4979, -101.3149, 33.86383)], trabajos: [2] },
//     //Garaje salida
//     { id: 1026, hash: mp.game.gameplay.getHashKey("prompt_pd_garage_door"), locked: true, position: [new mp.Vector3(-584.7936, -126.9438, 34.65879)], trabajos: [2] },
//     //Garaje entrada
//     { id: 1026, hash: mp.game.gameplay.getHashKey("prompt_pd_garage_door"), locked: true, position: [new mp.Vector3(-579.433, -124.668, 34.65651)], trabajos: [2] },
//     //Tornos 1
//     { id: 1026, hash: mp.game.gameplay.getHashKey("prompt_pd_entering_slide_enter"), locked: true, position: [new mp.Vector3(-553.139, -118.8661, 37.69427), new mp.Vector3(-552.3667, -118.5462, 37.69427)], trabajos: [2] },
//     { id: 1026, hash: mp.game.gameplay.getHashKey("prompt_pd_entering_slide_enter"), locked: true, position: [new mp.Vector3(-553.139, -118.8661, 37.69427), new mp.Vector3(-552.3667, -118.5462, 37.69427)], trabajos: [2] },
//     //Tornos 2
//     { id: 1026, hash: mp.game.gameplay.getHashKey("prompt_pd_entering_slide_enter"), locked: true, position: [new mp.Vector3(-550.5193, -117.7816, 37.69427), new mp.Vector3(-549.7469, -117.4617, 37.69427)], trabajos: [2] },
//     { id: 1026, hash: mp.game.gameplay.getHashKey("prompt_pd_entering_slide_enter"), locked: true, position: [new mp.Vector3(-550.5193, -117.7816, 37.69427), new mp.Vector3(-549.7469, -117.4617, 37.69427)], trabajos: [2] },
//     //Tornos recepción
//     { id: 1026, hash: mp.game.gameplay.getHashKey("prompt_pd_entering_slide_enter"), locked: true, position: [new mp.Vector3(-554.4255, -118.8075, 37.69957), new mp.Vector3(-554.7452, -118.0351, 37.69957)], trabajos: [2] },
//     { id: 1026, hash: mp.game.gameplay.getHashKey("prompt_pd_entering_slide_enter"), locked: true, position: [new mp.Vector3(-554.4255, -118.8075, 37.69957), new mp.Vector3(-554.7452, -118.0351, 37.69957)], trabajos: [2] },

//     //SANDY SHORE COMISARIA
//     //Acceso celdas
//     { id: 1026, hash: mp.game.gameplay.getHashKey("hedwig_sheriff_door02"), locked: true, position: [new mp.Vector3(1850.115, 3685.628, 34.38747)], trabajos: [2] },
//     //Acceso escaleras
//     { id: 1026, hash: mp.game.gameplay.getHashKey("hedwig_sheriff_door06"), locked: true, position: [new mp.Vector3(1849.522, 3682.919, 34.38288)], trabajos: [2] },
//     //Acceso oficinas
//     { id: 1026, hash: mp.game.gameplay.getHashKey("hedwig_sheriff_door01"), locked: true, position: [new mp.Vector3(1857.424, 3689.848, 34.38715)], trabajos: [2] },
//     //Armeria
//     { id: 1026, hash: mp.game.gameplay.getHashKey("v_corp_cd_recseat"), locked: true, position: [new mp.Vector3(1858.248, 3685.998, 33.22764)], trabajos: [2] },
//     //Celda 1
//     { id: 1026, hash: mp.game.gameplay.getHashKey("hedwig_sheriff_door05"), locked: true, position: [new mp.Vector3(1849.962, 3693.903, 34.36824)], trabajos: [2] },
//     //Celda 2
//     { id: 1026, hash: mp.game.gameplay.getHashKey("hedwig_sheriff_door05"), locked: true, position: [new mp.Vector3(1852.891, 3695.594, 34.36824)], trabajos: [2] },
//     //Celda 3
//     { id: 1026, hash: mp.game.gameplay.getHashKey("hedwig_sheriff_door05"), locked: true, position: [new mp.Vector3(1856.942, 3695.599, 34.36868)], trabajos: [2] },
//     //Acceso celdas trasero
//     { id: 1026, hash: mp.game.gameplay.getHashKey("hedwig_sheriff_door03"), locked: true, position: [new mp.Vector3(1852.817, 3699.379, 34.42271)], trabajos: [2] },
//     //Puerta terraza
//     { id: 1026, hash: mp.game.gameplay.getHashKey("hedwig_sheriff_door04"), locked: true, position: [new mp.Vector3(1839.946, 3691.926, 38.38413)], trabajos: [2] },

//     //PALETO BAY COMISARIA
//     //Acceso taquillas
//     { id: 1026, hash: mp.game.gameplay.getHashKey("sahp_door_3"), locked: true, position: [new mp.Vector3(-451.129, 6012.378, 31.92891)], trabajos: [2] },
//     //Acceso taquillas fuera
//     { id: 1026, hash: mp.game.gameplay.getHashKey("sahp_door_6"), locked: true, position: [new mp.Vector3(-451.0016, 6006.038, 31.98067)], trabajos: [2] },
//     //Acceso desde fuera
//     { id: 1026, hash: mp.game.gameplay.getHashKey("sahp_door_6"), locked: true, position: [new mp.Vector3(-446.3297, 6001.365, 31.83262)], trabajos: [2] },
//     //Acceso zona interna
//     { id: 1026, hash: mp.game.gameplay.getHashKey("v_ilev_ss_door7"), locked: true, position: [new mp.Vector3(-433.7091, 6000.629, 31.81228), new mp.Vector3(-435.5448, 5998.792, 31.81228)], trabajos: [2] },
//     { id: 1026, hash: mp.game.gameplay.getHashKey("v_ilev_ss_door8"), locked: true, position: [new mp.Vector3(-433.7091, 6000.629, 31.81228), new mp.Vector3(-435.5448, 5998.792, 31.81228)], trabajos: [2] },
//     //Armeria
//     { id: 1026, hash: mp.game.gameplay.getHashKey("sahp_door_5"), locked: true, position: [new mp.Vector3(-438.2234, 5988.333, 27.95578)], trabajos: [2] },
//     //Acceso celdas
//     { id: 1026, hash: mp.game.gameplay.getHashKey("sahp_prison_door"), locked: true, position: [new mp.Vector3(-445.7734, 5999.663, 27.95659)], trabajos: [2] },
//     //Celda 1
//     { id: 1026, hash: mp.game.gameplay.getHashKey("sahp_prison_door"), locked: true, position: [new mp.Vector3(-445.9698, 6001.379, 27.95659)], trabajos: [2] },
//     //Celda 2
//     { id: 1026, hash: mp.game.gameplay.getHashKey("sahp_prison_door"), locked: true, position: [new mp.Vector3(-448.4535, 6003.863, 27.95659)], trabajos: [2] },
//     //Celda 3
//     { id: 1026, hash: mp.game.gameplay.getHashKey("sahp_prison_door"), locked: true, position: [new mp.Vector3(-451.1713, 6001.145, 27.95659)], trabajos: [2] },
//     //Celda 4
//     { id: 1026, hash: mp.game.gameplay.getHashKey("sahp_prison_door"), locked: true, position: [new mp.Vector3(-448.6821, 5998.656, 27.95659)], trabajos: [2] },
//     //Acceso vehículos comisaria
//     { id: 1026, hash: mp.game.gameplay.getHashKey("sahp_gate_2_l"), locked: true, position: [new mp.Vector3(-455.8005, 6030.375, 30.45216), new mp.Vector3(-451.6384, 6026.218, 30.45216)], trabajos: [2] },
//     { id: 1026, hash: mp.game.gameplay.getHashKey("sahp_gate_2"), locked: true, position: [new mp.Vector3(-455.8005, 6030.375, 30.45216), new mp.Vector3(-451.6384, 6026.218, 30.45216)], trabajos: [2] },

//     //LSFD PALETO
//     //Acceso principal
//     { id: 1026, hash: mp.game.gameplay.getHashKey("v_ilev_ph_gendoor003"), locked: true, position: [new mp.Vector3(-378.8889, 6111.859, 31.7834)], trabajos: [3] },
//     //Acceso trasero
//     { id: 1026, hash: mp.game.gameplay.getHashKey("fsp_carpetrub"), locked: true, position: [new mp.Vector3(-369.8541, 6102.409, 30.63458)], trabajos: [3] },
//     //Acceso garaje
//     { id: 1026, hash: mp.game.gameplay.getHashKey("v_ilev_ph_gendoor003"), locked: true, position: [new mp.Vector3(-363.649, 6109.581, 31.77966)], trabajos: [3] },
//     //Ascensor Paleto
//     { id: 1026, hash: mp.game.gameplay.getHashKey("v_ilev_gtdoor"), locked: true, position: [new mp.Vector3(-366.4298, 6104.321, 35.59205)], trabajos: [3] },
// ]
var puertas = [];

mp.events.add("puertas:add", (puerta) => {
    try {
        let array = JSON.parse(puerta);
        let obj = {
            id: array.id,
            locked: array.locked,
            timer: array.timer,
            distancia: parseFloat(array.distancia),
            posx: parseFloat(array.posx),
            posy: parseFloat(array.posy),
            posz: parseFloat(array.posz),
            tipo: array.tipo,
            color: array.color,
            objetos: array.objetos,
            trabajos: array.trabajos,
            personajes: array.personajes,
            negocios: array.negocios,
            facciones: array.facciones,
            propiedades: array.propiedades,
            dimension: array.dimension,
        };
        puertas.push(obj);
        for (let i = 0; i < obj.objetos.length; i++){
            mp.game.object.doorControl(mp.game.gameplay.getHashKey(obj.objetos[i].modelo), parseFloat(obj.objetos[i].posx), parseFloat(obj.objetos[i].posy), parseFloat(obj.objetos[i].posz), obj.locked, 0.0, 50.0, 0.0);
            mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey(obj.objetos[i].modelo), parseFloat(obj.objetos[i].posx), parseFloat(obj.objetos[i].posy), parseFloat(obj.objetos[i].posz), obj.locked, 1, false);   
        }
    } catch (e) {
        logError("Puertas", e);
    }
});

mp.events.add("puertas:change", (puerta, json) => {
    try {
        for(let i = 0, n = puertas.length; i < n; i++)
        {
            if(puertas[i].id == puerta) {
                let array = JSON.parse(json);
                puertas[i].id = array.id;
                puertas[i].locked = array.locked;
                puertas[i].timer = array.timer;
                puertas[i].distancia = parseFloat(array.distancia);
                puertas[i].posx = parseFloat(array.posx);
                puertas[i].posy = parseFloat(array.posy);
                puertas[i].posz = parseFloat(array.posz);
                puertas[i].tipo = array.tipo;
                puertas[i].color = array.color;
                puertas[i].objetos = array.objetos;
                puertas[i].trabajos = array.trabajos;
                puertas[i].personajes = array.personajes;
                puertas[i].negocios = array.negocios;
                puertas[i].facciones = array.facciones;
                puertas[i].propiedades = array.propiedades;
                puertas[i].dimension = array.dimension;
                for (let i = 0; i < puertas[i].objetos.length; i++){
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey(puertas[i].objetos[i].modelo), parseFloat(puertas[i].objetos[i].posx), parseFloat(puertas[i].objetos[i].posy), parseFloat(puertas[i].objetos[i].posz), puertas[i].locked, 0.0, 50.0, 0.0);
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey(puertas[i].objetos[i].modelo), parseFloat(puertas[i].objetos[i].posx), parseFloat(puertas[i].objetos[i].posy), parseFloat(puertas[i].objetos[i].posz), puertas[i].locked, 1, false);   
                }
                break;
            }
        }    
    } catch (e) {
        logError("Puertas change", e);
    }
});

mp.events.add("puertas:permissions:players", (puerta, json) => {
    try {
        for(let i = 0, n = puertas.length; i < n; i++)
        {
            if(puertas[i].id == puerta) {
                let array = JSON.parse(json);
                puertas[i].personajes = array.personajes;
                break;
            }
        }    
    } catch (e) {
        logError("Puertas permissions players", e);
    }
});

mp.events.add("puertas:permissions:jobs", (puerta, json) => {
    try {
        for(let i = 0, n = puertas.length; i < n; i++)
        {
            if(puertas[i].id == puerta) {
                let array = JSON.parse(json);
                puertas[i].trabajos = array.trabajos;
                break;
            }
        }    
    } catch (e) {
        logError("Puertas permissions jobs", e);
    }
});

mp.events.add("puertas:permissions:factions", (puerta, json) => {
    try {
        for(let i = 0, n = puertas.length; i < n; i++)
        {
            if(puertas[i].id == puerta) {
                let array = JSON.parse(json);
                puertas[i].facciones = array.facciones;
                break;
            }
        }    
    } catch (e) {
        logError("Puertas permissions factions", e);
    }
});

mp.events.add("puertas:permissions:houses", (puerta, json) => {
    try {
        for(let i = 0, n = puertas.length; i < n; i++)
        {
            if(puertas[i].id == puerta) {
                let array = JSON.parse(json);
                puertas[i].propiedades = array.propiedades;
                break;
            }
        }    
    } catch (e) {
        logError("Puertas permissions houses", e);
    }
});

mp.events.add("puertas:permissions:business", (puerta, json) => {
    try {
        for(let i = 0, n = puertas.length; i < n; i++)
        {
            if(puertas[i].id == puerta) {
                let array = JSON.parse(json);
                puertas[i].negocios = array.negocios;
                break;
            }
        }    
    } catch (e) {
        logError("Puertas permissions business", e);
    }
});

mp.events.add("puertas:abrir_cerrar", (valor, id) => {
    for (let i = 0, n = puertas.length; i < n; i++) {
        if(puertas[i].id == id){
            for(let j = 0, m = puertas[i].objetos.length; j < m; j++){
                let pos = new mp.Vector3(parseFloat(puertas[i].objetos[j].posx), parseFloat(puertas[i].objetos[j].posy), parseFloat(puertas[i].objetos[j].posz));
                if(puertas[i].timer > 0){
                    puertas[i].locked = false;
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey(puertas[i].objetos[j].modelo), pos.x, pos.y, pos.z, false, 0.0, 50.0, 0.0);
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey(puertas[i].objetos[j].modelo), pos.x, pos.y, pos.z, false, 0.0, false);
                    crearTimeout(() => {
                        puertas[i].locked = true;
                        mp.game.object.doorControl(mp.game.gameplay.getHashKey(puertas[i].objetos[j].modelo), pos.x, pos.y, pos.z, true, 0.0, 50.0, 0.0);
                        mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey(puertas[i].objetos[j].modelo), pos.x, pos.y, pos.z, true, 0.0, false);
                    }, puertas[i].timer)
                }else{
                    puertas[i].locked = valor;
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey(puertas[i].objetos[j].modelo), pos.x, pos.y, pos.z, valor, 0.0, 50.0, 0.0);
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey(puertas[i].objetos[j].modelo), pos.x, pos.y, pos.z, valor, 0.0, false);
                }
            }
            break;
        }
    }
});

mp.events.add("puertas:remove", (puerta) => {
    try {
        for(let i = 0, n = puertas.length; i < n; i++)
        {
            if (puertas[i].id == puerta) {
                for(let j = 0, m = puertas[i].objetos.length; j < m; j++){
                    let pos = new mp.Vector3(parseFloat(puertas[i].objetos[j].posx), parseFloat(puertas[i].objetos[j].posy), parseFloat(puertas[i].objetos[j].posz));
                    puertas[i].locked = false;
                    mp.game.object.doorControl(mp.game.gameplay.getHashKey(puertas[i].objetos[j].modelo), pos.x, pos.y, pos.z, false, 0.0, 50.0, 0.0);
                    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey(puertas[i].objetos[j].modelo), pos.x, pos.y, pos.z, false, 0.0, false);
                }

                //Lo eliminamos tras dejarla abierta
                puertas.splice(i, 1);
                break;
            }
        }    
    } catch (e) {
        logError("Puertas remove", e);
    }
});

// //Puertas siempre cerradas o abiertas
// //Fleeca Burro
// mp.game.object.doorControl(mp.game.gameplay.getHashKey("v_ilev_genbankdoor2"), -348.8109, -47.26213, 49.38759, false, 0.0, 50.0, 0.0);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("v_ilev_genbankdoor2"), -348.8109, -47.26213, 49.38759, false, 1, false);
// mp.game.object.doorControl(mp.game.gameplay.getHashKey("v_ilev_genbankdoor1"), -351.2598, -46.41221, 49.38765, false, 0.0, 50.0, 0.0);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("v_ilev_genbankdoor1"), -351.2598, -46.41221, 49.38765, false, 1, false);

// // //Puerta Car Meet exterior siempre cerrada
// // mp.game.object.doorControl(mp.game.gameplay.getHashKey("prop_gar_door_04"), 778.3093, -1867.485, 30.65996, true, 0.0, 50.0, 0.0);
// // mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("prop_gar_door_04"), 778.3093, -1867.485, 30.65996, true, 1, false);


// // //Puertas edificio noose del estado el de los datos
// // mp.game.object.doorControl(mp.game.gameplay.getHashKey("prop_facgate_05_r"), 2569.221, -325.5664, 94.12363, false, 0.0, 50.0, 0.0);
// // mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_facgate_05_r"), 2569.221, -325.5664, 94.12363, false, 0.0, false);
// // mp.game.object.doorControl(mp.game.gameplay.getHashKey("prop_facgate_05_r"), 2559.614, -325.5558, 94.12363, false, 0.0, 50.0, 0.0);
// // mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_facgate_05_r"), 2559.614, -325.5558, 94.12363, false, 0.0, false);


// //Otras puertas de negocios, tiendas, casas etc... que deben estar siempre cerradas.
// // mp.game.object.doorControl(mp.game.gameplay.getHashKey("v_ilev_roc_door4"), -565.1712, 276.6259, 83.2863, true, 0.0, 50.0, 0.0);
// // mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_roc_door4"), -565.1712, 276.6259, 83.2863, true, 0.0, false);
// // mp.game.object.doorControl(mp.game.gameplay.getHashKey("v_ilev_roc_door4"), -561.2863, 293.5043, 87.7771, true, 0.0, 50.0, 0.0);
// // mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_roc_door4"), -561.2863, 293.5043, 87.7771, true, 0.0, false);

// //Ckubhousedoor
// // mp.game.object.doorControl(mp.game.gameplay.getHashKey("v_ilev_lostdoor"), 981.7533, -102.7987, 74.84873, true, 0.0, 50.0, 0.0);
// // mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_lostdoor"), 981.7533, -102.7987, 74.84873, true, 0.0, false);


// // //Comisaria de sandyshore (DUDA)
// // mp.game.object.doorControl(mp.game.gameplay.getHashKey("v_ilev_shrdoor"), 1855.685, 3683.93, 34.5928, false, 0.0, 50.0, 0.0);
// // mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_shrdoor"), 1855.685, 3683.93, 34.5928, false, 0.0, false);
// // //Comisaria de paletobay (DUDA)
// // mp.game.object.doorControl(mp.game.gameplay.getHashKey("v_ilev_shrf2door"), -442.66, 6015.222, 31.86633, false, 0.0, 50.0, 0.0);
// // mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_shrf2door"), -442.66, 6015.222, 31.86633, false, 0.0, false);
// // mp.game.object.doorControl(mp.game.gameplay.getHashKey("v_ilev_shrf2door"), -444.4985, 6017.06, 31.86633, false, 0.0, 50.0, 0.0);
// // mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_shrf2door"), -444.4985, 6017.06, 31.86633, false, 0.0, false);

// // Taller (DUDA POSICION)
// // mp.game.object.doorControl(mp.game.gameplay.getHashKey("v_ilev_cs_door"), 483, -1312, 29, true, 0.0, 50.0, 0.0);
// // mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_cs_door"), 483, -1312, 29, true, 0.0, false);
// // mp.game.object.doorControl(mp.game.gameplay.getHashKey("prop_com_gar_door_01"), 483.56, -1316.08, 32.18, true, 0.0, 50.0, 0.0);
// // mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_com_gar_door_01"), 483.56, -1316.08, 32.18, true, 0.0, false);
// //Vanila
// // mp.game.object.doorControl(mp.game.gameplay.getHashKey("prop_strip_door_01"), 128, -1299, 29, true, 0.0, 50.0, 0.0);
// // mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_strip_door_01"), 128, -1299, 29, true, 0.0, false);
// // mp.game.object.doorControl(mp.game.gameplay.getHashKey("prop_magenta_door"), 96, -1285, 29, true, 0.0, 50.0, 0.0);
// // mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_magenta_door"), 96, -1285, 29, true, 0.0, false);

// //Vespucci beach comisaria
// // mp.game.object.doorControl(mp.game.gameplay.getHashKey("prop_facgate_06_r"), -1053.284, -874.3318, 6.205582, true, 0.0, 50.0, 0.0);
// // mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_facgate_06_r"), -1053.284, -874.3318, 6.205582, true, 0.0, false);
// // mp.game.object.doorControl(mp.game.gameplay.getHashKey("prop_facgate_06_l"), -1063.636, -880.7089, 6.214558, true, 0.0, 50.0, 0.0);
// // mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_facgate_06_l"), -1063.636, -880.7089, 6.214558, true, 0.0, false);

// //Casa Michael
// // mp.game.object.doorControl(mp.game.gameplay.getHashKey("v_ilev_mm_door"), -806.2817, 186.0246, 72.62405, true, 0.0, 50.0, 0.0);
// // mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_mm_door"), -806.2817, 186.0246, 72.62405, true, 0.0, false);
// // mp.game.object.doorControl(mp.game.gameplay.getHashKey("prop_ld_garaged_01"), -815.2816, 185.975, 72.99993, true, 0.0, 50.0, 0.0);
// // mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_ld_garaged_01"), -815.2816, 185.975, 72.99993, true, 0.0, false);
// // mp.game.object.doorControl(mp.game.gameplay.getHashKey("v_ilev_mm_doorm_l"), -816.716, 179.098, 72.82738, true, 0.0, 50.0, 0.0);
// // mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_mm_doorm_l"), -816.716, 179.098, 72.82738, true, 0.0, false);
// // mp.game.object.doorControl(mp.game.gameplay.getHashKey("v_ilev_mm_doorm_r"), -816.1068, 177.5109, 72.82738, true, 0.0, 50.0, 0.0);
// // mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_mm_doorm_r"), -816.1068, 177.5109, 72.82738, true, 0.0, false);
// // mp.game.object.doorControl(mp.game.gameplay.getHashKey("prop_bh1_48_backdoor_l"), -796.5657, 177.2214, 73.04045, true, 0.0, 50.0, 0.0);
// // mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_bh1_48_backdoor_l"), -796.5657, 177.2214, 73.04045, true, 0.0, false);
// // mp.game.object.doorControl(mp.game.gameplay.getHashKey("prop_bh1_48_backdoor_r"), -794.5051, 178.0124, 73.04045, true, 0.0, 50.0, 0.0);
// // mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_bh1_48_backdoor_r"), -794.5051, 178.0124, 73.04045, true, 0.0, false);
// // mp.game.object.doorControl(mp.game.gameplay.getHashKey("prop_bh1_48_backdoor_l"), -793.3943, 180.5075, 73.04045, true, 0.0, 50.0, 0.0);
// // mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_bh1_48_backdoor_l"), -793.3943, 180.5075, 73.04045, true, 0.0, false);
// // mp.game.object.doorControl(mp.game.gameplay.getHashKey("prop_bh1_48_backdoor_r"), -794.1853, 182.568, 73.04045, true, 0.0, 50.0, 0.0);
// // mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_bh1_48_backdoor_r"), -794.1853, 182.568, 73.04045, true, 0.0, false);
// // mp.game.object.doorControl(mp.game.gameplay.getHashKey("v_ilev_mm_windowwc"), -802.7333, 167.5041, 77.58243, true, 0.0, 50.0, 0.0);
// // mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_mm_windowwc"), -802.7333, 167.5041, 77.58243, true, 0.0, false);
// // mp.game.object.doorControl(mp.game.gameplay.getHashKey("prop_door_balcony_right"), -816.8055, 177.0992, 77.14575, true, 0.0, 50.0, 0.0);
// // mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_door_balcony_right"), -816.8055, 177.0992, 77.14575, true, 0.0, false);
// // mp.game.object.doorControl(mp.game.gameplay.getHashKey("prop_door_balcony_left"), -817.5095, 178.9343, 77.14861, true, 0.0, 50.0, 0.0);
// // mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_door_balcony_left"), -817.5095, 178.9343, 77.14861, true, 0.0, false);

// //Puerta casa franklin rockford plaza
// // mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_janitor_frontdoor"), -107.5373, -9.018098, 70.67085, true, 0.0, false);

// //Puerta casa trevor playa
// // mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_trev_doorfront"), -1149.709, -1521.088, 10.78267, true, 0.0, false);

// //Puerta franklin
// // mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_fa_frontdoor"), -14.86892, -1441.182, 31.19323, true, 0.0, false);

// //Puerta clubhouse
// // mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_lostdoor"), 981.1506, -103.2552, 74.99358, true, 0.0, false);

// // //Puertas de talleres
// // //mp.game.object.setStateOfClosestDoorOfType(270330101, 723.116, -1088.831, 23.23201, true, 0.0, false);
// // //mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_com_ls_door_01"), -1145.898, -1991.144, 14.18357, true, 0.0, false);
// // //mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_com_ls_door_01"), -356.0905, -134.7714, 40.01295, true, 0.0, false);
// // mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_carmod3door"), 1174.654, 2645.222, 38.63961, true, 0.0, false);
// // mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_carmod3door"), 1182.306, 2645.232, 38.63961, true, 0.0, false);
// // mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_com_gar_door_01"), -187.3406, -2515.309, 5.047173, true, 0.0, false);
// // //mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_carmod3door"), 108.8502, 6617.877, 32.67305, true, 0.0, false); // Han solicitado dim 0 mediante ticket. Quitamos esta puerta.
// // //mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_carmod3door"), 114.3135, 6623.233, 32.67305, true, 0.0, false); // Han solicitado dim 0 mediante ticket. Quitamos esta puerta.
// // mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ss_door5_r"), 1187.202, 2644.95, 38.55176, true, 0.0, false);
// // mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ss_door5_r"), 105.1518, 6614.655, 32.58521, true, 0.0, false);
// // //mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("lr_prop_supermod_door_01"), -205.6828, -1310.683, 30.29572, true, 0.0, false);

// //Mazebank arena
// // mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_stad_door"), -259.4862, -2031.936, 30.52077, true, 0.0, false);
// // mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_stad_door"), -257.4934, -2029.561, 30.52077, true, 0.0, false);
// // mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_stad_door"), -252.6704, -2023.813, 30.52077, true, 0.0, false);
// // mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_stad_door"), -250.6776, -2021.438, 30.52077, true, 0.0, false);

// // //Alamacen mision de ranklin cerca del mazebank
// // mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_rc_door3_r"), -611.32, -1610.089, 27.15894, true, 0.0, false);
// // mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_rc_door3_l"), -608.7289, -1610.315, 27.15894, true, 0.0, false);
// // mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_rc_door3_l"), -592.9376, -1631.577, 27.15931, true, 0.0, false);
// // mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_rc_door3_r"), -592.7109, -1628.986, 27.15931, true, 0.0, false);

// // //LieInvader
// // mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ib_door2"), -1048.285, -236.8171, 44.171, true, 0.0, false);
// // mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ib_door2"), -1047.084, -239.1246, 44.171, true, 0.0, false);
// // mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_b_sl_door01"), -1057.767, -237.484, 43.021, false, 0.0, false);
// // mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_b_sl_door01"), -1063.842, -240.6464, 43.021, false, 0.0, false);

// //Casa trevor vespucci
// // mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_trev_doorront"), -1149.709, -1521.088, 10.78267, true, 0.0, false);

// //Casa franklin

// // mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_trevtraildr"), 1973, 3815, 34, true, 0.0, false);
// // mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_janitor_rontdoor"), -107.5401, -9.0258, 70.6696, true, 0.0, false);

// //Almacenes o garajes
// // mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_com_gar_door_01"), 1204.57, -3110.4, 6.57, true, 0.0, false);
// // mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_biolab_g_door"), 3589.1, 3671.5, 35, true, 0.0, false);
// // mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_biolab_g_door"), 3587.6, 3663.3, 35, true, 0.0, false);
// // mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_bl_shutter2"), 3627.71, 3746.72, 27.69, true, 0.0, false);
// // mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_bl_shutter2"), 3620.84, 3751.53, 27.69, true, 0.0, false);

// //Aeropuerto vallas pequeñas
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_nclink_02gate6_r"), -967.4473, -2778.495, 14.409, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_nclink_02gate6_l"), -974.5734, -2774.381, 14.4099, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_nclink_02gate6_r"), -971.1018, -2776.385, 14.409, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_nclink_02gate6_l"), -970.9188, -2776.491, 14.409, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_nclink_02gate6_r"), -935.2114, -2767.397, 14.3882, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_nclink_02gate6_l"), -933.1581, -2763.955, 14.3882, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_nclink_02gate6_r"), -933.0535, -2763.779, 14.3882, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_nclink_02gate6_l"), -931.0002, -2760.337, 14.3882, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_nclink_02gate6_r"), -773.2438, -2842.677, 14.2715, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_nclink_02gate6_l"), -769.7721, -2844.682, 14.2715, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_nclink_02gate6_r"), 769.6071, -2844.777, 14.2715, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_nclink_02gate6_l"), -766.1354, -2846.781, 14.2715, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_nclink_09gate1"), -828.9456, -2964.304, 14.2758, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_nclink_09gate1"), -907.7999, -3100.874, 14.2808, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_nclink_09gate1"), -833.4395, -3186.709, 14.267, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_nclink_09gate1"), -830.0544, -3391.163, 14.1972, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_nclink_09gate1"), -913.0834, -3534.97, 14.1924, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_nclink_09gate1"), -971.6149, -3549.152, 14.2727, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_nclink_09gate1"), -1017.692, -3563.217, 14.2767, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_nclink_09gate1"), -1146.831, -3546.638, 14.2595, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_nclink_09gate1"), -1260.897, -3480.764, 14.1721, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_nclink_09gate1"), -1351.133, -3404.162, 14.1721, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_nclink_09gate1"), -1409.507, -3370.461, 14.2068, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_nclink_09gate1"), -1831.804, -3224.966, 14.3119, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_nclink_09gate1"), -1942.289, -3161.19, 14.2981, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_nclink_09gate1"), -1927.563, -3076.269, 14.4569, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_nclink_09gate1"), -1951.696, -3003.846, 14.4418, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_nclink_09gate1"), -1836.875, -2804.969, 14.4557, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_nclink_09gate1"), -1802.692, -2745.761, 14.448, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_acgate_01"), -1099.531, -2020.803, 12.1745, false, 0.0, false);
// //mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_acgate_01"), -994.4996, -2341.648, 12.9448, true, 0.0, false);
// //mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_acgate_01"), -984.0709, -2348.4, 12.9448, true, 0.0, false);

// // mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_lester_doorront"), 1273.82, -1720.7, 54.92, true, 0.0, false);
// // mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_tort_door"), 134.4, -2204.1, 7.52, true, 0.0, false);
// // mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_lester_doorront"), 1273.82, -1720.7, 54.92, true, 0.0, false);
// // mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_ch3_01_trlrdoor_l"), 2333.23, 2574.97, 47.03, true, 0.0, false);
// // mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_ch3_01_trlrdoor_r"), 2329.65, 2576.64, 47.03, true, 0.0, false);


// //UNION DEPOSITORY
// //mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_sec_gate_01c"), 25.03, -664.6, 31.04, false, 0.0, false);
// //mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_sec_gate_01d"), -72.75, -682.17, 33.27, false, 0.0, false);


// //Bancos
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_bank4door02"), -111.48, 6463.94, 31.985, false, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_bank4door01"), -109.65, 6462.11, 31.985, false, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_genbankdoor1"), -2965.821, 481.63, 16.048, false, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_genbankdoor2"), -2965.71, 484.219, 16.048, false, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_genbankdoor1"), 1176.49, 2703.61, 38.44, false, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_genbankdoor2"), 1173.9, 2703.61, 38.44, false, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_genbankdoor1"), 1656.25, 4852.24, 42.35, false, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_genbankdoor2"), 1656.57, 4849.66, 42.35, false, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_genbankdoor1"), -1215.39, -328.52, 38.13, false, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_genbankdoor2"), -1213.07, -327.35, 38.13, false, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_genbankdoor1"), 149.63, -1037.23, 29.72, false, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_genbankdoor2"), 152.06, -1038.12, 29.72, false, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_genbankdoor1"), 313.96, -275.6, 54.52, false, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_genbankdoor2"), 316.39, -276.49, 54.52, false, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_genbankdoor1"), -348.81, -47.26, 49.39, false, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_genbankdoor2"), -351.26, -46.41, 49.39, false, 0.0, false);

// //Banco grande
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("hei_v_ilev_bk_gate_pris"), 256.3116, 220.6579, 106.4296, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("hei_v_ilev_bk_gate2_pris"), 256.3116, 220.6579, 106.4296, true, 0.0, false);

// // Casa de Franklin (Entrada) - Cerrada
// // mp.game.object.doorControl(mp.game.gameplay.getHashKey("v_ilev_fh_frontdoor"), 7.518359, 539.5268, 176.1776, true, 0.0, 50.0, 0.0);
// // mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("v_ilev_fh_frontdoor"), 7.518359, 539.5268, 176.1776, true, 1, false);

// let pruebas = true;

// doors.forEach((door) => {
//     if (pruebas) return;
//     for(let i = 0; i < door.door.pos.length; i++)
//     {
//         let pos = door.door.pos[i];
//         let hash = door.door.hash[i];
//         mp.game.object.doorControl(hash, pos.x, pos.y, pos.z, door.locked, 0.0, 50.0, 0.0);
//         mp.game.object.setStateOfClosestDoorOfType(hash, pos.x, pos.y, pos.z, door.locked, 0.0, false);    
//     }
// });
// // Tecla B
// mp.keys.bind(0x42, true, () => {
//     if (typeof animUpdateIniciada === 'boolean' && animUpdateIniciada) return;
//     if (pruebas) return;
//     let jugador = mp.controladorJugadores._jugadores[player_local.id];
//     for (let i = 0, n = doors.length; i < n; i++) {
//         for (let j = 0, m = doors[i].door.pos.length; j < m; j++) {
//             if (calcDist(doors[i].door.pos[j], player_local.position) < doors[i].distAper) {
//                 if (doors[i].locked) {
//                     let puedeAbrir = false;
//                     for(let k = 0; k < doors[i].trabajos.length; k++){
//                         if(jugador.trabajos.includes(doors[i].trabajos[k])){
//                             puedeAbrir = true;
//                             break;
//                         }
//                     }
//                     // if (!puedeAbrir)
//                     // {
//                     //     for(let k = 0; k < doors[i].negocios.length; k++){
//                     //         if(jugador.trabajos.includes(doors[i].negocios[k])){
//                     //             puedeAbrir = true;
//                     //             break;
//                     //         }
//                     //     }
//                     // }
//                     // if (!puedeAbrir)
//                     // {
//                     //     for(let k = 0; k < doors[i].facciones.length; k++){
//                     //         if(faccion == doors[i].facciones[k]){
//                     //             puedeAbrir = true;
//                     //             break;
//                     //         }
//                     //     }
//                     // }

//                     if (puedeAbrir) {
//                         doors[i].locked = false;
//                         mostrarAviso("success", 5000, "Puerta desbloqueada");
//                         let pos = doors[i].door.pos[j];
//                         let hash = doors[i].door.hash[j];
//                         mp.game.object.doorControl(hash, pos.x, pos.y, pos.z, doors[i].locked, 0.0, 50.0, 0.0);
//                         mp.game.object.setStateOfClosestDoorOfType(hash, pos.x, pos.y, pos.z, doors[i].locked, 0.0, false);
//                     }
//                 }
//             }
//         }
//     }
// });

// var esferaEsta = null;

// var hospitalTaquillas1 = mp.colshapes.newSphere(332.7071, -587.7208, 28.80965, 1.5, 0);
// var hospitalTaquillas2 = mp.colshapes.newSphere(337.2274, -584.0469, 28.81494, 1.5, 0);

// var accesoParking = mp.colshapes.newSphere(319.7313, -560.3552, 28.74346, 3.0, 0);
// var accesoQuirofanos = mp.colshapes.newSphere(341.8485, -571.3801, 28.79148, 2.0, 0);
// var accesoOficinas = mp.colshapes.newSphere(334.2146, -592.2678, 28.79147, 2.0, 0);

// // Mision row
// var policeBackDoors = mp.colshapes.newSphere(468.535, -1014.098, 26.386, 2.0, 0);
// var policeCellDoors_1 = mp.colshapes.newSphere(461.494, -1001.222, 24.9147, 0.8, 0);
// var policeCellDoors_2 = mp.colshapes.newSphere(461.9495, -998.2184, 24.91486, 0.8, 0);
// var policeCellDoors_3 = mp.colshapes.newSphere(461.4945, -994.5045, 24.9147, 0.8, 0);
// var policeCellDoors1 = mp.colshapes.newSphere(465.1644, -1002.959, 24.91474, 1.5, 0);
// var policeCellDoors2 = mp.colshapes.newSphere(463.8747, -992.6383, 24.91471, 1.5, 0);

// var policeArmeria = mp.colshapes.newSphere(452.608, -982.6044, 30.68959, 3.0, 0);
// var policeRoof = mp.colshapes.newSphere(449.698, -986.469, 30.689, 3.0, 0);
// var policeCapitan = mp.colshapes.newSphere(447.238, -980.630, 30.689, 3.0, 0);
// var policeHeli = mp.colshapes.newSphere(464.361, -984.678, 43.834, 5.0, 0);
// var policeEscaleras = mp.colshapes.newSphere(444.5676, -989.7579, 30.68959, 3.0, 0);
// var policeBackGate = mp.colshapes.newSphere(488.894, -1020.210, 30.00, 8.0, 0);

// var policeCeldas1 = mp.colshapes.newSphere(480.0301, -996.4594, 25.00599, 2.5, 0);
// var policeCeldas2 = mp.colshapes.newSphere(475.7543, -996.4594, 25.00599, 2.5, 0);
// var policeCeldas3 = mp.colshapes.newSphere(471.4755, -996.4594, 25.00599, 2.5, 0);
// var policeCeldas4 = mp.colshapes.newSphere(467.1922, -996.4594, 25.00599, 2.5, 0);

// var policeInterrogatorios1 = mp.colshapes.newSphere(468.4872, -1003.548, 25.01314, 2.5, 0);
// var policeInterrogatorios2 = mp.colshapes.newSphere(471.4747, -1003.538, 25.01223, 2.5, 0);
// var policeInterrogatorios3 = mp.colshapes.newSphere(477.0497, -1003.553, 25.01203, 2.5, 0);
// var policeInterrogatorios4 = mp.colshapes.newSphere(480.0301, -1003.538, 25.00599, 2.5, 0);

// var policeSalidaEmpleados = mp.colshapes.newSphere(445.9536, -998.5255, 30.68933, 3.0, 0);
// var policeTerrazaPiso1 = mp.colshapes.newSphere(429.4236, -995.0401, 35.73685, 3.0, 0);
// var policeTerrazaFumadores = mp.colshapes.newSphere(464.1584, -1011.26, 33.01121, 3.0, 0);

// var policePruebas = mp.colshapes.newSphere(471.3154, -986.1091, 25.05795, 1.5, 0);
// var policePruebasReja = mp.colshapes.newSphere(475.4744, -987.0256, 25.22698, 1.5, 0);
// var policeServidores = mp.colshapes.newSphere(467.5936, -977.9933, 25.05795, 2.5, 0);
// var policeLaboratorio = mp.colshapes.newSphere(463.6146, -980.5814, 25.05795, 2.5, 0);

// var policeSalaAsignaciones = mp.colshapes.newSphere(469.8641, -1010.393, 26.38631, 1.5, 0);

// //Vespucci
// var VpoliceCellDoors_1 = mp.colshapes.newSphere(461.494, -1001.222, 24.9147, 0.8, 538);
// var VpoliceCellDoors_2 = mp.colshapes.newSphere(461.9495, -998.2184, 24.91486, 0.8, 538);
// var VpoliceCellDoors_3 = mp.colshapes.newSphere(461.4945, -994.5045, 24.9147, 0.8, 538);
// var VpoliceCellDoors1 = mp.colshapes.newSphere(465.1644, -1002.959, 24.91474, 1.5, 538);
// var VpoliceCellDoors2 = mp.colshapes.newSphere(463.8747, -992.6383, 24.91471, 1.5, 538);

// var VpoliceArmeria = mp.colshapes.newSphere(452.608, -982.6044, 30.68959, 3.0, 538);
// var VpoliceRoof = mp.colshapes.newSphere(449.698, -986.469, 30.689, 3.0, 538);
// var VpoliceCapitan = mp.colshapes.newSphere(447.238, -980.630, 30.689, 3.0, 538);
// var VpoliceEscaleras = mp.colshapes.newSphere(444.5676, -989.7579, 30.68959, 3.0, 538);

// var VpoliceCeldas1 = mp.colshapes.newSphere(480.0301, -996.4594, 25.00599, 2.5, 538);
// var VpoliceCeldas2 = mp.colshapes.newSphere(475.7543, -996.4594, 25.00599, 2.5, 538);
// var VpoliceCeldas3 = mp.colshapes.newSphere(471.4755, -996.4594, 25.00599, 2.5, 538);
// var VpoliceCeldas4 = mp.colshapes.newSphere(467.1922, -996.4594, 25.00599, 2.5, 538);

// var VpoliceInterrogatorios1 = mp.colshapes.newSphere(468.4872, -1003.548, 25.01314, 2.5, 538);
// var VpoliceInterrogatorios2 = mp.colshapes.newSphere(471.4747, -1003.538, 25.01223, 2.5, 538);
// var VpoliceInterrogatorios3 = mp.colshapes.newSphere(477.0497, -1003.553, 25.01203, 2.5, 538);
// var VpoliceInterrogatorios4 = mp.colshapes.newSphere(480.0301, -1003.538, 25.00599, 2.5, 538);

// var VpolicePruebas = mp.colshapes.newSphere(471.3154, -986.1091, 25.05795, 1.5, 538);
// var VpolicePruebasReja = mp.colshapes.newSphere(475.4744, -987.0256, 25.22698, 1.5, 538);
// var VpoliceServidores = mp.colshapes.newSphere(467.5936, -977.9933, 25.05795, 3.0, 538);
// var VpoliceLaboratorio = mp.colshapes.newSphere(463.6146, -980.5814, 25.05795, 3.0, 538);

// var VpoliceSalaAsignaciones = mp.colshapes.newSphere(469.8641, -1010.393, 26.38631, 2.0, 538);

// //Vinewood
// var vinewoodpoliceCellDoors_1 = mp.colshapes.newSphere(461.494, -1001.222, 24.9147, 0.8, 539);
// var vinewoodpoliceCellDoors_2 = mp.colshapes.newSphere(461.9495, -998.2184, 24.91486, 0.8, 539);
// var vinewoodpoliceCellDoors_3 = mp.colshapes.newSphere(461.4945, -994.5045, 24.9147, 0.8, 539);
// var vinewoodpoliceCellDoors1 = mp.colshapes.newSphere(465.1644, -1002.959, 24.91474, 1.5, 539);
// var vinewoodpoliceCellDoors2 = mp.colshapes.newSphere(463.8747, -992.6383, 24.91471, 1.5, 539);


// var vinewoodpoliceArmeria = mp.colshapes.newSphere(452.608, -982.6044, 30.68959, 3.0, 539);
// var vinewoodpoliceRoof = mp.colshapes.newSphere(449.698, -986.469, 30.689, 3.0, 539);
// var vinewoodpoliceCapitan = mp.colshapes.newSphere(447.238, -980.630, 30.689, 3.0, 539);
// var vinewoodpoliceEscaleras = mp.colshapes.newSphere(444.5676, -989.7579, 30.68959, 3.0, 539);

// var vinewoodpoliceCeldas1 = mp.colshapes.newSphere(480.0301, -996.4594, 25.00599, 2.5, 539);
// var vinewoodpoliceCeldas2 = mp.colshapes.newSphere(475.7543, -996.4594, 25.00599, 2.5, 539);
// var vinewoodpoliceCeldas3 = mp.colshapes.newSphere(471.4755, -996.4594, 25.00599, 2.5, 539);
// var vinewoodpoliceCeldas4 = mp.colshapes.newSphere(467.1922, -996.4594, 25.00599, 2.5, 539);

// var vinewoodpoliceInterrogatorios1 = mp.colshapes.newSphere(468.4872, -1003.548, 25.01314, 2.5, 539);
// var vinewoodpoliceInterrogatorios2 = mp.colshapes.newSphere(471.4747, -1003.538, 25.01223, 2.5, 539);
// var vinewoodpoliceInterrogatorios3 = mp.colshapes.newSphere(477.0497, -1003.553, 25.01203, 2.5, 539);
// var vinewoodpoliceInterrogatorios4 = mp.colshapes.newSphere(480.0301, -1003.538, 25.00599, 2.5, 539);

// var vinewoodpolicePruebas = mp.colshapes.newSphere(471.3154, -986.1091, 25.05795, 1.5, 539);
// var vinewoodpolicePruebasReja = mp.colshapes.newSphere(475.4744, -987.0256, 25.22698, 1.5, 539);
// var vinewoodpoliceServidores = mp.colshapes.newSphere(467.5936, -977.9933, 25.05795, 3.0, 539);
// var vinewoodpoliceLaboratorio = mp.colshapes.newSphere(463.6146, -980.5814, 25.05795, 2.0, 539);

// var vinewoodpoliceSalaAsignaciones = mp.colshapes.newSphere(469.8641, -1010.393, 26.38631, 3.0, 539);

// //Del perro
// var policePerroCeldas = mp.colshapes.newSphere(-1623.206, -1023.574, 13.38294, 3.5, 0);
// var policePerroArmeria = mp.colshapes.newSphere(-1622.842, -1028.836, 13.30352, 3.5, 0);
// var policePerroTaquillas = mp.colshapes.newSphere(-1625.096, -1031.473, 13.30352, 3.5, 0);
// var policePerroDespacho = mp.colshapes.newSphere(-1621.616, -1019.449, 13.30352, 3.5, 0);
// var policePerroCallejon = mp.colshapes.newSphere(-1633.069, -1028.729, 13.30352, 3.5, 0);
// var policePerroTrasera = mp.colshapes.newSphere(-1613.315, -1027.257, 13.30352, 3.5, 0);
// var policePerroCelda1 = mp.colshapes.newSphere(-1616.468, -1024.005, 13.38294, 2.5, 0);
// var policePerroCelda2 = mp.colshapes.newSphere(-1614.536, -1021.707, 13.38294, 2.5, 0);
// var policePerroCelda3 = mp.colshapes.newSphere(-1609.969, -1023.357, 13.38294, 2.5, 0);


// //Sheriff Davis
// var sheriffDentrada1 = mp.colshapes.newSphere(366.1795, -1588.067, 29.4472, 2.0, 0);
// var sheriffDentrada2 = mp.colshapes.newSphere(362.3821, -1592.574, 29.44673, 2.0, 0);
// var sheriffDparking = mp.colshapes.newSphere(480.0301, -996.4594, 25.00599, 2.0, 0);
// var sheriffDheli = mp.colshapes.newSphere(480.0301, -996.4594, 25.00599, 2.0, 0);
// var sheriffDarmeria = mp.colshapes.newSphere(480.0301, -996.4594, 25.00599, 2.0, 0);
// var sheriffDCeldas1 = mp.colshapes.newSphere(480.0301, -996.4594, 25.00599, 1.5, 0);
// var sheriffDCeldas2 = mp.colshapes.newSphere(475.7543, -996.4594, 25.00599, 1.5, 0);
// var sheriffDdeposito = mp.colshapes.newSphere(391.8602, -1636.07, 29.97438, 2.0, 0);
// var sheriffDreja = mp.colshapes.newSphere(397.8851, -1607.386, 28.34166, 10.0, 0);

// //Sheriff Paleto
// var sheriffPentrada1 = mp.colshapes.newSphere(-448.7888, 6017.995, 31.86768, 3.0, 0);
// var sheriffPentrada2 = mp.colshapes.newSphere(-444.8246, 6009.003, 31.86846, 3.0, 0);
// var sheriffPparking1 = mp.colshapes.newSphere(-450.9934, 6006.035, 31.99581, 3.0, 0);
// var sheriffPparking2 = mp.colshapes.newSphere(-447.2478, 6002.291, 31.84349, 3.0, 0);
// var sheriffParmeria = mp.colshapes.newSphere(-430.4303, 5996.931, 31.86476, 3.0, 0);
// var sheriffPCeldas1 = mp.colshapes.newSphere(-442.3413, 5988.638, 31.86686, 1.5, 0);
// var sheriffPCeldas2 = mp.colshapes.newSphere(-439.4999, 5988.171, 31.86686, 1.5, 0);

// //Sheriff Sandy
// var sheriffSEntrada1 = mp.colshapes.newSphere(1857.25, 3690.302, 34.41944, 3.0, 0);
// var sheriffSEntrada2 = mp.colshapes.newSphere(1849.409, 3691.197, 34.41944, 3.0, 0);
// var sheriffSAtras = mp.colshapes.newSphere(1855.223, 3700.847, 34.41656, 3.0, 0);
// var sheriffSAccesoCeldas = mp.colshapes.newSphere(1843.921, 3687.33, 30.39675, 3.0, 0);
// var sheriffSCeldas1 = mp.colshapes.newSphere(1853.005, 3681.192, 30.39675, 3.0, 0);
// var sheriffSCeldas2 = mp.colshapes.newSphere(1853.274, 3686.4, 30.39675, 1.5, 0);

// //NOOSE
// var noosePrincipalAccesoE = mp.colshapes.newSphere(2562.6892, -320.45215, 92.65882, 5.0, 0);
// var noosePrincipalAccesoS = mp.colshapes.newSphere(2572.1892, -331.78333, 92.658005, 5.0, 0);

// var nooseCalleAccesoE = mp.colshapes.newSphere(2559.4055, -603.9037, 64.24612, 5.0, 0);
// var nooseCalleAccesoS = mp.colshapes.newSphere(2559.516, -594.6459, 64.57402, 5.0, 0);

// var motorsportMain = mp.colshapes.newSphere(-59.893, -1092.952, 26.8836, 5.0, 0);
// var motorsportParking = mp.colshapes.newSphere(-39.134, -1108.22, 26.72, 5.0, 0);
// /* 
// var prisionPrincipal_1 = mp.colshapes.newSphere(1844.998, 2604.810, 44.638, 8.0, 0);
// var prisionPrincipal_2 = mp.colshapes.newSphere(1818.542, 2604.812, 44.611, 8.0, 0);
// var prisionPrincipal_3 = mp.colshapes.newSphere(1799.608, 2616.975, 44.60325, 8.0, 0);

// // var prisionEntrada1 = mp.colshapes.newSphere(1843.396, 2592.091, 46.03888, 3.0, 0);	//**Controladas en federaldoors
// // var prisionEntrada2 = mp.colshapes.newSphere(1835.713, 2588.593, 46.03847, 3.0, 0);	//**Controladas en federaldoors
// // var prisionEntrada3 = mp.colshapes.newSphere(1835.691, 2581.962, 46.04245, 3.0, 0);	//**Controladas en federaldoors
// // var prisionEntrada4 = mp.colshapes.newSphere(1842.132, 2579.327, 46.08133, 3.0, 0);	//**Controladas en federaldoors

// var prisionPuerta_1 = mp.colshapes.newSphere(1797.761, 2596.565, 46.38731, 1.5, 0);	//** Vallas patio pasillo acceso 1
// var prisionPuerta_2 = mp.colshapes.newSphere(1798.09, 2591.687, 46.41784, 1.5, 0);	//** Vallas patio pasillo acceso 2
// var prisionPuerta_3 = mp.colshapes.newSphere(1697.4, 2543.825, 46.26889, 5.0, 0);	//** Vallas patio 1
// var prisionPuerta_4 = mp.colshapes.newSphere(1684.606, 2642.461, 46.22627, 5.0, 0);	//** Vallas patio 2

// var prisionTorre_1 = mp.colshapes.newSphere(1821.17, 2476.265, 45.68915, 2.0, 0);	//**
// var prisionTorre_2 = mp.colshapes.newSphere(1759.62, 2412.837, 45.71166, 2.0, 0);	//**
// var prisionTorre_3 = mp.colshapes.newSphere(1658.584, 2397.722, 45.71526, 2.0, 0);	//**
// var prisionTorre_4 = mp.colshapes.newSphere(1543.241, 2471.294, 45.71201, 2.0, 0);	//**
// var prisionTorre_5 = mp.colshapes.newSphere(1537.811, 2585.995, 45.68915, 2.0, 0);	//**
// var prisionTorre_6 = mp.colshapes.newSphere(1572.662, 2679.191, 45.72976, 2.0, 0);	//**
// var prisionTorre_7 = mp.colshapes.newSphere(1651.161, 2755.436, 45.87868, 2.0, 0);	//**
// var prisionTorre_8 = mp.colshapes.newSphere(1773.108, 2759.7, 45.88673, 2.0, 0);	//**
// var prisionTorre_9 = mp.colshapes.newSphere(1845.79, 2698.621, 45.95531, 2.0, 0);	//**

// var prisionPerimetro_9 = mp.colshapes.newSphere(1831.72, 2695.947, 45.44434, 10.0, 0);	//**
// var prisionPerimetro_8 = mp.colshapes.newSphere(1768.943, 2748.629, 45.4374, 10.0, 0);	//**
// var prisionPerimetro_7 = mp.colshapes.newSphere(1655.63, 2744.344, 45.4542, 10.0, 0);	//**
// var prisionPerimetro_6 = mp.colshapes.newSphere(1580.929, 2672.893, 45.48174, 10.0, 0);	//**
// var prisionPerimetro_5 = mp.colshapes.newSphere(1548.516, 2583.748, 45.40752, 10.0, 0);	//**
// var prisionPerimetro_4 = mp.colshapes.newSphere(1555.324, 2476.528, 45.39541, 10.0, 0);	//**
// var prisionPerimetro_3 = mp.colshapes.newSphere(1660.512, 2409.537, 45.41257, 10.0, 0);	//**
// var prisionPerimetro_2 = mp.colshapes.newSphere(1755.318, 2424.13, 45.42715, 10.0, 0);	//**
// var prisionPerimetro_1 = mp.colshapes.newSphere(1810.367, 2481.992, 45.45766, 10.0, 0);	//** */

// var puertoBarreras_salida_1 = mp.colshapes.newSphere(808.3141, -3153.09, 5.892638, 3.0, 0);
// var puertoBarreras_salida_2 = mp.colshapes.newSphere(804.8801, -3157.446, 5.892635, 3.0, 0);
// var puertoBarreras_salida_3 = mp.colshapes.newSphere(801.7227, -3162.029, 5.892633, 3.0, 0);
// var puertoBarreras_salida_4 = mp.colshapes.newSphere(797.7578, -3165.84, 5.892633, 3.0, 0);

// var puertoBarreras_salida_direccioncontraria = mp.colshapes.newSphere(781.599, -3109.176, 5.094823, 10.0, 0);

// var puertoBarreras_entrada_1 = mp.colshapes.newSphere(1087.188, -3316.761, 5.91512, 3.0, 0);
// var puertoBarreras_entrada_2 = mp.colshapes.newSphere(1086.569, -3323.061, 5.915119, 3.0, 0);
// var puertoBarreras_entrada_3 = mp.colshapes.newSphere(1086.432, -3329.949, 5.91512, 3.0, 0);
// var puertoBarreras_entrada_4 = mp.colshapes.newSphere(1085.943, -3335.915, 5.915119, 3.0, 0);

// var puertoBarreras_entrada_direccioncontraria = mp.colshapes.newSphere(1133.502, -3325.996, 5.190598, 10.0, 0);

// var prisionBarreras_entrada = mp.colshapes.newSphere(1901.035, 2609.949, 44.73752, 5.0, 0);
// var prisionBarreras_salida = mp.colshapes.newSphere(1901.795, 2600.985, 44.7333, 5.0, 0);
// var fuertezancudo_1_entrada = mp.colshapes.newSphere(-2313.996, 3391.046, 29.89689, 5.0, 0);
// var fuertezancudo_1_salida = mp.colshapes.newSphere(-2292.656, 3384.872, 30.68029, 5.0, 0);
// var fuertezancudo_2_entrada = mp.colshapes.newSphere(-1576.977, 2786.163, 16.94562, 5.0, 0);
// var fuertezancudo_2_salida = mp.colshapes.newSphere(-1602.534, 2803.137, 17.07932, 5.0, 0);

// // var aeropuertoPuerta_1 = mp.colshapes.newSphere(-1006.65, -2415.872, 14.19346, 50.0, 0);
// // var aeropuertoPuerta_2 = mp.colshapes.newSphere(-970.6207, -2811.567, 13.96454, 50.0, 0);
// // var aeropuertoPuerta_3 = mp.colshapes.newSphere(-1137.323, -2713.415, 13.95833, 50.0, 0);
// // var aeropuertoPuerta_4 = mp.colshapes.newSphere(-1213.4, -2079.3, 12.90274, 10.0, 0);
// // var aeropuertoPuerta_5 = mp.colshapes.newSphere(-984.079, -2348.4, 12.94479, 10.0, 0);
// var estibadores_1_entrada = mp.colshapes.newSphere(-2293.363, 3384.752, 30.05098, 5.0, 0);
// var estibadores_1_salida = mp.colshapes.newSphere(-2293.363, 3384.752, 30.05098, 5.0, 0);
// var estibadores_2_entrada = mp.colshapes.newSphere(21.71777, -2535.069, 5.050047, 5.0, 0);
// var estibadores_2_salida = mp.colshapes.newSphere(7.440769, -2536.135, 5.050046, 5.0, 0);

// //Weazel news
// var entradaW1 = mp.colshapes.newSphere(-584.7819, -931.7788, 24.0293, 2.0, 0);
// var entradaW2 = mp.colshapes.newSphere(-582.5726, -931.2073, 24.0293, 2.0, 0);
// var escaleraW = mp.colshapes.newSphere(-582.5726, -926.0486, 24.0293, 2.0, 0);
// var helipuertoW = mp.colshapes.newSphere(-568.3088, -927.1104, 37.03507, 2.0, 0);
// var lateral1W = mp.colshapes.newSphere(-588.0319, -913.019, 24.03257, 2.0, 0);
// var lateral2W = mp.colshapes.newSphere(-576.0785, -939.6045, 24.02457, 2.0, 0);

// // Cantera (job minero)
// var entradaMinero = mp.colshapes.newSphere(2568.178, 2711.073, 42.23298, 4.0, 0);


// mp.events.add('playerEnterColshape', (shape) => {
//     if (player_local.dimension == 0)
//     {
//         switch(shape)
//         {
//             //Hospital phillbox
//             case hospitalTaquillas1:
//                 esferaEsta = shape;
//                 break;
//             case hospitalTaquillas2:
//                 esferaEsta = shape;
//                 break;
//             case accesoParking:
//                 esferaEsta = shape;
//                 break;
//             case accesoQuirofanos:
//                 esferaEsta = shape;
//                 break;
//             case accesoOficinas:
//                 esferaEsta = shape;
//                 break;
//             //Comisaria mission row
//             case policeBackDoors:
//                 esferaEsta = shape;
//                 break;
//             case policeCellDoors_1:
//                 esferaEsta = shape;
//                 break;
//             case policeCellDoors_2:
//                 esferaEsta = shape;
//                 break;
//             case policeCellDoors_3:
//                 esferaEsta = shape;
//                 break;
//             case policeCellDoors1:
//                 esferaEsta = shape;
//                 break;
//             case policeCellDoors2:
//                 esferaEsta = shape;
//                 break;
//             case policeArmeria:
//                 esferaEsta = shape;
//                 break;
//             case policeRoof:
//                 esferaEsta = shape;
//                 break;
//             case policeCapitan:
//                 esferaEsta = shape;
//                 break;
//             case policeHeli:
//                 esferaEsta = shape;
//                 break;
//             case policeEscaleras:
//                 esferaEsta = shape;
//                 break;
//             case policeBackGate:
//                 esferaEsta = shape;
//                 break;
//             case policeInterrogatorios1:
//                 esferaEsta = shape;
//                 break;
//             case policeInterrogatorios2:
//                 esferaEsta = shape;
//                 break;
//             case policeInterrogatorios3:
//                 esferaEsta = shape;
//                 break;
//             case policeInterrogatorios4:
//                 esferaEsta = shape;
//                 break;
//             case policeCeldas1:
//                 esferaEsta = shape;
//                 break;
//             case policeCeldas2:
//                 esferaEsta = shape;
//                 break;
//             case policeCeldas3:
//                 esferaEsta = shape;
//                 break;
//             case policeCeldas4:
//                 esferaEsta = shape;
//                 break;
//             case policeSalidaEmpleados:
//                 esferaEsta = shape;
//                 break;
//             case policeTerrazaPiso1:
//                 esferaEsta = shape;
//                 break;
//             case policeTerrazaFumadores:
//                 esferaEsta = shape;
//                 break;
//             case policePruebas:
//                 esferaEsta = shape;
//                 break;
//             case policePruebasReja:
//                 esferaEsta = shape;
//                 break;
//             case policeServidores:
//                 esferaEsta = shape;
//                 break;
//             case policeLaboratorio:
//                 esferaEsta = shape;
//                 break;
//             case policeSalaAsignaciones:
//                 esferaEsta = shape;
//                 break;
//             //Del perro
//             case policePerroCeldas:
//                 esferaEsta = shape;
//                 break;
//             case policePerroArmeria:
//                 esferaEsta = shape;
//                 break;
//             case policePerroTaquillas:
//                 esferaEsta = shape;
//                 break;
//             case policePerroDespacho:
//                 esferaEsta = shape;
//                 break;
//             case policePerroCallejon:
//                 esferaEsta = shape;
//                 break;
//             case policePerroTrasera:
//                 esferaEsta = shape;
//                 break;
//             case policePerroCelda1:
//                 esferaEsta = shape;
//                 break;
//             case policePerroCelda2:
//                 esferaEsta = shape;
//                 break;
//             case policePerroCelda3:
//                 esferaEsta = shape;
//                 break;
//             //Sheriff davis
//             case sheriffDentrada1:
//                 esferaEsta = shape;
//                 break;
//             case sheriffDentrada2:
//                 esferaEsta = shape;
//                 break;
//             case sheriffDparking:
//                 esferaEsta = shape;
//                 break;
//             case sheriffDheli:
//                 esferaEsta = shape;
//                 break;
//             case sheriffDarmeria:
//                 esferaEsta = shape;
//                 break;
//             case sheriffDCeldas1:
//                 esferaEsta = shape;
//                 break;
//             case sheriffDCeldas2:
//                 esferaEsta = shape;
//                 break;
//             case sheriffDdeposito:
//                 esferaEsta = shape;
//                 break;
//             case sheriffDreja:
//                 esferaEsta = shape;
//                 break;
//             //Sheriff paleto
//             case sheriffPentrada1:
//                 esferaEsta = shape;
//                 break;
//             case sheriffPentrada2:
//                 esferaEsta = shape;
//                 break;
//             case sheriffPparking1:
//                 esferaEsta = shape;
//                 break;
//             case sheriffPparking2:
//                 esferaEsta = shape;
//                 break;
//             case sheriffParmeria:
//                 esferaEsta = shape;
//                 break;
//             case sheriffPCeldas1:
//                 esferaEsta = shape;
//                 break;
//             case sheriffPCeldas2:
//                 esferaEsta = shape;
//                 break;
//             //Sheriff Sandy
//             case sheriffSEntrada1:
//                 esferaEsta = shape;
//                 break;
//             case sheriffSEntrada2:
//                 esferaEsta = shape;
//                 break;
//             case sheriffSAtras:
//                 esferaEsta = shape;
//                 break;
//             case sheriffSAccesoCeldas:
//                 esferaEsta = shape;
//                 break;
//             case sheriffSCeldas1:
//                 esferaEsta = shape;
//                 break;
//             case sheriffSCeldas2:
//                 esferaEsta = shape;
//                 break;
//             //NOOSE
//             case noosePrincipalAccesoE:
//                 esferaEsta = shape;
//                 break;
//             case noosePrincipalAccesoS:
//                 esferaEsta = shape;
//                 break;
//             case nooseCalleAccesoE:
//                 esferaEsta = shape;
//                 break;
//             case nooseCalleAccesoS:
//                 esferaEsta = shape;
//                 break;
//             //Motorsport
//             case motorsportMain:
//                 esferaEsta = shape;
//                 break;
//             case motorsportParking:
//                 esferaEsta = shape;
//                 break;
//             //Prision
//             /*case prisionEntrada1:
//                 esferaEsta = shape;
//                 break;
//             case prisionEntrada2:
//                 esferaEsta = shape;
//                 break;
//             case prisionEntrada3:
//                 esferaEsta = shape;
//                 break;
//             case prisionEntrada4:
//                 esferaEsta = shape;
//                 break;*/
//             /* case prisionPrincipal_1:
//                 esferaEsta = shape;
//                 break;
//             case prisionPrincipal_2:
//                 esferaEsta = shape;
//                 break;
//             case prisionPrincipal_3:
//                 esferaEsta = shape;
//                 break;
//             case prisionPuerta_1:
//                 esferaEsta = shape;
//                 break;
//             case prisionPuerta_2:
//                 esferaEsta = shape;
//                 break;
//             case prisionPuerta_3:
//                 esferaEsta = shape;
//                 break;
//             case prisionPuerta_4:
//                 esferaEsta = shape;
//                 break;
//             case prisionTorre_1:
//                 esferaEsta = shape;
//                 break;
//             case prisionTorre_2:
//                 esferaEsta = shape;
//                 break;
//             case prisionTorre_3:
//                 esferaEsta = shape;
//                 break;
//             case prisionTorre_4:
//                 esferaEsta = shape;
//                 break;
//             case prisionTorre_5:
//                 esferaEsta = shape;
//                 break;
//             case prisionTorre_6:
//                 esferaEsta = shape;
//                 break;
//             case prisionTorre_7:
//                 esferaEsta = shape;
//                 break;
//             case prisionTorre_8:
//                 esferaEsta = shape;
//                 break;
//             case prisionTorre_9:
//                 esferaEsta = shape;
//                 break;
//             case prisionPerimetro_1:
//                 esferaEsta = shape;
//                 break;
//             case prisionPerimetro_2:
//                 esferaEsta = shape;
//                 break;
//             case prisionPerimetro_3:
//                 esferaEsta = shape;
//                 break;
//             case prisionPerimetro_4:
//                 esferaEsta = shape;
//                 break;
//             case prisionPerimetro_5:
//                 esferaEsta = shape;
//                 break;
//             case prisionPerimetro_6:
//                 esferaEsta = shape;
//                 break;
//             case prisionPerimetro_7:
//                 esferaEsta = shape;
//                 break;
//             case prisionPerimetro_8:
//                 esferaEsta = shape;
//                 break;
//             case prisionPerimetro_9:
//                 esferaEsta = shape;
//                 break;
//             case prisionBarreras_entrada:
//                 esferaEsta = shape;
//                 break;
//             case prisionBarreras_salida:
//                 esferaEsta = shape;
//                 break; */
//             //Salida puerto
//             case puertoBarreras_salida_1:
//                 esferaEsta = shape;
//                 break;
//             case puertoBarreras_salida_2:
//                 esferaEsta = shape;
//                 break;
//             case puertoBarreras_salida_3:
//                 esferaEsta = shape;
//                 break;
//             case puertoBarreras_salida_4:
//                 esferaEsta = shape;
//                 break;
//             //Entrada puerto
//             case puertoBarreras_entrada_1:
//                 esferaEsta = shape;
//                 break;
//             case puertoBarreras_entrada_2:
//                 esferaEsta = shape;
//                 break;
//             case puertoBarreras_entrada_3:
//                 esferaEsta = shape;
//                 break;
//             case puertoBarreras_entrada_4:
//                 esferaEsta = shape;
//                 break;
//             case puertoBarreras_salida_direccioncontraria:
//                 esferaEsta = shape;
//                 break;
//             case puertoBarreras_entrada_direccioncontraria:
//                 esferaEsta = shape;
//                 break;
//             //Fuerte Zancudo 
//             case fuertezancudo_1_entrada:
//                 esferaEsta = shape;
//                 break;
//             case fuertezancudo_1_salida:
//                 esferaEsta = shape;
//                 break;
//             case fuertezancudo_2_entrada:
//                 esferaEsta = shape;
//                 break;
//             case fuertezancudo_2_salida:
//                 esferaEsta = shape;
//                 break;
//             //Aeropuerto
//             /*case aeropuertoPuerta_1:
//                 esferaEsta = shape;
//                 break; 
//             case aeropuertoPuerta_2:
//                 esferaEsta = shape;
//                 break;
//             case aeropuertoPuerta_3:
//                 esferaEsta = shape;
//                 break;
//             case aeropuertoPuerta_4:
//                 esferaEsta = shape;
//                 break;
//             case aeropuertoPuerta_5:
//                 esferaEsta = shape;
//                 break;*/
//             //Estibadores puerto pier 400
//             case estibadores_1_entrada:
//                 esferaEsta = shape;
//                 break; 
//             case estibadores_1_salida:
//                 esferaEsta = shape;
//                 break;
//             case estibadores_2_entrada:
//                 esferaEsta = shape;
//                 break;
//             case estibadores_2_salida:
//                 esferaEsta = shape;
//                 break;
//             //Weazel News
//             case entradaW1:
//                 esferaEsta = shape;
//                 break; 
//             case entradaW2:
//                 esferaEsta = shape;
//                 break;
//             case escaleraW:
//                 esferaEsta = shape;
//                 break;
//             case helipuertoW:
//                 esferaEsta = shape;
//                 break;
//             case lateral1W:
//                 esferaEsta = shape;
//                 break;
//             case lateral2W:
//                 esferaEsta = shape;
//                 break;
//             case entradaMinero:
//                 esferaEsta = shape;
//                 break;
//         }
//     }

//     if (player_local.dimension == 538)
//     {
//         switch(shape)
//         {
//             case VpoliceCellDoors_1:
//                 esferaEsta = shape;
//                 break;
//             case VpoliceCellDoors_2:
//                 esferaEsta = shape;
//                 break;
//             case VpoliceCellDoors_3:
//                 esferaEsta = shape;
//                 break;
//             case VpoliceCellDoors1:
//                 esferaEsta = shape;
//                 break;
//             case VpoliceCellDoors2:
//                 esferaEsta = shape;
//                 break;
//             case VpoliceArmeria:
//                 esferaEsta = shape;
//                 break;
//             case VpoliceRoof:
//                 esferaEsta = shape;
//                 break;
//             case VpoliceCapitan:
//                 esferaEsta = shape;
//                 break;
//             case VpoliceEscaleras:
//                 esferaEsta = shape;
//                 break;
//             case VpoliceInterrogatorios1:
//                 esferaEsta = shape;
//                 break;
//             case VpoliceInterrogatorios2:
//                 esferaEsta = shape;
//                 break;
//             case VpoliceInterrogatorios3:
//                 esferaEsta = shape;
//                 break;
//             case VpoliceInterrogatorios4:
//                 esferaEsta = shape;
//                 break;
//             case VpoliceCeldas1:
//                 esferaEsta = shape;
//                 break;
//             case VpoliceCeldas2:
//                 esferaEsta = shape;
//                 break;
//             case VpoliceCeldas3:
//                 esferaEsta = shape;
//                 break;
//             case VpoliceCeldas4:
//                 esferaEsta = shape;
//                 break;
//             case VpolicePruebas:
//                 esferaEsta = shape;
//                 break;
//             case VpolicePruebasReja:
//                 esferaEsta = shape;
//                 break;
//             case VpoliceServidores:
//                 esferaEsta = shape;
//                 break;
//             case VpoliceLaboratorio:
//                 esferaEsta = shape;
//                 break;
//             case VpoliceSalaAsignaciones:
//                 esferaEsta = shape;
//                 break;
//         }
//     }

//     if (player_local.dimension == 539)
//     {
//         switch(shape)
//         {
//             case vinewoodpoliceCellDoors_1:
//                 esferaEsta = shape;
//                 break;
//             case vinewoodpoliceCellDoors_2:
//                 esferaEsta = shape;
//                 break;
//             case vinewoodpoliceCellDoors_3:
//                 esferaEsta = shape;
//                 break;
//             case vinewoodpoliceCellDoors1:
//                 esferaEsta = shape;
//                 break;
//             case vinewoodpoliceCellDoors2:
//                 esferaEsta = shape;
//                 break;
//             case vinewoodpoliceArmeria:
//                 esferaEsta = shape;
//                 break;
//             case vinewoodpoliceRoof:
//                 esferaEsta = shape;
//                 break;
//             case vinewoodpoliceCapitan:
//                 esferaEsta = shape;
//                 break;
//             case vinewoodpoliceEscaleras:
//                 esferaEsta = shape;
//                 break;
//             case vinewoodpoliceInterrogatorios1:
//                 esferaEsta = shape;
//                 break;
//             case vinewoodpoliceInterrogatorios2:
//                 esferaEsta = shape;
//                 break;
//             case vinewoodpoliceInterrogatorios3:
//                 esferaEsta = shape;
//                 break;
//             case vinewoodpoliceInterrogatorios4:
//                 esferaEsta = shape;
//                 break;
//             case vinewoodpoliceCeldas1:
//                 esferaEsta = shape;
//                 break;
//             case vinewoodpoliceCeldas2:
//                 esferaEsta = shape;
//                 break;
//             case vinewoodpoliceCeldas3:
//                 esferaEsta = shape;
//                 break;
//             case vinewoodpoliceCeldas4:
//                 esferaEsta = shape;
//                 break;
//             case vinewoodpolicePruebas:
//                 esferaEsta = shape;
//                 break;
//             case vinewoodpolicePruebasReja:
//                 esferaEsta = shape;
//                 break;
//             case vinewoodpoliceServidores:
//                 esferaEsta = shape;
//                 break;
//             case vinewoodpoliceLaboratorio:
//                 esferaEsta = shape;
//                 break;
//             case vinewoodpoliceSalaAsignaciones:
//                 esferaEsta = shape;
//                 break;
//         }
//     }
// });

// function playerExitshapeHandler(shape) {
//     if(shape == esferaEsta)
//         esferaEsta = null;
// }

// mp.events.add("playerExitColshape", playerExitshapeHandler);

// //Funcion lanzada cada tick del servidor
// setInterval(() => {
//     //Puertas de tiendas, negocios u otros

//     if (esferaEsta != null)
//     {
//         var puede_entrar_pd = false;
//         var puede_entrar_fd = false;
//         var puede_entrar_sd = false;
//         var puede_entrar_fib = false;
//         var puede_entrar_weazel = false;
//         var puede_entrar_camionero = false;
//         var puede_entrar_paramedico = false;
//         var puede_entrar_basurero = false;
//         var puede_entrar_minero = false;
//         var basurero = false;
//         var camionero = false;
//         var paramedico = false;
//         var minero = false;
//         var policia = false;
//         var sheriff = false;
//         var bombero = false;
//         var fib = false;

//         let jug = mp.controladorJugadores._jugadores[player_local.id];

//         mp.players.forEachInStreamRange((player) => {
//             if (player != player_local)
//             {
//                 let p = mp.controladorJugadores._jugadores[player.id];
//                 if (p) {
//                     if (calcDist(player.position, player_local.position) < 3.0)
//                     {
//                         /* if (p.policia) puede_entrar_pd = true;
//                         if (p.sheriff) puede_entrar_sd = true;
//                         if (p.bombero) puede_entrar_fd = true;
//                         if (p.fib) puede_entrar_fib = true;
//                         if (p.bombero) puede_entrar_weazel = true; */

//                         for (tId of p.trabajos) {
//                             if (tId == 1) puede_entrar_pd = true;
//                             if (tId == 2) puede_entrar_sd = true;
//                             if (tId == 3) puede_entrar_fd = true;
//                             if (tId == 6) puede_entrar_basurero = true;
//                             if (tId == 7) puede_entrar_camionero = true;
//                             if (tId == 16) puede_entrar_paramedico = true;
//                             if (tId == 21) puede_entrar_minero = true;
//                             if (tId == 25) puede_entrar_fib = true;
//                         }
//                     }
//                 }
//             }
//         });

//         if (jug) {
//             for (tId of jug.trabajos) {
//                 if (tId == 1) policia = true;
//                 if (tId == 2) sheriff = true;
//                 if (tId == 3) bombero = true;
//                 if (tId == 25) fib = true;
//                 if (tId == 21) minero = true;
//                 if (tId == 6) basurero = true;
//                 if (tId == 7) camionero = true;
//                 if (tId == 16) paramedico = true;
//                 if (tId == 21) minero = true;
//             }
//         }

//         if (player_local.dimension == 0)
//         {
//             if (esferaEsta == accesoParking && (bombero || puede_entrar_fd || paramedico || puede_entrar_paramedico || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("hei_prop_heist_cutscene_doorc_r"), 321.0088, -559.9609, 28.88031, false, 0.0, false);
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("hei_prop_heist_cutscene_doorc_r"), 318.7677, -561.0198, 28.88031, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("hei_prop_heist_cutscene_doorc_r"), 321.0088, -559.9609, 28.88031, true, 0.0, false);
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("hei_prop_heist_cutscene_doorc_r"), 318.7677, -561.0198, 28.88031, true, 0.0, false);
//             }

//             if (esferaEsta == accesoQuirofanos && (bombero || puede_entrar_fd || paramedico || puede_entrar_paramedico || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_cor_firedoor"), 341.392, -572.5071, 28.81897, false, 0.0, false);
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_cor_firedoor"), 342.1784, -570.3473, 28.81897, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_cor_firedoor"), 341.392, -572.5071, 28.81897, true, 0.0, false);
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_cor_firedoor"), 342.1784, -570.3473, 28.81897, true, 0.0, false);
//             }

//             if (esferaEsta == accesoOficinas && (bombero || puede_entrar_fd || paramedico || puede_entrar_paramedico || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_cor_firedoor"), 334.5754, -591.2445, 28.80277, false, 0.0, false);
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_cor_firedoor"), 333.7885, -593.4055, 28.80277, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_cor_firedoor"), 334.5754, -591.2445, 28.80277, true, 0.0, false);
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_cor_firedoor"), 333.7885, -593.4055, 28.80277, true, 0.0, false);
//             }

//             if (esferaEsta == hospitalTaquillas1 && (bombero || puede_entrar_fd || paramedico || puede_entrar_paramedico || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_cor_firedoorwide"), 332.7071, -587.7208, 28.80965, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_cor_firedoorwide"), 332.7071, -587.7208, 28.80965, true, 0.0, false);
//             }

//             if (esferaEsta == hospitalTaquillas2 && (bombero || puede_entrar_fd || paramedico || puede_entrar_paramedico || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_cor_firedoorwide"), 337.2274, -584.0469, 28.81494, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_cor_firedoorwide"), 337.2274, -584.0469, 28.81494, true, 0.0, false);
//             }

//             if (esferaEsta == policeBackDoors && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_rc_door2"), 469.9679, -1014.452, 26.53623, false, 0.0, false);
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_rc_door2"), 467.3716, -1014.452, 26.53623, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_rc_door2"), 469.9679, -1014.452, 26.53623, true, 0.0, false);
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_rc_door2"), 467.3716, -1014.452, 26.53623, true, 0.0, false);
//             }

//             if (esferaEsta == policeCellDoors_1 && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_cellgate"), 461.8065, -1001.302, 25.06443, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_cellgate"), 461.8065, -1001.302, 25.06443, true, 0.0, false);
//             }

//             if (esferaEsta == policeCellDoors_2 && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_cellgate"), 461.8065, -997.6583, 25.06443, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_cellgate"), 461.8065, -997.6583, 25.06443, true, 0.0, false);
//             }

//             if (esferaEsta == policeCellDoors_3 && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_cellgate"), 461.8065, -994.4086, 25.06443, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_cellgate"), 461.8065, -994.4086, 25.06443, true, 0.0, false);
//             }

//             if (esferaEsta == policeCellDoors1 && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 463.4782, -1003.538, 25.00599, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 463.4782, -1003.538, 25.00599, true, 0.0, false);
//             }

//             if (esferaEsta == policeCellDoors2 && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_cellgate"), 464.5701, -992.6641, 25.06443, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_cellgate"), 464.5701, -992.6641, 25.06443, true, 0.0, false);
//             }

//             //if (esferaEsta == policeCellDoors3 && (policia || sheriff || fib || puede_entrar_pd || adminservicio))
//             //{
//             //    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor005"), 465.5726, -991.3001, 25.06754, false, 0.0, false);
//             //    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor005"), 465.5659, -988.704, 25.06754, false, 0.0, false);
//             //}
//             //else
//             //{
//             //    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor005"), 465.5726, -991.3001, 25.06754, true, 0.0, false);
//             //    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor005"), 465.5659, -988.704, 25.06754, true, 0.0, false);
//             //}

//             if (esferaEsta == policeArmeria && (policia || puede_entrar_pd || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 453.0938, -983.2294, 30.83927, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 453.0938, -983.2294, 30.83927, true, 0.0, false);
//             }

//             if (esferaEsta == policeRoof && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor004"), 449.698, -986.469, 30.689, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor004"), 449.698, -986.469, 30.689, true, 0.0, false);
//             }

//             if (esferaEsta == policeCapitan && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor002"), 447.238, -980.630, 30.689, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor002"), 447.238, -980.630, 30.689, true, 0.0, false);
//             }

//             if (esferaEsta == policeHeli && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor02"), 464.361, -984.678, 43.834, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor02"), 464.361, -984.678, 43.834, true, 0.0, false);
//             }


//             if (esferaEsta == policeEscaleras && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor005"), 443.97, -989.033, 30.6896, false, 0.0, false);
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor005"), 445.37, -988.705, 30.6896, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor005"), 443.97, -989.033, 30.6896, true, 0.0, false);
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor005"), 445.37, -988.705, 30.6896, true, 0.0, false);
//             }

//             if (esferaEsta == policeBackGate && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("hei_prop_station_gate"), 488.894, -1017.210, 27.146, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("hei_prop_station_gate"), 488.894, -1017.210, 27.146, true, 0.0, false);
//             }

//             if (esferaEsta == policeCeldas1 && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 480.0301, -996.4594, 25.00599, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 480.0301, -996.4594, 25.00599, true, 0.0, false);
//             }

//             if (esferaEsta == policeCeldas2 && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 475.7543, -996.4594, 25.00599, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 475.7543, -996.4594, 25.00599, true, 0.0, false);
//             }

//             if (esferaEsta == policeCeldas3 && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 471.4755, -996.4594, 25.00599, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 471.4755, -996.4594, 25.00599, true, 0.0, false);
//             }

//             if (esferaEsta == policeCeldas4 && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 467.1922, -996.4594, 25.00599, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 467.1922, -996.4594, 25.00599, true, 0.0, false);
//             }

//             if (esferaEsta == policeInterrogatorios1 && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 468.4872, -1003.548, 25.01314, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 468.4872, -1003.548, 25.01314, true, 0.0, false);
//             }

//             if (esferaEsta == policeInterrogatorios2 && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 471.4747, -1003.538, 25.01223, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 471.4747, -1003.538, 25.01223, true, 0.0, false);
//             }

//             if (esferaEsta == policeInterrogatorios3 && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 477.0497, -1003.553, 25.01203, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 477.0497, -1003.553, 25.01203, true, 0.0, false);
//             }

//             if (esferaEsta == policeInterrogatorios4 && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 480.0301, -1003.538, 25.00599, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 480.0301, -1003.538, 25.00599, true, 0.0, false);
//             }

//             if (esferaEsta == policeSalidaEmpleados && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 444.6212, -999.001, 30.78866, false, 0.0, false);
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 447.2184, -999.0023, 30.78942, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 444.6212, -999.001, 30.78866, true, 0.0, false);
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 447.2184, -999.0023, 30.78942, true, 0.0, false);
//             }

//             if (esferaEsta == policeTerrazaPiso1 && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("slb2k11_glassdoor"), 429.2023, -994.0486, 36.16876, false, 0.0, false);
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("slb2k11_glassdoor"), 429.1714, -996.226, 36.16876, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("slb2k11_glassdoor"), 429.2023, -994.0486, 36.16876, true, 0.0, false);
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("slb2k11_glassdoor"), 429.1714, -996.226, 36.16876, true, 0.0, false);
//             }

//             if (esferaEsta == policeTerrazaFumadores && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("slb2k11_secdoor"), 464.1584, -1011.26, 33.01121, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("slb2k11_secdoor"), 464.1584, -1011.26, 33.01121, true, 0.0, false);
//             }

//             if (esferaEsta == policePruebas && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor006"), 471.3154, -986.1091, 25.05795, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor006"), 471.3154, -986.1091, 25.05795, true, 0.0, false);
//             }

//             if (esferaEsta == policePruebasReja && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_fnclink_02gate7"), 475.4744, -987.0256, 25.22698, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_fnclink_02gate7"), 475.4744, -987.0256, 25.22698, true, 0.0, false);
//             }

//             if (esferaEsta == policeServidores && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor006"), 467.5936, -977.9933, 25.05795, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor006"), 467.5936, -977.9933, 25.05795, true, 0.0, false);
//             }

//             if (esferaEsta == policeLaboratorio && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor006"), 463.6146, -980.5814, 25.05795, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor006"), 463.6146, -980.5814, 25.05795, true, 0.0, false);
//             }

//             if (esferaEsta == policeSalaAsignaciones && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor003"), 470.0208, -1009.146, 26.54046, false, 0.0, false);
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor003"), 470.0161, -1011.742, 26.54046, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor003"), 470.0208, -1009.146, 26.54046, true, 0.0, false);
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor003"), 470.0161, -1011.742, 26.54046, true, 0.0, false);
//             }

//             if (esferaEsta == sheriffDentrada1 && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor002"), 366.1795, -1588.067, 29.4472, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor002"), 366.1795, -1588.067, 29.4472, true, 0.0, false);
//             }

//             if (esferaEsta == sheriffDentrada2 && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor002"), 362.3821, -1592.574, 29.44673, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor002"), 362.3821, -1592.574, 29.44673, true, 0.0, false);
//             }

//             //if (esferaEsta == sheriffDparking && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             //{
//             //    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_shrf2door"), 369.8871, -1606.262, 29.43038, false, 0.0, false);
//             //    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_shrf2door"), 368.2126, -1608.242, 29.43038, false, 0.0, false);
//             //}
//             //else
//             //{
//             //    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_shrf2door"), 369.8871, -1606.262, 29.43038, true, 0.0, false);
//             //    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_shrf2door"), 368.2126, -1608.242, 29.43038, true, 0.0, false);
//             //}

//             if (esferaEsta == sheriffDheli && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_arm_secdoor"), 378.626, -1602.415, 37.09682, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_arm_secdoor"), 378.626, -1602.415, 37.09682, true, 0.0, false);
//             }

//             if (esferaEsta == sheriffDarmeria && (sheriff || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_arm_secdoor"), 371.3193, -1600.113, 29.44226, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_arm_secdoor"), 371.3193, -1600.113, 29.44226, true, 0.0, false);
//             }

//             if (esferaEsta == sheriffDCeldas1 && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_cellgate"), 364.3318, -1607.284, 29.44279, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_cellgate"), 364.3318, -1607.284, 29.44279, true, 0.0, false);
//             }

//             if (esferaEsta == sheriffDCeldas2 && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_cellgate"), 355.4299, -1599.832, 29.44279, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_cellgate"), 355.4299, -1599.832, 29.44279, true, 0.0, false);
//             }

//             if (esferaEsta == sheriffDdeposito && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_fnclink_03gate5"), 391.8602, -1636.07, 29.97438, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_fnclink_03gate5"), 391.8602, -1636.07, 29.97438, true, 0.0, false);
//             }

//             if (esferaEsta == sheriffDreja && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_facgate_07b"), 397.8851, -1607.386, 28.34166, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_facgate_07b"), 397.8851, -1607.386, 28.34166, true, 0.0, false);
//             }

//             if (esferaEsta == sheriffPentrada1 && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor002"), -448.7888, 6017.995, 31.86768, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor002"), -448.7888, 6017.995, 31.86768, true, 0.0, false);
//             }

//             if (esferaEsta == sheriffPentrada2 && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor002"), -444.8246, 6009.003, 31.86846, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor002"), -444.8246, 6009.003, 31.86846, true, 0.0, false);
//             }

//             if (esferaEsta == sheriffPparking1 && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor002"), -450.9934, 6006.035, 31.99581, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor002"), -450.9934, 6006.035, 31.99581, true, 0.0, false);
//             }

//             if (esferaEsta == sheriffPparking2 && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor002"), -447.2478, 6002.291, 31.84349, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor002"), -447.2478, 6002.291, 31.84349, true, 0.0, false);
//             }

//             if (esferaEsta == sheriffParmeria && (sheriff || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor002"), -430.4303, 5996.931, 31.86476, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor002"), -430.4303, 5996.931, 31.86476, true, 0.0, false);
//             }

//             if (esferaEsta == sheriffPCeldas1 && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_cellgate"), -442.3413, 5988.638, 31.86686, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_cellgate"), -442.3413, 5988.638, 31.86686, true, 0.0, false);
//             }

//             if (esferaEsta == sheriffPCeldas2 && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_cellgate"), -439.4999, 5988.171, 31.86686, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_cellgate"), -439.4999, 5988.171, 31.86686, true, 0.0, false);
//             }

//             //Sheriff Sandy
//             if (esferaEsta == sheriffSEntrada1 && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio)) {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor004"), 1857.25, 3690.302, 34.41944, false, 0.0, false);
//             }
//             else {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor004"), 1857.25, 3690.302, 34.41944, true, 0.0, false);
//             }
//             if (esferaEsta == sheriffSEntrada2 && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio)) {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor004"), 1849.409, 3691.197, 34.41944, false, 0.0, false);
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor004"), 1847.149, 3689.907, 34.41944, false, 0.0, false);
//             }
//             else {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor004"), 1849.409, 3691.197, 34.41944, true, 0.0, false);
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor004"), 1847.149, 3689.907, 34.41944, true, 0.0, false);
//             }
//             if (esferaEsta == sheriffSAtras && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio)) {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_rc_door2"), 1855.223, 3700.847, 34.41656, false, 0.0, false);
//             }
//             else {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_rc_door2"), 1855.223, 3700.847, 34.41656, true, 0.0, false);
//             }
//             if (esferaEsta == sheriffSAccesoCeldas && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio)) {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_cellgate"), 1843.921, 3687.33, 30.39675, false, 0.0, false);
//             }
//             else {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_cellgate"), 1843.921, 3687.33, 30.39675, true, 0.0, false);
//             }
//             if (esferaEsta == sheriffSCeldas1 && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio)) {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_cellgate"), 1853.005, 3681.192, 30.39675, false, 0.0, false);
//             }
//             else {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_cellgate"), 1853.005, 3681.192, 30.39675, true, 0.0, false);
//             }
//             if (esferaEsta == sheriffSCeldas2 && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio)) {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_cellgate"), 1853.274, 3686.4, 30.39675, false, 0.0, false);
//             }
//             else {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_cellgate"), 1853.274, 3686.4, 30.39675, true, 0.0, false);
//             }
//             //NOOOSE PRINCIPAL ACCESO
//             if (esferaEsta == noosePrincipalAccesoE && (policia || sheriff || fib || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio)) {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_gate_military_01"), 2567.51900000, -325.95020000, 91.92173000, false, 0.0, false);
//             }
//             else {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_gate_military_01"), 2567.51900000, -325.95020000, 91.92173000, true, 0.0, false);
//             }
//             if (esferaEsta == noosePrincipalAccesoS && (policia || sheriff || fib || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio)) {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_gate_military_01"), 2567.53500000, -326.19300000, 91.92173000, false, 0.0, false);
//             }
//             else {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_gate_military_01"), 2567.53500000, -326.19300000, 91.92173000, true, 0.0, false);
//             }
//             //Del perro
//             if (esferaEsta == policePerroCeldas && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_fingate"), -1623.206, -1023.574, 13.38294, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_fingate"), -1623.206, -1023.574, 13.38294, true, 0.0, false);
//             }

//             if (esferaEsta == policePerroArmeria && (policia || puede_entrar_pd || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_rc_door2"), -1622.842, -1028.836, 13.30352, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_rc_door2"), -1622.842, -1028.836, 13.30352, true, 0.0, false);
//             }

//             if (esferaEsta == policePerroTaquillas && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_rc_door2"), -1625.096, -1031.473, 13.30352, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_rc_door2"), -1625.096, -1031.473, 13.30352, true, 0.0, false);
//             }

//             if (esferaEsta == policePerroDespacho && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_rc_door2"), -1621.616, -1019.449, 13.30352, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_rc_door2"), -1621.616, -1019.449, 13.30352, true, 0.0, false);
//             }


//             if (esferaEsta == policePerroCallejon && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_rc_door2"), -1633.069, -1028.729, 13.30352, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_rc_door2"), -1633.069, -1028.729, 13.30352, true, 0.0, false);
//             }

//             if (esferaEsta == policePerroTrasera && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_rc_door2"), -1613.315, -1027.257, 13.30352, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_rc_door2"), -1613.315, -1027.257, 13.30352, true, 0.0, false);
//             }

//             if (esferaEsta == policePerroCelda1 && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_fingate"), -1616.468, -1024.005, 13.38294, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_fingate"), -1616.468, -1024.005, 13.38294, true, 0.0, false);
//             }
//             if (esferaEsta == policePerroCelda2 && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_fingate"), -1614.536, -1021.707, 13.38294, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_fingate"), -1614.536, -1021.707, 13.38294, true, 0.0, false);
//             }
//             if (esferaEsta == policePerroCelda3 && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_fingate"), -1609.969, -1023.357, 13.38294, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_fingate"), -1609.969, -1023.357, 13.38294, true, 0.0, false);
//             }
//             if (esferaEsta == entradaMinero && (puede_entrar_minero || minero))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_sec_barrier_ld_01a"), 2566.823, 2713.83, 42.48776, false, 5.0, false);
//             } else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_sec_barrier_ld_01a"), 2566.823, 2713.83, 42.48776, true, 0.0, false);
//             }
//         }

//         if (player_local.dimension == 538)
//         {
//             //Vespucci comisaria
//             if (esferaEsta == VpoliceCellDoors_1 && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_cellgate"), 461.8065, -1001.302, 25.06443, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_cellgate"), 461.8065, -1001.302, 25.06443, true, 0.0, false);
//             }

//             if (esferaEsta == VpoliceCellDoors_2 && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_cellgate"), 461.8065, -997.6583, 25.06443, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_cellgate"), 461.8065, -997.6583, 25.06443, true, 0.0, false);
//             }

//             if (esferaEsta == VpoliceCellDoors_3 && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_cellgate"), 461.8065, -994.4086, 25.06443, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_cellgate"), 461.8065, -994.4086, 25.06443, true, 0.0, false);
//             }

//             if (esferaEsta == VpoliceCellDoors1 && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 463.4782, -1003.538, 25.00599, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 463.4782, -1003.538, 25.00599, true, 0.0, false);
//             }

//             if (esferaEsta == VpoliceCellDoors2 && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_cellgate"), 464.5701, -992.6641, 25.06443, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_cellgate"), 464.5701, -992.6641, 25.06443, true, 0.0, false);
//             }

//             //if (esferaEsta == VpoliceCellDoors3 && (policia || sheriff || fib || puede_entrar_pd || adminservicio))
//             //{
//             //    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor005"), 465.5726, -991.3001, 25.06754, false, 0.0, false);
//             //    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor005"), 465.5659, -988.704, 25.06754, false, 0.0, false);
//             //}
//             //else
//             //{
//             //    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor005"), 465.5726, -991.3001, 25.06754, true, 0.0, false);
//             //    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor005"), 465.5659, -988.704, 25.06754, true, 0.0, false);
//             //}

//             if (esferaEsta == VpoliceArmeria && (policia || puede_entrar_pd || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 453.0938, -983.2294, 30.83927, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 453.0938, -983.2294, 30.83927, true, 0.0, false);
//             }

//             if (esferaEsta == VpoliceRoof && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor004"), 449.698, -986.469, 30.689, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor004"), 449.698, -986.469, 30.689, true, 0.0, false);
//             }

//             if (esferaEsta == VpoliceCapitan && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor002"), 447.238, -980.630, 30.689, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor002"), 447.238, -980.630, 30.689, true, 0.0, false);
//             }

//             if (esferaEsta == VpoliceEscaleras && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor005"), 443.97, -989.033, 30.6896, false, 0.0, false);
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor005"), 445.37, -988.705, 30.6896, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor005"), 443.97, -989.033, 30.6896, true, 0.0, false);
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor005"), 445.37, -988.705, 30.6896, true, 0.0, false);
//             }


//             if (esferaEsta == VpoliceCeldas1 && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 480.0301, -996.4594, 25.00599, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 480.0301, -996.4594, 25.00599, true, 0.0, false);
//             }

//             if (esferaEsta == VpoliceCeldas2 && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 475.7543, -996.4594, 25.00599, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 475.7543, -996.4594, 25.00599, true, 0.0, false);
//             }

//             if (esferaEsta == VpoliceCeldas3 && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 471.4755, -996.4594, 25.00599, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 471.4755, -996.4594, 25.00599, true, 0.0, false);
//             }

//             if (esferaEsta == VpoliceCeldas4 && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 467.1922, -996.4594, 25.00599, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 467.1922, -996.4594, 25.00599, true, 0.0, false);
//             }

//             if (esferaEsta == VpoliceInterrogatorios1 && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 468.4872, -1003.548, 25.01314, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 468.4872, -1003.548, 25.01314, true, 0.0, false);
//             }

//             if (esferaEsta == VpoliceInterrogatorios2 && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 471.4747, -1003.538, 25.01223, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 471.4747, -1003.538, 25.01223, true, 0.0, false);
//             }

//             if (esferaEsta == VpoliceInterrogatorios3 && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 477.0497, -1003.553, 25.01203, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 477.0497, -1003.553, 25.01203, true, 0.0, false);
//             }

//             if (esferaEsta == VpoliceInterrogatorios4 && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 480.0301, -1003.538, 25.00599, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 480.0301, -1003.538, 25.00599, true, 0.0, false);
//             }

//             if (esferaEsta == VpolicePruebas && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor006"), 471.3154, -986.1091, 25.05795, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor006"), 471.3154, -986.1091, 25.05795, true, 0.0, false);
//             }

//             if (esferaEsta == VpolicePruebasReja && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_fnclink_02gate7"), 475.4744, -987.0256, 25.22698, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_fnclink_02gate7"), 475.4744, -987.0256, 25.22698, true, 0.0, false);
//             }

//             if (esferaEsta == VpoliceServidores && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor006"), 467.5936, -977.9933, 25.05795, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor006"), 467.5936, -977.9933, 25.05795, true, 0.0, false);
//             }

//             if (esferaEsta == VpoliceLaboratorio && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor006"), 463.6146, -980.5814, 25.05795, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor006"), 463.6146, -980.5814, 25.05795, true, 0.0, false);
//             }

//             if (esferaEsta == VpoliceSalaAsignaciones && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor003"), 470.0208, -1009.146, 26.54046, false, 0.0, false);
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor003"), 470.0161, -1011.742, 26.54046, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor003"), 470.0208, -1009.146, 26.54046, true, 0.0, false);
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor003"), 470.0161, -1011.742, 26.54046, true, 0.0, false);
//             }
//         }

//         if (player_local.dimension == 539)
//         {
//             //Vinewood comisaria
//             if (esferaEsta == vinewoodpoliceCellDoors_1 && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_cellgate"), 461.8065, -1001.302, 25.06443, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_cellgate"), 461.8065, -1001.302, 25.06443, true, 0.0, false);
//             }

//             if (esferaEsta == vinewoodpoliceCellDoors_2 && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_cellgate"), 461.8065, -997.6583, 25.06443, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_cellgate"), 461.8065, -997.6583, 25.06443, true, 0.0, false);
//             }

//             if (esferaEsta == vinewoodpoliceCellDoors_3 && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_cellgate"), 461.8065, -994.4086, 25.06443, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_cellgate"), 461.8065, -994.4086, 25.06443, true, 0.0, false);
//             }

//             if (esferaEsta == vinewoodpoliceCellDoors1 && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 463.4782, -1003.538, 25.00599, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 463.4782, -1003.538, 25.00599, true, 0.0, false);
//             }

//             if (esferaEsta == vinewoodpoliceCellDoors2 && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_cellgate"), 464.5701, -992.6641, 25.06443, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_cellgate"), 464.5701, -992.6641, 25.06443, true, 0.0, false);
//             }

//             //if (esferaEsta == VpoliceCellDoors3 && (policia || sheriff || fib || puede_entrar_pd || adminservicio))
//             //{
//             //    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor005"), 465.5726, -991.3001, 25.06754, false, 0.0, false);
//             //    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor005"), 465.5659, -988.704, 25.06754, false, 0.0, false);
//             //}
//             //else
//             //{
//             //    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor005"), 465.5726, -991.3001, 25.06754, true, 0.0, false);
//             //    mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor005"), 465.5659, -988.704, 25.06754, true, 0.0, false);
//             //}

//             if (esferaEsta == vinewoodpoliceArmeria && (policia || puede_entrar_pd || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 453.0938, -983.2294, 30.83927, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 453.0938, -983.2294, 30.83927, true, 0.0, false);
//             }

//             if (esferaEsta == vinewoodpoliceRoof && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor004"), 449.698, -986.469, 30.689, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor004"), 449.698, -986.469, 30.689, true, 0.0, false);
//             }

//             if (esferaEsta == vinewoodpoliceCapitan && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor002"), 447.238, -980.630, 30.689, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor002"), 447.238, -980.630, 30.689, true, 0.0, false);
//             }

//             if (esferaEsta == vinewoodpoliceEscaleras && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor005"), 443.97, -989.033, 30.6896, false, 0.0, false);
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor005"), 445.37, -988.705, 30.6896, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor005"), 443.97, -989.033, 30.6896, true, 0.0, false);
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor005"), 445.37, -988.705, 30.6896, true, 0.0, false);
//             }


//             if (esferaEsta == vinewoodpoliceCeldas1 && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 480.0301, -996.4594, 25.00599, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 480.0301, -996.4594, 25.00599, true, 0.0, false);
//             }

//             if (esferaEsta == vinewoodpoliceCeldas2 && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 475.7543, -996.4594, 25.00599, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 475.7543, -996.4594, 25.00599, true, 0.0, false);
//             }

//             if (esferaEsta == vinewoodpoliceCeldas3 && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 471.4755, -996.4594, 25.00599, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 471.4755, -996.4594, 25.00599, true, 0.0, false);
//             }

//             if (esferaEsta == vinewoodpoliceCeldas4 && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 467.1922, -996.4594, 25.00599, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 467.1922, -996.4594, 25.00599, true, 0.0, false);
//             }

//             if (esferaEsta == vinewoodpoliceInterrogatorios1 && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 468.4872, -1003.548, 25.01314, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 468.4872, -1003.548, 25.01314, true, 0.0, false);
//             }

//             if (esferaEsta == vinewoodpoliceInterrogatorios2 && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 471.4747, -1003.538, 25.01223, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 471.4747, -1003.538, 25.01223, true, 0.0, false);
//             }

//             if (esferaEsta == vinewoodpoliceInterrogatorios3 && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 477.0497, -1003.553, 25.01203, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 477.0497, -1003.553, 25.01203, true, 0.0, false);
//             }

//             if (esferaEsta == vinewoodpoliceInterrogatorios4 && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 480.0301, -1003.538, 25.00599, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 480.0301, -1003.538, 25.00599, true, 0.0, false);
//             }

//             if (esferaEsta == vinewoodpolicePruebas && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor006"), 471.3154, -986.1091, 25.05795, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor006"), 471.3154, -986.1091, 25.05795, true, 0.0, false);
//             }

//             if (esferaEsta == vinewoodpolicePruebasReja && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_fnclink_02gate7"), 475.4744, -987.0256, 25.22698, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_fnclink_02gate7"), 475.4744, -987.0256, 25.22698, true, 0.0, false);
//             }

//             if (esferaEsta == vinewoodpoliceServidores && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor006"), 467.5936, -977.9933, 25.05795, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor006"), 467.5936, -977.9933, 25.05795, true, 0.0, false);
//             }

//             if (esferaEsta == vinewoodpoliceLaboratorio && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor006"), 463.6146, -980.5814, 25.05795, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor006"), 463.6146, -980.5814, 25.05795, true, 0.0, false);
//             }

//             if (esferaEsta == vinewoodpoliceSalaAsignaciones && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor003"), 470.0208, -1009.146, 26.54046, false, 0.0, false);
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor003"), 470.0161, -1011.742, 26.54046, false, 0.0, false);
//             }
//             else
//             {
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor003"), 470.0208, -1009.146, 26.54046, true, 0.0, false);
//                 mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor003"), 470.0161, -1011.742, 26.54046, true, 0.0, false);
//             }
//         }

//         if (esferaEsta == nooseCalleAccesoE) {
//             mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_sec_barrier_ld_02a"), 2562.322, -600.1516, 64.95991, false, 0.0, false);
//         }

//         if (esferaEsta == nooseCalleAccesoS) {
//             mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_sec_barrier_ld_02a"), 2555.614, -598.545, 64.70138, false, 0.0, false);
//         }

//         if (esferaEsta == motorsportMain)
//         {
//             mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_csr_door_l"), -59.89302, -1092.952, 26.88362, false, 0.0, false);
//             mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_csr_door_r"), -60.54582, -1094.749, 26.88872, false, 0.0, false);
//         }

//         if (esferaEsta == motorsportParking)
//         {
//             mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_csr_door_l"), -39.13366, -1108.218, 26.7198, false, 0.0, false);
//             mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_csr_door_r"), -37.33113, -1108.873, 26.7198, false, 0.0, false);
//         }

//         //Salida puerto
//         if (esferaEsta == puertoBarreras_salida_direccioncontraria)
//         {
//             //Barreras puerto cerradas siempre (Salida)
//             mp.game.object.setStateOfClosestDoorOfType(1230099731, 801.6791, -3150.104, 5.911598, true, 0.0, false);
//             mp.game.object.setStateOfClosestDoorOfType(1230099731, 797.4149, -3153.948, 5.911598, true, 0.0, false);
//             mp.game.object.setStateOfClosestDoorOfType(1230099731, 793.2574, -3157.738, 5.920921, true, 0.0, false);
//             mp.game.object.setStateOfClosestDoorOfType(1230099731, 788.4861, -3161.815, 5.924423, true, 0.0, false);
//         }

//         if (esferaEsta == puertoBarreras_salida_1 && (camionero || puede_entrar_camionero || basurero || puede_entrar_basurero || puede_entrar_fd || policia || sheriff || fib || bombero || adminservicio))
//         {
//             mp.game.object.setStateOfClosestDoorOfType(1230099731, 801.6791, -3150.104, 5.911598, false, 5.0, false);
//         }
//         else
//         {
//             mp.game.object.setStateOfClosestDoorOfType(1230099731, 801.6791, -3150.104, 5.911598, true, 0.0, false);
//         }

//         if (esferaEsta == puertoBarreras_salida_2 && (camionero || puede_entrar_camionero || basurero || puede_entrar_basurero|| puede_entrar_fd || policia || sheriff || fib || bombero || adminservicio))
//         {
//             mp.game.object.setStateOfClosestDoorOfType(1230099731, 797.4149, -3153.948, 5.911598, false, 5.0, false);
//         }
//         else
//         {
//             mp.game.object.setStateOfClosestDoorOfType(1230099731, 797.4149, -3153.948, 5.911598, true, 0.0, false);
//         }

//         if (esferaEsta == puertoBarreras_salida_3 && (camionero || puede_entrar_camionero || basurero || puede_entrar_basurero|| puede_entrar_fd || policia || sheriff || fib || bombero || adminservicio))
//         {
//             mp.game.object.setStateOfClosestDoorOfType(1230099731, 793.2574, -3157.738, 5.920921, false, 5.0, false);
//         }
//         else
//         {
//             mp.game.object.setStateOfClosestDoorOfType(1230099731, 793.2574, -3157.738, 5.920921, true, 0.0, false);
//         }

//         if (esferaEsta == puertoBarreras_salida_4 && (camionero || puede_entrar_camionero || basurero || puede_entrar_basurero|| puede_entrar_fd || policia || sheriff || fib || bombero || adminservicio))
//         {
//             mp.game.object.setStateOfClosestDoorOfType(1230099731, 788.4861, -3161.815, 5.924423, false, 5.0, false);
//         }
//         else
//         {
//             mp.game.object.setStateOfClosestDoorOfType(1230099731, 788.4861, -3161.815, 5.924423, true, 0.0, false);
//         }

//         //Entrada puerto
//         if (esferaEsta == puertoBarreras_entrada_direccioncontraria)
//         {
//             //Barreras puerto cerradas siempre (Entrada)
//             mp.game.object.setStateOfClosestDoorOfType(1230099731, 1095.702, -3313.123, 5.849754, true, 0.0, false);
//             mp.game.object.setStateOfClosestDoorOfType(1230099731, 1095.532, -3320.142, 5.835983, true, 0.0, false);
//             mp.game.object.setStateOfClosestDoorOfType(1230099731, 1095.523, -3326.43, 5.835983, true, 0.0, false);
//             mp.game.object.setStateOfClosestDoorOfType(1230099731, 1095.464, -3333.108, 5.835983, true, 0.0, false);
//         }

//         if (esferaEsta == puertoBarreras_entrada_1 && (camionero || puede_entrar_camionero || basurero || puede_entrar_basurero|| puede_entrar_fd || policia || sheriff || fib || bombero || adminservicio))
//         {
//             mp.game.object.setStateOfClosestDoorOfType(1230099731, 1095.702, -3313.123, 5.849754, false, 3.0, false);
//         }
//         else
//         {
//             mp.game.object.setStateOfClosestDoorOfType(1230099731, 1095.702, -3313.123, 5.849754, true, 0.0, false);
//         }

//         if (esferaEsta == puertoBarreras_entrada_2 && (camionero || puede_entrar_camionero || basurero || puede_entrar_basurero|| puede_entrar_fd || policia || sheriff || fib || bombero || adminservicio))
//         {
//             mp.game.object.setStateOfClosestDoorOfType(1230099731, 1095.532, -3320.142, 5.835983, false, 3.0, false);
//         }
//         else
//         {
//             mp.game.object.setStateOfClosestDoorOfType(1230099731, 1095.532, -3320.142, 5.835983, true, 0.0, false);
//         }

//         if (esferaEsta == puertoBarreras_entrada_3 && (camionero || puede_entrar_camionero || basurero || puede_entrar_basurero|| puede_entrar_fd || policia || sheriff || fib || bombero || adminservicio))
//         {
//             mp.game.object.setStateOfClosestDoorOfType(1230099731, 1095.523, -3326.43, 5.835983, false, 3.0, false);
//         }
//         else
//         {
//             mp.game.object.setStateOfClosestDoorOfType(1230099731, 1095.523, -3326.43, 5.835983, true, 0.0, false);
//         }

//         if (esferaEsta == puertoBarreras_entrada_4 && (camionero || puede_entrar_camionero || basurero || puede_entrar_basurero|| puede_entrar_fd || policia || sheriff || fib || bombero || adminservicio))
//         {
//             mp.game.object.setStateOfClosestDoorOfType(1230099731, 1095.464, -3333.108, 5.835983, false, 3.0, false);
//         }
//         else
//         {
//             mp.game.object.setStateOfClosestDoorOfType(1230099731, 1095.464, -3333.108, 5.835983, true, 0.0, false);
//         }

//         //Prision
//         if (esferaEsta == prisionBarreras_entrada)
//         {
//             mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_sec_barrier_ld_01a"), 1896.738, 2606.179, 45.70928, false, 5.0, false);
//         }

//         if (esferaEsta == prisionBarreras_salida)
//         {
//             mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_sec_barrier_ld_01a"), 1905.117, 2604.783, 45.78228, false, 5.0, false);
//         }

//         //Fuerte Zancudo 
//         if (esferaEsta == fuertezancudo_1_entrada && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//         {
//             mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_sec_barrier_ld_01a"), -2307.562, 3390.592, 30.997, false, 3.0, false);
//         }
//         else
//         {
//             mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_sec_barrier_ld_01a"), -2307.562, 3390.592, 30.997, true, 0.0, false);
//         }
//         if (esferaEsta == fuertezancudo_1_salida && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//         {
//             mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_sec_barrier_ld_01a"), -2299.742, 3385.038, 30.05252, false, 3.0, false);
//         }
//         else
//         {
//             mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_sec_barrier_ld_01a"), -2299.742, 3385.038, 30.05252, true, 0.0, false);
//         }

//         if (esferaEsta == fuertezancudo_2_entrada && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//         {
//             mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_sec_barrier_ld_01a"), -1588.267, 2794.213, 16.84719, false, 5.0, false);
//         }
//         else
//         {
//             mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_sec_barrier_ld_01a"), -1588.267, 2794.213, 16.84719, true, 0.0, false);
//         }
//         if (esferaEsta == fuertezancudo_2_salida && (policia || sheriff || fib || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio))
//         {
//             mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_sec_barrier_ld_01a"), -1589.583, 2793.671, 16.85906, false, 5.0, false);
//         }
//         else
//         {
//             mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_sec_barrier_ld_01a"), -1589.583, 2793.671, 16.85906, true, 0.0, false);
//         }

//         //Aeropuerto
//         /*if (esferaEsta == aeropuertoPuerta_1 && (policia || sheriff || fib || sheriff || bombero || puede_entrar_fd || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio || camionero || puede_entrar_camionero || puede_entrar_weazel))
//         {
//             mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_sec_barrier_ld_01a"), -999.3287, -2419.309, 13.95796, false, 3.0, false);
//             mp.game.object.setStateOfClosestDoorOfType(725274945, -1008.069, -2406.75, 12.97592, false, 0.0, false);
//             mp.game.object.setStateOfClosestDoorOfType(725274945, -1015.485, -2419.585, 12.95762, false, 0.0, false);
//         }
//         else
//         {
//             mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_sec_barrier_ld_01a"), -999.3287, -2419.309, 13.95796, true, 0.0, false);
//             mp.game.object.setStateOfClosestDoorOfType(725274945, -1008.069, -2406.75, 12.97592, true, 0.0, false);
//             mp.game.object.setStateOfClosestDoorOfType(725274945, -1015.485, -2419.585, 12.95762, true, 0.0, false);
//         }

//         if (esferaEsta == aeropuertoPuerta_2 && (policia || sheriff || fib || sheriff || bombero || puede_entrar_fd  || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio || camionero || puede_entrar_camionero || puede_entrar_weazel))
//         {
//             mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_sec_barrier_ld_01a"), -967.0093, -2802.45, 13.9571, false, 3.0, false);
//             mp.game.object.setStateOfClosestDoorOfType(725274945, -990.2963, -2829.887, 12.94986, false, 0.0, false);
//             mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_sec_barrier_ld_01a"), -961.235, -2796.275, 13.9571, false, 3.0, false);
//             mp.game.object.setStateOfClosestDoorOfType(725274945, -977.5174, -2837.264, 12.95486, false, 0.0, false);
//         }
//         else
//         {
//             mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_sec_barrier_ld_01a"), -967.0093, -2802.45, 13.9571, true, 0.0, false);
//             mp.game.object.setStateOfClosestDoorOfType(725274945, -990.2963, -2829.887, 12.94986, true, 0.0, false);
//             mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_sec_barrier_ld_01a"), -961.235, -2796.275, 13.9571, true, 0.0, false);
//             mp.game.object.setStateOfClosestDoorOfType(725274945, -977.5174, -2837.264, 12.95486, true, 0.0, false);
//         }

//         if (esferaEsta == aeropuertoPuerta_3 && (policia || sheriff || fib || sheriff || bombero || puede_entrar_fd  || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio || camionero || puede_entrar_camionero || puede_entrar_weazel))
//         {
//             mp.game.object.setStateOfClosestDoorOfType(1801655140, -1126.924, -2699, 12.88977, false, 0.0, false);
//             mp.game.object.setStateOfClosestDoorOfType(725274945, -1151.207, -2723.093, 12.94986, false, 0.0, false);
//             mp.game.object.setStateOfClosestDoorOfType(1801655140, -1133.382, -2709.492, 12.95537, false, 0.0, false);
//             mp.game.object.setStateOfClosestDoorOfType(725274945, -1138.472, -2730.446, 12.94986, false, 0.0, false);
//         }
//         else
//         {
//             mp.game.object.setStateOfClosestDoorOfType(1801655140, -1126.924, -2699, 12.88977, true, 0.0, false);
//             mp.game.object.setStateOfClosestDoorOfType(725274945, -1151.207, -2723.093, 12.94986, true, 0.0, false);
//             mp.game.object.setStateOfClosestDoorOfType(1801655140, -1133.382, -2709.492, 12.95537, true, 0.0, false);
//             mp.game.object.setStateOfClosestDoorOfType(725274945, -1138.472, -2730.446, 12.94986, true, 0.0, false);
//         }

//         if (esferaEsta == aeropuertoPuerta_4 && (policia || sheriff || fib || sheriff || bombero || puede_entrar_fd  || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio || puede_entrar_weazel))
//         {
//             mp.game.object.setStateOfClosestDoorOfType(569833973, -1213.4, -2079.3, 12.90274, false, 3.0, false);
//         }
//         else
//         {
//             mp.game.object.setStateOfClosestDoorOfType(569833973, -1213.4, -2079.3, 12.90274, true, 0.0, false);
//         }

//         if (esferaEsta == aeropuertoPuerta_5 && (policia || sheriff || fib || sheriff || bombero || puede_entrar_fd  || puede_entrar_pd || puede_entrar_sd || puede_entrar_fib || adminservicio || puede_entrar_weazel))
//         {
//             mp.game.object.setStateOfClosestDoorOfType(569833973, -984.079, -2348.4, 12.94479, false, 3.0, false);
//         }
//         else
//         {
//             mp.game.object.setStateOfClosestDoorOfType(569833973, -984.079, -2348.4, 12.94479, true, 0.0, false);
//         }*/

//         //Estibadores puerto pier 400
//         if (esferaEsta == estibadores_1_entrada && (camionero || puede_entrar_camionero || puede_entrar_fd || policia || sheriff || fib || bombero || adminservicio))
//         {
//             mp.game.object.setStateOfClosestDoorOfType(1286392437, -187.3406, -2515.309, 5.047173, false, 3.0, false);
//         }
//         else
//         {
//             mp.game.object.setStateOfClosestDoorOfType(1286392437, -187.3406, -2515.309, 5.047173, true, 0.0, false);
//         }
//         if (esferaEsta == estibadores_1_salida && (camionero || puede_entrar_camionero || puede_entrar_fd || policia || sheriff || fib || bombero || adminservicio))
//         {
//             mp.game.object.setStateOfClosestDoorOfType(1286392437, -202.6151, -2515.309, 5.047173, false, 3.0, false);
//         }
//         else
//         {
//             mp.game.object.setStateOfClosestDoorOfType(1286392437, -202.6151, -2515.309, 5.047173, true, 0.0, false);
//         }
//         if (esferaEsta == estibadores_2_entrada && (camionero || puede_entrar_camionero || puede_entrar_fd || policia || sheriff || fib || bombero || adminservicio))
//         {
//             mp.game.object.setStateOfClosestDoorOfType(1286392437, 19.40451, -2529.702, 5.047173, false, 3.0, false);
//         }
//         else
//         {
//             mp.game.object.setStateOfClosestDoorOfType(1286392437, 19.40451, -2529.702, 5.047173, true, 0.0, false);
//         }
//         if (esferaEsta == estibadores_2_salida && (camionero || puede_entrar_camionero || puede_entrar_fd || policia || sheriff || fib || bombero || adminservicio))
//         {
//             mp.game.object.setStateOfClosestDoorOfType(1286392437, 10.64414, -2542.213, 5.047173, false, 3.0, false);
//         }
//         else
//         {
//             mp.game.object.setStateOfClosestDoorOfType(1286392437, 10.64414, -2542.213, 5.047173, true, 0.0, false);
//         }

//         //Weazel news
//         if (esferaEsta == entradaW1 && (bombero || puede_entrar_weazel || adminservicio))
//         {
//             mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor005w"), -584.7819, -931.7788, 24.0293, false, 3.0, false);
//         }
//         else
//         {
//             mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor005w"), -584.7819, -931.7788, 24.0293, true, 0.0, false);
//         }
//         if (esferaEsta == entradaW2 && (bombero || puede_entrar_weazel || adminservicio))
//         {
//             mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor005w"), -582.5726, -931.2073, 24.0293, false, 3.0, false);
//             mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor005w"), -582.5725, -928.6091, 24.0293, false, 3.0, false);
//         }
//         else
//         {
//             mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor005w"), -582.5726, -931.2073, 24.0293, true, 0.0, false);
//             mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor005w"), -582.5725, -928.6091, 24.0293, true, 0.0, false);
//         }
//         if (esferaEsta == escaleraW && (bombero || puede_entrar_weazel || adminservicio))
//         {
//             mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor005w"), -582.5726, -926.0486, 24.0293, false, 3.0, false);
//         }
//         else
//         {
//             mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor005w"), -582.5726, -926.0486, 24.0293, true, 0.0, false);
//         }
//         if (esferaEsta == helipuertoW && (bombero || puede_entrar_weazel || adminservicio))
//         {
//             mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_rc_door2"), -568.3088, -927.1104, 37.03507, false, 3.0, false);
//         }
//         else
//         {
//             mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_rc_door2"), -568.3088, -927.1104, 37.03507, true, 0.0, false);
//         }
//         if (esferaEsta == entradaW2 && (bombero || puede_entrar_weazel || adminservicio))
//         {
//             mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_door012"), -588.0319, -913.019, 24.03257, false, 3.0, false);
//             mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_door012"), -585.4315, -913.019, 24.03257, false, 3.0, false);
//         }
//         else
//         {
//             mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_door012"), -588.0319, -913.019, 24.03257, true, 0.0, false);
//             mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_door012"), -585.4315, -913.019, 24.03257, true, 0.0, false);
//         }
//         if (esferaEsta == entradaW2 && (bombero || puede_entrar_weazel || adminservicio))
//         {
//             mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_door012"), -576.0785, -939.6045, 24.02457, false, 3.0, false);
//             mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_door012"), -573.4791, -939.6045, 24.02457, false, 3.0, false);
//         }
//         else
//         {
//             mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_door012"), -576.0785, -939.6045, 24.02457, true, 0.0, false);
//             mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_door012"), -573.4791, -939.6045, 24.02457, true, 0.0, false);
//         }
//     }

//     if (player_local.dimension == 0)
//     {
//         //hechicheros
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("gate_riin_01_r"), 1322.087, 1104.217, 107.0091, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("gate_riin_01_l,"), 1319.357, 1111.565, 107.0106, false, 0.0, false);

//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door01"), -45.93007, -1290.667, 29.67249, false, 0.0, false);
//         //Casa de madrazo (Fuente blanca)
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door1_l"), 1390.666, 1131.117, 114.4808, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door1_r"), 1390.666, 1133.317, 114.4808, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door4r"), 1395.92, 1140.705, 114.7902, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door4l"), 1395.92, 1142.904, 114.7902, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door1_l"), 1390.411, 1161.241, 114.4873, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door1_r"), 1390.424, 1163.438, 114.4873, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door1_r"), 1408.166, 1165.834, 114.4873, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door1_l"), 1408.171, 1163.633, 114.4873, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door1_r"), 1408.167, 1161.155, 114.4873, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door1_l"), 1408.157, 1158.956, 114.4873, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door1_r"), 1409.292, 1150.654, 114.4869, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door1_l"), 1409.292, 1148.454, 114.4869, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door1_r"), 1409.292, 1148.454, 114.4869, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door1_l"), 1409.292, 1146.254, 114.4869, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door1_r"), 1409.292, 1146.254, 114.4869, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door1_l"), 1409.292, 1144.054, 114.4869, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door4r"), 1407.547, 1128.329, 114.4855, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door1_l"), 1401.59, 1128.314, 114.4836, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door1_r"), 1399.393, 1128.314, 114.4836, false, 0.0, false);

//         //Iglesia mission row
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("hei_prop_hei_bankdoor_new"), 370.1851, -941.1146, 29.56927, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("hei_prop_hei_bankdoor_new"), 372.782, -941.1146, 29.56927, false, 0.0, false);

//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("ex_prop_exec_office_door01"), 359.4009, -583.9745, 28.98423, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("ex_prop_exec_office_door01"), 358.8331, -585.535, 28.98601, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("ex_prop_exec_office_door01"), 354.7511, -596.8012, 28.9524, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("ex_prop_exec_office_door01"), 355.3194, -595.2411, 28.9524, false, 0.0, false);

//         //Comisaria la abrirmos para usarla en dimension 0
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_door01"), 434.7479, -980.6183, 30.83926, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_door002"), 434.7479, -983.215, 30.83926, false, 0.0, false);

//         //Si esta en la dimension 0 abrimos las puertas de estos negocios accesibles sin teleport
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_bs_door"), 133, -1711, 29, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_bs_door"), -1287.857, -1115.742, 7.1401, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_bs_door"), 1932.952, 3725.154, 32.9944, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_bs_door"), 1207.873, -470.063, 66.358, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_bs_door"), -29.8692, -148.1571, 57.2265, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_bs_door"), -280.7851, 6232.782, 31.8455, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_hd_door_l"), -824, -187, 38, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_hd_door_l"), -823.2001, -187.0831, 37.819, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_hd_door_r"), -823, -188, 38, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_hd_door_r"), -822.4442, -188.3924, 37.819, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_cs_door01"), 82.3186, -1392.752, 29.5261, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_cs_door01_r"), 82.3186, -1390.476, 29.5261, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_cs_door01"), 1686.983, 4821.741, 42.2131, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_cs_door01_r"), 1687.282, 4819.484, 42.2131, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_cs_door01"), 418.637, -806.457, 29.6396, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_cs_door01_r"), 418.637, -808.733, 29.6396, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_cs_door01"), -1096.661, 2705.446, 19.2578, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_cs_door01_r"), -1094.965, 2706.964, 19.2578, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_cs_door01"), 1196.825, 2703.221, 38.3726, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_cs_door01_r"), 1199.101, 2703.221, 38.3726, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_cs_door01"), -818.7642, -1079.544, 11.4781, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_cs_door01_r"), -816.7932, -1078.406, 11.4781, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_cs_door01"), -0.0564, 6517.461, 32.0278, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_cs_door01_r"), -1.7253, 6515.914, 32.0278, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_clothmiddoor"), -1201.435, -776.8566, 17.9918, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_clothmiddoor"), 617.2458, 2751.022, 42.7578, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_clothmiddoor"), 127.8201, -211.8274, 55.2275, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_clothmiddoor"), -3167.75, 1055.536, 21.5329, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ch_glassdoor"), -716.6754, -155.42, 37.6749, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ch_glassdoor"), -715.6154, -157.2561, 37.6749, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ch_glassdoor"), -157.0924, -306.4413, 39.994, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ch_glassdoor"), -156.4022, -304.4366, 39.994, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ch_glassdoor"), -1454.782, -231.7927, 50.0565, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ch_glassdoor"), -1456.201, -233.3682, 50.0565, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ta_door"), 321.81, 178.36, 103.68, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ml_door1"), 1859.89, 3749.79, 33.18, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ml_door1"), -289.1752, 6199.112, 31.637, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ta_door"), -1155.454, -1424.008, 5.0461, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ta_door"), 1321.286, -1650.597, 52.3663, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ta_door"), -3167.789, 1074.767, 20.9209, false, 0.0, false);

//         //Joyeria
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("p_jewel_door_l"), -631.96, -236.33, 38.21, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("p_jewel_door_r1"), -630.43, -238.44, 38.21, false, 0.0, false);

//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ml_door1"), 1393, 3599, 35, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ml_door1"), 1395, 3600, 35, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ss_doorext"), 1387.0, 3614.0, 39.0, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ss_doorext"), 1388.499, 3614.828, 39.09187, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ss_doorext"), 1399.7, 3607.763, 39.09187, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_corp_hicksdoor"), 1991.0, 3053.0, 47.0, false, 0.0, false);

//         //LieInvader
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_b_doorshortl"), -1045.12, -232.004, 39.43794, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_b_doorshortr"), -1046.516, -229.3581, 39.43794, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor02"), -1042.518, -240.6915, 38.11796, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_b_door01"), -1083.62, -260.4166, 38.1867, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_b_door02"), -1080.974, -259.0203, 38.1867, false, 0.0, false);

//         //Casa en la granja
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_h_rntdoor"), 2435.429, 4975.025, 46.90218, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_h_rntdoor"), 2441.018, 4981.73, 46.90218, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_h_rntdoor"), 2448.641, 4988.778, 46.90218, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_h_rntdoor"), 2453.184, 4969.372, 46.90218, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_h_door03"), 2442.179, 4966.245, 51.8163, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_h_door03"), 2443.775, 4967.841, 51.8163, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_h_door03"), 2453.903, 4973.742, 51.8163, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_h_door03"), 2455.499, 4975.338, 51.8163, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_h_door03"), 2451.616, 4984.096, 51.8163, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_h_door03"), 2450.02, 4985.692, 51.8163, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_h_door03"), 2441.465, 4981.301, 51.8163, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_h_door03"), 2443.061, 4979.706, 51.8163, false, 0.0, false);

//         //Fort zancudo torre
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ct_doorr"), -2343.531, 3265.371, 32.95998, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ct_doorl"), -2342.231, 3267.624, 32.95998, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ct_door01"), -2353.747, 3252.641, 32.95998, false, 0.0, false);

//         // Casa franklyn

//         //Sheriff Davis
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_shrf2door"), 362.182, -1584.057, 29.44576, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_shrf2door"), 360.5164, -1586.044, 29.44938, false, 0.0, false);

//         //Sheriff Paleto
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_shrf2door"), -442.6645, 6015.219, 31.87235, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_shrf2door"), -444.5043, 6017.058, 31.87235, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_fnclink_03gate5"), -450.5025, 6025.146, 32.11588, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_fnclink_03gate5"), -432.3989, 5988.055, 32.14349, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_fnclink_03gate5"), -429.9867, 5985.706, 32.14349, true, 0.0, false);

//         //Comisaria del Perro
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_csr_door_l"), -1631.737, -1016.561, 13.37107, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_csr_door_r"), -1633.197, -1015.331, 13.37873, false, 0.0, false);

//         //Talleres
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_com_gar_door_01"), 976.4347, -1831.98, 32.28619, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_vag_door"), 968.4046, -1829.742, 31.4328, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_id2_11_gdoor"), 723.116, -1088.831, 23.23201, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_com_ls_door_01"), -1145.898, -1991.144, 14.18357, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_com_ls_door_01"), -356.0905, -134.7714, 40.01295, false, 0.0, false);

//         //Tienda gorras
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("gabz_haters_entrance_front"), -1118.575, -1440.657, 4.285106, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("gabz_haters_entrance_back"), -1126.054, -1446.53, 4.344772, false, 0.0, false);

//         // Cantera (job minero)
//         //mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_sec_barrier_ld_01a"), 2566.823, 2713.83, 42.48776, true, 0.0, false);

//         //Ammunations 
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door04"), 16.12787, -1114.606, 29.94694, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door03"), 18.572, -1115.495, 29.94694, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door04"), 813.1779, -2148.27, 29.76892, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door03"), 810.5769, -2148.27, 29.76892, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door04"), 845.3694, -1024.539, 28.34478, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door03"), 842.7685, -1024.539, 28.34478, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door04"), -665.2424, -944.3256, 21.97915, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door03"), -662.6415, -944.3256, 21.97915, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door04"), -1313.826, -389.1259, 36.84573, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door03"), -1314.465, -391.6472, 36.84573, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door04"), 244.7275, -44.07911, 70.09098, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door03"), 243.8379, -46.52324, 70.09098, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door04"), 2570.905, 303.3556, 108.8848, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door03"), 2568.304, 303.3556, 108.8848, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door04"), 1698.176, 3751.506, 34.85526, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door03"), 1699.937, 3753.42, 34.85526, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door04"), -1114.009, 2689.77, 18.70407, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door03"), -1112.071, 2691.505, 18.70407, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door04"), -3164.845, 1081.392, 20.98866, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door03"), -3163.812, 1083.778, 20.98866, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door04"), -326.1122, 6075.27, 31.6047, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door03"), -324.2731, 6077.109, 31.6047, false, 0.0, false);

//         // PUERTAS DE MLOS MOD
//         // Vamos a usar mp.game.joaat porque no sé como le sentará un getHashKey. Da igual si es una puerta original en un MLO, es mejor no arriesgar.
//         //Split sides
//         // Entrada
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("camedy_door_l1"), -430.1948, 262.37326, 82.004875, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("camedy_door_r1"), -429.74622, 262.28632, 82.004875, false, 0.0, false); 
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("camedy_door_l3"), -419.61624, 268.1909, 82.1945, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("camedy_door_r3"), -420.07773, 268.22012, 82.194496, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("camedy_door_l2"), -426.74677, 263.1455, 82.19415, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("camedy_door_r2"), -426.75085, 263.82108, 82.19415, false, 0.0, false); 
//         // Puertas secundarias (En este caso, todas las de dentro, ya que no vamos a desbloquearlas en X interiores). Además, solo vamos a bloquear las que usaremos,
//         // no voy a bloquear todas las puertas porque es perder el tiempo.
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("vw_prop_vw_casino_door_01b"), -438.618, 264.6551, 83.69353, false, 0.0, false);  // Puertas entrada MLO similar a bar tipo Split Sides
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("vw_prop_vw_casino_door_01b"), -438.36417, 265.84418, 84.69354, false, 0.0, false);  // Puertas entrada MLO similar a bar tipo Split Sides

//         mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("vw_prop_vw_casino_door_01c"), -430.73956, 267.33264, 82.004944, false, 0.0, false); 
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("vw_prop_vw_casino_door_01c"), -430.73956, 267.33264, 82.004944, false, 0.0, false); 
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("vw_prop_vw_casino_door_01c"), -429.34427, 268.12784, 82.004944, false, 0.0, false); 
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("vw_prop_vw_casino_door_01c"), -429.66473, 276.19168, 82.19449, false, 0.0, false); 
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("vw_prop_vw_casino_door_01c"), -439.6111, 277.46243, 83.67462, false, 0.0, false); 
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("camedy_door_4"), -425.12198, 283.8309, 82.19441, false, 0.0, false);

//         // Club Vinewood
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("dge_prop_grumandoor_l"), 299.57413, 205.17848, 104.37239, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("dge_prop_grumandoor_r"), 300.05345, 204.42105, 103.37242, false, 0.0, false);

//         mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("dge_prop_grumandoor_l"), 301.21915, 203.57991, 104.37232, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("dge_prop_grumandoor_r"), 302.0188, 203.37553, 103.37242, false, 0.0, false);

//         mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("dge_prop_grumandoor_l"), 303.4928, 203.1843, 104.37241, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("dge_prop_grumandoor_r"), 304.5032, 203.26543, 103.37242, false, 0.0, false);

//         // Floristería
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("cls_cs_door"), 1088.8549, -777.3906, 57.44279, false, 0.0, false);

//         // Bahama West Mamas
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("cls_bahama_fix_door1a"), -1388.7379, -587.5105, 29.31729, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("cls_bahama_fix_door1a"), -1387.4933, -586.89343, 29.319532, false, 0.0, false);

//     }
//     else
//     {
//         //Ammunations
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door04"), 16.12787, -1114.606, 29.94694, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door03"), 18.572, -1115.495, 29.94694, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door04"), 813.1779, -2148.27, 29.76892, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door03"), 810.5769, -2148.27, 29.76892, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door04"), 845.3694, -1024.539, 28.34478, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door03"), 842.7685, -1024.539, 28.34478, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door04"), -665.2424, -944.3256, 21.97915, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door03"), -662.6415, -944.3256, 21.97915, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door04"), -1313.826, -389.1259, 36.84573, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door03"), -1314.465, -391.6472, 36.84573, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door04"), 244.7275, -44.07911, 70.09098, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door03"), 243.8379, -46.52324, 70.09098, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door04"), 2570.905, 303.3556, 108.8848, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door03"), 2568.304, 303.3556, 108.8848, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door04"), 1698.176, 3751.506, 34.85526, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door03"), 1699.937, 3753.42, 34.85526, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door04"), -1114.009, 2689.77, 18.70407, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door03"), -1112.071, 2691.505, 18.70407, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door04"), -3164.845, 1081.392, 20.98866, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door03"), -3163.812, 1083.778, 20.98866, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door04"), -326.1122, 6075.27, 31.6047, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door03"), -324.2731, 6077.109, 31.6047, true, 0.0, false);

//         //Restaurante legion
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_showroom_door_l"), 114.5552, -1039.65, 29.52144, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_showroom_door_r"), 115.1957, -1037.849, 29.52144, true, 0.0, false);

//         //Tienda de telefonia
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_sm1_11_doorl"), -86.28754, 37.81063, 72.15356, true, 0.0, false);

//         //Matadero (Cerca del puerto)
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_abat_slide"), 962.9084, -2105.813, 32.52716, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_abbmaindoor"), 962.0066, -2183.816, 31.06194, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_abbmaindoor2"), 961.705, -2187.069, 31.06195, true, 0.0, false);

//         //Casa de madrazo (Fuente blanca)
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door1_l"), 1390.666, 1131.117, 114.4808, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door1_r"), 1390.666, 1133.317, 114.4808, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door4r"), 1395.92, 1140.705, 114.7902, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door4l"), 1395.92, 1142.904, 114.7902, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door1_l"), 1390.411, 1161.241, 114.4873, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door1_r"), 1390.424, 1163.438, 114.4873, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door1_r"), 1408.166, 1165.834, 114.4873, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door1_l"), 1408.171, 1163.633, 114.4873, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door1_r"), 1408.167, 1161.155, 114.4873, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door1_l"), 1408.157, 1158.956, 114.4873, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door1_r"), 1409.292, 1150.654, 114.4869, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door1_l"), 1409.292, 1148.454, 114.4869, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door1_r"), 1409.292, 1148.454, 114.4869, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door1_l"), 1409.292, 1146.254, 114.4869, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door1_r"), 1409.292, 1146.254, 114.4869, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door1_l"), 1409.292, 1144.054, 114.4869, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door4r"), 1407.547, 1128.329, 114.4855, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door1_l"), 1401.59, 1128.314, 114.4836, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door1_r"), 1399.393, 1128.314, 114.4836, true, 0.0, false);

//         //Iglesia mission row
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("hei_prop_hei_bankdoor_new"), 370.1851, -941.1146, 29.56927, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("hei_prop_hei_bankdoor_new"), 372.782, -941.1146, 29.56927, true, 0.0, false);

//         //Hospital pillbox
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("hei_prop_heist_cutscene_doorc_r"), 321.0088, -559.9609, 28.88031, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("hei_prop_heist_cutscene_doorc_r"), 318.7677, -561.0198, 28.88031, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("ex_prop_exec_office_door01"), 359.4009, -583.9745, 28.98423, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("ex_prop_exec_office_door01"), 358.8331, -585.535, 28.98601, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("ex_prop_exec_office_door01"), 354.7511, -596.8012, 28.9524, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("ex_prop_exec_office_door01"), 355.3194, -595.2411, 28.9524, true, 0.0, false);

//         //Comisaria la cerramos a cal y canto para usarla en otros interiores
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_door01"), 434.7479, -980.6183, 30.83926, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_door002"), 434.7479, -983.215, 30.83926, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor02"), 464.3613, -984.6779, 43.83443, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_rc_door2"), 467.3716, -1014.452, 26.53623, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_rc_door2"), 469.9679, -1014.452, 26.53623, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("slb2k11_secdoor"), 464.1584, -1011.26, 33.01121, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 444.6212, -999.001, 30.78866, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 447.2184, -999.0023, 30.78942, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("slb2k11_glassdoor"), 429.2023, -994.0486, 36.16876, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("slb2k11_glassdoor"), 429.1714, -996.226, 36.16876, true, 0.0, false);

//         //Si esta en otra dimension dierente a 0 cerramos todas las puertas
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_bs_door"), 133, -1711, 29, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_bs_door"), -1287.857, -1115.742, 7.1401, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_bs_door"), 1932.952, 3725.154, 32.9944, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_bs_door"), 1207.873, -470.063, 66.358, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_bs_door"), -29.8692, -148.1571, 57.2265, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_bs_door"), -280.7851, 6232.782, 31.8455, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_hd_door_l"), -824, -187, 38, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_hd_door_l"), -823.2001, -187.0831, 37.819, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_hd_door_r"), -823, -188, 38, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_hd_door_r"), -822.4442, -188.3924, 37.819, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_cs_door01"), 82.3186, -1392.752, 29.5261, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_cs_door01_r"), 82.3186, -1390.476, 29.5261, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_cs_door01"), 1686.983, 4821.741, 42.2131, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_cs_door01_r"), 1687.282, 4819.484, 42.2131, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_cs_door01"), 418.637, -806.457, 29.6396, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_cs_door01_r"), 418.637, -808.733, 29.6396, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_cs_door01"), -1096.661, 2705.446, 19.2578, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_cs_door01_r"), -1094.965, 2706.964, 19.2578, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_cs_door01"), 1196.825, 2703.221, 38.3726, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_cs_door01_r"), 1199.101, 2703.221, 38.3726, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_cs_door01"), -818.7642, -1079.544, 11.4781, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_cs_door01_r"), -816.7932, -1078.406, 11.4781, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_cs_door01"), -0.0564, 6517.461, 32.0278, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_cs_door01_r"), -1.7253, 6515.914, 32.0278, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_clothmiddoor"), -1201.435, -776.8566, 17.9918, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_clothmiddoor"), 617.2458, 2751.022, 42.7578, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_clothmiddoor"), 127.8201, -211.8274, 55.2275, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_clothmiddoor"), -3167.75, 1055.536, 21.5329, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ch_glassdoor"), -716.6754, -155.42, 37.6749, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ch_glassdoor"), -715.6154, -157.2561, 37.6749, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ch_glassdoor"), -157.0924, -306.4413, 39.994, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ch_glassdoor"), -156.4022, -304.4366, 39.994, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ch_glassdoor"), -1454.782, -231.7927, 50.0565, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ch_glassdoor"), -1456.201, -233.3682, 50.0565, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ta_door"), 321.81, 178.36, 103.68, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ml_door1"), 1859.89, 3749.79, 33.18, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ml_door1"), -289.1752, 6199.112, 31.637, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ta_door"), -1155.454, -1424.008, 5.0461, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ta_door"), 1321.286, -1650.597, 52.3663, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ta_door"), -3167.789, 1074.767, 20.9209, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_247door"), 2559.201, 384.0875, 108.7729, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_247door_r"), 2559.304, 386.6864, 108.7729, true, 0.0, false);
//         //Joyeria
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("p_jewel_door_l"), -631.96, -236.33, 38.21, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("p_jewel_door_r1"), -630.43, -238.44, 38.21, true, 0.0, false);

//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ml_door1"), 1393, 3599, 35, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ml_door1"), 1395, 3600, 35, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ss_doorext"), 1387.0, 3614.0, 39.0, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ss_doorext"), 1388.499, 3614.828, 39.09187, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ss_doorext"), 1399.7, 3607.763, 39.09187, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_corp_hicksdoor"), 1991.0, 3053.0, 47.0, true, 0.0, false);

//         //LieInvader
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_b_doorshortl"), -1045.12, -232.004, 39.43794, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_b_doorshortr"), -1046.516, -229.3581, 39.43794, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor02"), -1042.518, -240.6915, 38.11796, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_b_door01"), -1083.62, -260.4166, 38.1867, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_b_door02"), -1080.974, -259.0203, 38.1867, true, 0.0, false);

//         //Casa en la granja
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_h_rntdoor"), 2435.429, 4975.025, 46.90218, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_h_rntdoor"), 2441.018, 4981.73, 46.90218, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_h_rntdoor"), 2448.641, 4988.778, 46.90218, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_h_rntdoor"), 2453.184, 4969.372, 46.90218, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_h_door03"), 2442.179, 4966.245, 51.8163, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_h_door03"), 2443.775, 4967.841, 51.8163, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_h_door03"), 2453.903, 4973.742, 51.8163, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_h_door03"), 2455.499, 4975.338, 51.8163, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_h_door03"), 2451.616, 4984.096, 51.8163, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_h_door03"), 2450.02, 4985.692, 51.8163, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_h_door03"), 2441.465, 4981.301, 51.8163, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_h_door03"), 2443.061, 4979.706, 51.8163, true, 0.0, false);

//         //Fort zancudo torre
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ct_doorr"), -2343.531, 3265.371, 32.95998, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ct_doorl"), -2342.231, 3267.624, 32.95998, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ct_door01"), -2353.747, 3252.641, 32.95998, true, 0.0, false);

//         //Sheriff Davis
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_shrf2door"), 362.182, -1584.057, 29.44576, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_shrf2door"), 360.5164, -1586.044, 29.44938, true, 0.0, false);

//         //Sheriff Paleto
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_shrf2door"), -442.6645, 6015.219, 31.87235, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_shrf2door"), -444.5043, 6017.058, 31.87235, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor002"), -450.9934, 6006.035, 31.99581, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor002"), -447.2478, 6002.291, 31.84349, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_fnclink_03gate5"), -450.5025, 6025.146, 32.11588, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_fnclink_03gate5"), -432.3989, 5988.055, 32.14349, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_fnclink_03gate5"), -429.9867, 5985.706, 32.14349, true, 0.0, false);

//         //Comisaria del perro
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_rc_door2"), -1613.315, -1027.257, 13.30352, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_rc_door2"), -1633.069, -1028.729, 13.30352, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_csr_door_l"), -1631.737, -1016.561, 13.37107, false, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_csr_door_r"), -1633.197, -1015.331, 13.37873, false, 0.0, false);

//         //Puertas garajes
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("hei_prop_dt1_20_mp_gar2"), -282.5536, -995.1604, 24.64861, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("hei_prop_bh1_08_mp_gar2"), -878.0269, -359.4522, 36.24911, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("hei_prop_bh1_09_mp_gar2"), -820.5596, -436.8046, 37.40411, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("hei_prop_sm_14_mp_gar2"), -1455.871, -503.8927, 32.31301, true, 0.0, false);

//         //Talleres
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_com_gar_door_01"), 976.4347, -1831.98, 32.28619, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_vag_door"), 968.4046, -1829.742, 31.4328, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_id2_11_gdoor"), 723.116, -1088.831, 23.23201, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_com_ls_door_01"), -1145.898, -1991.144, 14.18357, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_com_ls_door_01"), -356.0905, -134.7714, 40.01295, true, 0.0, false);

//         //Tienda gorras
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("gabz_haters_entrance_front"), -1118.575, -1440.657, 4.285106, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("gabz_haters_entrance_back"), -1126.054, -1446.53, 4.344772, true, 0.0, false);

//         // PUERTAS DE MLOS MOD
//         // Vamos a usar mp.game.joaat porque no sé como le sentará un getHashKey. Da igual si es una puerta original en un MLO, es mejor no arriesgar.
//         //Split sides
//         // Entrada
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("camedy_door_l1"), -430.1948, 262.37326, 82.004875, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("camedy_door_r1"), -429.74622, 262.28632, 82.004875, true, 0.0, false); 
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("camedy_door_l3"), -419.61624, 268.1909, 82.1945, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("camedy_door_r3"), -420.07773, 268.22012, 82.194496, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("camedy_door_l2"), -426.74677, 263.1455, 82.19415, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("camedy_door_r2"), -426.75085, 263.82108, 82.19415, true, 0.0, false); 
//         // Puertas secundarias (En este caso, todas las de dentro, ya que no vamos a desbloquearlas en X interiores). Además, solo vamos a bloquear las que usaremos,
//         // no voy a bloquear todas las puertas porque es perder el tiempo.
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("vw_prop_vw_casino_door_01b"), -438.618, 264.6551, 83.69353, true, 0.0, false);  // Puertas entrada MLO similar a bar tipo Split Sides
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("vw_prop_vw_casino_door_01b"), -438.36417, 265.84418, 84.69354, true, 0.0, false);  // Puertas entrada MLO similar a bar tipo Split Sides

//         mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("vw_prop_vw_casino_door_01c"), -430.73956, 267.33264, 82.004944, true, 0.0, false); 
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("vw_prop_vw_casino_door_01c"), -430.73956, 267.33264, 82.004944, true, 0.0, false); 
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("vw_prop_vw_casino_door_01c"), -429.34427, 268.12784, 82.004944, true, 0.0, false); 
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("vw_prop_vw_casino_door_01c"), -429.66473, 276.19168, 82.19449, true, 0.0, false); 
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("vw_prop_vw_casino_door_01c"), -439.6111, 277.46243, 83.67462, true, 0.0, false); 

//         mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("camedy_door_4"), -425.12198, 283.8309, 82.19441, true, 0.0, false);

//         // Club Vinewood
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("dge_prop_grumandoor_l"), 299.57413, 205.17848, 104.37239, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("dge_prop_grumandoor_r"), 300.05345, 204.42105, 103.37242, true, 0.0, false);

//         mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("dge_prop_grumandoor_l"), 301.21915, 203.57991, 104.37232, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("dge_prop_grumandoor_r"), 302.0188, 203.37553, 103.37242, true, 0.0, false);

//         mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("dge_prop_grumandoor_l"), 303.4928, 203.1843, 104.37241, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("dge_prop_grumandoor_r"), 304.5032, 203.26543, 103.37242, true, 0.0, false);

//         // Floristería
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("cls_cs_door"), 1088.8549, -777.3906, 57.44279, true, 0.0, false);

//         // Bahama West Mamas
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("cls_bahama_fix_door1a"), -1388.7379, -587.5105, 29.31729, true, 0.0, false);
//         mp.game.object.setStateOfClosestDoorOfType(mp.game.joaat("cls_bahama_fix_door1a"), -1387.4933, -586.89343, 29.319532, true, 0.0, false);


//     }
// }, 2000);


// PURGAAAAAAAAAAAAAAAAAAAAAA
// /* 
// Ammunations 
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door04"), 16.12787, -1114.606, 29.94694, false, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door03"), 18.572, -1115.495, 29.94694, false, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door04"), 813.1779, -2148.27, 29.76892, false, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door03"), 810.5769, -2148.27, 29.76892, false, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door04"), 845.3694, -1024.539, 28.34478, false, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door03"), 842.7685, -1024.539, 28.34478, false, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door04"), -665.2424, -944.3256, 21.97915, false, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door03"), -662.6415, -944.3256, 21.97915, false, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door04"), -1313.826, -389.1259, 36.84573, false, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door03"), -1314.465, -391.6472, 36.84573, false, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door04"), 244.7275, -44.07911, 70.09098, false, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door03"), 243.8379, -46.52324, 70.09098, false, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door04"), 2570.905, 303.3556, 108.8848, false, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door03"), 2568.304, 303.3556, 108.8848, false, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door04"), 1698.176, 3751.506, 34.85526, false, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door03"), 1699.937, 3753.42, 34.85526, false, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door04"), -1114.009, 2689.77, 18.70407, false, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door03"), -1112.071, 2691.505, 18.70407, false, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door04"), -3164.845, 1081.392, 20.98866, false, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door03"), -3163.812, 1083.778, 20.98866, false, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door04"), -326.1122, 6075.27, 31.6047, false, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gc_door03"), -324.2731, 6077.109, 31.6047, false, 0.0, false);

// NOOSE accceso
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_sec_barrier_ld_02a"), 2562.322, -600.1516, 64.95991, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_sec_barrier_ld_02a"), 2555.614, -598.545, 64.70138, true, 0.0, false);
// NOOSE entrada principal
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_sec_barrier_ld_02a,"), 2575.3, -282.4543, 92.75156, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_sec_barrier_ld_02a"), 2575.3, -288.4294, 92.75156, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_sec_barrier_ld_01a"), 2574.63, -300.6415, 92.84311, true, 0.0, false);
// NOOSE puerts instalaciones principal
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_gate_military_01"), 2567.51900000, -325.95020000, 91.92173000, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_gate_military_01"), 2567.53500000, -326.19300000, 91.92173000, true, 0.0, false);
// NOOSE puerts instalaciones carga
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_facgate_01"), 2491.868, -303.4783, 91.99238, true, 0.0, false);
// NOOSE puerts instalaciones interiores
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_gate_military_01"), 2485.088, -335.8422, 91.98345, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_gate_military_01"), 2485.437, -432.7134, 91.98345, true, 0.0, false);
// NOOSE puerts instalaciones carga trasera
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_facgate_05_r"), 2498.401, -459.5469, 93.93793, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_facgate_05_r"), 2489.758,-468.5204, 93.93793, true, 0.0, false);


// Tienda de telefonia
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_sm1_11_doorl"), -86.28754, 37.81063, 72.15356, true, 0.0, false);

// Matadero (Cerca del puerto)
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_abat_slide"), 962.9084, -2105.813, 32.52716, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_abbmaindoor"), 962.0066, -2183.816, 31.06194, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_abbmaindoor2"), 961.705, -2187.069, 31.06195, true, 0.0, false);

// Casa de madrazo (Fuente blanca)
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door1_l"), 1390.666, 1131.117, 114.4808, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door1_r"), 1390.666, 1133.317, 114.4808, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door4r"), 1395.92, 1140.705, 114.7902, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door4l"), 1395.92, 1142.904, 114.7902, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door1_l"), 1390.411, 1161.241, 114.4873, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door1_r"), 1390.424, 1163.438, 114.4873, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door1_r"), 1408.166, 1165.834, 114.4873, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door1_l"), 1408.171, 1163.633, 114.4873, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door1_r"), 1408.167, 1161.155, 114.4873, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door1_l"), 1408.157, 1158.956, 114.4873, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door1_r"), 1409.292, 1150.654, 114.4869, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door1_l"), 1409.292, 1148.454, 114.4869, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door1_r"), 1409.292, 1148.454, 114.4869, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door1_l"), 1409.292, 1146.254, 114.4869, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door1_r"), 1409.292, 1146.254, 114.4869, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door1_l"), 1409.292, 1144.054, 114.4869, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door4r"), 1407.547, 1128.329, 114.4855, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door1_l"), 1401.59, 1128.314, 114.4836, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door1_r"), 1399.393, 1128.314, 114.4836, true, 0.0, false);
// Madrazo (Fuente blanca) siempre cerradas
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door1_r"), 1395.891, 1153.858, 114.4666, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door1_l"), 1395.877, 1151.659, 114.4666, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door1_r"), 1401.588, 1128.314, 114.4836, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ra_door1_l"), 1399.393, 1128.314, 114.4836, true, 0.0, false);

// Iglesia mission row
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("hei_prop_hei_bankdoor_new"), 370.1851, -941.1146, 29.56927, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("hei_prop_hei_bankdoor_new"), 372.782, -941.1146, 29.56927, true, 0.0, false);

// Mission Row PD
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("hei_prop_heist_cutscene_doorc_r"), 321.0088, -559.9609, 28.88031, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("hei_prop_heist_cutscene_doorc_r"), 318.7677, -561.0198, 28.88031, true, 0.0, false);

// Hospital pillbox
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("hei_prop_heist_cutscene_doorc_r"), 321.0088, -559.9609, 28.88031, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("hei_prop_heist_cutscene_doorc_r"), 318.7677, -561.0198, 28.88031, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("ex_prop_exec_office_door01"), 359.4009, -583.9745, 28.98423, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("ex_prop_exec_office_door01"), 358.8331, -585.535, 28.98601, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("ex_prop_exec_office_door01"), 354.7511, -596.8012, 28.9524, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("ex_prop_exec_office_door01"), 355.3194, -595.2411, 28.9524, true, 0.0, false);

// Comisaria la cerramos a cal y canto para usarla en otros interiores
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_door01"), 434.7479, -980.6183, 30.83926, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_door002"), 434.7479, -983.215, 30.83926, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor02"), 464.3613, -984.6779, 43.83443, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_rc_door2"), 467.3716, -1014.452, 26.53623, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_rc_door2"), 469.9679, -1014.452, 26.53623, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("slb2k11_secdoor"), 464.1584, -1011.26, 33.01121, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 444.6212, -999.001, 30.78866, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor"), 447.2184, -999.0023, 30.78942, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("slb2k11_glassdoor"), 429.2023, -994.0486, 36.16876, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("slb2k11_glassdoor"), 429.1714, -996.226, 36.16876, true, 0.0, false);

// Si esta en otra dimension dierente a 0 cerramos todas las puertas
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_bs_door"), 133, -1711, 29, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_bs_door"), -1287.857, -1115.742, 7.1401, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_bs_door"), 1932.952, 3725.154, 32.9944, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_bs_door"), 1207.873, -470.063, 66.358, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_bs_door"), -29.8692, -148.1571, 57.2265, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_bs_door"), -280.7851, 6232.782, 31.8455, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_hd_door_l"), -824, -187, 38, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_hd_door_l"), -823.2001, -187.0831, 37.819, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_hd_door_r"), -823, -188, 38, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_hd_door_r"), -822.4442, -188.3924, 37.819, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_cs_door01"), 82.3186, -1392.752, 29.5261, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_cs_door01_r"), 82.3186, -1390.476, 29.5261, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_cs_door01"), 1686.983, 4821.741, 42.2131, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_cs_door01_r"), 1687.282, 4819.484, 42.2131, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_cs_door01"), 418.637, -806.457, 29.6396, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_cs_door01_r"), 418.637, -808.733, 29.6396, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_cs_door01"), -1096.661, 2705.446, 19.2578, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_cs_door01_r"), -1094.965, 2706.964, 19.2578, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_cs_door01"), 1196.825, 2703.221, 38.3726, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_cs_door01_r"), 1199.101, 2703.221, 38.3726, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_cs_door01"), -818.7642, -1079.544, 11.4781, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_cs_door01_r"), -816.7932, -1078.406, 11.4781, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_cs_door01"), -0.0564, 6517.461, 32.0278, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_cs_door01_r"), -1.7253, 6515.914, 32.0278, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_clothmiddoor"), -1201.435, -776.8566, 17.9918, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_clothmiddoor"), 617.2458, 2751.022, 42.7578, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_clothmiddoor"), 127.8201, -211.8274, 55.2275, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_clothmiddoor"), -3167.75, 1055.536, 21.5329, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ch_glassdoor"), -716.6754, -155.42, 37.6749, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ch_glassdoor"), -715.6154, -157.2561, 37.6749, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ch_glassdoor"), -157.0924, -306.4413, 39.994, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ch_glassdoor"), -156.4022, -304.4366, 39.994, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ch_glassdoor"), -1454.782, -231.7927, 50.0565, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ch_glassdoor"), -1456.201, -233.3682, 50.0565, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ta_door"), 321.81, 178.36, 103.68, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ml_door1"), 1859.89, 3749.79, 33.18, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ml_door1"), -289.1752, 6199.112, 31.637, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ta_door"), -1155.454, -1424.008, 5.0461, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ta_door"), 1321.286, -1650.597, 52.3663, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ta_door"), -3167.789, 1074.767, 20.9209, true, 0.0, false);
// Joyeria
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("p_jewel_door_l"), -631.96, -236.33, 38.21, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("p_jewel_door_r1"), -630.43, -238.44, 38.21, true, 0.0, false);

// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ml_door1"), 1393, 3599, 35, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ml_door1"), 1395, 3600, 35, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ss_doorext"), 1387.0, 3614.0, 39.0, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ss_doorext"), 1388.499, 3614.828, 39.09187, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ss_doorext"), 1399.7, 3607.763, 39.09187, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_corp_hicksdoor"), 1991.0, 3053.0, 47.0, true, 0.0, false);

// LieInvader
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_b_doorshortl"), -1045.12, -232.004, 39.43794, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_b_doorshortr"), -1046.516, -229.3581, 39.43794, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_gtdoor02"), -1042.518, -240.6915, 38.11796, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_b_door01"), -1083.62, -260.4166, 38.1867, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_b_door02"), -1080.974, -259.0203, 38.1867, true, 0.0, false);

// Casa en la granja
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_h_rntdoor"), 2435.429, 4975.025, 46.90218, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_h_rntdoor"), 2441.018, 4981.73, 46.90218, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_h_rntdoor"), 2448.641, 4988.778, 46.90218, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_h_rntdoor"), 2453.184, 4969.372, 46.90218, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_h_door03"), 2442.179, 4966.245, 51.8163, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_h_door03"), 2443.775, 4967.841, 51.8163, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_h_door03"), 2453.903, 4973.742, 51.8163, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_h_door03"), 2455.499, 4975.338, 51.8163, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_h_door03"), 2451.616, 4984.096, 51.8163, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_h_door03"), 2450.02, 4985.692, 51.8163, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_h_door03"), 2441.465, 4981.301, 51.8163, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_h_door03"), 2443.061, 4979.706, 51.8163, true, 0.0, false);

// Fort zancudo torre
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ct_doorr"), -2343.531, 3265.371, 32.95998, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ct_doorl"), -2342.231, 3267.624, 32.95998, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ct_door01"), -2353.747, 3252.641, 32.95998, true, 0.0, false);

// Puerta franklin
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_fa_frontdoor"), -14.86892, -1441.182, 31.19323, true, 0.0, false);

// Puerta clubhouse
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_lostdoor"), 981.1506, -103.2552, 74.99358, true, 0.0, false);

// Puertas de talleres
// mp.game.object.setStateOfClosestDoorOfType(270330101, 723.116, -1088.831, 23.23201, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_com_ls_door_01"), -1145.898, -1991.144, 14.18357, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_com_ls_door_01"), -356.0905, -134.7714, 40.01295, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_carmod3door"), 1174.654, 2645.222, 38.63961, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_carmod3door"), 1182.306, 2645.232, 38.63961, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_com_gar_door_01"), -187.3406, -2515.309, 5.047173, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("lr_prop_supermod_door_01"), -187.3406, -2515.309, 5.047173, false, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_carmod3door"), 108.8502, 6617.877, 32.67305, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_carmod3door"), 114.3135, 6623.233, 32.67305, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ss_door5_r"), 1187.202, 2644.95, 38.55176, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ss_door5_r"), 105.1518, 6614.655, 32.58521, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("lr_prop_supermod_door_01"), -205.6828, -1310.683, 30.29572, true, 0.0, false);

// Mazebank arena
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_stad_door"), -259.4862, -2031.936, 30.52077, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_stad_door"), -257.4934, -2029.561, 30.52077, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_stad_door"), -252.6704, -2023.813, 30.52077, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_stad_door"), -250.6776, -2021.438, 30.52077, true, 0.0, false);

// Alamacen mision de ranklin cerca del mazebank
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_rc_door3_r"), -611.32, -1610.089, 27.15894, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_rc_door3_l"), -608.7289, -1610.315, 27.15894, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_rc_door3_l"), -592.9376, -1631.577, 27.15931, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_rc_door3_r"), -592.7109, -1628.986, 27.15931, true, 0.0, false);

// LieInvader
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ib_door2"), -1048.285, -236.8171, 44.171, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ib_door2"), -1047.084, -239.1246, 44.171, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_b_sl_door01"), -1057.767, -237.484, 43.021, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_b_sl_door01"), -1063.842, -240.6464, 43.021, true, 0.0, false);

// Casa trevor vespucci
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_trev_doorront"), -1149.709, -1521.088, 10.78267, true, 0.0, false);

// Casa franklin
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_a_rontdoor"), -14, -1441, 31, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_h_rntdoor"), -15, -1427, 31, true, 0.0, false);

// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_h_rontdoor"), 7.52, 539.53, 176.18, true, 0.0, false);

// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_trevtraildr"), 1973, 3815, 34, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_janitor_rontdoor"), -107.5401, -9.0258, 70.6696, true, 0.0, false);

// Almacenes o garajes
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_com_gar_door_01"), 1204.57, -3110.4, 6.57, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_biolab_g_door"), 3589.1, 3671.5, 35, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_biolab_g_door"), 3587.6, 3663.3, 35, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_bl_shutter2"), 3627.71, 3746.72, 27.69, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_bl_shutter2"), 3620.84, 3751.53, 27.69, true, 0.0, false);

// Aeropuerto vallas pequeñas
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_nclink_02gate6_r"), -967.4473, -2778.495, 14.409, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_nclink_02gate6_l"), -974.5734, -2774.381, 14.4099, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_nclink_02gate6_r"), -971.1018, -2776.385, 14.409, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_nclink_02gate6_l"), -970.9188, -2776.491, 14.409, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_nclink_02gate6_r"), -935.2114, -2767.397, 14.3882, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_nclink_02gate6_l"), -933.1581, -2763.955, 14.3882, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_nclink_02gate6_r"), -933.0535, -2763.779, 14.3882, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_nclink_02gate6_l"), -931.0002, -2760.337, 14.3882, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_nclink_02gate6_r"), -773.2438, -2842.677, 14.2715, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_nclink_02gate6_l"), -769.7721, -2844.682, 14.2715, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_nclink_02gate6_r"), 769.6071, -2844.777, 14.2715, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_nclink_02gate6_l"), -766.1354, -2846.781, 14.2715, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_nclink_09gate1"), -828.9456, -2964.304, 14.2758, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_nclink_09gate1"), -907.7999, -3100.874, 14.2808, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_nclink_09gate1"), -833.4395, -3186.709, 14.267, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_nclink_09gate1"), -830.0544, -3391.163, 14.1972, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_nclink_09gate1"), -913.0834, -3534.97, 14.1924, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_nclink_09gate1"), -971.6149, -3549.152, 14.2727, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_nclink_09gate1"), -1017.692, -3563.217, 14.2767, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_nclink_09gate1"), -1146.831, -3546.638, 14.2595, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_nclink_09gate1"), -1260.897, -3480.764, 14.1721, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_nclink_09gate1"), -1351.133, -3404.162, 14.1721, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_nclink_09gate1"), -1409.507, -3370.461, 14.2068, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_nclink_09gate1"), -1831.804, -3224.966, 14.3119, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_nclink_09gate1"), -1942.289, -3161.19, 14.2981, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_nclink_09gate1"), -1927.563, -3076.269, 14.4569, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_nclink_09gate1"), -1951.696, -3003.846, 14.4418, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_nclink_09gate1"), -1836.875, -2804.969, 14.4557, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_nclink_09gate1"), -1802.692, -2745.761, 14.448, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_acgate_01"), -1099.531, -2020.803, 12.1745, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_acgate_01"), -994.4996, -2341.648, 12.9448, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_acgate_01"), -984.0709, -2348.4, 12.9448, true, 0.0, false);

// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_lester_doorront"), 1273.82, -1720.7, 54.92, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_tort_door"), 134.4, -2204.1, 7.52, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_lester_doorront"), 1273.82, -1720.7, 54.92, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_ch3_01_trlrdoor_l"), 2333.23, 2574.97, 47.03, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_ch3_01_trlrdoor_r"), 2329.65, 2576.64, 47.03, true, 0.0, false);


// UNION DEPOSITORY
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_sec_gate_01c"), 25.03, -664.6, 31.04, false, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_sec_gate_01d"), -72.75, -682.17, 33.27, false, 0.0, false);


// Bancos
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_bank4door02"), -111.48, 6463.94, 31.985, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_bank4door01"), -109.65, 6462.11, 31.985, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_genbankdoor1"), -2965.821, 481.63, 16.048, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_genbankdoor2"), -2965.71, 484.219, 16.048, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_genbankdoor1"), 1176.49, 2703.61, 38.44, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_genbankdoor2"), 1173.9, 2703.61, 38.44, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_genbankdoor1"), 1656.25, 4852.24, 42.35, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_genbankdoor2"), 1656.57, 4849.66, 42.35, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_genbankdoor1"), -1215.39, -328.52, 38.13, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_genbankdoor2"), -1213.07, -327.35, 38.13, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_genbankdoor1"), 149.63, -1037.23, 29.72, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_genbankdoor2"), 152.06, -1038.12, 29.72, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_genbankdoor1"), 313.96, -275.6, 54.52, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_genbankdoor2"), 316.39, -276.49, 54.52, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_genbankdoor1"), -348.81, -47.26, 49.39, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_genbankdoor2"), -351.26, -46.41, 49.39, true, 0.0, false);

// Banco grande
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("hei_v_ilev_bk_gate_pris"), 256.3116, 220.6579, 106.4296, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("hei_v_ilev_bk_gate2_pris"), 256.3116, 220.6579, 106.4296, true, 0.0, false);

// Sheri
// Paleto
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_shr2door"), -442.66, 6015.222, 31.8663, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_shr2door"), -444.4985, 6017.06, 31.8663, true, 0.0, false);
// Sandy
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_shrdoor"), 1855.685, 3683.93, 34.5928, true, 0.0, false);



// Otras puertas de negocios, tiendas, casas etc... que deben estar siempre cerradas.
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_roc_door4"), -565.1712, 276.6259, 83.2863, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_roc_door4"), -561.2863, 293.5043, 87.7771, true, 0.0, false);

// Taller
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_cs_door"), 483, -1312, 29, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_com_gar_door_01"), 483.56, -1316.08, 32.18, true, 0.0, false);

// Vanila
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_strip_door_01"), 128, -1299, 29, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_magenta_door"), 96, -1285, 29, true, 0.0, false);

// Vespucci beach comisaria
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_facgate_06_r"), -1053.284, -874.3318, 6.205582, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_facgate_06_l"), -1063.636, -880.7089, 6.214558, true, 0.0, false);

// Ckubhousedoor
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_lostdoor"), 981.7533, -102.7987, 74.84873, true, 0.0, false);

// Casa Michael
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_mm_door"), -806.2817, 186.0246, 72.62405, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_ld_garaged_01"), -815.2816, 185.975, 72.99993, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_mm_doorm_l"), -816.716, 179.098, 72.82738, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_mm_doorm_r"), -816.1068, 177.5109, 72.82738, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_bh1_48_backdoor_l"), -796.5657, 177.2214, 73.04045, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_bh1_48_backdoor_r"), -794.5051, 178.0124, 73.04045, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_bh1_48_backdoor_l"), -793.3943, 180.5075, 73.04045, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_bh1_48_backdoor_r"), -794.1853, 182.568, 73.04045, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_mm_windowwc"), -794.1853, 182.568, 73.04045, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_door_balcony_right"), -816.8055, 177.0992, 77.14575, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_door_balcony_left"), -817.5095, 178.9343, 77.14861, true, 0.0, false);

// Sheriff Davis
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_shrf2door"), 362.182, -1584.057, 29.44576, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_shrf2door"), 360.5164, -1586.044, 29.44938, true, 0.0, false);

// Sheriff Paleto
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_shrf2door"), -442.6645, 6015.219, 31.87235, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_shrf2door"), -444.5043, 6017.058, 31.87235, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor002"), -450.9934, 6006.035, 31.99581, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_ph_gendoor002"), -447.2478, 6002.291, 31.84349, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_fnclink_03gate5"), -450.5025, 6025.146, 32.11588, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_fnclink_03gate5"), -432.3989, 5988.055, 32.14349, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("prop_fnclink_03gate5"), -429.9867, 5985.706, 32.14349, true, 0.0, false);

// Comisaria del perro
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_rc_door2"), -1613.315, -1027.257, 13.30352, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_rc_door2"), -1633.069, -1028.729, 13.30352, true, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_csr_door_l"), -1631.737, -1016.561, 13.37107, false, 0.0, false);
// mp.game.object.setStateOfClosestDoorOfType(mp.game.gameplay.getHashKey("v_ilev_csr_door_r"), -1633.197, -1015.331, 13.37873, false, 0.0, false);
//  */
// /*var objetoSlide;
// var posSlide;
// var rotSlide;
// var ObjectSlide;
// var ObjetoTest;
// let abriendo = false;
// let CalculoSlide = null;
// mp.events.add('abrirPuerta', (objeto, posAbierta, rotAbierta, posCerrada, rotCerrada) => {

//     objetoSlide = objeto;
//     posSlide = posAbierta;
//     rotSlide = rotAbierta;

//     player_local.position = objeto.position;
//     abriendo = true;
//     mp.events.add('render', renderAbrirPuerta);
// });
// function renderAbrirPuerta() {
//     if(abriendo) { 
//         let calculoSlide = (rotSlide.y - 0.1);
//         mp.gui.chat.push("Apertura: " + calculoSlide + " DEBUG: " + rotSlide.y);
//         objetoSlide.setRotation(rotSlide.x, rotSlide.y, rotSlide.z, 0, true);
//     } else {
//         let calculoSlide = (rotSlide.y + 0.1);
//         mp.gui.chat.push("Cerrando " + calculoSlide + " DEBUG: " + rotSlide.y);
//         objetoSlide.setRotation(rotSlide.x, rotSlide.y, rotSlide.z, 0, true);
//     }
//     ObjectSlide = objetoSlide.slide(posSlide.x, posSlide.y, posSlide.z, 0.1, 0.1, 0.1, false);
// }
// mp.events.add('cerrarPuerta', (objeto, posAbierta, rotAbierta, posCerrada, rotCerrada) => {
//         objetoSlide = objeto;
//         posSlide = posCerrada;
//         rotSlide = rotCerrada;
//         abriendo = false;
//         crearTimeout(function(){ mp.events.remove('render', renderAbrirPuerta); }, 3000);

// });*/
}