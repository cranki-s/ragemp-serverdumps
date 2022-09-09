{
let idCategorias = [];

let menu_vehiculo_trabajos = null;
let menu_categorias_trabajos = null;

let floodMenu = 0;
let contadorHits = 0;

mp.events.add("lista_categorias_trabajo", (arrayModelos) => {
    arrayModelos = JSON.parse(arrayModelos);
    menu_categorias_trabajos = crearMenu("Vehículo", "Vehículos del trabajo");
    idCategorias = [];
    for(let i = 0; i < arrayModelos.length; i++) {
        // Obtenemos los datos
        let modelo = arrayModelos[i];
        // Agregamos el botón al menú
        menu_categorias_trabajos.AddItem(new UIMenuItem(modelo, ""));

        // Guardamos el ID del objeto para relacionarla con el nombre
        idCategorias.push(modelo);
    }


    menu_categorias_trabajos.ItemSelect.on((item, index) => {
        mp.events.callRemote("escoger_categoria_vehiculos_trabajo", idCategorias[index]);
        menu_categorias_trabajos?.Close();
    });

    menu_categorias_trabajos.MenuClose.on(() => {
        menu_categorias_trabajos = null;
    });
});

mp.events.add("lista_vehiculos_trabajo", (arrayVehiculos) => {
    arrayVehiculos = JSON.parse(arrayVehiculos);
    menu_vehiculo_trabajos = crearMenu("Vehículo", "Vehículos del trabajo");
    for(let i = 0; i < arrayVehiculos.length; i+=3) {
        // Obtenemos los datos
        let llave = arrayVehiculos[i];
        let activo = arrayVehiculos[i + 1];
        let matricula = arrayVehiculos[i + 2];
        // Agregamos el botón al menú
        let menuItem = new UIMenuItem(matricula.toString()+" "+"("+llave.toString()+")", "");
        if (activo == false)
                menuItem.SetRightLabel("~r~Desactivado");
            else
                menuItem.SetRightLabel("~g~Activado");
        menu_vehiculo_trabajos.AddItem(menuItem);
    }

    menu_vehiculo_trabajos.ItemSelect.on((item, index) => {
        // Si el usuario no tiene mejor idea que spamear las opciones de crear/destruir coches de facción entonces no podrá volver a usar el menú hasta reconectar
        if (contadorHits == 5) {
            mostrarAviso("danger", 6000, "No puedes usar el menú debido al número de intentos producidos en muy poco tiempo");
            return;
        }

        if (floodMenu == 0) {
            floodMenu = 1;
            crearTimeout(function () {
                floodMenu = 0;
            }, 1500);

            contadorHits = 0;

            let indice = index * 3;
            if (typeof arrayVehiculos[indice] === "number" && typeof arrayVehiculos[indice + 1] === "boolean") {
                let nuevoEstado = !arrayVehiculos[indice + 1];
                arrayVehiculos[indice + 1] = nuevoEstado;

                let nuevoTexto = nuevoEstado == true ? "~g~Activado" : "~r~Desactivado";
                item.SetRightLabel(nuevoTexto);

                mp.events.callRemote("escoger_vehiculo_trabajo", arrayVehiculos[indice]);
            }
            else {
                mostrarAviso("danger", 3000, "El vehículo seleccionado no existe");
            }
        }
        else {
            contadorHits++;
        }
    });

    menu_vehiculo_trabajos.MenuClose.on(() => {
        menu_vehiculo_trabajos = null;
    });
});

}