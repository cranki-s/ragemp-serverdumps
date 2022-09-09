{
mp.events.add("mascaraspurga:mostrar_menu", function () { mostrar_menu_mascaras() });

const texturas = [[""], ["0", "1", "2", "3"], ["0", "1", "2", "3"], [""], ["0", "1", "2", "3"], ["0", "1", "2", "3"], ["0", "1", "2", "3"], ["0", "1", "2", "3"], ["0", "1", "2"], [""], [""], ["0", "1", "2"], ["0", "1", "2"], [""], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"], ["0", "1", "2", "3"], ["0", "1", "2", "3", "4", "5", "6", "7", "8"], ["0", "1"], ["0", "1"], ["0", "1"], ["0", "1"], ["0", "1"], ["0", "1"], ["0", "1"], ["0", "1"], ["0", "1"], ["0", "1"], [""], ["0", "1", "2", "3", "4"], ["0", "1", "2", "3", "4"], [""], [""], [""], [""], ["0", "1", "2"], [""], [""], [""], [""], ["0", "1"], ["0", "1"], ["0", "1"], ["0", "1"], [""], [""], [""], [""], ["0", "1", "2", "3"], ["0", "1", "2", "3"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], ["0", "1", "2", "3", "4", "5", "6", "7", "8"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], ["0", "1"], ["0", "1", "2", "3", "4", "5", "6", "7", "8"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], [""], ["0", "1", "2"], ["0", "1", "2"], ["0", "1", "2"], ["0", "1", "2"], ["0", "1", "2"], ["0", "1", "2"], ["0", "1", "2"], ["0", "1", "2"], ["0", "1", "2"], ["0", "1", "2"], ["0", "1", "2"], ["0", "1", "2"], ["0", "1", "2"], [""], ["0", "1", "2"], ["0", "1", "2"], ["0", "1", "2"], ["0", "1", "2", "3", "4", "5"], ["0", "1"], ["0", "1", "2"], ["0", "1", "2"], ["0", "1", "2"], ["0", "1", "2"], ["0", "1", "2", "3"], [""], ["0", "1", "2"], ["0", "1", "2"], ["0", "1", "2"], ["0", "1", "2"], ["0", "1", "2", "3", "4"], ["0", "1", "2", "3", "4", "5", "6", "7"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], ["0", "1", "2", "3", "4", "5"], ["0", "1", "2", "3", "4", "5"], ["0", "1", "2", "3", "4", "5"], ["0", "1", "2", "3", "4", "5", "6", "7"], ["0", "1", "2", "3"], ["0", "1", "2", "3", "4", "5"], [""], ["0", "1", "2", "3", "4", "5"], ["0", "1", "2", "3", "4", "5"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"], ["0", "1", "2"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"], [""], [""], ["0", "1", "2"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17"], ["0", "1", "2", "3"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"], ["0", "1", "2", "3"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"], ["0", "1", "2", "3", "4", "5", "6", "7"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"], [""], [""], [""], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16"], [""], [""], [""], [""], [""], [""], [""], [""], ["0", "1", "2", "3"], ["0", "1", "2", "3"], ["0", "1", "2", "3"], ["0", "1", "2", "3"], ["0", "1", "2", "3"], [""], [""], [""], [""], [""], [""], ["0", "1", "2", "3"], [""], [""], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25"], [""], [""], ["0", "1", "2"], [""], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"], ["0", "1", "2", "3"], ["0", "1", "2", "3"], [""], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"], ["0", "1", "2", "3", "4", "5", "6", "7"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"], ["0", "1", "2", "3"], ["0", "1", "2", "3"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"], ["0", "1", "2", "3"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25"], ["0", "1", "2", "3", "4", "5", "6", "7", "8"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19"], [""], [""], [""], [""], [""], [""], ["0", "1", "2"]];

function mostrar_menu_mascaras() {

    let menuMascaras = null;
    let componenteActual = 0;
    let indexElegido = 0;
    let listElegido = [];

    componenteActual = mp.players.local.getDrawableVariation(1);
    
    menuMascaras = crearMenu("Máscaras", "");
    menuMascaras.AddItem(new UIMenuItem("Sin máscara", "", new ItemsCollection([""])));
    for (let i = 1; i < 190; i++) {
        menuMascaras.AddItem(new UIMenuListItem("Máscara " + i, "Precio de la máscara: ~o~300 pp~w~", new ItemsCollection(texturas[i])));
    }

    menuMascaras.ItemSelect.on((item, index) => {

        if (index == 73 || index == 120) {
            mostrarAviso("danger", 4000, "Esta máscara no está disponible");
            return;
        }

        let SQLIDMascaraSeleccionada = 0;

        menuMascaras.Close()

        if (index >= 1 && index <= 50) {
            switch (index) {
                case 1:
                    SQLIDMascaraSeleccionada = 1298;
                    break;
                case 2:
                    SQLIDMascaraSeleccionada = 1299;
                    break;
                case 3:
                    SQLIDMascaraSeleccionada = 1300;
                    break;
                case 4:
                    SQLIDMascaraSeleccionada = 1301;
                    break;
                case 5:
                    SQLIDMascaraSeleccionada = 1302;
                    break;
                case 6:
                    SQLIDMascaraSeleccionada = 1303;
                    break;
                case 7:
                    SQLIDMascaraSeleccionada = 1304;
                    break;
                case 8:
                    SQLIDMascaraSeleccionada = 1305;
                    break;
                case 9:
                    SQLIDMascaraSeleccionada = 1306;
                    break;
                case 10:
                    SQLIDMascaraSeleccionada = 1307;
                    break;
                case 11:
                    SQLIDMascaraSeleccionada = 1308;
                    break;
                case 12:
                    SQLIDMascaraSeleccionada = 1309;
                    break;
                case 13:
                    SQLIDMascaraSeleccionada = 1310;
                    break;
                case 14:
                    SQLIDMascaraSeleccionada = 1311;
                    break;
                case 15:
                    SQLIDMascaraSeleccionada = 1312;
                    break;
                case 16:
                    SQLIDMascaraSeleccionada = 1313;
                    break;
                case 17:
                    SQLIDMascaraSeleccionada = 1314;
                    break;
                case 18:
                    SQLIDMascaraSeleccionada = 1315;
                    break;
                case 19:
                    SQLIDMascaraSeleccionada = 1316;
                    break;
                case 20:
                    SQLIDMascaraSeleccionada = 1317;
                    break;
                case 21:
                    SQLIDMascaraSeleccionada = 1318;
                    break;
                case 22:
                    SQLIDMascaraSeleccionada = 1319;
                    break;
                case 23:
                    SQLIDMascaraSeleccionada = 1320;
                    break;
                case 24:
                    SQLIDMascaraSeleccionada = 1321;
                    break;
                case 25:
                    SQLIDMascaraSeleccionada = 1322;
                    break;
                case 26:
                    SQLIDMascaraSeleccionada = 1323;
                    break;
                case 27:
                    SQLIDMascaraSeleccionada = 1324;
                    break;
                case 28:
                    SQLIDMascaraSeleccionada = 1325;
                    break;
                case 29:
                    SQLIDMascaraSeleccionada = 1326;
                    break;
                case 30:
                    SQLIDMascaraSeleccionada = 1327;
                    break;
                case 31:
                    SQLIDMascaraSeleccionada = 1328;
                    break;
                case 32:
                    SQLIDMascaraSeleccionada = 1329;
                    break;
                case 33:
                    SQLIDMascaraSeleccionada = 1330;
                    break;
                case 34:
                    SQLIDMascaraSeleccionada = 1331;
                    break;
                case 35:
                    SQLIDMascaraSeleccionada = 1332;
                    break;
                case 36:
                    SQLIDMascaraSeleccionada = 1333;
                    break;
                case 37:
                    SQLIDMascaraSeleccionada = 1334;
                    break;
                case 38:
                    SQLIDMascaraSeleccionada = 1335;
                    break;
                case 39:
                    SQLIDMascaraSeleccionada = 1336;
                    break;
                case 40:
                    SQLIDMascaraSeleccionada = 1337;
                    break;
                case 41:
                    SQLIDMascaraSeleccionada = 1338;
                    break;
                case 42:
                    SQLIDMascaraSeleccionada = 1339;
                    break;
                case 43:
                    SQLIDMascaraSeleccionada = 1340;
                    break;
                case 44:
                    SQLIDMascaraSeleccionada = 1341;
                    break;
                case 45:
                    SQLIDMascaraSeleccionada = 1342;
                    break;
                case 46:
                    SQLIDMascaraSeleccionada = 1343;
                    break;
                case 47:
                    SQLIDMascaraSeleccionada = 1344;
                    break;
                case 48:
                    SQLIDMascaraSeleccionada = 1345;
                    break;
                case 49:
                    SQLIDMascaraSeleccionada = 1346;
                    break;
                case 50:
                    SQLIDMascaraSeleccionada = 1347;
                    break;
            }
        }
        if (index >= 51 && index <= 100) {
            switch (index) {
                case 51:
                    SQLIDMascaraSeleccionada = 1348;
                    break;
                case 52:
                    SQLIDMascaraSeleccionada = 1349;
                    break;
                case 53:
                    SQLIDMascaraSeleccionada = 1350;
                    break;
                case 54:
                    SQLIDMascaraSeleccionada = 1351;
                    break;
                case 55:
                    SQLIDMascaraSeleccionada = 1352;
                    break;
                case 56:
                    SQLIDMascaraSeleccionada = 1353;
                    break;
                case 57:
                    SQLIDMascaraSeleccionada = 1354;
                    break;
                case 58:
                    SQLIDMascaraSeleccionada = 1355;
                    break;
                case 59:
                    SQLIDMascaraSeleccionada = 1356;
                    break;
                case 60:
                    SQLIDMascaraSeleccionada = 1357;
                    break;
                case 61:
                    SQLIDMascaraSeleccionada = 1358;
                    break;
                case 62:
                    SQLIDMascaraSeleccionada = 1359;
                    break;
                case 63:
                    SQLIDMascaraSeleccionada = 1360;
                    break;
                case 64:
                    SQLIDMascaraSeleccionada = 1361;
                    break;
                case 65:
                    SQLIDMascaraSeleccionada = 1362;
                    break;
                case 66:
                    SQLIDMascaraSeleccionada = 1363;
                    break;
                case 67:
                    SQLIDMascaraSeleccionada = 1364;
                    break;
                case 68:
                    SQLIDMascaraSeleccionada = 1365;
                    break;
                case 69:
                    SQLIDMascaraSeleccionada = 1366;
                    break;
                case 70:
                    SQLIDMascaraSeleccionada = 1367;
                    break;
                case 71:
                    SQLIDMascaraSeleccionada = 1368;
                    break;
                case 72:
                    SQLIDMascaraSeleccionada = 1369;
                    break;
                case 73:
                    SQLIDMascaraSeleccionada = 0;
                    break;
                case 74:
                    SQLIDMascaraSeleccionada = 1371;
                    break;
                case 75:
                    SQLIDMascaraSeleccionada = 1372;
                    break;
                case 76:
                    SQLIDMascaraSeleccionada = 1373;
                    break;
                case 77:
                    SQLIDMascaraSeleccionada = 1374;
                    break;
                case 78:
                    SQLIDMascaraSeleccionada = 1375;
                    break;
                case 79:
                    SQLIDMascaraSeleccionada = 1376;
                    break;
                case 80:
                    SQLIDMascaraSeleccionada = 1377;
                    break;
                case 81:
                    SQLIDMascaraSeleccionada = 1378;
                    break;
                case 82:
                    SQLIDMascaraSeleccionada = 1379;
                    break;
                case 83:
                    SQLIDMascaraSeleccionada = 1380;
                    break;
                case 84:
                    SQLIDMascaraSeleccionada = 1381;
                    break;
                case 85:
                    SQLIDMascaraSeleccionada = 1382;
                    break;
                case 86:
                    SQLIDMascaraSeleccionada = 1383;
                    break;
                case 87:
                    SQLIDMascaraSeleccionada = 1384;
                    break;
                case 88:
                    SQLIDMascaraSeleccionada = 1385;
                    break;
                case 89:
                    SQLIDMascaraSeleccionada = 1386;
                    break;
                case 90:
                    SQLIDMascaraSeleccionada = 1387;
                    break;
                case 91:
                    SQLIDMascaraSeleccionada = 1388;
                    break;
                case 92:
                    SQLIDMascaraSeleccionada = 1389;
                    break;
                case 93:
                    SQLIDMascaraSeleccionada = 1390;
                    break;
                case 94:
                    SQLIDMascaraSeleccionada = 1391;
                    break;
                case 95:
                    SQLIDMascaraSeleccionada = 1392;
                    break;
                case 96:
                    SQLIDMascaraSeleccionada = 1393;
                    break;
                case 97:
                    SQLIDMascaraSeleccionada = 1394;
                    break;
                case 98:
                    SQLIDMascaraSeleccionada = 1395;
                    break;
                case 99:
                    SQLIDMascaraSeleccionada = 1396;
                    break;
                case 100:
                    SQLIDMascaraSeleccionada = 1397;
                    break;
            }
        }
        if (index >= 101 && index <= 150) {
            switch (index) {
                case 101:
                    SQLIDMascaraSeleccionada = 1398;
                    break;
                case 102:
                    SQLIDMascaraSeleccionada = 1399;
                    break;
                case 103:
                    SQLIDMascaraSeleccionada = 1400;
                    break;
                case 104:
                    SQLIDMascaraSeleccionada = 1401;
                    break;
                case 105:
                    SQLIDMascaraSeleccionada = 1402;
                    break;
                case 106:
                    SQLIDMascaraSeleccionada = 1403;
                    break;
                case 107:
                    SQLIDMascaraSeleccionada = 1404;
                    break;
                case 108:
                    SQLIDMascaraSeleccionada = 1405;
                    break;
                case 109:
                    SQLIDMascaraSeleccionada = 1406;
                    break;
                case 110:
                    SQLIDMascaraSeleccionada = 1407;
                    break;
                case 111:
                    SQLIDMascaraSeleccionada = 1408;
                    break;
                case 112:
                    SQLIDMascaraSeleccionada = 1409;
                    break;
                case 113:
                    SQLIDMascaraSeleccionada = 1410;
                    break;
                case 114:
                    SQLIDMascaraSeleccionada = 1411;
                    break;
                case 115:
                    SQLIDMascaraSeleccionada = 1412;
                    break;
                case 116:
                    SQLIDMascaraSeleccionada = 1413;
                    break;
                case 117:
                    SQLIDMascaraSeleccionada = 1414;
                    break;
                case 118:
                    SQLIDMascaraSeleccionada = 1415;
                    break;
                case 119:
                    SQLIDMascaraSeleccionada = 1416;
                    break;
                case 120:
                    SQLIDMascaraSeleccionada = 0;
                    break;
                case 121:
                    SQLIDMascaraSeleccionada = 1418;
                    break;
                case 122:
                    SQLIDMascaraSeleccionada = 1419;
                    break;
                case 123:
                    SQLIDMascaraSeleccionada = 1420;
                    break;
                case 124:
                    SQLIDMascaraSeleccionada = 1421;
                    break;
                case 125:
                    SQLIDMascaraSeleccionada = 1422;
                    break;
                case 126:
                    SQLIDMascaraSeleccionada = 1423;
                    break;
                case 127:
                    SQLIDMascaraSeleccionada = 1424;
                    break;
                case 128:
                    SQLIDMascaraSeleccionada = 1425;
                    break;
                case 129:
                    SQLIDMascaraSeleccionada = 1426;
                    break;
                case 130:
                    SQLIDMascaraSeleccionada = 1427;
                    break;
                case 131:
                    SQLIDMascaraSeleccionada = 1428;
                    break;
                case 132:
                    SQLIDMascaraSeleccionada = 1429;
                    break;
                case 133:
                    SQLIDMascaraSeleccionada = 1430;
                    break;
                case 134:
                    SQLIDMascaraSeleccionada = 1431;
                    break;
                case 135:
                    SQLIDMascaraSeleccionada = 1432;
                    break;
                case 136:
                    SQLIDMascaraSeleccionada = 1433;
                    break;
                case 137:
                    SQLIDMascaraSeleccionada = 1434;
                    break;
                case 138:
                    SQLIDMascaraSeleccionada = 1435;
                    break;
                case 139:
                    SQLIDMascaraSeleccionada = 1436;
                    break;
                case 140:
                    SQLIDMascaraSeleccionada = 1437;
                    break;
                case 141:
                    SQLIDMascaraSeleccionada = 1438;
                    break;
                case 142:
                    SQLIDMascaraSeleccionada = 1439;
                    break;
                case 143:
                    SQLIDMascaraSeleccionada = 1440;
                    break;
                case 144:
                    SQLIDMascaraSeleccionada = 1441;
                    break;
                case 145:
                    SQLIDMascaraSeleccionada = 1442;
                    break;
                case 146:
                    SQLIDMascaraSeleccionada = 1443;
                    break;
                case 147:
                    SQLIDMascaraSeleccionada = 1444;
                    break;
                case 148:
                    SQLIDMascaraSeleccionada = 1445;
                    break;
                case 149:
                    SQLIDMascaraSeleccionada = 1446;
                    break;
                case 150:
                    SQLIDMascaraSeleccionada = 1447;
                    break;
            }
        }
        if (index >= 151 && index <= 189) {
            switch (index) {
                case 151:
                    SQLIDMascaraSeleccionada = 1448;
                    break;
                case 152:
                    SQLIDMascaraSeleccionada = 1449;
                    break;
                case 153:
                    SQLIDMascaraSeleccionada = 1450;
                    break;
                case 154:
                    SQLIDMascaraSeleccionada = 1451;
                    break;
                case 155:
                    SQLIDMascaraSeleccionada = 1452;
                    break;
                case 156:
                    SQLIDMascaraSeleccionada = 1453;
                    break;
                case 157:
                    SQLIDMascaraSeleccionada = 1454;
                    break;
                case 158:
                    SQLIDMascaraSeleccionada = 1455;
                    break;
                case 159:
                    SQLIDMascaraSeleccionada = 1456;
                    break;
                case 160:
                    SQLIDMascaraSeleccionada = 1457;
                    break;
                case 161:
                    SQLIDMascaraSeleccionada = 1458;
                    break;
                case 162:
                    SQLIDMascaraSeleccionada = 1459;
                    break;
                case 163:
                    SQLIDMascaraSeleccionada = 1460;
                    break;
                case 164:
                    SQLIDMascaraSeleccionada = 1461;
                    break;
                case 165:
                    SQLIDMascaraSeleccionada = 1462;
                    break;
                case 166:
                    SQLIDMascaraSeleccionada = 1463;
                    break;
                case 167:
                    SQLIDMascaraSeleccionada = 1464;
                    break;
                case 168:
                    SQLIDMascaraSeleccionada = 1465;
                    break;
                case 169:
                    SQLIDMascaraSeleccionada = 1466;
                    break;
                case 170:
                    SQLIDMascaraSeleccionada = 1467;
                    break;
                case 171:
                    SQLIDMascaraSeleccionada = 1468;
                    break;
                case 172:
                    SQLIDMascaraSeleccionada = 1469;
                    break;
                case 173:
                    SQLIDMascaraSeleccionada = 1470;
                    break;
                case 174:
                    SQLIDMascaraSeleccionada = 1471;
                    break;
                case 175:
                    SQLIDMascaraSeleccionada = 1472;
                    break;
                case 176:
                    SQLIDMascaraSeleccionada = 1473;
                    break;
                case 177:
                    SQLIDMascaraSeleccionada = 1474;
                    break;
                case 178:
                    SQLIDMascaraSeleccionada = 1475;
                    break;
                case 179:
                    SQLIDMascaraSeleccionada = 1476;
                    break;
                case 180:
                    SQLIDMascaraSeleccionada = 1477;
                    break;
                case 181:
                    SQLIDMascaraSeleccionada = 1478;
                    break;
                case 182:
                    SQLIDMascaraSeleccionada = 1479;
                    break;
                case 183:
                    SQLIDMascaraSeleccionada = 1480;
                    break;
                case 184:
                    SQLIDMascaraSeleccionada = 1481;
                    break;
                case 185:
                    SQLIDMascaraSeleccionada = 1666;
                    break;
                case 186:
                    SQLIDMascaraSeleccionada = 1667;
                    break;
                case 187:
                    SQLIDMascaraSeleccionada = 1668;
                    break;
                case 188:
                    SQLIDMascaraSeleccionada = 1669;
                    break;
                case 189:
                    SQLIDMascaraSeleccionada = 1670;
                    break;  
            }
        }
        if (index >= 196 && index <= 196) {
            switch (index) {
                case 196:
                    SQLIDMascaraSeleccionada = 1940;
                    break;
            }
        }

        if (listElegido[indexElegido] == undefined)
        {
            listElegido[indexElegido] = listElegido[0];
        }

        mp.events.callRemote('mascaraspurga:comprar_mascara', SQLIDMascaraSeleccionada, listElegido[indexElegido]);

        mp.players.local.setComponentVariation(1, 0, 0, 0);

        if (componenteActual != 0)
            mp.players.local.setComponentVariation(1, componenteActual, 0, 0);
    });

    menuMascaras.IndexChange.on((index) => {
        indexElegido = index;

        if (listElegido.hasOwnProperty(indexElegido))
        {
            mp.players.local.setComponentVariation(1, indexElegido, listElegido[indexElegido], 0);
        }
        else
        {
            listElegido[indexElegido] = 0;
            mp.players.local.setComponentVariation(1, indexElegido, 0, 0);
        }    
    });

    menuMascaras.ListChange.on((UIMenuListItem, index) => {
        listElegido[indexElegido] = parseInt(index);

        mp.players.local.setComponentVariation(1, indexElegido, listElegido[indexElegido], 0);
    });

    menuMascaras.MenuClose.on(item => {
        menuMascaras = null;
        mp.players.local.setComponentVariation(1, 0, 0, 0);

        if (componenteActual != 0) 
            mp.players.local.setComponentVariation(1, componenteActual, 0, 0);
    });
}
}