{
///* --------------------------------------------------------------------------------
// * gasolinera.js
// *
// * Autor: Kenshin
// *
// * Descripcion: Interfaz de la gasolinera
// *
// * -------------------------------------------------------------------------------- */
var cef_gasolinera = require("./LURP/cef.js");

var gasolinera_cefId = -1;

mp.events.add({
	"gasolinera:repostar": (tarifa, combustible, modelo, matricula, electrico, marca) => {

		if (gasolinera_cefId < 0) {
			gasolinera_cefId = cef_gasolinera.crearCef("package://LURP/cef/gasolinera/repostar.html", {
				mostrarCursor: true,
				puedeCerrar: true
			}, true);

			anularCamaraAFK(true);

			if (!hudOculto)
				mp.events.call("hud:estado_hud");

			cef_gasolinera.ejecutarCef(gasolinera_cefId, "app.precioPorLitro = " + tarifa);
			cef_gasolinera.ejecutarCef(gasolinera_cefId, "app.combustible = " + combustible);
			cef_gasolinera.ejecutarCef(gasolinera_cefId, "app.electrico = " + electrico);
			cef_gasolinera.ejecutarCef(gasolinera_cefId, "app.modelo = '" + modelo + "'");
			cef_gasolinera.ejecutarCef(gasolinera_cefId, "app.matricula = '" + matricula + "'");
			cef_gasolinera.ejecutarCef(gasolinera_cefId, "app.calcularDisponibles()");
			cef_gasolinera.ejecutarCef(gasolinera_cefId, "marca(" + marca + ")");
		}
	},
	"gasolinera:llenado": (obj) => {
		const datos = JSON.parse(obj);
		mp.events.callRemote("gasolinera:repostado", datos.litros, datos.precio);
		anularCamaraAFK(false);
	}
});

mp.events.add("cerrarRepostar", () => {
	if (gasolinera_cefId >= 0) {
		cef_gasolinera.cerrarCef(gasolinera_cefId);
		gasolinera_cefId = -1;
	}

	anularCamaraAFK(false);

	if (hudOculto)
		mp.events.call("hud:estado_hud");
});

}