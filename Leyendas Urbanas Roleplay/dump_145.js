{
/* --------------------------------------------------------------------------------
 * armeriasd.js
 *
 * Autor: FerniMoon
 *
 * Descripción: Menu de armeria para la facción LSSD
 *
 * -------------------------------------------------------------------------------- */

mp.events.add("mostrar_armeria_sd", function () { mostrar_armeria_sd() });

function mostrar_armeria_sd() {
    armeriaSD = crearMenu("Armeria", "LSSD - CÚPULA");
    armeriaSD.AddItem(new UIMenuItem("Blancas", "LSSD - CÚPULA"));
    armeriaSD.AddItem(new UIMenuItem("Pistolas", "LSSD - CÚPULA"));
    armeriaSD.AddItem(new UIMenuItem("Ametralladoras", "LSSD - CÚPULA"));
    armeriaSD.AddItem(new UIMenuItem("Rifles de asalto", "LSSD - CÚPULA"));
    armeriaSD.AddItem(new UIMenuItem("Francotiradores", "LSSD - CÚPULA"));
    armeriaSD.AddItem(new UIMenuItem("Escopetas", "LSSD - CÚPULA"));
    armeriaSD.AddItem(new UIMenuItem("Armas pesadas", "LSSD - CÚPULA"));
    armeriaSD.AddItem(new UIMenuItem("Armas lanzadas", "LSSD - CÚPULA"));
    armeriaSD.AddItem(new UIMenuItem("Otros", "LSSD - CÚPULA"));
    armeriaSD.AddItem(new UIMenuItem("Cargadores", "LSSD - CÚPULA"));
    armeriaSD.AddItem(new UIMenuItem("Conos", "LSSD - CÚPULA"));

    armeriaSD.ItemSelect.on((item, index) => {
        switch (index) {
            case 0:
                mostrar_armeria_sd_blancas();
                break;
            case 1:
                mostrar_armeria_sd_pistolas();
                break;
            case 2:
                mostrar_armeria_sd_ametralladoras();
                break;
            case 3:
                mostrar_armeria_sd_rifles();
                break;
            case 4:
                mostrar_armeria_sd_franco();
                break;
            case 5:
                mostrar_armeria_sd_escopetas();
                break;
            case 6:
                mostrar_armeria_sd_pesadas();
                break;
            case 7:
                mostrar_armeria_sd_lanzadas();
                break;
            case 8:
                mostrar_armeria_sd_otros();
                break;
            case 9:
                mostrar_armeria_sd_cargadores();
                break;
            case 10:
                mostrar_armeria_sd_conos();
                break;
            default:
                armeriaSD?.Close();
                return;
        }

        armeriaSD?.Close(true);
    });

    armeriaSD.MenuClose.on(item => {
        armeriaSD = null;
    });
}

function mostrar_armeria_sd_blancas() {
    armeriaSD_BLANCAS = crearMenu("Blancas", "Armas de mano o armas blancas", true);
    armeriaSD_BLANCAS.AddItem(new UIMenuItem("Cuchillo", "")); // 33
    armeriaSD_BLANCAS.AddItem(new UIMenuItem("Porra", "Porra de uso policial")); // 22
    armeriaSD_BLANCAS.AddItem(new UIMenuItem("Martillo", " ")); // 19
    armeriaSD_BLANCAS.AddItem(new UIMenuItem("Bate béisbol", "")); // 31
    armeriaSD_BLANCAS.AddItem(new UIMenuItem("Palanca", "Gordon Freeman")); // 28
    armeriaSD_BLANCAS.AddItem(new UIMenuItem("Palo de golf", "")); // 16
    armeriaSD_BLANCAS.AddItem(new UIMenuItem("Botella cristal rota", "")); // 48
    armeriaSD_BLANCAS.AddItem(new UIMenuItem("Daga", "")); // 30
    armeriaSD_BLANCAS.AddItem(new UIMenuItem("Hacha", "")); // 47
    armeriaSD_BLANCAS.AddItem(new UIMenuItem("Puño americano", "")); // 242
    armeriaSD_BLANCAS.AddItem(new UIMenuItem("Machete", "")); // 44
    armeriaSD_BLANCAS.AddItem(new UIMenuItem("Linterna", "")); // 29
    armeriaSD_BLANCAS.AddItem(new UIMenuItem("Navaja", "")); // 243
    armeriaSD_BLANCAS.AddItem(new UIMenuItem("Taco de billar", "")); // 218
    armeriaSD_BLANCAS.AddItem(new UIMenuItem("Llave inglesa", "Usada para arreglar vehículos, o problemas personales")); // 34
    armeriaSD_BLANCAS.AddItem(new UIMenuItem("Hacha de batalla", "")); // 217
    armeriaSD_BLANCAS.AddItem(new UIMenuItem("Hacha de piedra", "")); // 1090
    armeriaSD_BLANCAS.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    armeriaSD_BLANCAS.ItemSelect.on((item, index) => {
        if (index < 17) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('armeriaSD_BLANCAS', (index + 1));
        }

        if (item.Text == "Volver") {
            armeriaSD_BLANCAS?.Close(true);
        }
    });

    armeriaSD_BLANCAS.MenuClose.on(item => {
        mostrar_armeria_sd();
        armeriaSD_BLANCAS = null;
    });
}

function mostrar_armeria_sd_pistolas() {
    armeriaSD_PISTOLAS = crearMenu("Pistolas", "", true);
    armeriaSD_PISTOLAS.AddItem(new UIMenuItem("Taser", "")); // 14
    armeriaSD_PISTOLAS.AddItem(new UIMenuItem("Pistola de bengalas", "")); // 17
    armeriaSD_PISTOLAS.AddItem(new UIMenuItem("SNS Pistol", "Pistola de dimensiones muy pequeñas")); // 39
    armeriaSD_PISTOLAS.AddItem(new UIMenuItem("SNS Pistol MKII", "Pistola de dimensiones muy pequeñas potente")); // 248
    armeriaSD_PISTOLAS.AddItem(new UIMenuItem("Pistola vintage", "Pistola antigua")); // 4
    armeriaSD_PISTOLAS.AddItem(new UIMenuItem("Pistola de combate", "")); // 20
    armeriaSD_PISTOLAS.AddItem(new UIMenuItem("Pistola", "")); // 8
    armeriaSD_PISTOLAS.AddItem(new UIMenuItem("Pistola MKII", "Pistola usada por cuerpos del estado")); // 247
    armeriaSD_PISTOLAS.AddItem(new UIMenuItem("Pistola AP", "Pistola automática")); // 215
    armeriaSD_PISTOLAS.AddItem(new UIMenuItem("Pistola pesada", "Pistola táctica con mira incorporada")); // 43
    armeriaSD_PISTOLAS.AddItem(new UIMenuItem("Pistola calibre 50", "")); // 32
    armeriaSD_PISTOLAS.AddItem(new UIMenuItem("Pistola Marksman", "Pistola antigua")); // 244
    armeriaSD_PISTOLAS.AddItem(new UIMenuItem("Revólver de doble acción", "Revólver antiguo")); // 246
    armeriaSD_PISTOLAS.AddItem(new UIMenuItem("Revólver", "")); // 245
    armeriaSD_PISTOLAS.AddItem(new UIMenuItem("Revólver MKII", "")); // 249
    armeriaSD_PISTOLAS.AddItem(new UIMenuItem("Up-n-Atomizer", "")); // 1092
    armeriaSD_PISTOLAS.AddItem(new UIMenuItem("Pistola de cerámica", "")); // 1093
    armeriaSD_PISTOLAS.AddItem(new UIMenuItem("Revólver de la Marina", "")); // 1094
    armeriaSD_PISTOLAS.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    armeriaSD_PISTOLAS.ItemSelect.on((item, index) => {

        if (index < 18) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('armeriaSD_PISTOLAS', (index + 1));
        }

        if (item.Text == "Volver") {
            armeriaSD_PISTOLAS?.Close(true);
        }
    });

    armeriaSD_PISTOLAS.MenuClose.on(item => {
        mostrar_armeria_sd();
        armeriaSD_PISTOLAS = null;
    });
}

function mostrar_armeria_sd_ametralladoras() {
    armeriaSD_AMETRALLADORAS = crearMenu("Ametralladoras", "", true);
    armeriaSD_AMETRALLADORAS.AddItem(new UIMenuItem("UZI", "")); // 7
    armeriaSD_AMETRALLADORAS.AddItem(new UIMenuItem("Mini SMG", "Scorpion")); // 251
    armeriaSD_AMETRALLADORAS.AddItem(new UIMenuItem("MP5", "")); // 12
    armeriaSD_AMETRALLADORAS.AddItem(new UIMenuItem("MP5 MKII", "Versión de la MP5 sin culata")); // 227
    armeriaSD_AMETRALLADORAS.AddItem(new UIMenuItem("Subfusil de asalto", "Subfusil de uso militar")); // 46
    armeriaSD_AMETRALLADORAS.AddItem(new UIMenuItem("Combat PDW", "Subfusil táctico")); // 5
    armeriaSD_AMETRALLADORAS.AddItem(new UIMenuItem("Gusenberg", "Thompson de la segunda guerra mundial")); // 21
    armeriaSD_AMETRALLADORAS.AddItem(new UIMenuItem("Ametralladora ligera", "")); // 228
    armeriaSD_AMETRALLADORAS.AddItem(new UIMenuItem("Ametralladora de combate", "")); // 26
    armeriaSD_AMETRALLADORAS.AddItem(new UIMenuItem("Ametralladora de combate MKII", "")); // 231
    armeriaSD_AMETRALLADORAS.AddItem(new UIMenuItem("Ray carabine", "")); // 794
    armeriaSD_AMETRALLADORAS.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    armeriaSD_AMETRALLADORAS.ItemSelect.on((item, index) => {

        if (index < 11) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('armeriaSD_AMETRALLADORAS', (index + 1));
        }

        if (item.Text == "Volver") {
            armeriaSD_AMETRALLADORAS?.Close(true);
        }
    });

    armeriaSD_AMETRALLADORAS.MenuClose.on(item => {
        mostrar_armeria_sd();
        armeriaSD_AMETRALLADORAS = null;
    });
}

function mostrar_armeria_sd_rifles() {
    armeriaSD_RIFLES = crearMenu("Rifles de asalto", "", true);
    armeriaSD_RIFLES.AddItem(new UIMenuItem("Rifle compacto", "Versión de la AK-47 sin culata")); // 232
    armeriaSD_RIFLES.AddItem(new UIMenuItem("Rifle avanzado", "")); // 38
    armeriaSD_RIFLES.AddItem(new UIMenuItem("Rifle bullpup", " ")); // 24
    armeriaSD_RIFLES.AddItem(new UIMenuItem("Rifle bullpup MKII", "Famas del ejército Francés")); // 236
    armeriaSD_RIFLES.AddItem(new UIMenuItem("AK-47", "")); // 40
    armeriaSD_RIFLES.AddItem(new UIMenuItem("AK-47 MKII", "Versión de la AK-47 mejorada")); // 233
    armeriaSD_RIFLES.AddItem(new UIMenuItem("M4", "")); // 27
    armeriaSD_RIFLES.AddItem(new UIMenuItem("M4 MKII", "Arma basada en la HK416")); // 234
    armeriaSD_RIFLES.AddItem(new UIMenuItem("Carabina Especial", "G36C Alemana")); // 41
    armeriaSD_RIFLES.AddItem(new UIMenuItem("Carabina Especial MKII", "G36C mejorada")); // 235
    armeriaSD_RIFLES.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    armeriaSD_RIFLESVisible = true;

    armeriaSD_RIFLES.ItemSelect.on((item, index) => {

        if (index < 10) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('armeriaSD_RIFLES', (index + 1));
        }

        if (item.Text == "Volver") {
            armeriaSD_RIFLES?.Close(true);
        }
    });

    armeriaSD_RIFLES.MenuClose.on(item => {
        mostrar_armeria_sd();
        armeriaSD_RIFLES = null;
    });
}

function mostrar_armeria_sd_franco() {
    armeriaSD_FRANCO = crearMenu("Francotiradores", "", true);
    armeriaSD_FRANCO.AddItem(new UIMenuItem("Marksman rifle", "Rifle de precisión automático")); // 42 
    armeriaSD_FRANCO.AddItem(new UIMenuItem("Marksman rifle MKII", "Rifle de precisión automático potente")); // 238
    armeriaSD_FRANCO.AddItem(new UIMenuItem("Rifle de precisión pesado", "Rifle de precisión antimaterial")); // 6
    armeriaSD_FRANCO.AddItem(new UIMenuItem("Rifles de precisión pesado MKII", "")); // 237
    armeriaSD_FRANCO.AddItem(new UIMenuItem("Rifle de precisión", "")); // 2
    armeriaSD_FRANCO.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    armeriaSD_FRANCO.ItemSelect.on((item, index) => {

        if (index < 5) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('armeriaSD_FRANCO', (index + 1));
        }

        if (item.Text == "Volver") {
            armeriaSD_FRANCO?.Close(true);
        }
    });

    armeriaSD_FRANCO.MenuClose.on(item => {
        mostrar_armeria_sd();
        armeriaSD_FRANCO = null;
    });
}

function mostrar_armeria_sd_escopetas() {
    armeriaSD_ESCOPETAS = crearMenu("Escopetas", "", true);
    armeriaSD_ESCOPETAS.AddItem(new UIMenuItem("Mosquete", "Mosquete del siglo 19")); // 37
    armeriaSD_ESCOPETAS.AddItem(new UIMenuItem("Escopeta recortada", "")); // 23
    armeriaSD_ESCOPETAS.AddItem(new UIMenuItem("Escopeta", " ")); // 9
    armeriaSD_ESCOPETAS.AddItem(new UIMenuItem("Escopeta Goma", "Escopeta antidisturbios")); // 240
    armeriaSD_ESCOPETAS.AddItem(new UIMenuItem("Escopeta bullpup", "")); // 35
    armeriaSD_ESCOPETAS.AddItem(new UIMenuItem("Escopeta sweeper", "Escopeta compacta con cargador de tambor")); // 252
    armeriaSD_ESCOPETAS.AddItem(new UIMenuItem("Escopeta pesada", "")); // 15
    armeriaSD_ESCOPETAS.AddItem(new UIMenuItem("Escopeta de asalto", "")); // 45
    armeriaSD_ESCOPETAS.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    armeriaSD_ESCOPETAS.ItemSelect.on((item, index) => {

        if (index < 8) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('armeriaSD_ESCOPETAS', (index + 1));
        }

        if (item.Text == "Volver") {
            armeriaSD_ESCOPETAS?.Close(true);
        }
    });

    armeriaSD_ESCOPETAS.MenuClose.on(item => {
        mostrar_armeria_sd();
        armeriaSD_ESCOPETAS = null;
    });
}

function mostrar_armeria_sd_pesadas() {
    armeriaSD_PESADAS = crearMenu("Armas pesadas", "", true);
    armeriaSD_PESADAS.AddItem(new UIMenuItem("Lanzagranadas casero", "Un lanzagranadas compacto")); // 253
    armeriaSD_PESADAS.AddItem(new UIMenuItem("RPG", "")); // 226
    armeriaSD_PESADAS.AddItem(new UIMenuItem("Stinger", "Lanzamisiles con sensor de calor")); // 225
    armeriaSD_PESADAS.AddItem(new UIMenuItem("Minigun", "")); // 229
    armeriaSD_PESADAS.AddItem(new UIMenuItem("Railgun", "Lanzarallos")); // 241
    armeriaSD_PESADAS.AddItem(new UIMenuItem("Lanzapetardos", "")); // 223
    armeriaSD_PESADAS.AddItem(new UIMenuItem("Ray minigun", "")); // 793
    armeriaSD_PESADAS.AddItem(new UIMenuItem("Lanzagranadas", "Un lanzagranadas")); //1089	
    armeriaSD_PESADAS.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    armeriaSD_PESADAS.ItemSelect.on((item, index) => {

        if (index < 8) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('armeriaSD_PESADAS', (index + 1));
        }

        if (item.Text == "Volver") {
            armeriaSD_PESADAS?.Close(true);
        }
    });

    armeriaSD_PESADAS.MenuClose.on(item => {
        mostrar_armeria_sd();
        armeriaSD_PESADAS = null;
    });
}

function mostrar_armeria_sd_lanzadas() {
    armeriaSD_LANZADAS = crearMenu("Armas lanzadas", "", true);
    armeriaSD_LANZADAS.AddItem(new UIMenuItem("Lata de combustible", "")); // 13
    armeriaSD_LANZADAS.AddItem(new UIMenuItem("Bola de nieve", "")); // 214
    armeriaSD_LANZADAS.AddItem(new UIMenuItem("Pelota", " ")); // 10
    armeriaSD_LANZADAS.AddItem(new UIMenuItem("Bengala", "")); // 18
    armeriaSD_LANZADAS.AddItem(new UIMenuItem("Granada de humo", "")); // 49
    armeriaSD_LANZADAS.AddItem(new UIMenuItem("Gas lacrimógeno", "")); // 36
    armeriaSD_LANZADAS.AddItem(new UIMenuItem("Molotov", "")); // 11
    armeriaSD_LANZADAS.AddItem(new UIMenuItem("Bomba casera", "")); // 254
    armeriaSD_LANZADAS.AddItem(new UIMenuItem("Granada", "")); // 221
    armeriaSD_LANZADAS.AddItem(new UIMenuItem("Mina con detonador", "")); // 222
    armeriaSD_LANZADAS.AddItem(new UIMenuItem("Mina de aproximación", "")); // 220
    armeriaSD_LANZADAS.AddItem(new UIMenuItem("Extintor", "")); // 3
    armeriaSD_LANZADAS.AddItem(new UIMenuItem("Bidón peligroso", "")); // 1091
    armeriaSD_LANZADAS.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    armeriaSD_LANZADAS.ItemSelect.on((item, index) => {

        if (index < 13) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('armeriaSD_LANZADAS', (index + 1));
        }

        if (item.Text == "Volver") {
            armeriaSD_LANZADAS?.Close(true);
        }
    });

    armeriaSD_LANZADAS.MenuClose.on(item => {
        mostrar_armeria_sd();
        armeriaSD_LANZADAS = null;
    });
}

function mostrar_armeria_sd_otros() {
    armeriaSD_OTROS = crearMenu("Otros", "", true);
    armeriaSD_OTROS.AddItem(new UIMenuItem("Paracaídas", "")); // 50
    armeriaSD_OTROS.AddItem(new UIMenuItem("Lanzahumo", "Un lanzagranadas destinado para manifestaciones")); // 224
    armeriaSD_OTROS.AddItem(new UIMenuItem("Megáfono", "Un megáfono (Uso: /meg [texto])")); // 145
    armeriaSD_OTROS.AddItem(new UIMenuItem("Botiquin", "Botiquin medico")); // 145
    armeriaSD_OTROS.AddItem(new UIMenuItem("Escudo Antidisturbios", "")); // 534
    armeriaSD_OTROS.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    armeriaSD_OTROS.ItemSelect.on((item, index) => {

        if (index < 5) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('armeriaSD_OTROS', (index + 1));
        }

        if (item.Text == "Volver") {
            armeriaSD_OTROS?.Close(true);
        }
    });

    armeriaSD_OTROS.MenuClose.on(item => {
        mostrar_armeria_sd();
        armeriaSD_OTROS = null;
    });
}

function mostrar_armeria_sd_conos() {
    armeriaSD_CONOS = crearMenu("Conos", "", true);
    armeriaSD_CONOS.AddItem(new UIMenuItem("Cartel vehículos parados", "")); // 2042
    armeriaSD_CONOS.AddItem(new UIMenuItem("Barrera luminosa dirección", "Un lanzagranadas destinado para manifestaciones")); // 2040
    armeriaSD_CONOS.AddItem(new UIMenuItem("Cono luminoso", "Un megáfono (Uso: /meg [texto])")); // 2037
    armeriaSD_CONOS.AddItem(new UIMenuItem("Barrera blanca y naranja", "Botiquin medico")); // 2035
    armeriaSD_CONOS.AddItem(new UIMenuItem("Barrera", "")); // 1765
    armeriaSD_CONOS.AddItem(new UIMenuItem("Cono", "")); // 877
    armeriaSD_CONOS.AddItem(new UIMenuItem("Pinchos", "")); // 2048
    armeriaSD_CONOS.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    armeriaSD_CONOS.ItemSelect.on((item, index) => {

        if (index < 7) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('armeriaSD_CONOS', (index + 1));
        }

        if (item.Text == "Volver") {
            armeriaSD_CONOS?.Close(true);
        }
    });

    armeriaSD_CONOS.MenuClose.on(item => {
        mostrar_armeria_sd();
        armeriaSD_CONOS = null;
    });
}

function mostrar_armeria_sd_cargadores() {
    armeriaSD_CARGADORES = crearMenu("Cargadores", "", true);
    armeriaSD_CARGADORES.AddItem(new UIMenuItem("Fusil de francotirador pesado", "")); 
    armeriaSD_CARGADORES.AddItem(new UIMenuItem("Fusil de tirador MkII", "")); 
    armeriaSD_CARGADORES.AddItem(new UIMenuItem("Escopeta", "")); 
    armeriaSD_CARGADORES.AddItem(new UIMenuItem("Pistola", "")); 
    armeriaSD_CARGADORES.AddItem(new UIMenuItem("Pistola calibre 50", "")); 
    armeriaSD_CARGADORES.AddItem(new UIMenuItem("Pistola de combate", "")); 
    armeriaSD_CARGADORES.AddItem(new UIMenuItem("Pistola pesada", "")); 
    armeriaSD_CARGADORES.AddItem(new UIMenuItem("Subfusil", "")); 
    armeriaSD_CARGADORES.AddItem(new UIMenuItem("Escopeta pesada", "")); 
    armeriaSD_CARGADORES.AddItem(new UIMenuItem("Ametralladora de combate", "")); 
    armeriaSD_CARGADORES.AddItem(new UIMenuItem("M4", "")); 
    armeriaSD_CARGADORES.AddItem(new UIMenuItem("M4 MKII", ""));
    armeriaSD_CARGADORES.AddItem(new UIMenuItem("Escopeta de goma", ""));
    armeriaSD_CARGADORES.AddItem(new UIMenuItem("Carabina especial", ""));
    armeriaSD_CARGADORES.AddItem(new UIMenuItem("Carabina especial MKII", ""));
    armeriaSD_CARGADORES.AddItem(new UIMenuItem("Pistola MKII", ""));
    armeriaSD_CARGADORES.AddItem(new UIMenuItem("Pistola perforante", ""));
    armeriaSD_CARGADORES.AddItem(new UIMenuItem("Lanzahumos", ""));
    armeriaSD_CARGADORES.AddItem(new UIMenuItem("Pistola de bengalas", ""));
    armeriaSD_CARGADORES.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    armeriaSD_CARGADORES.ItemSelect.on((item, index) => {

        if (index < 19) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('armeriaSD_CARGADORES', (index + 1));
        }

        if (item.Text == "Volver") {
            armeriaSD_CARGADORES?.Close(true);
        }
    });

    armeriaSD_CARGADORES.MenuClose.on(item => {
        mostrar_armeria_sd();
        armeriaSD_CARGADORES = null;
    });
}

}