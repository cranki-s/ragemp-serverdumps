{
/* --------------------------------------------------------------------------------
 * equipariaa.js
 *
 * Autor: FerniMoon
 *
 * Descripción: Menu de equipar para el IAA
 *
 * -------------------------------------------------------------------------------- */

mp.events.add("mostrar_equipar_IAA", function () { mostrar_equipar_iaa() });

function mostrar_equipar_iaa() {
    equiparIAA = crearMenu("Equipar", "IAA");
    equiparIAA.AddItem(new UIMenuItem("Ropa", "Equipar IAA"));
    equiparIAA.AddItem(new UIMenuItem("Accesorios", "Equipar IAA"));
    equiparIAA.AddItem(new UIMenuItem("Chalecos", "Equipar IAA"));
    equiparIAA.AddItem(new UIMenuItem("Placas", "Equipar IAA"));

    equiparIAA.ItemSelect.on((item, index) => {
        equiparIAA?.Close();

        switch (index) {
            case 0:
                mostrar_equipar_IAA_ropa();
                break;
            case 1:
                mostrar_equipar_IAA_accesorios();
                break;
            case 2:
                mostrar_equipar_IAA_chalecos();
                break;
            case 3:
                mostrar_equipar_IAA_placa();
                break;
        }
    });

    equiparIAA.MenuClose.on(item => {
        equiparIAA = null;
    });
}

function mostrar_equipar_IAA_ropa() {
    equiparIAA_ROPA = crearMenu("Ropa", "Ropa relacionadas con el trabajo");
    equiparIAA_ROPA.AddItem(new UIMenuItem("Uniforme IAA", "Uniforme de operativos IAA"));
    equiparIAA_ROPA.AddItem(new UIMenuItem("Uniforme de piloto", "Uniforme para pilotos IAA"));
    equiparIAA_ROPA.AddItem(new UIMenuItem("Mono de trabajo", ""));
    equiparIAA_ROPA.AddItem(new UIMenuItem("Ropa de basurero", "Uniforme basurero LS"));
    equiparIAA_ROPA.AddItem(new UIMenuItem("Ropa de paramédico", "Uniforme paramedico"));
    equiparIAA_ROPA.AddItem(new UIMenuItem("Chaqueta IAA", "Chaqueta IAA"));
    equiparIAA_ROPA.AddItem(new UIMenuItem("Undershirt Camiseta blanca básica", ""));
    equiparIAA_ROPA.AddItem(new UIMenuItem("Undershirt Camisa", ""));
    equiparIAA_ROPA.AddItem(new UIMenuItem("Undershirt Camisa con chaleco", ""));
    equiparIAA_ROPA.AddItem(new UIMenuItem("Ropa mujer", ""));
    equiparIAA_ROPA.AddItem(new UIMenuItem("Quitar ropa", ""));
    equiparIAA_ROPA.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    equiparIAA_ROPA.ItemSelect.on((item, index) => {

        if (index < 11) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote("EquiparIAA_ROPA", (index + 1));
        }

        // Volver
        if (index == 11) {
            equiparIAA_ROPA.setVisible(false);
            mostrar_equipar_iaa();
        }
    });

    equiparIAA_ROPA.MenuClose.on(item => {
        mostrar_equipar_iaa();
    });
}

function mostrar_equipar_IAA_accesorios() {
    equiparIAA_ACCESORIOS = crearMenu("Accesorios", "Accesorios utiles en nuestro trabajo");
    equiparIAA_ACCESORIOS.AddItem(new UIMenuItem("Pinganillo profesional", "Pinganillo de larga frencuencia"));
    equiparIAA_ACCESORIOS.AddItem(new UIMenuItem("Pinganillo boton", "Pinganillo de botón blanco"));
    equiparIAA_ACCESORIOS.AddItem(new UIMenuItem("Casco de trabajo", "Casco tipo obra"));
    equiparIAA_ACCESORIOS.AddItem(new UIMenuItem("Gorra de paramedico", "Gorra azul de paramed"));
    equiparIAA_ACCESORIOS.AddItem(new UIMenuItem("Gafas de grabación", "Gafas con tecnologia 2K"));
    equiparIAA_ACCESORIOS.AddItem(new UIMenuItem("Reloj-microfono", "Reloj con tecnologia de grabacion de audio"));
    equiparIAA_ACCESORIOS.AddItem(new UIMenuItem("Binoculares", "Binoculares tácticos"));
    equiparIAA_ACCESORIOS.AddItem(new UIMenuItem("Walkie-Talkie", "Radiofrecuencia"));
    equiparIAA_ACCESORIOS.AddItem(new UIMenuItem("Palanca", ""));
    equiparIAA_ACCESORIOS.AddItem(new UIMenuItem("Linterna", ""));
    equiparIAA_ACCESORIOS.AddItem(new UIMenuItem("Documentos confidenciales", ""));
    equiparIAA_ACCESORIOS.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    equiparIAA_ACCESORIOS.ItemSelect.on((item, index) => {

        if (index < 11) {
            // Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote("EquiparIAA_ACCESORIOS", (index + 1));
        }

        // Volver
        if (index == 11) {
            equiparIAA_ACCESORIOS.setVisible(false);
            mostrar_equipar_iaa();
        }
    });

    equiparIAA_ACCESORIOS.MenuClose.on(item => {
        mostrar_equipar_iaa();
    });
}

function mostrar_equipar_IAA_chalecos() {
    equiparIAA_CHALECOS = crearMenu("Chalecos", "Chalecos para operativos especiales");
    equiparIAA_CHALECOS.AddItem(new UIMenuItem("Ligero", ""));
    equiparIAA_CHALECOS.AddItem(new UIMenuItem("Pesado", ""));
    equiparIAA_CHALECOS.AddItem(new UIMenuItem("Ajustado", ""));
    equiparIAA_CHALECOS.AddItem(new UIMenuItem("Semi pesado", ""));
    equiparIAA_CHALECOS.AddItem(new UIMenuItem("Chaleco (Armadura)", "Chaleco no visual, únicamente armadura"));
    equiparIAA_CHALECOS.AddItem(new UIMenuItem("Quitar", "Quita el chaleco actual"));
    equiparIAA_CHALECOS.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    equiparIAA_CHALECOS.ItemSelect.on((item, index) => {

        if (index < 6) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote("EquiparIAA_CHALECOS", (index + 1));
        }

        // Volver
        if (index == 6) {
            equiparIAA_CHALECOS.setVisible(false);
            mostrar_equipar_iaa();
        }
    });

    equiparIAA_CHALECOS.MenuClose.on(item => {
        mostrar_equipar_iaa();
    });
}

function mostrar_equipar_IAA_placa() {
    equiparIAA_PLACA = crearMenu("Placa", "");
    equiparIAA_PLACA.AddItem(new UIMenuItem("Poner placa cuello", "Te pone la placa que va colgando del cuello"));
    equiparIAA_PLACA.AddItem(new UIMenuItem("Poner placa cinturon", "Te pone la placa que va colgada en el cinturon y en el cuello"));
    equiparIAA_PLACA.AddItem(new UIMenuItem("Poner placa esposas", "Te pone la placa con esposas"));
    equiparIAA_PLACA.AddItem(new UIMenuItem("Quitar", "Quita la placa actual"));
    equiparIAA_PLACA.AddItem(new UIMenuItem("Quitar placa esposas", "Quita la placa actual"));
    equiparIAA_PLACA.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    equiparIAA_PLACA.ItemSelect.on((item, index) => {

        if (index < 5) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote("EquiparIAA_PLACA", (index + 1));
        }

        // Volver
        if (index == 5) {
            equiparIAA_PLACA.setVisible(false);
            mostrar_equipar_iaa();
        }
    });

    equiparIAA_PLACA.MenuClose.on(item => {
        mostrar_equipar_iaa();
    });
}

}