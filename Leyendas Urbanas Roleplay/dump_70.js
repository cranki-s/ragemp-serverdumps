{
/* --------------------------------------------------------------------------------
 * blips.js
 *
 * Autor: Doomer
 *
 * Descripción: Sistema de blips por jugador. Mostrar blips de entidades para jugadores
 * concretos.
 *
 * -------------------------------------------------------------------------------- */

/*
 * Blips FIJOS
 */
//Metro
mp.blips.new(607, new mp.Vector3(-1041.064, -2743.468, 13.94503), { name: "Metro", scale: 0.8, color: 1, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(607, new mp.Vector3(-948.1874, -2341.425, 5.012847), { name: "Metro", scale: 0.8, color: 1, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(607, new mp.Vector3(-538.8273, -1283.858, 26.90161), { name: "Metro", scale: 0.8, color: 1, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(607, new mp.Vector3(271.435, -1205.758, 29.29146), { name: "Metro", scale: 0.8, color: 1, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(607, new mp.Vector3(-246.7881, -334.9564, 29.97557), { name: "Metro", scale: 0.8, color: 1, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(607, new mp.Vector3(-800.7076, -99.81966, 37.58004), { name: "Metro", scale: 0.8, color: 1, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(607, new mp.Vector3(-1367.909, -528.9225, 30.31845), { name: "Metro", scale: 0.8, color: 1, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(607, new mp.Vector3(-488.6307, -697.5406, 33.24084), { name: "Metro", scale: 0.8, color: 1, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(607, new mp.Vector3(-215.3184, -1033.515, 30.1403), { name: "Metro", scale: 0.8, color: 1, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(607, new mp.Vector3(116.8044, -1724.446, 30.11246), { name: "Metro", scale: 0.8, color: 1, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
//Hospitales
mp.blips.new(61, new mp.Vector3(294.4641, -1448.334, 29.96659), { name: "Hospital", scale: 0.8, color: 84, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(61, new mp.Vector3(360.4459, -590.4619, 28.65708), { name: "Hospital", scale: 0.8, color: 84, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(61, new mp.Vector3(1838.967, 3673.269, 34.27668), { name: "Hospital", scale: 0.8, color: 84, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(61, new mp.Vector3(-235.6352, 6318.953, 31.53435), { name: "Hospital", scale: 0.8, color: 84, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(61, new mp.Vector3(-448.4785, -340.8356, 34.50176), { name: "Hospital", scale: 0.8, color: 84, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
//LSFD
mp.blips.new(436, new mp.Vector3(1179.161, -1461.453, 34.89328), { name: "Bomberos (LSFD)", scale: 0.8, color: 6, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(436, new mp.Vector3(211.766, -1644.359, 29.28161), { name: "Bomberos (LSFD)", scale: 0.8, color: 6, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(436, new mp.Vector3(1693.6, 3583.657, 35.62085), { name: "Bomberos (LSFD)", scale: 0.8, color: 6, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(436, new mp.Vector3(-379.1793, 6118.067, 31.84872), { name: "Bomberos (LSFD)", scale: 0.8, color: 6, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(436, new mp.Vector3(-1035.499, -2383.502, 14.09467), { name: "Bomberos (LSFD)", scale: 0.8, color: 6, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(436, new mp.Vector3(-643.1036, -112.8381, 37.92969), { name: "Bomberos (LSFD)", scale: 0.8, color: 6, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
//LSPD
mp.blips.new(60, new mp.Vector3(433.9706, -982.0072, 30.70942), { name: "Comisaría (LSPD)", scale: 0.8, color: 38, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(60, new mp.Vector3(826.966, -1289.866, 28.24066), { name: "Comisaría (LSPD)", scale: 0.8, color: 38, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(60, new mp.Vector3(1855.894, 3682.465, 34.26754), { name: "Comisaría (LSSD)", scale: 0.8, color: 16, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(60, new mp.Vector3(-442.9124, 6016.87, 31.7122), { name: "Comisaría (LSSD)", scale: 0.8, color: 16, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(60, new mp.Vector3(638.374, 1.805027, 82.78642), { name: "Comisaría (LSPD)", scale: 0.8, color: 38, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(60, new mp.Vector3(-1092.699, -809.9025, 19.27501), { name: "Comisaría (LSPD)", scale: 0.8, color: 38, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(60, new mp.Vector3(360.6671, -1583.791, 29.29206), { name: "Comisaría (LSSD)", scale: 0.8, color: 16, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(60, new mp.Vector3(-562.0243, -130.9144, 38.43211), { name: "Comisaría (LSPD)", scale: 0.8, color: 38, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
//Juzgados
mp.blips.new(188, new mp.Vector3(236.1957, -410.9713, 48.11194), { name: "Juzgados", scale: 1.2, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(188, new mp.Vector3(1696.378, 3780.542, 34.75520), { name: "Juzgados", scale: 1.2, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(188, new mp.Vector3(-151.9243, 6298.599, 31.48951), { name: "Juzgados", scale: 1.2, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
//Ayuntamiento
mp.blips.new(419, new mp.Vector3(-544.8306, -204.7782, 38.21515), { name: "Ayuntamiento", scale: 1.2, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(419, new mp.Vector3(1706.6766, 3787.5796, 34.70752), { name: "Ayuntamiento", scale: 1.2, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(419, new mp.Vector3(-141.82036, 6289.4487, 31.491571), { name: "Ayuntamiento", scale: 1.2, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
//Bancos
/* mp.blips.new(108, new mp.Vector3(151.1371, -1036.571, 29.33933), { name: "Banco", scale: 0.8, color: 69, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(108, new mp.Vector3(230.3605, 214.587, 105.5502), { name: "Banco", scale: 0.8, color: 69, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(108, new mp.Vector3(-1214.71, -327.1043, 37.67136), { name: "Banco", scale: 0.8, color: 69, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(108, new mp.Vector3(1175.191, 2702.746, 38.17275), { name: "Banco", scale: 0.8, color: 69, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(108, new mp.Vector3(-112.8498, 6470.083, 31.6267), { name: "Banco", scale: 0.8, color: 69, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(108, new mp.Vector3(314.1495, -279.0586, 54.1708), { name: "Banco", scale: 0.8, color: 69, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(108, new mp.Vector3(-350.9778, -49.88533, 49.04258), { name: "Banco", scale: 0.8, color: 69, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(108, new mp.Vector3(-2962.555, 483.2496, 15.70311), { name: "Banco", scale: 0.8, color: 69, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
 *///Jobs
mp.blips.new(198, new mp.Vector3(-569.1012, -2327.932, 13.94462), { name: "Trabajo - Taxista", scale: 0.8, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(198, new mp.Vector3(1997.401, 3780.306, 32.18078), { name: "Trabajo - Taxista", scale: 0.8, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(198, new mp.Vector3(-42.07331, 6435.479, 31.49069), { name: "Trabajo - Taxista", scale: 0.8, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(410, new mp.Vector3(-339.3759, -2444.142, 7.296101), { name: "Trabajo - Pescador", scale: 0.8, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(61, new mp.Vector3(162.4232, -1119.935, 29.32092), { name: "Trabajo - Paramédico", scale: 0.8, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(408, new mp.Vector3(78.63522, 111.5582, 81.16817), { name: "Trabajo - Cartero", scale: 0.8, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(408, new mp.Vector3(-425.7651, -2785.7996, 6.000382), { name: "Trabajo - Cartero", scale: 0.8, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(408, new mp.Vector3(-405.1782, 6150.5205, 31.678293), { name: "Trabajo - Cartero", scale: 0.8, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(616, new mp.Vector3(814.0063, -1644.947, 30.90012), { name: "Trabajo - Reponedor", scale: 0.8, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(67, new mp.Vector3(797.3534, -2988.584, 6.020938), { name: "Trabajo - Camionero", scale: 0.8, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(67, new mp.Vector3(173.6267, 2778.841, 46.07729), { name: "Trabajo - Camionero", scale: 0.8, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(67, new mp.Vector3(-17.78542, 6304.42, 31.37496), { name: "Trabajo - Camionero", scale: 0.8, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(513, new mp.Vector3(437.55, -625.99, 28.70815), { name: "Trabajo - Buses Textile City", scale: 0.8, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(513, new mp.Vector3(-812.5303, -2671.735, 13.80657), { name: "Trabajo - Buses Aeropuerto", scale: 0.8, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(513, new mp.Vector3(223.6263, 173.6041, 104.987), { name: "Trabajo - Buses Downtown Vinewood", scale: 0.8, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(513, new mp.Vector3(-917.1456, -74.15102, 37.86012), { name: "Trabajo - Buses Rockford Hills", scale: 0.8, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(318, new mp.Vector3(-355.1064, -1514.313, 27.71751), { name: "Trabajo - Basurero", scale: 0.8, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(318, new mp.Vector3(2029.934, 3183.627, 45.08184), { name: "Trabajo - Basurero", scale: 0.8, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(318, new mp.Vector3(-149.3427, 6485.527, 29.72809), { name: "Trabajo - Basurero", scale: 0.8, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(739, new mp.Vector3(417.8389, 6520.701, 27.71741), { name: "Trabajo - Recolector", scale: 0.8, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(739, new mp.Vector3(1905.676, 4926.507, 48.91108), { name: "Trabajo - Recolector", scale: 0.8, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(618, new mp.Vector3(2566.461, 2714.431, 42.61328), { name: "Trabajo - Minero", scale: 0.8, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(618, new mp.Vector3(2707.131, 2776.981, 37.87803), { name: "Trabajo - Minero", scale: 0.8, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
//Emisoras radio
mp.blips.new(564, new mp.Vector3(-599.0403, -929.841, 23.86335), { name: "Emisora de radio o televisión", scale: 0.8, color: 32, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(564, new mp.Vector3(-318.915, -609.822, 33.5582), { name: "Emisora de radio o televisión", scale: 0.8, color: 32, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(564, new mp.Vector3(733.0656, 2523.327, 73.22386), { name: "Emisora de radio o televisión", scale: 0.8, color: 32, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(564, new mp.Vector3(750.5254, 222.2882, 87.42294), { name: "Emisora de radio o televisión", scale: 0.8, color: 32, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(564, new mp.Vector3(-276.2722, 6239.427, 31.48921), { name: "Emisora de radio o televisión", scale: 0.8, color: 32, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
//Gym
mp.blips.new(311, new mp.Vector3(-455.592, -19.7469, 46.1039), { name: "Gimnasio", scale: 0.8, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(311, new mp.Vector3(1731.55, 3708.2, 34.156), { name: "Gimnasio", scale: 0.8, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(311, new mp.Vector3(-39.0182, -1388.16, 30.4917), { name: "Gimnasio", scale: 0.8, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(311, new mp.Vector3(-1269.97, -369.674, 36.6358), { name: "Gimnasio", scale: 0.8, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(311, new mp.Vector3(-44.9325, -1289.8, 29.1726), { name: "Gimnasio", scale: 0.8, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(311, new mp.Vector3(249.168, -3073.59, 5.86302), { name: "Gimnasio", scale: 0.8, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(311, new mp.Vector3(451.346, -1862.89, 27.7907), { name: "Gimnasio", scale: 0.8, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
//Galerías de tiro
mp.blips.new(432, new mp.Vector3(12.54883, -1105.1913, 29.7970), { name: "Galería de tiro", scale: 0.8, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, }); //Pillbox
mp.blips.new(432, new mp.Vector3(819.6754, -2155.774, 29.6190), { name: "Galería de tiro", scale: 0.8, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, }); //Cypress
//Otros
mp.blips.new(100, new mp.Vector3(24.57766, -1391.815, 28.94249), { name: "Autolavado", scale: 0.8, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(100, new mp.Vector3(-699.8408, -933.2875, 18.62677), { name: "Autolavado", scale: 0.8, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(109, new mp.Vector3(-1370.743, 56.32232, 53.31625), { name: "Campo de Golf", scale: 0.8, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(77, new mp.Vector3(-704.2617, -1398.436, 5.495287), { name: "Autoescuela", scale: 0.8, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(550, new mp.Vector3(2131.955, 4780.875, 40.97029), { name: "Grapseed Skydiving", scale: 0.8, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(307, new mp.Vector3(1742.479, 3302.086, 41.22351), { name: "Aerodromo Sandy Shores", scale: 0.8, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(307, new mp.Vector3(-1660.995, -3157.82, 13.99201), { name: "Hangar Pegasus Airlines", scale: 0.8, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
//mp.blips.new(477, new mp.Vector3(25.8191, -663.1497, 31.62861), { name: "Central Gruppe6", scale: 0.8, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
// Circuito motocross - negocio 244
mp.blips.new(38, new mp.Vector3(849.232, 2383.78, 54.1577), { name: "Circuito Redwood Light", scale: 0.8, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
//mp.blips.new(38, new mp.Vector3(-335.6674, -766.9764, 33.96842), { name: "Karts", scale: 0.8, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(303, new mp.Vector3(241.084, -1378.93, 33.74172), { name: "Morgue", scale: 0.8, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
// Hotel
mp.blips.new(80, new mp.Vector3(-1273.86, 316.003, 65.5118), { name: "Hotel", scale: 0.8, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
// VTC
mp.blips.new(198, new mp.Vector3(389.171, -75.18, 68.1806), { name: "CABY", scale: 0.8, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
mp.blips.new(198, new mp.Vector3(908.013, -160.713, 74.1409), { name: "DownTown Cab Co VTC Services", scale: 0.8, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
// Prisión federal
mp.blips.new(58, new mp.Vector3(1849.3945, 2585.8848, 45.672005), { name: "Prisión federal", scale: 0.8, color: 5, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
/*
 * Blips MARCAS
 */
//Lista de blips
let blips = [];
let blipsAvisos = [];
// Control OnUpdate
let tiempoAnterior = 0;
let tiempoJuego = 0;

// Si alguien se desconecta y tenia una marca activa la borramos
mp.events.add('playerQuit', (player) => {
    if (blips && blips.length > 0) {
        for (let i = 0, n = blips.length; i < n; i++) {
            let blip = blips[i];
            if (blip && blip.jugador == player) {
                if (blip.Blip && mp.blips.exists(blip.Blip)){
                    blip.Blip.destroy();
                }
                blips.splice(i, 1);
                break;
            }
        }
    }
});

mp.events.add({
    "borrar_blips": () => {
        // Borramos todos los blips
        if (blips && blips.length > 0) {
            for (let i = 0, n = blips.length; i < n; i++) {
                let blip = blips[i];
                if (blip && blip.Blip && mp.blips.exists(blip.Blip)) {
                    blip.Blip.destroy();
                }
            }

            blips = [];
        }

        if (blipsAvisos && blipsAvisos.length > 0) {
            for (let i = 0, n = blipsAvisos.length; i < n; i++) {
                let blip = blipsAvisos[i];
                if (blip && blip.Blip && mp.blips.exists(blip.Blip)) {
                    blip.Blip.destroy();
                }
            }

            blipsAvisos = [];
        }
    },
    "crear_blip_aviso": (idAviso, sprite, posicion, color, nombre) => {
        // Evento disparado cuando se quiere mostrar un blip de un jugador
        // Argumento 0: ID Aviso
        // Argumento 1: sprite del blip
        // Argumento 2: posicion del blip
        // Argumento 3: color del blip
        // Argumento 4: nombre del blip

        // Si ya existe el blip con misma id de aviso lo borramos
        for (let i = 0, n = blipsAvisos.length; i < n; i++) {
            let blip = blipsAvisos[i];
            if (blip.idAviso == idAviso) {
                if (blip.Blip && mp.blips.exists(blip.Blip)){
                    blip.Blip.setSprite(sprite);
                    blip.sprite = sprite;

                    if (color != 0) {
                        blip.Blip.setColour(color);
                        blip.color = color;
                    }
                    if (sprite == 539) {
                        blip.Blip.setScale(0.7);
                    }
                    else {
                        blip.Blip.setScale(1.0);
                    }

                    blip.Blip.name = nombre;

                    blip.Blip.setCoords(posicion);
                    return;
                }
                else {
                    blipsAvisos.splice(i, 1);
                    break;
                }
            }
        }

        let blip = mp.blips.new(sprite, posicion, { name: nombre, scale: 0.8, alpha: 255, drawDistance: 0, shortRange: true, dimension: 0});
        if (color != 0) {
            blip.setColour(color);
        }
        if (sprite == 539) {
            blip.setScale(0.7);
        }
        else {
            blip.setScale(1.0);
        }
        // Agregamos el blip a la lista
        const obj = {
            Blip: blip,
            sprite: sprite,
            color: color,
            idAviso: idAviso,
        };
        blipsAvisos.push(obj);
    },
    "borrar_blip_aviso": (idAviso) => {
        // Si ya existía el blip lo borramos
        for (let i = 0, n = blipsAvisos.length; i < n; i++) {
            let blip = blipsAvisos[i];
            if (blip.idAviso == idAviso) {
                if (mp.blips.exists(blip.Blip))
                    blip.Blip.destroy();
                blipsAvisos.splice(i, 1);
                return;
            }
        }
    },
    "mostrar_blip_jugador": (jugador, sprite, color, posicion) => {
        if (!mp.players.exists(jugador)) return;
        // Evento disparado cuando se quiere mostrar un blip de un jugador
        // Argumento 0: Entidad del jugador que marcar
        // Argumento 1: sprite del blip
        // Argumento 2: color del blip    
        // Argumento 3: posición inicial del blip

        // Si ya existe el blip cambiamos sus valores y no seguimos
        for (let i = 0, n = blips.length; i < n; i++) {
            let blip = blips[i];
            if (blip.jugador == jugador) {
                if (blip.Blip && mp.blips.exists(blip.Blip)){
                    blip.Blip.setSprite(sprite);
                    blip.sprite = sprite;

                    if (color !== 0) {
                        blip.Blip.setColour(color);
                        blip.color = color;
                    }
                    if (sprite == 41) {
                        blip.Blip.setScale(0.5);
                    }
                    else {
                        blip.Blip.setScale(1.0);
                    }

                    blip.Blip.setCoords(posicion);
                    return;
                }
                else{
                    blips.splice(i, 1);
                    break;
                }
            }
        }

        let blip = mp.blips.new(sprite, posicion, { drawDistance: 10000.0, dimension: 0 });
        blip.setSprite(sprite);
        if (color != 0) {
            blip.setColour(color);
        }
        if (sprite == 41) {
            blip.setScale(0.5);
        }
        else {
            blip.setScale(1.0);
        }
        // Agregamos el blip a la lista
        const obj = {
            Blip: blip,
            //entidad: entidadBlipeada, // siempre era null
            jugador: jugador,
            sprite: sprite,
            color: color,
        };
        blips.push(obj);
    },
    // Evento disparado cuando quiere borrar el blip de un jugador
    // Argumento 0: ID del jugador
    "borrar_blip_jugador": (jugador) => {
        // Obtenemos el blip de la lista y si existe lo borramos
        for (let i = 0, n = blips.length; i < n; i++) {
            let blip = blips[i];
            if (blip.jugador == jugador) {
                if (mp.blips.exists(blip.Blip))
                    blip.Blip.destroy();
                blips.splice(i, 1);
                return;
            }
        }
    },
    // Evento disparado cuando se reciben datos de una entidad blipeada no local
    // Argumento 0: ID del jugador
    // Argumento 1: Posición
    "establecer_pos_blip": (jugador, posicion) => {
        for (let i = 0, n = blips.length; i < n; i++) {
            let blip = blips[i];
            if (blip.jugador == jugador) {
                if (mp.blips.exists(blip.Blip))
                    blip.Blip.setCoords(posicion);
                return;
            }
        }
    },
});

// Actualizamos la posición de los blips activos
mp.events.add('render', () => {
    if (blips != null && blips.length > 0) {
        let tiempoActual = new Date().getTime();
        if (tiempoActual - tiempoAnterior >= 500) {
            blips.forEach((blip) => {
                if (blip.Blip != null) {
                    if (mp.blips.exists(blip.Blip) && blip.Blip.doesExist()) { // Solo actualizamos blips si estamos en DIM 0 (.doesExist() siempre devuelve falso en otras dimensiones)
                        // SIN USO - blip.entidad siempre era null
                        /*if (blip.entidad != null) {
                            if (blip.entidad.doesExist()) {
                                if (blip.entidad.position.x !== 0 && blip.entidad.position.y !== 0 && blip.entidad.position.z !== 0) {
                                    blip.Blip.setCoords(blip.entidad.position);
                                }
                                else {
                                    blip.entidad = null;
                                }
                            }
                            else {
                                blip.entidad = null;
                                if (blip.Blip.doesExist() && mp.blips.exists(blip.Blip))
                                    blip.Blip.destroy();
                                let idx = blips.indexOf(blip);
                                if (idx !== -1)
                                    blips.splice(idx, 1);
                            }
                        }
                        else {*/
                            // La entidad no existe localmente, le pedimos la posición al servidor (cada 5 segundos)
                            let tiempoMilisegundos = new Date().getTime();
                            if (tiempoMilisegundos - tiempoJuego >= 2500) {
                                mp.events.callRemote("pedir_posicion_jug", blip.jugador, blip.sprite, blip.color);
                                tiempoJuego = tiempoMilisegundos;
                            }
                        //}
                    }
                }
            });
            tiempoAnterior = tiempoActual;
        }
    }
});

/*
 * Blips Negocios - SIN USO
 */
/*
var blips_negocios = [];
mp.events.add('crearBlipsNegocios', function (array) {
    var blips_array = JSON.parse(array);
    var _loop_3 = function () {
        var blip_existe = false;
        blips_negocios.forEach(function (blips) {
            if (blips.negocio == blips_array[i + 4])
                blip_existe = true;
        });
        if (!blip_existe) {
            mp.gui.chat.push("Nombre negocio: " + blips_array[i + 2] + " ID: " + blips_array[i + 4]);
            var Blip = mp.blips.new(blips_array[i], new mp.Vector3(blips_array[i + 1].x, blips_array[i + 1].y, blips_array[i + 1].z), { name: blips_array[i + 2], scale: 0.8, color: blips_array[i + 3], alpha: 255, drawDistance: 50.0, shortRange: true, rotation: 0, dimension: 0, });

			var obj = {
				blips: Blip,
				negocio: blips_array[i + 4],
			};
			blips_negocios.push(obj);
        }
    };
    for (var i = 0; i < blips_array.length; i += 5) {
        _loop_3();
    }
});

mp.events.add('blipsNegocios_pos', function (array) {
    var blips_array = JSON.parse(array);
    blips_negocios.forEach(function (blip) {
        if (blip.negocio == blips_array[0]) {
            blip.blips.setPosition(new mp.Vector3(blips_array[1], blips_array[2], blips_array[3]));
        }
    });
});

mp.events.add('blipsNegocios_blip', function (parametro1, parametro2) {
    blips_negocios.forEach(function (blip) {
        if (blip.negocio == parametro1) {
            blip.blips.setSprite(parametro2);
        }
    });
});

mp.events.add('blipsNegocios_color', function (parametro1, parametro2) {
    blips_negocios.forEach(function (blip) {
        if (blip.negocio == parametro1) {
            blip.blips.setColour(parametro2);
        }
    });
});

mp.events.add('blipsNegocios_Alpha', function (parametro1, parametro2) {
    blips_negocios.forEach(function (blip) {
        if (blip.negocio == parametro1) {
            blip.blips.setAlpha(parametro2);
        }
    });
});

mp.events.add('borrarBlipNegocio', function (parametro1) {
    blips_negocios.forEach(function (blip) {
        if (blip.negocio == parametro1) {
            if (blip.blips.doesExist() && mp.blips.exists(blip.Blip))
                blip.blips.destroy();
            var idx = blips_negocios.indexOf(blip);
            if (idx !== -1)
                blips_negocios.splice(idx, 1);
        }
    });
});*/

/*
 * ---- Blips opcionales ----
 *
 * Carga inicial
 *
 * Tras acabar de cargar los negocios (carga.html) recibimos el evento y creamos las categorías guardadas por el usuario
 * Si no tiene el array de categorías guardadas (acaba de descargar el cliente del sv) le activamos todas las categorías
 */
mp.events.add("cargarBlipsGuardados", function() {
    if (!mp.storage.data.blips || mp.storage.data.blips.length == 0) { // Si no tienen el array de blips guardados o lo tiene completamente vacio le activamos todos por defecto
        mp.storage.data.blips = [3, 4, 5, 6, 9, 12, 15, 16, 18, 22];
        // Creamos los blips de las categorías guardadas por el usuario
        for (let h of mp.storage.data.blips) {
            actualizarBlips(h, true);
        }
    }
    else { // Existe el array de blips guardados
        if (mp.storage.data.blips[0] != -1) { // Si tiene guardadas categorías válidas creamos dichos blips
            for (let h of mp.storage.data.blips) {
                actualizarBlips(h, true);
            }
        }
    }
});

var blips_tiendas = []; // ID - 3
var blips_ropa = []; // ID - 4
var blips_peluqueria = []; // ID - 5
var blips_tatuajes = []; // ID - 6
var blips_electonica = []; // ID - 9
var blips_bar = []; // ID - 12
var blips_compraventaVeh = []; // ID - 15
var blips_inmobiliaria = []; // ID - 16
var blips_moteles = []; // ID - 18 
var blips_iglesia = []; // ID - 22

// Forzados
var blips_talleres = []; // ID - 10 -> Talleres abiertos
var blips_clubs = []; // ID - 11 -> Clubs en estadofiesta
var blip_karting = null; // ID -> 7 (Solo hay un Karting que es una oficina aislada)

/* Evento controlador de guardado de blips opcionales
 * item -> categoría de negocios (tipo)
 * boolean -> define si hay que activarlos o desactivarlos
 * 
 * El evento llama a actualizarBlips, tras esto realiza el guardado/borrado de la categoría de blips que ha recibido
 */
mp.events.add("controladorBlips", function (item, boolean) {
    actualizarBlips(item, boolean);

    if (mp.storage.data.blips) { // Existe el array de blips opcionales guardados
        let idx = -1;

        if (mp.storage.data.blips[0] == -1 && boolean) { // Tenía guardado no tener blips opcionales y acaba de activar una categoría
            mp.storage.data.blips = []; // Eliminamos el "-1" que determina que no quería blips guardados
        }
        else {
            // Recorremos todas las categorías guardadas y obtenemos el indice de la categoría que buscamos (si no está idx = -1)
            for (let h of mp.storage.data.blips) {
                if (h == item) {
                    idx = mp.storage.data.blips.indexOf(h); // Guardamos su indice
                    break;
                }
            }
        }

        if (idx != -1 && !boolean) { // Tenemos la categoría guardada y queremos borrarla
            mp.storage.data.blips.splice(idx, 1);

            // Si acaba borrando todas dejamos guardado "-1" para indicar que no quiere blips opcionales
            if (mp.storage.data.blips.length == 0) {
                mp.storage.data.blips = [-1];
            }
        }
        else if (idx == -1 && boolean) { // No tenemos la categoría guardada y queremos añadirla
            mp.storage.data.blips.push(item);
        }
    }
    else { // No existe el array de blips opcionales guardados
        if (boolean) { // Guardar la categoría
            mp.storage.data.blips = [];
            mp.storage.data.blips.push(item);
        }
    }

    mp.storage.flush(); // Forzamos el guardado del array
});

/* Función para crear/borrar todos los blips de una categoria
 * 
 * Entra a la parte correspondiente a cada tipo de negocio y activa o desactiva los blips además de añadirlos al array
 * "blips_guardados", el cual actualiza las categorías escogidas en el menú del ALT
 */
function actualizarBlips(item, boolean) {
    switch (item) {
        case 3:
            if (boolean) { // Crear blips
                for (let i = 0, n = negocios.length; i < n; i++) { // Creamos todos los blips de negocios de tipo 3
                    if (negocios[i].tipo == 3) {
                        if (negocios[i].interior_id == 173 || negocios[i].llave == 738 || negocios[i].llave == 552) { // Gym
                            continue;
                        } else {
                            switch (negocios[i].llave) { // Segun el tipo de "tienda" aplicamos diferentes blips
                                case 35: case 36: case 37: case 38:
                                    let blip_amm = mp.blips.new(110, negocios[i].puerta, { name: "Ammu Nation", scale: 0.8, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
                                    blips_tiendas.push(blip_amm); // Metemos el blip al array de su categoria
                                    break;
                                case 44: case 161: case 196: case 277:
                                    let blip_fer = mp.blips.new(566, negocios[i].puerta, { name: "Ferretería", scale: 0.8, color: 62, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
                                    blips_tiendas.push(blip_fer);
                                    break;
                                case 99: case 226: case 783: case 929: case 930:
                                    let blip_gro = mp.blips.new(496, negocios[i].puerta, { name: "Growshop", scale: 0.8, color: 52, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
                                    blips_tiendas.push(blip_gro);
                                    break;
                                case 728: case 729: case 730: case 731: case 753:
                                    let blip_pap = mp.blips.new(525, negocios[i].puerta, { name: "Papelería", scale: 0.8, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
                                    blips_tiendas.push(blip_pap);
                                    break;
                                case 890:
                                    let blip_sex = mp.blips.new(621, negocios[i].puerta, { name: "Sexshop", scale: 0.8, color: 23, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
                                    blips_tiendas.push(blip_sex);
                                    break;
                                case 735:
                                    let blip_joy = mp.blips.new(617, negocios[i].puerta, { name: "Joyería", scale: 0.8, color: 53, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
                                    blips_tiendas.push(blip_joy);
                                    break;
                                case 842: case 843: case 962:
                                    let blip_farmacia = mp.blips.new(51, negocios[i].puerta, { name: "Farmacia", scale: 0.8, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
                                    blips_tiendas.push(blip_farmacia);
                                    break;
                                default:
                                    let blip_tie = mp.blips.new(52, negocios[i].puerta, { name: "Tienda", scale: 0.8, color: 2, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
                                    blips_tiendas.push(blip_tie);
                                    break;
                            }
                        }
                    } 
                }
                blips_guardados.push(3); // Actualizamos el array de blips guardados (añadimos esta categoria al array)
            }
            else { // Borrar blips
                for (let i = 0, n = blips_tiendas.length; i < n; i++) { // Borramos todos los blips de la categoría y vaciamos el array
                    if (blips_tiendas[i] != null) {
                        blips_tiendas[i].destroy();
                        blips_tiendas[i] = null;
                    }
                }
                blips_tiendas = [];

                for (let i = 0, n = blips_guardados.length; i < n; i++) { // Actualizamos el array de blips guardados (eliminamos esta categoria del array)
                    if (blips_guardados[i] == 3) {
                        blips_guardados.splice(i, 1);
                        break;
                    }
                }
            }
            break;
        case 4:
            if (boolean) {
                for (let i = 0, n = negocios.length; i < n; i++) {
                    if (negocios[i].tipo == 4) {
                        let blip = mp.blips.new(73, negocios[i].puerta, { name: "Tienda de ropa", scale: 0.8, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
                        blips_ropa.push(blip);
                    }
                }
                blips_guardados.push(4);
            }
            else {
                for (let i = 0, n = blips_ropa.length; i < n; i++) {
                    if (blips_ropa[i] != null) {
                        blips_ropa[i].destroy();
                        blips_ropa[i] = null;
                    }
                }
                blips_ropa = [];

                for (let i = 0, n = blips_guardados.length; i < n; i++) {
                    if (blips_guardados[i] == 4) {
                        blips_guardados.splice(i, 1);
                        break;
                    }
                }
            }
            break;
        case 5:
            if (boolean) {
                for (let i = 0, n = negocios.length; i < n; i++) {
                    if (negocios[i].tipo == 5) {
                        let blip = mp.blips.new(71, negocios[i].puerta, { name: "Peluquería", scale: 0.8, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
                        blips_peluqueria.push(blip);
                    }
                }
                blips_guardados.push(5);
            }
            else {
                for (let i = 0, n = blips_peluqueria.length; i < n; i++) {
                    if (blips_peluqueria[i] != null) {
                        blips_peluqueria[i].destroy();
                        blips_peluqueria[i] = null;
                    }
                }
                blips_peluqueria = [];

                for (let i = 0, n = blips_guardados.length; i < n; i++) {
                    if (blips_guardados[i] == 5) {
                        blips_guardados.splice(i, 1);
                        break;
                    }
                }
            }
            break;
        case 6:
            if (boolean) {
                for (let i = 0, n = negocios.length; i < n; i++) {
                    if (negocios[i].tipo == 6) {
                        let blip = mp.blips.new(75, negocios[i].puerta, { name: "Estudio Tatuajes", scale: 0.8, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
                        blips_tatuajes.push(blip);
                    }
                }
                blips_guardados.push(6);
            }
            else {
                for (let i = 0, n = blips_tatuajes.length; i < n; i++) {
                    if (blips_tatuajes[i] != null) {
                        blips_tatuajes[i].destroy();
                        blips_tatuajes[i] = null;
                    }
                }
                blips_tatuajes = [];

                for (let i = 0, n = blips_guardados.length; i < n; i++) {
                    if (blips_guardados[i] == 6) {
                        blips_guardados.splice(i, 1);
                        break;
                    }
                }
            }
            break;
        case 9:
            if (boolean) {
                for (let i = 0, n = negocios.length; i < n; i++) {
                    if (negocios[i].tipo == 9) {
                        let blip = mp.blips.new(521, negocios[i].puerta, { name: "Tienda de electrónica", scale: 0.8, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
                        blips_electonica.push(blip);
                    }
                }
                blips_guardados.push(9);
            }
            else {
                for (let i = 0, n = blips_electonica.length; i < n; i++) {
                    if (blips_electonica[i] != null) {
                        blips_electonica[i].destroy();
                        blips_electonica[i] = null;
                    }
                }
                blips_electonica = [];

                for (let i = 0, n = blips_guardados.length; i < n; i++) {
                    if (blips_guardados[i] == 9) {
                        blips_guardados.splice(i, 1);
                        break;
                    }
                }
            }
            break;
        case 12:
            if (boolean) {
                for (let i = 0, n = negocios.length; i < n; i++) {
                    if (negocios[i].tipo == 12) {
                        let crear = true;
                        for (let j = 0, m = blips_bar.length; j < m; j++) { // Si ya está creado con estadofiesta lo saltamos
                            if (blips_bar[j].llave == negocios[i].llave) {
                                if (blips_bar[j].blip != null) {
                                    if (blips_bar[j].blip.getColour() == 27) { // Los que están en estadofiesta no los borramos
                                        crear = false;
                                        break;
                                    }
                                }
                            }
                        }

                        if (crear) {
                            let nuevoBlip = mp.blips.new(93, negocios[i].puerta, { name: "Bar", scale: 0.8, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
                            let obj = {
                                llave: negocios[i].llave,
                                blip: nuevoBlip,
                            };
                            blips_bar.push(obj);
                        }
                    }
                }
                blips_guardados.push(12);
            }
            else {
                for (let i = 0, n = blips_bar.length; i < n; i++) {
                    if (blips_bar[i].blip != null) {
                        if (blips_bar[i].blip.getColour() != 27) { // Los que están en estadofiesta no los borramos
                            blips_bar[i].blip.destroy();
                            blips_bar[i].blip = null;
                        }
                    }
                }

                for (let i = 0, n = blips_guardados.length; i < n; i++) {
                    if (blips_guardados[i] == 12) {
                        blips_guardados.splice(i, 1);
                        break;
                    }
                }
            }
            break;
        case 15:
            if (boolean) {
                for (let i = 0, n = negocios.length; i < n; i++) {
                    if (negocios[i].tipo == 15) {
                        let blip = mp.blips.new(810, negocios[i].puerta, { name: "Compraventa", scale: 0.8, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
                        blips_compraventaVeh.push(blip);
                    }
                }
                blips_guardados.push(15);
            }
            else {
                for (let i = 0, n = blips_compraventaVeh.length; i < n; i++) {
                    if (blips_compraventaVeh[i] != null) {
                        blips_compraventaVeh[i].destroy();
                        blips_compraventaVeh[i] = null;
                    }
                }
                blips_compraventaVeh = [];

                for (let i = 0, n = blips_guardados.length; i < n; i++) {
                    if (blips_guardados[i] == 15) {
                        blips_guardados.splice(i, 1);
                        break;
                    }
                }
            }
            break;
        case 16:
            if (boolean) {
                for (let i = 0, n = negocios.length; i < n; i++) {
                    if (negocios[i].tipo == 16) {
                        let blip = mp.blips.new(375, negocios[i].puerta, { name: "Inmobiliaria", scale: 0.8, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
                        blips_inmobiliaria.push(blip);
                    }
                }
                blips_guardados.push(16);
            }
            else {
                for (let i = 0, n = blips_inmobiliaria.length; i < n; i++) {
                    if (blips_inmobiliaria[i] != null) {
                        blips_inmobiliaria[i].destroy();
                        blips_inmobiliaria[i] = null;
                    }
                }
                blips_inmobiliaria = [];

                for (let i = 0, n = blips_guardados.length; i < n; i++) {
                    if (blips_guardados[i] == 16) {
                        blips_guardados.splice(i, 1);
                        break;
                    }
                }
            }
            break;
        case 18:
            if (boolean) {
                for (let i = 0, n = negocios.length; i < n; i++) {
                    if (negocios[i].tipo == 18) {
                        let blip = mp.blips.new(78, negocios[i].puerta, { name: "Motel", scale: 0.8, color: 22, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
                        blips_moteles.push(blip);
                    }
                }
                blips_guardados.push(18);
            }
            else {
                for (let i = 0, n = blips_moteles.length; i < n; i++) {
                    if (blips_moteles[i] != null) {
                        blips_moteles[i].destroy();
                        blips_moteles[i] = null;
                    }
                }
                blips_moteles = [];

                for (let i = 0, n = blips_guardados.length; i < n; i++) {
                    if (blips_guardados[i] == 18) {
                        blips_guardados.splice(i, 1);
                        break;
                    }
                }
            }
            break;
        case 22:
            if (boolean) {
                for (let i = 0, n = negocios.length; i < n; i++) {
                    if (negocios[i].tipo == 22) {
                        let blip = mp.blips.new(305, negocios[i].puerta, { name: "Iglesia", scale: 0.8, color: 31, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
                        blips_iglesia.push(blip);
                    }
                }
                blips_guardados.push(22);
            }
            else {
                for (let i = 0, n = blips_iglesia.length; i < n; i++) {
                    if (blips_iglesia[i] != null) {
                        blips_iglesia[i].destroy();
                        blips_iglesia[i] = null;
                    }
                }
                blips_iglesia = [];

                for (let i = 0, n = blips_guardados.length; i < n; i++) {
                    if (blips_guardados[i] == 22) {
                        blips_guardados.splice(i, 1);
                        break;
                    }
                }
            }
            break;
        default:
            break;
    }
}

/* Evento para blips "forzados"
 * llave -> llave del negocio
 * boolean -> define si hay que activarlo o desactivarlo
 *
 * El evento crea/elimina el blip de X negocio
 * 
 * Usado con estadofiesta de clubs y apertura/cierre de talleres
 */
mp.events.add("crearBlip", function (llave, bool) {
    if (!blipsCargados){
        let encontrado = false;
        if (blipsEnEspera.length > 0){
            for(let i = 0, n = blipsEnEspera.length; i < n; i++){
                if (blipsEnEspera[i].llave == llave && blipsEnEspera[i].activo != bool){
                    blipsEnEspera[i].activo = bool;
                    encontrado = true;
                    break;
                }
            }
        }
        if (!encontrado) blipsEnEspera.push({llave: llave, activo: bool});
        return;
    }

    let tipoNegocio = -1;
    let posicion = new mp.Vector3(0, 0, 0);
    for (let i = 0, n = negocios.length; i < n; i++) {
        if (negocios[i].llave == llave) {
            tipoNegocio = negocios[i].tipo;
            posicion = negocios[i].puerta;
            break;
        }
    }

    if (llave == 101 && bool) {
        if (blip_karting == null) {
            blip_karting = mp.blips.new(315, posicion, { name: "Karting", scale: 0.8, color: 5, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
        }
    } else if (llave == 101 && !bool) {
        if (blip_karting != null) {
            blip_karting.destroy();
            blip_karting = null;
        }
    }

    switch (tipoNegocio) {
        case 10: // Taller
            if (bool) { // Crear
                let blipIcon = 446;
                let blipColor = 5;
                let blipScale = 0.8;
                let blipName = "Taller";
                if (llave == 596 || llave == 920) { // Si son talleres de maquina los marcamos con otro blip y color
                    blipIcon = 402;
                    blipColor = 46;
                    blipScale = 1.1;
                    blipName = "Taller - Fast Repair";
                }
                let nuevoBlip = mp.blips.new(blipIcon, posicion, { name: blipName, scale: blipScale, color: blipColor, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
                let obj = {
                    llave: llave,
                    blip: nuevoBlip,
                };
                blips_talleres.push(obj);
            }
            else { // Borrar
                for (let i = 0, n = blips_talleres.length; i < n; i++) {
                    if (blips_talleres[i].llave == llave) {
                        if (blips_talleres[i].blip != null) {
                            blips_talleres[i].blip.destroy();
                            blips_talleres[i].blip = null;
                            blips_talleres.splice(i, 1);
                            break;
                        }
                    }
                }
            }
            break;
        case 11: // Club
            if (bool) { // Crear
                let nuevoBlip = mp.blips.new(614, posicion, { name: "Club", scale: 0.8, color: 48, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
                let obj = {
                    llave: llave,
                    blip: nuevoBlip,
                };
                blips_clubs.push(obj);
            }
            else { // Borrar
                for (let i = 0, n = blips_clubs.length; i < n; i++) {
                    if (blips_clubs[i].llave == llave) {
                        if (blips_clubs[i].blip != null) {
                            blips_clubs[i].blip.destroy();
                            blips_clubs[i].blip = null;
                            blips_clubs.splice(i, 1);
                            break;
                        }
                    }
                }
            }
            break;
        case 12: // Bar
            let categoria_guardada = false;
            for (let i = 0, n = blips_guardados.length; i < n; i++) {
                if (blips_guardados[i] == 12) {
                    categoria_guardada = true;
                    break;
                }
            }

            if (bool) { // Crear
                if (categoria_guardada) { // Borramos el blanco
                    for (let i = 0, n = blips_bar.length; i < n; i++) {
                        if (blips_bar[i].llave == llave) {
                            if (blips_bar[i].blip != null) {
                                blips_bar[i].blip.destroy();
                                blips_bar[i].blip = null;
                                blips_bar.splice(i, 1);
                                break;
                            }
                        }
                    }
                }

                let nuevoBlip = mp.blips.new(93, posicion, { name: "Bar", scale: 0.8, color: 27, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
                let obj = {
                    llave: llave,
                    blip: nuevoBlip,
                };
                blips_bar.push(obj);
            }
            else { // Borrar
                for (let i = 0, n = blips_bar.length; i < n; i++) {
                    if (blips_bar[i].llave == llave) {
                        if (blips_bar[i].blip != null) {
                            blips_bar[i].blip.destroy();
                            blips_bar[i].blip = null;
                            blips_bar.splice(i, 1);
                            break;
                        }
                    }
                }

                if (categoria_guardada) { // Volvemos a crearlo en blanco
                    let nuevoBlip = mp.blips.new(93, posicion, { name: "Bar", scale: 0.8, color: 0, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
                    let obj = {
                        llave: llave,
                        blip: nuevoBlip,
                    };
                    blips_bar.push(obj);
                }
            }
            break;
        default:
            break;
    }
});

let blipsCargados = true;
let blipsEnEspera = []; // Lista de blips del evento crearBlip recibidos antes de crear los blips de la lista recibida al conectar
function crearBlipsConexion(array) {
    var array_llaves = JSON.parse(array);
    blipsCargados = false;

    crearTimeout(function () { // El evento se recibe al instante, esperamos 30 segundos a tener los negocios cargados en el cliente
        for (let i = 0, n = array_llaves.length; i < n; i++) {
            for (let j = 0, m = negocios.length; j < m; j++) {
                if (negocios[j].llave == array_llaves[i]) {

                    // Si el negocio ha sido cerrado no queremos que este timeout cree su blip, por lo tanto comprobamos si se ha recibido el cierre 
                    if (blipsEnEspera.length > 0){
                        let crearBlip = true;

                        for(let a = 0, b = blipsEnEspera.length; a < b; a++){
                            if (blipsEnEspera[a].llave == negocios[j].llave && blipsEnEspera[a].activo == false){
                                crearBlip = false;
                                blipsEnEspera.splice(a, 1);
                                break;
                            }
                        }

                        if (!crearBlip) continue;
                    }

                    switch (negocios[j].tipo) {
                        case 10:
                            let blipIcon = 446;
                            let blipColor = 5;
                            let blipScale = 0.8;
                            let blipName = "Taller";
                            if (negocios[j].llave == 596 || negocios[j].llave == 920) { // Si son talleres de maquina los marcamos con otro blip y color
                                blipIcon = 402;
                                blipColor = 46;
                                blipScale = 1.1;
                                blipName = "Taller - Fast Repair";
                            }
                            let blipNeg = mp.blips.new(blipIcon, negocios[j].puerta, { name: blipName, scale: blipScale, color: blipColor, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
                            let neg = {
                                llave: negocios[j].llave,
                                blip: blipNeg,
                            };
                            blips_talleres.push(neg);
                            break;
                        case 11:
                            let blipNeg2 = mp.blips.new(614, negocios[j].puerta, { name: "Club", scale: 0.8, color: 48, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
                            let neg2 = {
                                llave: negocios[j].llave,
                                blip: blipNeg2,
                            };
                            blips_clubs.push(neg2);
                            break;
                        case 12:
                            let categoria_guardada = false;
                            for (let i = 0, n = blips_guardados.length; i < n; i++) {
                                if (blips_guardados[i] == 12) {
                                    categoria_guardada = true;
                                    break;
                                }
                            }

                            if (categoria_guardada) { // Borramos el blanco
                                for (let i = 0, n = blips_bar.length; i < n; i++) {
                                    if (blips_bar[i].llave == negocios[j].llave) {
                                        if (blips_bar[i].blip != null) {
                                            blips_bar[i].blip.destroy();
                                            blips_bar[i].blip = null;
                                            blips_bar.splice(i, 1);
                                            break;
                                        }
                                    }
                                }
                            }

                            let blipNeg3 = mp.blips.new(93, negocios[j].puerta, { name: "Bar", scale: 0.8, color: 27, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
                            let neg3 = {
                                llave: negocios[j].llave,
                                blip: blipNeg3,
                            };
                            blips_bar.push(neg3);
                            break;
                        default:
                            break;
                    }
                    break;
                }
            }
        }

        blipsCargados = true;
        blipsEnEspera = [];
        array_llaves = [];
        mp.events.remove("crearBlipsConexion", crearBlipsConexion);
    }, 30000);
}

/* Evento para crear blips "forzados" con la conexión del cliente
 * array -> array que contiene las llaves de los talleres abiertos o clubs con estadofiesta
 *
 * El evento crea los blips de todos los talleres abiertos o clubs en estadofiesta
 */
mp.events.add("crearBlipsConexion", crearBlipsConexion);
//# sourceMappingURL=blips.js.mapç
}