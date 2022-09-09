{
/* --------------------------------------------------------------------------------
 * equiparpegasus.js
 *
 * Autor: FerniMoon
 *
 * Descripción: Menu de equipar para la facción de pegasus
 *
 * -------------------------------------------------------------------------------- */

mp.events.add("mostrar_equipar_pegasus", function () { mostrar_equipar_pegasus() });

function mostrar_equipar_pegasus() {
    equiparPEG = crearMenu("Equipar", "Pegasus");
    equiparPEG.AddItem(new UIMenuItem("Uniformes", "Equipar PEGASUS"));
    equiparPEG.AddItem(new UIMenuItem("Armamento", "Equipar PEGASUS"));
    equiparPEG.AddItem(new UIMenuItem("Accesorios", "Equipar PEGASUS"));
    equiparPEG.AddItem(new UIMenuItem("Guantes", "Equipar PEGASUS"));

    equiparPEG.ItemSelect.on((item, index) => {
        equiparPEG?.Close();

        switch (index) {
            case 0:
                mostrar_equipar_pegasus_uniformes();
                break;
            case 1:
                mostrar_equipar_pegasus_armamento();
                break;
            case 2:
                mostrar_equipar_pegasus_accesorios();
                break;
            case 3:
                mostrar_equipar_pegasus_guantes();
                break;
            default:
                break;
        }
    });

    equiparPEG.MenuClose.on(item => {
        equiparPEG = null;
    });
}

function mostrar_equipar_pegasus_uniformes() {
    equiparPEG_UNIFORMES = crearMenu("Uniformes", "Uniformes relacionados con el trabajo", true);
    equiparPEG_UNIFORMES.AddItem(new UIMenuItem("Piloto", "Conjunto de piloto"));
    equiparPEG_UNIFORMES.AddItem(new UIMenuItem("Piloto stunt", "Conjunto de piloto stunt"));
    equiparPEG_UNIFORMES.AddItem(new UIMenuItem("Guardia de pista", "Conjunto de guardia de pista"));
    equiparPEG_UNIFORMES.AddItem(new UIMenuItem("Encargado guardia de pista", "Conjunto de encargado guardia de pista"));
    equiparPEG_UNIFORMES.AddItem(new UIMenuItem("Paracaídismo", "Conjunto de paracaidismo"));
    equiparPEG_UNIFORMES.AddItem(new UIMenuItem("Eventos", "Conjunto de eventos"));
    equiparPEG_UNIFORMES.AddItem(new UIMenuItem("Quitar", "Vistes con tu ropa normal"));
    equiparPEG_UNIFORMES.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    equiparPEG_UNIFORMES.ItemSelect.on((item, index) => {

        if (index < 7)
        {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('equiparPEG_UNIFORMES', (index + 1));
        }

        // Volver
        if (index == 7)
        {
            equiparPEG_UNIFORMES?.Close(true);
        }
    });

    equiparPEG_UNIFORMES.MenuClose.on(item => {
        mostrar_equipar_pegasus();
    });
}

function mostrar_equipar_pegasus_armamento() {
    equiparPEG_ARMAMENTO = crearMenu("Armamento", "Armamento relacionado con el trabajo", true);
    equiparPEG_ARMAMENTO.AddItem(new UIMenuItem("Señal luminosa", "Señal luminosa para dirigir el tráfico"));
    equiparPEG_ARMAMENTO.AddItem(new UIMenuItem("Walkie talkie", ""));
    equiparPEG_ARMAMENTO.AddItem(new UIMenuItem("Linterna", ""));
    equiparPEG_ARMAMENTO.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    equiparPEG_ARMAMENTO.ItemSelect.on((item, index) => {

        if (index < 3) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('equiparPEG_ARMAMENTO', (index + 1));
        }

        // Volver
        if (index == 3) {
            equiparPEG_ARMAMENTO?.Close(true);
        }
    });

    equiparPEG_ARMAMENTO.MenuClose.on(item => {
        mostrar_equipar_pegasus();
    });

}

function mostrar_equipar_pegasus_accesorios() {
    equiparPEG_ACCESORIOS = crearMenu("Accesorios", "Accesorios relacionados con el trabajo", true);
    equiparPEG_ACCESORIOS.AddItem(new UIMenuItem("Pinganillo", ""));
    equiparPEG_ACCESORIOS.AddItem(new UIMenuItem("Quitar piganillo", "Te quitas el pinganillo"));
    equiparPEG_ACCESORIOS.AddItem(new UIMenuItem("Piganillo detras oreja", ""));
    equiparPEG_ACCESORIOS.AddItem(new UIMenuItem("Quitar piganillo", "Te quitas el pinganillo detras oreja"));
    equiparPEG_ACCESORIOS.AddItem(new UIMenuItem("Cascos sin micro", "Cascos insonorizados sin microfono"));
    equiparPEG_ACCESORIOS.AddItem(new UIMenuItem("Cascos con micro", "Cascos insonorizados con microfono"));
    equiparPEG_ACCESORIOS.AddItem(new UIMenuItem("Casco de seguridad amarillo", ""));
    equiparPEG_ACCESORIOS.AddItem(new UIMenuItem("Casco piloto stunt", ""));
    equiparPEG_ACCESORIOS.AddItem(new UIMenuItem("Quitar casco", "Te quitas el casco que tengas puesto"));
    equiparPEG_ACCESORIOS.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    equiparPEG_ACCESORIOS.ItemSelect.on((item, index) => {

        if (index < 9) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('equiparPEG_ACCESORIOS', (index + 1));
        }

        // Volver
        if (index == 9) {
            equiparPEG_ACCESORIOS?.Close(true);
        }
    });

    equiparPEG_ACCESORIOS.MenuClose.on(item => {
        mostrar_equipar_pegasus();
        equiparPEG_ACCESORIOS = null;
    });
}

function mostrar_equipar_pegasus_guantes() {
    equiparPEG_GUANTES = crearMenu("Guantes", "Guantes relacionados con el trabajo", true);
    equiparPEG_GUANTES.AddItem(new UIMenuItem("Tacticos", ""));
    equiparPEG_GUANTES.AddItem(new UIMenuItem("Tacticos (manga larga)", ""));
    equiparPEG_GUANTES.AddItem(new UIMenuItem("Quitar", "Quita los guantes actuales"));
    equiparPEG_GUANTES.AddItem(new UIMenuItem("Quitar (manga larga)", "Quita los guantes actuales"));
    equiparPEG_GUANTES.AddItem(new UIMenuItem("Volver", "Vuelve al menú anterior"));

    equiparPEG_GUANTES.ItemSelect.on((item, index) => {

        if (index < 4) {
            //Damos la ropa desde el lado del servidor para evitar posibles errores y aplicar otras opciones
            mp.events.callRemote('equiparPEG_GUANTES', (index + 1));
        }

        // Volver
        if (index == 4) {
            equiparPEG_GUANTES?.Close(true);
        }
    });

    equiparPEG_GUANTES.MenuClose.on(item => {
        mostrar_equipar_pegasus();
        equiparPEG_GUANTES = null;
    });
}

}