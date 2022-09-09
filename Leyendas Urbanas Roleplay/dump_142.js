{
/* --------------------------------------------------------------------------------
 * armeriapd.js
 *
 * Autor: Zeeky & FerniMoon
 *
 * Descripción: Menu de armeria para la facción LSPD
 *
 * -------------------------------------------------------------------------------- */

mp.events.add("mostrar_armeria_pd", function () { mostrar_armeria_pd() });

function mostrar_armeria_pd() {
    armeriaPD = crearMenu("Armeria", "LSPD - CÚPULA");
    armeriaPD.AddItem(new UIMenuItem("Blancas", "LSPD - CÚPULA"));
    armeriaPD.AddItem(new UIMenuItem("Pistolas", "LSPD - CÚPULA"));
    armeriaPD.AddItem(new UIMenuItem("Ametralladoras", "LSPD - CÚPULA"));
    armeriaPD.AddItem(new UIMenuItem("Rifles de asalto", "LSPD - CÚPULA"));
    armeriaPD.AddItem(new UIMenuItem("Francotiradores", "LSPD - CÚPULA"));
    armeriaPD.AddItem(new UIMenuItem("Escopetas", "LSPD - CÚPULA"));
    armeriaPD.AddItem(new UIMenuItem("Armas pesadas", "LSPD - CÚPULA"));
    armeriaPD.AddItem(new UIMenuItem("Armas lanzadas", "LSPD - CÚPULA"));
    armeriaPD.AddItem(new UIMenuItem("Otros", "LSPD - CÚPULA"));
    armeriaPD.AddItem(new UIMenuItem("Cargadores", "LSPD - CÚPULA"));
    armeriaPD.AddItem(new UIMenuItem("Conos", "LSPD - CÚPULA"));

    armeriaPD.ItemSelect.on((item, index) => {
        switch (index) {
            case 0:
                mostrar_armeria_pd_blancas();
                break;
            case 1:
                mostrar_armeria_pd_pistolas();
                break;
            case 2:
                mostrar_armeria_pd_ametralladoras();
                break;
            case 3:
                mostrar_armeria_pd_rifles();
                break;
            case 4:
                mostrar_armeria_pd_franco();
                break;
            case 5:
                mostrar_armeria_pd_escopetas();
                break;
            case 6:
                mostrar_armeria_pd_pesadas();
                break;
            case 7:
                mostrar_armeria_pd_lanzadas();
                break;
            case 8:
                mostrar_armeria_pd_otros();
                break;
            case 9:
                mostrar_armeria_pd_cargadores();
                break;
            case 10:
                mostrar_armeria_pd_conos();
                break;
            default:
                armeriaPD?.Close();
                return;
        }

        armeriaPD?.Close(true);
    });

    armeriaPD.MenuClose.on(item => {
        armeriaPD = null;
    });
}

function mostrar_armeria_pd_blancas() {
    armeriaPD_BLANCAS = crearMenu("Blancas", "Armas de mano o armas blancas", true);
    armeriaPD_BLANCAS.AddItem(new UIMenuItem("Cuchillo", "")); // 33
    armeriaPD_BLANCAS.AddItem(new UIMenuItem("Porra", "Porra de uso policial")); // 22
    armeriaPD_BLANCAS.AddItem(new UIMenuItem("Martillo", " ")); // 19
    armeriaPD_BLANCAS.AddItem(new UIMenuItem("Bate béisbol", "")); // 31
    armeriaPD_BLANCAS.AddItem(new UIMenuItem("Palanca", "Gordon Freeman")); // 28
    armeriaPD_BLANCAS.AddItem(new UIMenuItem("Palo de golf", "")); // 16
    armeriaPD_BLANCAS.AddItem(new UIMenuItem("Botella cristal rota", "")); // 48
    armeriaPD_BLANCAS.AddItem(new UIMenuItem("Daga", "")); // 30
    armeriaPD_BLANCAS.AddItem(new UIMenuItem("Hacha", "")); // 47
    armeriaPD_BLANCAS.AddItem(new UIMenuItem("Puño americano", "")); // 242
    armeriaPD_BLANCAS.AddItem(new UIMenuItem("Machete", "")); // 44
    armeriaPD_BLANCAS.AddItem(new UIMenuItem("Linterna", "")); // 29
    armeriaPD_BLANCAS.AddItem(new UIMenuItem("Navaja", "")); // 243
    armeriaPD_BLANCAS.AddItem(new UIMenuItem("Taco de billar", "")); // 218
    armeriaPD_BLANCAS.AddItem(new UIMenuItem("Llave inglesa", "Usada para arreglar vehículos, o problemas personales")); // 34
    armeriaPD_BLANCAS.AddItem(new UIMenuItem("Hacha de batalla", "")); // 217
    armeriaPD_BLANCAS.AddItem(new UIMenuItem("Hacha de piedra", "")); // 1090
    armeriaPD_BLANCAS.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    armeriaPD_BLANCAS.ItemSelect.on((item, index) => {

        if (index < 17) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('ArmeriaPD_BLANCAS', (index + 1));
        }

        // Volver
        if (index == 17) {
            armeriaPD_BLANCAS?.Close(true);
        }
    });

    armeriaPD_BLANCAS.MenuClose.on(item => {
        mostrar_armeria_pd();
        armeriaPD_BLANCAS = null;
    });
}

function mostrar_armeria_pd_pistolas() {
    armeriaPD_PISTOLAS = crearMenu("Pistolas", "", true);
    armeriaPD_PISTOLAS.AddItem(new UIMenuItem("Taser", "")); // 14
    armeriaPD_PISTOLAS.AddItem(new UIMenuItem("Pistola de bengalas", "")); // 17
    armeriaPD_PISTOLAS.AddItem(new UIMenuItem("SNS Pistol", "Pistola de dimensiones muy pequeñas")); // 39
    armeriaPD_PISTOLAS.AddItem(new UIMenuItem("SNS Pistol MKII", "Pistola de dimensiones muy pequeñas potente")); // 248
    armeriaPD_PISTOLAS.AddItem(new UIMenuItem("Pistola vintage", "Pistola antigua")); // 4
    armeriaPD_PISTOLAS.AddItem(new UIMenuItem("Pistola de combate", "")); // 20
    armeriaPD_PISTOLAS.AddItem(new UIMenuItem("Pistola", "")); // 8
    armeriaPD_PISTOLAS.AddItem(new UIMenuItem("Pistola MKII", "Pistola usada por cuerpos del estado")); // 247
    armeriaPD_PISTOLAS.AddItem(new UIMenuItem("Pistola AP", "Pistola automática")); // 215
    armeriaPD_PISTOLAS.AddItem(new UIMenuItem("Pistola pesada", "Pistola táctica con mira incorporada")); // 43
    armeriaPD_PISTOLAS.AddItem(new UIMenuItem("Pistola calibre 50", "")); // 32
    armeriaPD_PISTOLAS.AddItem(new UIMenuItem("Pistola Marksman", "Pistola antigua")); // 244
    armeriaPD_PISTOLAS.AddItem(new UIMenuItem("Revólver de doble acción", "Revólver antiguo")); // 246
    armeriaPD_PISTOLAS.AddItem(new UIMenuItem("Revólver", "")); // 245
    armeriaPD_PISTOLAS.AddItem(new UIMenuItem("Revólver MKII", "")); // 249
    armeriaPD_PISTOLAS.AddItem(new UIMenuItem("Up-n-Atomizer", "")); // 1092
    armeriaPD_PISTOLAS.AddItem(new UIMenuItem("Pistola de cerámica", "")); // 1093
    armeriaPD_PISTOLAS.AddItem(new UIMenuItem("Revólver de la Marina", "")); // 1094
    armeriaPD_PISTOLAS.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    armeriaPD_PISTOLAS.ItemSelect.on((item, index) => {

        if (index < 18) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('ArmeriaPD_PISTOLAS', (index + 1));
        }

        // Volver
        if (index == 18) {
            armeriaPD_PISTOLAS?.Close(true);
        }
    });

    armeriaPD_PISTOLAS.MenuClose.on(item => {
        mostrar_armeria_pd();
        armeriaPD_PISTOLAS = null;
    });
}

function mostrar_armeria_pd_ametralladoras() {
    armeriaPD_AMETRALLADORAS = crearMenu("Ametralladoras", "", true);
    armeriaPD_AMETRALLADORAS.AddItem(new UIMenuItem("UZI", "")); // 7
    armeriaPD_AMETRALLADORAS.AddItem(new UIMenuItem("Mini SMG", "Scorpion")); // 251
    armeriaPD_AMETRALLADORAS.AddItem(new UIMenuItem("MP5", "")); // 12
    armeriaPD_AMETRALLADORAS.AddItem(new UIMenuItem("MP5 MKII", "Versión de la MP5 sin culata")); // 227
    armeriaPD_AMETRALLADORAS.AddItem(new UIMenuItem("Subfusil de asalto", "Subfusil de uso militar")); // 46
    armeriaPD_AMETRALLADORAS.AddItem(new UIMenuItem("Combat PDW", "Subfusil táctico")); // 5
    armeriaPD_AMETRALLADORAS.AddItem(new UIMenuItem("Gusenberg", "Thompson de la segunda guerra mundial")); // 21
    armeriaPD_AMETRALLADORAS.AddItem(new UIMenuItem("Ametralladora ligera", "")); // 228
    armeriaPD_AMETRALLADORAS.AddItem(new UIMenuItem("Ametralladora de combate", "")); // 26
    armeriaPD_AMETRALLADORAS.AddItem(new UIMenuItem("Ametralladora de combate MKII", "")); // 231
    armeriaPD_AMETRALLADORAS.AddItem(new UIMenuItem("Ray carabine", "")); // 794
    armeriaPD_AMETRALLADORAS.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    armeriaPD_AMETRALLADORAS.ItemSelect.on((item, index) => {

        if (index < 11) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('ArmeriaPD_AMETRALLADORAS', (index + 1));
        }

        // Volver
        if (index == 11) {
            armeriaPD_AMETRALLADORAS?.Close(true);
        }
    });

    armeriaPD_AMETRALLADORAS.MenuClose.on(item => {
        mostrar_armeria_pd();
        armeriaPD_AMETRALLADORAS = null;
    });
}

function mostrar_armeria_pd_rifles() {
    armeriaPD_RIFLES = crearMenu("Rifles de asalto", "", true);
    armeriaPD_RIFLES.AddItem(new UIMenuItem("Rifle compacto", "Versión de la AK-47 sin culata")); // 232
    armeriaPD_RIFLES.AddItem(new UIMenuItem("Rifle avanzado", "")); // 38
    armeriaPD_RIFLES.AddItem(new UIMenuItem("Rifle bullpup", " ")); // 24
    armeriaPD_RIFLES.AddItem(new UIMenuItem("Rifle bullpup MKII", "Famas del ejército Francés")); // 236
    armeriaPD_RIFLES.AddItem(new UIMenuItem("AK-47", "")); // 40
    armeriaPD_RIFLES.AddItem(new UIMenuItem("AK-47 MKII", "Versión de la AK-47 mejorada")); // 233
    armeriaPD_RIFLES.AddItem(new UIMenuItem("M4", "")); // 27
    armeriaPD_RIFLES.AddItem(new UIMenuItem("M4 MKII", "Arma basada en la HK416")); // 234
    armeriaPD_RIFLES.AddItem(new UIMenuItem("Carabina Especial", "G36C Alemana")); // 41
    armeriaPD_RIFLES.AddItem(new UIMenuItem("Carabina Especial MKII", "G36C mejorada")); // 235
    armeriaPD_RIFLES.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    armeriaPD_RIFLES.ItemSelect.on((item, index) => {

        if (index < 10) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('ArmeriaPD_RIFLES', (index + 1));
        }

        // Volver
        if (index == 10) {
            armeriaPD_RIFLES?.Close(true);
        }
    });

    armeriaPD_RIFLES.MenuClose.on(item => {
        mostrar_armeria_pd();
        armeriaPD_RIFLES = null;
    });
}

function mostrar_armeria_pd_franco() {
    armeriaPD_FRANCO = crearMenu("Francotiradores", "", true);
    armeriaPD_FRANCO.AddItem(new UIMenuItem("Marksman rifle", "Rifle de precisión automático")); // 42 
    armeriaPD_FRANCO.AddItem(new UIMenuItem("Marksman rifle MKII", "Rifle de precisión automático potente")); // 238
    armeriaPD_FRANCO.AddItem(new UIMenuItem("Rifle de precisión pesado", "Rifle de precisión antimaterial")); // 6
    armeriaPD_FRANCO.AddItem(new UIMenuItem("Rifles de precisión pesado MKII", "")); // 237
    armeriaPD_FRANCO.AddItem(new UIMenuItem("Rifle de precisión", "")); // 2
    armeriaPD_FRANCO.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    armeriaPD_FRANCO.ItemSelect.on((item, index) => {

        if (index < 5) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('ArmeriaPD_FRANCO', (index + 1));
        }

        // Volver
        if (index == 5) {
            armeriaPD_FRANCO?.Close(true);
        }
    });

    armeriaPD_FRANCO.MenuClose.on(item => {
        mostrar_armeria_pd();
        armeriaPD_FRANCO = null;
    });
}

function mostrar_armeria_pd_escopetas() {
    armeriaPD_ESCOPETAS = crearMenu("Escopetas", "", true);
    armeriaPD_ESCOPETAS.AddItem(new UIMenuItem("Mosquete", "Mosquete del siglo 19")); // 37
    armeriaPD_ESCOPETAS.AddItem(new UIMenuItem("Escopeta recortada", "")); // 23
    armeriaPD_ESCOPETAS.AddItem(new UIMenuItem("Escopeta", " ")); // 9
    armeriaPD_ESCOPETAS.AddItem(new UIMenuItem("Escopeta Goma", "Escopeta antidisturbios")); // 240
    armeriaPD_ESCOPETAS.AddItem(new UIMenuItem("Escopeta bullpup", "")); // 35
    armeriaPD_ESCOPETAS.AddItem(new UIMenuItem("Escopeta sweeper", "Escopeta compacta con cargador de tambor")); // 252
    armeriaPD_ESCOPETAS.AddItem(new UIMenuItem("Escopeta pesada", "")); // 15
    armeriaPD_ESCOPETAS.AddItem(new UIMenuItem("Escopeta de asalto", "")); // 45
    armeriaPD_ESCOPETAS.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    armeriaPD_ESCOPETAS.ItemSelect.on((item, index) => {

        if (index < 8) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('ArmeriaPD_ESCOPETAS', (index + 1));
        }

        // Volver
        if (index == 8) {
            armeriaPD_ESCOPETAS?.Close(true);
        }
    });

    armeriaPD_ESCOPETAS.MenuClose.on(item => {
        mostrar_armeria_pd();
        armeriaPD_ESCOPETAS = null;
    });
}

function mostrar_armeria_pd_pesadas() {
    armeriaPD_PESADAS = crearMenu("Armas pesadas", "", true);
    armeriaPD_PESADAS.AddItem(new UIMenuItem("Lanzagranadas casero", "Un lanzagranadas compacto")); // 253
    armeriaPD_PESADAS.AddItem(new UIMenuItem("RPG", "")); // 226
    armeriaPD_PESADAS.AddItem(new UIMenuItem("Stinger", "Lanzamisiles con sensor de calor")); // 225
    armeriaPD_PESADAS.AddItem(new UIMenuItem("Minigun", "")); // 229
    armeriaPD_PESADAS.AddItem(new UIMenuItem("Railgun", "Lanzarallos")); // 241
    armeriaPD_PESADAS.AddItem(new UIMenuItem("Lanzapetardos", "")); // 223
    armeriaPD_PESADAS.AddItem(new UIMenuItem("Ray minigun", "")); // 793
    armeriaPD_PESADAS.AddItem(new UIMenuItem("Lanzagranadas", "Un lanzagranadas")); //1089	
    armeriaPD_PESADAS.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    armeriaPD_PESADAS.ItemSelect.on((item, index) => {

        if (index < 8) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('ArmeriaPD_PESADAS', (index + 1));
        }

        // Volver
        if (index == 8) {
            armeriaPD_PESADAS?.Close(true);
        }
    });

    armeriaPD_PESADAS.MenuClose.on(item => {
        mostrar_armeria_pd();
        armeriaPD_PESADAS = null;
    });
}

function mostrar_armeria_pd_lanzadas() {
    armeriaPD_LANZADAS = crearMenu("Armas lanzadas", "", true);
    armeriaPD_LANZADAS.AddItem(new UIMenuItem("Lata de combustible", "")); // 13
    armeriaPD_LANZADAS.AddItem(new UIMenuItem("Bola de nieve", "")); // 214
    armeriaPD_LANZADAS.AddItem(new UIMenuItem("Pelota", " ")); // 10
    armeriaPD_LANZADAS.AddItem(new UIMenuItem("Bengala", "")); // 18
    armeriaPD_LANZADAS.AddItem(new UIMenuItem("Granada de humo", "")); // 49
    armeriaPD_LANZADAS.AddItem(new UIMenuItem("Gas lacrimógeno", "")); // 36
    armeriaPD_LANZADAS.AddItem(new UIMenuItem("Molotov", "")); // 11
    armeriaPD_LANZADAS.AddItem(new UIMenuItem("Bomba casera", "")); // 254
    armeriaPD_LANZADAS.AddItem(new UIMenuItem("Granada", "")); // 221
    armeriaPD_LANZADAS.AddItem(new UIMenuItem("Mina con detonador", "")); // 222
    armeriaPD_LANZADAS.AddItem(new UIMenuItem("Mina de aproximación", "")); // 220
    armeriaPD_LANZADAS.AddItem(new UIMenuItem("Extintor", "")); // 3
    armeriaPD_LANZADAS.AddItem(new UIMenuItem("Bidón peligroso", "")); // 1091
    armeriaPD_LANZADAS.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    armeriaPD_LANZADAS.ItemSelect.on((item, index) => {

        if (index < 13) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('ArmeriaPD_LANZADAS', (index + 1));
        }

        // Volver
        if (index == 13) {
            armeriaPD_LANZADAS?.Close(true);
        }
    });

    armeriaPD_LANZADAS.MenuClose.on(item => {
        mostrar_armeria_pd();
        armeriaPD_LANZADAS = null;
    });
}

function mostrar_armeria_pd_otros() {
    armeriaPD_OTROS = crearMenu("Otros", "", true);
    armeriaPD_OTROS.AddItem(new UIMenuItem("Paracaídas", "")); // 50
    armeriaPD_OTROS.AddItem(new UIMenuItem("Lanzahumo", "Un lanzagranadas destinado para manifestaciones")); // 224
    armeriaPD_OTROS.AddItem(new UIMenuItem("Megáfono", "Un megáfono (Uso: /meg [texto])")); // 145
    armeriaPD_OTROS.AddItem(new UIMenuItem("Botiquin", "Botiquin medico")); // 145
    armeriaPD_OTROS.AddItem(new UIMenuItem("Escudo Antidisturbios", "")); // 534
    armeriaPD_OTROS.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    armeriaPD_OTROS.ItemSelect.on((item, index) => {

        if (index < 5) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('ArmeriaPD_OTROS', (index + 1));
        }

        // Volver
        if (index == 5) {
            armeriaPD_OTROS?.Close(true);
        }
    });

    armeriaPD_OTROS.MenuClose.on(item => {
        mostrar_armeria_pd();
        armeriaPD_OTROS = null;
    });
}

function mostrar_armeria_pd_conos() {
    armeriaPD_CONOS = crearMenu("Conos", "", true);
    armeriaPD_CONOS.AddItem(new UIMenuItem("Cartel vehículos parados", "")); // 2042
    armeriaPD_CONOS.AddItem(new UIMenuItem("Barrera luminosa dirección", "Un lanzagranadas destinado para manifestaciones")); // 2040
    armeriaPD_CONOS.AddItem(new UIMenuItem("Cono luminoso", "Un megáfono (Uso: /meg [texto])")); // 2037
    armeriaPD_CONOS.AddItem(new UIMenuItem("Barrera blanca y naranja", "Botiquin medico")); // 2035
    armeriaPD_CONOS.AddItem(new UIMenuItem("Barrera", "")); // 1765
    armeriaPD_CONOS.AddItem(new UIMenuItem("Cono", "")); // 877
    armeriaPD_CONOS.AddItem(new UIMenuItem("Pinchos", "")); // 2048
    armeriaPD_CONOS.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    armeriaPD_CONOS.ItemSelect.on((item, index) => {

        if (index < 7) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('ArmeriaPD_CONOS', (index + 1));
        }

        // Volver
        if (index == 7) {
            armeriaPD_CONOS?.Close(true);
        }
    });

    armeriaPD_CONOS.MenuClose.on(item => {
        mostrar_armeria_pd();
        armeriaPD_CONOS = null;
    });
}

function mostrar_armeria_pd_cargadores() {
    armeriaPD_CARGADORES = crearMenu("Cargadores", "", true);
    armeriaPD_CARGADORES.AddItem(new UIMenuItem("Fusil de francotirador pesado", "")); 
    armeriaPD_CARGADORES.AddItem(new UIMenuItem("Fusil de tirador MkII", "")); 
    armeriaPD_CARGADORES.AddItem(new UIMenuItem("Escopeta", "")); 
    armeriaPD_CARGADORES.AddItem(new UIMenuItem("Pistola", "")); 
    armeriaPD_CARGADORES.AddItem(new UIMenuItem("Pistola calibre 50", "")); 
    armeriaPD_CARGADORES.AddItem(new UIMenuItem("Pistola de combate", "")); 
    armeriaPD_CARGADORES.AddItem(new UIMenuItem("Pistola pesada", "")); 
    armeriaPD_CARGADORES.AddItem(new UIMenuItem("Subfusil", "")); 
    armeriaPD_CARGADORES.AddItem(new UIMenuItem("Escopeta pesada", "")); 
    armeriaPD_CARGADORES.AddItem(new UIMenuItem("Ametralladora de combate", "")); 
    armeriaPD_CARGADORES.AddItem(new UIMenuItem("M4", "")); 
    armeriaPD_CARGADORES.AddItem(new UIMenuItem("M4 MKII", ""));
    armeriaPD_CARGADORES.AddItem(new UIMenuItem("Escopeta de goma", ""));
    armeriaPD_CARGADORES.AddItem(new UIMenuItem("Carabina especial", ""));
    armeriaPD_CARGADORES.AddItem(new UIMenuItem("Carabina especial MKII", ""));
    armeriaPD_CARGADORES.AddItem(new UIMenuItem("Pistola MKII", ""));
    armeriaPD_CARGADORES.AddItem(new UIMenuItem("Pistola perforante", ""));
    armeriaPD_CARGADORES.AddItem(new UIMenuItem("Lanzahumos", ""));
    armeriaPD_CARGADORES.AddItem(new UIMenuItem("Pistola de bengalas", ""));
    armeriaPD_CARGADORES.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    armeriaPD_CARGADORES.ItemSelect.on((item, index) => {

        if (index < 19) {
            //Damos la ropa depde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('armeriaPD_CARGADORES', (index + 1));
        }

        // Volver
        if (index == 19) {
            armeriaPD_CARGADORES?.Close(true);
        }
    });

    armeriaPD_CARGADORES.MenuClose.on(item => {
        mostrar_armeria_pd();
        armeriaPD_CARGADORES = null;
    });
}

}