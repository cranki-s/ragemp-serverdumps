{
/* --------------------------------------------------------------------------------
 * pickups.js
 *
 * Autor: Dries
 *
 * Descripción: Controlador de pickups de objetos
 * 
 * Basado en el código público de rootcause https://rage.mp/files/file/324-fake-pickups/
 * -------------------------------------------------------------------------------- */

var colshapesNavidadAviso = {};

mp.pickups = {
	_pickups: {},
	_colshapes: {},

	crear: (id, modelo, posicion, tiempoAparicion, rango, dimension, color, luzSombra, tipo, obtenido) => {
		let o = mp.objects.new(modelo, posicion, { dimension: dimension });
		let c = mp.colshapes.newSphere(posicion.x, posicion.y, posicion.z, rango, dimension);
		let rgbls = color.concat(luzSombra);

		if (obtenido) {
		   c.destroy();
		   c = null;

		   o.destroy();
		   o = null;

		   o = mp.objects.new(modelo, posicion, { dimension: dimension, alpha: 50 });

		   if (tipo == "NAVIDAD_REGALO") {
			   o.label = mp.labels.new("~r~Ya has obtenido este regalo", o.position, { los: true, font: 6, drawDistance: 1.0, color: [255, 255, 255, 255], dimension: o.dimension });
		   }
		}

		let objeto = {
		   id: id,
		   modelo: modelo,
		   posicion: posicion,
		   dimension: dimension,
		   tiempoAparicion: tiempoAparicion,
		   objeto_id: o.id,
		   rango: rango,
		   rgbls: rgbls,
		   tipo: tipo
	   	};

		o.pickup = objeto;

		mp.pickups._pickups[id] = Object.assign({}, objeto);

		if (!obtenido)
			mp.pickups._colshapes[c.id] = id;

		if (tipo == "NAVIDAD_REGALO" && !obtenido) {
			let random = Math.floor(Math.random() * (65 - 25) ) + 25;
      		let ca = mp.colshapes.newSphere(posicion.x, posicion.y, posicion.z, random, dimension);
			colshapesNavidadAviso[ca.id] = id;
		}
	},
	eliminar: (id) => {
		if (!mp.pickups._pickups.hasOwnProperty(id)) return;

		let o = mp.objects.at(mp.pickups._pickups[id].objeto_id);

		/* if (o.label) {
			if (mp.labels.exists(o.label)) {
				o.label.destroy();
				o.label = null;
			}
		} */

		if (o && mp.objects.exists(o)) {
			o.destroy();
			o = null;
		}

		if (mp.pickups._pickups[id].tipo == "NAVIDAD_REGALO") {
		   for (let cid in colshapesNavidadAviso) {
			   if (colshapesNavidadAvisos[cid] == id) {
				   let c = mp.colshapes.at(cid);
				   if (c && mp.colshapes.exists(c)) {
					   c.destroy();
					   c = null;
				   }
				   delete colshapesNavidadAviso[cid];
				   break;
			   }
		   }
		}

		delete mp.pickups._pickups[id];

		for (let cid in mp.pickups._colshapes) {
			if (mp.pickups._colshapes[cid] == id) {
				let c = mp.colshapes.at(cid);
				if (c && mp.colshapes.exists(c)) {
					c.destroy();
					c = null;
				}
				delete mp.pickups._colshapes[cid];
				break;
			}
		}
	}
};

mp.events.add({
   "pickups:crear": (_pickup) => {
	   let pickup = typeof _pickup === "string" ? JSON.parse(_pickup) : _pickup;
	   
	   if (!mp.pickups._pickups.hasOwnProperty(pickup.id)) {
		   if (pickup.modelo == "weapon_pistol") return;
		   mp.pickups.crear(pickup.pickup.id, pickup.pickup.modelo/*mp.game.joaat(pickup.modelo)*/, pickup.pickup.posicion, pickup.pickup.tiempoAparicion, pickup.pickup.rango, pickup.pickup.dimension, pickup.pickup.color, pickup.pickup.luzSombra, pickup.pickup.tipo, pickup.obtenido || !pickup.pickup.spawneada);
	   }
   },
   "pickups:eliminar": (id) => {
	   if (mp.pickups._pickups.hasOwnProperty(id)) {
		   mp.pickups.eliminar(id);
	   }
   },
   "pickups:crearVarios": (_pickups, eliminarAntiguos) => {
       if (eliminarAntiguos) {
           for (let pickup in mp.pickups._pickups) {
               mp.pickups.eliminar(pickup.id);
           }
       }

	   let pickups = typeof _pickups === "string" ? JSON.parse(_pickups) : _pickups;
	   for (let pickup of pickups) {
		   mp.events.call("pickups:crear", pickup);
	   }
   }
});

mp.events.add({
   render: () => {
	   if (!logueado) return;
	   for (let p_id in mp.pickups._pickups) {
		   let obj_id = mp.pickups._pickups[p_id].objeto_id;
		   let obj = mp.objects.at(obj_id) || null;
		   if (!obj) continue;
		   if (calcDist(obj.position, player_local.position) > 100) continue;

		   if (obj.pickup) {
			   obj.setCollision(false, false);
		   
			   let rot = obj.getRotation(2);
			   let pos = obj.position;
   
			   obj.setRotation(rot.x, rot.y, rot.z + 0.5, 2, true);

			   let l = obj.pickup.rgbls;
			   mp.game.graphics.drawLightWithRangeAndShadow(pos.x, pos.y, pos.z, l[0], l[1], l[2], obj.pickup.rango, l[3], l[4]);
		   }
	   }
   },
   playerEnterColshape: (colshape) => {
	   if (!mp.colshapes.exists(colshape)) return;
	   
	   if (colshapesNavidadAviso.hasOwnProperty(colshape.id)) {
		   mostrarAviso("info", 12000, "Parece que cerca de tu posición se esconde algo... ¿Qué será?");
		   return;
	   }
	   if (!player_local.vehicle && mp.pickups._colshapes.hasOwnProperty(colshape.id)) {
		   mp.events.callRemote("pickups:entrar", mp.pickups._colshapes[colshape.id]);

		   let id = mp.pickups._colshapes[colshape.id];
		   delete mp.pickups._colshapes[colshape.id];

		   if (mp.colshapes.exists(colshape)) {
			   colshape.destroy();
			   colshape = null;
		   }

		   let o_id = mp.pickups._pickups[id].objeto_id;
		   if (!mp.objects.exists(o_id)) return;

		   let o = mp.objects.at(o_id);
		   let rgbls0 = Object.assign({}, o.pickup.rgbls);

		   o.pickup.rgbls.splice(3,2);
		   o.pickup.rgbls.push(0.5, 30.0);

		   o.destroy();
		   let p = Object.assign({}, o.pickup);
		   let o_aux = mp.objects.new(p.modelo, p.posicion, { dimension: p.dimension, alpha: 50 });
		   let o_aux_id = o_aux.id;
		   o_aux.pickup = p;

		   let tl = null;
		   if (o.pickup.tipo == "NAVIDAD_REGALO") {
			   tl = mp.labels.new("~r~Ya has obtenido este regalo", o_aux.position, { los: true, font: 6, drawDistance: 1.0, color: [255, 255, 255, 255], dimension: o_aux.dimension });

			   for (let cid in colshapesNavidadAviso) {
				   if (colshapesNavidadAviso[cid] == id) {
					   let ca = mp.colshapes.at(cid);
					   if (ca && mp.colshapes.exists(ca)) {
						   ca.destroy();
						   ca = null;
					   }
				   }
			   }
		   }

		   if (tl) {
			   if (mp.labels.exists(tl))
				   o_aux.label = tl;
		   }

		   if (p.tipo == "PURGA") return;

		   if (p.tiempoAparicion > 0) {
			   crearTimeout(() => {
				   o_aux = o_aux || mp.objects.at(o_aux_id);
				   if (!o_aux) return;

				   if (mp.objects.exists(o_aux))
					   o_aux.destroy();

				   let o_nuevo = mp.objects.new(p.modelo, p.posicion, { dimension: p.dimension });
				   p.objeto_id = o_nuevo.id;
				   o_nuevo.pickup = p;
				   if (tl) {
					   if (mp.labels.exists(tl))
						   o_nuevo.label = tl;
				   }
				   mp.pickups._pickups[id].rgbls = o_nuevo.pickup.rgbls = objectToArray(rgbls0);

				   let c = mp.colshapes.newSphere(o_nuevo.pickup.posicion.x, o_nuevo.pickup.posicion.y, o_nuevo.pickup.posicion.z, o_nuevo.pickup.rango, o_nuevo.pickup.dimension);
				   mp.pickups._colshapes[c.id] = id;

				   if (tl) {
					   if (mp.labels.exists(tl))
						   tl.destroy();
					   tl = null;
				   }
			   }, p.tiempoAparicion*1000);
		   }
	   }
   }
});

function objectToArray(object) {
	let r = [];
	if (!object) return r;
	for (let i in object) {
	   r.push(object[i]);
	}
	return r;
}
}