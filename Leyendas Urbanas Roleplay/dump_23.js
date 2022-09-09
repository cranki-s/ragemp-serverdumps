{
/* --------------------------------------------------------------------------------
 * ctrl_metro.js
 *
 * Autor: Kenshin
 *
 * Descripción: Realiza las operaciones del metro
 *
 * -------------------------------------------------------------------------------- */
var global_metro = require('/LURP/global');
// Navegador que usaremos para mostrar el cajero
var navMetro = undefined;
// Forzar salida de la cámara
var forzarSalida = false;
// Variable que nos guardara globalmente el timer
var timer = null;
// ID del array de paradas
var parada_real = 0;
// Sentido de la marcha
var sentido = 0;
// Estado de la estacion de metro al momento de poner el comando
var estado = 0;
// Parada inicial y final del listado de camaras
var parada_inicial = 0;
var parada_final = 0;
var camara_metro = null;
var camara_metro_proxima = null;
var caramasMetro_0_Creadas = [];
var caramasMetro_1_Creadas = [];
camara_metro = null;
//Definimos las posiciones por separado
var posicion_camarasMetro_0 = [
    //LSIA Terminal 4
    [new mp.Vector3(-1080.658, -2724.182, -8.301189), new mp.Vector3(0, 0, -44.11423)],
    [new mp.Vector3(-1076.768, -2720.109, -8.297768), new mp.Vector3(0, 0, -42.6912)],
    [new mp.Vector3(-1070.706, -2712.881, -8.291985), new mp.Vector3(0, 0, -41.22612)],
    [new mp.Vector3(-1065.107, -2705.762, -8.286465), new mp.Vector3(0, 0, -41.7669)],
    [new mp.Vector3(-1059.25, -2699.186, -8.281095), new mp.Vector3(0, 0, -43.1888)],
    [new mp.Vector3(-1053.141, -2691.933, -8.310233), new mp.Vector3(0, 0, -38.30837)],
    [new mp.Vector3(-1047.32, -2684.499, -8.313063), new mp.Vector3(0, 0, -37.99272)],
    [new mp.Vector3(-1041.47, -2677.011, -8.326756), new mp.Vector3(0, 0, -39.67528)],
    [new mp.Vector3(-1034.599, -2670.761, -8.326756), new mp.Vector3(0, 0, -57.69744)],
    [new mp.Vector3(-1026.111, -2666.86, -8.323359), new mp.Vector3(0, 0, -68.27005)],
    [new mp.Vector3(-1017.454, -2662.958, -8.322674), new mp.Vector3(0, 0, -63.9221)],
    [new mp.Vector3(-1009.509, -2657.964, -8.322674), new mp.Vector3(0, 0, -57.27147)],
    [new mp.Vector3(-1001.757, -2652.517, -8.322674), new mp.Vector3(0, 0, -51.58576)],
    [new mp.Vector3(-994.3923, -2646.618, -8.324492), new mp.Vector3(0, 0, -50.64464)],
    [new mp.Vector3(-987.0801, -2640.528, -8.324492), new mp.Vector3(0, 0, -50.04193)],
    [new mp.Vector3(-979.9532, -2634.353, -8.324492), new mp.Vector3(0, 0, -49.04887)],
    [new mp.Vector3(-972.735, -2628.146, -8.324488), new mp.Vector3(0, 0, -49.26012)],
    [new mp.Vector3(-965.5109, -2622.112, -8.324478), new mp.Vector3(0, 0, -49.05381)],
    [new mp.Vector3(-958.2669, -2616.083, -8.324478), new mp.Vector3(0, 0, -50.24799)],
    [new mp.Vector3(-951.377, -2610.237, -8.324471), new mp.Vector3(0, 0, -49.96584)],
    [new mp.Vector3(-944.1331, -2604.182, -8.324465), new mp.Vector3(0, 0, -49.95396)],
    [new mp.Vector3(-936.8683, -2598.029, -8.324465), new mp.Vector3(0, 0, -49.78883)],
    [new mp.Vector3(-929.6637, -2591.922, -8.324464), new mp.Vector3(0, 0, -49.67082)],
    [new mp.Vector3(-922.4557, -2585.721, -8.328932), new mp.Vector3(0, 0, -48.75708)],
    [new mp.Vector3(-915.9006, -2579.021, -8.329372), new mp.Vector3(0, 0, -39.15532)],
    [new mp.Vector3(-910.5896, -2571.284, -8.329374), new mp.Vector3(0, 0, -31.05315)],
    [new mp.Vector3(-906.3805, -2562.802, -8.329374), new mp.Vector3(0, 0, -23.30472)],
    [new mp.Vector3(-903.2191, -2553.955, -8.324465), new mp.Vector3(0, 0, -20.07072)],
    [new mp.Vector3(-899.9711, -2545.004, -8.32445), new mp.Vector3(0, 0, -19.72789)],
    [new mp.Vector3(-896.7634, -2536.119, -8.324457), new mp.Vector3(0, 0, -19.91408)],
    [new mp.Vector3(-893.5173, -2527.186, -8.665822), new mp.Vector3(0, 0, -20.35409)],
    [new mp.Vector3(-890.2589, -2518.322, -9.493115), new mp.Vector3(0, 0, -20.34109)],
    [new mp.Vector3(-887.1288, -2509.921, -10.28046), new mp.Vector3(0, 0, -20.40635)],
    [new mp.Vector3(-883.7838, -2500.924, -11.12009), new mp.Vector3(0, 0, -20.0192)],
    [new mp.Vector3(-880.5743, -2492.055, -11.94557), new mp.Vector3(0, 0, -20.02677)],
    [new mp.Vector3(-877.4412, -2483.066, -12.54441), new mp.Vector3(0, 0, -19.19663)],
    [new mp.Vector3(-874.3959, -2474.147, -12.65188), new mp.Vector3(0, 0, -17.64226)],
    [new mp.Vector3(-872.2824, -2465.017, -12.65209), new mp.Vector3(0, 0, -8.704288)],
    [new mp.Vector3(-871.5679, -2455.603, -12.65209), new mp.Vector3(0, 0, 1.559062)],
    [new mp.Vector3(-872.3461, -2446.249, -12.65209), new mp.Vector3(0, 0, 9.653357)],
    [new mp.Vector3(-874.6038, -2437.077, -12.65209), new mp.Vector3(0, 0, 18.26995)],
    [new mp.Vector3(-878.1629, -2428.383, -12.65208), new mp.Vector3(0, 0, 23.98503)],
    [new mp.Vector3(-882.9872, -2420.262, -12.65208), new mp.Vector3(0, 0, 34.77503)],
    [new mp.Vector3(-888.6533, -2412.727, -12.64717), new mp.Vector3(0, 0, 36.87647)],
    [new mp.Vector3(-893.2977, -2405.06, -12.64721), new mp.Vector3(0, 0, 25.84536)],
    [new mp.Vector3(-896.4512, -2396.219, -12.64714), new mp.Vector3(0, 0, 18.12831)],
    [new mp.Vector3(-898.1005, -2386.982, -12.64721), new mp.Vector3(0, 0, 3.210389)],
    [new mp.Vector3(-897.101, -2377.775, -12.64722), new mp.Vector3(0, 0, -16.21209)],
    [new mp.Vector3(-893.6734, -2369.04, -12.64722), new mp.Vector3(0, 0, -23.21881)],
    [new mp.Vector3(-890.0668, -2360.244, -12.63215), new mp.Vector3(0, 0, -21.10538)],
    [new mp.Vector3(-886.9822, -2351.346, -12.60283), new mp.Vector3(0, 0, -18.30606)],
    [new mp.Vector3(-883.9136, -2342.338, -12.60762), new mp.Vector3(0, 0, -19.25597)],
    //LSIA Parking
    [new mp.Vector3(-880.8411, -2333.416, -12.6134), new mp.Vector3(0, 0, -18.99331)],
    [new mp.Vector3(-877.6606, -2324.525, -12.61914), new mp.Vector3(0, 0, -20.01714)],
    [new mp.Vector3(-874.3913, -2315.596, -12.62491), new mp.Vector3(0, 0, -19.91978)],
    [new mp.Vector3(-871.1894, -2306.709, -12.63064), new mp.Vector3(0, 0, -19.85571)],
    [new mp.Vector3(-867.9666, -2297.769, -12.63235), new mp.Vector3(0, 0, -21.02039)],
    [new mp.Vector3(-864.52, -2288.968, -12.63235), new mp.Vector3(0, 0, -21.37565)],
    [new mp.Vector3(-861.1517, -2280.157, -12.63245), new mp.Vector3(0, 0, -20.67151)],
    [new mp.Vector3(-858.124, -2271.646, -12.64944), new mp.Vector3(0, 0, -18.26714)],
    [new mp.Vector3(-854.3566, -2263.183, -12.64944), new mp.Vector3(0, 0, -35.774)],
    [new mp.Vector3(-847.8285, -2256.399, -12.61186), new mp.Vector3(0, 0, -49.65257)],
    [new mp.Vector3(-840.5974, -2250.354, -11.95502), new mp.Vector3(0, 0, -49.66667)],
    [new mp.Vector3(-833.3293, -2244.22, -11.12394), new mp.Vector3(0, 0, -49.91507)],
    [new mp.Vector3(-826.1437, -2238.11, -10.29618), new mp.Vector3(0, 0, -50.10135)],
    [new mp.Vector3(-818.898, -2232.047, -9.470811), new mp.Vector3(0, 0, -50.0529)],
    [new mp.Vector3(-811.574, -2225.961, -8.635579), new mp.Vector3(0, 0, -50.26895)],
    [new mp.Vector3(-804.2731, -2219.863, -7.926791), new mp.Vector3(0, 0, -50.30012)],
    [new mp.Vector3(-797.3858, -2213.484, -7.84729), new mp.Vector3(0, 0, -43.21869)],
    [new mp.Vector3(-791.6255, -2206.086, -7.847262), new mp.Vector3(0, 0, -35.20473)],
    [new mp.Vector3(-786.8461, -2197.956, -7.847207), new mp.Vector3(0, 0, -25.36665)],
    [new mp.Vector3(-783.262, -2189.259, -7.847242), new mp.Vector3(0, 0, -20.38185)],
    [new mp.Vector3(-780.0825, -2180.285, -7.847244), new mp.Vector3(0, 0, -19.95345)],
    [new mp.Vector3(-776.9402, -2171.398, -7.847242), new mp.Vector3(0, 0, -19.70669)],
    [new mp.Vector3(-773.8562, -2162.973, -7.912716), new mp.Vector3(0, 0, -20.00822)],
    [new mp.Vector3(-770.6372, -2154.021, -8.621065), new mp.Vector3(0, 0, -20.00861)],
    [new mp.Vector3(-767.4622, -2145.126, -9.449514), new mp.Vector3(0, 0, -19.67488)],
    [new mp.Vector3(-764.3063, -2136.158, -10.2558), new mp.Vector3(0, 0, -19.82035)],
    [new mp.Vector3(-761.5952, -2127.19, -10.24833), new mp.Vector3(0, 0, -10.99064)],
    [new mp.Vector3(-760.5059, -2117.895, -10.24832), new mp.Vector3(0, 0, 0.1058969)],
    [new mp.Vector3(-760.9258, -2108.413, -10.24832), new mp.Vector3(0, 0, 4.633572)],
    [new mp.Vector3(-762.0724, -2099.06, -10.24832), new mp.Vector3(0, 0, 6.292444)],
    [new mp.Vector3(-761.8749, -2089.631, -10.24832), new mp.Vector3(0, 0, -6.928468)],
    [new mp.Vector3(-759.9028, -2080.506, -10.24832), new mp.Vector3(0, 0, -17.06404)],
    [new mp.Vector3(-756.9138, -2071.484, -10.24828), new mp.Vector3(0, 0, -20.09043)],
    [new mp.Vector3(-753.7229, -2062.623, -10.24829), new mp.Vector3(0, 0, -19.92377)],
    [new mp.Vector3(-750.4983, -2053.737, -10.24829), new mp.Vector3(0, 0, -19.8654)],
    [new mp.Vector3(-747.2709, -2044.785, -10.24827), new mp.Vector3(0, 0, -19.84784)],
    [new mp.Vector3(-744.0745, -2035.906, -10.24827), new mp.Vector3(0, 0, -19.90917)],
    [new mp.Vector3(-740.9739, -2027.42, -10.24827), new mp.Vector3(0, 0, -21.02769)],
    [new mp.Vector3(-737.6282, -2018.584, -10.24829), new mp.Vector3(0, 0, -20.16005)],
    [new mp.Vector3(-734.3828, -2009.725, -10.24831), new mp.Vector3(0, 0, -19.59698)],
    [new mp.Vector3(-731.2061, -2000.754, -10.24831), new mp.Vector3(0, 0, -19.64857)],
    [new mp.Vector3(-728.0688, -1991.857, -10.24828), new mp.Vector3(0, 0, -19.60389)],
    [new mp.Vector3(-724.8615, -1982.884, -10.24772), new mp.Vector3(0, 0, -19.68467)],
    [new mp.Vector3(-721.9906, -1973.926, -10.24643), new mp.Vector3(0, 0, -14.23984)],
    [new mp.Vector3(-720.0997, -1964.652, -10.24643), new mp.Vector3(0, 0, -7.304096)],
    [new mp.Vector3(-719.3286, -1955.268, -10.24643), new mp.Vector3(0, 0, -2.63648)],
    [new mp.Vector3(-719.2653, -1945.771, -9.88229), new mp.Vector3(0, 0, 0.127487)],
    [new mp.Vector3(-719.2894, -1936.342, -9.048288), new mp.Vector3(0, 0, 0.8895053)],
    [new mp.Vector3(-719.389, -1926.905, -8.236374), new mp.Vector3(0, 0, 0.4264071)],
    [new mp.Vector3(-719.4893, -1917.38, -7.396739), new mp.Vector3(0, 0, 0.4244612)],
    [new mp.Vector3(-719.5639, -1907.953, -6.564692), new mp.Vector3(0, 0, -0.3862922)],
    [new mp.Vector3(-719.4542, -1898.904, -5.772081), new mp.Vector3(0, 0, -0.4786604)],
    [new mp.Vector3(-719.3817, -1889.466, -5.299801), new mp.Vector3(0, 0, -0.3963221)],
    [new mp.Vector3(-719.3666, -1879.941, -4.535999), new mp.Vector3(0, 0, -0.2842958)],
    [new mp.Vector3(-719.3712, -1870.509, -3.714409), new mp.Vector3(0, 0, -0.07938114)],
    [new mp.Vector3(-719.4057, -1861.072, -2.885614), new mp.Vector3(0, 0, 1.134973)],
    [new mp.Vector3(-719.5145, -1851.563, -2.053544), new mp.Vector3(0, 0, 0.3186336)],
    [new mp.Vector3(-719.5914, -1842.119, -1.22563), new mp.Vector3(0, 0, 0.414759)],
    [new mp.Vector3(-719.6971, -1832.599, -0.6434087), new mp.Vector3(0, 0, 0.5418545)],
    [new mp.Vector3(-719.5779, -1823.164, -0.6483539), new mp.Vector3(0, 0, -1.022556)],
    [new mp.Vector3(-719.4573, -1813.661, -0.6483483), new mp.Vector3(0, 0, 0.5820842)],
    [new mp.Vector3(-719.5106, -1804.241, -0.6483561), new mp.Vector3(0, 0, -2.008669)],
    [new mp.Vector3(-718.8026, -1794.815, -0.6532794), new mp.Vector3(0, 0, -9.948845)],
    [new mp.Vector3(-716.3953, -1785.748, -0.6532794), new mp.Vector3(0, 0, -19.50211)],
    [new mp.Vector3(-712.4791, -1777.241, -0.6534063), new mp.Vector3(0, 0, -27.86964)],
    [new mp.Vector3(-708.0319, -1769.377, -0.4951941), new mp.Vector3(0, 0, -29.88622)],
    [new mp.Vector3(-703.3552, -1761.19, 0.2327768), new mp.Vector3(0, 0, -29.88665)],
    [new mp.Vector3(-698.6108, -1752.921, 1.065941), new mp.Vector3(0, 0, -29.63813)],
    [new mp.Vector3(-693.8682, -1744.767, 1.891592), new mp.Vector3(0, 0, -30.32501)],
    [new mp.Vector3(-689.0654, -1736.549, 2.7244), new mp.Vector3(0, 0, -30.33371)],
    [new mp.Vector3(-684.3457, -1728.381, 3.549724), new mp.Vector3(0, 0, -29.86688)],
    [new mp.Vector3(-679.6147, -1720.11, 4.384152), new mp.Vector3(0, 0, -29.70797)],
    [new mp.Vector3(-674.9251, -1711.916, 5.210336), new mp.Vector3(0, 0, -29.72641)],
    [new mp.Vector3(-670.2082, -1703.746, 6.033794), new mp.Vector3(0, 0, -30.29946)],
    [new mp.Vector3(-665.451, -1695.503, 6.342103), new mp.Vector3(0, 0, -29.97966)],
    [new mp.Vector3(-660.7504, -1687.324, 6.798599), new mp.Vector3(0, 0, -29.72769)],
    [new mp.Vector3(-655.9154, -1679.139, 7.630963), new mp.Vector3(0, 0, -30.21835)],
    [new mp.Vector3(-651.1796, -1670.977, 8.449436), new mp.Vector3(0, 0, -30.00595)],
    [new mp.Vector3(-646.6977, -1663.107, 9.241435), new mp.Vector3(0, 0, -29.82122)],
    [new mp.Vector3(-641.7862, -1654.51, 10.10455), new mp.Vector3(0, 0, -29.7619)],
    [new mp.Vector3(-637.245, -1646.681, 10.89897), new mp.Vector3(0, 0, -30.04581)],
    [new mp.Vector3(-632.5259, -1638.504, 11.7234), new mp.Vector3(0, 0, -30.1069)],
    [new mp.Vector3(-627.778, -1630.254, 12.55643), new mp.Vector3(0, 0, -30.00309)],
    [new mp.Vector3(-623.04, -1622.007, 13.20584), new mp.Vector3(0, 0, -29.76695)],
    [new mp.Vector3(-618.8721, -1613.582, 13.21927), new mp.Vector3(0, 0, -24.18388)],
    [new mp.Vector3(-616.2137, -1604.557, 13.21927), new mp.Vector3(0, 0, -10.91581)],
    [new mp.Vector3(-614.6511, -1595.299, 13.21967), new mp.Vector3(0, 0, -4.085502)],
    [new mp.Vector3(-614.6807, -1585.848, 13.21887), new mp.Vector3(0, 0, 3.580866)],
    [new mp.Vector3(-615.333, -1576.43, 13.21887), new mp.Vector3(0, 0, 4.715082)],
    [new mp.Vector3(-616.0829, -1567.031, 13.40624), new mp.Vector3(0, 0, 3.269608)],
    [new mp.Vector3(-616.2379, -1556.29, 13.58926), new mp.Vector3(0, 0, 1.016613)],
    [new mp.Vector3(-616.6634, -1542.193, 14.10706), new mp.Vector3(0, 0, 1.696475)],
    [new mp.Vector3(-617.0577, -1528.676, 14.60109), new mp.Vector3(0, 0, 1.658482)],
    [new mp.Vector3(-617.4384, -1514.561, 15.25533), new mp.Vector3(0, 0, 1.434751)],
    [new mp.Vector3(-617.7545, -1500.348, 15.876), new mp.Vector3(0, 0, 1.244227)],
    [new mp.Vector3(-618.0621, -1486.2, 16.45692), new mp.Vector3(0, 0, 1.241715)],
    [new mp.Vector3(-618.1119, -1472.024, 16.95874), new mp.Vector3(0, 0, -1.313066)],
    [new mp.Vector3(-616.504, -1457.976, 17.61308), new mp.Vector3(0, 0, -11.36292)],
    [new mp.Vector3(-612.3313, -1444.495, 18.54411), new mp.Vector3(0, 0, -20.92149)],
    [new mp.Vector3(-607.2742, -1431.337, 19.26113), new mp.Vector3(0, 0, -21.72059)],
    [new mp.Vector3(-602.0407, -1418.884, 19.8798), new mp.Vector3(0, 0, -24.20408)],
    [new mp.Vector3(-595.7431, -1405.496, 20.50463), new mp.Vector3(0, 0, -24.31584)],
    [new mp.Vector3(-590.1783, -1393.174, 21.11666), new mp.Vector3(0, 0, -24.43203)],
    [new mp.Vector3(-584.377, -1380.314, 21.81735), new mp.Vector3(0, 0, -24.24071)],
    [new mp.Vector3(-578.5222, -1367.344, 22.44604), new mp.Vector3(0, 0, -24.31994)],
    [new mp.Vector3(-572.6627, -1354.38, 23.04134), new mp.Vector3(0, 0, -24.32256)],
    [new mp.Vector3(-566.8237, -1341.548, 24.02917), new mp.Vector3(0, 0, -25.94757)],
    [new mp.Vector3(-559.0516, -1329.706, 25.18435), new mp.Vector3(0, 0, -34.50669)],
    [new mp.Vector3(-551.603, -1317.784, 25.8767), new mp.Vector3(0, 0, -27.94739)],
    //Puerto del sol
    [new mp.Vector3(-545.4214, -1305.001, 25.90403), new mp.Vector3(0, 0, -24.80758)],
    [new mp.Vector3(-539.567, -1292.045, 25.90193), new mp.Vector3(0, 0, -23.24244)],
    [new mp.Vector3(-533.9539, -1279.121, 25.90446), new mp.Vector3(0, 0, -24.94449)],
    [new mp.Vector3(-528.3733, -1266.938, 25.90333), new mp.Vector3(0, 0, -24.05277)],
    [new mp.Vector3(-523.0222, -1253.805, 26.00135), new mp.Vector3(0, 0, -17.99951)],
    [new mp.Vector3(-517.9169, -1240.713, 26.40784), new mp.Vector3(0, 0, -23.62126)],
    [new mp.Vector3(-509.6042, -1229.605, 27.23953), new mp.Vector3(0, 0, -48.72985)],
    [new mp.Vector3(-497.8405, -1222.073, 28.03494), new mp.Vector3(0, 0, -64.21883)],
    [new mp.Vector3(-484.3652, -1218.053, 28.98422), new mp.Vector3(0, 0, -81.29231)],
    [new mp.Vector3(-470.2313, -1217.031, 29.31224), new mp.Vector3(0, 0, -88.75001)],
    [new mp.Vector3(-456.1687, -1217.387, 28.65525), new mp.Vector3(0, 0, -90.50744)],
    [new mp.Vector3(-441.9435, -1217.425, 27.91157), new mp.Vector3(0, 0, -90.13365)],
    [new mp.Vector3(-427.833, -1217.454, 27.93278), new mp.Vector3(0, 0, -90.12497)],
    [new mp.Vector3(-413.7222, -1217.483, 28.03826), new mp.Vector3(0, 0, -90.12296)],
    [new mp.Vector3(-399.4872, -1217.541, 28.20171), new mp.Vector3(0, 0, -90.33853)],
    [new mp.Vector3(-385.3835, -1217.628, 28.34886), new mp.Vector3(0, 0, -90.35382)],
    [new mp.Vector3(-371.1554, -1217.696, 28.51324), new mp.Vector3(0, 0, -90.02986)],
    [new mp.Vector3(-357.7533, -1217.695, 29.67701), new mp.Vector3(0, 0, -89.813)],
    [new mp.Vector3(-343.5328, -1217.577, 31.70631), new mp.Vector3(0, 0, -89.67671)],
    [new mp.Vector3(-329.4274, -1217.6, 33.5498), new mp.Vector3(0, 0, -90.40704)],
    [new mp.Vector3(-315.204, -1217.568, 35.11995), new mp.Vector3(0, 0, -89.81715)],
    [new mp.Vector3(-300.9763, -1217.522, 36.48051), new mp.Vector3(0, 0, -89.93776)],
    [new mp.Vector3(-286.7502, -1217.586, 37.34526), new mp.Vector3(0, 0, -90.32)],
    [new mp.Vector3(-272.5258, -1217.604, 37.54765), new mp.Vector3(0, 0, -89.76849)],
    [new mp.Vector3(-258.4147, -1217.545, 37.55039), new mp.Vector3(0, 0, -89.74895)],
    [new mp.Vector3(-244.1859, -1217.486, 37.55042), new mp.Vector3(0, 0, -89.75303)],
    [new mp.Vector3(-230.7808, -1217.43, 37.55051), new mp.Vector3(0, 0, -89.75751)],
    [new mp.Vector3(-216.6746, -1217.436, 37.55057), new mp.Vector3(0, 0, -89.95794)],
    [new mp.Vector3(-202.4511, -1217.471, 37.55066), new mp.Vector3(0, 0, -90.79671)],
    [new mp.Vector3(-188.2284, -1217.643, 37.5507), new mp.Vector3(0, 0, -90.23458)],
    [new mp.Vector3(-174.1237, -1217.742, 37.55175), new mp.Vector3(0, 0, -91.19193)],
    [new mp.Vector3(-159.9024, -1218.124, 37.54998), new mp.Vector3(0, 0, -91.6262)],
    [new mp.Vector3(-145.8048, -1218.393, 37.54954), new mp.Vector3(0, 0, -91.03324)],
    [new mp.Vector3(-131.6999, -1218.688, 37.54919), new mp.Vector3(0, 0, -91.76189)],
    [new mp.Vector3(-117.499, -1218.869, 37.54907), new mp.Vector3(0, 0, -89.73284)],
    [new mp.Vector3(-103.2717, -1218.767, 37.54958), new mp.Vector3(0, 0, -89.63351)],
    [new mp.Vector3(-89.87099, -1218.772, 37.55006), new mp.Vector3(0, 0, -90.23284)],
    [new mp.Vector3(-75.64404, -1218.837, 37.55047), new mp.Vector3(0, 0, -90.3937)],
    [new mp.Vector3(-61.53736, -1218.927, 37.55089), new mp.Vector3(0, 0, -89.97409)],
    [new mp.Vector3(-47.3088, -1218.894, 37.55133), new mp.Vector3(0, 0, -89.8415)],
    [new mp.Vector3(-33.07975, -1218.857, 37.55243), new mp.Vector3(0, 0, -89.84385)],
    [new mp.Vector3(-18.97198, -1218.849, 37.55308), new mp.Vector3(0, 0, -90.35221)],
    [new mp.Vector3(-4.743441, -1218.937, 37.55355), new mp.Vector3(0, 0, -90.38136)],
    [new mp.Vector3(9.480984, -1218.996, 37.55076), new mp.Vector3(0, 0, -89.86349)],
    [new mp.Vector3(23.57808, -1218.758, 37.54914), new mp.Vector3(0, 0, -88.35395)],
    [new mp.Vector3(37.67855, -1218.319, 37.54914), new mp.Vector3(0, 0, -87.70972)],
    [new mp.Vector3(51.85361, -1217.307, 37.54903), new mp.Vector3(0, 0, -85.52345)],
    [new mp.Vector3(65.92052, -1216.201, 37.54919), new mp.Vector3(0, 0, -85.33749)],
    [new mp.Vector3(79.26617, -1215, 37.54918), new mp.Vector3(0, 0, -84.57556)],
    [new mp.Vector3(94.13276, -1213.549, 37.54918), new mp.Vector3(0, 0, -84.21609)],
    [new mp.Vector3(107.5806, -1212.183, 37.55053), new mp.Vector3(0, 0, -84.27014)],
    [new mp.Vector3(121.6345, -1210.867, 37.6894), new mp.Vector3(0, 0, -85.24177)],
    [new mp.Vector3(135.6861, -1209.712, 37.69652), new mp.Vector3(0, 0, -85.19715)],
    [new mp.Vector3(149.86, -1208.941, 37.81615), new mp.Vector3(0, 0, -89.82991)],
    [new mp.Vector3(163.9593, -1209.212, 37.81247), new mp.Vector3(0, 0, -91.32274)],
    [new mp.Vector3(178.1729, -1209.646, 38.02896), new mp.Vector3(0, 0, -92.64057)],
    [new mp.Vector3(192.2555, -1210.004, 38.04601), new mp.Vector3(0, 0, -90.14287)],
    [new mp.Vector3(206.4821, -1210.097, 37.99434), new mp.Vector3(0, 0, -90.41354)],
    //Strawberry
    [new mp.Vector3(220.5879, -1210.144, 38.07406), new mp.Vector3(0, 0, -90.02408)],
    [new mp.Vector3(234.8168, -1210.151, 38.07452), new mp.Vector3(0, 0, -90.04467)],
    [new mp.Vector3(249.0443, -1210.178, 38.07472), new mp.Vector3(0, 0, -90.24751)],
    [new mp.Vector3(262.4441, -1210.112, 38.07454), new mp.Vector3(0, 0, -89.56907)],
    [new mp.Vector3(277.2574, -1210.056, 38.07444), new mp.Vector3(0, 0, -90.01092)],
    [new mp.Vector3(290.775, -1210.132, 38.07475), new mp.Vector3(0, 0, -90.8426)],
    [new mp.Vector3(304.8905, -1210.189, 38.07458), new mp.Vector3(0, 0, -90.09486)],
    [new mp.Vector3(319.1088, -1210.192, 38.06477), new mp.Vector3(0, 0, -89.93088)],
    [new mp.Vector3(333.2202, -1210.169, 37.97719), new mp.Vector3(0, 0, -89.91551)],
    [new mp.Vector3(347.3312, -1210.148, 37.34351), new mp.Vector3(0, 0, -89.91419)],
    [new mp.Vector3(361.5288, -1209.599, 36.10234), new mp.Vector3(0, 0, -87.28642)],
    [new mp.Vector3(375.6031, -1208.73, 34.54081), new mp.Vector3(0, 0, -86.15463)],
    [new mp.Vector3(389.7982, -1208.162, 32.85363), new mp.Vector3(0, 0, -89.31432)],
    [new mp.Vector3(403.8967, -1207.849, 31.28016), new mp.Vector3(0, 0, -88.2723)],
    [new mp.Vector3(418.1154, -1207.465, 30.03165), new mp.Vector3(0, 0, -88.17453)],
    [new mp.Vector3(432.2168, -1207.108, 29.35262), new mp.Vector3(0, 0, -88.87024)],
    [new mp.Vector3(446.4316, -1207.149, 29.32088), new mp.Vector3(0, 0, -90.84588)],
    [new mp.Vector3(459.9514, -1207.382, 29.26957), new mp.Vector3(0, 0, -91.10231)],
    [new mp.Vector3(474.0498, -1207.496, 29.26476), new mp.Vector3(0, 0, -89.44857)],
    [new mp.Vector3(488.1294, -1207.121, 29.28973), new mp.Vector3(0, 0, -85.93301)],
    [new mp.Vector3(501.9113, -1204.391, 29.31143), new mp.Vector3(0, 0, -69.60582)],
    [new mp.Vector3(513.228, -1196.569, 29.31905), new mp.Vector3(0, 0, -41.31251)],
    [new mp.Vector3(521.0798, -1184.965, 29.3077), new mp.Vector3(0, 0, -20.61712)],
    [new mp.Vector3(523.7926, -1171.266, 29.39663), new mp.Vector3(0, 0, -5.221894)],
    [new mp.Vector3(524.1068, -1157.087, 29.39618), new mp.Vector3(0, 0, 0.1259989)],
    [new mp.Vector3(524.0403, -1142.978, 29.34072), new mp.Vector3(0, 0, 0.467445)],
    [new mp.Vector3(523.9525, -1128.752, 29.23465), new mp.Vector3(0, 0, 0.06614512)],
    [new mp.Vector3(523.908, -1114.642, 29.19112), new mp.Vector3(0, 0, 0.2520596)],
    [new mp.Vector3(523.8379, -1100.413, 29.05645), new mp.Vector3(0, 0, 0.450793)],
    [new mp.Vector3(523.4617, -1086.325, 28.94142), new mp.Vector3(0, 0, 2.613259)],
    [new mp.Vector3(522.8389, -1072.815, 28.45251), new mp.Vector3(0, 0, 2.646446)],
    [new mp.Vector3(522.3359, -1058.732, 27.58659), new mp.Vector3(0, 0, 0.4376451)],
    [new mp.Vector3(522.3977, -1044.508, 26.77661), new mp.Vector3(0, 0, -0.3362204)],
    [new mp.Vector3(522.4062, -1030.403, 25.95211), new mp.Vector3(0, 0, 0.4114202)],
    [new mp.Vector3(522.303, -1016.292, 25.02484), new mp.Vector3(0, 0, 0.427213)],
    [new mp.Vector3(522.2, -1002.063, 23.99593), new mp.Vector3(0, 0, 0.3889274)],
    [new mp.Vector3(522.1862, -987.8372, 22.89786), new mp.Vector3(0, 0, 0.006805252)],
    [new mp.Vector3(522.1862, -973.7254, 21.77072), new mp.Vector3(0, 0, 0.001372694)],
    [new mp.Vector3(522.283, -959.501, 20.60868), new mp.Vector3(0, 0, -0.2846828)],
    [new mp.Vector3(522.2709, -945.3931, 19.45333), new mp.Vector3(0, 0, 0.1112772)],
    [new mp.Vector3(522.3971, -931.294, 18.33132), new mp.Vector3(0, 0, -1.783624)],
    [new mp.Vector3(523.7885, -917.1943, 17.32591), new mp.Vector3(0, 0, -9.098665)],
    [new mp.Vector3(526.3534, -903.3427, 16.39343), new mp.Vector3(0, 0, -12.52631)],
    [new mp.Vector3(529.1439, -890.1258, 15.76306), new mp.Vector3(0, 0, -10.87352)],
    [new mp.Vector3(531.8122, -876.2701, 15.53275), new mp.Vector3(0, 0, -10.63248)],
    [new mp.Vector3(532.5251, -862.2656, 15.41094), new mp.Vector3(0, 0, -1.421223)],
    [new mp.Vector3(532.6108, -848.0561, 15.41088), new mp.Vector3(0, 0, -0.0698026)],
    [new mp.Vector3(531.8517, -834.0364, 15.41254), new mp.Vector3(0, 0, 7.71083)],
    [new mp.Vector3(531.1245, -819.8807, 15.44578), new mp.Vector3(0, 0, 1.525602)],
    [new mp.Vector3(530.9625, -805.7773, 15.4466), new mp.Vector3(0, 0, 0.3866306)],
    [new mp.Vector3(530.9518, -791.5553, 15.4477), new mp.Vector3(0, 0, -0.7042845)],
    [new mp.Vector3(531.4849, -777.4662, 15.45238), new mp.Vector3(0, 0, -2.727293)],
    [new mp.Vector3(532.2939, -763.2719, 15.38137), new mp.Vector3(0, 0, -3.576915)],
    [new mp.Vector3(532.9675, -749.1728, 15.45537), new mp.Vector3(0, 0, -2.574143)],
    [new mp.Vector3(533.8123, -735.7056, 15.52036), new mp.Vector3(0, 0, -4.052919)],
    [new mp.Vector3(535.0922, -720.9293, 15.46082), new mp.Vector3(0, 0, -5.140893)],
    [new mp.Vector3(536.3358, -707.4938, 15.46552), new mp.Vector3(0, 0, -5.997035)],
    [new mp.Vector3(537.896, -693.3524, 15.53677), new mp.Vector3(0, 0, -6.332493)],
    [new mp.Vector3(539.442, -679.3287, 15.47881), new mp.Vector3(0, 0, -6.436596)],
    [new mp.Vector3(541.9099, -666.1046, 15.2922), new mp.Vector3(0, 0, -20.59992)],
    [new mp.Vector3(545.5222, -657.3469, 15.41945), new mp.Vector3(0, 0, -25.94212)],
    [new mp.Vector3(549.6465, -648.8895, 15.42422), new mp.Vector3(0, 0, -22.17107)],
    [new mp.Vector3(552.1614, -639.7784, 15.42362), new mp.Vector3(0, 0, -12.14665)],
    [new mp.Vector3(553.6955, -630.5225, 15.42362), new mp.Vector3(0, 0, -3.97992)],
    [new mp.Vector3(553.6971, -621.1359, 15.39542), new mp.Vector3(0, 0, 2.978728)],
    [new mp.Vector3(552.1589, -611.828, 15.39532), new mp.Vector3(0, 0, 14.21578)],
    [new mp.Vector3(549.4959, -603.3544, 15.39532), new mp.Vector3(0, 0, 24.1384)],
    [new mp.Vector3(545.1747, -594.9296, 15.3953), new mp.Vector3(0, 0, 31.55282)],
    [new mp.Vector3(539.9908, -587.0405, 15.39526), new mp.Vector3(0, 0, 40.00674)],
    [new mp.Vector3(533.2793, -580.4744, 15.39526), new mp.Vector3(0, 0, 47.32331)],
    [new mp.Vector3(525.8086, -574.8174, 15.39526), new mp.Vector3(0, 0, 56.82893)],
    [new mp.Vector3(517.4583, -570.4401, 15.39523), new mp.Vector3(0, 0, 66.01581)],
    [new mp.Vector3(508.6724, -567.1122, 15.39523), new mp.Vector3(0, 0, 71.77208)],
    [new mp.Vector3(499.4223, -565.2994, 15.39523), new mp.Vector3(0, 0, 83.5555)],
    [new mp.Vector3(490.1011, -564.9685, 15.39521), new mp.Vector3(0, 0, 95.93096)],
    [new mp.Vector3(480.7661, -565.8719, 15.39521), new mp.Vector3(0, 0, 99.88137)],
    [new mp.Vector3(471.6575, -568.3775, 15.39521), new mp.Vector3(0, 0, 110.5772)],
    [new mp.Vector3(462.969, -572.1631, 15.39521), new mp.Vector3(0, 0, 115.4124)],
    [new mp.Vector3(454.4337, -576.1931, 15.39854), new mp.Vector3(0, 0, 115.3026)],
    [new mp.Vector3(445.9828, -578.8927, 15.39763), new mp.Vector3(0, 0, 104.0649)],
    [new mp.Vector3(436.6248, -580.0453, 15.39744), new mp.Vector3(0, 0, 93.41395)],
    [new mp.Vector3(427.2158, -580.3386, 15.7252), new mp.Vector3(0, 0, 89.95945)],
    [new mp.Vector3(417.7059, -580.3164, 16.55462), new mp.Vector3(0, 0, 89.93703)],
    [new mp.Vector3(408.2776, -580.1376, 17.3784), new mp.Vector3(0, 0, 88.87937)],
    [new mp.Vector3(398.752, -580.043, 17.7609), new mp.Vector3(0, 0, 89.27957)],
    [new mp.Vector3(389.3236, -579.9971, 17.75688), new mp.Vector3(0, 0, 89.69164)],
    [new mp.Vector3(379.8838, -579.9235, 17.75686), new mp.Vector3(0, 0, 89.92759)],
    [new mp.Vector3(370.4471, -579.9164, 17.75686), new mp.Vector3(0, 0, 89.83511)],
    [new mp.Vector3(360.9264, -579.9309, 17.75686), new mp.Vector3(0, 0, 90.06838)],
    [new mp.Vector3(351.4056, -579.9684, 17.75686), new mp.Vector3(0, 0, 90.23311)],
    [new mp.Vector3(341.9631, -579.9788, 17.75687), new mp.Vector3(0, 0, 90.12277)],
    [new mp.Vector3(332.5268, -580.0195, 17.75687), new mp.Vector3(0, 0, 90.13976)],
    [new mp.Vector3(323.0058, -580.0607, 17.75688), new mp.Vector3(0, 0, 90.21547)],
    [new mp.Vector3(313.5726, -580.1331, 17.75688), new mp.Vector3(0, 0, 90.40805)],
    [new mp.Vector3(304.0425, -580.1805, 17.75688), new mp.Vector3(0, 0, 90.33275)],
    [new mp.Vector3(295.09, -580.2157, 17.75688), new mp.Vector3(0, 0, 89.26267)],
    [new mp.Vector3(285.6546, -579.9665, 17.75688), new mp.Vector3(0, 0, 88.28853)],
    [new mp.Vector3(276.1547, -579.8434, 17.75688), new mp.Vector3(0, 0, 89.62334)],
    [new mp.Vector3(266.7174, -580.0099, 17.75688), new mp.Vector3(0, 0, 92.02019)],
    [new mp.Vector3(257.2184, -580.115, 17.75688), new mp.Vector3(0, 0, 90.15263)],
    [new mp.Vector3(247.7779, -580.1438, 17.75688), new mp.Vector3(0, 0, 90.09525)],
    [new mp.Vector3(238.3084, -580.5364, 17.75805), new mp.Vector3(0, 0, 95.40503)],
    [new mp.Vector3(229.1013, -582.3361, 17.75805), new mp.Vector3(0, 0, 103.822)],
    [new mp.Vector3(220.2117, -585.5032, 17.75805), new mp.Vector3(0, 0, 114.4822)],
    [new mp.Vector3(211.7441, -589.5933, 17.75805), new mp.Vector3(0, 0, 114.8642)],
    [new mp.Vector3(203.0392, -593.0662, 17.75805), new mp.Vector3(0, 0, 106.2562)],
    [new mp.Vector3(193.803, -595.0398, 17.75805), new mp.Vector3(0, 0, 96.66267)],
    [new mp.Vector3(185.1847, -595.621, 17.78113), new mp.Vector3(0, 0, 91.4179)],
    [new mp.Vector3(168.858, -595.6084, 17.78498), new mp.Vector3(0, 0, 90.01333)],
    [new mp.Vector3(155.4511, -595.6115, 17.78498), new mp.Vector3(0, 0, 90.02345)],
    [new mp.Vector3(141.4149, -595.033, 17.79885), new mp.Vector3(0, 0, 81.80202)],
    [new mp.Vector3(127.8646, -591.0361, 17.79881), new mp.Vector3(0, 0, 68.87834)],
    [new mp.Vector3(115.3458, -584.4657, 17.79165), new mp.Vector3(0, 0, 63.74408)],
    [new mp.Vector3(102.4816, -578.7575, 17.78464), new mp.Vector3(0, 0, 66.17056)],
    [new mp.Vector3(91.04668, -572.5721, 17.75229), new mp.Vector3(0, 0, 60.38103)],
    [new mp.Vector3(82.80356, -567.9717, 17.75188), new mp.Vector3(0, 0, 60.66028)],
    [new mp.Vector3(74.50873, -563.3164, 17.75188), new mp.Vector3(0, 0, 60.71503)],
    [new mp.Vector3(66.32706, -558.611, 17.75188), new mp.Vector3(0, 0, 59.93822)],
    [new mp.Vector3(58.07898, -553.8494, 17.75188), new mp.Vector3(0, 0, 59.88318)],
    [new mp.Vector3(50.03678, -548.9257, 17.75187), new mp.Vector3(0, 0, 58.33131)],
    [new mp.Vector3(41.93339, -544.1177, 17.75187), new mp.Vector3(0, 0, 58.94904)],
    [new mp.Vector3(34.1575, -538.6995, 17.75187), new mp.Vector3(0, 0, 54.22704)],
    [new mp.Vector3(26.87791, -533.4677, 17.75187), new mp.Vector3(0, 0, 54.61081)],
    [new mp.Vector3(18.82906, -528.4379, 17.75183), new mp.Vector3(0, 0, 59.49104)],
    [new mp.Vector3(10.39066, -524.3767, 17.74691), new mp.Vector3(0, 0, 68.53013)],
    [new mp.Vector3(1.319925, -521.7047, 17.74691), new mp.Vector3(0, 0, 77.42205)],
    [new mp.Vector3(-7.94379, -520.4076, 17.74691), new mp.Vector3(0, 0, 86.99404)],
    [new mp.Vector3(-17.3566, -519.9926, 17.75181), new mp.Vector3(0, 0, 90.3348)],
    [new mp.Vector3(-26.86202, -520.0667, 17.75183), new mp.Vector3(0, 0, 89.92276)],
    [new mp.Vector3(-36.30997, -520.0458, 17.75183), new mp.Vector3(0, 0, 89.94154)],
    [new mp.Vector3(-45.83295, -520.0316, 17.75183), new mp.Vector3(0, 0, 89.89834)],
    [new mp.Vector3(-55.26303, -520.038, 17.75182), new mp.Vector3(0, 0, 89.95666)],
    [new mp.Vector3(-64.78274, -520.0857, 17.75182), new mp.Vector3(0, 0, 90.22485)],
    [new mp.Vector3(-74.22552, -520.1202, 17.75178), new mp.Vector3(0, 0, 90.22202)],
    [new mp.Vector3(-83.6475, -519.4752, 17.75178), new mp.Vector3(0, 0, 81.34093)],
    [new mp.Vector3(-92.85982, -517.6548, 17.75179), new mp.Vector3(0, 0, 75.29777)],
    [new mp.Vector3(-101.1545, -514.3698, 17.85182), new mp.Vector3(0, 0, 60.72599)],
    [new mp.Vector3(-109.3358, -509.6712, 17.12533), new mp.Vector3(0, 0, 60.01155)],
    [new mp.Vector3(-117.5714, -504.8982, 16.29199), new mp.Vector3(0, 0, 60.04056)],
    [new mp.Vector3(-125.7715, -500.2343, 15.46692), new mp.Vector3(0, 0, 60.25721)],
    [new mp.Vector3(-134.0295, -495.5099, 15.01447), new mp.Vector3(0, 0, 59.46283)],
    [new mp.Vector3(-142.1718, -490.7383, 14.51961), new mp.Vector3(0, 0, 59.4885)],
    [new mp.Vector3(-150.2872, -485.9166, 14.1218), new mp.Vector3(0, 0, 59.32583)],
    [new mp.Vector3(-158.5293, -481.1656, 13.62339), new mp.Vector3(0, 0, 60.55185)],
    [new mp.Vector3(-166.7066, -476.4579, 12.79586), new mp.Vector3(0, 0, 59.39165)],
    [new mp.Vector3(-174.9398, -471.6942, 11.96412), new mp.Vector3(0, 0, 59.97502)],
    [new mp.Vector3(-183.1102, -466.9633, 11.13826), new mp.Vector3(0, 0, 60.25121)],
    [new mp.Vector3(-191.358, -462.2089, 10.30557), new mp.Vector3(0, 0, 59.68989)],
    [new mp.Vector3(-199.5064, -457.4409, 9.479653), new mp.Vector3(0, 0, 59.0597)],
    [new mp.Vector3(-207.5918, -452.6187, 9.148505), new mp.Vector3(0, 0, 57.14355)],
    [new mp.Vector3(-214.9256, -447.3587, 9.148718), new mp.Vector3(0, 0, 53.16055)],
    [new mp.Vector3(-222.5457, -441.8218, 9.148719), new mp.Vector3(0, 0, 56.37791)],
    [new mp.Vector3(-230.621, -436.8082, 9.148663), new mp.Vector3(0, 0, 59.07151)],
    [new mp.Vector3(-238.8061, -432.1418, 9.148666), new mp.Vector3(0, 0, 60.01872)],
    [new mp.Vector3(-247.1021, -427.4724, 9.148667), new mp.Vector3(0, 0, 61.46641)],
    [new mp.Vector3(-255.4461, -422.8991, 9.148667), new mp.Vector3(0, 0, 60.74954)],
    [new mp.Vector3(-263.5935, -418.149, 9.14866), new mp.Vector3(0, 0, 59.22821)],
    [new mp.Vector3(-271.2092, -412.7262, 9.14861), new mp.Vector3(0, 0, 48.82687)],
    [new mp.Vector3(-277.8761, -406.0173, 9.14861), new mp.Vector3(0, 0, 40.1154)],
    [new mp.Vector3(-283.235, -398.3434, 9.14861), new mp.Vector3(0, 0, 29.16414)],
    [new mp.Vector3(-286.6357, -389.6946, 9.148631), new mp.Vector3(0, 0, 13.69736)],
    [new mp.Vector3(-287.3054, -380.3387, 9.148631), new mp.Vector3(0, 0, -1.707252)],
    [new mp.Vector3(-287.0893, -370.9066, 9.160858), new mp.Vector3(0, 0, 0.1655973)],
    [new mp.Vector3(-287.113, -361.8577, 9.163548), new mp.Vector3(0, 0, 0.2989563)],
    [new mp.Vector3(-287.1735, -352.4312, 9.163544), new mp.Vector3(0, 0, 0.1301994)],
    //Burton
    [new mp.Vector3(-287.25, -342.9127, 9.165997), new mp.Vector3(0, 0, 0.09353039)],
    [new mp.Vector3(-287.2664, -333.4693, 9.171715), new mp.Vector3(0, 0, 0.08704413)],
    [new mp.Vector3(-287.042, -323.9745, 9.177493), new mp.Vector3(0, 0, -0.4044953)],
    [new mp.Vector3(-287.0893, -314.5438, 9.183281), new mp.Vector3(0, 0, 0.3531508)],
    [new mp.Vector3(-287.186, -305.105, 9.189033), new mp.Vector3(0, 0, 0.4566508)],
    [new mp.Vector3(-287.2321, -295.5881, 9.186514), new mp.Vector3(0, 0, 0.06589463)],
    [new mp.Vector3(-287.2123, -286.148, 9.163657), new mp.Vector3(0, 0, -0.02933677)],
    [new mp.Vector3(-287.4611, -276.7065, 9.148735), new mp.Vector3(0, 0, 10.27273)],
    [new mp.Vector3(-290.2295, -267.7477, 9.236845), new mp.Vector3(0, 0, 18.46503)],
    [new mp.Vector3(-293.9451, -259.0537, 9.148711), new mp.Vector3(0, 0, 26.0457)],
    [new mp.Vector3(-298.6007, -250.9095, 9.148678), new mp.Vector3(0, 0, 33.70387)],
    [new mp.Vector3(-304.1201, -243.2036, 9.148632), new mp.Vector3(0, 0, 39.60978)],
    [new mp.Vector3(-310.2076, -236.6814, 9.148705), new mp.Vector3(0, 0, 46.54499)],
    [new mp.Vector3(-317.665, -230.8906, 9.148762), new mp.Vector3(0, 0, 56.04352)],
    [new mp.Vector3(-325.799, -226.1867, 9.148757), new mp.Vector3(0, 0, 62.05655)],
    [new mp.Vector3(-334.1705, -221.8782, 9.148757), new mp.Vector3(0, 0, 65.88902)],
    [new mp.Vector3(-342.8748, -218.0116, 9.14876), new mp.Vector3(0, 0, 65.9578)],
    [new mp.Vector3(-351.2579, -213.7779, 9.14871), new mp.Vector3(0, 0, 59.70604)],
    [new mp.Vector3(-359.4986, -209.0142, 9.148712), new mp.Vector3(0, 0, 60.21261)],
    [new mp.Vector3(-367.6772, -204.3102, 9.148696), new mp.Vector3(0, 0, 59.8564)],
    [new mp.Vector3(-375.9356, -199.5831, 9.148714), new mp.Vector3(0, 0, 61.36586)],
    [new mp.Vector3(-384.5394, -195.8846, 9.148723), new mp.Vector3(0, 0, 70.08611)],
    [new mp.Vector3(-393.7181, -193.726, 9.148724), new mp.Vector3(0, 0, 81.46866)],
    [new mp.Vector3(-403.0431, -192.5396, 9.148646), new mp.Vector3(0, 0, 86.90256)],
    [new mp.Vector3(-412.5417, -192.2832, 9.148711), new mp.Vector3(0, 0, 89.54096)],
    [new mp.Vector3(-421.9668, -192.434, 9.148707), new mp.Vector3(0, 0, 90.95997)],
    [new mp.Vector3(-431.0229, -192.5862, 9.148707), new mp.Vector3(0, 0, 90.86285)],
    [new mp.Vector3(-440.4567, -192.6674, 9.562017), new mp.Vector3(0, 0, 90.31098)],
    [new mp.Vector3(-449.8952, -192.6744, 10.39151), new mp.Vector3(0, 0, 89.77481)],
    [new mp.Vector3(-459.409, -192.6975, 11.22243), new mp.Vector3(0, 0, 90.12631)],
    [new mp.Vector3(-468.9329, -192.6474, 12.05643), new mp.Vector3(0, 0, 89.37648)],
    [new mp.Vector3(-478.4449, -192.5215, 12.88923), new mp.Vector3(0, 0, 89.83141)],
    [new mp.Vector3(-487.8736, -192.4507, 13.71452), new mp.Vector3(0, 0, 89.02934)],
    [new mp.Vector3(-497.3729, -192.2775, 14.09315), new mp.Vector3(0, 0, 86.86948)],
    [new mp.Vector3(-506.5988, -190.7484, 14.09287), new mp.Vector3(0, 0, 75.57262)],
    [new mp.Vector3(-515.626, -187.9117, 14.09287), new mp.Vector3(0, 0, 68.15223)],
    [new mp.Vector3(-523.9214, -183.571, 14.09286), new mp.Vector3(0, 0, 59.59762)],
    [new mp.Vector3(-531.7513, -179.0429, 14.09285), new mp.Vector3(0, 0, 59.65817)],
    [new mp.Vector3(-539.9379, -174.3568, 14.09285), new mp.Vector3(0, 0, 60.29891)],
    [new mp.Vector3(-548.17, -169.5899, 14.14349), new mp.Vector3(0, 0, 60.09061)],
    [new mp.Vector3(-556.3506, -164.8753, 14.86289), new mp.Vector3(0, 0, 59.88162)],
    [new mp.Vector3(-564.608, -160.1431, 15.69572), new mp.Vector3(0, 0, 60.16713)],
    [new mp.Vector3(-572.8057, -155.4747, 16.52075), new mp.Vector3(0, 0, 60.3898)],
    [new mp.Vector3(-581.0677, -150.7413, 17.35393), new mp.Vector3(0, 0, 60.2522)],
    [new mp.Vector3(-589.2812, -146.0798, 18.18002), new mp.Vector3(0, 0, 60.30557)],
    [new mp.Vector3(-597.3997, -141.1366, 18.93123), new mp.Vector3(0, 0, 57.4543)],
    [new mp.Vector3(-605.3394, -136.0789, 19.03702), new mp.Vector3(0, 0, 55.30765)],
    [new mp.Vector3(-612.8416, -130.3754, 19.03701), new mp.Vector3(0, 0, 52.94057)],
    [new mp.Vector3(-620.6594, -125.0272, 19.037), new mp.Vector3(0, 0, 59.20476)],
    [new mp.Vector3(-628.8225, -120.3105, 19.03695), new mp.Vector3(0, 0, 59.39653)],
    [new mp.Vector3(-636.6299, -115.7519, 19.03695), new mp.Vector3(0, 0, 59.53726)],
    [new mp.Vector3(-644.8201, -111.0816, 19.03695), new mp.Vector3(0, 0, 60.07963)],
    [new mp.Vector3(-653.0488, -106.3042, 19.03695), new mp.Vector3(0, 0, 60.15573)],
    [new mp.Vector3(-661.225, -101.5902, 19.03694), new mp.Vector3(0, 0, 59.8621)],
    [new mp.Vector3(-669.4785, -96.85597, 19.03694), new mp.Vector3(0, 0, 60.12321)],
    [new mp.Vector3(-677.6826, -92.19537, 19.03568), new mp.Vector3(0, 0, 61.58586)],
    [new mp.Vector3(-686.3635, -88.46326, 19.0355), new mp.Vector3(0, 0, 71.4717)],
    [new mp.Vector3(-695.4666, -86.20679, 19.0355), new mp.Vector3(0, 0, 78.63911)],
    [new mp.Vector3(-704.8652, -85.10658, 19.0355), new mp.Vector3(0, 0, 86.46819)],
    [new mp.Vector3(-714.2813, -84.9985, 19.03694), new mp.Vector3(0, 0, 90.13907)],
    [new mp.Vector3(-723.7277, -85.4405, 19.03812), new mp.Vector3(0, 0, 98.10416)],
    [new mp.Vector3(-732.9273, -87.28456, 19.03812), new mp.Vector3(0, 0, 105.6303)],
    [new mp.Vector3(-741.2893, -90.39486, 19.03812), new mp.Vector3(0, 0, 112.2205)],
    [new mp.Vector3(-749.5713, -94.88535, 19.03703), new mp.Vector3(0, 0, 117.8414)],
    [new mp.Vector3(-757.8943, -99.29388, 19.04798), new mp.Vector3(0, 0, 119.5454)],
    [new mp.Vector3(-766.4543, -103.1797, 19.04978), new mp.Vector3(0, 0, 107.7432)],
    [new mp.Vector3(-775.2787, -106.4326, 19.04978), new mp.Vector3(0, 0, 112.9899)],
    [new mp.Vector3(-783.7184, -110.7416, 19.05197), new mp.Vector3(0, 0, 118.4784)],
    [new mp.Vector3(-791.9805, -115.2913, 19.05076), new mp.Vector3(0, 0, 120.1453)],
    [new mp.Vector3(-800.216, -120.0449, 19.05076), new mp.Vector3(0, 0, 120.4883)],
    //Portola drive
    [new mp.Vector3(-808.3311, -124.8697, 19.05291), new mp.Vector3(0, 0, 120.5857)],
    [new mp.Vector3(-816.3925, -129.7542, 19.05862), new mp.Vector3(0, 0, 121.1077)],
    [new mp.Vector3(-824.6862, -134.3971, 19.06437), new mp.Vector3(0, 0, 118.8738)],
    [new mp.Vector3(-832.9174, -139.0166, 19.07019), new mp.Vector3(0, 0, 119.9967)],
    [new mp.Vector3(-841.1553, -143.794, 19.07598), new mp.Vector3(0, 0, 120.0256)],
    [new mp.Vector3(-849.3031, -148.5449, 19.07705), new mp.Vector3(0, 0, 120.2387)],
    [new mp.Vector3(-857.1141, -153.1034, 19.05092), new mp.Vector3(0, 0, 120.9631)],
    [new mp.Vector3(-865.1538, -158.0332, 19.04988), new mp.Vector3(0, 0, 123.4884)],
    [new mp.Vector3(-872.7117, -163.6238, 19.09993), new mp.Vector3(0, 0, 129.2979)],
    [new mp.Vector3(-880.0225, -169.6905, 19.04999), new mp.Vector3(0, 0, 128.3077)],
    [new mp.Vector3(-887.9252, -174.7723, 19.03834), new mp.Vector3(0, 0, 120.7577)],
    [new mp.Vector3(-896.1785, -179.4753, 19.03695), new mp.Vector3(0, 0, 120.1149)],
    [new mp.Vector3(-904.411, -184.2642, 19.03695), new mp.Vector3(0, 0, 120.1993)],
    [new mp.Vector3(-912.538, -189.056, 19.03694), new mp.Vector3(0, 0, 120.5064)],
    [new mp.Vector3(-920.6885, -193.8376, 19.03694), new mp.Vector3(0, 0, 120.4448)],
    [new mp.Vector3(-928.9457, -198.5453, 19.03694), new mp.Vector3(0, 0, 118.2064)],
    [new mp.Vector3(-937.3458, -203.0056, 19.03694), new mp.Vector3(0, 0, 117.9125)],
    [new mp.Vector3(-945.6701, -207.4618, 19.0321), new mp.Vector3(0, 0, 117.9992)],
    [new mp.Vector3(-954.3594, -210.8396, 19.03201), new mp.Vector3(0, 0, 105.4827)],
    [new mp.Vector3(-963.624, -212.7318, 19.0319), new mp.Vector3(0, 0, 96.95131)],
    [new mp.Vector3(-972.5244, -212.9503, 19.03684), new mp.Vector3(0, 0, 90.08565)],
    [new mp.Vector3(-982.0366, -213.0007, 19.03692), new mp.Vector3(0, 0, 89.33206)],
    [new mp.Vector3(-991.4784, -212.9899, 19.03692), new mp.Vector3(0, 0, 89.98672)],
    [new mp.Vector3(-1000.976, -213.0956, 19.03249), new mp.Vector3(0, 0, 93.06926)],
    [new mp.Vector3(-1010.347, -214.2631, 19.032), new mp.Vector3(0, 0, 101.6599)],
    [new mp.Vector3(-1019.389, -216.8052, 19.032), new mp.Vector3(0, 0, 108.4889)],
    [new mp.Vector3(-1028, -220.5225, 19.032), new mp.Vector3(0, 0, 115.7481)],
    [new mp.Vector3(-1036.365, -225.0051, 19.0369), new mp.Vector3(0, 0, 119.7522)],
    [new mp.Vector3(-1044.527, -229.8444, 19.03691), new mp.Vector3(0, 0, 123.8915)],
    [new mp.Vector3(-1052.585, -234.6992, 19.03691), new mp.Vector3(0, 0, 119.3748)],
    [new mp.Vector3(-1060.767, -239.3922, 19.03691), new mp.Vector3(0, 0, 119.8049)],
    [new mp.Vector3(-1069.039, -244.0851, 19.03691), new mp.Vector3(0, 0, 119.9967)],
    [new mp.Vector3(-1077.225, -248.7871, 19.03691), new mp.Vector3(0, 0, 119.5719)],
    [new mp.Vector3(-1085.088, -253.2646, 19.03691), new mp.Vector3(0, 0, 119.5532)],
    [new mp.Vector3(-1093.243, -257.9926, 19.03691), new mp.Vector3(0, 0, 120.0158)],
    [new mp.Vector3(-1101.499, -262.7359, 19.03691), new mp.Vector3(0, 0, 119.985)],
    [new mp.Vector3(-1109.647, -267.5129, 19.03693), new mp.Vector3(0, 0, 120.403)],
    [new mp.Vector3(-1117.78, -272.3096, 19.0369), new mp.Vector3(0, 0, 120.5284)],
    [new mp.Vector3(-1125.964, -277.1486, 19.0369), new mp.Vector3(0, 0, 120.1093)],
    [new mp.Vector3(-1134.219, -281.9068, 19.03689), new mp.Vector3(0, 0, 119.9903)],
    [new mp.Vector3(-1142.389, -286.6301, 19.03692), new mp.Vector3(0, 0, 120.0221)],
    [new mp.Vector3(-1150.625, -291.4061, 19.03693), new mp.Vector3(0, 0, 120.0417)],
    [new mp.Vector3(-1158.822, -296.0531, 18.29185), new mp.Vector3(0, 0, 118.2653)],
    [new mp.Vector3(-1167.09, -300.7531, 17.45927), new mp.Vector3(0, 0, 120.3688)],
    [new mp.Vector3(-1174.838, -305.2666, 16.67544), new mp.Vector3(0, 0, 120.2192)],
    [new mp.Vector3(-1183.093, -310.0013, 15.84256), new mp.Vector3(0, 0, 119.4049)],
    [new mp.Vector3(-1191.269, -314.7039, 15.01737), new mp.Vector3(0, 0, 119.7876)],
    [new mp.Vector3(-1199.536, -319.438, 14.26379), new mp.Vector3(0, 0, 119.9203)],
    [new mp.Vector3(-1207.726, -324.1386, 14.13173), new mp.Vector3(0, 0, 119.7892)],
    [new mp.Vector3(-1216.08, -328.5891, 14.1317), new mp.Vector3(0, 0, 113.8842)],
    [new mp.Vector3(-1224.887, -331.6924, 14.13169), new mp.Vector3(0, 0, 100.9691)],
    [new mp.Vector3(-1234.237, -333.2027, 14.13169), new mp.Vector3(0, 0, 97.05128)],
    [new mp.Vector3(-1243.691, -333.4097, 14.13176), new mp.Vector3(0, 0, 90.09638)],
    [new mp.Vector3(-1253.129, -333.3956, 14.13175), new mp.Vector3(0, 0, 89.81422)],
    [new mp.Vector3(-1262.655, -333.4175, 14.13175), new mp.Vector3(0, 0, 90.0422)],
    [new mp.Vector3(-1272.085, -333.442, 14.13175), new mp.Vector3(0, 0, 90.16621)],
    [new mp.Vector3(-1281.527, -333.4389, 14.13176), new mp.Vector3(0, 0, 90.05687)],
    [new mp.Vector3(-1291.027, -333.3389, 14.13173), new mp.Vector3(0, 0, 89.56459)],
    [new mp.Vector3(-1299.992, -333.3885, 14.13173), new mp.Vector3(0, 0, 89.105)],
    [new mp.Vector3(-1309.497, -333.288, 14.13173), new mp.Vector3(0, 0, 89.42009)],
    [new mp.Vector3(-1318.934, -333.2614, 14.13177), new mp.Vector3(0, 0, 90.61295)],
    [new mp.Vector3(-1328.343, -333.6442, 14.13169), new mp.Vector3(0, 0, 93.80553)],
    [new mp.Vector3(-1337.61, -335.4655, 14.13169), new mp.Vector3(0, 0, 104.1069)],
    [new mp.Vector3(-1346.518, -338.2937, 14.13169), new mp.Vector3(0, 0, 110.4346)],
    [new mp.Vector3(-1354.871, -342.6689, 14.13166), new mp.Vector3(0, 0, 120.048)],
    [new mp.Vector3(-1362.55, -348.0273, 14.13166), new mp.Vector3(0, 0, 130.5288)],
    [new mp.Vector3(-1369.256, -354.686, 14.13166), new mp.Vector3(0, 0, 137.9261)],
    [new mp.Vector3(-1374.882, -362.268, 14.13166), new mp.Vector3(0, 0, 145.9534)],
    [new mp.Vector3(-1379.401, -370.474, 14.13164), new mp.Vector3(0, 0, 155.9213)],
    [new mp.Vector3(-1382.275, -378.8837, 14.13163), new mp.Vector3(0, 0, 165.7732)],
    [new mp.Vector3(-1384.347, -388.1474, 14.13163), new mp.Vector3(0, 0, 170.447)],
    [new mp.Vector3(-1384.468, -397.5006, 14.13098), new mp.Vector3(0, 0, -179.8238)],
    [new mp.Vector3(-1384.421, -406.9864, 14.13096), new mp.Vector3(0, 0, 178.3266)],
    [new mp.Vector3(-1383.823, -416.3201, 14.13096), new mp.Vector3(0, 0, -171.5215)],
    [new mp.Vector3(-1381.786, -425.547, 14.13096), new mp.Vector3(0, 0, -161.5271)],
    [new mp.Vector3(-1378.013, -434.1233, 14.1454), new mp.Vector3(0, 0, -153.1521)],
    [new mp.Vector3(-1373.384, -442.4297, 14.14577), new mp.Vector3(0, 0, -150.0477)],
    [new mp.Vector3(-1368.676, -450.6012, 14.14577), new mp.Vector3(0, 0, -149.5721)],
    // Del perro
    [new mp.Vector3(-1363.842, -458.796, 14.14901), new mp.Vector3(0, 0, -149.738)],
    [new mp.Vector3(-1358.942, -466.9426, 14.15477), new mp.Vector3(0, 0, -149.4373)],
    [new mp.Vector3(-1354.492, -474.7289, 14.1602), new mp.Vector3(0, 0, -150.5278)],
    [new mp.Vector3(-1349.597, -483.4398, 14.16634), new mp.Vector3(0, 0, -150.6731)],
    [new mp.Vector3(-1345.182, -491.2356, 14.1718), new mp.Vector3(0, 0, -150.5207)],
    [new mp.Vector3(-1340.441, -499.4941, 14.16262), new mp.Vector3(0, 0, -150.1367)],
    [new mp.Vector3(-1335.657, -507.6261, 14.1458), new mp.Vector3(0, 0, -149.1872)],
    [new mp.Vector3(-1330.566, -515.6199, 14.14485), new mp.Vector3(0, 0, -143.8726)],
    [new mp.Vector3(-1324.894, -523.1362, 14.14993), new mp.Vector3(0, 0, -140.7555)],
    [new mp.Vector3(-1319.059, -530.5927, 14.14636), new mp.Vector3(0, 0, -147.3093)],
    [new mp.Vector3(-1313.872, -538.5199, 14.12983), new mp.Vector3(0, 0, -147.1018)],
    [new mp.Vector3(-1307.901, -545.7301, 14.12787), new mp.Vector3(0, 0, -137.1904)],
    [new mp.Vector3(-1300.626, -551.4566, 14.12889), new mp.Vector3(0, 0, -118.0564)],
    [new mp.Vector3(-1291.921, -555.0471, 14.12945), new mp.Vector3(0, 0, -105.3785)],
    [new mp.Vector3(-1282.659, -555.5283, 14.12945), new mp.Vector3(0, 0, -87.97599)],
    [new mp.Vector3(-1273.625, -555.134, 14.13015), new mp.Vector3(0, 0, -86.56815)],
    [new mp.Vector3(-1264.214, -554.8638, 13.91518), new mp.Vector3(0, 0, -90.04347)],
    [new mp.Vector3(-1254.701, -554.7722, 13.11509), new mp.Vector3(0, 0, -89.1673)],
    [new mp.Vector3(-1245.195, -554.6369, 12.28346), new mp.Vector3(0, 0, -90.12302)],
    [new mp.Vector3(-1235.76, -554.704, 11.45809), new mp.Vector3(0, 0, -89.94997)],
    [new mp.Vector3(-1226.237, -554.7253, 10.62548), new mp.Vector3(0, 0, -90.2253)],
    [new mp.Vector3(-1216.795, -554.7208, 9.799149), new mp.Vector3(0, 0, -89.97022)],
    [new mp.Vector3(-1207.283, -554.6729, 8.966948), new mp.Vector3(0, 0, -89.69917)],
    [new mp.Vector3(-1197.839, -554.6417, 8.140754), new mp.Vector3(0, 0, -89.64211)],
    [new mp.Vector3(-1188.331, -554.6757, 7.308537), new mp.Vector3(0, 0, -90.7631)],
    [new mp.Vector3(-1179.358, -554.7267, 6.524139), new mp.Vector3(0, 0, -90.20534)],
    [new mp.Vector3(-1169.849, -554.7427, 5.69161), new mp.Vector3(0, 0, -90.28397)],
    [new mp.Vector3(-1160.32, -554.816, 4.858096), new mp.Vector3(0, 0, -90.38423)],
    [new mp.Vector3(-1150.885, -554.8723, 4.106091), new mp.Vector3(0, 0, -90.32609)],
    [new mp.Vector3(-1141.444, -555.1278, 3.958226), new mp.Vector3(0, 0, -100.1957)],
    [new mp.Vector3(-1132.302, -557.2997, 3.95823), new mp.Vector3(0, 0, -106.3146)],
    [new mp.Vector3(-1123.442, -560.496, 3.95823), new mp.Vector3(0, 0, -118.1245)],
    [new mp.Vector3(-1115.567, -565.5839, 3.95824), new mp.Vector3(0, 0, -127.5908)],
    [new mp.Vector3(-1108.438, -571.818, 3.958241), new mp.Vector3(0, 0, -133.7894)],
    [new mp.Vector3(-1102.54, -579.1241, 3.958242), new mp.Vector3(0, 0, -148.5557)],
    [new mp.Vector3(-1097.706, -587.3154, 3.958222), new mp.Vector3(0, 0, -149.4201)],
    [new mp.Vector3(-1093.182, -595.0552, 3.958234), new mp.Vector3(0, 0, -149.401)],
    [new mp.Vector3(-1088.326, -603.2299, 3.95823), new mp.Vector3(0, 0, -149.4182)],
    [new mp.Vector3(-1083.447, -611.4129, 3.958217), new mp.Vector3(0, 0, -149.3281)],
    [new mp.Vector3(-1078.737, -619.5849, 3.958211), new mp.Vector3(0, 0, -150.4215)],
    [new mp.Vector3(-1074.062, -627.8736, 3.958224), new mp.Vector3(0, 0, -150.5375)],
    [new mp.Vector3(-1069.627, -636.1599, 3.958211), new mp.Vector3(0, 0, -155.098)],
    [new mp.Vector3(-1065.223, -644.3998, 4.036547), new mp.Vector3(0, 0, -146.0267)],
    [new mp.Vector3(-1060.076, -652.3752, 3.958218), new mp.Vector3(0, 0, -149.861)],
    [new mp.Vector3(-1055.513, -660.6293, 3.958211), new mp.Vector3(0, 0, -151.3124)],
    [new mp.Vector3(-1050.845, -668.91, 3.9582), new mp.Vector3(0, 0, -149.2791)],
    [new mp.Vector3(-1045.976, -676.9948, 3.958206), new mp.Vector3(0, 0, -149.2773)],
    [new mp.Vector3(-1041.327, -684.7545, 3.958204), new mp.Vector3(0, 0, -149.2465)],
    [new mp.Vector3(-1036.183, -692.5898, 3.958203), new mp.Vector3(0, 0, -141.3298)],
    [new mp.Vector3(-1029.869, -699.6346, 3.958203), new mp.Vector3(0, 0, -133.3122)],
    [new mp.Vector3(-1022.58, -705.5163, 3.95815), new mp.Vector3(0, 0, -123.4836)],
    [new mp.Vector3(-1014.358, -710.1782, 3.958189), new mp.Vector3(0, 0, -115.7552)],
    [new mp.Vector3(-1005.535, -713.5513, 3.95819), new mp.Vector3(0, 0, -106.5162)],
    [new mp.Vector3(-996.3437, -715.4453, 3.958135), new mp.Vector3(0, 0, -97.63437)],
    [new mp.Vector3(-986.8799, -716.1099, 3.958101), new mp.Vector3(0, 0, -92.25621)],
    [new mp.Vector3(-977.3879, -716.0943, 3.958071), new mp.Vector3(0, 0, -89.44583)],
    [new mp.Vector3(-967.9404, -716.0181, 3.958049), new mp.Vector3(0, 0, -89.47732)],
    [new mp.Vector3(-958.9034, -715.9473, 3.958062), new mp.Vector3(0, 0, -90.32794)],
    [new mp.Vector3(-949.5592, -716.6576, 3.958301), new mp.Vector3(0, 0, -98.98779)],
    [new mp.Vector3(-940.1414, -717.6091, 3.958309), new mp.Vector3(0, 0, -95.73877)],
    [new mp.Vector3(-930.7415, -718.2036, 3.958269), new mp.Vector3(0, 0, -91.52892)],
    [new mp.Vector3(-921.2318, -718.2675, 4.094321), new mp.Vector3(0, 0, -90.03989)],
    [new mp.Vector3(-911.7925, -718.2112, 4.77575), new mp.Vector3(0, 0, -89.82324)],
    [new mp.Vector3(-902.28, -718.1324, 5.608022), new mp.Vector3(0, 0, -89.54479)],
    [new mp.Vector3(-892.8372, -718.0817, 6.434747), new mp.Vector3(0, 0, -90.30653)],
    [new mp.Vector3(-883.3179, -718.2015, 7.26682), new mp.Vector3(0, 0, -90.45895)],
    [new mp.Vector3(-873.8095, -718.275, 8.099192), new mp.Vector3(0, 0, -90.56622)],
    [new mp.Vector3(-864.3607, -718.313, 8.925637), new mp.Vector3(0, 0, -90.41553)],
    [new mp.Vector3(-855.3195, -718.3424, 9.717274), new mp.Vector3(0, 0, -89.94006)],
    [new mp.Vector3(-845.8756, -718.348, 10.54345), new mp.Vector3(0, 0, -89.89529)],
    [new mp.Vector3(-836.3601, -718.3306, 10.89616), new mp.Vector3(0, 0, -90.15486)],
    [new mp.Vector3(-826.9172, -718.2915, 10.89563), new mp.Vector3(0, 0, -89.80421)],
    [new mp.Vector3(-817.4057, -718.2598, 10.89564), new mp.Vector3(0, 0, -89.8093)],
    [new mp.Vector3(-807.9682, -718.2496, 10.89209), new mp.Vector3(0, 0, -89.61177)],
    [new mp.Vector3(-798.58, -717.3538, 10.89072), new mp.Vector3(0, 0, -78.05035)],
    [new mp.Vector3(-789.5306, -714.7863, 10.89071), new mp.Vector3(0, 0, -71.87851)],
    [new mp.Vector3(-780.9016, -710.9866, 10.89071), new mp.Vector3(0, 0, -64.09441)],
    [new mp.Vector3(-772.3376, -707.0156, 10.89071), new mp.Vector3(0, 0, -70.82958)],
    [new mp.Vector3(-763.3881, -704.1465, 10.89071), new mp.Vector3(0, 0, -76.5043)],
    [new mp.Vector3(-754.469, -703.1053, 10.89058), new mp.Vector3(0, 0, -86.43967)],
    [new mp.Vector3(-745.0729, -702.6566, 10.89562), new mp.Vector3(0, 0, -90.2934)],
    [new mp.Vector3(-735.5622, -702.851, 10.89562), new mp.Vector3(0, 0, -90.8103)],
    [new mp.Vector3(-726.0523, -702.9826, 10.89562), new mp.Vector3(0, 0, -90.38242)],
    [new mp.Vector3(-716.6252, -702.8575, 10.89562), new mp.Vector3(0, 0, -89.60434)],
    [new mp.Vector3(-707.1025, -702.7543, 10.89561), new mp.Vector3(0, 0, -89.39819)],
    [new mp.Vector3(-697.6625, -702.7347, 10.89561), new mp.Vector3(0, 0, -90.30195)],
    [new mp.Vector3(-688.1917, -702.6478, 10.89415), new mp.Vector3(0, 0, -84.65342)],
    [new mp.Vector3(-678.8701, -701.351, 10.89416), new mp.Vector3(0, 0, -78.97823)],
    [new mp.Vector3(-669.9064, -698.6638, 10.89416), new mp.Vector3(0, 0, -69.26347)],
    [new mp.Vector3(-661.3458, -694.5876, 10.89418), new mp.Vector3(0, 0, -62.9847)],
    [new mp.Vector3(-653.0372, -690.0208, 10.89561), new mp.Vector3(0, 0, -57.91848)],
    [new mp.Vector3(-645.3956, -685.3666, 10.89561), new mp.Vector3(0, 0, -60.43591)],
    [new mp.Vector3(-636.9043, -681.2109, 10.89679), new mp.Vector3(0, 0, -68.95175)],
    [new mp.Vector3(-627.8735, -678.6607, 10.89679), new mp.Vector3(0, 0, -77.26613)],
    [new mp.Vector3(-618.5237, -677.5553, 10.89679), new mp.Vector3(0, 0, -90.31715)],
    [new mp.Vector3(-609.0962, -677.5923, 10.89556), new mp.Vector3(0, 0, -89.27808)],
    [new mp.Vector3(-599.5845, -677.4048, 10.89556), new mp.Vector3(0, 0, -88.99365)],
    [new mp.Vector3(-590.1392, -677.2606, 10.89556), new mp.Vector3(0, 0, -89.33919)],
    [new mp.Vector3(-580.6211, -677.2759, 10.8956), new mp.Vector3(0, 0, -90.25158)],
    [new mp.Vector3(-571.1988, -677.3383, 10.90494), new mp.Vector3(0, 0, -91.54605)],
    [new mp.Vector3(-561.786, -678.2989, 10.90844), new mp.Vector3(0, 0, -99.69054)],
    [new mp.Vector3(-552.4155, -679.9192, 10.90844), new mp.Vector3(0, 0, -100.0723)],
    [new mp.Vector3(-543.1008, -680.7727, 10.90875), new mp.Vector3(0, 0, -90.79952)],
    [new mp.Vector3(-534.0517, -680.898, 10.90942), new mp.Vector3(0, 0, -90.79954)],
    //Little Seoul
    [new mp.Vector3(-524.6132, -680.8975, 10.90941), new mp.Vector3(0, 0, -90.04848)],
    [new mp.Vector3(-515.1018, -680.8906, 10.91094), new mp.Vector3(0, 0, -89.9549)],
    [new mp.Vector3(-505.6615, -680.9066, 10.91667), new mp.Vector3(0, 0, -90.01456)],
    [new mp.Vector3(-496.1461, -680.885, 10.9225), new mp.Vector3(0, 0, -89.98277)],
    [new mp.Vector3(-486.6974, -680.8379, 10.92826), new mp.Vector3(0, 0, -89.7918)],
    [new mp.Vector3(-477.1897, -680.7842, 10.93404), new mp.Vector3(0, 0, -89.68704)],
    [new mp.Vector3(-467.7489, -680.7635, 10.9398), new mp.Vector3(0, 0, -89.7981)],
    [new mp.Vector3(-458.2377, -680.7739, 10.90957), new mp.Vector3(0, 0, -89.63765)],
    [new mp.Vector3(-448.806, -680.5314, 10.9086), new mp.Vector3(0, 0, -87.81422)],
    [new mp.Vector3(-439.3968, -679.5392, 10.95619), new mp.Vector3(0, 0, -81.01838)],
    [new mp.Vector3(-430.0926, -678.0187, 10.90849), new mp.Vector3(0, 0, -81.57311)],
    [new mp.Vector3(-421.1244, -677.4548, 10.89955), new mp.Vector3(0, 0, -88.9165)],
    [new mp.Vector3(-411.7138, -677.2823, 10.89562), new mp.Vector3(0, 0, -90.83025)],
    [new mp.Vector3(-402.2792, -677.3794, 10.89561), new mp.Vector3(0, 0, -90.47586)],
    [new mp.Vector3(-392.7541, -677.4641, 10.89561), new mp.Vector3(0, 0, -90.40849)],
    [new mp.Vector3(-383.2428, -677.5066, 10.89561), new mp.Vector3(0, 0, -90.27515)],
    [new mp.Vector3(-373.7351, -677.5949, 10.89374), new mp.Vector3(0, 0, -92.30627)],
    [new mp.Vector3(-364.3885, -678.3973, 10.89371), new mp.Vector3(0, 0, -99.53825)],
    [new mp.Vector3(-355.2156, -680.5196, 10.89371), new mp.Vector3(0, 0, -105.2346)],
    [new mp.Vector3(-346.2455, -683.5796, 10.89559), new mp.Vector3(0, 0, -109.9529)],
    [new mp.Vector3(-337.2962, -686.8253, 11.03187), new mp.Vector3(0, 0, -110.0579)],
    [new mp.Vector3(-328.4142, -690.0071, 11.77674), new mp.Vector3(0, 0, -109.71)],
    [new mp.Vector3(-319.5252, -693.2045, 12.60013), new mp.Vector3(0, 0, -109.8583)],
    [new mp.Vector3(-311.0201, -696.2961, 13.39541), new mp.Vector3(0, 0, -109.8389)],
    [new mp.Vector3(-302.141, -699.4778, 14.22015), new mp.Vector3(0, 0, -109.8593)],
    [new mp.Vector3(-293.1953, -702.7208, 15.05407), new mp.Vector3(0, 0, -110.4921)],
    [new mp.Vector3(-284.3577, -706.0535, 15.69008), new mp.Vector3(0, 0, -110.739)],
    [new mp.Vector3(-275.467, -709.4443, 15.69558), new mp.Vector3(0, 0, -110.8815)],
    [new mp.Vector3(-266.9205, -713.2375, 15.69675), new mp.Vector3(0, 0, -120.4404)],
    [new mp.Vector3(-259.1459, -718.5843, 15.69675), new mp.Vector3(0, 0, -130.8087)],
    [new mp.Vector3(-252.4089, -725.0993, 15.69675), new mp.Vector3(0, 0, -140.287)],
    [new mp.Vector3(-247.0805, -732.9092, 15.69541), new mp.Vector3(0, 0, -149.3425)],
    [new mp.Vector3(-243.227, -741.4292, 15.69541), new mp.Vector3(0, 0, -160.65)],
    [new mp.Vector3(-240.7331, -750.5655, 15.69543), new mp.Vector3(0, 0, -167.8222)],
    [new mp.Vector3(-238.6856, -759.7633, 15.69559), new mp.Vector3(0, 0, -166.2435)],
    [new mp.Vector3(-236.233, -768.8673, 15.69559), new mp.Vector3(0, 0, -164.2414)],
    [new mp.Vector3(-233.8114, -777.5781, 15.69559), new mp.Vector3(0, 0, -165.6372)],
    [new mp.Vector3(-231.6289, -786.7068, 15.69559), new mp.Vector3(0, 0, -162.0961)],
    [new mp.Vector3(-228.021, -795.448, 15.69559), new mp.Vector3(0, 0, -154.2006)],
    [new mp.Vector3(-223.2448, -803.5231, 15.69553), new mp.Vector3(0, 0, -146.1321)],
    [new mp.Vector3(-217.461, -811.0262, 15.97456), new mp.Vector3(0, 0, -139.6072)],
    [new mp.Vector3(-211.3321, -818.2091, 16.79533), new mp.Vector3(0, 0, -139.4547)],
    [new mp.Vector3(-205.0852, -825.3862, 17.6276), new mp.Vector3(0, 0, -138.9089)],
    [new mp.Vector3(-199.027, -832.624, 18.45259), new mp.Vector3(0, 0, -140.2167)],
    [new mp.Vector3(-192.9191, -839.9135, 19.2856), new mp.Vector3(0, 0, -139.9119)],
    [new mp.Vector3(-186.8408, -847.142, 20.11168), new mp.Vector3(0, 0, -140.1498)],
    [new mp.Vector3(-180.9543, -854.4895, 20.64225), new mp.Vector3(0, 0, -142.8268)],
    [new mp.Vector3(-175.8398, -862.4633, 20.63964), new mp.Vector3(0, 0, -151.3431)],
    [new mp.Vector3(-172.0427, -871.032, 20.63964), new mp.Vector3(0, 0, -159.6702)],
    [new mp.Vector3(-169.9037, -879.7161, 20.63766), new mp.Vector3(0, 0, -171.3659)],
    [new mp.Vector3(-169.4607, -889.0302, 20.64213), new mp.Vector3(0, 0, 177.0176)],
    [new mp.Vector3(-170.1779, -898.4927, 20.77449), new mp.Vector3(0, 0, 170.7601)],
    [new mp.Vector3(-172.7298, -907.5176, 21.02904), new mp.Vector3(0, 0, 161.7791)],
    [new mp.Vector3(-177.5495, -920.6655, 22.19144), new mp.Vector3(0, 0, 160.1169)],
    [new mp.Vector3(-182.3595, -934.0551, 23.40479), new mp.Vector3(0, 0, 160.2928)],
    [new mp.Vector3(-187.1206, -947.3377, 24.88174), new mp.Vector3(0, 0, 160.0777)],
    [new mp.Vector3(-191.9238, -960.7243, 26.47159), new mp.Vector3(0, 0, 159.6368)],
    [new mp.Vector3(-197.0132, -973.9905, 27.86026), new mp.Vector3(0, 0, 160.1836)],
    [new mp.Vector3(-201.8213, -987.2365, 28.77712), new mp.Vector3(0, 0, 159.0524)],
    [new mp.Vector3(-206.3887, -999.9381, 29.14869), new mp.Vector3(0, 0, 160.1335)],
    //Pillbox South
    [new mp.Vector3(-211.2198, -1013.188, 29.32845), new mp.Vector3(0, 0, 160.1121)],
    [new mp.Vector3(-216.063, -1026.564, 29.32545), new mp.Vector3(0, 0, 159.5657)],
    [new mp.Vector3(-220.9578, -1039.787, 29.32622), new mp.Vector3(0, 0, 160.7968)],
    [new mp.Vector3(-225.7278, -1053.186, 29.32562), new mp.Vector3(0, 0, 159.9864)],
    [new mp.Vector3(-230.5677, -1066.464, 29.1359), new mp.Vector3(0, 0, 159.9681)],
    [new mp.Vector3(-235.4343, -1079.813, 29.14399), new mp.Vector3(0, 0, 159.9681)],
    [new mp.Vector3(-240.2688, -1093.073, 29.1442), new mp.Vector3(0, 0, 159.9681)],
    [new mp.Vector3(-245.1417, -1106.439, 29.14397), new mp.Vector3(0, 0, 159.9681)],
    [new mp.Vector3(-249.9175, -1119.715, 29.14397), new mp.Vector3(0, 0, 161.5195)],
    [new mp.Vector3(-253.1216, -1133.474, 29.14401), new mp.Vector3(0, 0, 171.7447)],
    [new mp.Vector3(-254.3711, -1147.485, 29.14194), new mp.Vector3(0, 0, 176.5422)],
    [new mp.Vector3(-255.3045, -1161.677, 29.14194), new mp.Vector3(0, 0, 176.3016)],
    [new mp.Vector3(-256.0488, -1175.761, 29.14194), new mp.Vector3(0, 0, 177.067)],
    [new mp.Vector3(-256.7408, -1189.267, 29.14193), new mp.Vector3(0, 0, 177.0675)],
    [new mp.Vector3(-257.2081, -1203.325, 29.14134), new mp.Vector3(0, 0, -177.5374)],
    [new mp.Vector3(-256.681, -1217.53, 29.08577), new mp.Vector3(0, 0, -178.7667)],
    [new mp.Vector3(-256.5288, -1231.633, 29.14269), new mp.Vector3(0, 0, 179.8627)],
    [new mp.Vector3(-256.6959, -1245.852, 29.1428), new mp.Vector3(0, 0, 179.4144)],
    [new mp.Vector3(-256.6654, -1259.957, 29.66311), new mp.Vector3(0, 0, -179.7264)],
    [new mp.Vector3(-256.6129, -1274.183, 30.42923), new mp.Vector3(0, 0, 179.9909)],
    [new mp.Vector3(-256.6466, -1288.295, 31.07079), new mp.Vector3(0, 0, 179.7832)],
    [new mp.Vector3(-256.7034, -1302.535, 31.29963), new mp.Vector3(0, 0, 179.7695)],
    [new mp.Vector3(-256.7601, -1316.635, 31.29371), new mp.Vector3(0, 0, 179.7695)],
    [new mp.Vector3(-256.8127, -1330.863, 31.29553), new mp.Vector3(0, 0, -179.9332)],
    [new mp.Vector3(-256.6938, -1344.967, 31.3084), new mp.Vector3(0, 0, -179.1755)],
    [new mp.Vector3(-256.4965, -1358.494, 31.2983), new mp.Vector3(0, 0, -179.1592)],
    [new mp.Vector3(-256.2951, -1372.749, 31.29508), new mp.Vector3(0, 0, -179.2092)],
    [new mp.Vector3(-256.0764, -1386.819, 31.3029), new mp.Vector3(0, 0, -178.1395)],
    [new mp.Vector3(-254.2047, -1400.707, 31.28852), new mp.Vector3(0, 0, -166.9645)],
    [new mp.Vector3(-249.8184, -1414.148, 31.11483), new mp.Vector3(0, 0, -157.1583)],
    [new mp.Vector3(-242.7195, -1426.322, 31.34599), new mp.Vector3(0, 0, -142.8945)],
    [new mp.Vector3(-233.2394, -1436.661, 31.35728), new mp.Vector3(0, 0, -133.1801)],
    [new mp.Vector3(-222.601, -1446.064, 31.39567), new mp.Vector3(0, 0, -129.3764)],
    [new mp.Vector3(-211.6413, -1454.97, 31.43007), new mp.Vector3(0, 0, -129.363)],
    [new mp.Vector3(-200.6872, -1464.022, 31.54594), new mp.Vector3(0, 0, -130.028)],
    [new mp.Vector3(-189.9149, -1473.133, 31.69718), new mp.Vector3(0, 0, -130.478)],
    [new mp.Vector3(-179.6203, -1481.894, 32.13298), new mp.Vector3(0, 0, -129.8732)],
    [new mp.Vector3(-168.7388, -1490.967, 32.7401), new mp.Vector3(0, 0, -129.8097)],
    [new mp.Vector3(-157.8422, -1500.043, 33.35679), new mp.Vector3(0, 0, -129.8231)],
    [new mp.Vector3(-147.0002, -1509.093, 33.9586), new mp.Vector3(0, 0, -129.8614)],
    [new mp.Vector3(-136.097, -1518.224, 34.22427), new mp.Vector3(0, 0, -130.4071)],
    [new mp.Vector3(-125.2535, -1527.467, 34.0839), new mp.Vector3(0, 0, -130.4529)],
    [new mp.Vector3(-114.494, -1536.529, 33.94688), new mp.Vector3(0, 0, -129.7602)],
    [new mp.Vector3(-103.5484, -1545.628, 33.72323), new mp.Vector3(0, 0, -129.5349)],
    [new mp.Vector3(-92.62689, -1554.722, 32.92274), new mp.Vector3(0, 0, -130.6555)],
    [new mp.Vector3(-81.83263, -1563.99, 31.88255), new mp.Vector3(0, 0, -130.5451)],
    [new mp.Vector3(-71.54459, -1572.616, 30.84827), new mp.Vector3(0, 0, -129.7581)],
    [new mp.Vector3(-60.55745, -1581.604, 29.94954), new mp.Vector3(0, 0, -128.9986)],
    [new mp.Vector3(-49.74719, -1590.66, 29.31282), new mp.Vector3(0, 0, -130.1941)],
    [new mp.Vector3(-38.87992, -1599.843, 29.2731), new mp.Vector3(0, 0, -130.2021)],
    [new mp.Vector3(-28.0112, -1609.029, 29.29638), new mp.Vector3(0, 0, -130.2021)],
    [new mp.Vector3(-17.14248, -1618.206, 29.25117), new mp.Vector3(0, 0, -130.0241)],
    [new mp.Vector3(-6.239979, -1627.349, 29.29066), new mp.Vector3(0, 0, -129.9692)],
    [new mp.Vector3(4.576273, -1636.414, 29.2986), new mp.Vector3(0, 0, -129.9687)],
    [new mp.Vector3(15.48595, -1645.543, 29.29881), new mp.Vector3(0, 0, -129.6518)],
    [new mp.Vector3(25.80998, -1654.091, 29.2988), new mp.Vector3(0, 0, -129.6157)],
    [new mp.Vector3(36.77, -1663.163, 29.29874), new mp.Vector3(0, 0, -129.6143)],
    [new mp.Vector3(47.64994, -1672.171, 29.29873), new mp.Vector3(0, 0, -129.78)],
    [new mp.Vector3(58.54834, -1681.375, 29.29873), new mp.Vector3(0, 0, -130.5867)],
    [new mp.Vector3(69.11284, -1690.641, 29.28726), new mp.Vector3(0, 0, -132.2673)],
    [new mp.Vector3(79.38032, -1700.301, 29.06052), new mp.Vector3(0, 0, -133.6142)],
    [new mp.Vector3(89.7739, -1709.997, 29.05374), new mp.Vector3(0, 0, -131.6135)],
    //Davis
    [new mp.Vector3(100.6146, -1719.187, 29.05482), new mp.Vector3(0, 0, -129.2846)],
    [new mp.Vector3(110.8762, -1727.581, 29.05647), new mp.Vector3(0, 0, -129.3646)],
    [new mp.Vector3(110.8762, -1727.581, 29.05647), new mp.Vector3(0, 0, -129.3646)],
    [new mp.Vector3(110.8762, -1727.581, 29.05647), new mp.Vector3(0, 0, -129.3646)]
];
var posicion_camarasMetro_1 = [
    //Davis
    [new mp.Vector3(117.9638, -1722.525, 29.12751), new mp.Vector3(0, 0, 46.77953)],
    [new mp.Vector3(116.3617, -1721.002, 29.12909), new mp.Vector3(0, 0, 46.41307)],
    [new mp.Vector3(106.4239, -1712.746, 29.13036), new mp.Vector3(0, 0, 48.83334)],
    [new mp.Vector3(95.59452, -1703.729, 29.1277), new mp.Vector3(0, 0, 52.09211)],
    [new mp.Vector3(84.22796, -1695.159, 29.12222), new mp.Vector3(0, 0, 53.84936)],
    [new mp.Vector3(72.87294, -1686.855, 29.3179), new mp.Vector3(0, 0, 52.98097)],
    [new mp.Vector3(62.20241, -1677.576, 29.29872), new mp.Vector3(0, 0, 48.48391)],
    [new mp.Vector3(51.36336, -1668.541, 29.29872), new mp.Vector3(0, 0, 50.50089)],
    [new mp.Vector3(40.39934, -1659.52, 29.29811), new mp.Vector3(0, 0, 49.65564)],
    [new mp.Vector3(29.66882, -1650.358, 29.29875), new mp.Vector3(0, 0, 49.59121)],
    [new mp.Vector3(18.79147, -1641.224, 29.29876), new mp.Vector3(0, 0, 49.97332)],
    [new mp.Vector3(8.513301, -1632.562, 29.29876), new mp.Vector3(0, 0, 49.86174)],
    [new mp.Vector3(-2.337214, -1623.425, 29.29062), new mp.Vector3(0, 0, 50.36359)],
    [new mp.Vector3(-13.15603, -1614.394, 29.25162), new mp.Vector3(0, 0, 49.99874)],
    [new mp.Vector3(-24.05543, -1605.246, 29.28873), new mp.Vector3(0, 0, 49.99105)],
    [new mp.Vector3(-34.91437, -1596.131, 29.27473), new mp.Vector3(0, 0, 50.00797)],
    [new mp.Vector3(-45.80043, -1587.135, 29.29939), new mp.Vector3(0, 0, 50.27088)],
    [new mp.Vector3(-56.6599, -1578.004, 29.89661), new mp.Vector3(0, 0, 49.88149)],
    [new mp.Vector3(-67.4883, -1568.832, 30.79876), new mp.Vector3(0, 0, 49.48925)],
    [new mp.Vector3(-78.28786, -1559.637, 31.88056), new mp.Vector3(0, 0, 49.76065)],
    [new mp.Vector3(-89.19437, -1550.57, 32.92279), new mp.Vector3(0, 0, 50.9876)],
    [new mp.Vector3(-100.1112, -1541.691, 33.70922), new mp.Vector3(0, 0, 50.4255)],
    [new mp.Vector3(-110.407, -1532.978, 33.87514), new mp.Vector3(0, 0, 49.78027)],
    [new mp.Vector3(-121.8267, -1523.349, 34.02506), new mp.Vector3(0, 0, 49.93119)],
    [new mp.Vector3(-131.9972, -1514.785, 34.15705), new mp.Vector3(0, 0, 50.03002)],
    [new mp.Vector3(-142.8221, -1505.59, 33.99937), new mp.Vector3(0, 0, 49.39091)],
    [new mp.Vector3(-153.6534, -1496.498, 33.39486), new mp.Vector3(0, 0, 50.05444)],
    [new mp.Vector3(-164.5773, -1487.35, 32.7831), new mp.Vector3(0, 0, 50.05583)],
    [new mp.Vector3(-175.4395, -1478.254, 32.17009), new mp.Vector3(0, 0, 50.05624)],
    [new mp.Vector3(-186.3123, -1469.106, 31.70542), new mp.Vector3(0, 0, 49.55712)],
    [new mp.Vector3(-197.1012, -1459.973, 31.5447), new mp.Vector3(0, 0, 50.3739)],
    [new mp.Vector3(-208.0383, -1450.841, 31.44061), new mp.Vector3(0, 0, 50.09547)],
    [new mp.Vector3(-218.9188, -1441.838, 31.39684), new mp.Vector3(0, 0, 50.61711)],
    [new mp.Vector3(-229.7672, -1432.703, 31.35784), new mp.Vector3(0, 0, 47.65499)],
    [new mp.Vector3(-238.714, -1422.746, 31.32467), new mp.Vector3(0, 0, 35.05406)],
    [new mp.Vector3(-245.7958, -1410.463, 31.11654), new mp.Vector3(0, 0, 23.05686)],
    [new mp.Vector3(-249.5661, -1396.983, 31.27812), new mp.Vector3(0, 0, 8.786867)],
    [new mp.Vector3(-250.7449, -1382.897, 31.29481), new mp.Vector3(0, 0, 3.273589)],
    [new mp.Vector3(-251.0131, -1368.779, 31.29898), new mp.Vector3(0, 0, -0.4540572)],
    [new mp.Vector3(-251.3005, -1354.586, 31.30383), new mp.Vector3(0, 0, 1.721479)],
    [new mp.Vector3(-251.2607, -1340.427, 31.30613), new mp.Vector3(0, 0, -0.3581386)],
    [new mp.Vector3(-251.3227, -1326.252, 31.29606), new mp.Vector3(0, 0, 0.530448)],
    [new mp.Vector3(-251.269, -1312.122, 31.29478), new mp.Vector3(0, 0, -0.195556)],
    [new mp.Vector3(-251.3527, -1297.9, 31.27987), new mp.Vector3(0, 0, -0.04679285)],
    [new mp.Vector3(-251.3309, -1284.421, 30.92284), new mp.Vector3(0, 0, -0.1219356)],
    [new mp.Vector3(-251.4214, -1270.221, 30.22445), new mp.Vector3(0, 0, 0.0178425)],
    [new mp.Vector3(-251.2543, -1256.052, 29.46056), new mp.Vector3(0, 0, 0.05648554)],
    [new mp.Vector3(-251.3583, -1241.936, 29.14223), new mp.Vector3(0, 0, 0.1387138)],
    [new mp.Vector3(-251.442, -1227.698, 29.14364), new mp.Vector3(0, 0, 0.3972112)],
    [new mp.Vector3(-251.8683, -1213.535, 29.10669), new mp.Vector3(0, 0, 2.948822)],
    [new mp.Vector3(-252.4944, -1199.356, 29.1433), new mp.Vector3(0, 0, 2.276992)],
    [new mp.Vector3(-252.1232, -1185.371, 29.14399), new mp.Vector3(0, 0, -4.67271)],
    [new mp.Vector3(-251.1195, -1171.212, 29.14399), new mp.Vector3(0, 0, -3.776959)],
    [new mp.Vector3(-250.1924, -1157.711, 29.14399), new mp.Vector3(0, 0, -3.639398)],
    [new mp.Vector3(-249.4376, -1143.591, 29.14399), new mp.Vector3(0, 0, -3.344507)],
    [new mp.Vector3(-248.0734, -1129.552, 29.1447), new mp.Vector3(0, 0, -11.3734)],
    [new mp.Vector3(-243.5772, -1116.165, 29.14473), new mp.Vector3(0, 0, -20.47704)],
    [new mp.Vector3(-238.7496, -1102.778, 29.14473), new mp.Vector3(0, 0, -19.86438)],
    [new mp.Vector3(-233.0235, -1089.932, 29.14507), new mp.Vector3(0, 0, -30.24194)],
    [new mp.Vector3(-225.7935, -1077.756, 29.14507), new mp.Vector3(0, 0, -26.70986)],
    [new mp.Vector3(-219.7176, -1065.013, 29.25163), new mp.Vector3(0, 0, -22.23252)],
    // Pillbox South
    [new mp.Vector3(-215.3009, -1052.222, 29.32412), new mp.Vector3(0, 0, -20.11811)],
    [new mp.Vector3(-210.2788, -1038.999, 29.32211), new mp.Vector3(0, 0, -18.40737)],
    [new mp.Vector3(-205.5482, -1025.761, 29.32469), new mp.Vector3(0, 0, -20.35369)],
    [new mp.Vector3(-200.7689, -1012.378, 29.32677), new mp.Vector3(0, 0, -18.8193)],
    [new mp.Vector3(-196.9653, -998.7318, 29.10867), new mp.Vector3(0, 0, -11.97204)],
    [new mp.Vector3(-194.5119, -984.7401, 28.51571), new mp.Vector3(0, 0, -10.5577)],
    [new mp.Vector3(-191.0579, -971.0572, 27.44797), new mp.Vector3(0, 0, -18.20966)],
    [new mp.Vector3(-186.3429, -957.6775, 25.95717), new mp.Vector3(0, 0, -20.10902)],
    [new mp.Vector3(-181.4132, -944.3737, 24.37264), new mp.Vector3(0, 0, -20.3583)],
    [new mp.Vector3(-176.7206, -931.7278, 23.03023), new mp.Vector3(0, 0, -20.35844)],
    [new mp.Vector3(-172.0167, -918.4126, 21.86068), new mp.Vector3(0, 0, -18.76352)],
    [new mp.Vector3(-167.4034, -905.4043, 20.91918), new mp.Vector3(0, 0, -15.33392)],
    [new mp.Vector3(-165.4572, -896.1799, 20.7191), new mp.Vector3(0, 0, -11.32738)],
    [new mp.Vector3(-165.0521, -886.8243, 20.63488), new mp.Vector3(0, 0, 2.103271)],
    [new mp.Vector3(-165.9285, -877.4279, 20.64015), new mp.Vector3(0, 0, 12.42002)],
    [new mp.Vector3(-168.379, -868.3584, 20.63964), new mp.Vector3(0, 0, 18.55176)],
    [new mp.Vector3(-172.219, -859.7986, 20.63964), new mp.Vector3(0, 0, 28.97681)],
    [new mp.Vector3(-177.5592, -851.9579, 20.63964), new mp.Vector3(0, 0, 36.91394)],
    [new mp.Vector3(-183.4159, -844.5389, 20.13441), new mp.Vector3(0, 0, 39.81921)],
    [new mp.Vector3(-189.1955, -837.6258, 19.3451), new mp.Vector3(0, 0, 39.49639)],
    [new mp.Vector3(-195.365, -830.4023, 18.51403), new mp.Vector3(0, 0, 40.55857)],
    [new mp.Vector3(-201.4726, -823.1879, 17.68721), new mp.Vector3(0, 0, 40.25651)],
    [new mp.Vector3(-207.5188, -815.8395, 16.85444), new mp.Vector3(0, 0, 39.90482)],
    [new mp.Vector3(-213.6027, -808.519, 16.02165), new mp.Vector3(0, 0, 39.5815)],
    [new mp.Vector3(-219.5424, -801.1384, 15.69539), new mp.Vector3(0, 0, 35.44327)],
    [new mp.Vector3(-224.5207, -793.0865, 15.69558), new mp.Vector3(0, 0, 27.79262)],
    [new mp.Vector3(-227.7512, -784.2852, 15.69558), new mp.Vector3(0, 0, 17.20826)],
    [new mp.Vector3(-229.6535, -775.1221, 15.69558), new mp.Vector3(0, 0, 5.290379)],
    [new mp.Vector3(-230.4617, -766.1425, 15.69559), new mp.Vector3(0, 0, 4.226577)],
    [new mp.Vector3(-231.2052, -756.682, 15.69559), new mp.Vector3(0, 0, 5.228274)],
    [new mp.Vector3(-232.4875, -747.3289, 15.69465), new mp.Vector3(0, 0, 12.49171)],
    [new mp.Vector3(-235.0627, -737.9828, 15.69411), new mp.Vector3(0, 0, 19.14182)],
    [new mp.Vector3(-239.0761, -729.7924, 15.69409), new mp.Vector3(0, 0, 28.05497)],
    [new mp.Vector3(-243.9721, -722.0372, 15.69409), new mp.Vector3(0, 0, 35.8274)],
    [new mp.Vector3(-250.3466, -714.9465, 15.69676), new mp.Vector3(0, 0, 47.03437)],
    [new mp.Vector3(-257.7592, -708.7567, 15.69676), new mp.Vector3(0, 0, 55.88129)],
    [new mp.Vector3(-265.538, -704.1345, 15.69676), new mp.Vector3(0, 0, 63.40266)],
    [new mp.Vector3(-274.4114, -700.3768, 15.69566), new mp.Vector3(0, 0, 70.68597)],
    [new mp.Vector3(-282.9158, -697.2697, 15.61989), new mp.Vector3(0, 0, 69.90165)],
    [new mp.Vector3(-291.8918, -694.0242, 14.9049), new mp.Vector3(0, 0, 70.19225)],
    [new mp.Vector3(-300.8055, -690.8545, 14.07489), new mp.Vector3(0, 0, 70.47868)],
    [new mp.Vector3(-309.7643, -687.6587, 13.24426), new mp.Vector3(0, 0, 69.1987)],
    [new mp.Vector3(-318.6718, -684.2503, 12.40723), new mp.Vector3(0, 0, 70.00775)],
    [new mp.Vector3(-327.3415, -681.0988, 11.60088), new mp.Vector3(0, 0, 70.51738)],
    [new mp.Vector3(-336.4143, -677.8853, 10.93958), new mp.Vector3(0, 0, 69.65585)],
    [new mp.Vector3(-345.043, -674.6963, 10.89562), new mp.Vector3(0, 0, 69.32137)],
    [new mp.Vector3(-354.1691, -671.6944, 10.89746), new mp.Vector3(0, 0, 75.0682)],
    [new mp.Vector3(-363.6398, -669.8229, 10.89746), new mp.Vector3(0, 0, 79.35203)],
    [new mp.Vector3(-372.5604, -668.6922, 10.89746), new mp.Vector3(0, 0, 86.36725)],
    [new mp.Vector3(-382.1739, -668.4656, 10.89565), new mp.Vector3(0, 0, 88.79948)],
    [new mp.Vector3(-391.6347, -668.5552, 10.89561), new mp.Vector3(0, 0, 94.71562)],
    [new mp.Vector3(-400.6736, -668.7018, 10.89561), new mp.Vector3(0, 0, 89.88108)],
    [new mp.Vector3(-410.273, -668.6347, 10.89561), new mp.Vector3(0, 0, 89.38831)],
    [new mp.Vector3(-419.9505, -668.6979, 10.89563), new mp.Vector3(0, 0, 90.00144)],
    [new mp.Vector3(-428.99, -668.5165, 10.90847), new mp.Vector3(0, 0, 83.87736)],
    [new mp.Vector3(-438.395, -666.8158, 10.90847), new mp.Vector3(0, 0, 80.41223)],
    [new mp.Vector3(-447.7869, -665.6981, 10.96629), new mp.Vector3(0, 0, 84.5684)],
    [new mp.Vector3(-457.1564, -665.36, 10.90964), new mp.Vector3(0, 0, 89.58872)],
    [new mp.Vector3(-466.77, -665.3793, 10.93427), new mp.Vector3(0, 0, 91.20613)],
    [new mp.Vector3(-476.2155, -665.4258, 10.93464), new mp.Vector3(0, 0, 90.12228)],
    [new mp.Vector3(-485.7566, -665.432, 10.92881), new mp.Vector3(0, 0, 89.02924)],
    // Little Seoul
    [new mp.Vector3(-494.7273, -665.444, 10.92334), new mp.Vector3(0, 0, 90.85212)],
    [new mp.Vector3(-504.1428, -665.5048, 10.91764), new mp.Vector3(0, 0, 88.95096)],
    [new mp.Vector3(-513.7172, -665.3088, 10.91183), new mp.Vector3(0, 0, 90.94666)],
    [new mp.Vector3(-523.3316, -665.452, 10.90941), new mp.Vector3(0, 0, 90.32169)],
    [new mp.Vector3(-532.4919, -665.509, 10.90941), new mp.Vector3(0, 0, 90.1023)],
    [new mp.Vector3(-542.2051, -665.6008, 10.9092), new mp.Vector3(0, 0, 91.72742)],
    [new mp.Vector3(-551.2106, -666.137, 10.90845), new mp.Vector3(0, 0, 96.4319)],
    [new mp.Vector3(-560.8574, -667.5948, 10.9088), new mp.Vector3(0, 0, 99.6881)],
    [new mp.Vector3(-570.2154, -668.8445, 10.91236), new mp.Vector3(0, 0, 90.40228)],
    [new mp.Vector3(-579.4422, -668.6738, 10.89561), new mp.Vector3(0, 0, 89.54281)],
    [new mp.Vector3(-588.9871, -668.7581, 10.89556), new mp.Vector3(0, 0, 90.77944)],
    [new mp.Vector3(-598.2775, -668.7246, 10.89556), new mp.Vector3(0, 0, 89.33656)],
    [new mp.Vector3(-607.7596, -668.7205, 10.89556), new mp.Vector3(0, 0, 90.23896)],
    [new mp.Vector3(-617.0472, -668.7547, 10.89561), new mp.Vector3(0, 0, 90.21986)],
    [new mp.Vector3(-626.5394, -669.5816, 10.8968), new mp.Vector3(0, 0, 99.77225)],
    [new mp.Vector3(-635.5052, -671.4633, 10.8968), new mp.Vector3(0, 0, 107.1849)],
    [new mp.Vector3(-644.3831, -674.8147, 10.8968), new mp.Vector3(0, 0, 114.8055)],
    [new mp.Vector3(-652.3713, -679.3012, 10.89563), new mp.Vector3(0, 0, 119.4192)],
    [new mp.Vector3(-660.7924, -684.0898, 10.89561), new mp.Vector3(0, 0, 120.0909)],
    [new mp.Vector3(-668.8277, -688.5781, 10.89547), new mp.Vector3(0, 0, 117.2823)],
    [new mp.Vector3(-677.6419, -691.9631, 10.89547), new mp.Vector3(0, 0, 105.3193)],
    [new mp.Vector3(-687.0933, -693.8851, 10.89547), new mp.Vector3(0, 0, 92.89615)],
    [new mp.Vector3(-696.0914, -694.0918, 10.89561), new mp.Vector3(0, 0, 91.35421)],
    [new mp.Vector3(-705.8311, -694.2322, 10.89561), new mp.Vector3(0, 0, 90.13413)],
    [new mp.Vector3(-715.0182, -694.0923, 10.89561), new mp.Vector3(0, 0, 88.78239)],
    [new mp.Vector3(-724.7426, -694.0681, 10.89562), new mp.Vector3(0, 0, 90.17699)],
    [new mp.Vector3(-734.1456, -694.0806, 10.89562), new mp.Vector3(0, 0, 89.85435)],
    [new mp.Vector3(-743.3653, -694.072, 10.89563), new mp.Vector3(0, 0, 90.51967)],
    [new mp.Vector3(-752.7953, -694.0598, 10.89482), new mp.Vector3(0, 0, 90.90502)],
    [new mp.Vector3(-762.2411, -694.9279, 10.89072), new mp.Vector3(0, 0, 98.22636)],
    [new mp.Vector3(-771.3652, -697.1863, 10.89072), new mp.Vector3(0, 0, 110.2524)],
    [new mp.Vector3(-780.0717, -700.732, 10.89072), new mp.Vector3(0, 0, 117.6506)],
    [new mp.Vector3(-788.6232, -705.0725, 10.89071), new mp.Vector3(0, 0, 114.868)],
    [new mp.Vector3(-797.1752, -707.8219, 10.89071), new mp.Vector3(0, 0, 104.0312)],
    [new mp.Vector3(-806.3671, -709.5165, 10.89058), new mp.Vector3(0, 0, 90.22295)],
    [new mp.Vector3(-815.8605, -709.3968, 10.89563), new mp.Vector3(0, 0, 90.68809)],
    [new mp.Vector3(-825.4001, -709.3902, 10.89564), new mp.Vector3(0, 0, 90.19164)],
    [new mp.Vector3(-834.8253, -709.4084, 10.89564), new mp.Vector3(0, 0, 89.50401)],
    [new mp.Vector3(-844.2874, -709.4101, 10.68528), new mp.Vector3(0, 0, 90.67584)],
    [new mp.Vector3(-853.7376, -709.4866, 9.859568), new mp.Vector3(0, 0, 90.74185)],
    [new mp.Vector3(-863.251, -709.4266, 9.026456), new mp.Vector3(0, 0, 90.18696)],
    [new mp.Vector3(-872.3128, -709.4641, 8.233639), new mp.Vector3(0, 0, 89.46136)],
    [new mp.Vector3(-881.8448, -709.4324, 7.399284), new mp.Vector3(0, 0, 90.34499)],
    [new mp.Vector3(-891.3168, -709.4258, 6.570696), new mp.Vector3(0, 0, 90.11356)],
    [new mp.Vector3(-900.7343, -709.4459, 5.746716), new mp.Vector3(0, 0, 90.44926)],
    [new mp.Vector3(-910.3294, -709.4458, 4.90807), new mp.Vector3(0, 0, 89.3669)],
    [new mp.Vector3(-919.8547, -709.4615, 4.116306), new mp.Vector3(0, 0, 89.78194)],
    [new mp.Vector3(-928.9273, -709.459, 3.958733), new mp.Vector3(0, 0, 90.74156)],
    [new mp.Vector3(-938.4174, -709.7631, 3.958305), new mp.Vector3(0, 0, 94.30856)],
    [new mp.Vector3(-947.7814, -710.7452, 3.958302), new mp.Vector3(0, 0, 95.30436)],
    [new mp.Vector3(-957.155, -711.5938, 3.958307), new mp.Vector3(0, 0, 91.31201)],
    [new mp.Vector3(-966.6572, -711.6841, 3.95805), new mp.Vector3(0, 0, 90.14613)],
    [new mp.Vector3(-976.1934, -711.6213, 3.958078), new mp.Vector3(0, 0, 91.23426)],
    [new mp.Vector3(-985.6454, -711.6506, 3.958102), new mp.Vector3(0, 0, 88.5955)],
    [new mp.Vector3(-995.1259, -711.2073, 3.95819), new mp.Vector3(0, 0, 81.96631)],
    [new mp.Vector3(-1003.84, -709.5498, 3.958191), new mp.Vector3(0, 0, 74.92963)],
    [new mp.Vector3(-1012.689, -706.1683, 3.958191), new mp.Vector3(0, 0, 66.06389)],
    [new mp.Vector3(-1020.87, -701.324, 3.958203), new mp.Vector3(0, 0, 54.39422)],
    [new mp.Vector3(-1028.177, -695.4031, 3.958202), new mp.Vector3(0, 0, 46.26389)],
    [new mp.Vector3(-1034.067, -688.0579, 3.958202), new mp.Vector3(0, 0, 32.89462)],
    [new mp.Vector3(-1039.081, -680.0934, 3.958204), new mp.Vector3(0, 0, 31.17972)],
    [new mp.Vector3(-1043.572, -672.2305, 3.958204), new mp.Vector3(0, 0, 29.07508)],
    [new mp.Vector3(-1048.272, -663.9766, 3.958203), new mp.Vector3(0, 0, 29.63691)],
    [new mp.Vector3(-1053.092, -655.7625, 3.958209), new mp.Vector3(0, 0, 30.54725)],
    [new mp.Vector3(-1057.856, -647.6163, 3.958213), new mp.Vector3(0, 0, 29.83568)],
    [new mp.Vector3(-1062.489, -639.3068, 3.958209), new mp.Vector3(0, 0, 29.49944)],
    [new mp.Vector3(-1067.311, -631.0865, 3.958215), new mp.Vector3(0, 0, 30.19482)],
    [new mp.Vector3(-1072.132, -622.8713, 3.958222), new mp.Vector3(0, 0, 30.34916)],
    [new mp.Vector3(-1076.638, -615.0199, 3.958214), new mp.Vector3(0, 0, 29.76284)],
    [new mp.Vector3(-1081.325, -606.7619, 3.958218), new mp.Vector3(0, 0, 29.33792)],
    [new mp.Vector3(-1086.08, -598.4558, 3.958226), new mp.Vector3(0, 0, 29.62923)],
    [new mp.Vector3(-1090.825, -590.2819, 3.958228), new mp.Vector3(0, 0, 30.10079)],
    [new mp.Vector3(-1095.6, -582.0377, 3.958224), new mp.Vector3(0, 0, 30.25904)],
    [new mp.Vector3(-1100.751, -574.2482, 3.95824), new mp.Vector3(0, 0, 38.83213)],
    [new mp.Vector3(-1107.038, -567.0273, 3.958241), new mp.Vector3(0, 0, 44.56015)],
    [new mp.Vector3(-1114.038, -561.4039, 3.958188), new mp.Vector3(0, 0, 52.2999)],
    [new mp.Vector3(-1122.105, -556.3632, 3.95823), new mp.Vector3(0, 0, 62.78542)],
    [new mp.Vector3(-1130.921, -552.9633, 3.958231), new mp.Vector3(0, 0, 74.38779)],
    [new mp.Vector3(-1140.159, -550.8165, 3.95819), new mp.Vector3(0, 0, 81.73733)],
    [new mp.Vector3(-1149.528, -550.3445, 4.014689), new mp.Vector3(0, 0, 89.65672)],
    [new mp.Vector3(-1158.601, -550.3101, 4.703911), new mp.Vector3(0, 0, 89.89009)],
    [new mp.Vector3(-1168.105, -550.2941, 5.535758), new mp.Vector3(0, 0, 89.89957)],
    [new mp.Vector3(-1177.549, -550.3041, 6.361998), new mp.Vector3(0, 0, 89.98944)],
    [new mp.Vector3(-1187.146, -550.3279, 7.201415), new mp.Vector3(0, 0, 89.42461)],
    [new mp.Vector3(-1196.678, -550.3149, 8.035515), new mp.Vector3(0, 0, 89.96612)],
    [new mp.Vector3(-1206.145, -550.3383, 8.86315), new mp.Vector3(0, 0, 90.03211)],
    [new mp.Vector3(-1215.592, -550.2798, 9.69049), new mp.Vector3(0, 0, 89.42609)],
    [new mp.Vector3(-1224.696, -550.2828, 10.48643), new mp.Vector3(0, 0, 89.93913)],
    [new mp.Vector3(-1234.232, -550.2828, 11.32153), new mp.Vector3(0, 0, 90.03376)],
    [new mp.Vector3(-1243.724, -550.2916, 12.1523), new mp.Vector3(0, 0, 90.41894)],
    [new mp.Vector3(-1253.228, -550.3326, 12.98333), new mp.Vector3(0, 0, 89.883)],
    [new mp.Vector3(-1262.73, -550.3459, 13.81429), new mp.Vector3(0, 0, 90.01717)],
    [new mp.Vector3(-1272.229, -550.1141, 14.12916), new mp.Vector3(0, 0, 85.6966)],
    [new mp.Vector3(-1281.604, -549.2673, 14.12898), new mp.Vector3(0, 0, 82.07693)],
    [new mp.Vector3(-1290.287, -547.1069, 14.12886), new mp.Vector3(0, 0, 66.39586)],
    [new mp.Vector3(-1298.401, -542.3635, 14.12591), new mp.Vector3(0, 0, 52.98934)],
    [new mp.Vector3(-1305.245, -536.0571, 14.12922), new mp.Vector3(0, 0, 35.28277)],
    [new mp.Vector3(-1309.871, -527.8188, 14.14398), new mp.Vector3(0, 0, 29.01347)],
    [new mp.Vector3(-1313.723, -519.2267, 14.14484), new mp.Vector3(0, 0, 19.60205)],
    [new mp.Vector3(-1317.016, -510.3736, 14.14484), new mp.Vector3(0, 0, 22.66485)],
    [new mp.Vector3(-1321.263, -501.9696, 14.14906), new mp.Vector3(0, 0, 28.98894)],
    [new mp.Vector3(-1325.918, -493.6955, 14.14734), new mp.Vector3(0, 0, 30.02998)],
    [new mp.Vector3(-1330.676, -485.5273, 14.17324), new mp.Vector3(0, 0, 30.48811)],
    [new mp.Vector3(-1335.528, -477.3594, 14.16743), new mp.Vector3(0, 0, 30.25155)],
    // Del Perro
    [new mp.Vector3(-1340.01, -469.4448, 14.16186), new mp.Vector3(0, 0, 29.205)],
    [new mp.Vector3(-1344.651, -461.201, 14.15611), new mp.Vector3(0, 0, 29.40756)],
    [new mp.Vector3(-1349.406, -452.9523, 14.15034), new mp.Vector3(0, 0, 34.6321)],
    [new mp.Vector3(-1354.325, -444.882, 14.14572), new mp.Vector3(0, 0, 29.13123)],
    [new mp.Vector3(-1359.043, -436.7103, 14.14576), new mp.Vector3(0, 0, 30.35898)],
    [new mp.Vector3(-1363.889, -428.4716, 14.14573), new mp.Vector3(0, 0, 30.42423)],
    [new mp.Vector3(-1368.663, -420.2471, 14.1287), new mp.Vector3(0, 0, 31.23759)],
    [new mp.Vector3(-1373.172, -412.4891, 14.12867), new mp.Vector3(0, 0, 25.17652)],
    [new mp.Vector3(-1375.525, -403.4681, 14.13127), new mp.Vector3(0, 0, 4.087037)],
    [new mp.Vector3(-1375.643, -393.8983, 14.1313), new mp.Vector3(0, 0, -1.019247)],
    [new mp.Vector3(-1374.586, -384.6072, 14.13162), new mp.Vector3(0, 0, -12.39118)],
    [new mp.Vector3(-1372.072, -375.4348, 14.13162), new mp.Vector3(0, 0, -22.05493)],
    [new mp.Vector3(-1367.909, -367.5719, 14.13164), new mp.Vector3(0, 0, -32.60713)],
    [new mp.Vector3(-1362.38, -359.8895, 14.13165), new mp.Vector3(0, 0, -42.12527)],
    [new mp.Vector3(-1355.294, -353.2063, 14.13165), new mp.Vector3(0, 0, -53.01263)],
    [new mp.Vector3(-1347.533, -348.4601, 14.13168), new mp.Vector3(0, 0, -60.47218)],
    [new mp.Vector3(-1339.26, -344.6719, 14.13168), new mp.Vector3(0, 0, -73.91737)],
    [new mp.Vector3(-1329.924, -342.5167, 14.13168), new mp.Vector3(0, 0, -87.03742)],
    [new mp.Vector3(-1320.717, -342.081, 14.13175), new mp.Vector3(0, 0, -87.41787)],
    [new mp.Vector3(-1311.292, -342.1628, 14.13174), new mp.Vector3(0, 0, -90.15645)],
    [new mp.Vector3(-1301.844, -342.0271, 14.13173), new mp.Vector3(0, 0, -89.73421)],
    [new mp.Vector3(-1292.363, -341.9677, 14.13173), new mp.Vector3(0, 0, -90.14947)],
    [new mp.Vector3(-1282.941, -342.1171, 14.13173), new mp.Vector3(0, 0, -90.13094)],
    [new mp.Vector3(-1273.659, -342.0812, 14.13175), new mp.Vector3(0, 0, -90.41187)],
    [new mp.Vector3(-1264.1, -342.096, 14.13175), new mp.Vector3(0, 0, -90.19079)],
    [new mp.Vector3(-1254.655, -342.0305, 14.13174), new mp.Vector3(0, 0, -90.22778)],
    [new mp.Vector3(-1245.057, -342.0897, 14.13176), new mp.Vector3(0, 0, -89.51025)],
    [new mp.Vector3(-1235.467, -341.9708, 14.1317), new mp.Vector3(0, 0, -87.54735)],
    [new mp.Vector3(-1226.111, -340.8422, 14.13169), new mp.Vector3(0, 0, -79.26644)],
    [new mp.Vector3(-1217.256, -338.5864, 14.13169), new mp.Vector3(0, 0, -70.90448)],
    [new mp.Vector3(-1208.62, -334.7576, 14.13169), new mp.Vector3(0, 0, -62.72009)],
    [new mp.Vector3(-1200.647, -330.2796, 14.13174), new mp.Vector3(0, 0, -60.48514)],
    [new mp.Vector3(-1192.304, -325.4127, 14.46076), new mp.Vector3(0, 0, -59.53766)],
    [new mp.Vector3(-1184.87, -320.8976, 15.22738), new mp.Vector3(0, 0, -59.24532)],
    [new mp.Vector3(-1176.937, -316.5056, 16.02057), new mp.Vector3(0, 0, -62.17035)],
    [new mp.Vector3(-1168.832, -312.0105, 16.83219), new mp.Vector3(0, 0, -60.47035)],
    [new mp.Vector3(-1160.514, -307.0587, 17.67888), new mp.Vector3(0, 0, -60.41935)],
    [new mp.Vector3(-1152.537, -302.4297, 18.48509), new mp.Vector3(0, 0, -59.50566)],
    [new mp.Vector3(-1144.129, -297.6916, 19.03846), new mp.Vector3(0, 0, -59.06317)],
    [new mp.Vector3(-1136.215, -293.0056, 19.03694), new mp.Vector3(0, 0, -60.87337)],
    [new mp.Vector3(-1128.073, -288.2005, 19.03689), new mp.Vector3(0, 0, -60.30932)],
    [new mp.Vector3(-1119.686, -283.521, 19.03689), new mp.Vector3(0, 0, -60.76859)],
    [new mp.Vector3(-1111.85, -278.9943, 19.03689), new mp.Vector3(0, 0, -58.43752)],
    [new mp.Vector3(-1103.353, -274.0874, 19.03694), new mp.Vector3(0, 0, -60.44688)],
    [new mp.Vector3(-1095.02, -269.2895, 19.03692), new mp.Vector3(0, 0, -60.19342)],
    [new mp.Vector3(-1086.916, -264.7375, 19.03691), new mp.Vector3(0, 0, -61.22678)],
    [new mp.Vector3(-1078.995, -260.0456, 19.03691), new mp.Vector3(0, 0, -59.23211)],
    [new mp.Vector3(-1070.619, -255.1989, 19.03691), new mp.Vector3(0, 0, -59.88397)],
    [new mp.Vector3(-1062.451, -250.387, 19.03691), new mp.Vector3(0, 0, -59.81244)],
    [new mp.Vector3(-1054.447, -245.7813, 19.03692), new mp.Vector3(0, 0, -60.26795)],
    [new mp.Vector3(-1046.105, -241.0368, 19.03692), new mp.Vector3(0, 0, -60.11716)],
    [new mp.Vector3(-1038.048, -236.4119, 19.03692), new mp.Vector3(0, 0, -60.19703)],
    [new mp.Vector3(-1029.724, -231.5853, 19.03692), new mp.Vector3(0, 0, -59.9044)],
    [new mp.Vector3(-1021.506, -226.9523, 19.03207), new mp.Vector3(0, 0, -64.16682)],
    [new mp.Vector3(-1012.647, -223.749, 19.032), new mp.Vector3(0, 0, -71.99907)],
    [new mp.Vector3(-1003.884, -221.9753, 19.0319), new mp.Vector3(0, 0, -85.01877)],
    [new mp.Vector3(-994.3887, -221.6545, 19.03687), new mp.Vector3(0, 0, -90.83342)],
    [new mp.Vector3(-984.81, -221.7194, 19.03691), new mp.Vector3(0, 0, -90.34216)],
    [new mp.Vector3(-975.2791, -221.8029, 19.03691), new mp.Vector3(0, 0, -89.92403)],
    [new mp.Vector3(-965.8678, -221.5591, 19.03226), new mp.Vector3(0, 0, -87.34696)],
    [new mp.Vector3(-956.3532, -220.6037, 19.03201), new mp.Vector3(0, 0, -77.94888)],
    [new mp.Vector3(-947.8068, -218.1396, 19.03201), new mp.Vector3(0, 0, -70.65821)],
    [new mp.Vector3(-939.3036, -214.203, 19.03201), new mp.Vector3(0, 0, -61.76327)],
    [new mp.Vector3(-930.9742, -209.5878, 19.03693), new mp.Vector3(0, 0, -59.64398)],
    [new mp.Vector3(-922.8439, -204.8436, 19.03693), new mp.Vector3(0, 0, -60.45274)],
    [new mp.Vector3(-914.6282, -200.0309, 19.03694), new mp.Vector3(0, 0, -60.25657)],
    [new mp.Vector3(-906.3514, -195.4053, 19.03694), new mp.Vector3(0, 0, -60.83124)],
    [new mp.Vector3(-898.1077, -190.709, 19.03694), new mp.Vector3(0, 0, -59.80858)],
    [new mp.Vector3(-889.9312, -185.8469, 19.03694), new mp.Vector3(0, 0, -60.50776)],
    [new mp.Vector3(-881.7957, -181.1622, 19.03696), new mp.Vector3(0, 0, -60.91808)],
    [new mp.Vector3(-873.6973, -177.1122, 19.04981), new mp.Vector3(0, 0, -66.91442)],
    [new mp.Vector3(-864.8455, -173.9218, 19.04981), new mp.Vector3(0, 0, -69.19057)],
    [new mp.Vector3(-856.1443, -170.091, 19.06133), new mp.Vector3(0, 0, -64.03893)],
    [new mp.Vector3(-847.9431, -165.4525, 19.05095), new mp.Vector3(0, 0, -59.50773)],
    [new mp.Vector3(-839.8741, -160.6669, 19.08153), new mp.Vector3(0, 0, -59.07851)],
    [new mp.Vector3(-831.5565, -155.9716, 19.07464), new mp.Vector3(0, 0, -59.61015)],
    // Portola Drive
    [new mp.Vector3(-823.2787, -151.0986, 19.06877), new mp.Vector3(0, 0, -61.00691)],
    [new mp.Vector3(-815.3726, -146.6836, 19.06323), new mp.Vector3(0, 0, -60.98961)],
    [new mp.Vector3(-807.0659, -142.0054, 19.05744), new mp.Vector3(0, 0, -59.36258)],
    [new mp.Vector3(-798.8675, -137.1652, 19.05169), new mp.Vector3(0, 0, -59.57677)],
    [new mp.Vector3(-790.9124, -132.4902, 19.05075), new mp.Vector3(0, 0, -59.60491)],
    [new mp.Vector3(-782.6456, -127.5845, 19.05075), new mp.Vector3(0, 0, -59.38256)],
    [new mp.Vector3(-774.7505, -122.7739, 19.05164), new mp.Vector3(0, 0, -57.85315)],
    [new mp.Vector3(-766.9335, -117.4863, 19.0498), new mp.Vector3(0, 0, -51.5646)],
    [new mp.Vector3(-759.4954, -111.405, 19.04981), new mp.Vector3(0, 0, -50.46901)],
    [new mp.Vector3(-751.816, -105.8992, 19.05011), new mp.Vector3(0, 0, -59.05949)],
    [new mp.Vector3(-743.5995, -101.287, 19.03695), new mp.Vector3(0, 0, -60.54367)],
    [new mp.Vector3(-735.1697, -97.13134, 19.03812), new mp.Vector3(0, 0, -69.26663)],
    [new mp.Vector3(-726.0336, -94.66656, 19.03812), new mp.Vector3(0, 0, -77.86494)],
    [new mp.Vector3(-716.7292, -93.84998, 19.03812), new mp.Vector3(0, 0, -90.24067)],
    [new mp.Vector3(-707.7392, -93.89606, 19.03695), new mp.Vector3(0, 0, -89.11139)],
    [new mp.Vector3(-698.1824, -94.42844, 19.03681), new mp.Vector3(0, 0, -98.16908)],
    [new mp.Vector3(-689.0701, -96.84031, 19.03681), new mp.Vector3(0, 0, -109.597)],
    [new mp.Vector3(-680.4262, -100.6722, 19.03681), new mp.Vector3(0, 0, -118.3125)],
    [new mp.Vector3(-672.2446, -105.3987, 19.03693), new mp.Vector3(0, 0, -120.0112)],
    [new mp.Vector3(-664.4928, -109.958, 19.03693), new mp.Vector3(0, 0, -119.2648)],
    [new mp.Vector3(-656.2592, -114.7065, 19.03693), new mp.Vector3(0, 0, -120.5859)],
    [new mp.Vector3(-648.0195, -119.4246, 19.03695), new mp.Vector3(0, 0, -120.1896)],
    [new mp.Vector3(-639.6486, -124.27, 19.03695), new mp.Vector3(0, 0, -120.1895)],
    [new mp.Vector3(-631.3741, -129.0054, 19.03695), new mp.Vector3(0, 0, -119.3286)],
    [new mp.Vector3(-623.0707, -133.6198, 19.03701), new mp.Vector3(0, 0, -117.5415)],
    [new mp.Vector3(-614.9778, -137.5762, 19.03701), new mp.Vector3(0, 0, -114.8858)],
    [new mp.Vector3(-606.3465, -141.414, 19.03701), new mp.Vector3(0, 0, -115.3664)],
    [new mp.Vector3(-597.8913, -145.775, 18.81795), new mp.Vector3(0, 0, -120.1123)],
    [new mp.Vector3(-589.7325, -150.6389, 18.01835), new mp.Vector3(0, 0, -120.2015)],
    [new mp.Vector3(-581.5102, -155.3454, 17.18945), new mp.Vector3(0, 0, -118.6028)],
    [new mp.Vector3(-573.2615, -160.0871, 16.35716), new mp.Vector3(0, 0, -120.803)],
    [new mp.Vector3(-565.0584, -164.8256, 15.52823), new mp.Vector3(0, 0, -120.1751)],
    [new mp.Vector3(-557.1546, -169.426, 14.72844), new mp.Vector3(0, 0, -119.6174)],
    [new mp.Vector3(-548.986, -174.1587, 14.08645), new mp.Vector3(0, 0, -120.3175)],
    [new mp.Vector3(-540.607, -178.9845, 14.09285), new mp.Vector3(0, 0, -120.9296)],
    [new mp.Vector3(-532.8225, -183.5367, 14.09285), new mp.Vector3(0, 0, -119.8968)],
    [new mp.Vector3(-524.5671, -188.272, 14.09285), new mp.Vector3(0, 0, -118.5797)],
    [new mp.Vector3(-516.1276, -192.458, 14.09286), new mp.Vector3(0, 0, -113.0224)],
    [new mp.Vector3(-507.173, -195.2235, 14.09286), new mp.Vector3(0, 0, -103.5532)],
    [new mp.Vector3(-497.7513, -196.471, 14.09281), new mp.Vector3(0, 0, -93.82256)],
    [new mp.Vector3(-488.3304, -196.8718, 13.76219), new mp.Vector3(0, 0, -90.39029)],
    [new mp.Vector3(-478.8034, -196.907, 12.92411), new mp.Vector3(0, 0, -89.1685)],
    [new mp.Vector3(-469.3666, -196.79, 12.09795), new mp.Vector3(0, 0, -90.51472)],
    [new mp.Vector3(-459.7736, -196.8803, 11.25903), new mp.Vector3(0, 0, -90.6253)],
    [new mp.Vector3(-450.784, -196.9622, 10.47242), new mp.Vector3(0, 0, -89.35307)],
    [new mp.Vector3(-441.2591, -196.9225, 9.638972), new mp.Vector3(0, 0, -89.86437)],
    [new mp.Vector3(-431.8192, -196.8635, 9.146718), new mp.Vector3(0, 0, -89.81828)],
    [new mp.Vector3(-422.3202, -196.8306, 9.148708), new mp.Vector3(0, 0, -89.88734)],
    [new mp.Vector3(-412.861, -196.7918, 9.1487), new mp.Vector3(0, 0, -88.6837)],
    [new mp.Vector3(-403.4128, -196.908, 9.148709), new mp.Vector3(0, 0, -92.81654)],
    [new mp.Vector3(-393.946, -197.8497, 9.148724), new mp.Vector3(0, 0, -102.0447)],
    [new mp.Vector3(-385.2829, -200.2089, 9.148724), new mp.Vector3(0, 0, -109.4258)],
    [new mp.Vector3(-376.7099, -204.076, 9.148724), new mp.Vector3(0, 0, -116.0434)],
    [new mp.Vector3(-368.5814, -208.789, 9.148705), new mp.Vector3(0, 0, -121.1248)],
    [new mp.Vector3(-360.2391, -213.5404, 9.148701), new mp.Vector3(0, 0, -119.8742)],
    [new mp.Vector3(-352.0417, -218.1995, 9.148699), new mp.Vector3(0, 0, -120.6792)],
    [new mp.Vector3(-344.0309, -223.3263, 9.148751), new mp.Vector3(0, 0, -125.5618)],
    [new mp.Vector3(-336.4716, -229.0706, 9.148767), new mp.Vector3(0, 0, -125.868)],
    [new mp.Vector3(-329.0368, -234.0942, 9.148763), new mp.Vector3(0, 0, -122.0723)],
    [new mp.Vector3(-320.9827, -239.1512, 9.148753), new mp.Vector3(0, 0, -125.6615)],
    [new mp.Vector3(-313.8535, -245.2569, 9.148681), new mp.Vector3(0, 0, -135.9621)],
    [new mp.Vector3(-307.971, -252.6055, 9.148765), new mp.Vector3(0, 0, -146.0753)],
    [new mp.Vector3(-303.739, -260.9621, 9.14867), new mp.Vector3(0, 0, -159.7444)],
    [new mp.Vector3(-301.9757, -270.1776, 9.14867), new mp.Vector3(0, 0, -177.6614)],
    [new mp.Vector3(-302.2495, -279.2544, 9.14867), new mp.Vector3(0, 0, 178.2551)],
    [new mp.Vector3(-302.3282, -288.8618, 9.163727), new mp.Vector3(0, 0, -179.7246)],
    [new mp.Vector3(-302.3653, -298.3297, 9.193995), new mp.Vector3(0, 0, -179.9957)],
    [new mp.Vector3(-302.1953, -307.787, 9.187406), new mp.Vector3(0, 0, 179.8614)],
    // Burton
    [new mp.Vector3(-302.3254, -317.3109, 9.181577), new mp.Vector3(0, 0, 179.0011)],
    [new mp.Vector3(-302.4487, -326.3986, 9.176028), new mp.Vector3(0, 0, 179.6027)],
    [new mp.Vector3(-302.5406, -335.8862, 9.170278), new mp.Vector3(0, 0, 178.9945)],
    [new mp.Vector3(-302.4862, -345.3874, 9.164525), new mp.Vector3(0, 0, -179.3971)],
    [new mp.Vector3(-302.3611, -354.8797, 9.163541), new mp.Vector3(0, 0, -179.5748)],
    [new mp.Vector3(-302.3209, -364.401, 9.163541), new mp.Vector3(0, 0, -179.5514)],
    [new mp.Vector3(-302.0723, -373.8471, 9.15309), new mp.Vector3(0, 0, -175.3658)],
    [new mp.Vector3(-300.1191, -383.082, 9.214173), new mp.Vector3(0, 0, -163.3943)],
    [new mp.Vector3(-296.6243, -391.8602, 9.151134), new mp.Vector3(0, 0, -155.3789)],
    [new mp.Vector3(-292.554, -399.8552, 9.148638), new mp.Vector3(0, 0, -148.6304)],
    [new mp.Vector3(-287.4993, -407.903, 9.14861), new mp.Vector3(0, 0, -147.2567)],
    [new mp.Vector3(-281.3586, -415.0963, 9.148612), new mp.Vector3(0, 0, -135.9492)],
    [new mp.Vector3(-274.3262, -421.3661, 9.148612), new mp.Vector3(0, 0, -128.8426)],
    [new mp.Vector3(-266.4924, -426.5536, 9.148648), new mp.Vector3(0, 0, -121.0453)],
    [new mp.Vector3(-258.1771, -431.2588, 9.148664), new mp.Vector3(0, 0, -118.8541)],
    [new mp.Vector3(-250.3836, -435.7092, 9.148664), new mp.Vector3(0, 0, -120.9244)],
    [new mp.Vector3(-242.0932, -440.4608, 9.148673), new mp.Vector3(0, 0, -119.4047)],
    [new mp.Vector3(-233.8746, -445.0938, 9.148665), new mp.Vector3(0, 0, -119.4615)],
    [new mp.Vector3(-225.4273, -449.6099, 9.148725), new mp.Vector3(0, 0, -116.562)],
    [new mp.Vector3(-216.8665, -453.5815, 9.148725), new mp.Vector3(0, 0, -114.0454)],
    [new mp.Vector3(-208.2621, -457.4811, 9.148725), new mp.Vector3(0, 0, -118.1379)],
    [new mp.Vector3(-200.0176, -462.1484, 9.64166), new mp.Vector3(0, 0, -119.863)],
    [new mp.Vector3(-191.8383, -466.8593, 10.4689), new mp.Vector3(0, 0, -119.2695)],
    [new mp.Vector3(-184.0969, -471.5051, 11.25877), new mp.Vector3(0, 0, -122.4046)],
    [new mp.Vector3(-175.7961, -476.2589, 12.0952), new mp.Vector3(0, 0, -119.981)],
    [new mp.Vector3(-167.5947, -480.9736, 12.92353), new mp.Vector3(0, 0, -120.0992)],
    [new mp.Vector3(-159.3243, -485.8009, 13.76078), new mp.Vector3(0, 0, -119.76)],
    [new mp.Vector3(-151.1546, -490.4638, 14.14051), new mp.Vector3(0, 0, -119.7241)],
    [new mp.Vector3(-142.7786, -495.2361, 14.60794), new mp.Vector3(0, 0, -120.6857)],
    [new mp.Vector3(-135.0027, -499.681, 15.07734), new mp.Vector3(0, 0, -119.8171)],
    [new mp.Vector3(-126.6385, -504.5316, 15.58324), new mp.Vector3(0, 0, -119.6353)],
    [new mp.Vector3(-118.3462, -509.3717, 16.42643), new mp.Vector3(0, 0, -120.5276)],
    [new mp.Vector3(-110.0575, -514.0537, 17.25908), new mp.Vector3(0, 0, -120.4362)],
    [new mp.Vector3(-101.9348, -518.8641, 17.84266), new mp.Vector3(0, 0, -120.4465)],
    [new mp.Vector3(-93.91422, -523.0964, 17.75172), new mp.Vector3(0, 0, -115.1737)],
    [new mp.Vector3(-85.17355, -526.8116, 17.75176), new mp.Vector3(0, 0, -104.9256)],
    [new mp.Vector3(-76.09746, -528.4717, 17.75176), new mp.Vector3(0, 0, -94.74969)],
    [new mp.Vector3(-66.61729, -528.8275, 17.7518), new mp.Vector3(0, 0, -90.99801)],
    [new mp.Vector3(-57.01929, -528.9284, 17.7518), new mp.Vector3(0, 0, -89.88193)],
    [new mp.Vector3(-47.58244, -528.7535, 17.75181), new mp.Vector3(0, 0, -89.30599)],
    [new mp.Vector3(-38.51993, -528.7181, 17.75181), new mp.Vector3(0, 0, -90.64745)],
    [new mp.Vector3(-28.82886, -528.8149, 17.75181), new mp.Vector3(0, 0, -90.71973)],
    [new mp.Vector3(-19.53875, -528.8277, 17.75182), new mp.Vector3(0, 0, -88.90337)],
    [new mp.Vector3(-9.957413, -528.9712, 17.74758), new mp.Vector3(0, 0, -93.51197)],
    [new mp.Vector3(-0.7982908, -530.1378, 17.74691), new mp.Vector3(0, 0, -102.2202)],
    [new mp.Vector3(8.227994, -533.1722, 17.74688), new mp.Vector3(0, 0, -116.193)],
    [new mp.Vector3(16.56236, -537.1396, 17.75149), new mp.Vector3(0, 0, -116.8414)],
    [new mp.Vector3(25.15674, -541.4241, 17.75187), new mp.Vector3(0, 0, -114.3208)],
    [new mp.Vector3(33.62012, -545.24, 17.75188), new mp.Vector3(0, 0, -115.0058)],
    [new mp.Vector3(42.22565, -549.4409, 17.75188), new mp.Vector3(0, 0, -119.3565)],
    [new mp.Vector3(50.34721, -554.261, 17.75188), new mp.Vector3(0, 0, -120.3214)],
    [new mp.Vector3(58.50912, -559.0274, 17.75188), new mp.Vector3(0, 0, -119.4475)],
    [new mp.Vector3(66.50919, -563.6147, 17.75188), new mp.Vector3(0, 0, -120.0757)],
    [new mp.Vector3(74.88531, -568.4045, 17.75188), new mp.Vector3(0, 0, -121.2154)],
    [new mp.Vector3(83.02186, -573.1165, 17.75188), new mp.Vector3(0, 0, -119.6115)],
    [new mp.Vector3(90.92722, -577.6799, 17.75188), new mp.Vector3(0, 0, -120.4098)],
    [new mp.Vector3(101.3122, -584.4578, 17.76257), new mp.Vector3(0, 0, -126.8301)],
    [new mp.Vector3(112.6998, -592.8005, 17.75708), new mp.Vector3(0, 0, -121.8141)],
    [new mp.Vector3(124.937, -599.3292, 17.75705), new mp.Vector3(0, 0, -115.2009)],
    [new mp.Vector3(138.6529, -603.1853, 17.77078), new mp.Vector3(0, 0, -99.60696)],
    [new mp.Vector3(152.3493, -604.2266, 17.7555), new mp.Vector3(0, 0, -90.71679)],
    [new mp.Vector3(166.5302, -604.3798, 17.757), new mp.Vector3(0, 0, -90.60545)],
    [new mp.Vector3(180.576, -604.1776, 17.7552), new mp.Vector3(0, 0, -89.82121)],
    [new mp.Vector3(193.57, -603.762, 17.75826), new mp.Vector3(0, 0, -84.57812)],
    [new mp.Vector3(202.6127, -602.3285, 17.75807), new mp.Vector3(0, 0, -74.04848)],
    [new mp.Vector3(211.5657, -599.2482, 17.75807), new mp.Vector3(0, 0, -66.40529)],
    [new mp.Vector3(220.0636, -595.4247, 17.75807), new mp.Vector3(0, 0, -64.45472)],
    [new mp.Vector3(228.6326, -591.4017, 17.75807), new mp.Vector3(0, 0, -69.17164)],
    [new mp.Vector3(237.5525, -589.3989, 17.75807), new mp.Vector3(0, 0, -82.28012)],
    [new mp.Vector3(247.1237, -588.7543, 17.7571), new mp.Vector3(0, 0, -90.52586)],
    [new mp.Vector3(256.3552, -588.789, 17.75688), new mp.Vector3(0, 0, -89.50124)],
    [new mp.Vector3(265.9931, -588.8256, 17.75688), new mp.Vector3(0, 0, -90.13232)],
    [new mp.Vector3(275.2124, -588.8743, 17.75688), new mp.Vector3(0, 0, -90.75806)],
    [new mp.Vector3(284.8289, -588.9201, 17.75688), new mp.Vector3(0, 0, -90.20921)],
    [new mp.Vector3(294.0475, -588.8168, 17.75688), new mp.Vector3(0, 0, -89.24032)],
    [new mp.Vector3(303.6555, -588.794, 17.75688), new mp.Vector3(0, 0, -90.21942)],
    [new mp.Vector3(313.3266, -588.8281, 17.75688), new mp.Vector3(0, 0, -90.27137)],
    [new mp.Vector3(322.9019, -588.8105, 17.75688), new mp.Vector3(0, 0, -89.63243)],
    [new mp.Vector3(331.7877, -588.8021, 17.75688), new mp.Vector3(0, 0, -90.17278)],
    [new mp.Vector3(341.3341, -588.808, 17.75688), new mp.Vector3(0, 0, -89.0997)],
    [new mp.Vector3(350.9568, -588.8776, 17.75688), new mp.Vector3(0, 0, -91.20637)],
    [new mp.Vector3(360.4472, -588.9598, 17.75686), new mp.Vector3(0, 0, -90.40417)],
    [new mp.Vector3(369.6761, -588.8363, 17.75685), new mp.Vector3(0, 0, -89.34454)],
    [new mp.Vector3(379.1585, -588.7873, 17.75685), new mp.Vector3(0, 0, -89.81911)],
    [new mp.Vector3(388.5986, -588.8409, 17.75686), new mp.Vector3(0, 0, -90.77193)],
    [new mp.Vector3(398.0886, -588.82, 17.75686), new mp.Vector3(0, 0, -90.54332)],
    [new mp.Vector3(407.6983, -588.8084, 17.4291), new mp.Vector3(0, 0, -89.84313)],
    [new mp.Vector3(416.7818, -588.821, 16.64988), new mp.Vector3(0, 0, -90.62236)],
    [new mp.Vector3(426.2633, -588.9481, 15.79932), new mp.Vector3(0, 0, -90.87418)],
    [new mp.Vector3(435.7542, -588.8462, 15.40243), new mp.Vector3(0, 0, -88.72327)],
    [new mp.Vector3(445.1303, -587.8525, 15.39854), new mp.Vector3(0, 0, -79.06953)],
    [new mp.Vector3(454.3064, -585.5142, 15.39854), new mp.Vector3(0, 0, -69.51213)],
    [new mp.Vector3(463.0014, -581.8838, 15.39854), new mp.Vector3(0, 0, -64.63693)],
    [new mp.Vector3(471.1701, -577.9056, 15.39521), new mp.Vector3(0, 0, -68.21318)],
    [new mp.Vector3(480.1987, -574.9308, 15.39521), new mp.Vector3(0, 0, -76.67051)],
    [new mp.Vector3(489.5288, -573.4832, 15.39521), new mp.Vector3(0, 0, -88.82172)],
    [new mp.Vector3(498.638, -573.998, 15.39523), new mp.Vector3(0, 0, -93.64455)],
    [new mp.Vector3(507.7875, -575.9392, 15.39523), new mp.Vector3(0, 0, -109.0251)],
    [new mp.Vector3(516.5099, -579.4304, 15.39523), new mp.Vector3(0, 0, -118.8669)],
    [new mp.Vector3(524.5728, -584.5386, 15.39525), new mp.Vector3(0, 0, -126.8367)],
    [new mp.Vector3(531.4301, -590.8871, 15.39525), new mp.Vector3(0, 0, -135.4807)],
    [new mp.Vector3(536.9718, -598.2195, 15.39525), new mp.Vector3(0, 0, -147.5181)],
    [new mp.Vector3(541.2446, -606.5632, 15.39531), new mp.Vector3(0, 0, -159.6297)],
    [new mp.Vector3(544.1108, -615.5599, 15.39531), new mp.Vector3(0, 0, -165.5673)],
    [new mp.Vector3(544.8638, -624.9487, 15.39531), new mp.Vector3(0, 0, -176.4143)],
    [new mp.Vector3(544.5624, -634.3413, 15.42427), new mp.Vector3(0, 0, 171.4504)],
    [new mp.Vector3(542.2646, -643.4199, 15.42458), new mp.Vector3(0, 0, 159.3727)],
    [new mp.Vector3(538.5854, -652.0954, 15.42444), new mp.Vector3(0, 0, 153.6083)],
    [new mp.Vector3(534.616, -660.0237, 15.27492), new mp.Vector3(0, 0, 159.8792)],
    [new mp.Vector3(531.9707, -669.1257, 15.4075), new mp.Vector3(0, 0, 168.123)],
    [new mp.Vector3(530.1839, -682.8193, 15.42076), new mp.Vector3(0, 0, 173.2493)],
    [new mp.Vector3(528.5648, -696.9361, 15.41604), new mp.Vector3(0, 0, 173.8385)],
    [new mp.Vector3(527.3102, -711.1228, 15.41248), new mp.Vector3(0, 0, 174.1825)],
    [new mp.Vector3(525.8654, -725.1685, 15.41034), new mp.Vector3(0, 0, 174.4468)],
    [new mp.Vector3(524.6151, -739.404, 15.40861), new mp.Vector3(0, 0, 174.8739)],
    [new mp.Vector3(523.395, -753.4731, 15.40785), new mp.Vector3(0, 0, 175.064)],
    [new mp.Vector3(522.2063, -766.9334, 15.41451), new mp.Vector3(0, 0, 174.6764)],
    [new mp.Vector3(521.0566, -781.0607, 15.40859), new mp.Vector3(0, 0, 175.5992)],
    [new mp.Vector3(519.8354, -795.1779, 15.40822), new mp.Vector3(0, 0, 175.0864)],
    [new mp.Vector3(518.7322, -809.3032, 15.48447), new mp.Vector3(0, 0, 175.6508)],
    [new mp.Vector3(517.6522, -823.513, 15.40687), new mp.Vector3(0, 0, 175.6558)],
    [new mp.Vector3(516.738, -837.6008, 15.40894), new mp.Vector3(0, 0, 177.9994)],
    [new mp.Vector3(516.3687, -851.894, 15.44549), new mp.Vector3(0, 0, 178.8718)],
    [new mp.Vector3(516.2704, -866.0417, 15.40981), new mp.Vector3(0, 0, -179.8883)],
    [new mp.Vector3(516.3983, -880.248, 15.48341), new mp.Vector3(0, 0, -178.9081)],
    [new mp.Vector3(516.8989, -893.5839, 15.88263), new mp.Vector3(0, 0, -177.0196)],
    [new mp.Vector3(517.4936, -907.8447, 16.64275), new mp.Vector3(0, 0, -178.0089)],
    [new mp.Vector3(517.9265, -922.1161, 17.63064), new mp.Vector3(0, 0, -179.9281)],
    [new mp.Vector3(517.7408, -936.2487, 18.70087), new mp.Vector3(0, 0, 179.3607)],
    [new mp.Vector3(517.65, -950.3643, 19.8499), new mp.Vector3(0, 0, 179.6621)],
    [new mp.Vector3(517.6088, -964.5745, 21.01353), new mp.Vector3(0, 0, 179.6429)],
    [new mp.Vector3(517.593, -978.8224, 22.1832), new mp.Vector3(0, 0, 178.8025)],
    [new mp.Vector3(517.7357, -993.0128, 23.36564), new mp.Vector3(0, 0, -179.6032)],
    [new mp.Vector3(517.7197, -1006.442, 24.31355), new mp.Vector3(0, 0, -179.7636)],
    [new mp.Vector3(517.7584, -1020.571, 25.3104), new mp.Vector3(0, 0, 179.9391)],
    [new mp.Vector3(517.7357, -1034.8, 26.21796), new mp.Vector3(0, 0, -179.6032)],
    [new mp.Vector3(517.7134, -1048.972, 27.02207), new mp.Vector3(0, 0, -179.9618)],
    [new mp.Vector3(517.9542, -1063.138, 27.89488), new mp.Vector3(0, 0, -178.5084)],
    [new mp.Vector3(518.3943, -1077.405, 28.65001), new mp.Vector3(0, 0, -177.66)],
    [new mp.Vector3(519.037, -1091.56, 28.99521), new mp.Vector3(0, 0, -178.1771)],
    [new mp.Vector3(519.2144, -1105.658, 29.13345), new mp.Vector3(0, 0, 179.6996)],
    [new mp.Vector3(519.2499, -1119.216, 29.29762), new mp.Vector3(0, 0, -179.7606)],
    [new mp.Vector3(519.1028, -1133.33, 29.22079), new mp.Vector3(0, 0, -179.7979)],
    [new mp.Vector3(519.1956, -1147.57, 29.31923), new mp.Vector3(0, 0, -179.0032)],
    [new mp.Vector3(519.3577, -1161.711, 29.31468), new mp.Vector3(0, 0, -179.8355)],
    [new mp.Vector3(518.4201, -1175.18, 29.30712), new mp.Vector3(0, 0, 170.2315)],
    [new mp.Vector3(513.5145, -1188.041, 29.31356), new mp.Vector3(0, 0, 143.6582)],
    [new mp.Vector3(504.5299, -1197.763, 29.31367), new mp.Vector3(0, 0, 124.5798)],
    [new mp.Vector3(491.0979, -1201.686, 29.29525), new mp.Vector3(0, 0, 97.96886)],
    [new mp.Vector3(477.011, -1202.073, 29.26934), new mp.Vector3(0, 0, 90.41251)],
    [new mp.Vector3(463.4371, -1202.202, 29.26917), new mp.Vector3(0, 0, 90.63827)],
    [new mp.Vector3(449.2491, -1201.946, 29.32887), new mp.Vector3(0, 0, 88.10281)],
    [new mp.Vector3(435.061, -1201.489, 29.32125), new mp.Vector3(0, 0, 87.9654)],
    [new mp.Vector3(420.7547, -1201.035, 29.85262), new mp.Vector3(0, 0, 88.55185)],
    [new mp.Vector3(406.557, -1200.686, 31.00559), new mp.Vector3(0, 0, 88.87987)],
    [new mp.Vector3(393.1029, -1200.354, 32.46012), new mp.Vector3(0, 0, 88.31165)],
    [new mp.Vector3(378.813, -1199.965, 34.15768), new mp.Vector3(0, 0, 89.65331)],
    [new mp.Vector3(364.6646, -1199.252, 35.77682), new mp.Vector3(0, 0, 83.63062)],
    [new mp.Vector3(350.5956, -1198.741, 37.08339), new mp.Vector3(0, 0, 88.22504)],
    [new mp.Vector3(336.3746, -1198.46, 37.88809), new mp.Vector3(0, 0, 89.73724)],
    [new mp.Vector3(322.0685, -1198.576, 38.04695), new mp.Vector3(0, 0, 89.80375)],
    [new mp.Vector3(308.6617, -1198.634, 38.0757), new mp.Vector3(0, 0, 90.5078)],
    // Strawberry
    [new mp.Vector3(294.3173, -1198.497, 38.07597), new mp.Vector3(0, 0, 89.1012)],
    [new mp.Vector3(280.1419, -1198.448, 38.07585), new mp.Vector3(0, 0, 89.61524)],
    [new mp.Vector3(265.9627, -1198.384, 38.0757), new mp.Vector3(0, 0, 91.17538)],
    [new mp.Vector3(251.6754, -1198.538, 38.07591), new mp.Vector3(0, 0, 89.89449)],
    [new mp.Vector3(237.9133, -1198.529, 38.07593), new mp.Vector3(0, 0, 89.92339)],
    [new mp.Vector3(224.4173, -1198.508, 38.07553), new mp.Vector3(0, 0, 89.87978)],
    [new mp.Vector3(210.064, -1198.434, 38.05167), new mp.Vector3(0, 0, 89.62873)],
    [new mp.Vector3(196.0204, -1198.333, 38.04545), new mp.Vector3(0, 0, 90.29121)],
    [new mp.Vector3(181.6744, -1198.561, 38.04579), new mp.Vector3(0, 0, 91.88618)],
    [new mp.Vector3(167.4393, -1199.382, 37.81658), new mp.Vector3(0, 0, 94.23845)],
    [new mp.Vector3(153.9431, -1200.487, 37.786), new mp.Vector3(0, 0, 94.88216)],
    [new mp.Vector3(139.7796, -1201.697, 37.70451), new mp.Vector3(0, 0, 94.88498)],
    [new mp.Vector3(125.528, -1202.861, 37.68643), new mp.Vector3(0, 0, 95.03436)],
    [new mp.Vector3(111.4925, -1204.06, 37.6262), new mp.Vector3(0, 0, 95.3315)],
    [new mp.Vector3(97.16744, -1205.491, 37.54885), new mp.Vector3(0, 0, 95.83097)],
    [new mp.Vector3(83.73117, -1206.808, 37.54823), new mp.Vector3(0, 0, 95.2812)],
    [new mp.Vector3(69.65681, -1208.103, 37.54863), new mp.Vector3(0, 0, 95.25295)],
    [new mp.Vector3(55.41857, -1209.363, 37.54892), new mp.Vector3(0, 0, 94.80215)],
    [new mp.Vector3(41.14056, -1210.288, 37.54917), new mp.Vector3(0, 0, 93.46626)],
    [new mp.Vector3(26.83055, -1210.907, 37.54898), new mp.Vector3(0, 0, 90.58512)],
    [new mp.Vector3(13.37002, -1211.028, 37.54903), new mp.Vector3(0, 0, 90.71378)],
    [new mp.Vector3(-0.951403, -1211.21, 37.55368), new mp.Vector3(0, 0, 90.52789)],
    [new mp.Vector3(-15.39806, -1211.087, 37.55263), new mp.Vector3(0, 0, 89.27956)],
    [new mp.Vector3(-29.54592, -1211.127, 37.55096), new mp.Vector3(0, 0, 89.55156)],
    [new mp.Vector3(-43.06816, -1211.117, 37.55165), new mp.Vector3(0, 0, 90.17466)],
    [new mp.Vector3(-57.31823, -1211.109, 37.5511), new mp.Vector3(0, 0, 90.19061)],
    [new mp.Vector3(-71.66361, -1211.101, 37.55068), new mp.Vector3(0, 0, 90.1143)],
    [new mp.Vector3(-85.97974, -1211.136, 37.55012), new mp.Vector3(0, 0, 90.14845)],
    [new mp.Vector3(-99.43776, -1211.289, 37.54982), new mp.Vector3(0, 0, 89.93324)],
    [new mp.Vector3(-113.7482, -1211.154, 37.5493), new mp.Vector3(0, 0, 89.15824)],
    [new mp.Vector3(-127.8558, -1211.211, 37.54906), new mp.Vector3(0, 0, 90.90626)],
    [new mp.Vector3(-142.2191, -1211.441, 37.54945), new mp.Vector3(0, 0, 90.96201)],
    [new mp.Vector3(-155.8642, -1211.767, 37.54985), new mp.Vector3(0, 0, 91.85352)],
    [new mp.Vector3(-169.9147, -1212.225, 37.55037), new mp.Vector3(0, 0, 91.87717)],
    [new mp.Vector3(-184.214, -1212.432, 37.55084), new mp.Vector3(0, 0, 90.17541)],
    [new mp.Vector3(-198.365, -1212.433, 37.55071), new mp.Vector3(0, 0, 89.39252)],
    [new mp.Vector3(-212.7033, -1212.303, 37.55062), new mp.Vector3(0, 0, 89.52988)],
    [new mp.Vector3(-226.9522, -1212.345, 37.55054), new mp.Vector3(0, 0, 90.58813)],
    [new mp.Vector3(-240.6192, -1212.488, 37.55047), new mp.Vector3(0, 0, 90.46249)],
    [new mp.Vector3(-254.8514, -1212.349, 37.55012), new mp.Vector3(0, 0, 89.53349)],
    [new mp.Vector3(-269.08, -1212.509, 37.54724), new mp.Vector3(0, 0, 90.46215)],
    [new mp.Vector3(-283.2756, -1212.573, 37.47083), new mp.Vector3(0, 0, 89.8743)],
    [new mp.Vector3(-297.4328, -1212.577, 36.74913), new mp.Vector3(0, 0, 90.17141)],
    [new mp.Vector3(-311.1375, -1212.553, 35.54831), new mp.Vector3(0, 0, 90.02811)],
    [new mp.Vector3(-325.3466, -1212.576, 34.01378), new mp.Vector3(0, 0, 90.1693)],
    [new mp.Vector3(-339.6647, -1212.537, 32.28575), new mp.Vector3(0, 0, 89.92075)],
    [new mp.Vector3(-353.9258, -1212.519, 30.18618), new mp.Vector3(0, 0, 89.94316)],
    [new mp.Vector3(-367.5207, -1212.503, 28.69672), new mp.Vector3(0, 0, 89.93384)],
    [new mp.Vector3(-381.7604, -1212.533, 28.36279), new mp.Vector3(0, 0, 90.30879)],
    [new mp.Vector3(-396.0885, -1212.537, 28.27078), new mp.Vector3(0, 0, 89.82144)],
    [new mp.Vector3(-409.7191, -1212.541, 28.10312), new mp.Vector3(0, 0, 90.15437)],
    [new mp.Vector3(-423.9966, -1212.581, 27.94659), new mp.Vector3(0, 0, 90.16034)],
    [new mp.Vector3(-438.337, -1212.731, 27.85928), new mp.Vector3(0, 0, 90.82684)],
    [new mp.Vector3(-452.6107, -1212.665, 28.4134), new mp.Vector3(0, 0, 89.71564)],
    [new mp.Vector3(-466.2531, -1212.562, 29.20734), new mp.Vector3(0, 0, 89.93544)],
    [new mp.Vector3(-480.4027, -1213.244, 29.1976), new mp.Vector3(0, 0, 94.71483)],
    [new mp.Vector3(-494.2198, -1215.891, 28.37913), new mp.Vector3(0, 0, 109.1583)],
    [new mp.Vector3(-507.1333, -1221.938, 27.63536), new mp.Vector3(0, 0, 121.8004)],
    [new mp.Vector3(-517.4779, -1230.605, 26.83834), new mp.Vector3(0, 0, 134.7472)],
    [new mp.Vector3(-526.3635, -1241.429, 26.24191), new mp.Vector3(0, 0, 145.3896)],
    [new mp.Vector3(-533.0046, -1253.881, 25.91915), new mp.Vector3(0, 0, 156.2023)],
    // Puerto del sol
    [new mp.Vector3(-538.7817, -1266.887, 25.90531), new mp.Vector3(0, 0, 156.042)],
    [new mp.Vector3(-544.496, -1279.692, 25.90531), new mp.Vector3(0, 0, 155.8386)],
    [new mp.Vector3(-550.4051, -1292.515, 25.90638), new mp.Vector3(0, 0, 155.9038)],
    [new mp.Vector3(-555.8174, -1304.85, 25.90485), new mp.Vector3(0, 0, 155.8233)],
    [new mp.Vector3(-561.8311, -1317.759, 25.74596), new mp.Vector3(0, 0, 155.3231)],
    [new mp.Vector3(-567.7485, -1330.848, 24.80543), new mp.Vector3(0, 0, 155.7041)],
    [new mp.Vector3(-573.6837, -1343.704, 23.64172), new mp.Vector3(0, 0, 154.2561)],
    [new mp.Vector3(-579.4534, -1356.161, 22.84622), new mp.Vector3(0, 0, 156.1099)],
    [new mp.Vector3(-585.2775, -1369.215, 22.26621), new mp.Vector3(0, 0, 155.6989)],
    [new mp.Vector3(-591.1251, -1382.011, 21.61056), new mp.Vector3(0, 0, 155.2466)],
    [new mp.Vector3(-596.8768, -1395.128, 20.90313), new mp.Vector3(0, 0, 156.5293)],
    [new mp.Vector3(-602.5448, -1407.51, 20.32056), new mp.Vector3(0, 0, 154.5496)],
    [new mp.Vector3(-608.2969, -1420.47, 19.70382), new mp.Vector3(0, 0, 156.7789)],
    [new mp.Vector3(-613.994, -1433.588, 19.03942), new mp.Vector3(0, 0, 156.4989)],
    [new mp.Vector3(-619.0232, -1446.926, 18.28793), new mp.Vector3(0, 0, 161.3094)],
    [new mp.Vector3(-622.1743, -1460.509, 17.41942), new mp.Vector3(0, 0, 171.0405)],
    [new mp.Vector3(-623.3378, -1474.107, 16.89806), new mp.Vector3(0, 0, 178.327)],
    [new mp.Vector3(-623.2994, -1488.457, 16.37091), new mp.Vector3(0, 0, -178.5475)],
    [new mp.Vector3(-622.9752, -1502.684, 15.78009), new mp.Vector3(0, 0, -178.9184)],
    [new mp.Vector3(-622.7108, -1516.889, 15.15431), new mp.Vector3(0, 0, -178.9369)],
    [new mp.Vector3(-622.4576, -1530.473, 14.52311), new mp.Vector3(0, 0, -178.725)],
    [new mp.Vector3(-621.9871, -1544.699, 14.01891), new mp.Vector3(0, 0, -177.1778)],
    [new mp.Vector3(-621.3616, -1558.927, 13.49221), new mp.Vector3(0, 0, -177.9435)],
    [new mp.Vector3(-621.7499, -1569.896, 13.28902), new mp.Vector3(0, 0, 175.1995)],
    [new mp.Vector3(-622.5788, -1579.362, 13.2158), new mp.Vector3(0, 0, 174.9451)],
    [new mp.Vector3(-623.2148, -1588.958, 13.2158), new mp.Vector3(0, 0, 176.9387)],
    [new mp.Vector3(-623.7079, -1597.966, 13.21843), new mp.Vector3(0, 0, 173.6425)],
    [new mp.Vector3(-625.8238, -1607.26, 13.21927), new mp.Vector3(0, 0, 160.9215)],
    [new mp.Vector3(-629.4496, -1615.993, 13.29354), new mp.Vector3(0, 0, 151.6174)],
    [new mp.Vector3(-634.2633, -1624.076, 12.74312), new mp.Vector3(0, 0, 150.7365)],
    [new mp.Vector3(-638.55, -1632.042, 11.95121), new mp.Vector3(0, 0, 150.1392)],
    [new mp.Vector3(-643.3856, -1640.355, 11.10918), new mp.Vector3(0, 0, 149.3422)],
    [new mp.Vector3(-648.2446, -1648.537, 10.27999), new mp.Vector3(0, 0, 149.9456)],
    [new mp.Vector3(-653.0596, -1656.86, 9.439087), new mp.Vector3(0, 0, 149.6962)],
    [new mp.Vector3(-657.7911, -1665.074, 8.61031), new mp.Vector3(0, 0, 150.0056)],
    [new mp.Vector3(-662.2897, -1672.89, 7.829356), new mp.Vector3(0, 0, 150.0577)],
    [new mp.Vector3(-667.085, -1681.149, 6.993852), new mp.Vector3(0, 0, 149.8966)],
    [new mp.Vector3(-671.8787, -1689.473, 6.390306), new mp.Vector3(0, 0, 149.8206)],
    [new mp.Vector3(-676.4536, -1697.377, 6.166947), new mp.Vector3(0, 0, 149.513)],
    [new mp.Vector3(-681.2186, -1705.56, 5.419469), new mp.Vector3(0, 0, 149.8528)],
    [new mp.Vector3(-686.0735, -1713.802, 4.582475), new mp.Vector3(0, 0, 149.725)],
    [new mp.Vector3(-690.8431, -1721.972, 3.755001), new mp.Vector3(0, 0, 149.5508)],
    [new mp.Vector3(-695.533, -1730.19, 2.926877), new mp.Vector3(0, 0, 150.1683)],
    [new mp.Vector3(-700.2752, -1738.54, 2.086572), new mp.Vector3(0, 0, 150.4598)],
    [new mp.Vector3(-704.7808, -1746.281, 1.303171), new mp.Vector3(0, 0, 149.4051)],
    [new mp.Vector3(-709.6571, -1754.537, 0.464299), new mp.Vector3(0, 0, 149.4399)],
    [new mp.Vector3(-714.5, -1762.761, -0.3700458), new mp.Vector3(0, 0, 148.9277)],
    [new mp.Vector3(-719.163, -1770.976, -0.652744), new mp.Vector3(0, 0, 151.1731)],
    [new mp.Vector3(-723.3019, -1779.198, -0.6533217), new mp.Vector3(0, 0, 156.7238)],
    [new mp.Vector3(-726.2556, -1788.108, -0.6532798), new mp.Vector3(0, 0, 165.8359)],
    [new mp.Vector3(-727.9261, -1797.543, -0.6532794), new mp.Vector3(0, 0, 174.1864)],
    [new mp.Vector3(-728.1649, -1806.999, -0.6484544), new mp.Vector3(0, 0, 179.9392)],
    [new mp.Vector3(-728.1497, -1816.504, -0.648358), new mp.Vector3(0, 0, -179.3803)],
    [new mp.Vector3(-728.1522, -1825.648, -0.6483544), new mp.Vector3(0, 0, 179.8306)],
    [new mp.Vector3(-728.1686, -1835.138, -0.7276766), new mp.Vector3(0, 0, -178.5158)],
    [new mp.Vector3(-728.1473, -1844.806, -1.457413), new mp.Vector3(0, 0, 179.2608)],
    [new mp.Vector3(-728.1187, -1853.797, -2.246725), new mp.Vector3(0, 0, -179.6673)],
    [new mp.Vector3(-728.1483, -1863.397, -3.084321), new mp.Vector3(0, 0, 179.9865)],
    [new mp.Vector3(-728.157, -1872.943, -3.922501), new mp.Vector3(0, 0, 179.8617)],
    [new mp.Vector3(-728.1237, -1882.39, -4.747861), new mp.Vector3(0, 0, -179.9629)],
    [new mp.Vector3(-728.0924, -1892.019, -5.407009), new mp.Vector3(0, 0, -179.6385)],
    [new mp.Vector3(-728.0668, -1901.039, -5.955492), new mp.Vector3(0, 0, -179.7648)],
    [new mp.Vector3(-727.9896, -1910.562, -6.790779), new mp.Vector3(0, 0, -179.821)],
    [new mp.Vector3(-728.0252, -1920.157, -7.6305), new mp.Vector3(0, 0, 178.5358)],
    [new mp.Vector3(-728.0699, -1929.71, -8.469806), new mp.Vector3(0, 0, -179.8154)],
    [new mp.Vector3(-728.038, -1939.196, -9.295041), new mp.Vector3(0, 0, -179.109)],
    [new mp.Vector3(-727.9419, -1948.313, -10.07091), new mp.Vector3(0, 0, -179.603)],
    [new mp.Vector3(-728.1555, -1957.838, -10.25021), new mp.Vector3(0, 0, 174.8)],
    [new mp.Vector3(-729.4819, -1967.326, -10.25019), new mp.Vector3(0, 0, 169.0194)],
    [new mp.Vector3(-731.4504, -1976.127, -10.25019), new mp.Vector3(0, 0, 164.5923)],
    [new mp.Vector3(-734.6556, -1985.084, -10.24827), new mp.Vector3(0, 0, 159.2855)],
    [new mp.Vector3(-737.9464, -1994.045, -10.2483), new mp.Vector3(0, 0, 159.8074)],
    [new mp.Vector3(-741.1957, -2003.042, -10.24831), new mp.Vector3(0, 0, 159.5415)],
    [new mp.Vector3(-744.3649, -2011.515, -10.2483), new mp.Vector3(0, 0, 160.0344)],
    [new mp.Vector3(-747.5887, -2020.585, -10.24827), new mp.Vector3(0, 0, 160.3724)],
    [new mp.Vector3(-750.7961, -2029.596, -10.24827), new mp.Vector3(0, 0, 160.2893)],
    [new mp.Vector3(-753.8852, -2038.217, -10.24827), new mp.Vector3(0, 0, 158.9772)],
    [new mp.Vector3(-757.2416, -2047.091, -10.24827), new mp.Vector3(0, 0, 160.1964)],
    [new mp.Vector3(-760.5167, -2056.122, -10.24829), new mp.Vector3(0, 0, 160.0745)],
    [new mp.Vector3(-763.4939, -2064.094, -10.24829), new mp.Vector3(0, 0, 159.8655)],
    [new mp.Vector3(-766.5988, -2072.617, -10.24829), new mp.Vector3(0, 0, 160.2356)],
    [new mp.Vector3(-769.2896, -2081.747, -10.24832), new mp.Vector3(0, 0, 168.7078)],
    [new mp.Vector3(-770.7363, -2091.064, -10.24832), new mp.Vector3(0, 0, 175.7916)],
    [new mp.Vector3(-770.6175, -2100.627, -10.24832), new mp.Vector3(0, 0, -174.7464)],
    [new mp.Vector3(-769.6794, -2110.051, -10.24832), new mp.Vector3(0, 0, -174.3693)],
    [new mp.Vector3(-769.241, -2119.17, -10.24832), new mp.Vector3(0, 0, 176.2899)],
    [new mp.Vector3(-770.7723, -2128.65, -10.24832), new mp.Vector3(0, 0, 165.649)],
    [new mp.Vector3(-773.6732, -2137.227, -9.918333), new mp.Vector3(0, 0, 160.413)],
    [new mp.Vector3(-776.9138, -2146.223, -9.078621), new mp.Vector3(0, 0, 159.8874)],
    [new mp.Vector3(-780.1353, -2155.189, -8.243906), new mp.Vector3(0, 0, 159.22)],
    [new mp.Vector3(-783.4507, -2164.056, -7.846486), new mp.Vector3(0, 0, 159.8793)],
    [new mp.Vector3(-786.7354, -2172.995, -7.847242), new mp.Vector3(0, 0, 160.4933)],
    [new mp.Vector3(-789.7716, -2181.523, -7.847243), new mp.Vector3(0, 0, 159.6879)],
    [new mp.Vector3(-793.0356, -2190.373, -7.847232), new mp.Vector3(0, 0, 158.5136)],
    [new mp.Vector3(-797.2972, -2198.91, -7.847269), new mp.Vector3(0, 0, 151.5217)],
    [new mp.Vector3(-802.9112, -2206.638, -7.847332), new mp.Vector3(0, 0, 137.801)],
    [new mp.Vector3(-809.4297, -2212.784, -7.885751), new mp.Vector3(0, 0, 129.7525)],
    [new mp.Vector3(-816.7079, -2219.067, -8.588351), new mp.Vector3(0, 0, 130.7975)],
    [new mp.Vector3(-823.9598, -2225.268, -9.425574), new mp.Vector3(0, 0, 129.5903)],
    [new mp.Vector3(-831.3735, -2231.379, -10.26423), new mp.Vector3(0, 0, 130.4109)],
    [new mp.Vector3(-838.316, -2237.261, -11.06381), new mp.Vector3(0, 0, 130.0005)],
    [new mp.Vector3(-845.6611, -2243.431, -11.90115), new mp.Vector3(0, 0, 129.576)],
    [new mp.Vector3(-852.949, -2249.536, -12.57879), new mp.Vector3(0, 0, 129.9236)],
    [new mp.Vector3(-860.1627, -2255.554, -12.64715), new mp.Vector3(0, 0, 131.2055)],
    [new mp.Vector3(-866.8004, -2261.933, -12.64715), new mp.Vector3(0, 0, 138.6447)],
    [new mp.Vector3(-872.4454, -2269.605, -12.64715), new mp.Vector3(0, 0, 147.7758)],
    [new mp.Vector3(-876.4447, -2278.223, -12.63261), new mp.Vector3(0, 0, 156.6919)],
    [new mp.Vector3(-879.5802, -2286.689, -12.63234), new mp.Vector3(0, 0, 161.2428)],
    // LSIA Parking
    [new mp.Vector3(-882.8634, -2295.68, -12.63234), new mp.Vector3(0, 0, 160.6883)],
    [new mp.Vector3(-886.0571, -2304.688, -12.62874), new mp.Vector3(0, 0, 160.029)],
    [new mp.Vector3(-889.1244, -2313.244, -12.62323), new mp.Vector3(0, 0, 159.8327)],
    [new mp.Vector3(-892.6039, -2322.29, -12.61732), new mp.Vector3(0, 0, 159.1204)],
    [new mp.Vector3(-895.9519, -2331.271, -12.61147), new mp.Vector3(0, 0, 159.9204)],
    [new mp.Vector3(-899.1395, -2339.846, -12.60589), new mp.Vector3(0, 0, 159.3382)],
    [new mp.Vector3(-902.2628, -2348.89, -12.62011), new mp.Vector3(0, 0, 161.2325)],
    [new mp.Vector3(-905.3439, -2357.97, -12.63241), new mp.Vector3(0, 0, 161.4661)],
    [new mp.Vector3(-907.5562, -2366.678, -12.6472), new mp.Vector3(0, 0, 170.8335)],
    [new mp.Vector3(-908.3047, -2376.048, -12.54402), new mp.Vector3(0, 0, 179.7219)],
    [new mp.Vector3(-907.2742, -2385.603, -12.64721), new mp.Vector3(0, 0, -171.4893)],
    [new mp.Vector3(-905.5947, -2395.039, -12.64714), new mp.Vector3(0, 0, -167.4329)],
    [new mp.Vector3(-903.2054, -2403.692, -12.64726), new mp.Vector3(0, 0, -156.1795)],
    [new mp.Vector3(-899.1915, -2412.307, -12.64713), new mp.Vector3(0, 0, -151.5829)],
    [new mp.Vector3(-893.8591, -2420.272, -12.64713), new mp.Vector3(0, 0, -142.6854)],
    [new mp.Vector3(-888.3887, -2427.692, -12.65208), new mp.Vector3(0, 0, -147.749)],
    [new mp.Vector3(-884.083, -2436.09, -12.65208), new mp.Vector3(0, 0, -155.8391)],
    [new mp.Vector3(-881.3093, -2445.147, -12.65222), new mp.Vector3(0, 0, -170.3266)],
    [new mp.Vector3(-880.1772, -2454.162, -12.6521), new mp.Vector3(0, 0, -176.9019)],
    [new mp.Vector3(-880.7078, -2463.6, -12.6521), new mp.Vector3(0, 0, 170.1522)],
    [new mp.Vector3(-882.9796, -2472.948, -12.65223), new mp.Vector3(0, 0, 164.0114)],
    [new mp.Vector3(-886.1, -2481.527, -12.50944), new mp.Vector3(0, 0, 157.8985)],
    [new mp.Vector3(-889.4626, -2490.533, -11.80753), new mp.Vector3(0, 0, 160.5103)],
    [new mp.Vector3(-892.585, -2499.539, -10.97417), new mp.Vector3(0, 0, 159.4751)],
    [new mp.Vector3(-895.7404, -2508.069, -10.17769), new mp.Vector3(0, 0, 161.1661)],
    [new mp.Vector3(-898.9484, -2517.121, -9.338026), new mp.Vector3(0, 0, 159.0975)],
    [new mp.Vector3(-902.2377, -2526.061, -8.511462), new mp.Vector3(0, 0, 159.6783)],
    [new mp.Vector3(-905.3666, -2534.62, -8.324384), new mp.Vector3(0, 0, 159.9941)],
    [new mp.Vector3(-908.6567, -2543.572, -8.324448), new mp.Vector3(0, 0, 159.997)],
    [new mp.Vector3(-911.9344, -2552.536, -8.324455), new mp.Vector3(0, 0, 159.2072)],
    [new mp.Vector3(-915.3282, -2561.177, -8.329139), new mp.Vector3(0, 0, 156.4242)],
    [new mp.Vector3(-919.7344, -2569.606, -8.329374), new mp.Vector3(0, 0, 149.041)],
    [new mp.Vector3(-925.8411, -2576.951, -8.329462), new mp.Vector3(0, 0, 134.8068)],
    [new mp.Vector3(-932.4826, -2583.1, -8.324579), new mp.Vector3(0, 0, 129.9243)],
    [new mp.Vector3(-939.823, -2589.205, -8.324463), new mp.Vector3(0, 0, 128.963)],
    [new mp.Vector3(-946.8525, -2595.154, -8.324456), new mp.Vector3(0, 0, 130.0054)],
    [new mp.Vector3(-954.2759, -2601.281, -8.32447), new mp.Vector3(0, 0, 129.888)],
    [new mp.Vector3(-961.3879, -2607.224, -8.324473), new mp.Vector3(0, 0, 129.838)],
    [new mp.Vector3(-968.7535, -2613.427, -8.324468), new mp.Vector3(0, 0, 129.4312)],
    [new mp.Vector3(-976.0943, -2619.569, -8.324474), new mp.Vector3(0, 0, 130.1511)],
    [new mp.Vector3(-983.1698, -2625.365, -8.324495), new mp.Vector3(0, 0, 129.3745)],
    [new mp.Vector3(-990.481, -2631.391, -8.324482), new mp.Vector3(0, 0, 129.7823)],
    [new mp.Vector3(-997.7936, -2637.662, -8.324482), new mp.Vector3(0, 0, 131.3895)],
    [new mp.Vector3(-1004.656, -2643.656, -8.324494), new mp.Vector3(0, 0, 129.2699)],
    [new mp.Vector3(-1012.212, -2649.564, -8.326426), new mp.Vector3(0, 0, 125.3472)],
    [new mp.Vector3(-1020.484, -2654.414, -8.326426), new mp.Vector3(0, 0, 118.3551)],
    [new mp.Vector3(-1028.598, -2658.255, -8.326426), new mp.Vector3(0, 0, 110.8975)],
    [new mp.Vector3(-1037.744, -2661.677, -8.324459), new mp.Vector3(0, 0, 109.8009)],
    [new mp.Vector3(-1046.137, -2665.349, -8.324459), new mp.Vector3(0, 0, 117.8718)],
    [new mp.Vector3(-1054.059, -2670.51, -8.324459), new mp.Vector3(0, 0, 131.5517)],
    [new mp.Vector3(-1061.056, -2677.046, -8.310036), new mp.Vector3(0, 0, 135.8785)],
    [new mp.Vector3(-1067.228, -2684.299, -8.299608), new mp.Vector3(0, 0, 141.1641)],
    [new mp.Vector3(-1072.9, -2691.474, -8.282819), new mp.Vector3(0, 0, 140.7394)],
    [new mp.Vector3(-1079.108, -2698.737, -8.288653), new mp.Vector3(0, 0, 140.0517)],
    // LSIA Terminal 4
    [new mp.Vector3(-1085.22, -2705.979, -8.294448), new mp.Vector3(0, 0, 139.8856)],
    [new mp.Vector3(-1091.058, -2712.991, -8.299978), new mp.Vector3(0, 0, 137.9385)],
    [new mp.Vector3(-1097.281, -2720.156, -8.305744), new mp.Vector3(0, 0, 140.3962)],
    [new mp.Vector3(-1103.361, -2727.503, -8.309699), new mp.Vector3(0, 0, 140.4957)],
    [new mp.Vector3(-1109.28, -2734.851, -8.30969), new mp.Vector3(0, 0, 141.2518)],
    [new mp.Vector3(-1115.27, -2742.208, -8.309777), new mp.Vector3(0, 0, 139.8579)],
    [new mp.Vector3(-1121.375, -2749.227, -8.325166), new mp.Vector3(0, 0, 136.9164)],
    [new mp.Vector3(-1128.398, -2755.561, -8.323412), new mp.Vector3(0, 0, 128.2093)],
    [new mp.Vector3(-1135.535, -2761.459, -8.321616), new mp.Vector3(0, 0, 134.925)],
    [new mp.Vector3(-1142.132, -2768.378, -8.323524), new mp.Vector3(0, 0, 137.4847)],
    [new mp.Vector3(-1148.821, -2774.531, -8.323555), new mp.Vector3(0, 0, 124.0747)],
    [new mp.Vector3(-1156.817, -2779.797, -8.323556), new mp.Vector3(0, 0, 119.6098)],
    [new mp.Vector3(-1165.601, -2783.378, -8.323553), new mp.Vector3(0, 0, 111.4875)],
    [new mp.Vector3(-1174.646, -2786.074, -8.323532), new mp.Vector3(0, 0, 100.2563)],
    [new mp.Vector3(-1183.566, -2787.103, -8.323529), new mp.Vector3(0, 0, 91.16122)],
    [new mp.Vector3(-1193.195, -2786.595, -8.323529), new mp.Vector3(0, 0, 82.90005)],
    [new mp.Vector3(-1202.262, -2785.786, -8.323527), new mp.Vector3(0, 0, 83.25213)],
    [new mp.Vector3(-1211.838, -2785.814, -8.323525), new mp.Vector3(0, 0, 95.77107)],
    [new mp.Vector3(-1221.184, -2787.687, -8.323525), new mp.Vector3(0, 0, 102.9219)],
    [new mp.Vector3(-1229.564, -2790.765, -8.323546), new mp.Vector3(0, 0, 119.3026)],
    [new mp.Vector3(-1237.7, -2796.038, -8.323546), new mp.Vector3(0, 0, 123.5821)],
    [new mp.Vector3(-1244.457, -2801.901, -8.323546), new mp.Vector3(0, 0, 139.1275)],
    [new mp.Vector3(-1250.34, -2809.474, -8.323575), new mp.Vector3(0, 0, 145.9216)],
    [new mp.Vector3(-1254.939, -2817.857, -8.323575), new mp.Vector3(0, 0, 154.4679)],
    [new mp.Vector3(-1257.647, -2826.33, -8.323576), new mp.Vector3(0, 0, 167.0655)],
    [new mp.Vector3(-1259.025, -2835.886, -8.323603), new mp.Vector3(0, 0, 178.4473)],
    [new mp.Vector3(-1258.65, -2845.458, -8.323603), new mp.Vector3(0, 0, -175.0196)],
    [new mp.Vector3(-1256.528, -2854.176, -8.323605), new mp.Vector3(0, 0, -163.4209)],
    [new mp.Vector3(-1253.203, -2863.106, -8.32363), new mp.Vector3(0, 0, -151.3452)],
    [new mp.Vector3(-1248.149, -2870.705, -8.32363), new mp.Vector3(0, 0, -143.6364)],
    [new mp.Vector3(-1241.916, -2877.762, -8.32363), new mp.Vector3(0, 0, -134.4224)],
    [new mp.Vector3(-1234.653, -2884.072, -8.32363), new mp.Vector3(0, 0, -129.1731)],
    [new mp.Vector3(-1227.342, -2890.161, -8.32363), new mp.Vector3(0, 0, -129.7055)],
    [new mp.Vector3(-1219.96, -2896.27, -8.32363), new mp.Vector3(0, 0, -129.6113)],
    [new mp.Vector3(-1212.754, -2901.782, -8.323511), new mp.Vector3(0, 0, -125.8883)],
    [new mp.Vector3(-1204.583, -2906.406, -8.323511), new mp.Vector3(0, 0, -117.2633)],
    [new mp.Vector3(-1195.67, -2909.433, -8.323511), new mp.Vector3(0, 0, -101.7691)],
    [new mp.Vector3(-1186.688, -2910.897, -8.323532), new mp.Vector3(0, 0, -93.51811)],
    [new mp.Vector3(-1177.063, -2910.549, -8.323532), new mp.Vector3(0, 0, -87.27762)],
    [new mp.Vector3(-1168.184, -2908.706, -8.323532), new mp.Vector3(0, 0, -72.6566)],
    [new mp.Vector3(-1159.309, -2905.4, -8.323559), new mp.Vector3(0, 0, -62.08417)],
    [new mp.Vector3(-1151.189, -2900.149, -8.323559), new mp.Vector3(0, 0, -52.91119)],
    [new mp.Vector3(-1144.279, -2894.336, -8.323559), new mp.Vector3(0, 0, -44.76786)],
    [new mp.Vector3(-1138.626, -2886.66, -8.323585), new mp.Vector3(0, 0, -31.45902)],
    [new mp.Vector3(-1134.153, -2878.298, -8.323586), new mp.Vector3(0, 0, -20.67198)],
    [new mp.Vector3(-1131.495, -2869.678, -8.323586), new mp.Vector3(0, 0, -15.10038)],
    [new mp.Vector3(-1130.188, -2860.261, -8.323613), new mp.Vector3(0, 0, -1.148954)],
    [new mp.Vector3(-1130.628, -2851.146, -8.323613), new mp.Vector3(0, 0, 8.500484)],
    [new mp.Vector3(-1132.683, -2841.852, -8.323613), new mp.Vector3(0, 0, 15.87011)],
    [new mp.Vector3(-1135.343, -2832.541, -8.323617), new mp.Vector3(0, 0, 15.06891)],
    [new mp.Vector3(-1136.608, -2823.152, -8.323617), new mp.Vector3(0, 0, 4.17259)],
    [new mp.Vector3(-1136.927, -2814.006, -8.323617), new mp.Vector3(0, 0, -5.725919)],
    [new mp.Vector3(-1135.298, -2805.017, -8.323595), new mp.Vector3(0, 0, -10.50196)],
    [new mp.Vector3(-1132.477, -2795.956, -8.323593), new mp.Vector3(0, 0, -23.08318)],
    [new mp.Vector3(-1128.419, -2787.441, -8.323593), new mp.Vector3(0, 0, -29.68109)],
    [new mp.Vector3(-1123.317, -2779.926, -8.323593), new mp.Vector3(0, 0, -38.30602)],
    [new mp.Vector3(-1117.903, -2772.055, -8.322284), new mp.Vector3(0, 0, -29.26376)],
    [new mp.Vector3(-1113.292, -2763.981, -8.277131), new mp.Vector3(0, 0, -31.98569)],
    [new mp.Vector3(-1107.638, -2756.257, -8.325893), new mp.Vector3(0, 0, -39.74804)],
    [new mp.Vector3(-1101.521, -2749.109, -8.309694), new mp.Vector3(0, 0, -40.91571)],
    [new mp.Vector3(-1095.436, -2741.618, -8.309692), new mp.Vector3(0, 0, -37.58899)],
    [new mp.Vector3(-1089.607, -2734.469, -8.309543), new mp.Vector3(0, 0, -39.79153)],
    [new mp.Vector3(-1086.58, -2730.827, -8.306538), new mp.Vector3(0, 0, -39.77934)],
    [new mp.Vector3(-1086.58, -2730.827, -8.306543), new mp.Vector3(0, 0, -39.77934)],
    [new mp.Vector3(-1086.58, -2730.827, -8.306543), new mp.Vector3(0, 0, -39.77934)]
];
mp.events.add('mostrar_metro', function (parmetro1, parmetro2, parmetro3) {
    parada_real = parmetro1;
    sentido = parmetro2;
    estado = parmetro3;
    mostrarMetro(parmetro1);
});
mp.events.add('salir_metro', function () {
    if (navMetro !== undefined) {
        // Desactivamos el cursor
        mp.gui.cursor.visible = false;
        // Destruimos el navegador
        if (mp.browsers.exists(navMetro))
            navMetro.destroy();
        navMetro = undefined;
    }
    global_metro.cerrarCef();
    if (timer != null) {
        clearInterval(timer);
        timer = null;
    }
    // Volvemos a habilitar el chat
    mp.game.cam.renderScriptCams(false, false, 0, true, false);
    if(tipoMapa != 2) mp.game.ui.displayRadar(true);
    mp.gui.cursor.visible = false;
    mp.gui.chat.show(true);
    if (camara_metro != null) {
        if (camara_metro.doesExist()) {
            camara_metro.setActive(false);
            camara_metro.destroy();
            camara_metro = null;
        }
    }
    if (camara_metro_proxima != null) {
        if (camara_metro_proxima.doesExist()) {
            camara_metro_proxima.setActive(false);
            camara_metro_proxima.destroy();
            camara_metro_proxima = null;
        }
    }
    // Descongelamos al jugador
    mp.events.callRemote('metro_salir');
});
mp.events.add('iniciar_metro', function (parmetro1, parmetro2, parmetro3) {
    parada_real = parmetro1;
    sentido = parmetro2;
    estado = parmetro3;
    //mp.gui.chat.push(parmetro1 + " " + parmetro2 + " " + parmetro3);
    mostrarMetro(parmetro1);
});
// Función que muestra el menu del metro
function mostrarMetro(parada) {
    // Creamos el navegador y mostramos el menu de seleccion de la parada del metro
    global_metro.prepararCef();
    if (sentido == 0)
        global_metro.abrirCef("package://LURP/cef/metro/metro_0.html");
    else
        global_metro.abrirCef("package://LURP/cef/metro/metro_1.html");
    global_metro.enviaraCef("mostrarInfo(\"Coste del ticket 150$\")");
}
// Función que muestra el menu del metro
mp.events.add('iniciarMetro', function (parada) {
    //Correccion de parada por el uso de 2 formularios html para cada sentido
    if (sentido == 1) {
        switch (parada) {
            case 1:
                parada = 19;
                break;
            case 2:
                parada = 18;
                break;
            case 3:
                parada = 17;
                break;
            case 4:
                parada = 16;
                break;
            case 5:
                parada = 15;
                break;
            case 6:
                parada = 14;
                break;
            case 7:
                parada = 13;
                break;
            case 8:
                parada = 12;
                break;
            case 9:
                parada = 11;
                break;
        }
    }
    if (parada_real == parada) {
        global_metro.enviaraCef("mostrarError(Ya te encuentras en esa parada.)");
        return;
    }
    if (estado != 0) {
        global_metro.enviaraCef("mostrarError(La estaci\u00F3n seleccionada se encuentra fuera de servicio en este momento.)");
        return;
    }
    if (parada_real > parada) {
        global_metro.enviaraCef("mostrarError(Para volver atr\u00E1s debes usar las paradas del otro sentido.)");
        return;
    }
    global_metro.cerrarCef();
    // Cambiamos la dimension al jugador
    mp.events.callRemote('metro_dimension');
    navMetro = mp.browsers.new("package://LURP/cef/metro/metro.html");
    mp.players.local.setAlpha(0);
    mp.players.local.freezePosition(true);
    // Volvemos a habilitar el chat
    //mp.game.ui.displayRadar(true);
    //mp.gui.cursor.visible = false;
    //mp.gui.chat.show(true);
    //Para real donde se encuentra
    switch (parada_real) {
        //Sentido Davis
        case 1:
            parada_inicial = 0;
            break;
        case 2:
            parada_inicial = 53;
            break;
        case 3:
            parada_inicial = 162;
            break;
        case 4:
            parada_inicial = 220;
            break;
        case 5:
            parada_inicial = 385;
            break;
        case 6:
            parada_inicial = 455;
            break;
        case 7:
            parada_inicial = 532;
            break;
        case 8:
            parada_inicial = 637;
            break;
        case 9:
            parada_inicial = 697;
            break;
        //Sentido LSIA Terminal 4
        case 10:
            parada_inicial = 0;
            break;
        case 11:
            parada_inicial = 62;
            break;
        case 12:
            parada_inicial = 123;
            break;
        case 13:
            parada_inicial = 227;
            break;
        case 14:
            parada_inicial = 303;
            break;
        case 15:
            parada_inicial = 371;
            break;
        case 16:
            parada_inicial = 533;
            break;
        case 17:
            parada_inicial = 594;
            break;
        case 18:
            parada_inicial = 702;
            break;
    }
    //Parada elegida a ir sentido Davis
    //LSIA Terminal 4
    if (parada == 1)
        if (sentido == 1) {
            parada_final = 756;
        }
    //LSIA Parking
    if (parada == 2)
        if (sentido == 1) {
            parada_final = 702;
        }
        else {
            parada_final = 53;
        }
    //Puerto del sol
    if (parada == 3)
        if (sentido == 1) {
            parada_final = 594;
        }
        else {
            parada_final = 162;
        }
    //Strawberry
    if (parada == 4)
        if (sentido == 1) {
            parada_final = 533;
        }
        else {
            parada_final = 220;
        }
    //Burton
    if (parada == 5)
        if (sentido == 1) {
            parada_final = 371;
        }
        else {
            parada_final = 385;
        }
    //Portola drive
    if (parada == 6)
        if (sentido == 1) {
            parada_final = 303;
        }
        else {
            parada_final = 455;
        }
    //Del perro
    if (parada == 7)
        if (sentido == 1) {
            parada_final = 227;
        }
        else {
            parada_final = 532;
        }
    //Little Seoul
    if (parada == 8)
        if (sentido == 1) {
            parada_final = 123;
        }
        else {
            parada_final = 637;
        }
    //Pillbox South
    if (parada == 9)
        if (sentido == 1) {
            parada_final = 62;
        }
        else {
            parada_final = 697;
        }
    //Davis
    if (parada == 10)
        if (sentido == 0) {
            parada_final = 759;
        }
    //Parada elegida a ir, sentido a LSIA Terminal 4
    //LSIA Terminal 4
    if (parada == 19)
        parada_final = 756;
    //LSIA Parking
    if (parada == 18)
        parada_final = 702;
    //Puerto del sol
    if (parada == 17)
        parada_final = 594;
    //Strawberry
    if (parada == 16)
        parada_final = 533;
    //Burton
    if (parada == 15)
        parada_final = 371;
    //Portola drive
    if (parada == 14)
        parada_final = 303;
    //Del perro
    if (parada == 13)
        parada_final = 227;
    //Little Seoul
    if (parada == 12)
        parada_final = 123;
    //Pillbox South
    if (parada == 11)
        parada_final = 62;
    forzarSalida = false;
    //mp.game.cam.renderScriptCams(true, false, 20000000000000000000000000, true, false);
    bucleMetro();
});
// Bucle continuo pasado una por una cada parada hasta que llegemos al destino
function bucleMetro() {
    if (forzarSalida) {
        clearInterval(timer);
        timer = null;
        if (camara_metro != null) {
            if (camara_metro.doesExist()) {
                camara_metro.setActive(false);
                camara_metro.destroy();
                camara_metro = null;
            }
        }
        if (camara_metro_proxima != null) {
            if (camara_metro_proxima.doesExist()) {
                camara_metro_proxima.setActive(false);
                camara_metro_proxima.destroy();
                camara_metro_proxima = null;
            }
        }
        salirMetro();
        return;
    }
    if (sentido == 0) {
        if (parada_inicial == 33)
            mp.game.graphics.notify("Próxima parada LSIA Parking");
        if (parada_inicial == 52)
            mp.game.graphics.notify("Parada LSIA Parking");
        if (parada_inicial == 142) {
            mp.game.graphics.notify("Próxima parada Puerto del Sol");
            mp.game.graphics.notify("Correspondencia con línea Amarilla de autobús");
            mp.game.graphics.notify("Autoescuela próxima");
        }
        if (parada_inicial == 161) {
            mp.game.graphics.notify("Parada Puerto del Sol");
            mp.game.graphics.notify("Correspondencia con línea Amarilla de autobús");
            mp.game.graphics.notify("Autoescuela próxima");
        }
        if (parada_inicial == 190) {
            mp.game.graphics.notify("Próxima parada Strawberry");
            mp.game.graphics.notify("Correspondencias con líneas Verde, Amarilla, Gris y A4 de autobús");
            mp.game.graphics.notify("Plaza Legion Square próxima");
        }
        if (parada_inicial == 219) {
            mp.game.graphics.notify("Parada Strawberry");
            mp.game.graphics.notify("Correspondencias con líneas Verde, Amarilla, Gris y A4 de autobús");
            mp.game.graphics.notify("Plaza Legion Square próxima");
        }
        if (parada_inicial == 365) {
            mp.game.graphics.notify("Próxima parada Burton");
            mp.game.graphics.notify("Correspondencia con línea Roja de autobús");
            mp.game.graphics.notify("Ayuntamiento próximo");
        }
        if (parada_inicial == 384) {
            mp.game.graphics.notify("Parada Burton");
            mp.game.graphics.notify("Correspondencia con línea Roja de autobús");
            mp.game.graphics.notify("Ayuntamiento próximo");
        }
        if (parada_inicial == 435) {
            mp.game.graphics.notify("Próxima parada Portola Drive");
            mp.game.graphics.notify("Correspondencias con líneas Roja, Centro, Oeste y A3 de autobús");
        }
        if (parada_inicial == 454) {
            mp.game.graphics.notify("Parada Portola Drive");
            mp.game.graphics.notify("Correspondencias con líneas Roja, Centro, Oeste y A3 de autobús");
        }
        if (parada_inicial == 513) {
            mp.game.graphics.notify("Próxima parada Del Perro");
            mp.game.graphics.notify("Correspondencia con línea Roja de autobús");
            mp.game.graphics.notify("Bahama Mamas próximo");
        }
        if (parada_inicial == 532) {
            mp.game.graphics.notify("Parada Del Perro");
            mp.game.graphics.notify("Correspondencia con línea Roja de autobús");
            mp.game.graphics.notify("Bahama Mamas próximo");
        }
        if (parada_inicial == 617)
            mp.game.graphics.notify("Próxima parada Little Seoul");
        if (parada_inicial == 636)
            mp.game.graphics.notify("Parada Little Seoul");
        if (parada_inicial == 677)
            mp.game.graphics.notify("Próxima parada Pillbox South");
        if (parada_inicial == 696)
            mp.game.graphics.notify("Parada Pillbox South");
        if (parada_inicial == 739)
            mp.game.graphics.notify("Próxima parada Davis, final de línea");
        if (parada_inicial == 748)
            mp.game.graphics.notify("Parada Davis, final de línea");
    }
    if (sentido == 1) {
        if (parada_inicial == 42)
            mp.game.graphics.notify("Próxima parada Pillbox South");
        if (parada_inicial == 61)
            mp.game.graphics.notify("Parada Pillbox South");
        if (parada_inicial == 103)
            mp.game.graphics.notify("Próxima parada Little Seoul");
        if (parada_inicial == 122)
            mp.game.graphics.notify("Parada Little Seoul");
        if (parada_inicial == 207) {
            mp.game.graphics.notify("Próxima parada Del Perro");
            mp.game.graphics.notify("Correspondencia con línea Roja de autobús");
            mp.game.graphics.notify("Bahama Mamas próximo");
        }
        if (parada_inicial == 226) {
            mp.game.graphics.notify("Parada Del Perro");
            mp.game.graphics.notify("Correspondencia con línea Roja de autobús");
            mp.game.graphics.notify("Bahama Mamas próximo");
        }
        if (parada_inicial == 283) {
            mp.game.graphics.notify("Próxima parada Portola Drive");
            mp.game.graphics.notify("Correspondencias con líneas Roja, Centro, Oeste y A3 de autobús");
        }
        if (parada_inicial == 292) {
            mp.game.graphics.notify("Parada Portola Drive");
            mp.game.graphics.notify("Correspondencias con líneas Roja, Centro, Oeste y A3 de autobús");
        }
        if (parada_inicial == 351) {
            mp.game.graphics.notify("Próxima parada Burton");
            mp.game.graphics.notify("Correspondencias con línea Roja de autobús");
            mp.game.graphics.notify("Ayuntamiento próximo");
        }
        if (parada_inicial == 360) {
            mp.game.graphics.notify("Parada Burton");
            mp.game.graphics.notify("Correspondencias con línea Roja de autobús");
            mp.game.graphics.notify("Ayuntamiento próximo");
        }
        if (parada_inicial == 513) {
            mp.game.graphics.notify("Próxima parada Strawberry");
            mp.game.graphics.notify("Correspondencias con líneas Verde, Amarilla, Gris y A4 de autobús");
            mp.game.graphics.notify("Plaza Legion Square próxima");
        }
        if (parada_inicial == 522) {
            mp.game.graphics.notify("Parada Strawberry");
            mp.game.graphics.notify("Correspondencias con líneas Verde, Amarilla, Gris y A4 de autobús");
            mp.game.graphics.notify("Plaza Legion Square próxima");
        }
        if (parada_inicial == 574) {
            mp.game.graphics.notify("Próxima parada Puerto del Sol");
            mp.game.graphics.notify("Correspondencias con línea Amarilla de autobús");
            mp.game.graphics.notify("Autoescuela próxima");
        }
        if (parada_inicial == 583) {
            mp.game.graphics.notify("Parada Puerto del Sol");
            mp.game.graphics.notify("Correspondencias con línea Amarilla de autobús");
            mp.game.graphics.notify("Autoescuela próxima");
        }
        if (parada_inicial == 682)
            mp.game.graphics.notify("Próxima parada LSIA Parking");
        if (parada_inicial == 691)
            mp.game.graphics.notify("Parada LSIA Parking");
        if (parada_inicial == 736) {
            mp.game.graphics.notify("Próxima parada LSIA Terminal 4, final de línea");
            mp.game.graphics.notify("Correspondencias con líneas A4 y A3 de autobús");
        }
        if (parada_inicial == 755) {
            mp.game.graphics.notify("Parada LSIA Terminal 4, final de línea");
            mp.game.graphics.notify("Correspondencias con líneas A4 y A3 de autobús");
        }
    }
    //mp.game.cam.renderScriptCams(true, false, 0, true, false);
    if (sentido == 0) {
        mp.players.local.position = posicion_camarasMetro_0[(parada_inicial + 1)][0];
        if (camara_metro != null) {
            if (camara_metro.doesExist()) {
                camara_metro.setActive(false);
                camara_metro.destroy();
                camara_metro = null;
            }
        }
        if (camara_metro_proxima != null) {
            if (camara_metro_proxima.doesExist()) {
                camara_metro_proxima.setActive(false);
                camara_metro_proxima.destroy();
                camara_metro_proxima = null;
            }
        }
        camara_metro = mp.cameras.new("metro", new mp.Vector3(posicion_camarasMetro_0[parada_inicial][0].x, posicion_camarasMetro_0[parada_inicial][0].y, posicion_camarasMetro_0[parada_inicial][0].z + 1), posicion_camarasMetro_0[parada_inicial][1], 40);
        camara_metro.pointAtCoord(posicion_camarasMetro_0[parada_inicial][0].x, posicion_camarasMetro_0[parada_inicial][0].y, posicion_camarasMetro_0[parada_inicial][0].z + 1);
        camara_metro.setActive(true);
        camara_metro_proxima = mp.cameras.new("metro", new mp.Vector3(posicion_camarasMetro_0[(parada_inicial + 1)][0].x, posicion_camarasMetro_0[(parada_inicial + 1)][0].y, posicion_camarasMetro_0[(parada_inicial + 1)][0].z + 1), posicion_camarasMetro_0[(parada_inicial + 1)][1], 40);
        camara_metro_proxima.pointAtCoord(posicion_camarasMetro_0[(parada_inicial + 1)][0].x, posicion_camarasMetro_0[(parada_inicial + 1)][0].y, posicion_camarasMetro_0[(parada_inicial + 1)][0].z + 1);
        camara_metro_proxima.setActiveWithInterp(camara_metro.handle, 500, 0, 0);
        mp.game.cam.renderScriptCams(true, false, 0, true, false);
    }
    else {
        mp.players.local.position = posicion_camarasMetro_1[(parada_inicial + 1)][0];
        if (camara_metro != null) {
            if (camara_metro.doesExist()) {
                camara_metro.setActive(false);
                camara_metro.destroy();
                camara_metro = null;
            }
        }
        if (camara_metro_proxima != null) {
            if (camara_metro_proxima.doesExist()) {
                camara_metro_proxima.setActive(false);
                camara_metro_proxima.destroy();
                camara_metro_proxima = null;
            }
        }
        camara_metro = mp.cameras.new("metro", new mp.Vector3(posicion_camarasMetro_1[parada_inicial][0].x, posicion_camarasMetro_1[parada_inicial][0].y, posicion_camarasMetro_1[parada_inicial][0].z + 1), posicion_camarasMetro_1[parada_inicial][1], 40);
        camara_metro.pointAtCoord(posicion_camarasMetro_1[parada_inicial][0].x, posicion_camarasMetro_1[parada_inicial][0].y, posicion_camarasMetro_1[parada_inicial][0].z + 1);
        camara_metro.setActive(true);
        camara_metro_proxima = mp.cameras.new("metro", new mp.Vector3(posicion_camarasMetro_1[(parada_inicial + 1)][0].x, posicion_camarasMetro_1[(parada_inicial + 1)][0].y, posicion_camarasMetro_1[(parada_inicial + 1)][0].z + 1), posicion_camarasMetro_1[(parada_inicial + 1)][1], 40);
        camara_metro_proxima.pointAtCoord(posicion_camarasMetro_1[(parada_inicial + 1)][0].x, posicion_camarasMetro_1[(parada_inicial + 1)][0].y, posicion_camarasMetro_1[(parada_inicial + 1)][0].z + 1);
        camara_metro_proxima.setActiveWithInterp(camara_metro.handle, 500, 0, 0);
        mp.game.cam.renderScriptCams(true, false, 0, true, false);
    }
    if (parada_inicial == parada_final) {
        if (timer != null) {
            clearInterval(timer);
            timer = null;
        }
        if (camara_metro != null) {
            if (camara_metro.doesExist()) {
                camara_metro.setActive(false);
                camara_metro.destroy();
                camara_metro = null;
            }
        }
        if (camara_metro_proxima != null) {
            if (camara_metro_proxima.doesExist()) {
                camara_metro_proxima.setActive(false);
                camara_metro_proxima.destroy();
                camara_metro_proxima = null;
            }
        }
        salirMetro();
        mp.events.callRemote('metro_parada', parada_final);
    }
    else {
        // Comprobamos si existe o no el timer
        if (timer == null && !forzarSalida) {
            timer = setInterval(bucleMetro, 500);
        }
        parada_inicial++;
    }
}
// Función que destruye el menu del metro(botón de salir)
function salirMetro() {
    if (navMetro !== undefined) {
        // Desactivamos el cursor
        mp.gui.cursor.visible = false;
        // Destruimos el navegador
        if (mp.browsers.exists(navMetro))
            navMetro.destroy();
        navMetro = undefined;
    }
    global_metro.cerrarCef();
    if (timer != null) {
        clearInterval(timer);
        timer = null;
    }
    // Volvemos a habilitar el chat
    //mp.game.cam.renderScriptCams(false, false, 0, true, false);
    //mp.game.ui.displayRadar(true);
    //mp.gui.cursor.visible = false;
    //mp.gui.chat.show(true);
    if (camara_metro != null) {
        if (camara_metro.doesExist()) {
            camara_metro.setActive(false);
            camara_metro.destroy();
            camara_metro = null;
        }
    }
    if (camara_metro_proxima != null) {
        if (camara_metro_proxima.doesExist()) {
            camara_metro_proxima.setActive(false);
            camara_metro_proxima.destroy();
            camara_metro_proxima = null;
        }
    }
    mp.players.local.freezePosition(false);
    mp.players.local.setAlpha(255);
    // Descongelamos al jugador
    //mp.events.callRemote('metro_salir');
}
//# sourceMappingURL=metro.js.map
}