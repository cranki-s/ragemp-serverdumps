{
/* --------------------------------------------------------------------------------
 * estilosdecaminar.js
 *
 * Autor: FerniMoon
 *
 * Descripción: Menu de los estilos de caminar
 *
 * -------------------------------------------------------------------------------- */

let estiloDeCaminar = null;
var teclaControlDerechaPulsado = false;

function setWalkingStyle(player, style) {
    if (!style) {
        player.resetMovementClipset(0.0);
    } else {
        if (!mp.game.streaming.hasClipSetLoaded(style)) {
            let count = 0;
            mp.game.streaming.requestClipSet(style);
            while (!mp.game.streaming.hasClipSetLoaded(style)){ 
                count++;
                // Para protegernos en caso de cualquier fallo y asi no bloquear la ejecucion de todo el cliente
                if (count >= 1000){
                    logError("Estilo de caminar", "El estilo (" + style + ") no puede ser cargado");
                    return;
                }
                mp.game.wait(0);
            }
        }

        player.setMovementClipset(style, 0.0);
    }
}

// Funcion para cargar el walking style guardado localmente
function cargarEstiloDeCaminar(){
    let estiloCargado = null;
    if (mp.storage.data.personajes) {
        if (mp.storage.data.personajes[personaje_id]) {
            estiloCargado = mp.storage.data.personajes[personaje_id].estiloDeCaminar;

            // Si el estilo guardado no es valido forzamos que sea null
            if (typeof estiloCargado !== "string" && estiloCargado != null){
                estiloCargado = null;
                mp.storage.data.personajes[personaje_id].estiloDeCaminar = null;
            }
        }
        else {
            mp.storage.data.personajes[personaje_id] = { "tamanoChat": 12, "tiempoChat": 40, "textoCabeza": true, "textoObjetos": true, "tipoMapa": 0, "estiloDeCaminar": null, };
        }
    }
    else
    {
       mp.storage.data.personajes = { personaje_id };
       mp.storage.data.personajes[personaje_id] = { "tamanoChat": 12, "tiempoChat": 40, "textoCabeza": true, "textoObjetos": true, "tipoMapa": 0, "estiloDeCaminar": null, };
    }

    setWalkingStyle(player_local, estiloCargado);
}

// Funcion para guardar el walking style localmente
function guardarEstiloDeCaminar(estilo){
    // Si estilo no es string o null, forzamos valor por defecto
    if (typeof estilo !== "string" && estilo != null){
        estilo = null;
    }

    estiloDeCaminar = estilo;

    // Si existen datos de personajes
    if (mp.storage.data.personajes) {
        // Si existe el personaje actual lo guardamos, sino creamos el guardado de ese personaje
        if (mp.storage.data.personajes[personaje_id]) {
            mp.storage.data.personajes[personaje_id].estiloDeCaminar = estilo;
        }
        else {
            mp.storage.data.personajes[personaje_id] = { "tamanoChat": 12, "tiempoChat": 40, "textoCabeza": true, "textoObjetos": true, "tipoMapa": 0, "estiloDeCaminar": estilo, };
        }
    }
    else
    {
        // Si no existen datos de personajes los creamos solo con el personaje actual
        mp.storage.data.personajes = { personaje_id };
        mp.storage.data.personajes[personaje_id] = { "tamanoChat": 12, "tiempoChat": 40, "textoCabeza": true, "textoObjetos": true, "tipoMapa": 0, "estiloDeCaminar": estilo, };
    }
}

function mostrar_menu_categorias_estilos() {

    estilos = crearMenu("Estilos de caminar", "Estilos de caminar disponibles");

    estilos.AddItem(aplicarColores(new UIMenuItem("Por defecto", "Te aplica el estilo de caminar por defecto."), "Verde"));
    estilos.AddItem(new UIMenuItem("Casual", "Accedes a la categoria casual."));
    estilos.AddItem(new UIMenuItem("Tipo duro", "Accedes a la categoria tipo duro."));
    estilos.AddItem(new UIMenuItem("Pandillero", "Accedes a la categoria pandillero."));
    estilos.AddItem(new UIMenuItem("Ebriedad", "Accedes a la categoria ebriedad."));
    estilos.AddItem(new UIMenuItem("Estados", "Accedes a la categoria estados."));
    estilos.AddItem(new UIMenuItem("Con prisa", "Accedes a la categoria con prisa."));
    estilos.AddItem(new UIMenuItem("Varios", "Accedes a la categoria varios."));
    estilos.AddItem(new UIMenuItem("Femeninos", "Accedes a la categoria femeninos."));
    estilos.AddItem(new UIMenuItem("Cerrar", "Cierra el menu actual."));

    estilos.ItemSelect.on((item, index) => {

        switch (index) {
            case 0:
                estilos?.Close();
                guardarEstiloDeCaminar(null);
                setWalkingStyle(player_local);
                return;
            case 1:
                mostrar_menu_estilos_casual();
                break;
            case 2:
                mostrar_menu_estilos_tipoduro();
                break;
            case 3:
                mostrar_menu_estilos_pandillero();
                break;
            case 4:
                mostrar_menu_estilos_ebriedad();
                break;
            case 5:
                mostrar_menu_estilos_estados();
                break;
            case 6:
                mostrar_menu_estilos_conprisa();
                break;
            case 7:
                mostrar_menu_estilos_varios();
                break;
            case 8:
                mostrar_menu_estilos_femeninos();
                break;
            case 9:
                estilos?.Close();
                //CERRAR
                return;
        }
        estilos?.Close(true);
    });

    estilos.MenuClose.on(item => {
        estilos = null;
    });
}

function mostrar_menu_estilos_casual() {

    estilodecaminar_casual = crearMenu("Estilos de caminar", "Casual", true);
    estilodecaminar_casual.AddItem(new UIMenuItem("Trabajador", " "));
    estilodecaminar_casual.AddItem(new UIMenuItem("Atento", " "));
    estilodecaminar_casual.AddItem(new UIMenuItem("Fatigado", " "));
    estilodecaminar_casual.AddItem(new UIMenuItem("Moderno", " "));
    estilodecaminar_casual.AddItem(new UIMenuItem("Encorvado", " "));
    estilodecaminar_casual.AddItem(new UIMenuItem("Confidente", " "));
    estilodecaminar_casual.AddItem(new UIMenuItem("Hipster", " "));
    estilodecaminar_casual.AddItem(new UIMenuItem("Pícaro", " "));
    estilodecaminar_casual.AddItem(new UIMenuItem("Animado", " "));
    estilodecaminar_casual.AddItem(new UIMenuItem("Volver", "Vuelve al menu anterior."));

    estilodecaminar_casual.ItemSelect.on((item, index) => {

        switch (index) {
            case 0:
                guardarEstiloDeCaminar("move_m@tool_belt@a");
                break;
            case 1:
                guardarEstiloDeCaminar("move_m@casual@b");
                break;
            case 2:
                guardarEstiloDeCaminar("move_m@casual@c");
                break;
            case 3:
                guardarEstiloDeCaminar("move_m@casual@e");
                break;
            case 4:
                guardarEstiloDeCaminar("move_m@casual@f");
                break;
            case 5:
                guardarEstiloDeCaminar("move_m@confident");
                break;
            case 6:
                guardarEstiloDeCaminar("move_m@hipster@a");
                break;
            case 7:
                guardarEstiloDeCaminar("move_m@sassy");
                break;
            case 8:
                guardarEstiloDeCaminar("anim@move_m@grooving@");
                break;
            case 9:
                estilodecaminar_casual?.Close(true);
                break;             
        }
    });

    estilodecaminar_casual.MenuClose.on(item => {
        mostrar_menu_categorias_estilos();
        estilodecaminar_casual = null;
    });
}
function mostrar_menu_estilos_tipoduro() {

    estilodecaminar_tipoduro = crearMenu("Estilos de caminar", "Tipo duro", true);
    estilodecaminar_tipoduro.AddItem(new UIMenuItem("Bravo", " "));
    estilodecaminar_tipoduro.AddItem(new UIMenuItem("Valiente", " "));
    estilodecaminar_tipoduro.AddItem(new UIMenuItem("Agresivo", " "));
    estilodecaminar_tipoduro.AddItem(new UIMenuItem("Robusto", " "));
    estilodecaminar_tipoduro.AddItem(new UIMenuItem("Empresario", " "));
    estilodecaminar_tipoduro.AddItem(new UIMenuItem("Negociador", " "));
    estilodecaminar_tipoduro.AddItem(new UIMenuItem("Comerciante", " "));
    estilodecaminar_tipoduro.AddItem(new UIMenuItem("Elegante", " "));
    estilodecaminar_tipoduro.AddItem(new UIMenuItem("Adinerado", " "));
    estilodecaminar_tipoduro.AddItem(new UIMenuItem("Volver", "Vuelve al menu anterior."));

    estilodecaminar_tipoduro.ItemSelect.on((item, index) => {

        switch (index) {
            case 0:
                guardarEstiloDeCaminar("move_m@brave@a");
                break;
            case 1:
                guardarEstiloDeCaminar("move_m@brave@b");
                break;
            case 2:
                guardarEstiloDeCaminar("move_m@brave");
                break;
            case 3:
                guardarEstiloDeCaminar("move_m@tough_guy@");
                break;
            case 4:
                guardarEstiloDeCaminar("move_m@business@a");
                break;
            case 5:
                guardarEstiloDeCaminar("move_m@business@b");
                break;
            case 6:
                guardarEstiloDeCaminar("move_m@business@c");
                break;
            case 7:
                guardarEstiloDeCaminar("move_m@posh@");
                break;
            case 8:
                guardarEstiloDeCaminar("move_m@money");
                break;
            case 9:
                estilodecaminar_tipoduro?.Close(true);
                break;
        }
    });

    estilodecaminar_tipoduro.MenuClose.on(item => {
        mostrar_menu_categorias_estilos();
        estilodecaminar_tipoduro = null;
    });
}
function mostrar_menu_estilos_pandillero() {

    estilodecaminar_pandillero = crearMenu("Estilos de caminar", "Pandillero", true);
    estilodecaminar_pandillero.AddItem(new UIMenuItem("Gangster", " "));
    estilodecaminar_pandillero.AddItem(new UIMenuItem("Atrevido", " "));
    estilodecaminar_pandillero.AddItem(new UIMenuItem("Hood", " "));
    estilodecaminar_pandillero.AddItem(new UIMenuItem("Intimidador", " "));
    estilodecaminar_pandillero.AddItem(new UIMenuItem("Musculado", " "));
    estilodecaminar_pandillero.AddItem(new UIMenuItem("Chulesco", " "));
    estilodecaminar_pandillero.AddItem(new UIMenuItem("Lento", " "));
    estilodecaminar_pandillero.AddItem(new UIMenuItem("Volver", "Vuelve al menu anterior."));

    estilodecaminar_pandillero.ItemSelect.on((item, index) => {

        switch (index) {
            case 0:
                guardarEstiloDeCaminar("move_m@gangster@generic");
                break;
            case 1:
                guardarEstiloDeCaminar("move_m@gangster@ng");
                break;
            case 2:
                guardarEstiloDeCaminar("move_m@shadyped@a");
                break;
            case 3:
                guardarEstiloDeCaminar("move_m@intimidation@1h");
                break;
            case 4:
                guardarEstiloDeCaminar("move_m@muscle@a");
                break;
            case 5:
                guardarEstiloDeCaminar("move_m@casual@a");
                break;
            case 6:
                guardarEstiloDeCaminar("move_m@casual@d");
                break;
            case 7:
                estilodecaminar_pandillero?.Close(true);
                break;
        }
    });

    estilodecaminar_pandillero.MenuClose.on(item => {
        mostrar_menu_categorias_estilos();
        estilodecaminar_pandillero = null;
    });
}
function mostrar_menu_estilos_ebriedad() {

    estilodecaminar_ebriedad = crearMenu("Estilos de caminar", "Ebriedad", true);
    estilodecaminar_ebriedad.AddItem(new UIMenuItem("Mareado", " "));
    estilodecaminar_ebriedad.AddItem(new UIMenuItem("Borracho", " "));
    estilodecaminar_ebriedad.AddItem(new UIMenuItem("Afectado", " "));
    estilodecaminar_ebriedad.AddItem(new UIMenuItem("Aturdido", " "));
    estilodecaminar_ebriedad.AddItem(new UIMenuItem("Crítico", " "));
    estilodecaminar_ebriedad.AddItem(new UIMenuItem("Volver", "Vuelve al menu anterior."));

    estilodecaminar_ebriedad.ItemSelect.on((item, index) => {

        switch (index) {
            case 0:
                guardarEstiloDeCaminar("move_m@drunk@slightlydrunk");
                break;
            case 1:
                guardarEstiloDeCaminar("move_m@drunk@a");
                break;
            case 2:
                guardarEstiloDeCaminar("move_m@drunk@moderatedrunk_head_up");
                break;
            case 3:
                guardarEstiloDeCaminar("move_m@drunk@moderatedrunk");
                break;
            case 4:
                guardarEstiloDeCaminar("move_m@drunk@verydrunk");
                break;
            case 5:
                estilodecaminar_ebriedad?.Close(true);
                break;              
        }
    });

    estilodecaminar_ebriedad.MenuClose.on(item => {
        mostrar_menu_categorias_estilos();
        estilodecaminar_ebriedad = null;
    });
}
function mostrar_menu_estilos_estados() {

    estilodecaminar_estados = crearMenu("Estilos de caminar", "Estados", true);
    estilodecaminar_estados.AddItem(new UIMenuItem("Enfadado", " "));
    estilodecaminar_estados.AddItem(new UIMenuItem("Cansado", " "));
    estilodecaminar_estados.AddItem(new UIMenuItem("Agotado", " "));
    estilodecaminar_estados.AddItem(new UIMenuItem("Triste", " "));
    estilodecaminar_estados.AddItem(new UIMenuItem("Apenado", " "));
    estilodecaminar_estados.AddItem(new UIMenuItem("Trágico", " "));
    estilodecaminar_estados.AddItem(new UIMenuItem("Cabizbajo", " "));
    estilodecaminar_estados.AddItem(new UIMenuItem("Deprimido", " "));
    estilodecaminar_estados.AddItem(new UIMenuItem("Esposado", " "));
    estilodecaminar_estados.AddItem(new UIMenuItem("Volver", "Vuelve al menu anterior."));

    estilodecaminar_estados.ItemSelect.on((item, index) => {

        switch (index) {
            case 0:
                guardarEstiloDeCaminar("move_m@hurry_butch@b");
                break;
            case 1:
                guardarEstiloDeCaminar("move_m@hobo@a");
                break;
            case 2:
                guardarEstiloDeCaminar("move_m@hobo@b");
                break;
            case 3:
                guardarEstiloDeCaminar("move_m@sad@a");
                break;
            case 4:
                guardarEstiloDeCaminar("move_m@sad@b");
                break;
            case 5:
                guardarEstiloDeCaminar("move_m@sad@c");
                break;
            case 6:
                guardarEstiloDeCaminar("move_m@depressed@a");
                break;
            case 7:
                guardarEstiloDeCaminar("move_m@depressed@b");
                break;
            case 8:
                guardarEstiloDeCaminar("move_m@prisoner_cuffed");
                break;
            case 9:
                estilodecaminar_estados?.Close(true);
                break;
        }
    });

    estilodecaminar_estados.MenuClose.on(item => {
        mostrar_menu_categorias_estilos();
        estilodecaminar_estados = null;
    });
}
function mostrar_menu_estilos_conprisa() {

    estilodecaminar_conprisa = crearMenu("Estilos de caminar", "Con prisa", true);
    estilodecaminar_conprisa.AddItem(new UIMenuItem("Apurado", " "));
    estilodecaminar_conprisa.AddItem(new UIMenuItem("Apresurado", " "));
    estilodecaminar_conprisa.AddItem(new UIMenuItem("Escurridizo", " "));
    estilodecaminar_conprisa.AddItem(new UIMenuItem("Paranoico", " "));
    estilodecaminar_conprisa.AddItem(new UIMenuItem("Nervioso", " "));
    estilodecaminar_conprisa.AddItem(new UIMenuItem("Acelerado", " "));
    estilodecaminar_conprisa.AddItem(new UIMenuItem("Volver", "Vuelve al menu anterior."));

    estilodecaminar_conprisa.ItemSelect.on((item, index) => {

        switch (index) {
            case 0:
                guardarEstiloDeCaminar("move_m@hurry@a");
                break;
            case 1:
                guardarEstiloDeCaminar("move_m@hurry@b");
                break;
            case 2:
                guardarEstiloDeCaminar("move_m@hurry@c");
                break;
            case 3:
                guardarEstiloDeCaminar("move_m@hurry_butch@a");
                break;
            case 4:
                guardarEstiloDeCaminar("move_m@hurry_butch@c");
                break;
            case 5:
                guardarEstiloDeCaminar("move_m@quick");
                break;
            case 6:
                estilodecaminar_conprisa?.Close(true);
                break;                
        }
    });

    estilodecaminar_conprisa.MenuClose.on(item => {
        mostrar_menu_categorias_estilos();
        estilodecaminar_conprisa = null;
    });
}
function mostrar_menu_estilos_varios() {

    estilodecaminar_varios = crearMenu("Estilos de caminar", "Varios", true);
    estilodecaminar_varios.AddItem(new UIMenuItem("Vagabundo", " "));
    estilodecaminar_varios.AddItem(new UIMenuItem("Obeso", " "));
    estilodecaminar_varios.AddItem(new UIMenuItem("Inflado", " "));
    estilodecaminar_varios.AddItem(new UIMenuItem("Femenino", " "));
    estilodecaminar_varios.AddItem(new UIMenuItem("Bombero", " "));
    estilodecaminar_varios.AddItem(new UIMenuItem("Senderismo", " "));
    estilodecaminar_varios.AddItem(new UIMenuItem("Herido", " "));
    estilodecaminar_varios.AddItem(new UIMenuItem("Franklin", " "));
    estilodecaminar_varios.AddItem(new UIMenuItem("Trevor", " "));
    estilodecaminar_varios.AddItem(new UIMenuItem("Lamar", " "));

    estilodecaminar_varios.AddItem(new UIMenuItem("Volver", "Vuelve al menu anterior."));

    estilodecaminar_varios.ItemSelect.on((item, index) => {

        switch (index) {
            case 0:
                guardarEstiloDeCaminar("move_m@buzzed");
                break;
            case 1:
                guardarEstiloDeCaminar("move_m@fat@a");
                break;
            case 2:
                guardarEstiloDeCaminar("move_m@fat@bulky");
                break;
            case 3:
                guardarEstiloDeCaminar("move_m@femme@");
                break;
            case 4:
                guardarEstiloDeCaminar("move_m@fire");
                break;
            case 5:
                guardarEstiloDeCaminar("move_m@hiking");
                break;
            case 6:
                guardarEstiloDeCaminar("move_m@injured");
                break;
            case 7:
                guardarEstiloDeCaminar("move_p_m_one");
                break;
            case 8:
                guardarEstiloDeCaminar("move_p_m_two");
                break;
            case 9:
                guardarEstiloDeCaminar("anim_group_move_lemar_alley");
                break;
            case 10:
                estilodecaminar_varios?.Close(true);
                break;
        }
    });

    estilodecaminar_varios.MenuClose.on(item => {
        mostrar_menu_categorias_estilos();
        estilodecaminar_varios = null;
    });
}
function mostrar_menu_estilos_femeninos() {

    estilodecaminar_femeninos = crearMenu("Estilos de caminar", "Femeninos", true);
    estilodecaminar_femeninos.AddItem(new UIMenuItem("Orgullosa", " "));
    estilodecaminar_femeninos.AddItem(new UIMenuItem("Provocadora", " "));
    estilodecaminar_femeninos.AddItem(new UIMenuItem("Seria", " "));
    estilodecaminar_femeninos.AddItem(new UIMenuItem("Deprimida", " "));
    estilodecaminar_femeninos.AddItem(new UIMenuItem("Obesa", " "));
    estilodecaminar_femeninos.AddItem(new UIMenuItem("Femenina", " "));
    estilodecaminar_femeninos.AddItem(new UIMenuItem("Apurada", " "));
    estilodecaminar_femeninos.AddItem(new UIMenuItem("Apresurada", " "));
    estilodecaminar_femeninos.AddItem(new UIMenuItem("Escurridiza", " "));
    estilodecaminar_femeninos.AddItem(new UIMenuItem("Tranquila", " "));
    estilodecaminar_femeninos.AddItem(new UIMenuItem("Pandillera", " "));
    estilodecaminar_femeninos.AddItem(new UIMenuItem("Famosa", " "));
    estilodecaminar_femeninos.AddItem(new UIMenuItem("Tacones", " "));
    estilodecaminar_femeninos.AddItem(new UIMenuItem("Estrella", " "));
    estilodecaminar_femeninos.AddItem(new UIMenuItem("Senderista", " "));
    estilodecaminar_femeninos.AddItem(new UIMenuItem("Nerviosa", " "));
    estilodecaminar_femeninos.AddItem(new UIMenuItem("Paranóica", " "));
    estilodecaminar_femeninos.AddItem(new UIMenuItem("Herida", " "));
    estilodecaminar_femeninos.AddItem(new UIMenuItem("Sensual", " "));
    estilodecaminar_femeninos.AddItem(new UIMenuItem("Lujosa", " "));
    estilodecaminar_femeninos.AddItem(new UIMenuItem("Cabizbaja", " "));
    estilodecaminar_femeninos.AddItem(new UIMenuItem("Melancólica", " "));
    estilodecaminar_femeninos.AddItem(new UIMenuItem("Pícara", " "));
    estilodecaminar_femeninos.AddItem(new UIMenuItem("Trabajadora", " "));
    estilodecaminar_femeninos.AddItem(new UIMenuItem("Robusta", " "));
    estilodecaminar_femeninos.AddItem(new UIMenuItem("Volver", "Vuelve al menu anterior."));

    estilodecaminar_femeninos.ItemSelect.on((item, index) => {

        switch (index) {
            case 0:
                guardarEstiloDeCaminar("move_f@arrogant@a");
                break;
            case 1:
                guardarEstiloDeCaminar("move_f@chichi");
                break;
            case 2:
                guardarEstiloDeCaminar("move_f@chubby@a");
                break;
            case 3:
                guardarEstiloDeCaminar("move_f@depressed@a");
                break;
            case 4:
                guardarEstiloDeCaminar("move_f@fat@a");
                break;
            case 5:
                guardarEstiloDeCaminar("move_f@femme@");
                break;
            case 6:
                guardarEstiloDeCaminar("move_f@flee@a");
                break;
            case 7:
                guardarEstiloDeCaminar("move_f@flee@b");
                break;
            case 8:
                guardarEstiloDeCaminar("move_f@flee@c");
                break;
            case 9:
                guardarEstiloDeCaminar("move_f@flee@generic");
                break;
            case 10:
                guardarEstiloDeCaminar("move_f@gangster@ng");
                break;
            case 11:
                guardarEstiloDeCaminar("move_f@handbag");
                break;
            case 12:
                guardarEstiloDeCaminar("move_f@heels@c");
                break;
            case 13:
                guardarEstiloDeCaminar("move_f@heels@d");
                break;
            case 14:
                guardarEstiloDeCaminar("move_f@hiking");
                break;
            case 15:
                guardarEstiloDeCaminar("move_f@hurry@a");
                break;
            case 16:
                guardarEstiloDeCaminar("move_f@hurry@b");
                break;
            case 17:
                guardarEstiloDeCaminar("move_f@injured");
                break;
            case 18:
                guardarEstiloDeCaminar("move_f@maneater");
                break;
            case 19:
                guardarEstiloDeCaminar("move_f@posh@");
                break;
            case 20:
                guardarEstiloDeCaminar("move_f@sad@a");
                break;
            case 21:
                guardarEstiloDeCaminar("move_f@sad@b");
                break;
            case 22:
                guardarEstiloDeCaminar("move_f@sassy");
                break;
            case 23:
                guardarEstiloDeCaminar("move_f@tool_belt@a");
                break;
            case 24:
                guardarEstiloDeCaminar("move_f@tough_guy@");
                break;
            case 25:
                estilodecaminar_femeninos?.Close(true);
                break;
        }
    });

    estilodecaminar_femeninos.MenuClose.on(item => {
        mostrar_menu_categorias_estilos();
        estilodecaminar_femeninos = null;
    });
}


setInterval(() => {
    if (!logueado) return;
    if (teclaControlDerechaPulsado) return;

    let vida = player_local.getHealth();

    if (vida > 66) {
        if (estiloDeCaminar != null)
        setWalkingStyle(player_local, estiloDeCaminar);      
    }
}, 100)


}