{
﻿/*
 * Descripcion: Contiene el menú del tps del /ir
 */

let adminTeleports = null;

// Evento menu
mp.events.add("mostrar_teleport_admin", function (args) {
    if (args != -1) {
        mp.events.callRemote("TeleportAdmin", args);
    }
    else {
        mostrar_teleport_admin();
    }
});

// Funcion para mostrar el menu de tps
function mostrar_teleport_admin() {
    adminTeleports = crearMenu("Teleports", "~h~Staff");
    adminTeleports.AddItem(new UIMenuItem("0 Torre Admin", "Relaxing Cafe con leche in Plaza Mayor"));
    adminTeleports.AddItem(new UIMenuItem("1 Legion Square", ""));
    adminTeleports.AddItem(new UIMenuItem("2 Comisaria Mission Row", "32(LSPD)"));
    adminTeleports.AddItem(new UIMenuItem("3 Comisaria La Mesa", "SIN USO (SHP)"));
    adminTeleports.AddItem(new UIMenuItem("4 Comisaria Davis", "20 (LSSD)"));
    adminTeleports.AddItem(new UIMenuItem("5 Comisaria Vespucci", "29 (LSPD)"));
    adminTeleports.AddItem(new UIMenuItem("6 Comisaria Vinewood", "76 (LSPD)"));
    adminTeleports.AddItem(new UIMenuItem("7 Comisaria Rockford Hills", "SIN USO (LSPD)"));
    adminTeleports.AddItem(new UIMenuItem("8 Puesto policia playa", "SIN USO (LSPD)"));
    adminTeleports.AddItem(new UIMenuItem("9 Comisaria Sandy Shore", "17 (LSSD)"));
    adminTeleports.AddItem(new UIMenuItem("10 Comisaria Paleto Bay", "15 (LSSD)"));
    adminTeleports.AddItem(new UIMenuItem("11 FIB", ""));
    adminTeleports.AddItem(new UIMenuItem("12 Central de Bomberos", "LSFD"));
    adminTeleports.AddItem(new UIMenuItem("13 Hospital General", ""));
    adminTeleports.AddItem(new UIMenuItem("14 Hospital PillBox Hill", ""));
    adminTeleports.AddItem(new UIMenuItem("15 Vespucci Beach", ""));
    adminTeleports.AddItem(new UIMenuItem("16 Estacion de Autobuses", ""));
    adminTeleports.AddItem(new UIMenuItem("17 Hotel Richman", ""));
    adminTeleports.AddItem(new UIMenuItem("18 Villa GO", ""));
    adminTeleports.AddItem(new UIMenuItem("19 Portaaviones", ""));
    adminTeleports.AddItem(new UIMenuItem("20 Carguero (Dentro)", ""));
    adminTeleports.AddItem(new UIMenuItem("21 Carguero (Fuera)", ""));
    adminTeleports.AddItem(new UIMenuItem("22 Sisyphus Theater", ""));
    adminTeleports.AddItem(new UIMenuItem("23 Aeropuerto (Llegadas)", ""));
    adminTeleports.AddItem(new UIMenuItem("24 Cartel Vinewood", ""));
    adminTeleports.AddItem(new UIMenuItem("25 Taxistas", ""));
    adminTeleports.AddItem(new UIMenuItem("26 Camioneros (Rumpos)", ""));
    adminTeleports.AddItem(new UIMenuItem("27 Camioneros (Trailers)", " "));
    adminTeleports.AddItem(new UIMenuItem("28 Basureros", " "));
    adminTeleports.AddItem(new UIMenuItem("29 Observatorio", ""));
    adminTeleports.AddItem(new UIMenuItem("30 Centro Rehabilitacion", ""));
    adminTeleports.AddItem(new UIMenuItem("31 Kortz CC", ""));
    adminTeleports.AddItem(new UIMenuItem("32 Ayuntamiento", ""));
    adminTeleports.AddItem(new UIMenuItem("33 Juzgados", ""));
    adminTeleports.AddItem(new UIMenuItem("34 Prision", ""));
    adminTeleports.AddItem(new UIMenuItem("35 Refineria", ""));
    adminTeleports.AddItem(new UIMenuItem("36 Mina (Excavacion)", ""));
    adminTeleports.AddItem(new UIMenuItem("37 Sandy Shore", ""));
    adminTeleports.AddItem(new UIMenuItem("38 Paleto Bay", ""));
    adminTeleports.AddItem(new UIMenuItem("39 Aeropuerto (Sandy Shores)", ""));
    adminTeleports.AddItem(new UIMenuItem("40 Cartero", ""));
    adminTeleports.AddItem(new UIMenuItem("41 Rockford Hills", ""));
    adminTeleports.AddItem(new UIMenuItem("42 Cocheras (Autobuses)", ""));
    adminTeleports.AddItem(new UIMenuItem("43 Noria", "Playa Vespucci"));
    adminTeleports.AddItem(new UIMenuItem("44 Pescador", "Trabajo de pescador"));
    adminTeleports.AddItem(new UIMenuItem("45 Fuerte Zancudo", ""));
    adminTeleports.AddItem(new UIMenuItem("46 Autoescuela", ""));
    adminTeleports.AddItem(new UIMenuItem("47 Motorsport", "Concesionario gama alta I"));
    adminTeleports.AddItem(new UIMenuItem("48 Vapid", "Concesionario gama media"));
    adminTeleports.AddItem(new UIMenuItem("49 Sanders", "Concesionario motocicletas cruiser"));
    adminTeleports.AddItem(new UIMenuItem("50 Rockford Motorcycles", "Concesionario motocicletas deportivas y quads"));
    adminTeleports.AddItem(new UIMenuItem("51 Luxury", "Concesionario gama alta II"));
    adminTeleports.AddItem(new UIMenuItem("52 Benefactor", "Concesionario suvs y todoterrenos"));
    adminTeleports.AddItem(new UIMenuItem("53 Albany", "Concesionario gama baja"));
    adminTeleports.AddItem(new UIMenuItem("54 Calabrone", "Concesionario bicicletas"));
    adminTeleports.AddItem(new UIMenuItem("55 Glass Heroes", "Concesionario furgonetas"));
    adminTeleports.AddItem(new UIMenuItem("56 Helmut's", "Concesionario camiones y servicios"));
    adminTeleports.AddItem(new UIMenuItem("57 Higgins", "Concesionario helicópteros"));
    adminTeleports.AddItem(new UIMenuItem("58 LSMYC", "Concesionario marítimos"));
    adminTeleports.AddItem(new UIMenuItem("59 DW Jet Charter", "Concesionario avionetas y jets"));
    adminTeleports.AddItem(new UIMenuItem("60 North LS Auto Sales", "Concesionario sedanes"));
    adminTeleports.AddItem(new UIMenuItem("61 Portola Automotive", "Concesionario vehículos exclusivos"));
    adminTeleports.AddItem(new UIMenuItem("62 The Diamond's Cars", "Concesionario vehículos carisimos"));
    adminTeleports.AddItem(new UIMenuItem("63 Autoshop", "Concesionario vehículos especiales"));
    adminTeleports.AddItem(new UIMenuItem("64 Weazel News", "Central anuncios Los Santos Vespucci"));
    adminTeleports.AddItem(new UIMenuItem("65 Paramedicos", "Trabajo de paramedicos"));
    adminTeleports.AddItem(new UIMenuItem("66 Carcel Federal", "Carcel Federal"));
    adminTeleports.AddItem(new UIMenuItem("67 Basurero Sandy", "Central de basuras de Sandy"));
    adminTeleports.AddItem(new UIMenuItem("68 Grapeseed", "Pueblo de Grapeseed"));
    adminTeleports.AddItem(new UIMenuItem("69 Basurero Paleto", "Central de basuras de Paleto"));
    adminTeleports.AddItem(new UIMenuItem("70 Pier", "Pier Del Perro Beach"));
    adminTeleports.AddItem(new UIMenuItem("71 Teatro Vinewood", "Zona de actos (PD conciertos etc)"));
    adminTeleports.AddItem(new UIMenuItem("72 Weazel News Norte", "Central anuncios Sandy"));
    adminTeleports.AddItem(new UIMenuItem("73 Promedic", "Promedic"));
    adminTeleports.AddItem(new UIMenuItem("74 Reponedor", "Central de reponedores"));
    adminTeleports.AddItem(new UIMenuItem("Cerrar", "Cierra el menú actual"));

    adminTeleports.ItemSelect.on((item, index) => {
        if (item.Text != "Cerrar") {
            mp.events.callRemote("TeleportAdmin", index);
        }

        adminTeleports?.Close();
    });

    adminTeleports.MenuClose.on(() => {
        adminTeleports = null;
    });
}

}