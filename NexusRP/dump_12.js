{
﻿let pedlist = [
    { Name: 'BlackMarket1', Hash: 0xED0CE4C6, Pos: new mp.Vector3(2432.695, 4971.287, 42.34452), Angle: 140.0, cameraRotate: 90.0, label: "Незнакомец" }, // Черный рынок #1
    { Name: 'CrimeQuest', Hash: 0x9D0087A8, Pos: new mp.Vector3(480.9385, -1302.576, 29.24353), Angle: 224.0, cameraRotate: 0.0, label: "" }, // Выдача заданий банды   
    { Name: 'Police', Hash: 368603149, Pos: new mp.Vector3(441.096, -978.8816, 30.6896), Angle: 160.1411, cameraRotate: 15.0, label: "Инспектор" }, // Nancy_Spungen
    { Name: 'Bones_Bulldog', Hash: 1581098148, Pos: new mp.Vector3(454.121, -980.0575, 30.68959), Angle: 86.12, cameraRotate: 0.0, label: "" }, // Bones_Bulldog
    { Name: 'FIBClothes', Hash: 941695432, Pos: new mp.Vector3(148.9854, -758.4742, 242.1517), Angle: 68.02704, cameraRotate: -135.0, label: "Брайн" }, //  Steve_Hain  
    { Name: 'ArmyCraft', Hash: 1925237458, Pos: new mp.Vector3(-2347.958, 3268.936, 32.81076), Angle: 240.8822, cameraRotate: 0.0, label: "Дэвид" }, // Ronny_Pain   
    { Name: 'EMS_Surgeon', Hash: -1306051250, Pos: new mp.Vector3(382.91592, -1404.9241, 32.50493), Angle: 63.11743, cameraRotate: -135.0, label: "" }, // Billy_Bob   EMS	
	{ Name: 'Rashkovsky', Hash: 940330470, Pos: new mp.Vector3(458.7059, -995.118, 25.35196), Angle: 176.8092, cameraRotate: 0.0, label: "" }, // Rashkovsky
	{ Name: 'Muscle_Prisoner', Hash: 1596003233, Pos: new mp.Vector3(459.7471, -1000.333, 24.91329), Angle: 177.2829, cameraRotate: 0.0, label: "" }, // Muscle_Prisoner 
	{ Name: 'Sell_Fish2', Hash: 0x2B6E1BB6, Pos: new mp.Vector3(-269.1514, 2217.938, 129.722), Angle: 140.6279, cameraRotate: 90.0, label: "" }, // Продажа рыбы 2
	{ Name: 'Fish_Rod', Hash: 0xEF154C47, Pos: new mp.Vector3(1535.142, 3778.007, 34.5), Angle: 235.7802, cameraRotate: -90.0, label: "" }, // Магазин удочек
	{ Name: 'Sell_Fish1', Hash: 233415434, Pos: new mp.Vector3(1561.238, 2181.889, 78.9005), Angle: 262.7308, cameraRotate: 180.0, label: "" },//продажа рыбы 1
	{ Name: 'Parking', Hash: 0x5E3DA4A4, Pos: new mp.Vector3(490.5339, -57.70058, 78.2), Angle: 66.66212, cameraRotate: -135.0, label: "Штраф стоянка" },// Чувак на стоянке
	{ Name: 'Bank_NPC1', Hash: 826475330, Pos: new mp.Vector3(148.1068, -1041.578, 29.44), Angle: 337.6359, cameraRotate: 45.0, label: "" }, // Bank NPC1
    { Name: 'Bank_NPC2', Hash: -1280051738, Pos: new mp.Vector3(149.4417, -1042.151, 29.44), Angle: 337.6359, cameraRotate: 45.0, label: "" }, // Bank NPC2
    { Name: 'Bank_NPC3', Hash: 826475330, Pos: new mp.Vector3(-1211.969, -331.9472, 37.86), Angle: 23.93865, cameraRotate: -45.0, label: "" }, // Bank NPC3
    { Name: 'Bank_NPC4', Hash: -1280051738, Pos: new mp.Vector3(-1213.293, -332.6205, 37.86), Angle: 23.93865, cameraRotate: -45.0, label: "" }, // Bank NPC4
    { Name: 'Bank_NPC5', Hash: 826475330, Pos: new mp.Vector3(312.3441, -279.9223, 54.24), Angle: 338.3335, cameraRotate: 45.0, label: "" }, // Bank NPC5
    { Name: 'Bank_NPC6', Hash: -1280051738, Pos: new mp.Vector3(313.7816, -280.4292, 54.24), Angle: 338.3335, cameraRotate: 45.0, label: "" }, // Bank NPC6
    { Name: 'Bank_NPC7', Hash: 826475330, Pos: new mp.Vector3(1176.533, 2708.258, 38.10), Angle: 178.4438, cameraRotate: 0.0, label: "" }, // Bank NPC7
    { Name: 'Bank_NPC8', Hash: -1280051738, Pos: new mp.Vector3(1175.001, 2708.257, 38.10), Angle: 178.4438, cameraRotate: 0.0, label: "" }, // Bank NPC8
    { Name: 'Bank_NPC9', Hash: 826475330, Pos: new mp.Vector3(-110.1725, 6468.931, 31.70), Angle: 128.8161, cameraRotate: 90.0, label: "" }, // Bank NPC9
    { Name: 'Bank_NPC10', Hash: -1280051738, Pos: new mp.Vector3(-112.3225, 6471.084, 31.70), Angle: 128.8161, cameraRotate: 90.0, label: "" }, // Bank NPC10
    { Name: 'Bank_NPC11', Hash: -1280051738, Pos: new mp.Vector3(-351.34094, -51.258213, 49.03648), Angle: -18.1795, cameraRotate: 90.0, label: "" }, // Bank NPC10
    { Name: 'Bank_NPC12', Hash: 826475330, Pos: new mp.Vector3(-352.76913, -50.773228, 49.036427), Angle: -21.35, cameraRotate: 90.0, label: "" }, // Bank NPC10
	{ Name: 'Strip1', Hash: 0x81441B71, Pos: new mp.Vector3(109.6189, -1288.552, 28.9), Angle: 282.0494, cameraRotate: 0.0, label: "" }, // СтрипКлуб
	{ Name: 'Strip2', Hash: 0x52580019, Pos: new mp.Vector3(121.1334, -1294.425, 29.25), Angle: 9.76195, cameraRotate: 0.0, label: "" }, // СтрипКлуб2
	{ Name: 'Strip4', Hash: 0x585C0B52, Pos: new mp.Vector3(129.7373, -1298.313, 29.23275), Angle: 217.3723, cameraRotate: 0.0, label: "" }, // СтрипКлуб4
	{ Name: 'Strip3', Hash: 0xF161D212, Pos: new mp.Vector3(127.8413, -1299.701, 29.2222), Angle: 217.3723, cameraRotate: 0.0, label: "" }, // СтрипКлуб3
	{ Name: 'Chip_Shop', Hash: 0xCFF0D4BB, Pos: new mp.Vector3(1117.31, 220, -49.67), Angle: 90.3723, cameraRotate: 0.0, label: "" }, // Казино обмен фишек
	{ Name: 'Trasher', Hash: 0x49EA5685, Pos: new mp.Vector3(2337.306, 3131.076, 48.20313), Angle: 76.63291, cameraRotate: 200.0, label: "Мусорщик" }, // Мусорщик
	{ Name: 'Families', Hash: 0x2E420A24, Pos: new mp.Vector3(-556.06177, -185.91937, 38.221107), Angle: -151.73026, cameraRotate: -30.0, label: "" }, // Семьи чувак
    { Name: 'EMS', Hash: -1420211530, Pos: new mp.Vector3(353.8437, -1401.4592, 32.504894), Angle: 52.907337, cameraRotate: 0.0, label: "" }, //Емс выдача хп
    { Name: 'Electric', Hash: 0xA956BD9E, Pos: new mp.Vector3(728.5374, 132.7131, 80.99639), Angle: 100.9512, cameraRotate: 180.0, label: "Начальник электростанции" }, //нпс Электрики
    { Name: 'Builder', Hash: 0x9E80D2CE, Pos: new mp.Vector3(-509.8224,-1001.672, 23.5505), Angle: 87.94308, cameraRotate: 180.0, label: "Бригадир" }, //нпс Стройка
    { Name: 'Newbie', Hash:  0x4BA14CCA, Pos: new mp.Vector3(471.0, -858.0, 26.4412), Angle: 81.0, cameraRotate: 180.0, label: "Бездомный Билли" }, //Стартовый квест
    { Name: 'LumberJack', Hash: 0xB594F5C3, Pos: new mp.Vector3(-567.3828,5253.008,70.48424), Angle: 69.73068, cameraRotate: 225.0, label: "Лесник" }, //Лесник
    { Name: 'Shop240', Hash: 0x8B7D3766, Pos: new mp.Vector3(24.44681, -1347.381,29.497), Angle: 273.42, cameraRotate: 180.0, label: "" }, //Магазин 24/7 0
    { Name: 'Shop241', Hash: 0x8B7D3766, Pos: new mp.Vector3(-1221.522, -907.9908, 12.32635), Angle: 31.67413, cameraRotate: 270.0, label: "" }, //Магазин 24/s7 1
    { Name: 'Shop242', Hash: 0x8B7D3766, Pos: new mp.Vector3(1698.427, 4922.392, 42.063), Angle: 328.149, cameraRotate: 90.0, label: "" }, //Магазин 24/7 2
    { Name: 'Shop243', Hash: 0x8B7D3766, Pos: new mp.Vector3(-46.28725, -1757.315, 29.421), Angle: 61.87814, cameraRotate: -90.0, label: "" }, //Магазин 24/7 3
    { Name: 'Shop244', Hash: 0x8B7D3766, Pos: new mp.Vector3(1727.767, 6414.963, 35.03722), Angle: 237.5071, cameraRotate: -130.0, label: "" }, //Магазин 24/7 3
    { Name: 'Shop245', Hash: 0x8B7D3766, Pos: new mp.Vector3(2678.398, 3279.246,55.24113), Angle: 329.7842, cameraRotate: 45.0, label: "" }, //Магазин 24/7 3
    { Name: 'Shop247', Hash: 0x8B7D3766, Pos: new mp.Vector3(-3038.612,584.4379,7.908929), Angle: 15.2974, cameraRotate: -30.0, label: "" }, //Магазин 24/7 3
    { Name: 'Shop249', Hash: 0x8B7D3766, Pos: new mp.Vector3(1392.335,3606.429,34.98089), Angle: 191.2473, cameraRotate: 0.0, label: "" }, //Магазин 24/7 3
    { Name: 'Shop2410', Hash: 0x8B7D3766, Pos: new mp.Vector3(-706.1262,-912.9778,19.21559), Angle: 88.7935, cameraRotate: 180.0, label: "" }, //Магазин 24/7 3
    { Name: 'Shop2411', Hash: 0x8B7D3766, Pos: new mp.Vector3(372.539,326.2779,103.5665), Angle: 248.4794, cameraRotate: -135.0, label: "" }, //Магазин 24/7 3
    { Name: 'Shop2412', Hash: 0x8B7D3766, Pos: new mp.Vector3(1134.11, -981.9982, 46.41585), Angle: 275.1243, cameraRotate: 180.0, label: "" }, //Магазин 24/7 3
    { Name: 'Shop2413', Hash: 0x8B7D3766, Pos: new mp.Vector3(1164.663, -322.4549, 69.20505), Angle: 96.55756, cameraRotate: 180.0, label: "" }, //Магазин 24/7 3
    { Name: 'Shop2415', Hash: 0x8B7D3766, Pos: new mp.Vector3(1166.283, 2710.754, 38.15771), Angle: 173.6833, cameraRotate: 0.0, label: "" }, //Магазин 24/7 3
    { Name: 'Shop2416', Hash: 0x8B7D3766, Pos: new mp.Vector3(1960.146, 3739.983, 32.34378), Angle: 292.4198, cameraRotate: 135.0, label: "" }, //Магазин 24/7 3
    { Name: 'Shop2417', Hash: 0x8B7D3766, Pos: new mp.Vector3(-3242.17, 1000.008, 12.83071), Angle: 353.6655, cameraRotate: 0.0, label: "" }, //Магазин 24/7 3
    { Name: 'Shop246', Hash: 0x8B7D3766, Pos: new mp.Vector3(549.0481, 2671.355, 42.15649), Angle: 89.01569, cameraRotate: 180.0, label: "" }, //Магазин 24/7 3
    { Name: 'Shop248', Hash: 0x8B7D3766, Pos: new mp.Vector3(-2966.496, 390.5234, 15.0433), Angle: 80.852, cameraRotate: 180.0, label: "" }, //Магазин 24/7 3
    { Name: 'Shop2414', Hash: 0x8B7D3766, Pos: new mp.Vector3(2557.383, 380.8376, 108.623), Angle: 0.1323226, cameraRotate: 0.0, label: "" }, //Магазин 24/7 3
    { Name: 'Shop2472', Hash: 0x8B7D3766, Pos: new mp.Vector3(160.75603, 6641.821, 31.71063), Angle: -129.31042, cameraRotate: 0.0, label: "" }, //Магазин 24/7 3
    { Name: 'weaponshop39', Hash: 0x719D27F4, Pos: new mp.Vector3(841.3726, -1035.507, 28.19486), Angle: 341.3947, cameraRotate: 30.0, label: "" }, //Магазин 24/7 3
    { Name: 'weaponshop40', Hash: 0x719D27F4, Pos: new mp.Vector3(23.84422, -1105.745, 29.79701), Angle: 134.4664, cameraRotate: 90.0, label: "" }, //Магазин 24/7 3
    { Name: 'weaponshop38', Hash: 0x719D27F4, Pos: new mp.Vector3(-1118.184, 2700.745, 18.55413), Angle: 197.8389, cameraRotate: -45.0, label: "" }, //Магазин 24/7 3
    { Name: 'weaponshop37', Hash: 0x719D27F4, Pos: new mp.Vector3(1692.979, 3761.729, 34.70532), Angle: 207.8013, cameraRotate: -45.0, label: "" }, //Магазин 24/7 3
    { Name: 'weaponshop36', Hash: 0x719D27F4, Pos: new mp.Vector3(-661.189, -933.6142, 21.82921), Angle: 159.1136, cameraRotate: 45.0, label: "" }, //Магазин 24/7 3
    { Name: 'weaponshop35', Hash: 0x719D27F4, Pos: new mp.Vector3(808.9966,-2159.235, 29.619), Angle: 333.8325, cameraRotate: 45.0, label: "" }, //Магазин 24/7 3
    { Name: 'weaponshop34', Hash: 0x719D27F4, Pos: new mp.Vector3(-1304.398, -395.6584, 36.69575), Angle: 56.81636, cameraRotate: -90.0, label: "" }, //Магазин 24/7 3
    { Name: 'weaponshop33', Hash: 0x719D27F4, Pos: new mp.Vector3(253.4281, -51.5676, 69.94106), Angle: 41.85976, cameraRotate: -90.0, label: "" }, //Магазин 24/7 3
    { Name: 'weaponshop75', Hash: 0x719D27F4, Pos: new mp.Vector3(-331.68506, 6084.963, 31.454771), Angle: -142.46553, cameraRotate: -90.0, label: "" }, //Магазин 24/7 3
    { Name: 'PremiumClothes', Hash: 0xB7C61032, Pos: new mp.Vector3(-708.8664, -151.8637, 37.41513), Angle: 114.6154, cameraRotate: -90.0, label: "" }, //Магазин 24/7 3
    { Name: 'PremiumClothes2', Hash: 0xB7C61032, Pos: new mp.Vector3(-165.0003, -302.8776, 39.73326), Angle: 248.5414, cameraRotate: -90.0, label: "" }, //Магазин 24/7 3
    { Name: 'PremiumClothes3', Hash: 0xB7C61032, Pos: new mp.Vector3(-1448.999, -238.2128, 49.81324), Angle: 49.63409, cameraRotate: -90.0, label: "" }, //Магазин 24/7 3
    { Name: 'LowClothes', Hash: 0xB58D2529, Pos: new mp.Vector3(-1193.256, -766.5146, 17.31632), Angle: 212.0163, cameraRotate: -90.0, label: "" }, //Магазин 24/7 3
    { Name: 'LowClothes2', Hash: 0xB58D2529, Pos: new mp.Vector3(126.5512, -225.5727, 54.557), Angle: 63.66494, cameraRotate: -90.0, label: "" }, //Магазин 24/7 3
    { Name: 'LowClothes3', Hash: 0xB58D2529, Pos: new mp.Vector3(612.8331, 2763.936, 42.08815), Angle: 275.0396, cameraRotate: -90.0, label: "" }, //Магазин 24/7 3
    { Name: 'LowClothes4', Hash: 0xB58D2529, Pos: new mp.Vector3(-3169.805, 1041.827, 20.86321), Angle: 60.38713, cameraRotate: -90.0, label: "" }, //Магазин 24/7 3
    { Name: 'LowClothes5', Hash: 0xB58D2529, Pos: new mp.Vector3(77.21005, -1387.452, 29.37612), Angle: 172.7294, cameraRotate: -90.0, label: "" }, //Магазин 24/7 3
    { Name: 'LowClothes6', Hash: 0xB58D2529, Pos: new mp.Vector3(-817.1215, -1072.2, 11.3281), Angle: 112.8105, cameraRotate: -90.0, label: "" }, //Магазин 24/7 3
    { Name: 'MaskShop', Hash: 0xA2E86156, Pos: new mp.Vector3(-1334.602, -1278.211, 4.963548), Angle: 103.9384, cameraRotate: -90.0, label: "" }, //Магазин 24/7 3
    { Name: 'RealtorMenu', Hash: 0x69E8ABC3, Pos: new mp.Vector3(-1912.689, -571.1282, 19.09721), Angle: 236.2264, cameraRotate: -90.0, label: "" }, //Магазин 24/7 3
    { Name: 'BacksShop', Hash: 0x77D41A3E, Pos: new mp.Vector3(-805.2963, -594.8328, 30.27522), Angle: 252.6138, cameraRotate: -90.0, label: "" }, //Магазин 24/7 
    { Name: 'DriveLicMenu', Hash: 0xACCCBDB6, Pos: new mp.Vector3(214.60162, -1400.1356, 30.58352), Angle: -41.160877, cameraRotate: 45.0, label: "Вильям" }, //Магазин 24/7 3
	{ Name: 'Sim', Hash: 0x53B57EB0, Pos: new mp.Vector3(1142.079, -977.0397, 46.39627), Angle: 266.8473, cameraRotate: 180.0, label: "Прохожий" }, 
	{ Name: 'BoatRent', Hash: 0x59511A6C, Pos: new mp.Vector3(1592.53, 3850.163, 31.47511), Angle: 198.1703, cameraRotate: -35.0, label: "Гвинт" }, 
    { Name: 'Rent_Newbie', Hash: 0x69591CF7, Pos: new mp.Vector3(468.4944, -813.5514, 26.56735), Angle: 180.0, cameraRotate: 0.0, label: "" }, // spawnPlayercars
	{ Name: 'Rent_Autoschool', Hash: 0x69591CF7, Pos: new mp.Vector3(221.88293, -1394.7352, 30.587467), Angle: -43.9168, cameraRotate: 135.0, label: "" }, // Автошкола мапеды
	{ Name: 'Rent_Ems', Hash: 0x69591CF7, Pos: new mp.Vector3(326.11313, -1368.848, 31.951468), Angle: 48.959656, cameraRotate: 120.0, label: "" }, // ЕМС мапеды
    { Name: 'Rent_Trasher', Hash: 0x69591CF7, Pos: new mp.Vector3(2339.467, 3141.611, 48.20469), Angle: 78.25197, cameraRotate: 195.0, label: "" }, 
	{ Name: 'Rent_Builder', Hash: 0x69591CF7, Pos: new mp.Vector3(-507.753, -997.2036, 23.55052), Angle: 38.84364, cameraRotate: -90.0, label: "" }, // Builder мапеды
	{ Name: 'Rent_Lumberjack', Hash: 0x69591CF7, Pos: new mp.Vector3(-565.4623, 5256.843, 70.46721), Angle: 30.01428, cameraRotate: -45.0, label: "" }, // Lumberjack мапеды
	{ Name: 'Rent_Electrical', Hash: 0x69591CF7, Pos: new mp.Vector3(741.3926, 139.8365, 80.76434), Angle: 205.9157, cameraRotate: -45.0, label: "" }, // Electrical мапеды
    { Name: 'Rent_Fisher', Hash: 0x69591CF7, Pos: new mp.Vector3(1542.496, 3785.967, 34.21459), Angle: 205.7623, cameraRotate: 0.0, label: "" }, // ЕМС мапеды
    { Name: 'BusRent', Hash: 0x68709618, Pos: new mp.Vector3(453.6387, -596.0443, 28.53095), Angle: 321.8216, cameraRotate: 45.0, label: "" }, // ЕМС мапеды
    { Name: 'LCN_Mission', Hash: 0x8D67EE7D, Pos: new mp.Vector3(-1880.059, 2072.309, 140.9973), Angle: 337.1234, cameraRotate: 0.0, label: "Вито" }, // мафия контробанда
    { Name: 'AM_Mission', Hash: 0xF1E823A2, Pos: new mp.Vector3(-95.59702, 942.2501, 233.0285), Angle: 70.97008, cameraRotate: 0.0, label: "Эдуард" }, // мафия контробанда
    { Name: 'RM_Mission', Hash: 0x8CCE790F, Pos: new mp.Vector3(-1511.385, 133.1564, 55.65265), Angle: 339.271, cameraRotate: 0.0, label: "Иван" }, // мафия контробанда
    { Name: 'Yakudza_Mission', Hash: 0xB9DD0300, Pos: new mp.Vector3(-1806.4128, 427.93073, 128.50722), Angle: -169.54924, cameraRotate: 0.0, label: "Гото" }, // мафия контробанда
    { Name: 'Seller1', Hash: 0xF09D5E29, Pos: new mp.Vector3(796.1083, 2174.6, 52.64843), Angle: 15.35948, cameraRotate: -35.0, label: "" }, // мафия контробанда
    { Name: 'Seller2', Hash: 0xF09D5E29, Pos: new mp.Vector3(176.3284, 2800.575, 45.65519), Angle: 303.5407, cameraRotate: 100.0, label: "" }, // мафия контробанда
    { Name: 'Seller3', Hash: 0xF09D5E29, Pos: new mp.Vector3(374.8612, 3575.078, 33.29222), Angle: 197.6873, cameraRotate: -35.0, label: "" }, // мафия 
    { Name: 'Robbery', Hash: 0xE497BBEF, Pos: new mp.Vector3(1424.625, 6342.949, 23.98554), Angle: 260.6873, cameraRotate: 180.0, label: "" }, // Банды Ограбление
    { Name: 'CityHall_Clothes', Hash: 0x9760192E, Pos: new mp.Vector3(-530.9924, -190.89409, 42.83659), Angle: 296.4038, cameraRotate: 180.0, label: "" },   
    { Name: 'Parking1', Hash: 0xD770C9B4, Pos: new mp.Vector3(-339.73062, 268.06866, 85.663025), Angle: -64.22242, cameraRotate: 135.0, label: "Парковщик" },   
    { Name: 'Parking2', Hash: 0xD770C9B4, Pos: new mp.Vector3(-2028.7328, -465.12167, 11.446224), Angle: -43.275078, cameraRotate: 135.0, label: "Парковщик" },   
    { Name: 'Parking3', Hash: 0xD770C9B4, Pos: new mp.Vector3(-168.07057, -2142.9312, 16.839851), Angle: -69.47071, cameraRotate: 135.0, label: "Парковщик" },   
    
    
    { Name: 'NumberMenu', Hash: 0x5E3DA4A4, Pos: new mp.Vector3(455.144, -1149.4961, 29.291773), Angle: 176.22504, cameraRotate: -45.0, label: "" },  
    
    
    { Name: 'Farm1', Hash: 0xD7606C30, Pos: new mp.Vector3(2028.1272, 4978.5576, 41.09369), Angle: -147.99458, cameraRotate: -45.0, label: "Дэни" },  
    { Name: 'FarmJob', Hash: 0x0E32D8D0, Pos: new mp.Vector3(2241.2246, 5159.178, 57.67025), Angle: 63.33518, cameraRotate: -90.0, label: "Джон" },  
    
    { Name: 'Farm:Seller#1', Hash: 0x0E32D8D0, Pos: new mp.Vector3(2932.3901, 4624.1416, 48.723392), Angle: 49.526886, cameraRotate: -90.0, label: "Тоби" },  
    { Name: 'Farm:Seller#2', Hash: 0x0E32D8D0, Pos: new mp.Vector3(726.82074, 4169.1113, 40.70919), Angle: -2.5607061, cameraRotate: -45.0, label: "Майк" }, 
    { Name: 'Auction', Hash: 0xE5A11106, Pos: new mp.Vector3(-1046.82074, -148.1113, 38.10919), Angle: 180.5607061, cameraRotate: 135.0, label: "Аукционист" }, 
    { Name: 'Seller4', Hash: 0xFDC653C7, Pos: new mp.Vector3(721.511, 2333.3748, 51.00225), Angle: -4.142072, cameraRotate: 45.0, label: "" }, 
    { Name: 'Seller5', Hash: 0xACA3C8CA, Pos: new mp.Vector3(2339.43, 2572.7378, 47.74858), Angle: -119.66754, cameraRotate: -90.0, label: "" }, 
    { Name: 'DrugFamilies', Hash: 0xDB729238, Pos: new mp.Vector3(-28.01, -1405.1578, 29.508165), Angle: -119.66754, cameraRotate: -90.0, label: "Джеймс" }, 
    { Name: 'DrugBallas', Hash: 0x23B88069, Pos: new mp.Vector3(107.89, -2009.2978, 18.308165), Angle: -119.66754, cameraRotate: -90.0, label: "Брендон" }, 
    { Name: 'DrugVagos', Hash: 0x0DA1EAC6, Pos: new mp.Vector3(469.43, -1881.7378, 26.09734), Angle: -119.66754, cameraRotate: -90.0, label: "Кевин" }, 
    { Name: 'DrugMarabunta', Hash: 0x8BD990BA, Pos: new mp.Vector3(1441.63, -1665.6378, 66.12734), Angle: -2.66754, cameraRotate: -90.0, label: "Мейсон" }, 
    { Name: 'DrugBloods', Hash: 0x9D0087A8, Pos: new mp.Vector3(971.43, -1838.7378, 36.08734), Angle: -20.66754, cameraRotate: -90.0, label: "Энтони" },
    { Name: 'CarromPremium', Hash: 0x999B00C6, Pos: new mp.Vector3(-42.90, -1104.3678, 26.42734), Angle: -20.66754, cameraRotate: 45.0, label: "Консультант" }, 
    { Name: 'CarromLux', Hash: 0x9712C38F, Pos: new mp.Vector3(129.111, -143.0878, 54.85734), Angle: 160.66754, cameraRotate: 45.0, label: "Консультант" }, 
    { Name: 'CarromLow', Hash: 0x4C7B2F05, Pos: new mp.Vector3(-56.481, -1692.5978, 29.49734), Angle: -45.66754, cameraRotate: 90.0, label: "Консультант" }, 
    { Name: 'CarromMoto', Hash: 0x799E9EEE, Pos: new mp.Vector3(268.58, -1155.229, 29.29), Angle: 90, cameraRotate: 180.0, label: "Консультант" }, 


    { Name: 'Barmen#1', Hash: 0x6F139B54, Pos: new mp.Vector3(128.68553, -1282.8324, 29.27254), Angle: 117.03276, cameraRotate: 0.0, label: "" }, 
    { Name: 'Barmen#2', Hash: 0xE2A32E68, Pos: new mp.Vector3(-1391.157, -606.65094, 30.31955), Angle: 128.14241, cameraRotate: 0.0, label: "" }, 
    { Name: 'Arena', Hash: 0x246AF208, Pos: new mp.Vector3(-265.4303, -2016.42, 30.145), Angle: -129.33908, cameraRotate: 0.0, label: "" }, 
   // { Name: 'SepFlowers', Hash: 0xCBFC0DF5, Pos: new mp.Vector3(-1636.1603, 197.02, 60.675), Angle: -64.33908, cameraRotate: 135.0, label: "Учитель флористики" }, 
  //  { Name: 'SepRector', Hash: 0x9760192E, Pos: new mp.Vector3(-1635.7603, 181.02, 61.75), Angle: -65.89908, cameraRotate: 135.0, label: "Ректор" }, 
  //  { Name: 'SepAqua', Hash: 0xC8B7167D, Pos: new mp.Vector3(-1640.4003, 205.86, 60.68), Angle: -68.89908, cameraRotate: 135.0, label: "Учитель гидроархеологии" },
   // { Name: 'SepInform', Hash: 0x382121C8, Pos: new mp.Vector3(-1635.8522, 213.3737, 60.64), Angle: 178, cameraRotate: 0, label: "Учитель информатики" }, 
   // { Name: 'SepHistory', Hash: 0x267630FE, Pos: new mp.Vector3(-1631.2222, 212.9037, 60.64), Angle: 108, cameraRotate: 145, label: "Учитель истории" }, 
   // { Name: 'SepPaint', Hash: 0x0F5D26BB, Pos: new mp.Vector3(-1629.1922, 209.4537, 60.64), Angle: 121, cameraRotate: 145, label: "Учитель рисования" }, 
   // { Name: 'SepGeo', Hash: 0x0B34D6F5, Pos: new mp.Vector3(-1627.58, 205.81, 60.71), Angle: 107, cameraRotate: 145, label: "Учитель геологии" },
   // { Name: 'SepChemistry', Hash: 0x8CCE790F, Pos: new mp.Vector3(-1625.79, 201.78, 60.63), Angle: 110, cameraRotate: 145, label: "Учитель химии" },


    { Name: 'Diving1', Hash: 0xAB0A7155, Pos: new mp.Vector3(1696.005, 42.93885, 161.76727), Angle: 95, cameraRotate: 135.0, label: "" }, 
    { Name: 'Diving2', Hash: 0xAB0A7155, Pos: new mp.Vector3(1299.1622, 4215.9937, 33.90), Angle: -7, cameraRotate: 135.0, label: "" }, 


    { Name: 'Demorgan', Hash: 0xD768B228, Pos: new mp.Vector3(1723.8099, 2505.4304, 45.564896), Angle: 55, cameraRotate: -45, label: "Надзиратель" },
    { Name: 'Warm', Hash: 0xDDCAAA2C, Pos: new mp.Vector3(617.37978, 6505.56, 29.556), Angle: -9, cameraRotate: 0, label: "" },
    
];

var Peds = [];

//setTimeout(function () {
    pedlist.forEach(ped => {
        Peds[ped.Name] = {
            uid : ped.Name,
            entity : mp.peds.new(ped.Hash, ped.Pos, ped.Angle, -1),
            extra_rotate : ped.cameraRotate,
            labelText : global.GetText(ped.label),
            position : ped.Pos,
            labelObject : createLabel(global.GetText(ped.label), ped.Pos),
            colShape : null,            
            createShape() { 
                this.removeShape();
                this.colShape = mp.colshapes.newSphere(this.position.x, this.position.y, this.position.z, 1); 
                this.colShape.interact = ped.Name; 
                this.colShape.in = false;
            },
            removeShape() { 
                if(this.colShape!=null){
                    if(this.colShape.in){
                        mp.events.call("PressE", false);
                        mp.players.local.npcInteract = null;
                    }
                    this.colShape.destroy(); 
                }
                this.colShape = null;
            },
            setClothes(componentNumber, drawable, texture) {
                this.entity.setComponentVariation(componentNumber, drawable, texture, 0);
            }
        }
    });
   // }, 5000);



mp.events.add('entityStreamIn', function (entity) {
    if(entity.santa){
        entity.setComponentVariation(1, 8, 0, 0);
        entity.setComponentVariation(8, 15, 0, 0);
        entity.setComponentVariation(11, 51, 0, 0);
        entity.setComponentVariation(4, 58, 6, 0);
        entity.setComponentVariation(6, 87, 0, 0);
    }
});

function createLabel(label, position){
    return label=="" ? null : mp.labels.new(label, position.add(new mp.Vector3(0, 0, 0.9)),
    {
        los: false,
        font: 0,
        //color: [57,179,172,255],
        drawDistance: 5,
    })
}

mp.events.add('playerEnterColshape', (shape)=>{
        if(shape.interact!=null){
            shape.in = true;
            mp.events.call("PressE", true);
            mp.players.local.npcInteract = shape.interact;
        }
});

mp.events.add('playerExitColshape', (shape)=>{
    if(shape.interact!=null){
        shape.in = false;
        mp.events.call("PressE", false);
        mp.players.local.npcInteract = null;
    }
});



let hiding;
let handCamera;
let hidedPlayers = [];
let hidedLabels =[];
let oldpos;
function toRadian(x){
    return Math.PI*x/180;
}

mp.events.add('NPC.ColShape.Local', (npcName, flag)=>{
    if(Peds[npcName]!=null){
        if(flag) Peds[npcName].createShape();
            else Peds[npcName].removeShape();

    }
});

mp.events.add('NPC.cameraOn', (pedName, transitionTime = 0) => {
    handCamera = mp.cameras.new('default', new mp.Vector3(0,  0,  0), new mp.Vector3(0,0,0), 40);
    handCamera.setActive(true);
    handCamera.pointAtPedBone(Peds[pedName].entity.handle, 31086, 0, 0, 0, true);
    handCamera.setCoord(Peds[pedName].entity.getCoords(true).x + (Math.sin(toRadian(Peds[pedName].entity.getHeading()+Peds[pedName].extra_rotate))*2), Peds[pedName].entity.getCoords(true).y+(Math.cos(toRadian(Peds[pedName].entity.getHeading()+Peds[pedName].extra_rotate))*2), Peds[pedName].entity.getCoords(true).z+0.5);
    mp.game.cam.renderScriptCams(true, transitionTime>0, transitionTime, true, false);
    if(Peds[pedName].labelObject!=null){
        Peds[pedName].labelObject.destroy();
        Peds[pedName].labelObject=null;
        hidedLabels.push(pedName);
    }
    hiding = startHide(Peds[pedName].entity.getCoords(true));
    ///////////////////
    oldpos = mp.players.local.position;
    mp.players.local.position = new mp.Vector3(Peds[pedName].entity.getCoords(true).x + (Math.sin(toRadian(Peds[pedName].entity.getHeading()+Peds[pedName].extra_rotate))*2), Peds[pedName].entity.getCoords(true).y+(Math.cos(toRadian(Peds[pedName].entity.getHeading()+Peds[pedName].extra_rotate))*2), Peds[pedName].entity.getCoords(true).z+0.5);
});

mp.events.add('NPC.cameraOff', (transitionTime = 0)=>{
    if(hiding!=null){
    clearInterval(hiding);
    hiding = null;
    }
    if(handCamera!=null){
        mp.game.cam.renderScriptCams(false, transitionTime>0, transitionTime, true, true);
        handCamera.destroy();
        handCamera = null;
    }
    
    if(oldpos!=null){
        mp.players.local.position = oldpos;
        oldpos = null;
    }
    
    setTimeout(()=>{
        while(hidedLabels.length>0){
            var pedName = hidedLabels.pop();
            Peds[pedName].labelObject = createLabel(Peds[pedName].labelText, Peds[pedName].position);
        }

        while(hidedPlayers.length>0)hidedPlayers.pop().setAlpha(255); 
    }, transitionTime/2);
});


function startHide(pos){
    mp.players.local.setAlpha(0);
    hidedPlayers.push(mp.players.local);
    return setInterval(function (vector){
        mp.players.forEachInStreamRange(player => {
            if(vector.subtract(player.position).length()<10){
                if(player.getAlpha()>0)
                {
                player.setAlpha(0);
                hidedPlayers.push(player);
                }
            }else if(hidedPlayers.includes(player)){
                hidedPlayers.splice(hidedPlayers.indexOf(player), 1);
            }
        });
    }, 1000, pos);
}







}