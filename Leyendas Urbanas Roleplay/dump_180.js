{
﻿/*
 * Descripcion: Contiene el menú del ascensor de FD
 */

let ascensorFD = null;

// Evento menu
mp.events.add("mostrar_ascensor_fd", function () {
    mostrar_ascensor_fd();
});

// Funcion para mostrar el menu del ascensor de FD
function mostrar_ascensor_fd() {

    ascensorFD = crearMenu("Ascensor", "Hospital Pillbox Hill");
    ascensorFD.AddItem(new UIMenuItem("Helipuerto", ""));
    ascensorFD.AddItem(new UIMenuItem("Hospital", ""));
    ascensorFD.AddItem(aplicarColores(new UIMenuItem("Garaje", "Garaje del hospital, reservado al personal"), "Amarillo"));
    ascensorFD.AddItem(new UIMenuItem("Cerrar", "Cierra el menú actual"));

    ascensorFD.ItemSelect.on((item, index) => {
        switch (index) {
            case 0: case 1: case 2:
                mp.events.callRemote("AscensorFD", (index + 1));
                break;
            default:
                break;
        }

        ascensorFD?.Close();
    });

    ascensorFD.MenuClose.on(() => {
        ascensorFD = null;
    });
}

mp.events.add("render", () => {
    if (player_local.dimension == 62) {
        mp.game.graphics.drawLightWithRange(273.552, -1359.888, 26.538, 255, 255, 255, 10, 3);
        mp.game.graphics.drawLightWithRange(267.438, -1354.475, 26.538, 255, 255, 255, 10, 3);
        mp.game.graphics.drawLightWithRange(264.446, -1360.933, 26.538, 255, 255, 255, 10, 3);
        mp.game.graphics.drawLightWithRange(260.973, -1355.263, 26.538, 255, 255, 255, 10, 3);
        mp.game.graphics.drawLightWithRange(258.704, -1358.373, 26.538, 255, 255, 255, 10, 3);
        mp.game.graphics.drawLightWithRange(253.371, -1364.243, 26.538, 255, 255, 255, 10, 3);
        mp.game.graphics.drawLightWithRange(266.289, -1349.066, 26.538, 255, 255, 255, 10, 2);
        mp.game.graphics.drawLightWithRange(269.465, -1345.382, 26.538, 255, 255, 255, 10, 2);
        mp.game.graphics.drawLightWithRange(272.605, -1341.442, 26.538, 255, 255, 255, 10, 2);
        mp.game.graphics.drawLightWithRange(277.381, -1344.953, 26.538, 255, 255, 255, 10, 2);
        mp.game.graphics.drawLightWithRange(281.043, -1347.922, 26.538, 255, 255, 255, 10, 2);
        mp.game.graphics.drawLightWithRange(287.233, -1340.630, 26.538, 255, 255, 255, 10, 2);
        mp.game.graphics.drawLightWithRange(263.554, -1344.159, 26.538, 255, 255, 255, 10, 2);
        mp.game.graphics.drawLightWithRange(258.473, -1339.332, 26.538, 255, 255, 255, 10, 2);
        mp.game.graphics.drawLightWithRange(257.234, -1346.424, 26.538, 255, 255, 255, 10, 2);
        mp.game.graphics.drawLightWithRange(255.189, -1349.291, 26.538, 255, 255, 255, 10, 2);
        mp.game.graphics.drawLightWithRange(247.997, -1351.431, 26.538, 255, 255, 255, 10, 2);
        mp.game.graphics.drawLightWithRange(245.483, -1354.224, 26.538, 255, 255, 255, 10, 2);
        mp.game.graphics.drawLightWithRange(253.495, -1356.144, 26.538, 255, 255, 255, 10, 2);
    }
});

}