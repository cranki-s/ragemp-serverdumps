{
/* --------------------------------------------------------------------------------
 * autoescuela.js
 *
 * Autor: Doomer
 *
 * Descripción: Sistema de la autoescuela
 *
 * -------------------------------------------------------------------------------- */
// Indica si el test de autoescuela está en progreso
var testEmpezado = false;
// Ruta de la autoescuela seleccionada
var rutaSeleccionada = -1;
// Punto actual de la ruta seleccionada
var puntoActualRuta = 0;
// Tiempo anterior para onUpdate
var tiempoAnterior = 0;
var tipo = 0;
var marcadorAuto = null;
var instructorPed = null;

var vehiculoAutoescuela = null;
var timerAutoescuela = null;

function calcularDist(v1, v2) {
    return mp.game.system.vdist(v1.x, v1.y, v1.z, v2.x, v2.y, v2.z);
}
// Puntos de las rutas de turismos
var puntosRutas_turismos = [
    [
        new mp.Vector3(-707.4062, -1407.655, 4.823166),
        new mp.Vector3(-702.1934, -1380.087, 5.216094),
        new mp.Vector3(-671.6107, -1364.484, 9.666543),
        new mp.Vector3(-657.6555, -1415.515, 10.40733),
        new mp.Vector3(-841.7512, -1696.422, 18.51413),
        new mp.Vector3(-1093.976, -1957.619, 12.8912),
        new mp.Vector3(-975.2451, -2142.113, 8.911985),
        new mp.Vector3(-778.6376, -2336.905, 14.80634),
        new mp.Vector3(-728.5378, -2388.203, 14.45023),
        new mp.Vector3(-763.5587, -2446.818, 14.23961),
        new mp.Vector3(-783.635, -2485.097, 13.89982),
        new mp.Vector3(-815.7551, -2448.2, 14.48123),
        new mp.Vector3(-767.6391, -2199.667, 15.85173),
        new mp.Vector3(-482.4331, -1902.86, 17.15419),
        new mp.Vector3(-408.0638, -1846.029, 20.39489),
        new mp.Vector3(-389.4111, -1802.945, 21.41886),
        new mp.Vector3(-305.6664, -1581.563, 22.89596),
        new mp.Vector3(-273.2547, -1488.289, 30.29969),
        new mp.Vector3(-269.941, -1452.324, 31.14703),
        new mp.Vector3(-349.7906, -1425.524, 29.39312),
        new mp.Vector3(-436.6871, -1417.947, 29.14348),
        new mp.Vector3(-491.1745, -1264.437, 25.31465),
        new mp.Vector3(-512.0037, -1145.816, 19.47354),
        new mp.Vector3(-527.1039, -1096.421, 22.22075),
        new mp.Vector3(-540.0316, -983.3397, 23.18507),
        new mp.Vector3(-612.2803, -954.3705, 21.47671),
        new mp.Vector3(-643.47, -996.0215, 20.49158),
        new mp.Vector3(-752.0109, -1101.955, 10.57086),
        new mp.Vector3(-750.8003, -1167.833, 10.43881),
        new mp.Vector3(-658.8969, -1316.186, 10.41133),
        new mp.Vector3(-668.0936, -1357.022, 9.885427),
        new mp.Vector3(-707.9441, -1376.113, 5.165516)
    ],
    [
        new mp.Vector3(-707.4062, -1407.655, 4.823166),
        new mp.Vector3(-702.1934, -1380.087, 5.216094),
        new mp.Vector3(-671.6107, -1364.484, 9.666543),
        new mp.Vector3(-650.8666, -1410.426, 10.4886),
        new mp.Vector3(-666.6075, -1524.31, 12.61211),
        new mp.Vector3(-697.1846, -1574.892, 18.38288),
        new mp.Vector3(-692.6985, -1632.978, 23.8108),
        new mp.Vector3(-561.2303, -1747.607, 21.83752),
        new mp.Vector3(-427.2772, -1772.011, 20.46671),
        new mp.Vector3(-390.2811, -1720.414, 18.92239),
        new mp.Vector3(-291.5322, -1544.438, 26.20805),
        new mp.Vector3(-265.8337, -1475.845, 30.67192),
        new mp.Vector3(-270.4315, -1384.344, 31.15877),
        new mp.Vector3(-272.7077, -1233.912, 26.91504),
        new mp.Vector3(-274.7379, -1164.043, 22.90499),
        new mp.Vector3(-332.6855, -1134.677, 26.15892),
        new mp.Vector3(-512.8746, -1072.066, 22.44044),
        new mp.Vector3(-538.6468, -1010.039, 22.94888),
        new mp.Vector3(-539.5695, -980.8785, 23.20382),
        new mp.Vector3(-587.8651, -954.9659, 22.48932),
        new mp.Vector3(-712.3484, -955.2729, 18.58289),
        new mp.Vector3(-751.6176, -949.4205, 17.28447),
        new mp.Vector3(-742.8506, -858.2111, 22.30542),
        new mp.Vector3(-806.0761, -834.8423, 20.34147),
        new mp.Vector3(-838.0653, -833.6583, 19.19044),
        new mp.Vector3(-856.4184, -879.8777, 17.13284),
        new mp.Vector3(-865.2216, -915.0543, 15.33495),
        new mp.Vector3(-900.7363, -887.7267, 15.51834),
        new mp.Vector3(-978.558, -823.2723, 15.46948),
        new mp.Vector3(-1065.466, -778.9547, 19.16621),
        new mp.Vector3(-1123.278, -793.1337, 17.30002),
        new mp.Vector3(-1228.227, -874.2325, 12.60188),
        new mp.Vector3(-1264.729, -903.9943, 11.05353),
        new mp.Vector3(-1284.206, -963.3684, 10.65189),
        new mp.Vector3(-1258.314, -1051.362, 8.245364),
        new mp.Vector3(-1222.826, -1135.765, 7.656403),
        new mp.Vector3(-1213.27, -1204.63, 7.519052),
        new mp.Vector3(-1207.764, -1232.579, 6.803898),
        new mp.Vector3(-1164.766, -1323.665, 4.925323),
        new mp.Vector3(-1111.364, -1326.615, 4.970005),
        new mp.Vector3(-987.4689, -1254.537, 5.539252),
        new mp.Vector3(-867.026, -1185.926, 4.854118),
        new mp.Vector3(-787.4044, -1135.416, 10.42246),
        new mp.Vector3(-754.7526, -1161.889, 10.45166),
        new mp.Vector3(-680.1702, -1264.081, 10.41094),
        new mp.Vector3(-654.7488, -1348.335, 10.40563),
        new mp.Vector3(-710.2402, -1378.493, 4.893321)
    ],
    [
        new mp.Vector3(-707.4062, -1407.655, 4.823166),
        new mp.Vector3(-702.1934, -1380.087, 5.216094),
        new mp.Vector3(-671.6107, -1364.484, 9.666543),
        new mp.Vector3(-656.4153, -1391.322, 10.41437),
        new mp.Vector3(-674.3832, -1531.892, 13.30116),
        new mp.Vector3(-772.137, -1685.363, 28.6933),
        new mp.Vector3(-766.6426, -1769.689, 29.04512),
        new mp.Vector3(-520.5963, -2028.421, 27.15161),
        new mp.Vector3(-213.0995, -2129.077, 23.0258),
        new mp.Vector3(99.98094, -2049.282, 18.12049),
        new mp.Vector3(225.6291, -2077.807, 17.79325),
        new mp.Vector3(355.9131, -2166.194, 13.65203),
        new mp.Vector3(421.161, -2143.26, 18.05392),
        new mp.Vector3(467.1671, -2082.222, 23.20817),
        new mp.Vector3(448.1151, -2013.313, 23.29433),
        new mp.Vector3(376.227, -1937.835, 24.43492),
        new mp.Vector3(342.0527, -1903.887, 24.97867),
        new mp.Vector3(303.2767, -1867.663, 26.7421),
        new mp.Vector3(254.233, -1826.263, 26.58181),
        new mp.Vector3(190.7661, -1778.501, 28.92433),
        new mp.Vector3(141.896, -1737.52, 28.93783),
        new mp.Vector3(90.81679, -1689.286, 28.95466),
        new mp.Vector3(38.47728, -1649.18, 29.15),
        new mp.Vector3(3.845208, -1616.231, 29.10017),
        new mp.Vector3(-90.31394, -1537.415, 33.29744),
        new mp.Vector3(-148.533, -1488.149, 33.12836),
        new mp.Vector3(-202.4743, -1448.422, 31.26845),
        new mp.Vector3(-253.2967, -1420.614, 31.09683),
        new mp.Vector3(-269.3828, -1392.373, 31.14127),
        new mp.Vector3(-272.7969, -1240.854, 27.56969),
        new mp.Vector3(-274.949, -1163.895, 22.90408),
        new mp.Vector3(-309.8027, -1137.072, 23.69872),
        new mp.Vector3(-511.5339, -1079.499, 22.69942),
        new mp.Vector3(-547.8889, -1134.463, 20.32764),
        new mp.Vector3(-570.9051, -1205.728, 17.39528),
        new mp.Vector3(-607.1251, -1258.559, 11.39959),
        new mp.Vector3(-647.454, -1348.436, 10.48609),
        new mp.Vector3(-708.6807, -1376.911, 4.958404)
    ]
];
// Diálogos de las rutas de turismos
var dialogosRutas_turismos = [
    [
        "Gira a la derecha (=>) y sal de la autoescuela.",
        "Ahora giraremos a la derecha (=>) y nos pondremos en el carril derecho (=>).",
        "Gira a la derecha (=>), recuerda respetar el STOP.",
        "Gira a la derecha (=>) y siga por la carretera.",
        "Siga la carretera, mira desde aquí se ve la playa ¿no es preciosa?, esta ciudad es increíble.",
        "Un taller de Los Santos Customs, aquí podrás reparar tu vehículo y tunearlo, aunque a mí eso del tuning me parece de críos. Sigue recto por esta carretera.",
        "Sigue recto.",
        "Al llegar al cruce giraremos a la derecha (=>).",
        "Gira a la derecha (=>) ahora.",
        "Vamos a girar a la derecha (=>) al final de la calle, cuidado no te confundas con el acceso al aparcamiento.",
        "Gira a la derecha (=>) ahora, y otra vez para coger el acceso a la autopista.",
        "Lo estás haciendo muy bien, sigue recto y en el próximo desvío mantente a la izquierda (<=).",
        "Mantente a la izquierda (<=) y sigue recto como si fueras al Maze Bank arena. Menudo estadio ¿verdad?",
        "Incorpórese al carril izquierdo (<=), y gire para tomar el carril derecho (=>). Respete los semáforos.",
        "Gira a la izquierda (<=) ahora.",
        "Sigue recto por el carril derecho (=>).",
        "Toma el carril izquierdo (<=). Aunque no esté penado, procura frenar si el semáforo está en ámbar. Por precaución.",
        "Aunque solamente tenemos una opción en este carril por las marcas viales te lo recuerdo, a la izquierda (<=).",
        "Gira a la izquierda (<=) y mantente en el carril izquierdo (<=).",
        "Sigue recto por este carril.",
        "Seguimos recto sin dejar este carril.",
        "Anda mira la parada de Puerto del Sol del metro, el metro uno de los mejores transportes públicos de esta ciudad, ¿no te lo parece?",
        "Sigue recto, una vez incorporado a la calle cámbiate al carril izquierdo (<=).",
        "Incorpórese al carril izquierdo (<=), seguimos recto.",
        "Aquí, izquierda (<=) ahora.",
        "Ahora gira a la izquierda (<=) para bajar, mantente en el carril izquierdo (<=).",
        "Excelente, continúe recto hasta el próximo cruce. Giraremos a la izquierda (<=).",
        "Gira a la izquierda (<=) ahora y mantente en el carril derecho (=>).",
        "Sigue por este carril ya falta poco.",
        "Gira a la derecha (=>) para entrar a la autoescuela.",
        "Aparca el vehículo en el aparcamiento."
    ],
    [
        "Gira a la derecha (=>) y sal de la autoescuela.",
        "Ahora giraremos a la derecha (=>) y nos pondremos en el carril izquierdo (<=).",
        "Gira a la derecha (=>), recuerda respetar el STOP.",
        "Sigue recto por este carril.",
        "Como ya te están indicando las marcas viales de este carril solo tienes una opción, atento a las marcas viales.",
        "Ahora gira a la izquierda (<=).",
        "Sigue recto por esta calle.",
        "Seguimos recto. En el próximo cruce posible giraremos a la izquierda (<=).",
        "Gira a la izquierda (<=) y sitúate en el carril izquierdo (<=).",
        "Sigue por este carril.",
        "Incorpórese al carril derecho (=>), seguimos recto.",
        "Seguimos recto.",
        "Aquí aparecen dos carriles desde uno, sigue las indicaciones de las marcas viales para situarte en el carril correcto.",
        "Incorpórese al carril izquierdo (<=), giraremos a la izquierda (<=) en el próximo cruce.",
        "Gire a la izquierda (<=) y sitúate en el carril izquierdo (<=).",
        "Incorpórese al carril derecho (=>), seguimos recto.",
        "Gira a la derecha (=>), sitúate en el carril izquierdo (<=).",
        "En el próximo cruce giraremos a la izquierda (<=).",
        "Gire a la izquierda (<=).",
        "Ah... Yo solía ser un periodista como ellos, pero un día me golpeé con una cámara en el tobillo. Sigue recto.",
        "Sigue recto como te indica las marcas viales.",
        "Incorpórate a la calle seguimos hacia arriba.",
        "Gira a la izquierda (<=) y sitúate en el carril izquierdo (<=).",
        "En el próximo cruce giraremos a la izquierda (<=).",
        "Gira a la izquierda (<=).",
        "Sigue hasta el cruce, atento a las señales.",
        "Incorpórate a la calle, respeta el STOP y gira hacia la derecha (=>) no tienes otra opción. Nos situaremos en el carril izquierdo. (<=)",
        "Sigue recto, atento a las marcas viales de este carril.",
        "Incorpórese al próximo carril izquierdo (<=), giraremos a la izquierda (<=).",
        "Gira a la izquierda (<=).",
        "Sigue recto.",
        "Incorpórese al carril izquierdo (<=), giraremos a la izquierda (<=).",
        "Gire a la izquierda (<=).",
        "Del Perro Beach, mi playa favorita, este barrio es increíble, ¿te había dicho que una vez trabaje de vigilante de la playa? Qué buenos tiempos aquellos.",
        "Seguimos recto. Atento a las marcas viales seguiremos recto en el próximo cruce.",
        "Lo estás haciendo muy bien, sigue recto.",
        "Seguiremos recto.",
        "Seguiremos recto, respeta el STOP y sitúate en el carril izquierdo (<=) cuando sea posible.",
        "Giramos a la izquierda (<=) y nos situamos en el carril derecho (=>).",
        "Puerto del sol, me compraría un apartamento aquí si pudiera, pero con mi sueldo público no me llega ni para pipas...",
        "Aquí cerca los ricos se compran sus yates, lanchas o barcos. Sigue recto.",
        "Acóplate con cuidado al carril izquierdo (<=) y sigue recto, se unifica. En el siguiente cruce giraremos a la derecha (=>).",
        "Gira a la derecha (=>), vamos a la autoescuela que me estoy agobiando con tu forma de conducir.",
        "Recto hacia la autoescuela.",
        "Gira a la derecha (=>) para entrar a la autoescuela.",
        "Aparca el vehículo en el aparcamiento."
    ],
    [
        "Gira a la derecha (=>) y sal de la autoescuela.",
        "Ahora giraremos a la derecha (=>) y nos pondremos en el carril derecho.",
        "Gira a la derecha (=>), recuerda respetar el STOP.",
        "Sigue recto por este carril.",
        "Como ya te están indicando las marcas viales de este carril solo tienes una opción, atento a las marcas viales.",
        "Seguimos recto, vamos a coger un pequeño tramo de autopista, veamos cómo te defiendes.",
        "Sitúate en el carril izquierdo (<=) y luego en el derecho, seguimos recto.",
        "Seguimos recto por este carril, recuerda respetar el límite de velocidad no te aceleres, lo estás haciendo bien.",
        "El Maze Bank Arena menudo estadio ¿cuánto dinero costaría?, sigue recto.",
        "Seguimos en este carril, recto.",
        "Incorpórese al carril izquierdo (<=), seguimos recto y al final de la calle giraremos a la izquierda (<=).",
        "Gira a la izquierda (<=) y subimos por la calle.",
        "Incorpórese al carril izquierdo (<=), giraremos a la izquierda (<=) en el próximo cruce.",
        "Gire a la izquierda (<=) y sitúate en el carril izquierdo (<=).",
        "Seguimos recto por este carril.",
        "Seguimos recto.",
        "Incorpórese al carril derecho este se acaba, seguiremos recto.",
        "Seguimos recto, este barrio me inspira muy poca confianza pasemos rápido por él.",
        "Acóplate con cuidado al carril izquierdo (<=) y sigue recto, se unifica.",
        "Sigue recto.",
        "Incorpórese al carril derecho, seguiremos recto por ese carril.",
        "Sigue recto, atento a las marcas viales para situarte en el carril correcto.",
        "Incorpórese al carril derecho, seguimos recto.",
        "Seguimos recto, ya queda poco para dejar este barrio.",
        "Seguimos recto, pronto llegaremos a un cruce interesante veremos cómo te defiendes en él.",
        "Incorpórese al carril izquierdo (<=), giraremos ligeramente a la izquierda (<=) para coger la otra calle, atento a las marcas viales.",
        "Giramos ligeramente a la izquierda (<=) y nos situamos en el carril derecho, luego giraremos a la derecha (=>).",
        "Gira a la derecha (=>).",
        "Aquí aparecen dos carriles desde uno, sigue las indicaciones de las marcas viales para situarte en el carril correcto.",
        "Incorpórese al carril izquierdo (<=), giraremos a la izquierda (<=) en el próximo cruce.",
        "Gire a la izquierda (<=) y sitúate en el carril izquierdo (<=).",
        "Mantente en este carril, al final de la calle giraremos a la izquierda (<=).",
        "Gira a la izquierda (<=) y sitúate en el carril derecho.",
        "Lo estás haciendo muy bien, sigue recto.",
        "Incorpórese al carril izquierdo (<=) y sigue recto ya queda poco.",
        "Seguiremos recto, respeta los semáforos.",
        "Gira a la derecha (=>) y entra a la autoescuela, ves aparcar el vehículo en el aparcamiento."
    ],
];
// Puntos de las rutas de motos
var puntosRutas_motos = [
    [
        new mp.Vector3(-707.4062, -1407.655, 4.823166),
        new mp.Vector3(-702.1934, -1380.087, 5.216094),
        new mp.Vector3(-671.6107, -1364.484, 9.666543),
        new mp.Vector3(-657.873, -1421.152, 10.10691),
        new mp.Vector3(-764.5637, -1645, 26.54878),
        new mp.Vector3(-923.1578, -1836.308, 34.30642),
        new mp.Vector3(-405.275, -2342.751, 63.06197),
        new mp.Vector3(-2.626511, -2616.567, 27.17619),
        new mp.Vector3(213.8923, -2671.377, 17.45141),
        new mp.Vector3(815.7036, -2633.294, 52.12465),
        new mp.Vector3(1145.635, -2570.625, 32.78625),
        new mp.Vector3(1272.305, -2094.248, 45.09598),
        new mp.Vector3(1228.531, -1976.331, 41.97886),
        new mp.Vector3(1082.048, -1530.611, 27.38187),
        new mp.Vector3(1081.232, -1296.872, 36.32224),
        new mp.Vector3(718.0295, -1176.041, 44.11659),
        new mp.Vector3(413.5638, -1175.017, 39.97341),
        new mp.Vector3(268.2853, -1172.9, 37.66993),
        new mp.Vector3(193.4445, -1162.291, 37.6383),
        new mp.Vector3(82.45113, -1157.753, 28.86687),
        new mp.Vector3(15.67342, -1128.936, 28.37204),
        new mp.Vector3(-210.7495, -1132.975, 22.54672),
        new mp.Vector3(-407.864, -1112.543, 28.67493),
        new mp.Vector3(-542.5427, -1104.724, 21.84705),
        new mp.Vector3(-582.8926, -1222.736, 15.08502),
        new mp.Vector3(-646.4077, -1343.336, 10.17479),
        new mp.Vector3(-708.6259, -1377.307, 4.645916)
    ],
    [
        new mp.Vector3(-707.4062, -1407.655, 4.823166),
        new mp.Vector3(-702.1934, -1380.087, 5.216094),
        new mp.Vector3(-671.6107, -1364.484, 9.666543),
        new mp.Vector3(-657.0981, -1404.236, 10.08484),
        new mp.Vector3(-744.856, -1613.361, 23.90706),
        new mp.Vector3(-765.8251, -1694.204, 28.80683),
        new mp.Vector3(-762.433, -1744.307, 28.81011),
        new mp.Vector3(-609.7717, -1736.016, 36.98744),
        new mp.Vector3(-529.1243, -1695.008, 36.78201),
        new mp.Vector3(-393.4551, -1405.589, 38.01091),
        new mp.Vector3(-394.3716, -1034.415, 36.66835),
        new mp.Vector3(-393.2543, -768.7754, 36.73156),
        new mp.Vector3(-392.9839, -585.9184, 31.85897),
        new mp.Vector3(-426.7002, -485.4746, 32.88268),
        new mp.Vector3(-609.0882, -475.5016, 34.2082),
        new mp.Vector3(-639.9738, -540.647, 34.35515),
        new mp.Vector3(-640.2519, -634.622, 31.5489),
        new mp.Vector3(-640.4592, -801.3589, 24.67716),
        new mp.Vector3(-645.6512, -939.2006, 21.66367),
        new mp.Vector3(-748.4052, -1093.36, 10.37794),
        new mp.Vector3(-922.4581, -1193.861, 4.546737),
        new mp.Vector3(-1017.635, -1254.21, 5.623641),
        new mp.Vector3(-1072.334, -1286.725, 5.399628),
        new mp.Vector3(-1073.284, -1348.708, 4.700832),
        new mp.Vector3(-1123.02, -1382.408, 4.672293),
        new mp.Vector3(-1146.754, -1361.147, 4.553864),
        new mp.Vector3(-1103.984, -1322.13, 4.749753),
        new mp.Vector3(-947.418, -1231.52, 4.772235),
        new mp.Vector3(-879.2094, -1191.73, 4.250619),
        new mp.Vector3(-789.3152, -1136.205, 10.09422),
        new mp.Vector3(-695.2816, -1237.426, 10.1227),
        new mp.Vector3(-654.7473, -1347.313, 10.09182),
        new mp.Vector3(-709.3384, -1377.722, 4.619308)
    ],
    [
        new mp.Vector3(-707.4062, -1407.655, 4.823166),
        new mp.Vector3(-702.1934, -1380.087, 5.216094),
        new mp.Vector3(-671.6107, -1364.484, 9.666543),
        new mp.Vector3(-657.0981, -1404.236, 10.08484),
        new mp.Vector3(-744.856, -1613.361, 23.90706),
        new mp.Vector3(-765.8251, -1694.204, 28.80683),
        new mp.Vector3(-762.433, -1744.307, 28.81011),
        new mp.Vector3(-609.7717, -1736.016, 36.98744),
        new mp.Vector3(-529.1243, -1695.008, 36.78201),
        new mp.Vector3(-394.3716, -1034.415, 36.66835),
        new mp.Vector3(-393.2543, -768.7754, 36.73156),
        new mp.Vector3(-399.6417, -602.5783, 32.91233),
        new mp.Vector3(-482.4588, -479.6461, 31.52818),
        new mp.Vector3(-659.8084, -490.5388, 24.87067),
        new mp.Vector3(-938.2831, -525.4313, 18.50738),
        new mp.Vector3(-1103.272, -598.6618, 19.14694),
        new mp.Vector3(-1160.342, -633.8486, 22.03483),
        new mp.Vector3(-1206.341, -599.3056, 26.57316),
        new mp.Vector3(-1266.77, -536.3363, 30.67984),
        new mp.Vector3(-1286.079, -521.6313, 32.31495),
        new mp.Vector3(-1347.938, -529.4262, 30.7915),
        new mp.Vector3(-1467.94, -610.1266, 30.42373),
        new mp.Vector3(-1525.501, -652.4073, 28.41611),
        new mp.Vector3(-1488.089, -719.7057, 25.68023),
        new mp.Vector3(-1407.693, -785.9053, 20.2227),
        new mp.Vector3(-1344.514, -847.8344, 16.38299),
        new mp.Vector3(-1307.093, -893.3137, 10.97099),
        new mp.Vector3(-1263.041, -1037.811, 8.245001),
        new mp.Vector3(-1223.336, -1134.418, 7.372713),
        new mp.Vector3(-1210.388, -1220.005, 7.190777),
        new mp.Vector3(-1183.872, -1293.901, 4.757425),
        new mp.Vector3(-1165.796, -1321.322, 4.612104),
        new mp.Vector3(-1101.317, -1314.555, 4.84904),
        new mp.Vector3(-989.644, -1250.861, 5.254245),
        new mp.Vector3(-894.6332, -1196.191, 4.412685),
        new mp.Vector3(-792.6964, -1138.647, 9.906726),
        new mp.Vector3(-695.2816, -1237.426, 10.1227),
        new mp.Vector3(-654.7473, -1347.313, 10.09182),
        new mp.Vector3(-709.3384, -1377.722, 4.619308)
    ]
];
// Diálogos de las rutas de motos
var dialogosRutas_motos = [
    [
        "Gira a la derecha (=>) y sal de la autoescuela.",
        "Ahora giraremos a la derecha (=>) y nos pondremos en el carril derecho (=>).",
        "Gira a la derecha (=>), recuerda respetar el STOP.",
        "Seguiremos recto y el próximo cruce también, como no voy a tu lado tratare de darte las instrucciones con tiempo.",
        "Gira a la derecha (=>), vamos a coger la autopista veamos cómo te defiendes en ella con una moto, una vez accedas a la autopista sitúate en el carril derecho (=>).",
        "Vamos bien, sigue por este carril sin abandonarlo hasta que te diga lo contrario.",
        "Cada vez que paso por este puente me asombro de las vistas tan increíbles que se ven desde aquí, no te distraigas sigue por este carril.",
        "El puerto de Los Santos, que recuerdos me vienen de mis tiempos de estibador, en el próximo cruce seguiremos recto.",
        "Sigue recto por este carril.",
        "Desde aquí se ven las tierras altas de Palomino aunque es una pena lo poco que las cuidan, sigue recto.",
        "Sigue recto por este carril, este tramo ya no es autopista modera la velocidad, enseguida cogeremos otra autopista.",
        "Sigue recto y mantente en este carril ya puedes volver a acelerar entramos en la autopista.",
        "Seguimos recto, esto está siendo muy fácil todo el tiempo recto, ¿verdad?",
        "Sigue en este carril vamos a coger este desvío.",
        "Seguimos por este carril.",
        "Incorpórese al carril derecho (=>) y siga por él.",
        "Vamos a salir de la autopista por la próxima salida la 1C.",
        "Por esta salida.",
        "Sitúate en el carril derecho (=>), ahora vamos a girar a la derecha (=>) e inmediatamente a la izquierda (<=) para bajar por la Adam's Apple Boulevard.",
        "Gira a la derecha (=>) y luego a la izquierda (<=).",
        "Lo estás haciendo muy bien, sigue recto por este carril.",
        "Seguimos recto sin dejar este carril.",
        "Incorpórese al carril izquierdo (<=), al final de la calle giraremos a la izquierda (<=) y sitúate en el carril derecho (=>).",
        "Recto por este carril.",
        "Incorpórese al carril izquierdo (<=) y sigue recto, ya estamos llegando.",
        "Gira a la derecha (=>) para entrar a la autoescuela y aparca el vehículo en el aparcamiento.",
        "Aparca la moto en el aparcamiento."
    ],
    [
        "Gira a la derecha (=>) y sal de la autoescuela.",
        "Ahora giraremos a la derecha (=>) y nos pondremos en el carril derecho (=>).",
        "Gira a la derecha (=>), recuerda respetar el STOP.",
        "Como no voy a tu lado tratare de darte las instrucciones con tiempo. Sigue recto.",
        "Incorpórate al carril izquierdo (<=).",
        "Giraremos a la izquierda (<=) cuando sea posible, vamos a coger la autopista veamos cómo te defiendes en ella con una moto.",
        "Ahora gira a la izquierda (<=) y sitúate en el carril izquierdo (<=).",
        "Cámbiate al carril izquierdo (<=) seguiremos por la autopista.",
        "Excelente, esto ha sido un poco lioso y rápido pero lo has hecho bien, seguimos recto por este carril.",
        "Recto por este carril.",
        "Me encanta esta autopista las vistas entre los rascacielos son impresionantes, pero no te distraigas la vista a la carretera.",
        "Seguimos por este carril.",
        "Sigue por este carril vamos a salir de la autopista.",
        "Salimos de la autopista, no lo has hecho mal veamos por ciudad. En el cruce giraremos a la izquierda (<=), respeta los semáforos.",
        "Gira a la izquierda (<=).",
        "Sigue recto bajaremos por este avenida.",
        "Recto, presta atención en los cruces recuerda parar si escuchas alguna sirena y ceder el paso si fuera necesario a los vehículos de emergencia.",
        "Recto, atento a las marcas viales.",
        "Ah... Yo solía ser un periodista como ellos, pero un día me golpeé con una cámara en el tobillo. Sigue recto.",
        "Sigue recto.",
        "Seguimos recto, sitúate cuando puedas en el carril izquierdo (<=).",
        "Hay dos desvíos, toma el SEGUNDO A LA IZQUIERDA (<=), atento a las marcas viales de la carretera.",
        "Por este, gira a la izquierda (<=).",
        "Bien, ahora daremos la vuelta, gira a la derecha (=>).",
        "Respeta el STOP, gira a la derecha (=>).",
        "Giramos a la derecha (=>).",
        "Muy bien, vamos de vuelta a la autoescuela, sigue recto.",
        "No lo haces mal, no siempre tengo alumnos tan cualificados.",
        "Acóplate con cuidado al carril izquierdo (<=) y sigue recto, se unifica. Después en el cruce giraremos a la derecha (=>).",
        "Gira a la derecha (=>), ya queda poco.",
        "Recto hacia la autoescuela.",
        "Gira a la derecha (=>) para entrar a la autoescuela.",
        "Aparca la moto en el aparcamiento."
    ],
    [
        "Gira a la derecha (=>) y sal de la autoescuela.",
        "Ahora giraremos a la derecha (=>) y nos pondremos en el carril derecho (=>).",
        "Gira a la derecha (=>), recuerda respetar el STOP.",
        "Como no voy a tu lado tratare de darte las instrucciones con tiempo. Sigue recto.",
        "Incorpórate al carril izquierdo (<=).",
        "Giraremos a la izquierda (<=) cuando sea posible, vamos a coger la autopista veamos cómo te defiendes en ella con una moto.",
        "Ahora gira a la izquierda (<=) y sitúate en el carril izquierdo (<=).",
        "Cámbiate al carril izquierdo (<=) seguiremos por la autopista.",
        "Excelente, esto ha sido un poco lioso y rápido pero lo has hecho bien, seguimos recto por este carril.",
        "Me encanta esta autopista las vistas entre los rascacielos son impresionantes, pero no te distraigas la vista a la carretera.",
        "Incorpórate al carril izquierdo (<=) y sigue por él.",
        "Sigue por este carril, nos vamos a incorporar a la otra autopista.",
        "Seguimos recto por este carril, recuerda respetar el límite de velocidad no te aceleres, lo estás haciendo bien.",
        "Saldremos por la próxima salida 1A.",
        "Sigue en este carril, salimos por este salida.",
        "Incorpórese al carril derecho (=>), giraremos a la derecha (=>).",
        "Gira a la derecha (=>) y sitúate en el carril derecho (=>).",
        "Sigue recto e incorpórese al carril izquierdo (<=).",
        "Incorpórese al carril izquierdo (<=).",
        "Gire a la izquierda (<=).",
        "Seguimos recto, atento a las marcas viales el carril se cierra más adelante.",
        "Sigue recto, giraremos a la izquierda (<=) en la próxima intersección.",
        "Gira a la izquierda (<=).",
        "Mantente en este carril y sigue recto.",
        "Cuidado con las bicicletas del carril bici, sigue recto.",
        "Giovanni´s uno de mis restaurantes favoritos, sigue recto.",
        "Del Perro Beach, mi playa favorita, este barrio es increíble, ¿te había dicho que una vez trabaje de vigilante de la playa? Qué buenos tiempos aquellos. Recto",
        "Seguimos recto. Atento a las marcas viales seguiremos recto en el próximo cruce.",
        "Seguimos recto.",
        "Respeta el STOP y sigue recto, vamos a girar a la izquierda (<=) en el próximo cruce.",
        "Incorpórese al carril izquierdo (<=), giraremos a la izquierda (<=).",
        "Giramos a la izquierda (<=) y nos situamos en el carril izquierdo (<=).",
        "Sigue recto por este carril.",
        "Mantente en este carril, recto.",
        "En el próximo cruce giraremos a la derecha (=>), falta poco.",
        "Gire a la derecha (=>) y sitúate en el carril derecho (=>).",
        "Recto hacia la autoescuela.",
        "Gira a la derecha (=>) para entrar a la autoescuela.",
        "Aparca la moto en el aparcamiento."
    ],
];
// Puntos de las rutas de helicopteros
var puntosRutas_helicopteros = [
    [
        new mp.Vector3(-725.3898, -1444.527, 4.89794),
        new mp.Vector3(-736.9161, -1461.988, 19.22394),
        new mp.Vector3(-982.029, -1647.97, 92.12767),
        new mp.Vector3(-1425.039, -1551.367, 135.1536),
        new mp.Vector3(-1653.435, -1007.115, 131.7244),
        new mp.Vector3(-1632.45, -570.5211, 151.6335),
        new mp.Vector3(-1138.808, -424.9429, 124.9305),
        new mp.Vector3(-658.2877, -795.3632, 82.63064),
        new mp.Vector3(-546.7769, -1240.152, 205.6466),
        new mp.Vector3(-645.3607, -2096.777, 241.1766),
        new mp.Vector3(-788.8881, -1677.19, 158.4045),
        new mp.Vector3(-725.3898, -1444.527, 4.89794)
    ]
];
// Diálogos de las rutas de helicopteros
var dialogosRutas_helicopteros = [
    [
        "Muy bien enciende los rotores y vámonos. Te iré marcando los puntos por donde debes pasar.",
        "Sigue ascendiendo, vamos a ponernos a una altura prudente.",
        "Que, ¿impresionado? menudas vistas tenemos desde aquí, pero esto no es un juguete concéntrate.",
        "Siempre deberás sobrevolar a una altura prudente, volar bajo solo pueden hacerlo los servicios de emergencia o el ejército.",
        "Presta mucha atención a las luces rojas por la noche, te van a indicar posibles obstáculos.",
        "Algunos edificios como puedes ver disponen de helipuertos, puedes aterrizar en ellos pero recuerda que muchos son privados y no públicos.",
        "Vamos a bajar un poco, esto no se debería realizar pero veamos cómo te defiendes, pasa entre esos edificios y baja la altura.",
        "¡Wuuooooaa! que pasada lo has hecho genial, podríamos habernos matado pero ha merecido la pena, esto no se lo cuentes a nadie ¿vale? Coge altura rápido",
        "Esta es la altura aconsejable a la que deberías moverte por todo el espacio aéreo aunque no siempre es posible.",
        "Algunas zonas tienen el espacio aereo restringido como es el caso del Aeropuerto, instalaciones policiales o militares, evítalas o tendrás problemas. Volvamos a la autoescuela",
        "Lo has echo bien vamos aterrizar, baja con cuidado y despacio. Esta parte es la más peligrosa.",
        "Bien hecho, has aterrizado correctamente."
    ],
];
// Puntos de las rutas de helicopteros
var puntosRutas_barcos = [
    [
        new mp.Vector3(-749.4201, -1382.569, 0.4516445),
        new mp.Vector3(-762.0253, -1394.399, 0.4432526),
        new mp.Vector3(-797.1413, -1432.249, 0.4401621),
        new mp.Vector3(-868.6579, -1383.757, 0.4672531),
        new mp.Vector3(-932.2296, -1361.01, 0.4530846),
        new mp.Vector3(-996.8877, -1344.082, 0.2803174),
        new mp.Vector3(-1046.338, -1260.005, 0.02958223),
        new mp.Vector3(-1118.931, -1130.201, 0.02635995),
        new mp.Vector3(-1175.541, -1029.063, 0.1731227),
        new mp.Vector3(-1268.804, -874.6039, 0.4772683),
        new mp.Vector3(-1462.222, -838.5541, 0.4854641),
        new mp.Vector3(-1671.401, -925.1881, 0.4869705),
        new mp.Vector3(-1842.923, -1015.542, 0.3607458),
        new mp.Vector3(-1900.51, -1168.814, 0.499216),
        new mp.Vector3(-1875.659, -1260.242, 0.8203089),
        new mp.Vector3(-1794.341, -1355.561, 0.4615466),
        new mp.Vector3(-1642.598, -1552.877, 0.8129413),
        new mp.Vector3(-1488.785, -1772.922, 1.398414),
        new mp.Vector3(-1348.176, -1955.61, 0.9570324),
        new mp.Vector3(-1211.78, -1912.387, 1.150151),
        new mp.Vector3(-1080.848, -1786.615, 0.3368673),
        new mp.Vector3(-891.5878, -1590.791, 0.4435706),
        new mp.Vector3(-829.5304, -1501.742, 0.4940513),
        new mp.Vector3(-781.7569, -1422.855, 0.4861013)
    ],
];
// Diálogos de las rutas de helicopteros
var dialogosRutas_barcos = [
    [
        "Veamos si sabes controlar esto, recuerda que ni frena ni gira como un vehículo.",
        "Despacio por estas zonas y evitaras posibles colisiones.",
        "Vamos hacia la derecha, veamos cómo te defiendes por los canales de Vespucci.",
        "Gira a la izquierda, ten cuidado con las demás embarcaciones.",
        "Cuantos muelles y embarcaciones, sabias que es uno de los puertos deportivos más grandes de San Andreas.",
        "Cuidado en los puentes o túneles, no todas las embarcaciones pueden pasar por estos puntos.",
        "Me gustaría comprarme una casa por aquí con mi muelle privado, que bonito es soñar ¿no crees?",
        "Mira los muelles de por aquí son públicos pero existen algunos privados, no atraques tu embarcación en uno de ellos sin permiso.",
        "Vamos a salir al mar por el túnel del canal, es estrecho ves con cuidado.",
        "Ves despacio por esta zona un accidente aquí puede ser muy peligroso.",
        "Menuda obra de ingeniería fue este túnel para el canal. Sigue recto.",
        "La bocana del canal, en esta zona el baño está prohibido, por precaución ves siempre despacio y atento.",
        "El muelle del Perro, cuantas horas he pasado aquí con mis hijos, lo rodeamos con cuidado y seguiremos cruzando la playa.",
        "Una zona ideal para pescar, en el muelle del Perro tienes como puedes ver una parte preparada para los pescadores.",
        "Vamos a cruzar la playa hasta el otro acceso al puerto deportivo de Los Santos.",
        "Nos encontramos a una distancia prudente, en algunas zonas no está permitido el acceso de embarcaciones como ocurre con las playas.",
        "Esta es una de mis playas favoritas, sobre todo para surfear por eso debes prestar siempre especial atención en lugares como estos no querrás arroyar a alguien.",
        "Vamos a entrar al puerto deportivo, gira a la izquierda y cuidado con el espigón.",
        "Gira a la izquierda y navega con precaución.",
        "Cuidado con las boyas, están puestas para marcarnos el itinerario por donde debemos ir, aparte de proteger ciertas orillas de colisiones.",
        "Seguimos recto, no cojas este desvío.",
        "Siempre que navegues ten mucho cuidado con las gaviotas, ya que cagan mierdas de proporciones bíblicas.",
        "Me gusta como navegas, se siempre así de prudente y nunca tendrás ningún percance.",
        "Amarra el barco en el muelle."
    ],
];
//let mensaje: string = "";
setInterval(() => {
    if (testEmpezado == false || rutaSeleccionada == -1) {
        return;
    }

    if (tipo == 0) {
        if (puntoActualRuta == puntosRutas_turismos[rutaSeleccionada].length) {
            mp.events.callRemote("autoescuela_fin");
            //mensaje = "";
            testEmpezado = false;
            rutaSeleccionada = -1;
            return;
        }
        else {
            if (calcularDist(player_local.position, puntosRutas_turismos[rutaSeleccionada][puntoActualRuta]) <= 8.0) {
                mp.gui.chat.colors = true;
                //mp.gui.chat.push("!{yellow}Instructor dice: !{white}" + dialogosRutas_turismos[rutaSeleccionada][puntoActualRuta]);
                enviarInstructor(dialogosRutas_turismos[rutaSeleccionada][puntoActualRuta]);
                dialogosAutoescuelaHistorial.push({x: puntosRutas_turismos[rutaSeleccionada][puntoActualRuta].x, y: puntosRutas_turismos[rutaSeleccionada][puntoActualRuta].y, mensaje: dialogosRutas_turismos[rutaSeleccionada][puntoActualRuta]});
                if (autoescuela_cefId >= 0) {
                    cef_autoescuela.ejecutarCef(autoescuela_cefId, `cargarMensajes('${JSON.stringify(dialogosAutoescuelaHistorial)}')`);
                }
                //mensaje = "~w~" + dialogosRutas[rutaSeleccionada][puntoActualRuta].toLocaleUpperCase();
                puntoActualRuta++;
                reiniciarTimerAutoescuela();
                //mp.events.callRemote("autoescuela_cp");
            }
        }
    }
    if (tipo == 1) {
        if (puntoActualRuta == puntosRutas_motos[rutaSeleccionada].length) {
            mp.events.callRemote("autoescuela_fin");
            //mensaje = "";
            testEmpezado = false;
            rutaSeleccionada = -1;
            return;
        }
        else {
            if (calcularDist(player_local.position, puntosRutas_motos[rutaSeleccionada][puntoActualRuta]) <= 8.0) {
                mp.gui.chat.colors = true;
                //mp.gui.chat.push("!{yellow}Instructor dice: !{white}" + dialogosRutas_motos[rutaSeleccionada][puntoActualRuta]);
                enviarInstructor(dialogosRutas_motos[rutaSeleccionada][puntoActualRuta]);
                dialogosAutoescuelaHistorial.push({x: puntosRutas_motos[rutaSeleccionada][puntoActualRuta].x, y: puntosRutas_motos[rutaSeleccionada][puntoActualRuta].y, mensaje: dialogosRutas_motos[rutaSeleccionada][puntoActualRuta]});
                if (autoescuela_cefId >= 0) {
                    cef_autoescuela.ejecutarCef(autoescuela_cefId, `cargarMensajes('${JSON.stringify(dialogosAutoescuelaHistorial)}')`);
                }
                //mensaje = "~w~" + dialogosRutas[rutaSeleccionada][puntoActualRuta].toLocaleUpperCase();
                puntoActualRuta++;
                reiniciarTimerAutoescuela();
                //mp.events.callRemote("autoescuela_cp");
            }
        }
    }
    if (tipo == 2) {
        if ((puntoActualRuta) == puntosRutas_helicopteros[rutaSeleccionada].length) {
            if (marcadorAuto !== null) {
                if (mp.markers.exists(marcadorAuto))
                    marcadorAuto.destroy();
                marcadorAuto = null;
            }
            mp.events.callRemote("autoescuela_fin");
            //mensaje = "";
            testEmpezado = false;
            rutaSeleccionada = -1;
            return;
        }
        else {
            if ((puntoActualRuta + 1) == puntosRutas_helicopteros[rutaSeleccionada].length) {
                if (calcularDist(player_local.position, puntosRutas_helicopteros[rutaSeleccionada][puntoActualRuta]) <= 10.0) {
                    puntoActualRuta++;
                }
            }
            else {
                if ((puntoActualRuta + 2) == puntosRutas_helicopteros[rutaSeleccionada].length) {
                    if (calcularDist(player_local.position, puntosRutas_helicopteros[rutaSeleccionada][puntoActualRuta]) <= 10.0) {
                        mp.gui.chat.colors = true;
                        //mp.gui.chat.push("!{yellow}Instructor dice: !{white}" + dialogosRutas_helicopteros[rutaSeleccionada][puntoActualRuta]);
                        enviarInstructor(dialogosRutas_helicopteros[rutaSeleccionada][puntoActualRuta]);
                        dialogosAutoescuelaHistorial.push({x: puntosRutas_helicopteros[rutaSeleccionada][puntoActualRuta].x, y: puntosRutas_helicopteros[rutaSeleccionada][puntoActualRuta].y, mensaje: dialogosRutas_helicopteros[rutaSeleccionada][puntoActualRuta]});
                        if (autoescuela_cefId >= 0) {
                            cef_autoescuela.ejecutarCef(autoescuela_cefId, `cargarMensajes('${JSON.stringify(dialogosAutoescuelaHistorial)}')`);
                        }
                        //mensaje = "~w~" + dialogosRutas[rutaSeleccionada][puntoActualRuta].toLocaleUpperCase();
                        if (marcadorAuto !== null) {
                            if (mp.markers.exists(marcadorAuto))
                                marcadorAuto.destroy();
                            marcadorAuto = null;
                        }
                        marcadorAuto = mp.markers.new(1, puntosRutas_helicopteros[rutaSeleccionada][puntoActualRuta + 1], 10.0, {
                            color: [200, 247, 57, 180]
                        });
                        mp.game.ui.setNewWaypoint(puntosRutas_helicopteros[rutaSeleccionada][puntoActualRuta + 1].x, puntosRutas_helicopteros[rutaSeleccionada][puntoActualRuta + 1].y);
                        puntoActualRuta++;
                        reiniciarTimerAutoescuela();
                        //mp.events.callRemote("autoescuela_cp");
                    }
                }
                else {
                    if (calcularDist(player_local.position, puntosRutas_helicopteros[rutaSeleccionada][puntoActualRuta]) <= 10.0) {
                        mp.gui.chat.colors = true;
                        //mp.gui.chat.push("!{yellow}Instructor dice: !{white}" + dialogosRutas_helicopteros[rutaSeleccionada][puntoActualRuta]);
                        enviarInstructor(dialogosRutas_helicopteros[rutaSeleccionada][puntoActualRuta]);
                        dialogosAutoescuelaHistorial.push({x: puntosRutas_helicopteros[rutaSeleccionada][puntoActualRuta].x, y: puntosRutas_helicopteros[rutaSeleccionada][puntoActualRuta].y, mensaje: dialogosRutas_helicopteros[rutaSeleccionada][puntoActualRuta]});
                        if (autoescuela_cefId >= 0) {
                            cef_autoescuela.ejecutarCef(autoescuela_cefId, `cargarMensajes('${JSON.stringify(dialogosAutoescuelaHistorial)}')`);
                        }
                        //mensaje = "~w~" + dialogosRutas[rutaSeleccionada][puntoActualRuta].toLocaleUpperCase();
                        if (marcadorAuto !== null) {
                            if (mp.markers.exists(marcadorAuto))
                                marcadorAuto.destroy();
                            marcadorAuto = null;
                        }
                        marcadorAuto = mp.markers.new(25, puntosRutas_helicopteros[rutaSeleccionada][puntoActualRuta + 1], 10.0, {
                            rotation: new mp.Vector3(90.0, 0.0, 0.0),
                            direction: puntosRutas_helicopteros[rutaSeleccionada][puntoActualRuta + 2],
                            color: [200, 247, 57, 180]
                        });
                        mp.game.ui.setNewWaypoint(puntosRutas_helicopteros[rutaSeleccionada][puntoActualRuta + 1].x, puntosRutas_helicopteros[rutaSeleccionada][puntoActualRuta + 1].y);
                        puntoActualRuta++;
                        reiniciarTimerAutoescuela();
                        //mp.events.callRemote("autoescuela_cp");
                    }
                }
            }
        }
    }
    if (tipo == 3) {
        if ((puntoActualRuta) == puntosRutas_barcos[rutaSeleccionada].length) {
            if (marcadorAuto !== null) {
                if (mp.markers.exists(marcadorAuto))
                    marcadorAuto.destroy();
                marcadorAuto = null;
            }
            mp.events.callRemote("autoescuela_fin");
            //mensaje = "";
            testEmpezado = false;
            rutaSeleccionada = -1;
            return;
        }
        else {
            if ((puntoActualRuta + 1) == puntosRutas_barcos[rutaSeleccionada].length) {
                if (calcularDist(player_local.position, puntosRutas_barcos[rutaSeleccionada][puntoActualRuta]) <= 10.0) {
                    puntoActualRuta++;
                }
            }
            else {
                if ((puntoActualRuta + 2) == puntosRutas_barcos[rutaSeleccionada].length) {
                    if (calcularDist(player_local.position, puntosRutas_barcos[rutaSeleccionada][puntoActualRuta]) <= 10.0) {
                        mp.gui.chat.colors = true;
                        //mp.gui.chat.push("!{yellow}Instructor dice: !{white}" + dialogosRutas_barcos[rutaSeleccionada][puntoActualRuta]);
                        enviarInstructor(dialogosRutas_barcos[rutaSeleccionada][puntoActualRuta]);
                        dialogosAutoescuelaHistorial.push({x: puntosRutas_barcos[rutaSeleccionada][puntoActualRuta].x, y: puntosRutas_barcos[rutaSeleccionada][puntoActualRuta].y, mensaje: dialogosRutas_barcos[rutaSeleccionada][puntoActualRuta]});
                        if (autoescuela_cefId >= 0) {
                            cef_autoescuela.ejecutarCef(autoescuela_cefId, `cargarMensajes('${JSON.stringify(dialogosAutoescuelaHistorial)}')`);
                        }
                        //mensaje = "~w~" + dialogosRutas[rutaSeleccionada][puntoActualRuta].toLocaleUpperCase();
                        if (marcadorAuto !== null) {
                            if (mp.markers.exists(marcadorAuto))
                                marcadorAuto.destroy();
                            marcadorAuto = null;
                        }
                        marcadorAuto = mp.markers.new(4, puntosRutas_barcos[rutaSeleccionada][puntoActualRuta + 1], 10.0, {
                            color: [200, 247, 57, 180]
                        });
                        mp.game.ui.setNewWaypoint(puntosRutas_barcos[rutaSeleccionada][puntoActualRuta + 1].x, puntosRutas_barcos[rutaSeleccionada][puntoActualRuta + 1].y);
                        puntoActualRuta++;
                        reiniciarTimerAutoescuela();
                        //mp.events.callRemote("autoescuela_cp");
                    }
                }
                else {
                    if (calcularDist(player_local.position, puntosRutas_barcos[rutaSeleccionada][puntoActualRuta]) <= 10.0) {
                        mp.gui.chat.colors = true;
                        //mp.gui.chat.push("!{yellow}Instructor dice: !{white}" + dialogosRutas_barcos[rutaSeleccionada][puntoActualRuta]);
                        enviarInstructor(dialogosRutas_barcos[rutaSeleccionada][puntoActualRuta]);
                        dialogosAutoescuelaHistorial.push({x: puntosRutas_barcos[rutaSeleccionada][puntoActualRuta].x, y: puntosRutas_barcos[rutaSeleccionada][puntoActualRuta].y, mensaje: dialogosRutas_barcos[rutaSeleccionada][puntoActualRuta]});
                        if (autoescuela_cefId >= 0) {
                            cef_autoescuela.ejecutarCef(autoescuela_cefId, `cargarMensajes('${JSON.stringify(dialogosAutoescuelaHistorial)}')`);
                        }
                        //mensaje = "~w~" + dialogosRutas[rutaSeleccionada][puntoActualRuta].toLocaleUpperCase();
                        if (marcadorAuto !== null) {
                            if (mp.markers.exists(marcadorAuto))
                                marcadorAuto.destroy();
                            marcadorAuto = null;
                        }
                        marcadorAuto = mp.markers.new(2, new mp.Vector3(puntosRutas_barcos[rutaSeleccionada][puntoActualRuta + 1].x, puntosRutas_barcos[rutaSeleccionada][puntoActualRuta + 1].y, (puntosRutas_barcos[rutaSeleccionada][puntoActualRuta + 1].z + 2.0)), 5.0, {
                            direction: puntosRutas_barcos[rutaSeleccionada][puntoActualRuta + 2],
                            color: [200, 247, 57, 180]
                        });
                        mp.game.ui.setNewWaypoint(puntosRutas_barcos[rutaSeleccionada][puntoActualRuta + 1].x, puntosRutas_barcos[rutaSeleccionada][puntoActualRuta + 1].y);
                        puntoActualRuta++;
                        reiniciarTimerAutoescuela();
                        //mp.events.callRemote("autoescuela_cp");
                    }
                }
            }
        }
    }
}, 50);

function cancelarTimerAutoescuela() {
    if (timerAutoescuela != null) {
        clearTimeout(timerAutoescuela);
        timerAutoescuela = null;
    }
}


function reiniciarTimerAutoescuela() {
    cancelarTimerAutoescuela();    

    timerAutoescuela = crearTimeout(() => {
        mp.events.callRemote("autoescuela:finalizar_tiempo", (puntoActualRuta > 0));
        mp.events.call("autoescuela:finalizar");
    }, 60000);
}

mp.events.add({
    "autoescuela:iniciar": (vehiculo, _tipo) => {
        vehiculoAutoescuela = vehiculo;

        tipo = _tipo;

        dialogosAutoescuelaHistorial = [];

        let vehiculoTipo = "";
        let testTipo = "";

        switch (tipo) {
            case 0:
                vehiculoTipo = "coche";
                testTipo = "conducción de turismos";
                break;
            case 1:
                vehiculoTipo = "moto";
                testTipo = "conducción de motocicletas";
                break;
            case 2:
                vehiculoTipo = "helicóptero";
                testTipo = "piloto de helicópteros";
                break;
            case 3:
                vehiculoTipo = "barco";
                testTipo = "patrón de embarcaciones";
                break;
        }

        mp.events.call("autoescuela:mostrar");

        mp.gui.chat.push("!{#9ACD32}El instructor se acerca a tí para informarte sobre tu test de " + testTipo + ".");
        //mp.gui.chat.push("!{yellow}Instructor dice: !{white}Usaremos " + (tipo == 1 ? "aquella " : "aquel ") + vehiculoTipo + " de allí. Vamos a empezar el examen.");
        enviarInstructor("Usaremos " + (tipo == 1 ? "aquella " : "aquel ") + vehiculoTipo + " de allí. Vamos a empezar el examen.");

        //mostrarAviso("info", 5000, "Dirígete a tu vehículo para comenzar el examen");

        // mp.gui.chat.push("!{red}" + JSON.stringify(_posicion));

        crearTimeout(() => {
            try {
                marcadorAuto = mp.markers.new(0, new mp.Vector3(vehiculoAutoescuela.position.x, vehiculoAutoescuela.position.y, vehiculoAutoescuela.position.z + 2.5), 1.5, { visible: true, color: [200, 247, 57, 180], dimension: 0 });
                mp.events.call("mostrar_waypoint", vehiculoAutoescuela.position);
            } catch (e) {
                let au_i = setInterval(() => {
                    if (vehiculoAutoescuela && vehiculoAutoescuela.position) {
                        marcadorAuto = mp.markers.new(0, new mp.Vector3(vehiculoAutoescuela.position.x, vehiculoAutoescuela.position.y, vehiculoAutoescuela.position.z + 2.5), 1.5, { visible: true, color: [200, 247, 57, 180], dimension: 0 });
                        mp.events.call("mostrar_waypoint", vehiculoAutoescuela.position);
                        clearInterval(au_i);
                        au_i = null;
                    }
                }, 10);
            }

            reiniciarTimerAutoescuela();
            mp.events.add("playerEnterVehicle", entrarVehiculoAutoescuela);
        }, 1000);

    },
    "autoescuela:finalizar": () => {
        if (marcadorAuto != null) {
            if (mp.markers.exists(marcadorAuto))
                marcadorAuto.destroy();
            marcadorAuto = null;
        }
        mp.game.ui.setNewWaypoint(player_local.position.x, player_local.position.y);
        //mp.game.ui.setNewWaypoint(-700.5503, -1404.621);
        testEmpezado = false;
        rutaSeleccionada = -1;
        puntoActualRuta = 0;
        tipo = 0;
        cancelarTimerAutoescuela();

        mp.events.call("autoescuela:cerrar");
        mp.events.call("hud:ocultar_aviso_grande");

        if (instructorPed != null) {
            instructorPed.destroy();
            instructorPed = null;
        }
    }
})

function enviarInstructor(texto) {
    //if (autoescuela_cefId >= 0 && cef_autoescuela) {
        cef_autoescuela.ejecutarCef(autoescuela_cefId, `mostrarDialogo("${texto}")`);
    //}
}

function entrarVehiculoAutoescuela(vehiculo) {
    if (vehiculo == vehiculoAutoescuela && !testEmpezado) {
        if (marcadorAuto != null) {
            if (mp.markers.exists(marcadorAuto))
                marcadorAuto.destroy();
            marcadorAuto = null;
        }

        switch (tipo) {
            case 0:
                //mp.events.call("mostrar_ayuda_interactiva", "Ayuda de la autoescuela", "Colócate el /cinturon y escucha atentamente al instructor.",
                //    "¡Respeta el tráfico y a los otros conductores!", "Observa las marcas de la carretera para conducir siempre por tu carril.",
                //    "autoescuela/img1.png", "autoescuela/img2.png", "autoescuela/img3.png");

                //mp.gui.chat.push("!{#9ACD32}El instructor se monta contigo en el asiento del copiloto y se pone el cinturón.");
                enviarInstructor("Tómatelo con calma y cuando estés listo, sal del aparcamiento y empezaremos. Recuerda ponerte el cinturón, es trivial para aprobar el examen.");
                //mp.gui.chat.push("!{yellow}Instructor dice: !{white}Tómatelo con calma y cuando estés listo, sal del aparcamiento y empezaremos.");
                break;
            case 1:
                //mp.events.call("mostrar_ayuda_interactiva", "Ayuda de la autoescuela", "Ponte el casco y escucha atentamente al instructor.",
                //    "¡Respeta el tráfico y a los otros conductores!", "Observa las marcas de la carretera para conducir siempre por tu carril.",
                //    "autoescuela/img4.png", "autoescuela/img2.png", "autoescuela/img3.png");

                //mp.gui.chat.push("!{#9ACD32}El instructor se monta en un vehículo para seguirte de cerca, te dara las instrucciones por el sistema de manos libres de tu casco.");
                //mp.gui.chat.push("!{yellow}Instructor dice: !{white}Tómatelo con calma y cuando estés listo, sal del aparcamiento y empezaremos.");
                enviarInstructor("Tómatelo con calma y cuando estés listo, sal del aparcamiento y empezaremos.");
                break;
            case 2:
                //mp.events.call("mostrar_ayuda_interactiva", "Ayuda de la autoescuela", "Enciende los motores y escucha atentamente al instructor.",
                //    "¡Respeta el espacio areo restringido y a los otros pilotos!", "Observa las luces rojas que nos advierten de un obstaculo grande.",
                //    "autoescuela/img5.png", "autoescuela/img6.png", "autoescuela/img7.png");
                
                //mp.gui.chat.push("!{#9ACD32}El instructor se monta contigo en el asiento del copiloto y se pone el casco.");
                //mp.gui.chat.push("!{yellow}Instructor dice: !{white}Tómatelo con calma y cuando estés listo, despega y empezaremos.");
                enviarInstructor("Tómatelo con calma y cuando estés listo, despega y empezaremos.");
                break;
            case 3:
                //mp.events.call("mostrar_ayuda_interactiva", "Ayuda de la autoescuela", "Enciende el motor y escucha atentamente al instructor, navega con cuidado esto no es un vehículo y la forma de conduccion es diferente.",
                //    "Las boyas nos indican lugares por los que debemos no debemos pasar o si pasamos ha de ser entre las boyas, aparte de proteger ciertas orillas o advertirnos de un posible peligro.", "Observa detenidamente si tu barco o lancha puede pasar por algunos puntos, no todos pueden por su altura o calado.",
                //    "autoescuela/img8.png", "autoescuela/img9.png", "autoescuela/img10.png");
                
                //mp.gui.chat.push("!{#9ACD32}El instructor se monta contigo en la embarcacion y se pone el chaleco salvavidas.");
                //mp.gui.chat.push("!{yellow}Instructor dice: !{white}Tómatelo con calma y cuando estés listo, sal del muelle y empezaremos.");
                enviarInstructor("Tómatelo con calma y cuando estés listo, sal del muelle y empezaremos.");
                break;
        }
        
        if (tipo == 0) {
            rutaSeleccionada = Math.floor(Math.random() * puntosRutas_turismos.length);
        }
        if (tipo == 1) {
            rutaSeleccionada = Math.floor(Math.random() * puntosRutas_motos.length);
        }
        if (tipo == 2) {
            rutaSeleccionada = Math.floor(Math.random() * puntosRutas_helicopteros.length);
        }
        if (tipo == 3) {
            rutaSeleccionada = Math.floor(Math.random() * puntosRutas_barcos.length);
        }

        if (tipo != 1) {
            crearTimeout(() => {
                try {
                    instructorPed = mp.peds.new(mp.game.joaat("a_m_y_business_02"), new mp.Vector3(player_local.position.x, player_local.position.y, player_local.position.z), 270, player_local.dimension);
                    instructorPed.taskEnterVehicle(player_local.getVehicleIsTryingToEnter() || player_local.vehicle.handle, 10000, 0, 1, 16, 0);
                } catch (e) {}     
            }, 700);
        }

        reiniciarTimerAutoescuela();
        testEmpezado = true;

        crearTimeout(() => {
            let textoInicial = "<p>Puedes abrir el historial de mensajes del instructor con la <strong>flecha izquierda (<)</strong> y cerrarlo con <strong>la derecha (>)</strong>.</p>";
            if (tipo <= 1)
                mostrarAviso("big", -1, textoInicial+"<br><hr><p>Puedes encender y apagar los intermitentes de tu vehículo.</p><p>Utiliza los botones <strong>teclado numérico 4 y 6</strong> para encenderlos y apagarlos.</p><p>Con el <strong>teclado numérico 5</strong> enciendes y apagas todos los intermitentes a la vez</p>")
            else
                mostrarAviso("big", -1, textoInicial);
        }, 5000);

        mp.events.remove("playerEnterVehicle", entrarVehiculoAutoescuela);
    }
}
//# sourceMappingURL=autoescuela.js.map
}