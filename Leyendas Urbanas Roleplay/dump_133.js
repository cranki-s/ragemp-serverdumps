{
/* --------------------------------------------------------------------------------
 * ammunation.js
    *
 * Autor: FerniMoon
    *
 * Descripción: Menu de ammunations
    *
 * -------------------------------------------------------------------------------- */

/*
 *      EVENTOS PARA COMPRAR ARMAS Y CARGADORES
 */
mp.events.add({
    'ammunation:mostrar_menu': (licenciasActuales) => {

        let array = JSON.parse(licenciasActuales);
        tieneLicenciaD = array[0];
        tieneLicenciaF = array[1];
        tieneLicenciaA = array[2];
        tieneLicenciaB = array[3];
        tieneLicenciaC = array[4];
        tieneLicenciaE = array[5];
        tieneLicenciaG = array[6];

        mostrar_licencia_ammunation();
    },
})

/*
 *      VARIABLES USADAS EN LOS MENUS DE COMPRAR ARMAS Y CARGADORES
 */
let licencia_elegida;

/*
 *      MENU PRINCIPAL PARA COMPRAR ARMAS Y CARGADORES. SELECCIONA LA LICENCIA CON LA QUE COMPRA EL ARMAMENTO
 */
function mostrar_licencia_ammunation() {

    if (tieneLicenciaA == false && tieneLicenciaB == false && tieneLicenciaC == false && tieneLicenciaD == false && tieneLicenciaE == false && tieneLicenciaF == false && tieneLicenciaG == false) {
        mostrarAviso("danger", 5000, 'No tienes ninguna licencia de armas en vigor por lo que no puedes comprar nada aqui');
        return;
    }

    licencia_elegida = 0;

    ammunation_licencia = crearMenu("Ammunation", "Tipos de licencias en pertenencia");
    if (tieneLicenciaA == true) {
        ammunation_licencia.AddItem(new UIMenuItem("Armas tipo A", "Selecciona la licencia con la que adquirir el armamento. La licencia deberá estar en vigor."));
    }
    if (tieneLicenciaB == true) {
        ammunation_licencia.AddItem(new UIMenuItem("Armas tipo B", "Selecciona la licencia con la que adquirir el armamento. La licencia deberá estar en vigor."));
    }
    if (tieneLicenciaC == true) {
        ammunation_licencia.AddItem(new UIMenuItem("Armas tipo C", "Selecciona la licencia con la que adquirir el armamento. La licencia deberá estar en vigor."));
    }
    if (tieneLicenciaD == true) {
        ammunation_licencia.AddItem(new UIMenuItem("Armas tipo D (Guardia de seguridad)", "Selecciona la licencia con la que adquirir el armamento. La licencia deberá estar en vigor."));
    }
    if (tieneLicenciaE == true) {
        ammunation_licencia.AddItem(new UIMenuItem("Armas tipo E", "Selecciona la licencia con la que adquirir el armamento. La licencia deberá estar en vigor."));
    }
    if (tieneLicenciaF == true) {
        ammunation_licencia.AddItem(new UIMenuItem("Armas tipo F (Cazador)", "Selecciona la licencia con la que adquirir el armamento. La licencia deberá estar en vigor."));
    }
    if (tieneLicenciaG == true) {
        ammunation_licencia.AddItem(new UIMenuItem("Armas tipo G", "Selecciona la licencia con la que adquirir el armamento. La licencia deberá estar en vigor."));
    }
    ammunation_licencia.AddItem(new UIMenuItem("Cerrar", " "));

    ammunation_licencia.ItemSelect.on((item, index) => {
        let enMostrador = false;

        ammunations.forEach(function (obj) {
            if (calcDist(player_local.position, obj.posicion) < 1.0 && player_local.dimension == 0) {
                enMostrador = true;
                return;
            }
        });

        if (!enMostrador) {
            mostrarAviso("danger", 8000, 'Debes estar frente al mostrador para poder hacer esto');
            return;
        }

        switch (item.Text) {
            case "Armas tipo A":
                licencia_elegida = 12;
                mostrar_menuammunation_TIPOA();
                break;
            case "Armas tipo B":
                licencia_elegida = 13;
                mostrar_menuammunation_TIPOB();
                break;
            case "Armas tipo C":
                licencia_elegida = 14;
                mostrar_menuammunation_TIPOC();
                break;
            case "Armas tipo D (Guardia de seguridad)":
                licencia_elegida = 9;
                mostrar_menuammunation_TIPOD();
                break;
            case "Armas tipo E":
                licencia_elegida = 15;
                mostrar_menuammunation_TIPOE();
                break;
            case "Armas tipo F (Cazador)":
                licencia_elegida = 10;
                mostrar_menuammunation_TIPOF();
                break;
            case "Armas tipo G":
                licencia_elegida = 16;
                mostrar_menuammunation_TIPOG();
                break;
            case "Cerrar":
                ammunation_licencia?.Close();
                return;
        }

        ammunation_licencia?.Close(true);
    });

    ammunation_licencia.MenuClose.on(item => {
        ammunation_licencia = null;
    });
}

/*
 *      SELECCIONAR CATEGORIA DE ARMA O DE CARGADOR A COMPRAR
 */
function mostrar_menuammunation_TIPOA() {
    ammunation_TIPOA = crearMenu("Armas tipo A", "Categorias y cargadores", true);
    ammunation_TIPOA.AddItem(new UIMenuItem("(1) 3ª categoria", ""));
    ammunation_TIPOA.AddItem(new UIMenuItem("(1) Cargadores", "Cargadores para armas de 3ª categoria"));
    ammunation_TIPOA.AddItem(new UIMenuItem("Volver", "Vuelve al menu principal"));

    ammunation_TIPOA.ItemSelect.on((item, index) => {
        switch (index) {
            case 0:
                mostrar_menuammunation_3CATEGORIA();
                break;
            case 1:
                mostrar_cargadores_3CATEGORIA();
                break;
            default:
                ammunation_TIPOA?.Close(true);
                return;
        }

        ammunation_TIPOA.setVisible(false, true);
        ammunation_TIPOA = null;
    });

    ammunation_TIPOA.MenuClose.on(item => {
        mostrar_licencia_ammunation();
        ammunation_TIPOA = null;
    });
}

function mostrar_menuammunation_TIPOB() {
    ammunation_TIPOB = crearMenu("Armas tipo B", "Categorias y cargadores", true);
    ammunation_TIPOB.AddItem(new UIMenuItem("(1) 4ª categoria", ""));
    ammunation_TIPOB.AddItem(new UIMenuItem("(1) Cargadores", "Cargadores para armas de 4ª categoria"));
    ammunation_TIPOB.AddItem(new UIMenuItem("(2) 7ª categoria", ""));
    ammunation_TIPOB.AddItem(new UIMenuItem("(2) Cargadores", "Cargadores para armas de 7ª categoria"));
    ammunation_TIPOB.AddItem(new UIMenuItem("Volver", "Vuelve al menu principal"));

    ammunation_TIPOB.ItemSelect.on((item, index) => {
        switch (index) {
            case 0:
                mostrar_menuammunation_4CATEGORIA();
                break;
            case 1:
                mostrar_cargadores_4CATEGORIA();
                break;
            case 2:
                mostrar_menuammunation_7CATEGORIA();
                break;
            case 3:
                mostrar_cargadores_7CATEGORIA();
                break;
            default:
                ammunation_TIPOB?.Close(true);
                return;
        }

        ammunation_TIPOB.setVisible(false);
        ammunation_TIPOB = null;
    });

    ammunation_TIPOB.MenuClose.on(item => {
        mostrar_licencia_ammunation();
        ammunation_TIPOB = null;
    });
}

function mostrar_menuammunation_TIPOC() {
    ammunation_TIPOC = crearMenu("Armas tipo C", "Categorias y cargadores", true);
    ammunation_TIPOC.AddItem(new UIMenuItem("(1) 5ª categoria", ""));
    ammunation_TIPOC.AddItem(new UIMenuItem("(1) Cargadores", "Cargadores para armas de 5ª categoria"));
    ammunation_TIPOC.AddItem(new UIMenuItem("Volver", "Vuelve al menu principal"));

    ammunation_TIPOC.ItemSelect.on((item, index) => {
        switch (index) {
            case 0:
                mostrar_menuammunation_5CATEGORIA();
                break;
            case 1:
                mostrar_cargadores_5CATEGORIA();
                break;
            default:
                ammunation_TIPOC?.Close(true);
                return;
        }

        ammunation_TIPOC.setVisible(false);
        ammunation_TIPOC = null;
    });

    ammunation_TIPOC.MenuClose.on(item => {
        mostrar_licencia_ammunation();
        ammunation_TIPOC = null;
    });
}

function mostrar_menuammunation_TIPOD() {
    ammunation_TIPOD = crearMenu("Armas tipo D", "Armas para negocios de Seguridad", true);
    ammunation_TIPOD.AddItem(new UIMenuItem("Cajas", ""));
    AmmuOpcionItem = new UIMenuItem("Porra", "También conocida como: Porra policial"); // 22
    AmmuOpcionItem.SetRightLabel("15.000$");
    ammunation_TIPOD.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Pistola eléctrica", "También conocida como: Taser"); // 14
    AmmuOpcionItem.SetRightLabel("30.000$");
    ammunation_TIPOD.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Pistola", " "); // 8
    AmmuOpcionItem.SetRightLabel("50.000$");
    ammunation_TIPOD.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Cargador de pistola", " "); //
    AmmuOpcionItem.SetRightLabel("10.000$");
    ammunation_TIPOD.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Subfusil", " "); // 12
    AmmuOpcionItem.SetRightLabel("150.000$");
    ammunation_TIPOD.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Cargador de subfusil", " "); //
    AmmuOpcionItem.SetRightLabel("30.000$");
    ammunation_TIPOD.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Carabina", "También conocida como: M4"); // 27
    AmmuOpcionItem.SetRightLabel("250.000$");
    ammunation_TIPOD.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Cargador de carabina", " "); //
    AmmuOpcionItem.SetRightLabel("50.000$");
    ammunation_TIPOD.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Escopeta corredera", "También conocida como: Escopeta"); // 9
    AmmuOpcionItem.SetRightLabel("80.000$");
    ammunation_TIPOD.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Cartucho de escopeta corredera", " "); //
    AmmuOpcionItem.SetRightLabel("16.000$");
    ammunation_TIPOD.AddItem(AmmuOpcionItem);
    ammunation_TIPOD.AddItem(new UIMenuItem("Volver", "Vuelve al menu principal"));

    ammunation_TIPOD.ItemSelect.on((item, index) => {
        if (index == 0) // Cajas
        {
            ammunation_TIPOD.setVisible(false, true);
            ammunation_TIPOD = null;
            mostrar_menuammunation_cajas();
        }

        if (index >= 1 && index <= 10) // Armas y cargadores
        {
            mp.events.callRemote('ammunation:comprar_armamento_TIPOD', index, licencia_elegida);
        }

        if (index == 11) // Volver
        {
            ammunation_TIPOD?.Close(true);
        }
    });

    ammunation_TIPOD.MenuClose.on(item => {
        mostrar_licencia_ammunation();
        ammunation_TIPOD = null;
    });
}

function mostrar_menuammunation_cajas() {
    ammunation_CAJAS = crearMenu("Cajas", "Cajas de armamento", true);
    AmmuOpcionItem = new UIMenuItem("Caja con detector de metales", "Caja con un detector metales plegado en su interior"); // 1587
    AmmuOpcionItem.SetRightLabel("50.000$");
    ammunation_CAJAS.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Caja con porras policiales (x5)", "Caja con 5 unidades de porras policiales (15.000$ C/U)"); // 1598
    AmmuOpcionItem.SetRightLabel("75.000$");
    ammunation_CAJAS.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Caja con porras policiales (x10)", "Caja con 10 unidades de porras policiales (15.000$ C/U)"); // 1598
    AmmuOpcionItem.SetRightLabel("150.000$");
    ammunation_CAJAS.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Caja con tasers (x5)", "Caja con 5 unidades de tasers (30.000$ C/U)"); // 1600
    AmmuOpcionItem.SetRightLabel("150.000$");
    ammunation_CAJAS.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Caja con tasers (x10)", "Caja con 10 unidades de tasers (30.000$ C/U)"); // 1600
    AmmuOpcionItem.SetRightLabel("300.000$");
    ammunation_CAJAS.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Caja con pistolas (x5)", "Caja con 5  unidades de pistolas (50.000$ C/U)"); // 1602
    AmmuOpcionItem.SetRightLabel("250.000$");
    ammunation_CAJAS.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Caja con pistolas (x10)", "Caja con 10 unidades de pistolas (50.000$ C/U)"); // 1602
    AmmuOpcionItem.SetRightLabel("500.000$");
    ammunation_CAJAS.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Caja con escopetas (x5)", "Caja con 5 unidades de escopetas (80.000$ C/U)"); // 1604
    AmmuOpcionItem.SetRightLabel("400.000$");
    ammunation_CAJAS.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Caja con escopetas (x10)", "Caja con 10 unidades de escopetas (80.000$ C/U)"); // 1604
    AmmuOpcionItem.SetRightLabel("800.000$");
    ammunation_CAJAS.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Caja con subfusiles MP5 (x5)", "Caja con 5 unidades de subfusiles (150.000$ C/U)"); // 1606
    AmmuOpcionItem.SetRightLabel("750.000$");
    ammunation_CAJAS.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Caja con subfusiles MP5 (x10)", "Caja con 10 unidades de subfusiles (150.000$ C/U)"); // 1606
    AmmuOpcionItem.SetRightLabel("1.500.000$");
    ammunation_CAJAS.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Caja con fusiles M4 (x5)", "Caja con 5 unidades de fusiles M4 (250.000$ C/U)"); // 1608
    AmmuOpcionItem.SetRightLabel("1.250.000$");
    ammunation_CAJAS.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Caja con fusiles M4 (x10)", "Caja con 10 unidades de fusiles M4 (250.000$ C/U)"); // 1608
    AmmuOpcionItem.SetRightLabel("2.500.000$");
    ammunation_CAJAS.AddItem(AmmuOpcionItem);
    ammunation_CAJAS.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    ammunation_CAJAS.ItemSelect.on((item, index) => {
        let enMostrador = false;

        ammunations.forEach(function (obj) {
            if (calcDist(player_local.position, obj.posicion) < 1.0 && player_local.dimension == 0) {
                enMostrador = true;
                return;
            }
        });

        if (!enMostrador) {
            mostrarAviso("danger", 8000, 'Debes estar frente al mostrador para poder hacer esto');
            return;
        }

        if (index < 13) {
            mp.events.callRemote('ammunation:comprar_armas_CAJAS', index + 1, licencia_elegida);
        }

        // Volver
        if (index == 13) {
            ammunation_CAJAS?.Close(true);
        }
    });

    ammunation_CAJAS.MenuClose.on(item => {
        mostrar_menuammunation_TIPOD();
        ammunation_CAJAS = null;
    });
}

function mostrar_menuammunation_TIPOE() {
    ammunation_TIPOE = crearMenu("Armas tipo E", "Categorias y cargadores", true);
    ammunation_TIPOE.AddItem(new UIMenuItem("(1) 2ª categoria", ""));
    ammunation_TIPOE.AddItem(new UIMenuItem("(1) Cargadores", "Cargadores para armas de 2ª categoria"));
    ammunation_TIPOE.AddItem(new UIMenuItem("(2) 3ª categoria", ""));
    ammunation_TIPOE.AddItem(new UIMenuItem("(2) Cargadores", "Cargadores para armas de 3ª categoria"));
    ammunation_TIPOE.AddItem(new UIMenuItem("(3) 4ª categoria", ""));
    ammunation_TIPOE.AddItem(new UIMenuItem("(3) Cargadores", "Cargadores para armas de 4ª categoria"));
    ammunation_TIPOE.AddItem(new UIMenuItem("(4) 5ª categoria", ""));
    ammunation_TIPOE.AddItem(new UIMenuItem("(4) Cargadores", "Cargadores para armas de 5ª categoria"));
    ammunation_TIPOE.AddItem(new UIMenuItem("(5) 6ª categoria", ""));
    ammunation_TIPOE.AddItem(new UIMenuItem("(5) Cargadores", "Cargadores para armas de 6ª categoria"));
    ammunation_TIPOE.AddItem(new UIMenuItem("(6) 7ª categoria", ""));
    ammunation_TIPOE.AddItem(new UIMenuItem("(6) Cargadores", "Cargadores para armas de 7ª categoria"));
    ammunation_TIPOE.AddItem(new UIMenuItem("Volver", "Vuelve al menu principal"));

    ammunation_TIPOE.ItemSelect.on((item, index) => {
        switch (index) {
            case 0:
                mostrar_menuammunation_2CATEGORIA();
                break;
            case 1:
                mostrar_cargadores_2CATEGORIA();
                break;
            case 2:
                mostrar_menuammunation_3CATEGORIA();
                break;
            case 3:
                mostrar_cargadores_3CATEGORIA();
                break;
            case 4:
                mostrar_menuammunation_4CATEGORIA();
                break;
            case 5:
                mostrar_cargadores_4CATEGORIA();
                break;
            case 6:
                mostrar_menuammunation_5CATEGORIA();
                break;
            case 7:
                mostrar_cargadores_5CATEGORIA();
                break;
            case 8:
                mostrar_menuammunation_6CATEGORIA();
                break;
            case 9:
                mostrar_cargadores_6CATEGORIA();
                break;
            case 10:
                mostrar_menuammunation_7CATEGORIA();
                break;
            case 11:
                mostrar_cargadores_7CATEGORIA();
                break;
            default:
                ammunation_TIPOE?.Close(true);
                return;
        }

        ammunation_TIPOE.setVisible(false, true);
        ammunation_TIPOE = null;
    });

    ammunation_TIPOE.MenuClose.on(item => {
        mostrar_licencia_ammunation();
        ammunation_TIPOE = null;
    });
}

function mostrar_menuammunation_TIPOF() {
    ammunation_TIPOF = crearMenu("Armas tipo F", "Categorias y cargadores", true);
    ammunation_TIPOF.AddItem(new UIMenuItem("(1) 3ª categoria", ""));
    ammunation_TIPOF.AddItem(new UIMenuItem("(1) Cargadores", "Cargadores para armas de 3ª categoria"));
    ammunation_TIPOF.AddItem(new UIMenuItem("(2) 5ª categoria", ""));
    ammunation_TIPOF.AddItem(new UIMenuItem("(2) Cargadores", "Cargadores para armas de 5ª categoria"));
    ammunation_TIPOF.AddItem(new UIMenuItem("(3) 6ª categoria", ""));
    ammunation_TIPOF.AddItem(new UIMenuItem("(3) Cargadores", "Cargadores para armas de 6ª categoria"));
    ammunation_TIPOF.AddItem(new UIMenuItem("(4) 7ª categoria", ""));
    ammunation_TIPOF.AddItem(new UIMenuItem("(4) Cargadores", "Cargadores para armas de 7ª categoria"));
    ammunation_TIPOF.AddItem(new UIMenuItem("Volver", "Vuelve al menu principal"));

    ammunation_TIPOF.ItemSelect.on((item, index) => {
        switch (index) {
            case 0:
                mostrar_menuammunation_3CATEGORIA();
                break;
            case 1:
                mostrar_cargadores_3CATEGORIA();
                break;
            case 2:
                mostrar_menuammunation_5CATEGORIA();
                break;
            case 3:
                mostrar_cargadores_5CATEGORIA();
                break;
            case 4:
                mostrar_menuammunation_6CATEGORIA();
                break;
            case 5:
                mostrar_cargadores_6CATEGORIA();
                break;
            case 6:
                mostrar_menuammunation_7CATEGORIA();
                break;
            case 7:
                mostrar_cargadores_7CATEGORIA();
                break;
            default:
                ammunation_TIPOF?.Close(true);
                return;
        }

        ammunation_TIPOF.setVisible(false, true);
        ammunation_TIPOF = null;
    });

    ammunation_TIPOF.MenuClose.on(item => {
        mostrar_licencia_ammunation();
        ammunation_TIPOF = null;
    });
}

function mostrar_menuammunation_TIPOG() {
    ammunation_TIPOG = crearMenu("Armas tipo G", "Categorias y cargadores", true);
    ammunation_TIPOG.AddItem(new UIMenuItem("(1) Revólveres", ""));
    ammunation_TIPOG.AddItem(new UIMenuItem("(1) Cargadores", "Cargadores para revólveres"));
    ammunation_TIPOG.AddItem(new UIMenuItem("Volver", "Vuelve al menu principal"));

    ammunation_TIPOG.ItemSelect.on((item, index) => {
        switch (index) {
            case 0:
                mostrar_menuammunation_REVOLVERES();
                break;
            case 1:
                mostrar_cargadores_REVOLVERES();
                break;
            default:
                ammunation_TIPOG?.Close();
                return;
        }

        ammunation_TIPOG.setVisible(false, true);
        ammunation_TIPOG = null;
    });

    ammunation_TIPOG.MenuClose.on(item => {
        mostrar_licencia_ammunation();
        ammunation_TIPOG = null;
    });
}

/*
 *      COMPRAR ARMAS
 */
// ARMAS 2ª CATEGORIA
function mostrar_menuammunation_2CATEGORIA() {
    ammunation_2ªCATEGORIA = crearMenu("2ª CATEGORIA", "Armas no letales", true);
    AmmuOpcionItem = new UIMenuItem("Porra", "También conocida como: Porra policial"); // 22
    AmmuOpcionItem.SetRightLabel("15.000$");
    ammunation_2ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Pistola eléctrica", "También conocida como: Taser"); // 14
    AmmuOpcionItem.SetRightLabel("30.000$");
    ammunation_2ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Lanzahumos", ""); // 224
    AmmuOpcionItem.SetRightLabel("100.000$");
    ammunation_2ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Escopeta de goma", ""); // 240
    AmmuOpcionItem.SetRightLabel("150.000$");
    ammunation_2ªCATEGORIA.AddItem(AmmuOpcionItem);
    ammunation_2ªCATEGORIA.AddItem(new UIMenuItem("Volver", "Vuelve al menú principal"));

    ammunation_2ªCATEGORIA.ItemSelect.on((item, index) => {
        let enMostrador = false;

        ammunations.forEach(function (obj) {
            if (calcDist(player_local.position, obj.posicion) < 1.0 && player_local.dimension == 0) {
                enMostrador = true;
                return;
            }
        });

        if (!enMostrador) {
            mostrarAviso("danger", 8000, 'Debes estar frente al mostrador para poder hacer esto');
            return;
        }

        if (index < 4) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('ammunation:comprar_armas_2CATEGORIA', index + 1, licencia_elegida);
        }
        // Volver
        if (index == 4) {
            ammunation_2ªCATEGORIA?.Close(true);
        }
    });

    ammunation_2ªCATEGORIA.MenuClose.on(item => {
        ammunation_2ªCATEGORIA = null;
        // Dependiendo de como accedamos a este menu, al volver le mandamos a uno u otro
        if (licencia_elegida == 15) {
            mostrar_menuammunation_TIPOE();
        } 
    });
}

// ARMAS 3ª CATEGORIA
function mostrar_menuammunation_3CATEGORIA() {
    ammunation_3ªCATEGORIA = crearMenu("3ª CATEGORIA", "Armas cortas", true);
    AmmuOpcionItem = new UIMenuItem("Pistola", " "); // 8
    AmmuOpcionItem.SetRightLabel("50.000$");
    ammunation_3ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Pistola Mk II", " "); // 247
    AmmuOpcionItem.SetRightLabel("60.000$");
    ammunation_3ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Pistola de combate", " "); // 20
    AmmuOpcionItem.SetRightLabel("77.500$");
    ammunation_3ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Pistola calibre 50", " "); // 32
    AmmuOpcionItem.SetRightLabel("102.500$");
    ammunation_3ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Pistola cutre", " "); // 39
    AmmuOpcionItem.SetRightLabel("56.000$");
    ammunation_3ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Pistola cutre Mk II", "También conocida como: SNS Pistol MKII"); // 248
    AmmuOpcionItem.SetRightLabel("60.000$");
    ammunation_3ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Pistola pesada", " "); // 43
    AmmuOpcionItem.SetRightLabel("110.000$");
    ammunation_3ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Pistola vintage", " "); // 4
    AmmuOpcionItem.SetRightLabel("71.500$");
    ammunation_3ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Pistola marksman", " "); // 244
    AmmuOpcionItem.SetRightLabel("100.000$");
    ammunation_3ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Pistola de cerámica", " "); // 1093
    AmmuOpcionItem.SetRightLabel("85.000$");
    ammunation_3ªCATEGORIA.AddItem(AmmuOpcionItem);
    ammunation_3ªCATEGORIA.AddItem(new UIMenuItem("Volver", "Vuelve al menú principal"));

    ammunation_3ªCATEGORIA.ItemSelect.on((item, index) => {
        let enMostrador = false;

        ammunations.forEach(function (obj) {
            if (calcDist(player_local.position, obj.posicion) < 1.0 && player_local.dimension == 0) {
                enMostrador = true;
                return;
            }
        });

        if (!enMostrador) {
            mostrarAviso("danger", 8000, 'Debes estar frente al mostrador para poder hacer esto');
            return;
        }

        if (index < 10) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('ammunation:comprar_armas_3CATEGORIA', index + 1, licencia_elegida);
        }

        // Volver
        if (index == 10) {
            ammunation_3ªCATEGORIA?.Close(true);
        }
    });

    ammunation_3ªCATEGORIA.MenuClose.on(item => {
        ammunation_3ªCATEGORIA = null;
        // Dependiendo de como accedamos a este menu, al volver le mandamos a uno u otro
        if (licencia_elegida == 10) {
            mostrar_menuammunation_TIPOF();
        }
        if (licencia_elegida == 12) {
            mostrar_menuammunation_TIPOA();
        }
        if (licencia_elegida == 15) {
            mostrar_menuammunation_TIPOE();
        } 
    });
}

// ARMAS 4ª CATEGORIA
function mostrar_menuammunation_4CATEGORIA() {
    mostrar_menuammunation_4ªCATEGORIA = crearMenu("4ª CATEGORIA", "Armas cortas automáticas y subfusiles", true);
    AmmuOpcionItem = new UIMenuItem("Pistola perforante", " "); // 215
    AmmuOpcionItem.SetRightLabel("165.000$");
    mostrar_menuammunation_4ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Microsubfusil", " "); // 7
    AmmuOpcionItem.SetRightLabel("160.000$");
    mostrar_menuammunation_4ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Minisubfusil", " "); // 251
    AmmuOpcionItem.SetRightLabel("155.000$");
    mostrar_menuammunation_4ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Subfusil", " "); // 12
    AmmuOpcionItem.SetRightLabel("150.000$");
    mostrar_menuammunation_4ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Subfusil Mk II", " "); // 227
    AmmuOpcionItem.SetRightLabel("160.000");
    mostrar_menuammunation_4ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Subfusil de asalto", " "); // 46
    AmmuOpcionItem.SetRightLabel("270.000$");
    mostrar_menuammunation_4ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("ADP de combate", " "); // 5
    AmmuOpcionItem.SetRightLabel("277.500$");
    mostrar_menuammunation_4ªCATEGORIA.AddItem(AmmuOpcionItem);
    mostrar_menuammunation_4ªCATEGORIA.AddItem(new UIMenuItem("Volver", "Vuelve al menú principal"));

    mostrar_menuammunation_4ªCATEGORIA.ItemSelect.on((item, index) => {
        let enMostrador = false;

        ammunations.forEach(function (obj) {
            if (calcDist(player_local.position, obj.posicion) < 1.0 && player_local.dimension == 0) {
                enMostrador = true;
                return;
            }
        });

        if (!enMostrador) {
            mostrarAviso("danger", 8000, 'Debes estar frente al mostrador para poder hacer esto');
            return;
        }

        if (index < 7) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('ammunation:comprar_armas_4CATEGORIA', index + 1, licencia_elegida);
        }

        // Volver
        if (index == 7) {
            mostrar_menuammunation_4ªCATEGORIA?.Close(true);
        }

    });

    mostrar_menuammunation_4ªCATEGORIA.MenuClose.on(item => {
        mostrar_menuammunation_4ªCATEGORIA = null;
        // Dependiendo de como accedamos a este menu, al volver le mandamos a uno u otro
        if (licencia_elegida == 13) {
            mostrar_menuammunation_TIPOB();
        }
        if (licencia_elegida == 15) {
            mostrar_menuammunation_TIPOE();
        } 
    });
}

// ARMAS 5ª CATEGORIA
function mostrar_menuammunation_5CATEGORIA() {
    mostrar_menuammunation_5ªCATEGORIA = crearMenu("5ª CATEGORIA", "Armas automáticas y rifles de asalto", true);
    AmmuOpcionItem = new UIMenuItem("Fusil compacto", " "); // 232
    AmmuOpcionItem.SetRightLabel("207.500$");
    mostrar_menuammunation_5ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Rifle avanzado", " "); // 38
    AmmuOpcionItem.SetRightLabel("250.000$");
    mostrar_menuammunation_5ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Fusil bullpup", "También conocido como: Rifle bullpup"); // 24
    AmmuOpcionItem.SetRightLabel("270.000$");
    mostrar_menuammunation_5ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Fusil bullpup Mk II", "También conocido como: Rifle bullpup MKII"); // 236
    AmmuOpcionItem.SetRightLabel("295.000$");
    mostrar_menuammunation_5ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Fusil de asalto", "También conocido como: AK-47"); // 40
    AmmuOpcionItem.SetRightLabel("245.000$");
    mostrar_menuammunation_5ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Fusil de asalto Mk II", "También conocido como: AK-47 MKII"); // 233
    AmmuOpcionItem.SetRightLabel("265.000$");
    mostrar_menuammunation_5ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Carabina", "También conocido como: M4"); // 27
    AmmuOpcionItem.SetRightLabel("250.000$");
    mostrar_menuammunation_5ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Carabina Mk II", "También conocido como: M4 MKII"); // 234
    AmmuOpcionItem.SetRightLabel("280.000$");
    mostrar_menuammunation_5ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Carabina Especial", " "); // 41
    AmmuOpcionItem.SetRightLabel("255.000$");
    mostrar_menuammunation_5ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Carabina Especial Mk II", " "); // 235
    AmmuOpcionItem.SetRightLabel("280.000$");
    mostrar_menuammunation_5ªCATEGORIA.AddItem(AmmuOpcionItem);
    mostrar_menuammunation_5ªCATEGORIA.AddItem(new UIMenuItem("Volver", "Vuelve al menú principal"));

    mostrar_menuammunation_5ªCATEGORIA.ItemSelect.on((item, index) => {
        let enMostrador = false;

        ammunations.forEach(function (obj) {
            if (calcDist(player_local.position, obj.posicion) < 1.0 && player_local.dimension == 0) {
                enMostrador = true;
                return;
            }
        });

        if (!enMostrador) {
            mostrarAviso("danger", 8000, 'Debes estar frente al mostrador para poder hacer esto');
            return;
        }

        if (index < 10) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('ammunation:comprar_armas_5CATEGORIA', index + 1, licencia_elegida);
        }

        // Volver
        if (index == 10) {
            mostrar_menuammunation_5ªCATEGORIA?.Close(true);
        }
    });

    mostrar_menuammunation_5ªCATEGORIA.MenuClose.on(item => {
        mostrar_menuammunation_5ªCATEGORIA = null;
        // Dependiendo de como accedamos a este menu, al volver le mandamos a uno u otro
        if (licencia_elegida == 10) {
            mostrar_menuammunation_TIPOF();
        }
        if (licencia_elegida == 14) {
            mostrar_menuammunation_TIPOC();
        }
        if (licencia_elegida == 15) {
            mostrar_menuammunation_TIPOE();
        } 
    });
}

// ARMAS 6ª CATEGORIA
function mostrar_menuammunation_6CATEGORIA() {
    mostrar_menuammunation_6ªCATEGORIA = crearMenu("6ª CATEGORIA", "Armas de precisión", true);
    AmmuOpcionItem = new UIMenuItem("Fusil de tirador", " "); // 42 
    AmmuOpcionItem.SetRightLabel("460.000$");
    mostrar_menuammunation_6ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Fusil de tirador Mk II", " También conocido como: Marksman Rifle MKII"); // 238
    AmmuOpcionItem.SetRightLabel("500.000$");
    mostrar_menuammunation_6ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Fusil francotirador pesado", " "); // 6                
    AmmuOpcionItem.SetRightLabel("550.000$");
    mostrar_menuammunation_6ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Fusil de francotirador pesado Mk II", "También conocido como: Rifle de precisión pesado MKII "); // 237
    AmmuOpcionItem.SetRightLabel("590.000$");
    mostrar_menuammunation_6ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Fusil de francotirador", " "); // 2
    AmmuOpcionItem.SetRightLabel("550.000$");
    mostrar_menuammunation_6ªCATEGORIA.AddItem(AmmuOpcionItem);
    mostrar_menuammunation_6ªCATEGORIA.AddItem(new UIMenuItem("Volver", "Vuelve al menú principal"));

    mostrar_menuammunation_6ªCATEGORIA.ItemSelect.on((item, index) => {
        let enMostrador = false;

        ammunations.forEach(function (obj) {
            if (calcDist(player_local.position, obj.posicion) < 1.0 && player_local.dimension == 0) {
                enMostrador = true;
                return;
            }
        });

        if (!enMostrador) {
            mostrarAviso("danger", 8000, 'Debes estar frente al mostrador para poder hacer esto');
            return;
        }

        if (index < 5) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('ammunation:comprar_armas_6CATEGORIA', index + 1, licencia_elegida);
        }

        // Volver
        if (index == 5) {
            mostrar_menuammunation_6ªCATEGORIA?.Close(true);
        }
    });

    mostrar_menuammunation_6ªCATEGORIA.MenuClose.on(item => {
        mostrar_menuammunation_6ªCATEGORIA = null;
        // Dependiendo de como accedamos a este menu, al volver le mandamos a uno u otro
        if (licencia_elegida == 10) {
            mostrar_menuammunation_TIPOF();
        }
        if (licencia_elegida == 15) {
            mostrar_menuammunation_TIPOE();
        } 
    });
}

// ARMAS 7ª CATEGORIA
function mostrar_menuammunation_7CATEGORIA() {
    mostrar_menuammunation_7ªCATEGORIA = crearMenu("7ª CATEGORIA", "Armas de acción manual", true);
    AmmuOpcionItem = new UIMenuItem("Mosquete", " "); // 37
    AmmuOpcionItem.SetRightLabel("50.000$");
    mostrar_menuammunation_7ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Escopeta recortada", " "); // 23
    AmmuOpcionItem.SetRightLabel("70.000$");
    mostrar_menuammunation_7ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Escopeta de corredera", "También conocida como: Escopeta"); // 9
    AmmuOpcionItem.SetRightLabel("80.000$");
    mostrar_menuammunation_7ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Escopeta bullpup", " "); // 35
    AmmuOpcionItem.SetRightLabel("175.000$");
    mostrar_menuammunation_7ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Escopeta sweeper", " "); // 252
    AmmuOpcionItem.SetRightLabel("125.000$");
    mostrar_menuammunation_7ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Escopeta pesada", " "); // 15
    AmmuOpcionItem.SetRightLabel("160.000$");
    mostrar_menuammunation_7ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Escopeta de asalto", " "); // 45
    AmmuOpcionItem.SetRightLabel("205.000$");
    mostrar_menuammunation_7ªCATEGORIA.AddItem(AmmuOpcionItem);
    mostrar_menuammunation_7ªCATEGORIA.AddItem(new UIMenuItem("Volver", "Vuelve al menú principal"));

    mostrar_menuammunation_7ªCATEGORIA.ItemSelect.on((item, index) => {
        let enMostrador = false;

        ammunations.forEach(function (obj) {
            if (calcDist(player_local.position, obj.posicion) < 1.0 && player_local.dimension == 0) {
                enMostrador = true;
                return;
            }
        });

        if (!enMostrador) {
            mostrarAviso("danger", 8000, 'Debes estar frente al mostrador para poder hacer esto');
            return;
        }

        if (index < 7) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('ammunation:comprar_armas_7CATEGORIA', index + 1, licencia_elegida);
        }

        // Volver
        if (index == 7) {
            mostrar_menuammunation_7ªCATEGORIA?.Close(true);
        }
    });

    mostrar_menuammunation_7ªCATEGORIA.MenuClose.on(item => {
        mostrar_menuammunation_7ªCATEGORIA = null;
        // Dependiendo de como accedamos a este menu, al volver le mandamos a uno u otro
        if (licencia_elegida == 10) {
            mostrar_menuammunation_TIPOF();
        }
        if (licencia_elegida == 13) {
            mostrar_menuammunation_TIPOB();
        }
        if (licencia_elegida == 15) {
            mostrar_menuammunation_TIPOE();
        }
    });
}

// ARMAS 8ª CATEGORIA
function mostrar_menuammunation_8CATEGORIA() {
    mostrar_menuammunation_8ªCATEGORIA = crearMenu("8ª CATEGORIA", "Armas para uso profesional");
    AmmuOpcionItem = new UIMenuItem("Ametralladora ligera", " "); // 228
    AmmuOpcionItem.SetRightLabel("320.000$");
    mostrar_menuammunation_8ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Ametralladora de combate", " "); // 26
    AmmuOpcionItem.SetRightLabel("397.500$");
    mostrar_menuammunation_8ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Ametralladora de combate Mk II", " "); // 231
    AmmuOpcionItem.SetRightLabel("405.000$");
    mostrar_menuammunation_8ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Gusenberg", " "); // 21
    AmmuOpcionItem.SetRightLabel("300.000$");
    mostrar_menuammunation_8ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("RPG", " "); // 226
    AmmuOpcionItem.SetRightLabel("3.000.000$");
    mostrar_menuammunation_8ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Stinger", " "); // 225
    AmmuOpcionItem.SetRightLabel("4.000.000$");
    mostrar_menuammunation_8ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Lanzagranadas", " "); //1089	
    AmmuOpcionItem.SetRightLabel("3.000.000$");
    mostrar_menuammunation_8ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Lanzagranadas casero", " "); // 253
    AmmuOpcionItem.SetRightLabel("2.000.000$");
    mostrar_menuammunation_8ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Granada de humo", " "); // 49
    AmmuOpcionItem.SetRightLabel("30.000$");
    mostrar_menuammunation_8ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Gas lacrimógeno", " "); // 36
    AmmuOpcionItem.SetRightLabel("30.000$");
    mostrar_menuammunation_8ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Molotov", " "); // 11
    AmmuOpcionItem.SetRightLabel("50.000$");
    mostrar_menuammunation_8ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Bomba casera", " "); // 254
    AmmuOpcionItem.SetRightLabel("50.000$");
    mostrar_menuammunation_8ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Granada", " "); // 221
    AmmuOpcionItem.SetRightLabel("50.000$");
    mostrar_menuammunation_8ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Mina con detonador", " "); // 222
    AmmuOpcionItem.SetRightLabel("60.000$");
    mostrar_menuammunation_8ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Mina de aproximación", " "); // 220
    AmmuOpcionItem.SetRightLabel("65.000$");
    mostrar_menuammunation_8ªCATEGORIA.AddItem(AmmuOpcionItem);
    mostrar_menuammunation_8ªCATEGORIA.AddItem(new UIMenuItem("Volver", "Vuelve al menú principal"));

    mostrar_menuammunation_8ªCATEGORIA.ItemSelect.on((item, index) => {
        let enMostrador = false;

        ammunations.forEach(function (obj) {
            if (calcDist(player_local.position, obj.posicion) < 1.0 && player_local.dimension == 0) {
                enMostrador = true;
                return;
            }
        });

        if (!enMostrador) {
            mostrarAviso("danger", 8000, 'Debes estar frente al mostrador para poder hacer esto');
            return;
        }

        if (index < 15) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('ammunation:comprar_armas_8CATEGORIA', index + 1, licencia_elegida);
        }

        // Volver
        if (index == 15) {
            mostrar_menuammunation_8ªCATEGORIA.setVisible(false);
            mostrar_menuammunation_8ªCATEGORIA = null;
            // Dependiendo de como accedamos a este menu, al volver le mandamos a uno u otro
            if (licencia_elegida == 15) {
                mostrar_menuammunation_TIPOE();
            }
        }
    });

    mostrar_menuammunation_8ªCATEGORIA.MenuClose.on(item => {
        mostrar_menuammunation_8ªCATEGORIA = null;
        // Dependiendo de como accedamos a este menu, al volver le mandamos a uno u otro
        if (licencia_elegida == 15) {
            mostrar_menuammunation_TIPOE();
        }
    });
}

// ARMAS REVOLVERES
function mostrar_menuammunation_REVOLVERES() {
    ammunation_REVOLVERES = crearMenu("REVOLVERES", "Armas de tipo revolver", true);
    AmmuOpcionItem = new UIMenuItem("Revólver de doble acción", " "); // 246
    AmmuOpcionItem.SetRightLabel("132.500$");
    ammunation_REVOLVERES.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Revólver", " "); // 245
    AmmuOpcionItem.SetRightLabel("147.500$");
    ammunation_REVOLVERES.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Revólver Mk II", " "); // 249
    AmmuOpcionItem.SetRightLabel("200.000$");
    ammunation_REVOLVERES.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Revólver Navy", " "); // 1094
    AmmuOpcionItem.SetRightLabel("100.000$");
    ammunation_REVOLVERES.AddItem(AmmuOpcionItem);
    ammunation_REVOLVERES.AddItem(new UIMenuItem("Volver", "Vuelve al menú principal"));

    ammunation_REVOLVERES.ItemSelect.on((item, index) => {
        let enMostrador = false;

        ammunations.forEach(function (obj) {
            if (calcDist(player_local.position, obj.posicion) < 1.0 && player_local.dimension == 0) {
                enMostrador = true;
                return;
            }
        });

        if (!enMostrador) {
            mostrarAviso("danger", 8000, 'Debes estar frente al mostrador para poder hacer esto');
            return;
        }

        if (index < 4) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('ammunation:comprar_armas_REVOLVERES', index + 1, licencia_elegida);
        }

        // Volver
        if (index == 4) {
            ammunation_REVOLVERES?.Close(true);
        }
    });

    ammunation_REVOLVERES.MenuClose.on(item => {
        ammunation_REVOLVERES = null;
        // Dependiendo de como accedamos a este menu, al volver le mandamos a uno u otro
        if (licencia_elegida == 16) {
            mostrar_menuammunation_TIPOG();
        }
    });
}

/*
 *      COMPRAR CARGADORES 
 */  
// CARGADORES 2ª CATEGORIA
function mostrar_cargadores_2CATEGORIA() {
    ammunation_cargadores_2CATEGORIA = crearMenu("CARGADORES", "Cargadores armas 2ª categoria", true);
    AmmuOpcionItem = new UIMenuItem("Lanzahumos", ""); // 1964
    AmmuOpcionItem.SetRightLabel("20.000$");
    ammunation_cargadores_2CATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Escopeta de goma", ""); // 1961
    AmmuOpcionItem.SetRightLabel("30.000$");
    ammunation_cargadores_2CATEGORIA.AddItem(AmmuOpcionItem);
    ammunation_cargadores_2CATEGORIA.AddItem(new UIMenuItem("Volver", "Vuelve al menú principal"));

    ammunation_cargadores_2CATEGORIA.ItemSelect.on((item, index) => {
        let enMostrador = false;

        ammunations.forEach(function (obj) {
            if (calcDist(player_local.position, obj.posicion) < 1.0 && player_local.dimension == 0) {
                enMostrador = true;
                return;
            }
        });

        if (!enMostrador) {
            mostrarAviso("danger", 8000, 'Debes estar frente al mostrador para poder hacer esto');
            return;
        }

        if (index < 2) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('ammunation:comprar_cargadores_2CATEGORIA', index + 1, licencia_elegida);
        }
        // Volver
        if (index == 2) {
            ammunation_cargadores_2CATEGORIA?.Close(true);
        }
    });

    ammunation_cargadores_2CATEGORIA.MenuClose.on(item => {
        ammunation_cargadores_2CATEGORIA = null;
        // Dependiendo de como accedamos a este menu, al volver le mandamos a uno u otro
        if (licencia_elegida == 15) {
            mostrar_menuammunation_TIPOE();
        }
    });
}

// CARGADORES 3ª CATEGORIA
function mostrar_cargadores_3CATEGORIA() {
    ammunation_cargadores_3ªCATEGORIA = crearMenu("CARGADORES", "Cargadores armas 3ª categoria", true);
    AmmuOpcionItem = new UIMenuItem("Pistola", " "); // 1741
    AmmuOpcionItem.SetRightLabel("10.000$");
    ammunation_cargadores_3ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Pistola Mk II", " "); // 1749
    AmmuOpcionItem.SetRightLabel("12.000$");
    ammunation_cargadores_3ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Pistola de combate", " "); // 1743
    AmmuOpcionItem.SetRightLabel("15.500$");
    ammunation_cargadores_3ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Pistola calibre 50", " "); // 1744
    AmmuOpcionItem.SetRightLabel("20.500$");
    ammunation_cargadores_3ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Pistola cutre", " "); // 1745
    AmmuOpcionItem.SetRightLabel("11.200$");
    ammunation_cargadores_3ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Pistola cutre Mk II", "También conocida como: SNS Pistol MKII"); // 1747
    AmmuOpcionItem.SetRightLabel("12.000$");
    ammunation_cargadores_3ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Pistola pesada", " "); // 1746
    AmmuOpcionItem.SetRightLabel("22.000$");
    ammunation_cargadores_3ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Pistola vintage", " "); // 1748
    AmmuOpcionItem.SetRightLabel("14.300$");
    ammunation_cargadores_3ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Pistola marksman", " "); // 1844
    AmmuOpcionItem.SetRightLabel("20.000$");
    ammunation_cargadores_3ªCATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Pistola de cerámica", " "); // 1769
    AmmuOpcionItem.SetRightLabel("17.000$");
    ammunation_cargadores_3ªCATEGORIA.AddItem(AmmuOpcionItem);
    ammunation_cargadores_3ªCATEGORIA.AddItem(new UIMenuItem("Volver", "Vuelve al menú principal"));

    ammunation_cargadores_3ªCATEGORIA.ItemSelect.on((item, index) => {
        let enMostrador = false;

        ammunations.forEach(function (obj) {
            if (calcDist(player_local.position, obj.posicion) < 1.0 && player_local.dimension == 0) {
                enMostrador = true;
                return;
            }
        });

        if (!enMostrador) {
            mostrarAviso("danger", 8000, 'Debes estar frente al mostrador para poder hacer esto');
            return;
        }

        if (index < 10) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('ammunation:comprar_cargadores_3CATEGORIA', index + 1, licencia_elegida);
        }

        // Volver
        if (index == 10) {
            ammunation_cargadores_3ªCATEGORIA?.Close(true);
        }
    });

    ammunation_cargadores_3ªCATEGORIA.MenuClose.on(item => {
        ammunation_cargadores_3ªCATEGORIA = null;
        // Dependiendo de como accedamos a este menu, al volver le mandamos a uno u otro
        if (licencia_elegida == 10) {
            mostrar_menuammunation_TIPOF();
        }
        if (licencia_elegida == 12) {
            mostrar_menuammunation_TIPOA();
        }
        if (licencia_elegida == 15) {
            mostrar_menuammunation_TIPOE();
        }
    });
}

// CARGADORES 4ª CATEGORIA
function mostrar_cargadores_4CATEGORIA() {
    ammunation_cargadores_4CATEGORIA = crearMenu("CARGADORES", "Cargadores armas 4º categoria", true);
    AmmuOpcionItem = new UIMenuItem("Pistola perforante", " "); // 1742
    AmmuOpcionItem.SetRightLabel("33.000$");
    ammunation_cargadores_4CATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Microsubfusil", " "); // 1751
    AmmuOpcionItem.SetRightLabel("32.000$");
    ammunation_cargadores_4CATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Minisubfusil", " "); // 1780
    AmmuOpcionItem.SetRightLabel("31.000$");
    ammunation_cargadores_4CATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Subfusil", " "); // 1750
    AmmuOpcionItem.SetRightLabel("30.000$");
    ammunation_cargadores_4CATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Subfusil Mk II", " "); // 1782
    AmmuOpcionItem.SetRightLabel("32.000");
    ammunation_cargadores_4CATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Subfusil de asalto", " "); // 1752
    AmmuOpcionItem.SetRightLabel("54.000$");
    ammunation_cargadores_4CATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("ADP de combate", " "); // 1770
    AmmuOpcionItem.SetRightLabel("55.500$");
    ammunation_cargadores_4CATEGORIA.AddItem(AmmuOpcionItem);
    ammunation_cargadores_4CATEGORIA.AddItem(new UIMenuItem("Volver", "Vuelve al menú principal"));

    ammunation_cargadores_4CATEGORIA.ItemSelect.on((item, index) => {
        let enMostrador = false;

        ammunations.forEach(function (obj) {
            if (calcDist(player_local.position, obj.posicion) < 1.0 && player_local.dimension == 0) {
                enMostrador = true;
                return;
            }
        });

        if (!enMostrador) {
            mostrarAviso("danger", 8000, 'Debes estar frente al mostrador para poder hacer esto');
            return;
        }

        if (index < 7) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('ammunation:comprar_cargadores_4CATEGORIA', index + 1, licencia_elegida);
        }

        // Volver
        if (index == 7) {
            ammunation_cargadores_4CATEGORIA?.Close(true);
        }
    });

    ammunation_cargadores_4CATEGORIA.MenuClose.on(item => {
        ammunation_cargadores_4CATEGORIA = null;
        // Dependiendo de como accedamos a este menu, al volver le mandamos a uno u otro
        if (licencia_elegida == 13) {
            mostrar_menuammunation_TIPOB();
        }
        if (licencia_elegida == 15) {
            mostrar_menuammunation_TIPOE();
        }
    });
}

// CARGADORES 5ª CATEGORIA
function mostrar_cargadores_5CATEGORIA() {
    ammunation_cargadores_5CATEGORIA = crearMenu("CARGADORES", "Cargadores armas 5ª categoria", true);
    AmmuOpcionItem = new UIMenuItem("Fusil compacto", " "); // 1771
    AmmuOpcionItem.SetRightLabel("41.500$");
    ammunation_cargadores_5CATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Rifle avanzado", " "); // 1756
    AmmuOpcionItem.SetRightLabel("50.000$");
    ammunation_cargadores_5CATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Fusil bullpup", "También conocido como: Rifle bullpup"); // 1762
    AmmuOpcionItem.SetRightLabel("54.000$");
    ammunation_cargadores_5CATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Fusil bullpup Mk II", "También conocido como: Rifle bullpup MKII"); // 1763
    AmmuOpcionItem.SetRightLabel("59.000$");
    ammunation_cargadores_5CATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Fusil de asalto", "También conocido como: AK-47"); // 1754
    AmmuOpcionItem.SetRightLabel("49.000$");
    ammunation_cargadores_5CATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Fusil de asalto Mk II", "También conocido como: AK-47 MKII"); // 1781
    AmmuOpcionItem.SetRightLabel("53.000$");
    ammunation_cargadores_5CATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Carabina", "También conocido como: M4"); // 1788
    AmmuOpcionItem.SetRightLabel("50.000$");
    ammunation_cargadores_5CATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Carabina Mk II", "También conocido como: M4 MKII"); // 1789
    AmmuOpcionItem.SetRightLabel("56.000$");
    ammunation_cargadores_5CATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Carabina Especial", " "); // 1761
    AmmuOpcionItem.SetRightLabel("51.000$");
    ammunation_cargadores_5CATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Carabina Especial Mk II", " "); // 1764
    AmmuOpcionItem.SetRightLabel("56.000$");
    ammunation_cargadores_5CATEGORIA.AddItem(AmmuOpcionItem);
    ammunation_cargadores_5CATEGORIA.AddItem(new UIMenuItem("Volver", "Vuelve al menú principal"));

    ammunation_cargadores_5CATEGORIA.ItemSelect.on((item, index) => {
        let enMostrador = false;

        ammunations.forEach(function (obj) {
            if (calcDist(player_local.position, obj.posicion) < 1.0 && player_local.dimension == 0) {
                enMostrador = true;
                return;
            }
        });

        if (!enMostrador) {
            mostrarAviso("danger", 8000, 'Debes estar frente al mostrador para poder hacer esto');
            return;
        }

        if (index < 10) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('ammunation:comprar_cargadores_5CATEGORIA', index + 1, licencia_elegida);
        }

        // Volver
        if (index == 10) {
            ammunation_cargadores_5CATEGORIA?.Close(true);
        }
    });

    ammunation_cargadores_5CATEGORIA.MenuClose.on(item => {
        ammunation_cargadores_5CATEGORIA = null;
        // Dependiendo de como accedamos a este menu, al volver le mandamos a uno u otro
        if (licencia_elegida == 10) {
            mostrar_menuammunation_TIPOF();
        }
        if (licencia_elegida == 14) {
            mostrar_menuammunation_TIPOC();
        }
        if (licencia_elegida == 15) {
            mostrar_menuammunation_TIPOE();
        }
    });
}

// CARGADORES 6ª CATEGORIA
function mostrar_cargadores_6CATEGORIA() {
    ammunation_cargadores_6CATEGORIA = crearMenu("CARGADORES", "Cargadores armas 6ª categoria", true);
    AmmuOpcionItem = new UIMenuItem("Fusil de tirador", " "); // 1767
    AmmuOpcionItem.SetRightLabel("92.000$");
    ammunation_cargadores_6CATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Fusil de tirador Mk II", " También conocido como: Marksman Rifle MKII"); // 1792
    AmmuOpcionItem.SetRightLabel("100.000$");
    ammunation_cargadores_6CATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Fusil francotirador pesado", " "); // 1758               
    AmmuOpcionItem.SetRightLabel("110.000$");
    ammunation_cargadores_6CATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Fusil de francotirador pesado Mk II", "También conocido como: Rifle de precisión pesado MKII "); // 1783
    AmmuOpcionItem.SetRightLabel("118.000$");
    ammunation_cargadores_6CATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Fusil de francotirador", " "); // 1757
    AmmuOpcionItem.SetRightLabel("110.000$");
    ammunation_cargadores_6CATEGORIA.AddItem(AmmuOpcionItem);
    ammunation_cargadores_6CATEGORIA.AddItem(new UIMenuItem("Volver", "Vuelve al menú principal"));

    ammunation_cargadores_6CATEGORIA.ItemSelect.on((item, index) => {
        let enMostrador = false;

        ammunations.forEach(function (obj) {
            if (calcDist(player_local.position, obj.posicion) < 1.0 && player_local.dimension == 0) {
                enMostrador = true;
                return;
            }
        });

        if (!enMostrador) {
            mostrarAviso("danger", 8000, 'Debes estar frente al mostrador para poder hacer esto');
            return;
        }

        if (index < 5) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('ammunation:comprar_cargadores_6CATEGORIA', index + 1, licencia_elegida);
        }

        // Volver
        if (index == 5) {
            ammunation_cargadores_6CATEGORIA?.Close(true);
        }
    });

    ammunation_cargadores_6CATEGORIA.MenuClose.on(item => {
        ammunation_cargadores_6CATEGORIA = null;
        // Dependiendo de como accedamos a este menu, al volver le mandamos a uno u otro
        if (licencia_elegida == 10) {
            mostrar_menuammunation_TIPOF();
        }
        if (licencia_elegida == 15) {
            mostrar_menuammunation_TIPOE();
        }
    });
}

// CARGADORES 7ª CATEGORIA
function mostrar_cargadores_7CATEGORIA() {
    ammunation_cargadores_7CATEGORIA = crearMenu("CARGADORES", "Cargadores armas 7ª categoria", true);
    AmmuOpcionItem = new UIMenuItem("Mosquete", " "); // 1857
    AmmuOpcionItem.SetRightLabel("10.000$");
    ammunation_cargadores_7CATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Escopeta recortada", " "); // 1835
    AmmuOpcionItem.SetRightLabel("14.000$");
    ammunation_cargadores_7CATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Escopeta de corredera", "También conocida como: Escopeta"); // 1724
    AmmuOpcionItem.SetRightLabel("16.000$");
    ammunation_cargadores_7CATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Escopeta bullpup", " "); // 1839
    AmmuOpcionItem.SetRightLabel("35.000$");
    ammunation_cargadores_7CATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Escopeta sweeper", " "); // 1787
    AmmuOpcionItem.SetRightLabel("25.000$");
    ammunation_cargadores_7CATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Escopeta pesada", " "); // 1766
    AmmuOpcionItem.SetRightLabel("32.000$");
    ammunation_cargadores_7CATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Escopeta de asalto", " "); // 1753
    AmmuOpcionItem.SetRightLabel("41.000$");
    ammunation_cargadores_7CATEGORIA.AddItem(AmmuOpcionItem);
    ammunation_cargadores_7CATEGORIA.AddItem(new UIMenuItem("Volver", "Vuelve al menú principal"));

    ammunation_cargadores_7CATEGORIA.ItemSelect.on((item, index) => {
        let enMostrador = false;

        ammunations.forEach(function (obj) {
            if (calcDist(player_local.position, obj.posicion) < 1.0 && player_local.dimension == 0) {
                enMostrador = true;
                return;
            }
        });

        if (!enMostrador) {
            mostrarAviso("danger", 8000, 'Debes estar frente al mostrador para poder hacer esto');
            return;
        }

        if (index < 7) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('ammunation:comprar_cargadores_7CATEGORIA', index + 1, licencia_elegida);
        }

        // Volver
        if (index == 7) {
            ammunation_cargadores_7CATEGORIA?.Close(true);
        }
    });

    ammunation_cargadores_7CATEGORIA.MenuClose.on(item => {
        ammunation_cargadores_7CATEGORIA = null;
        // Dependiendo de como accedamos a este menu, al volver le mandamos a uno u otro
        if (licencia_elegida == 10) {
            mostrar_menuammunation_TIPOF();
        }
        if (licencia_elegida == 13) {
            mostrar_menuammunation_TIPOB();
        }
        if (licencia_elegida == 15) {
            mostrar_menuammunation_TIPOE();
        }
    });
}

// CARGADORES 8ª CATEGORIA
function mostrar_cargadores_8CATEGORIA() {
    ammunation_cargadores_8CATEGORIA = crearMenu("CARGADORES", "Cargadores armas 8ª categoria");
    AmmuOpcionItem = new UIMenuItem("Ametralladora ligera", " "); // 1759
    AmmuOpcionItem.SetRightLabel("64.000$");
    ammunation_cargadores_8CATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Ametralladora de combate", " "); // 1760
    AmmuOpcionItem.SetRightLabel("79.500$");
    ammunation_cargadores_8CATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Ametralladora de combate Mk II", " "); // 1791
    AmmuOpcionItem.SetRightLabel("81.000$");
    ammunation_cargadores_8CATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Gusenberg", " "); // 1787
    AmmuOpcionItem.SetRightLabel("60.000$");
    ammunation_cargadores_8CATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("RPG", " "); // 1966
    AmmuOpcionItem.SetRightLabel("600.000$");
    ammunation_cargadores_8CATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Stinger", " "); // 1970
    AmmuOpcionItem.SetRightLabel("800.000$");
    ammunation_cargadores_8CATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Lanzagranadas", " "); // 1969
    AmmuOpcionItem.SetRightLabel("600.000$");
    ammunation_cargadores_8CATEGORIA.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Lanzagranadas casero", " "); // 1971
    AmmuOpcionItem.SetRightLabel("400.000$");
    ammunation_cargadores_8CATEGORIA.AddItem(AmmuOpcionItem);
    ammunation_cargadores_8CATEGORIA.AddItem(new UIMenuItem("Volver", "Vuelve al menú principal"));

    ammunation_cargadores_8CATEGORIA.ItemSelect.on((item, index) => {
        let enMostrador = false;

        ammunations.forEach(function (obj) {
            if (calcDist(player_local.position, obj.posicion) < 1.0 && player_local.dimension == 0) {
                enMostrador = true;
                return;
            }
        });

        if (!enMostrador) {
            mostrarAviso("danger", 8000, 'Debes estar frente al mostrador para poder hacer esto');
            return;
        }

        if (index < 8) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('ammunation:comprar_cargadores_8CATEGORIA', index + 1, licencia_elegida);
        }

        // Volver
        if (index == 8) {
            ammunation_cargadores_8CATEGORIA.setVisible(false);
            ammunation_cargadores_8CATEGORIA = null;
            // Dependiendo de como accedamos a este menu, al volver le mandamos a uno u otro
            if (licencia_elegida == 15) {
                mostrar_menuammunation_TIPOE();
            }
        }
    });

    ammunation_cargadores_8CATEGORIA.MenuClose.on(item => {
        ammunation_cargadores_8CATEGORIA = null;
        // Dependiendo de como accedamos a este menu, al volver le mandamos a uno u otro
        if (licencia_elegida == 15) {
            mostrar_menuammunation_TIPOE();
        }
    });
}

// CARGADORES REVOLVERES
function mostrar_cargadores_REVOLVERES() {
    ammunation_cargadores_REVOLVERES = crearMenu("CARGADORES", "Cargadores para revolveres", true);
    AmmuOpcionItem = new UIMenuItem("Revólver de doble acción", " "); // 1853
    AmmuOpcionItem.SetRightLabel("26.500$"); 
    ammunation_cargadores_REVOLVERES.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Revólver", " "); // 1840
    AmmuOpcionItem.SetRightLabel("29.500$");
    ammunation_cargadores_REVOLVERES.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Revólver Mk II", " "); // 1841
    AmmuOpcionItem.SetRightLabel("40.000$");
    ammunation_cargadores_REVOLVERES.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Revólver Navy", " "); // 1843
    AmmuOpcionItem.SetRightLabel("20.000$");
    ammunation_cargadores_REVOLVERES.AddItem(AmmuOpcionItem);
    ammunation_cargadores_REVOLVERES.AddItem(new UIMenuItem("Volver", "Vuelve al menú principal"));

    ammunation_cargadores_REVOLVERES.ItemSelect.on((item, index) => {
        let enMostrador = false;

        ammunations.forEach(function (obj) {
            if (calcDist(player_local.position, obj.posicion) < 1.0 && player_local.dimension == 0) {
                enMostrador = true;
                return;
            }
        });

        if (!enMostrador) {
            mostrarAviso("danger", 8000, 'Debes estar frente al mostrador para poder hacer esto');
            return;
        }

        if (index < 4) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('ammunation:comprar_cargadores_REVOLVERES', index + 1, licencia_elegida);
        }

        // Volver
        if (index == 4) {
            ammunation_cargadores_REVOLVERES?.Close(true);
        }
    });

    ammunation_cargadores_REVOLVERES.MenuClose.on(item => {
        ammunation_cargadores_REVOLVERES = null;
        // Dependiendo de como accedamos a este menu, al volver le mandamos a uno u otro
        if (licencia_elegida == 16) {
            mostrar_menuammunation_TIPOG();
        }
    });
}




/*
 *  MENUS DE GALERIA DE TIRO AMMUNATION
 */

mp.events.add("ammunation:mostrar_menu_campodetiro", function () { mostrar_menu_campotiro_categorias_armas() });

let campodetiro_precio = null;
let campodetiro_weaponhash_armaElegida = null;
let campodetiro_nombre_armaElegida = null;
let campodetiro_balas_nivelElegido = null;
let campodetiro_nivelElegido = null;
let enCampoDeTiro = 0;

function mostrar_menu_campotiro_categorias_armas() {
    campodetiro_precio = null;

    let campodetiro_CATEGORIAS = crearMenu("Categorias", "Categorias de armas");
    AmmuOpcionItem = new UIMenuItem("Pistolas", "Categoria de pistolas.");
    AmmuOpcionItem.SetRightLabel("1.500$");
    campodetiro_CATEGORIAS.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Subfusiles", "Categoria de subfusiles.");
    AmmuOpcionItem.SetRightLabel("2.000$");
    campodetiro_CATEGORIAS.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Escopetas", "Categoria de escopetas.");
    AmmuOpcionItem.SetRightLabel("2.500$");
    campodetiro_CATEGORIAS.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Rifles de asalto", "Categoria de rifles de asalto.");
    AmmuOpcionItem.SetRightLabel("3.000$");
    campodetiro_CATEGORIAS.AddItem(AmmuOpcionItem);
    AmmuOpcionItem = new UIMenuItem("Ametralladoras ligeras", "Categoria de ametralladoras ligeras.");
    AmmuOpcionItem.SetRightLabel("3.500$");
    campodetiro_CATEGORIAS.AddItem(AmmuOpcionItem);
    campodetiro_CATEGORIAS.AddItem(new UIMenuItem("Cerrar", "Cierra el menu actual."));

    campodetiro_CATEGORIAS.ItemSelect.on((item, index) => {
        campodetiro_CATEGORIAS.setVisible(false);
        campodetiro_CATEGORIAS = null;

        switch (index) {
            case 0:
                campodetiro_precio = 1500;
                mostrar_menu_campotiro_pistolas();
                break;
            case 1:
                campodetiro_precio = 2000;
                mostrar_menu_campotiro_subfusiles();
                break;
            case 2:
                campodetiro_precio = 2500;
                mostrar_menu_campotiro_escopetas();
                break;
            case 3:
                campodetiro_precio = 3000;
                mostrar_menu_campotiro_riflesdeasalto();
                break;
            case 4:
                campodetiro_precio = 3500;
                mostrar_menu_campotiro_ametralladorasligeras();
                break;
            case 5:
                // No hacer nada, ya se cierra el menu solo.
                mp.events.call("sound:cancel");
                break;
        }
    });

    campodetiro_CATEGORIAS.MenuClose.on(item => {
        campodetiro_CATEGORIAS = null;
        mp.events.call("sound:cancel");
    });
}

function mostrar_menu_campotiro_pistolas() {
    campodetiro_weaponhash_armaElegida = null;
    campodetiro_nombre_armaElegida = null;

    let campotiro_PISTOLAS = crearMenu("Pistolas", "Pistolas disponibles", true);
    campotiro_PISTOLAS.AddItem(new UIMenuItem("Pistola", ""));
    campotiro_PISTOLAS.AddItem(new UIMenuItem("Pistola Mk II", ""));
    campotiro_PISTOLAS.AddItem(new UIMenuItem("Pistola de combate", ""));
    campotiro_PISTOLAS.AddItem(new UIMenuItem("Pistola AP", "Tambien conocida como: Pistola perforante"));
    campotiro_PISTOLAS.AddItem(new UIMenuItem("Pistola .50", "Tambien conocida como: Pistola calibre 50"));
    campotiro_PISTOLAS.AddItem(new UIMenuItem("Pistola SNS", "Tambien conocida como: Pistola cutre"));
    campotiro_PISTOLAS.AddItem(new UIMenuItem("Pistola SNS Mk II", ""));
    campotiro_PISTOLAS.AddItem(new UIMenuItem("Pistola pesada", ""));
    campotiro_PISTOLAS.AddItem(new UIMenuItem("Pistola vintage", ""));
    campotiro_PISTOLAS.AddItem(new UIMenuItem("Revólver pesado", ""));
    campotiro_PISTOLAS.AddItem(new UIMenuItem("Revólver pesado Mk II", "Tambien conocida como: Revolver Mk II"));
    campotiro_PISTOLAS.AddItem(new UIMenuItem("Revólver de doble acción", ""));
    campotiro_PISTOLAS.AddItem(new UIMenuItem("Pistola de cerámica", ""));
    campotiro_PISTOLAS.AddItem(new UIMenuItem("Revólver de la marina", ""));
    campotiro_PISTOLAS.AddItem(new UIMenuItem("Pistola perico", ""));
    campotiro_PISTOLAS.AddItem(new UIMenuItem("Volver", "Vuelve al menu de categorias de armas."));

    campotiro_PISTOLAS.ItemSelect.on((item, index) => {
        switch (index) {
            case 0:
                campodetiro_weaponhash_armaElegida = "weapon_pistol";
                campodetiro_nombre_armaElegida = "pistola";
                mostrar_menu_campotiro_dificultad();
                break;
            case 1:
                campodetiro_weaponhash_armaElegida = "weapon_pistol_mk2";
                campodetiro_nombre_armaElegida = "pistola Mk II";
                mostrar_menu_campotiro_dificultad();
                break;
            case 2:
                campodetiro_weaponhash_armaElegida = "weapon_combatpistol";
                campodetiro_nombre_armaElegida = "pistola de combate";
                mostrar_menu_campotiro_dificultad();
                break;
            case 3:
                campodetiro_weaponhash_armaElegida = "weapon_appistol";
                campodetiro_nombre_armaElegida = "pistola AP";
                mostrar_menu_campotiro_dificultad();
                break;
            case 4:
                campodetiro_weaponhash_armaElegida = "weapon_pistol50";
                campodetiro_nombre_armaElegida = "pistola .50";
                mostrar_menu_campotiro_dificultad();
                break;
            case 5:
                campodetiro_weaponhash_armaElegida = "weapon_snspistol";
                campodetiro_nombre_armaElegida = "pistola SNS";
                mostrar_menu_campotiro_dificultad();
                break;
            case 6:
                campodetiro_weaponhash_armaElegida = "weapon_snspistol_mk2";
                campodetiro_nombre_armaElegida = "pistola SNS Mk II";
                mostrar_menu_campotiro_dificultad();
                break;
            case 7:
                campodetiro_weaponhash_armaElegida = "weapon_heavypistol";
                campodetiro_nombre_armaElegida = "pistola pesada";
                mostrar_menu_campotiro_dificultad();
                break;
            case 8:
                campodetiro_weaponhash_armaElegida = "weapon_vintagepistol";
                campodetiro_nombre_armaElegida = "pistola vintage";
                mostrar_menu_campotiro_dificultad();
                break;
            case 9:
                campodetiro_weaponhash_armaElegida = "weapon_revolver";
                campodetiro_nombre_armaElegida = "revólver pesado";
                mostrar_menu_campotiro_dificultad();
                break;
            case 10:
                campodetiro_weaponhash_armaElegida = "weapon_revolver_mk2";
                campodetiro_nombre_armaElegida = "revólver pesado Mk II";
                mostrar_menu_campotiro_dificultad();
                break;
            case 11:
                campodetiro_weaponhash_armaElegida = "weapon_doubleaction";
                campodetiro_nombre_armaElegida = "revólver de doble acción";
                mostrar_menu_campotiro_dificultad();
                break;
            case 12:
                campodetiro_weaponhash_armaElegida = "weapon_ceramicpistol";
                campodetiro_nombre_armaElegida = "pistola de cerámica";
                mostrar_menu_campotiro_dificultad();
                break;
            case 13:
                campodetiro_weaponhash_armaElegida = "weapon_navyrevolver";
                campodetiro_nombre_armaElegida = "revólver de la marina";
                mostrar_menu_campotiro_dificultad();
                break;
            case 14:
                campodetiro_weaponhash_armaElegida = "weapon_gadgetpistol";
                campodetiro_nombre_armaElegida = "pistola perico";
                mostrar_menu_campotiro_dificultad();
                break;
            default:
                campotiro_PISTOLAS?.Close(true);
                return;
        }

        campotiro_PISTOLAS.setVisible(false, true);
        campotiro_PISTOLAS = null;
    });

    campotiro_PISTOLAS.MenuClose.on(item => {
        mostrar_menu_campotiro_categorias_armas();
        campotiro_PISTOLAS = null;
    });
}

function mostrar_menu_campotiro_subfusiles() {
    campodetiro_weaponhash_armaElegida = null;
    campodetiro_nombre_armaElegida = null;

    let campotiro_SUBFUSILES = crearMenu("Subfusiles", "Subfusiles disponibles", true);
    campotiro_SUBFUSILES.AddItem(new UIMenuItem("Micro SMG", "Tambien conocida como: Microsubfusil"));
    campotiro_SUBFUSILES.AddItem(new UIMenuItem("SMG", "Tambien conocida como: Subfusil"));
    campotiro_SUBFUSILES.AddItem(new UIMenuItem("SMG Mk II", "Tambien conocida como: MP5 Mk II"));
    campotiro_SUBFUSILES.AddItem(new UIMenuItem("SMG de asalto", "Tambien conocida como: Subfusil de asalto"));
    campotiro_SUBFUSILES.AddItem(new UIMenuItem("PDW de combate", "Tambien conocida como: ADP de combate"));
    campotiro_SUBFUSILES.AddItem(new UIMenuItem("Pistola ametralladora", ""));
    campotiro_SUBFUSILES.AddItem(new UIMenuItem("Mini SMG", "Tambien conocida como: Minisubfusil"));
    campotiro_SUBFUSILES.AddItem(new UIMenuItem("Volver", "Vuelve al menu de categorias de armas."));

    campotiro_SUBFUSILES.ItemSelect.on((item, index) => {
        switch (index) {
            case 0:
                campodetiro_weaponhash_armaElegida = "weapon_microsmg";
                campodetiro_nombre_armaElegida = "micro SMG";
                mostrar_menu_campotiro_dificultad();
                break;
            case 1:
                campodetiro_weaponhash_armaElegida = "weapon_smg";
                campodetiro_nombre_armaElegida = "SMG";
                mostrar_menu_campotiro_dificultad();
                break;
            case 2:
                campodetiro_weaponhash_armaElegida = "weapon_smg_mk2";
                campodetiro_nombre_armaElegida = "SMG Mk II";
                mostrar_menu_campotiro_dificultad();
                break;
            case 3:
                campodetiro_weaponhash_armaElegida = "weapon_assaultsmg";
                campodetiro_nombre_armaElegida = "SMG de asalto";
                mostrar_menu_campotiro_dificultad();
                break;
            case 4:
                campodetiro_weaponhash_armaElegida = "weapon_combatpdw";
                campodetiro_nombre_armaElegida = "PDW de combate";
                mostrar_menu_campotiro_dificultad();
                break;
            case 5:
                campodetiro_weaponhash_armaElegida = "weapon_machinepistol";
                campodetiro_nombre_armaElegida = "pistola ametralladora";
                mostrar_menu_campotiro_dificultad();
                break;
            case 6:
                campodetiro_weaponhash_armaElegida = "weapon_minismg";
                campodetiro_nombre_armaElegida = "mini SMG";
                mostrar_menu_campotiro_dificultad();
                break;
            default:
                campotiro_SUBFUSILES?.Close(true);
                return;
        }

        campotiro_SUBFUSILES.setVisible(false, true);
        campotiro_SUBFUSILES = null;
    });

    campotiro_SUBFUSILES.MenuClose.on(item => {
        mostrar_menu_campotiro_categorias_armas();
        campotiro_SUBFUSILES = null;
    });
}

function mostrar_menu_campotiro_escopetas() {
    campodetiro_weaponhash_armaElegida = null;
    campodetiro_nombre_armaElegida = null;

    let campotiro_ESCOPETAS = crearMenu("Escopetas", "Escopetas disponibles", true);
    campotiro_ESCOPETAS.AddItem(new UIMenuItem("Escopeta", ""));
    campotiro_ESCOPETAS.AddItem(new UIMenuItem("Escopeta de cañon recortado", "Tambien conocida como: Escopeta recortada"));
    campotiro_ESCOPETAS.AddItem(new UIMenuItem("Escopeta de asalto", ""));
    campotiro_ESCOPETAS.AddItem(new UIMenuItem("Escopeta bullpup", ""));
    campotiro_ESCOPETAS.AddItem(new UIMenuItem("Mosquete", ""));
    campotiro_ESCOPETAS.AddItem(new UIMenuItem("Escopeta pesada", ""));
    campotiro_ESCOPETAS.AddItem(new UIMenuItem("Escopeta de doble cañon", ""));
    campotiro_ESCOPETAS.AddItem(new UIMenuItem("Escopeta barredora", "Tambien conocida como: Escopeta sweeper"));
    campotiro_ESCOPETAS.AddItem(new UIMenuItem("Escopeta de combate", ""));
    campotiro_ESCOPETAS.AddItem(new UIMenuItem("Volver", "Vuelve al menu de categorias de armas."));

    campotiro_ESCOPETAS.ItemSelect.on((item, index) => {
        switch (index) {
            case 0:
                campodetiro_weaponhash_armaElegida = "weapon_pumpshotgun";
                campodetiro_nombre_armaElegida = "escopeta";
                mostrar_menu_campotiro_dificultad();
                break;
            case 1:
                campodetiro_weaponhash_armaElegida = "weapon_sawnoffshotgun";
                campodetiro_nombre_armaElegida = "escopeta de cañon recortado";
                mostrar_menu_campotiro_dificultad();
                break;
            case 2:
                campodetiro_weaponhash_armaElegida = "weapon_assaultshotgun";
                campodetiro_nombre_armaElegida = "escopeta de asalto";
                mostrar_menu_campotiro_dificultad();
                break;
            case 3:
                campodetiro_weaponhash_armaElegida = "weapon_bullpupshotgun";
                campodetiro_nombre_armaElegida = "escopeta bullpup";
                mostrar_menu_campotiro_dificultad();
                break;
            case 4:
                campodetiro_weaponhash_armaElegida = "weapon_musket";
                campodetiro_nombre_armaElegida = "mosquete";
                mostrar_menu_campotiro_dificultad();
                break;
            case 5:
                campodetiro_weaponhash_armaElegida = "weapon_heavyshotgun";
                campodetiro_nombre_armaElegida = "escopeta pesada";
                mostrar_menu_campotiro_dificultad();
                break;
            case 6:
                campodetiro_weaponhash_armaElegida = "weapon_dbshotgun";
                campodetiro_nombre_armaElegida = "escopeta de doble cañon";
                mostrar_menu_campotiro_dificultad();
                break;
            case 7:
                campodetiro_weaponhash_armaElegida = "weapon_autoshotgun";
                campodetiro_nombre_armaElegida = "escopeta barredora";
                mostrar_menu_campotiro_dificultad();
                break;
            case 8:
                campodetiro_weaponhash_armaElegida = "weapon_combatshotgun";
                campodetiro_nombre_armaElegida = "escopeta de combate";
                mostrar_menu_campotiro_dificultad();
                break;
            default:
                campotiro_ESCOPETAS?.Close(true);
                return;
        }

        campotiro_ESCOPETAS.setVisible(false, true);
        campotiro_ESCOPETAS = null;
    });

    campotiro_ESCOPETAS.MenuClose.on(item => {
        mostrar_menu_campotiro_categorias_armas();
        campotiro_ESCOPETAS = null;
    });
}

function mostrar_menu_campotiro_riflesdeasalto() {
    campodetiro_weaponhash_armaElegida = null;
    campodetiro_nombre_armaElegida = null;

    let campotiro_RIFLESDEASALTO = crearMenu("Rifles de asalto", "Rifles de asalto disponibles", true);
    campotiro_RIFLESDEASALTO.AddItem(new UIMenuItem("Rifle de asalto", "Tambien conocido como: Fusil de asalto"));
    campotiro_RIFLESDEASALTO.AddItem(new UIMenuItem("Rifle de asalto Mk II", "Tambien conocido como: AK-47 MKII"));
    campotiro_RIFLESDEASALTO.AddItem(new UIMenuItem("Rifle de carabina", "Tambien conocido como: M4"));
    campotiro_RIFLESDEASALTO.AddItem(new UIMenuItem("Rifle de carabina Mk II", "Tambien conocido como: M4 MKII"));
    campotiro_RIFLESDEASALTO.AddItem(new UIMenuItem("Rifle avanzado", "Tambien conocido como: Fusil avanzado"));
    campotiro_RIFLESDEASALTO.AddItem(new UIMenuItem("Carabina especial", ""));
    campotiro_RIFLESDEASALTO.AddItem(new UIMenuItem("Carabina especial Mk II", ""));
    campotiro_RIFLESDEASALTO.AddItem(new UIMenuItem("Rifle bullpup", ""));
    campotiro_RIFLESDEASALTO.AddItem(new UIMenuItem("Rifle bullpup Mk II", ""));
    campotiro_RIFLESDEASALTO.AddItem(new UIMenuItem("Rifle compacto", "Tambien conocido como: Fusil compacto"));
    campotiro_RIFLESDEASALTO.AddItem(new UIMenuItem("Rifle militar", ""));
    campotiro_RIFLESDEASALTO.AddItem(new UIMenuItem("Volver", "Vuelve al menu de categorias de armas."));

    campotiro_RIFLESDEASALTO.ItemSelect.on((item, index) => {
        switch (index) {
            case 0:
                campodetiro_weaponhash_armaElegida = "weapon_assaultrifle";
                campodetiro_nombre_armaElegida = "rifle de asalto";
                mostrar_menu_campotiro_dificultad();
                break;
            case 1:
                campodetiro_weaponhash_armaElegida = "weapon_assaultrifle_mk2";
                campodetiro_nombre_armaElegida = "rifle de asalto Mk II";
                mostrar_menu_campotiro_dificultad();
                break;
            case 2:
                campodetiro_weaponhash_armaElegida = "weapon_carbinerifle";
                campodetiro_nombre_armaElegida = "rifle de carabina";
                mostrar_menu_campotiro_dificultad();
                break;
            case 3:
                campodetiro_weaponhash_armaElegida = "weapon_carbinerifle_mk2";
                campodetiro_nombre_armaElegida = "rifle de carabina Mk II";
                mostrar_menu_campotiro_dificultad();
                break;
            case 4:
                campodetiro_weaponhash_armaElegida = "weapon_advancedrifle";
                campodetiro_nombre_armaElegida = "rifle avanzado";
                mostrar_menu_campotiro_dificultad();
                break;
            case 5:
                campodetiro_weaponhash_armaElegida = "weapon_specialcarbine";
                campodetiro_nombre_armaElegida = "carabina especial";
                mostrar_menu_campotiro_dificultad();
                break;
            case 6:
                campodetiro_weaponhash_armaElegida = "weapon_specialcarbine_mk2";
                campodetiro_nombre_armaElegida = "carabina especial Mk II";
                mostrar_menu_campotiro_dificultad();
                break;
            case 7:
                campodetiro_weaponhash_armaElegida = "weapon_bullpuprifle";
                campodetiro_nombre_armaElegida = "rifle bullpup";
                mostrar_menu_campotiro_dificultad();
                break;
            case 8:
                campodetiro_weaponhash_armaElegida = "weapon_bullpuprifle_mk2";
                campodetiro_nombre_armaElegida = "rifle bullpup Mk II";
                mostrar_menu_campotiro_dificultad();
                break;
            case 9:
                campodetiro_weaponhash_armaElegida = "weapon_compactrifle";
                campodetiro_nombre_armaElegida = "rifle compacto";
                mostrar_menu_campotiro_dificultad();
                break;
            case 10:
                campodetiro_weaponhash_armaElegida = "weapon_militaryrifle";
                campodetiro_nombre_armaElegida = "rifle militar";
                mostrar_menu_campotiro_dificultad();
                break;
            default:
                campotiro_RIFLESDEASALTO?.Close(true);
                return;
        }

        campotiro_RIFLESDEASALTO.setVisible(false, true);
        campotiro_RIFLESDEASALTO = null;
    });

    campotiro_RIFLESDEASALTO.MenuClose.on(item => {
        mostrar_menu_campotiro_categorias_armas();
        campotiro_RIFLESDEASALTO = null;
    });
}

function mostrar_menu_campotiro_ametralladorasligeras() {
    campodetiro_weaponhash_armaElegida = null;
    campodetiro_nombre_armaElegida = null;

    let campotiro_A_LIGERAS = crearMenu("A. Ligeras", "Ametralladoras ligeras disponibles", true);
    campotiro_A_LIGERAS.AddItem(new UIMenuItem("Ametralladora", ""));
    campotiro_A_LIGERAS.AddItem(new UIMenuItem("Ametralladora de combate", ""));
    campotiro_A_LIGERAS.AddItem(new UIMenuItem("Ametralladora de combate Mk II", ""));
    campotiro_A_LIGERAS.AddItem(new UIMenuItem("Gusenberg", "Tambien conocida como: Gusenberg sweeper"));
    campotiro_A_LIGERAS.AddItem(new UIMenuItem("Volver", "Vuelve al menu de categorias de armas."));

    campotiro_A_LIGERAS.ItemSelect.on((item, index) => {
        switch (index) {
            case 0:
                campodetiro_weaponhash_armaElegida = "weapon_mg";
                campodetiro_nombre_armaElegida = "ametralladora";
                mostrar_menu_campotiro_dificultad();
                break;
            case 1:
                campodetiro_weaponhash_armaElegida = "weapon_combatmg";
                campodetiro_nombre_armaElegida = "ametralladora de combate";
                mostrar_menu_campotiro_dificultad();
                break;
            case 2:
                campodetiro_weaponhash_armaElegida = "weapon_combatmg_mk2";
                campodetiro_nombre_armaElegida = "ametralladora de combate Mk II";
                mostrar_menu_campotiro_dificultad();
                break;
            case 3:
                campodetiro_weaponhash_armaElegida = "weapon_gusenberg";
                campodetiro_nombre_armaElegida = "gusenberg";
                mostrar_menu_campotiro_dificultad();
                break;
            default:
                campotiro_A_LIGERAS?.Close(true);
                return;
        }

        campotiro_A_LIGERAS.setVisible(false, true);
        campotiro_A_LIGERAS = null;
    });

    campotiro_A_LIGERAS.MenuClose.on(item => {
        mostrar_menu_campotiro_categorias_armas();
        campotiro_A_LIGERAS = null;
    });
}


function mostrar_menu_campotiro_dificultad() {

    if (calcDist(player_local.position, new mp.Vector3(819.64594, -2154.0142, 29.619001)) < 5.0) { // CYPRESS FLAT
        enCampoDeTiro = 1;
        campodetiro_nivelElegido = null;
        campodetiro_balas_nivelElegido = null;

        let campotiro_DIFICULTAD_CYPRESSFLAT = crearMenu("Dificultad", "Selecciona la dificultad", true);
        AmmuOpcionItemDificultad = new UIMenuItem("Muy fácil", "2,5 segundos entre objetivo y objetivo. 20 objetivos. 40 balas.");
        AmmuOpcionItemDificultad.SetRightLabel("+250$");
        campotiro_DIFICULTAD_CYPRESSFLAT.AddItem(AmmuOpcionItemDificultad);
        AmmuOpcionItemDificultad = new UIMenuItem("Fácil", "2 segundos entre objetivo y objetivo. 20 objetivos. 35 balas.");
        AmmuOpcionItemDificultad.SetRightLabel("+500$");
        campotiro_DIFICULTAD_CYPRESSFLAT.AddItem(AmmuOpcionItemDificultad);
        AmmuOpcionItemDificultad = new UIMenuItem("Medio", "1,5 segundos entre objetivo y objetivo. 20 objetivos. 30 balas.");
        AmmuOpcionItemDificultad.SetRightLabel("+750$");
        campotiro_DIFICULTAD_CYPRESSFLAT.AddItem(AmmuOpcionItemDificultad);
        AmmuOpcionItemDificultad = new UIMenuItem("Difícil", "1 segundo entre objetivo y objetivo. 20 objetivos. 25 balas.");
        AmmuOpcionItemDificultad.SetRightLabel("+1000$");
        campotiro_DIFICULTAD_CYPRESSFLAT.AddItem(AmmuOpcionItemDificultad);
        AmmuOpcionItemDificultad = new UIMenuItem("Muy difícil", "0,5 segundos entre objetivo y objetivo. 20 objetivos. 20 balas.");
        AmmuOpcionItemDificultad.SetRightLabel("+1250$");
        campotiro_DIFICULTAD_CYPRESSFLAT.AddItem(AmmuOpcionItemDificultad);
        campotiro_DIFICULTAD_CYPRESSFLAT.AddItem(new UIMenuItem("Volver", "Vuelve al menu de categorias de armas."));

        campotiro_DIFICULTAD_CYPRESSFLAT.ItemSelect.on((item, index) => {

            let empezarEntrenamiento = true;

            switch (index) {
                case 0:
                    campodetiro_precio = campodetiro_precio + 250;
                    campodetiro_balas_nivelElegido = 40;
                    campodetiro_nivelElegido = 1;
                    break;
                case 1:
                    campodetiro_precio = campodetiro_precio + 500;
                    campodetiro_balas_nivelElegido = 35;
                    campodetiro_nivelElegido = 2;
                    break;
                case 2:
                    campodetiro_precio = campodetiro_precio + 750;
                    campodetiro_balas_nivelElegido = 30;
                    campodetiro_nivelElegido = 3;
                    break;
                case 3:
                    campodetiro_precio = campodetiro_precio + 1000;
                    campodetiro_balas_nivelElegido = 25;
                    campodetiro_nivelElegido = 4;
                    break;
                case 4:
                    campodetiro_precio = campodetiro_precio + 1250;
                    campodetiro_balas_nivelElegido = 20;
                    campodetiro_nivelElegido = 5;
                    break;
                case 5:
                    campotiro_DIFICULTAD_CYPRESSFLAT.setVisible(false, true);
                    campotiro_DIFICULTAD_CYPRESSFLAT = null;
                    mostrar_menu_campotiro_categorias_armas();
                    break;
            }

            if (empezarEntrenamiento) {
                campotiro_DIFICULTAD_CYPRESSFLAT.setVisible(false, true);
                campotiro_DIFICULTAD_CYPRESSFLAT = null;
                mostrar_menu_ammunation_confirmar();
            }
        });

        campotiro_DIFICULTAD_CYPRESSFLAT.MenuClose.on(item => {
            mostrar_menu_campotiro_categorias_armas();
            campotiro_DIFICULTAD_CYPRESSFLAT = null;
        });
    }

    if (calcDist(player_local.position, new mp.Vector3(12.54883, -1105.1913, 29.7970)) < 5.0) { // PILLBOX HILL
        enCampoDeTiro = 2;
        campodetiro_nivelElegido = null;
        campodetiro_balas_nivelElegido = null;

        let campotiro_DIFICULTAD_PILLBOXHILL = crearMenu("Dificultad", "Selecciona la dificultad", true);
        AmmuOpcionItemDificultad = new UIMenuItem("Muy fácil", "2 segundos entre objetivo y objetivo. 15 objetivos. 90 balas.");
        AmmuOpcionItemDificultad.SetRightLabel("+250$");
        campotiro_DIFICULTAD_PILLBOXHILL.AddItem(AmmuOpcionItemDificultad);
        AmmuOpcionItemDificultad = new UIMenuItem("Fácil", "1 segundo entre objetivo y objetivo. 30 objetivos. 90 balas.");
        AmmuOpcionItemDificultad.SetRightLabel("+500$");
        campotiro_DIFICULTAD_PILLBOXHILL.AddItem(AmmuOpcionItemDificultad);
        AmmuOpcionItemDificultad = new UIMenuItem("Medio", "0.6 segundos entre objetivo y objetivo. 50 objetivos. 90 balas.");
        AmmuOpcionItemDificultad.SetRightLabel("+750$");
        campotiro_DIFICULTAD_PILLBOXHILL.AddItem(AmmuOpcionItemDificultad);
        AmmuOpcionItemDificultad = new UIMenuItem("Difícil", "0.43 segundos entre objetivo y objetivo. 70 objetivos. 90 balas.");
        AmmuOpcionItemDificultad.SetRightLabel("+1000$");
        campotiro_DIFICULTAD_PILLBOXHILL.AddItem(AmmuOpcionItemDificultad);
        AmmuOpcionItemDificultad = new UIMenuItem("Muy difícil", "0.33 segundos entre objetivo y objetivo. 90 objetivos. 90 balas.");
        AmmuOpcionItemDificultad.SetRightLabel("+1250$");
        campotiro_DIFICULTAD_PILLBOXHILL.AddItem(AmmuOpcionItemDificultad);
        campotiro_DIFICULTAD_PILLBOXHILL.AddItem(new UIMenuItem("Volver", "Vuelve al menu de categorias de armas."));

        campotiro_DIFICULTAD_PILLBOXHILL.ItemSelect.on((item, index) => {

            let empezarEntrenamiento = true;

            switch (index) {
                case 0:
                    campodetiro_precio = campodetiro_precio + 250;
                    campodetiro_nivelElegido = 1;
                    break;
                case 1:
                    campodetiro_precio = campodetiro_precio + 500;
                    campodetiro_nivelElegido = 2;
                    break;
                case 2:
                    campodetiro_precio = campodetiro_precio + 750;
                    campodetiro_nivelElegido = 3;
                    break;
                case 3:
                    campodetiro_precio = campodetiro_precio + 1000;
                    campodetiro_nivelElegido = 4;
                    break;
                case 4:
                    campodetiro_precio = campodetiro_precio + 1250;
                    campodetiro_nivelElegido = 5;
                    break;
                case 5:
                    empezarEntrenamiento = false;
                    campotiro_DIFICULTAD_PILLBOXHILL.setVisible(false, true);
                    campotiro_DIFICULTAD_PILLBOXHILL = null;
                    mostrar_menu_campotiro_categorias_armas();
                    break;
            }

            if (empezarEntrenamiento) {
                campotiro_DIFICULTAD_PILLBOXHILL.setVisible(false, true);
                campotiro_DIFICULTAD_PILLBOXHILL = null;
                campodetiro_balas_nivelElegido = 90;
                mostrar_menu_ammunation_confirmar();
            }
        });

        campotiro_DIFICULTAD_PILLBOXHILL.MenuClose.on(item => {
            mostrar_menu_campotiro_categorias_armas();
            campotiro_DIFICULTAD_PILLBOXHILL = null;
        });
    }

    if (calcDist(player_local.position, new mp.Vector3(819.64594, -2154.0142, 29.619001)) > 5.0 && calcDist(player_local.position, new mp.Vector3(12.54883, -1105.1913, 29.7970)) > 5.0)
    {
        mostrarAviso("danger", 8000, 'Debes estar cerca de la taquilla para poder hacer eso');
        mp.events.call("sound:cancel");
        return;
    }
}

function mostrar_menu_ammunation_confirmar() {
    ammunationConfirmacion = crearMenu("Pagar", "¿Cómo desea realizar el pago?");
    ammunationConfirmacion.AddItem(new UIMenuItem("Efectivo", "El entrenamiento tendrá un coste de ~y~" + campodetiro_precio + "$~w~. Comenzará 5 segundos después de confirmar."));
    ammunationConfirmacion.AddItem(new UIMenuItem("Tarjeta", "El entrenamiento tendrá un coste de ~y~" + campodetiro_precio + "$~w~. Comenzará 5 segundos después de confirmar."));
    ammunationConfirmacion.AddItem(new UIMenuItem("Cancelar", "Cancelas el entrenamiento."));

    ammunationConfirmacion.ItemSelect.on((item, index) => {
        ammunationConfirmacion.setVisible(false);
        ammunationConfirmacion = null;

        mp.events.call("sound:cancel");

        if (calcDist(player_local.position, new mp.Vector3(819.64594, -2154.0142, 29.619001)) > 5.0 && calcDist(player_local.position, new mp.Vector3(12.54883, -1105.1913, 29.7970)) > 5.0) {
            mostrarAviso("danger", 8000, 'Debes estar cerca de la taquilla para poder hacer eso');
            return;
        }

        switch (index) {
            case 0:
                mp.events.callRemote('ammunation:empezar_entrenamiento', enCampoDeTiro, campodetiro_nivelElegido, campodetiro_precio, campodetiro_weaponhash_armaElegida, campodetiro_balas_nivelElegido, campodetiro_nombre_armaElegida, 0);
                break;
            case 1:
                mp.events.callRemote('ammunation:empezar_entrenamiento', enCampoDeTiro, campodetiro_nivelElegido, campodetiro_precio, campodetiro_weaponhash_armaElegida, campodetiro_balas_nivelElegido, campodetiro_nombre_armaElegida, 1);
                break;
            case 2:
                // Se cierra el menu
                break;
        }
    });

    ammunationConfirmacion.MenuClose.on(item => {
        ammunationConfirmacion = null;
        mp.events.call("sound:cancel");
    });
}



/*
*  FIB
*/

mp.events.add("ammunationFIB:mostrar_menu", function () { mostrar_menu_ammunationFIB() });

let modoAmmunationFIB = 0;
let campodetiroFIB_weaponhash_armaElegida = "";
let campodetiroFIB_nombre_armaElegida = "";
let campodetiroFIB_balas_nivelElegido = 0;
let campodetiroFIB_nivelElegido = 0;

function mostrar_menu_ammunationFIB() {
    modoAmmunationFIB = 0;

    ammunationFIB = crearMenu("Galeria de tiro FIB", "Modalidades disponibles");
    ammunationFIB.AddItem(new UIMenuItem("Puntos", "Consige los máximos puntos posibles"));
    ammunationFIB.AddItem(new UIMenuItem("Velocidad", "Consige derribar los máximos objetivos posibles"));
    ammunationFIB.AddItem(new UIMenuItem("Disparo a cabeza", "Consige darle en la cabeza a los máximos objetivos posibles"));
    ammunationFIB.AddItem(new UIMenuItem("Disparo a zona no letal", "Consige darle en zona no letal a los máximos objetivos posibles"));
    ammunationFIB.AddItem(new UIMenuItem("Cerrar", "Cierra el menu actual."));

    ammunationFIB.ItemSelect.on((item, index) => {
        switch (index) {
            case 0:
                modoAmmunationFIB = 1;
                mostrar_menu_campotiroFIB_categorias_armas();
                break;
            case 1:
                modoAmmunationFIB = 2;
                mostrar_menu_campotiroFIB_categorias_armas();
                break;
            case 2:
                modoAmmunationFIB = 3;
                mostrar_menu_campotiroFIB_categorias_armas();
                break;
            case 3:
                modoAmmunationFIB = 4;
                mostrar_menu_campotiroFIB_categorias_armas();
                break;
            default:
                ammunationFIB?.Close();
                return;
        }

        ammunationFIB?.Close(true);
    });

    ammunationFIB.MenuClose.on(item => {
        ammunationFIB = null;
    });
}
function mostrar_menu_campotiroFIB_categorias_armas() {
    let ammunationFIB_CATEGORIAS = crearMenu("Categorias", "Categorias de armas", true);
    ammunationFIB_CATEGORIAS.AddItem(new UIMenuItem("Pistola"));
    ammunationFIB_CATEGORIAS.AddItem(new UIMenuItem("Subfusiles"));
    ammunationFIB_CATEGORIAS.AddItem(new UIMenuItem("Escopetas"));
    ammunationFIB_CATEGORIAS.AddItem(new UIMenuItem("Rifles de asalto"));
    ammunationFIB_CATEGORIAS.AddItem(new UIMenuItem("Ametralladoras"));
    ammunationFIB_CATEGORIAS.AddItem(new UIMenuItem("Volver", "Vuelve al menu de modalidades disponibles"));

    ammunationFIB_CATEGORIAS.ItemSelect.on((item, index) => {
        switch (index) {
            case 0:
                mostrar_menu_campotiroFIB_pistolas();
                break;
            case 1:
                mostrar_menu_campotiroFIB_subfusiles();
                break;
            case 2:
                mostrar_menu_campotiroFIB_escopetas();
                break;
            case 3:
                mostrar_menu_campotiroFIB_riflesdeasalto();
                break;
            case 4:
                mostrar_menu_campotiroFIB_ametralladoras();
                break;
            default:
                ammunationFIB_CATEGORIAS?.Close(true);
                return;
        }

        ammunationFIB_CATEGORIAS.setVisible(false, true);
        ammunationFIB_CATEGORIAS = null;
    });

    ammunationFIB_CATEGORIAS.MenuClose.on(item => {
        mostrar_menu_ammunationFIB();
        ammunationFIB_CATEGORIAS = null;
    });
}
function mostrar_menu_campotiroFIB_pistolas() {
    campodetiroFIB_weaponhash_armaElegida = "";
    campodetiroFIB_nombre_armaElegida = "";

    let campotiro_PISTOLAS = crearMenu("Pistolas", "Pistolas disponibles", true);
    campotiro_PISTOLAS.AddItem(new UIMenuItem("Pistola", ""));
    campotiro_PISTOLAS.AddItem(new UIMenuItem("Pistola Mk II", ""));
    campotiro_PISTOLAS.AddItem(new UIMenuItem("Pistola de combate", ""));
    campotiro_PISTOLAS.AddItem(new UIMenuItem("Pistola AP", ""));
    campotiro_PISTOLAS.AddItem(new UIMenuItem("Pistola .50", ""));
    campotiro_PISTOLAS.AddItem(new UIMenuItem("Pistola SNS", ""));
    campotiro_PISTOLAS.AddItem(new UIMenuItem("Pistola SNS Mk II", ""));
    campotiro_PISTOLAS.AddItem(new UIMenuItem("Pistola pesada", ""));
    campotiro_PISTOLAS.AddItem(new UIMenuItem("Revólver pesado", ""));
    campotiro_PISTOLAS.AddItem(new UIMenuItem("Revólver pesado Mk II", ""));
    campotiro_PISTOLAS.AddItem(new UIMenuItem("Pistola de cerámica", ""));
    campotiro_PISTOLAS.AddItem(new UIMenuItem("Revólver de la marina", ""));
    campotiro_PISTOLAS.AddItem(new UIMenuItem("Volver", "Vuelve al menu de categorias de armas."));

    campotiro_PISTOLAS.ItemSelect.on((item, index) => {
        switch (index) {
            case 0:
                campodetiroFIB_weaponhash_armaElegida = "weapon_pistol";
                campodetiroFIB_nombre_armaElegida = "pistola";
                mostrar_menu_campotiroFIB_dificultad();
                break;
            case 1:
                campodetiroFIB_weaponhash_armaElegida = "weapon_pistol_mk2";
                campodetiroFIB_nombre_armaElegida = "pistola Mk II";
                mostrar_menu_campotiroFIB_dificultad();
                break;
            case 2:
                campodetiroFIB_weaponhash_armaElegida = "weapon_combatpistol";
                campodetiroFIB_nombre_armaElegida = "pistola de combate";
                mostrar_menu_campotiroFIB_dificultad();
                break;
            case 3:
                campodetiroFIB_weaponhash_armaElegida = "weapon_appistol";
                campodetiroFIB_nombre_armaElegida = "pistola AP";
                mostrar_menu_campotiroFIB_dificultad();
                break;
            case 4:
                campodetiroFIB_weaponhash_armaElegida = "weapon_pistol50";
                campodetiroFIB_nombre_armaElegida = "pistola .50";
                mostrar_menu_campotiroFIB_dificultad();
                break;
            case 5:
                campodetiroFIB_weaponhash_armaElegida = "weapon_snspistol";
                campodetiroFIB_nombre_armaElegida = "pistola SNS";
                mostrar_menu_campotiroFIB_dificultad();
                break;
            case 6:
                campodetiroFIB_weaponhash_armaElegida = "weapon_snspistol_mk2";
                campodetiroFIB_nombre_armaElegida = "pistola SNS Mk II";
                mostrar_menu_campotiroFIB_dificultad();
                break;
            case 7:
                campodetiroFIB_weaponhash_armaElegida = "weapon_heavypistol";
                campodetiroFIB_nombre_armaElegida = "pistola pesada";
                mostrar_menu_campotiroFIB_dificultad();
                break;
            case 8:
                campodetiroFIB_weaponhash_armaElegida = "weapon_revolver";
                campodetiroFIB_nombre_armaElegida = "revólver pesado";
                mostrar_menu_campotiroFIB_dificultad();
                break;
            case 9:
                campodetiroFIB_weaponhash_armaElegida = "weapon_revolver_mk2";
                campodetiroFIB_nombre_armaElegida = "revólver pesado Mk II";
                mostrar_menu_campotiroFIB_dificultad();
                break;
            case 10:
                campodetiroFIB_weaponhash_armaElegida = "weapon_ceramicpistol";
                campodetiroFIB_nombre_armaElegida = "pistola de cerámica";
                mostrar_menu_campotiroFIB_dificultad();
                break;
            case 11:
                campodetiroFIB_weaponhash_armaElegida = "weapon_navyrevolver";
                campodetiroFIB_nombre_armaElegida = "revólver de la marina";
                mostrar_menu_campotiroFIB_dificultad();
                break;
            default:
                campotiro_PISTOLAS?.Close(true);
                return;
        }

        campotiro_PISTOLAS.setVisible(false, true);
        campotiro_PISTOLAS = null;
    });

    campotiro_PISTOLAS.MenuClose.on(item => {
        mostrar_menu_campotiroFIB_categorias_armas();
        campotiro_PISTOLAS = null;
    });
}
function mostrar_menu_campotiroFIB_subfusiles() {
    campodetiroFIB_weaponhash_armaElegida = "";
    campodetiroFIB_nombre_armaElegida = "";

    let campotiroFIB_SUBFUSILES = crearMenu("Subfusiles", "Subfusiles disponibles", true);
    campotiroFIB_SUBFUSILES.AddItem(new UIMenuItem("MP5", ""));
    campotiroFIB_SUBFUSILES.AddItem(new UIMenuItem("MP5 Mk II", ""));
    campotiroFIB_SUBFUSILES.AddItem(new UIMenuItem("SMG de asalto", ""));
    campotiroFIB_SUBFUSILES.AddItem(new UIMenuItem("PDW de combate", ""));
    campotiroFIB_SUBFUSILES.AddItem(new UIMenuItem("Volver", "Vuelve al menu de categorias de armas."));

    campotiroFIB_SUBFUSILES.ItemSelect.on((item, index) => {
        switch (index) {
            case 0:
                campodetiroFIB_weaponhash_armaElegida = "weapon_smg";
                campodetiroFIB_nombre_armaElegida = "MP5";
                mostrar_menu_campotiroFIB_dificultad();
                break;
            case 1:
                campodetiroFIB_weaponhash_armaElegida = "weapon_smg_mk2";
                campodetiroFIB_nombre_armaElegida = "MP5 Mk II";
                mostrar_menu_campotiroFIB_dificultad();
                break;
            case 2:
                campodetiroFIB_weaponhash_armaElegida = "weapon_assaultsmg";
                campodetiroFIB_nombre_armaElegida = "SMG de asalto";
                mostrar_menu_campotiroFIB_dificultad();
                break;
            case 3:
                campodetiroFIB_weaponhash_armaElegida = "weapon_combatpdw";
                campodetiroFIB_nombre_armaElegida = "PDW de combate";
                mostrar_menu_campotiroFIB_dificultad();
                break;
            default:
                campotiroFIB_SUBFUSILES?.Close(true);
                return;
        }

        campotiroFIB_SUBFUSILES.setVisible(false, true);
        campotiroFIB_SUBFUSILES = null;
    });

    campotiroFIB_SUBFUSILES.MenuClose.on(item => {
        mostrar_menu_campotiroFIB_categorias_armas();
        campotiroFIB_SUBFUSILES = null;
    });
}
function mostrar_menu_campotiroFIB_escopetas() {
    campodetiroFIB_weaponhash_armaElegida = "";
    campodetiroFIB_nombre_armaElegida = "";

    let campotiro_ESCOPETAS = crearMenu("Escopetas", "Escopetas disponibles", true);
    campotiro_ESCOPETAS.AddItem(new UIMenuItem("Escopeta", ""));
    campotiro_ESCOPETAS.AddItem(new UIMenuItem("Escopeta de goma", ""));
    campotiro_ESCOPETAS.AddItem(new UIMenuItem("Escopeta de asalto", ""));
    campotiro_ESCOPETAS.AddItem(new UIMenuItem("Escopeta bullpup", ""));
    campotiro_ESCOPETAS.AddItem(new UIMenuItem("Escopeta pesada", ""));
    campotiro_ESCOPETAS.AddItem(new UIMenuItem("~y~Volver~w~", "Vuelve al menu de categorias de armas."));

    campotiro_ESCOPETAS.ItemSelect.on((item, index) => {
        switch (index) {
            case 0:
                campodetiroFIB_weaponhash_armaElegida = "weapon_pumpshotgun";
                campodetiroFIB_nombre_armaElegida = "escopeta";
                mostrar_menu_campotiroFIB_dificultad();
                break;
            case 1:
                campodetiroFIB_weaponhash_armaElegida = "weapon_pumpshotgun_mk2";
                campodetiroFIB_nombre_armaElegida = "escopeta de goma";
                mostrar_menu_campotiroFIB_dificultad();
                break;
            case 2:
                campodetiroFIB_weaponhash_armaElegida = "weapon_assaultshotgun";
                campodetiroFIB_nombre_armaElegida = "escopeta de asalto";
                mostrar_menu_campotiroFIB_dificultad();
                break;
            case 3:
                campodetiroFIB_weaponhash_armaElegida = "weapon_bullpupshotgun";
                campodetiroFIB_nombre_armaElegida = "escopeta bullpup";
                mostrar_menu_campotiroFIB_dificultad();
                break;
            case 4:
                campodetiroFIB_weaponhash_armaElegida = "weapon_heavyshotgun";
                campodetiroFIB_nombre_armaElegida = "escopeta pesada";
                mostrar_menu_campotiroFIB_dificultad();
                break;
            default:
                campotiro_ESCOPETAS?.Close(true);
                return;
        }

        campotiro_ESCOPETAS.setVisible(false, true);
        campotiro_ESCOPETAS = null;
    });

    campotiro_ESCOPETAS.MenuClose.on(item => {
        mostrar_menu_campotiroFIB_categorias_armas();
        campotiro_ESCOPETAS = null;
    });
}
function mostrar_menu_campotiroFIB_riflesdeasalto() {
    campodetiroFIB_weaponhash_armaElegida = "";
    campodetiroFIB_nombre_armaElegida = "";

    let campotiroFIB_RIFLESDEASALTO = crearMenu("Rifles de asalto", "Rifles de asalto disponibles", true);
    campotiroFIB_RIFLESDEASALTO.AddItem(new UIMenuItem("AK-47", ""));
    campotiroFIB_RIFLESDEASALTO.AddItem(new UIMenuItem("AK-47 Mk II", ""));
    campotiroFIB_RIFLESDEASALTO.AddItem(new UIMenuItem("M4", ""));
    campotiroFIB_RIFLESDEASALTO.AddItem(new UIMenuItem("M4 Mk II", ""));
    campotiroFIB_RIFLESDEASALTO.AddItem(new UIMenuItem("Rifle avanzado", ""));
    campotiroFIB_RIFLESDEASALTO.AddItem(new UIMenuItem("Carabina especial", ""));
    campotiroFIB_RIFLESDEASALTO.AddItem(new UIMenuItem("Carabina especial Mk II", ""));
    campotiroFIB_RIFLESDEASALTO.AddItem(new UIMenuItem("Rifle bullpup", ""));
    campotiroFIB_RIFLESDEASALTO.AddItem(new UIMenuItem("Rifle bullpup Mk II", ""));
    campotiroFIB_RIFLESDEASALTO.AddItem(new UIMenuItem("~y~Volver~w~", "Vuelve al menu de categorias de armas."));

    campotiroFIB_RIFLESDEASALTO.ItemSelect.on((item, index) => {
        switch (index) {
            case 0:
                campodetiroFIB_weaponhash_armaElegida = "weapon_assaultrifle";
                campodetiroFIB_nombre_armaElegida = "AK-47";
                mostrar_menu_campotiroFIB_dificultad();
                break;
            case 1:
                campodetiroFIB_weaponhash_armaElegida = "weapon_assaultrifle_mk2";
                campodetiroFIB_nombre_armaElegida = "AK-47 Mk II";
                mostrar_menu_campotiroFIB_dificultad();
                break;
            case 2:
                campodetiroFIB_weaponhash_armaElegida = "weapon_carbinerifle";
                campodetiroFIB_nombre_armaElegida = "M4";
                mostrar_menu_campotiroFIB_dificultad();
                break;
            case 3:
                campodetiroFIB_weaponhash_armaElegida = "weapon_carbinerifle_mk2";
                campodetiroFIB_nombre_armaElegida = "M4 Mk II";
                mostrar_menu_campotiroFIB_dificultad();
                break;
            case 4:
                campodetiroFIB_weaponhash_armaElegida = "weapon_advancedrifle";
                campodetiroFIB_nombre_armaElegida = "rifle avanzado";
                mostrar_menu_campotiroFIB_dificultad();
                break;
            case 5:
                campodetiroFIB_weaponhash_armaElegida = "weapon_specialcarbine";
                campodetiroFIB_nombre_armaElegida = "carabina especial";
                mostrar_menu_campotiroFIB_dificultad();
                break;
            case 6:
                campodetiroFIB_weaponhash_armaElegida = "weapon_specialcarbine_mk2";
                campodetiroFIB_nombre_armaElegida = "carabina especial Mk II";
                mostrar_menu_campotiroFIB_dificultad();
                break;
            case 7:
                campodetiroFIB_weaponhash_armaElegida = "weapon_bullpuprifle";
                campodetiroFIB_nombre_armaElegida = "rifle bullpup";
                mostrar_menu_campotiroFIB_dificultad();
                break;
            case 8:
                campodetiroFIB_weaponhash_armaElegida = "weapon_bullpuprifle_mk2";
                campodetiroFIB_nombre_armaElegida = "rifle bullpup Mk II";
                mostrar_menu_campotiroFIB_dificultad();
                break;
            default:
                campotiroFIB_RIFLESDEASALTO?.Close(true);
                return;
        }

        campotiroFIB_RIFLESDEASALTO.setVisible(false, true);
        campotiroFIB_RIFLESDEASALTO = null;
    });

    campotiroFIB_RIFLESDEASALTO.MenuClose.on(item => {
        mostrar_menu_campotiroFIB_categorias_armas();
        campotiroFIB_RIFLESDEASALTO = null;
    });
}
function mostrar_menu_campotiroFIB_ametralladoras() {
    campodetiroFIB_weaponhash_armaElegida = "";
    campodetiroFIB_nombre_armaElegida = "";

    let campotiroFIB_AMETRALLADORAS = crearMenu("Ametralladoras", "Ametralladoras ligeras disponibles", true);
    campotiroFIB_AMETRALLADORAS.AddItem(new UIMenuItem("Ametralladora", ""));
    campotiroFIB_AMETRALLADORAS.AddItem(new UIMenuItem("Ametralladora de combate", ""));
    campotiroFIB_AMETRALLADORAS.AddItem(new UIMenuItem("Ametralladora de combate Mk II", ""));
    campotiroFIB_AMETRALLADORAS.AddItem(new UIMenuItem("Volver", "Vuelve al menu de categorias de armas."));

    campotiroFIB_AMETRALLADORAS.ItemSelect.on((item, index) => {
        switch (index) {
            case 0:
                campodetiroFIB_weaponhash_armaElegida = "weapon_mg";
                campodetiroFIB_nombre_armaElegida = "ametralladora";
                mostrar_menu_campotiroFIB_dificultad();
                break;
            case 1:
                campodetiroFIB_weaponhash_armaElegida = "weapon_combatmg";
                campodetiroFIB_nombre_armaElegida = "ametralladora de combate";
                mostrar_menu_campotiroFIB_dificultad();
                break;
            case 2:
                campodetiroFIB_weaponhash_armaElegida = "weapon_combatmg_mk2";
                campodetiroFIB_nombre_armaElegida = "ametralladora de combate Mk II";
                mostrar_menu_campotiroFIB_dificultad();
                break;
            default:
                campotiroFIB_AMETRALLADORAS?.Close(true);
                return;
        }

        campotiroFIB_AMETRALLADORAS.setVisible(false, true);
        campotiroFIB_AMETRALLADORAS = null;
    });

    campotiroFIB_AMETRALLADORAS.MenuClose.on(item => {
        mostrar_menu_campotiroFIB_categorias_armas();
        campotiroFIB_AMETRALLADORAS = null;
    });
}
function mostrar_menu_campotiroFIB_dificultad() {
    if (modoAmmunationFIB == 0) return;

    if (modoAmmunationFIB == 1) { // MODO PUNTOS
        campodetiroFIB_nivelElegido = 0;
        campodetiroFIB_balas_nivelElegido = 0;

        let campotiro_DIFICULTAD_MODO1 = crearMenu("Dificultad", "Selecciona la dificultad", true);
        campotiro_DIFICULTAD_MODO1.AddItem(new UIMenuItem("Fácil", ""));
        campotiro_DIFICULTAD_MODO1.AddItem(new UIMenuItem("Media", ""));
        campotiro_DIFICULTAD_MODO1.AddItem(new UIMenuItem("Difícil", ""));
        campotiro_DIFICULTAD_MODO1.AddItem(new UIMenuItem("Volver", "Vuelve al menu de categorias de armas."));

        campotiro_DIFICULTAD_MODO1.ItemSelect.on((item, index) => {
            let empezarEntrenamiento = true;

            switch (index) {
                case 0:
                    campodetiroFIB_balas_nivelElegido = 30;
                    campodetiroFIB_nivelElegido = 2;
                    break;
                case 1:
                    campodetiroFIB_balas_nivelElegido = 25;
                    campodetiroFIB_nivelElegido = 3;
                    break;
                case 2:
                    campodetiroFIB_balas_nivelElegido = 20;
                    campodetiroFIB_nivelElegido = 4;
                    break;
                case 3:
                    empezarEntrenamiento = false;
                    campotiro_DIFICULTAD_MODO1.setVisible(false, true);
                    campotiro_DIFICULTAD_MODO1 = null;
                    mostrar_menu_campotiroFIB_categorias_armas();
                    break;
            }

            if (empezarEntrenamiento) {
                campotiro_DIFICULTAD_MODO1.setVisible(false, true);
                campotiro_DIFICULTAD_MODO1 = null;
                mostrar_menu_ammunationFIB_confirmar();
            }
        });

        campotiro_DIFICULTAD_MODO1.MenuClose.on(item => {
            mostrar_menu_campotiroFIB_categorias_armas();
            campotiro_DIFICULTAD_MODO1 = null;
        });
    }

    if (modoAmmunationFIB == 2 || modoAmmunationFIB == 3 || modoAmmunationFIB == 4) { // MODO VELOCIDAD, SOLO CABEZA Y PARTES NO LETALES
        campodetiroFIB_nivelElegido = 0;
        campodetiroFIB_balas_nivelElegido = 0;

        let campotiro_DIFICULTAD_MODO2 = crearMenu("Dificultad", "Selecciona la dificultad", true);
        campotiro_DIFICULTAD_MODO2.AddItem(new UIMenuItem("Fácil", ""));
        campotiro_DIFICULTAD_MODO2.AddItem(new UIMenuItem("Media", ""));
        campotiro_DIFICULTAD_MODO2.AddItem(new UIMenuItem("Difícil", ""));
        campotiro_DIFICULTAD_MODO2.AddItem(new UIMenuItem("Volver", "Vuelve al menu de categorias de armas."));

        campotiro_DIFICULTAD_MODO2.ItemSelect.on((item, index) => {

            let empezarEntrenamiento = true;

            switch (index) {
                case 0:
                    campodetiroFIB_nivelElegido = 2;
                    break;
                case 1:
                    campodetiroFIB_nivelElegido = 3;
                    break;
                case 2:
                    campodetiroFIB_nivelElegido = 4;
                    break;
                case 3:
                    empezarEntrenamiento = false;
                    campotiro_DIFICULTAD_MODO2.setVisible(false, true);
                    campotiro_DIFICULTAD_MODO2 = null;
                    mostrar_menu_campotiroFIB_categorias_armas();
                    break;
            }

            if (empezarEntrenamiento) {
                campotiro_DIFICULTAD_MODO2.setVisible(false, true);
                campotiro_DIFICULTAD_MODO2 = null;
                campodetiroFIB_balas_nivelElegido = 70;
                mostrar_menu_ammunationFIB_confirmar();
            }
        });

        campotiro_DIFICULTAD_MODO2.MenuClose.on(item => {
            mostrar_menu_campotiroFIB_categorias_armas();
            campotiro_DIFICULTAD_MODO2 = null;
        });
    }
}

function mostrar_menu_ammunationFIB_confirmar() {
    ammunationFIBConfirmacion = crearMenu("Confirmación", "Confirma el entrenamiento");
    ammunationFIBConfirmacion.AddItem(aplicarColores(new UIMenuItem("Confirmar", "El entrenamiento no tendrá ningún coste. Comenzará 5 segundos después de confirmar."), "Verde"));
    ammunationFIBConfirmacion.AddItem(new UIMenuItem("Cancelar", "Cancelas el entrenamiento."));

    ammunationFIBConfirmacion.ItemSelect.on((item, index) => {
        ammunationFIBConfirmacion.setVisible(false);
        ammunationFIBConfirmacion = null;

        if (calcDist(player_local.position, new mp.Vector3(2489.2153, -378.0809, 82.694466)) > 5.0) {
            mostrarAviso("danger", 8000, 'Debes estar cerca del mostrador para poder hacer eso');
            return;
        }

        switch (index) {
            case 0:
                mp.events.callRemote('ammunationFIB:empezar_entrenamiento', modoAmmunationFIB, campodetiroFIB_nivelElegido, campodetiroFIB_weaponhash_armaElegida, campodetiroFIB_balas_nivelElegido, campodetiroFIB_nombre_armaElegida);
                break;
            case 1:
                // Se cierra el menu
                break;
        }
    });

    ammunationFIBConfirmacion.MenuClose.on(item => {
        ammunationFIBConfirmacion = null;
    });
}

}