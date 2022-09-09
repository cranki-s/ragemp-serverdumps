{
﻿/*
 * Descripcion: Contiene el menú de escenarios
 */

let escenarios = null;

// Evento menu
mp.events.add("mostrar_escenarios", function (args) {
    mostrar_escenarios();
});

// Funcion para mostrar el menu de escenarios
function mostrar_escenarios() {

    escenarios = crearMenu("Escenarios", "Escenarios disponibles");
    escenarios.AddItem(new UIMenuItem("Ninguno", "Para cualquier escenario que estuvieras realizando."));
    escenarios.AddItem(new UIMenuItem("Sujetar café", "El personaje se queda estático mientras sujeta un vaso de café"));
    escenarios.AddItem(new UIMenuItem("Fumar", "El personaje saca un cigarro y comienza a fumar"));
    escenarios.AddItem(new UIMenuItem("Mirar por los binoculares", "El personaje saca unos binoculares y comienza a observar a través de ellos"));
    escenarios.AddItem(new UIMenuItem("Pedir dinero", "El personaje saca un cartel para mendigar"));
    escenarios.AddItem(new UIMenuItem("Desplomarse", "El personaje cae desplomado al suelo"));
    escenarios.AddItem(new UIMenuItem("Cabizbajo", "El personaje se mantiene en pie con la cabeza mirando hacia el suelo"));
    escenarios.AddItem(new UIMenuItem("Limpiarse la cara", "El personaje se agacha y comienza a tomar agua para lavarse posteriormente la cara"));
    escenarios.AddItem(new UIMenuItem("Controlar el tráfico", "El personaje saca una señal luminosa y comienza a dirigir el tráfico"));
    escenarios.AddItem(new UIMenuItem("Aplauso", "El personaje comienza a aplaudir"));
    escenarios.AddItem(new UIMenuItem("Observar la carpeta", "El personaje saca una carpeta y comienza a observarla"));
    escenarios.AddItem(new UIMenuItem("Observar la carpeta 2", "El personaje saca una carpeta y comienza a observarla"));
    escenarios.AddItem(new UIMenuItem("Reparar la calzada", "El personaje saca un taladro y comienza a golpear el suelo"));
    escenarios.AddItem(new UIMenuItem("Manos en el holster", "El personaje se coloca las manos en el holster"));
    escenarios.AddItem(new UIMenuItem("Beber", "El personaje comienza a beber de la botella"));
    escenarios.AddItem(new UIMenuItem("Beber 2", "El personaje comienza a beber de la botella"));
    escenarios.AddItem(new UIMenuItem("Fumar droga", "El personaje saca un porro y comienza a fumárselo"));
    escenarios.AddItem(new UIMenuItem("Adicción", "El personaje se muestra nervioso debido a que necesita drogarse"));
    escenarios.AddItem(new UIMenuItem("Grabarse con el móvil", "El personaje saca el móvil y comienza a grabarse"));
    escenarios.AddItem(new UIMenuItem("Soplar las hojas", "El personaje saca un soplahojas y comienza a retirar las hojas del suelo"));
    escenarios.AddItem(new UIMenuItem("Plantar", "El personaje comienza a plantar semillas en la tierra"));
    escenarios.AddItem(new UIMenuItem("Observar el horizonte", "El personaje se queda de pie observando el horizonte"));
    escenarios.AddItem(new UIMenuItem("Vigilar los alrededores", "El personaje comienza a vigilar por su entorno"));
    escenarios.AddItem(new UIMenuItem("Manos cruzadas", "El personaje se queda de pie con las manos cruzadas observando"));
    escenarios.AddItem(new UIMenuItem("Manos cruzadas 2", "El personaje se queda de pie con las manos cruzadas observando"));
    escenarios.AddItem(new UIMenuItem("Manos cruzadas 3", "El personaje se queda de pie con las manos cruzadas observando"));
    escenarios.AddItem(new UIMenuItem("De pie", "El personaje se queda de pie observando"));
    escenarios.AddItem(new UIMenuItem("Clavar un clavo", "El personaje saca un martillo y comienza a golpear una superficie"));
    escenarios.AddItem(new UIMenuItem("Contestar con gestos", "El personaje hace un gesto con la cabeza y los brazos para comunicarse con otra persona"));
    escenarios.AddItem(new UIMenuItem("Contestar con gestos 2", "El personaje hace un gesto con la cabeza y los brazos para comunicarse con otra persona"));
    escenarios.AddItem(new UIMenuItem("Cargar una mochila", "El personaje se coloca una mochila y carga con ella"));
    escenarios.AddItem(new UIMenuItem("Mimo", "El personaje simula a un mimo"));
    escenarios.AddItem(new UIMenuItem("Barrendero", "El personaje saca una escoba y se queda sujetándola"));
    escenarios.AddItem(new UIMenuItem("Trotar en el sitio", "El personaje comienza a trotar en el mismo sitio"));
    escenarios.AddItem(new UIMenuItem("El personaje descansa en el sitio", "El personaje tira una animación aleatoria y comienza a descansar en el sitio"));
    escenarios.AddItem(new UIMenuItem("Limpiar cristal", "El personaje comienza a limpiar los cristales (no aparece objeto)"));
    escenarios.AddItem(new UIMenuItem("Mostrar músculos", "El personaje comienza a mostar sus músculos"));
    escenarios.AddItem(new UIMenuItem("Hacer pesas", "El personaje saca una pesa y comienza a ejercitarse"));
    escenarios.AddItem(new UIMenuItem("Tocar instrumento", "El personaje saca un instrumento aleatorio y comienza a tocarlo"));
    escenarios.AddItem(new UIMenuItem("Sacar fotos", "El personaje saca una cámara y comienza a hacer fotos"));
    escenarios.AddItem(new UIMenuItem("Bailar bebiendo", "El personaje saca una cerveza y comienza a beber de ella mientra baila"));
    escenarios.AddItem(new UIMenuItem("Sentarse en el suelo", "El personaje se sienta en el suelo y se rasca la barbilla"));
    escenarios.AddItem(new UIMenuItem("Prostituta de alta clase", "El personaje simula a una prostituta de alta clase"));
    escenarios.AddItem(new UIMenuItem("Prostituta de baja clase", "El personaje simula a una prostituta de baja clase"));
    escenarios.AddItem(new UIMenuItem("Hacer flexiones", "El personaje comienza a hacer flexiones en el suelo"));
    escenarios.AddItem(new UIMenuItem("Sentarse en un muro", "El personaje simula sentarse sobre un muro"));
    escenarios.AddItem(new UIMenuItem("Sentarse en un muro 2", "El personaje simula sentarse sobre un muro mientras come"));
    escenarios.AddItem(new UIMenuItem("Sentarse en un muro 3", "El personaje simula sentarse sobre un muro poniendo un pie más alto que otro"));
    escenarios.AddItem(new UIMenuItem("Sentarse en un muro 4", "El personaje simula sentarse sobre un muro mientras mira hacia el suelo"));
    escenarios.AddItem(new UIMenuItem("Sentarse en un muro 5", "El personaje simula sentarse sobre un muro y se come una hamburguesa"));
    escenarios.AddItem(new UIMenuItem("Sentarse en un muro 6", "El personaje simula sentarse sobre un muro y mirar una tablet"));
    escenarios.AddItem(new UIMenuItem("Alumbrar con linterna", "El personaje saca una linterna y comienza a alumbrar con ella"));
    escenarios.AddItem(new UIMenuItem("Hacer abdominales", "El personaje comienza a hacer abdominales"));
    escenarios.AddItem(new UIMenuItem("Fumar", "El personaje saca un cigarro y comienza a fumar"));
    escenarios.AddItem(new UIMenuItem("Fumar elegante", "El personaje comienza a fumar de manera elegante"));
    escenarios.AddItem(new UIMenuItem("Fumar droga", "El personaje saca un porro y comienza a fumarselo"));
    escenarios.AddItem(new UIMenuItem("Fugar droga 2", "El personaje saca un porro y comienza a fumarselo"));
    escenarios.AddItem(new UIMenuItem("Calentarse con fuego", "El personaje simula colocar las manos sobre una hoguera y comienza a calentarse"));
    escenarios.AddItem(new UIMenuItem("Pescar", "El personaje saca una caña y comienza a pescar"));
    escenarios.AddItem(new UIMenuItem("Impaciente", "Muestras a tu personaje impaciente"));
    escenarios.AddItem(new UIMenuItem("Impaciente 2", "Muestras a tu personaje impaciente"));
    escenarios.AddItem(new UIMenuItem("Impaciente 3", "Muestras a tu personaje impaciente"));
    escenarios.AddItem(new UIMenuItem("Impaciente 4", "Muestras a tu personaje impaciente"));
    escenarios.AddItem(new UIMenuItem("Impaciente 5", "Muestras a tu personaje impaciente"));
    escenarios.AddItem(new UIMenuItem("Chatear con el móvil", "El personaje saca el teléfono y comienza a chatear"));
    escenarios.AddItem(new UIMenuItem("Chatear con el móvil 2", "El personaje saca el teléfono y comienza a chatear"));
    escenarios.AddItem(new UIMenuItem("Chatear con el móvil 3", "El personaje saca el teléfono y comienza a chatear"));
    escenarios.AddItem(new UIMenuItem("Chatear con el móvil 4", "El personaje saca el teléfono y comienza a chatear"));
    escenarios.AddItem(new UIMenuItem("Chatear con el móvil 5", "El personaje saca el teléfono y comienza a chatear"));
    escenarios.AddItem(new UIMenuItem("Chatear con el móvil 6", "El personaje saca el teléfono y comienza a chatear"));
    escenarios.AddItem(new UIMenuItem("Motivarse", "El personaje comienza a motivarse"));
    escenarios.AddItem(new UIMenuItem("Borracho ", "El personaje se tumba en el suelo mostrando embriaguez"));
    escenarios.AddItem(new UIMenuItem("Borracho 2", "El personaje se tumba en el suelo mostrando embriaguez y vomitando"));
    escenarios.AddItem(new UIMenuItem("Tomar el sol de espaldas", "El personaje se tumba boca abajo tomando el sol"));
    escenarios.AddItem(new UIMenuItem("Tomar el sol de frente", "El personaje se tumba boca arriba mirando el sol"));
    escenarios.AddItem(new UIMenuItem("Superhéroe", "El personaje simula a un superhéroe")); //Este no funciona
    escenarios.AddItem(new UIMenuItem("Nadar", "El personaje comienza a nadar")); //Este no funciona
    escenarios.AddItem(new UIMenuItem("Jugar al tenis", "El personaje saca una raqueta y comienza a entrenar"));
    escenarios.AddItem(new UIMenuItem("Observar mapa", "El personaje saca un mapa y comienza a observarlo"));
    escenarios.AddItem(new UIMenuItem("Observar móvil", "El personaje saca su móvil y comienza a buscar información en él"));
    escenarios.AddItem(new UIMenuItem("Reparar coche por debajo", "El personaje se coloca debajo del vehículo y comienza a repararlo"));
    escenarios.AddItem(new UIMenuItem("Soldar", "El personaje comienza a soldar"));
    escenarios.AddItem(new UIMenuItem("Buscar productos", "El personaje comienza a buscar un producto por un estante"));
    escenarios.AddItem(new UIMenuItem("Hacer yoga", "El personaje comienza a hacer yoga"));
    escenarios.AddItem(new UIMenuItem("Jabalí enloquecido", "Simulas ser un jabalí enloquecido"));  //Solo con animales
    escenarios.AddItem(new UIMenuItem("Gato durmiendo", "Simulas ser un gato durmiendo")); //Solo con animales
    escenarios.AddItem(new UIMenuItem("Gato durmiendo 2", "Simulas ser un gato durmiendo")); //Solo con animales
    escenarios.AddItem(new UIMenuItem("Vaca enloquecida", "Simulas ser una vaca enloquecida")); //Solo con animales
    escenarios.AddItem(new UIMenuItem("Aullido de coyote", "Auyas si eres un coyote")); //Solo con animales
    escenarios.AddItem(new UIMenuItem("Coyote descansando", "Descansas con el animal")); //Solo con animales
    escenarios.AddItem(new UIMenuItem("Coyote deambulando", "El coyote comienza a deambular por las calles")); //Solo con animales
    escenarios.AddItem(new UIMenuItem("Gallo comiendo", "La gallina comienza a comer")); //Solo con animales
    escenarios.AddItem(new UIMenuItem("Gallo de pie", "La gallina se mantiene de pie en el suelo")); //Solo con animales
    escenarios.AddItem(new UIMenuItem("Cormorán de pie", "El cormorán se mantiene de pie")); //Solo con animales
    escenarios.AddItem(new UIMenuItem("Cuervo comiendo", "El cuervo comienza a comer")); //Solo con animales
    escenarios.AddItem(new UIMenuItem("Cuervo de pie", "El cuervo se mantiene de pie")); //Solo con animales
    escenarios.AddItem(new UIMenuItem("Ciervo enloquecido", "El ciervo se muestra enloquecido")); //Solo con animales
    escenarios.AddItem(new UIMenuItem("Rottweiler ladrando", "El animal comienza a ladrar")); //Solo con animales
    escenarios.AddItem(new UIMenuItem("Retriever ladrando", "El animal comienza a ladrar")); //Solo con animales
    escenarios.AddItem(new UIMenuItem("Sheperd ladrando", "El animal comienza a ladrar")); //Solo con animales
    escenarios.AddItem(new UIMenuItem("Rottweiler sentado", "El animal permanece sentado")); //Solo con animales
    escenarios.AddItem(new UIMenuItem("Retriever sentado", "El animal permanece sentado")); //Solo con animales
    escenarios.AddItem(new UIMenuItem("Sheperd sentado", "El animal permanece sentado")); //Solo con animales
    escenarios.AddItem(new UIMenuItem("Perro pequeño ladrando", "El animal comienza a ladrar")); //Solo con animales
    escenarios.AddItem(new UIMenuItem("Perro pequeño sentado", "El animal permanece sentado")); //Solo con animales
    escenarios.AddItem(new UIMenuItem("Pez nadando", "El pez comienza a nadar")); //Solo con animales
    escenarios.AddItem(new UIMenuItem("Gaviota comiendo", "La gaviota comienza a comer")); //Solo con animales
    escenarios.AddItem(new UIMenuItem("Gaviota de pie", "La gaviota se mantiene de pie")); //Solo con animales
    escenarios.AddItem(new UIMenuItem("Gallina picoteando", "La gallina comienza a picotear")); //Solo con animales
    escenarios.AddItem(new UIMenuItem("Gallina de pie", "La gallina se mantiene de pie")); //Solo con animales
    escenarios.AddItem(new UIMenuItem("Puma descansando", "El puma se mantiene descansando")); //Solo con animales
    escenarios.AddItem(new UIMenuItem("Puma alerta", "El puma se mantiene alerta")); //Solo con animales
    escenarios.AddItem(new UIMenuItem("Cerdo comiendo", "El cerdo comienza a comer")); //Solo con animales
    escenarios.AddItem(new UIMenuItem("Paloma comiendo", "La paloma comienza a comer")); //Solo con animales
    escenarios.AddItem(new UIMenuItem("Paloma de pie", "La paloma se mantiene de pie en el suelo")); //Solo con animales
    escenarios.AddItem(new UIMenuItem("Conejo comiendo", "El conejo comienza a comer")); //Solo con animales
    escenarios.AddItem(new UIMenuItem("Rata comiendo", "La rata comienza a comer")); //Solo con animales
    escenarios.AddItem(new UIMenuItem("Tiburón nadando", "El tiburón comienza a nadar")); //Solo con animales (este no funciona)
    escenarios.AddItem(new UIMenuItem("Pájaro en el arbol", "El pájaro se mantiene sobre una rama"));  //Solo con animales (este no funciona)
    escenarios.AddItem(new UIMenuItem("Pájaro descansando", "El pájaro se mantiene descansando")); //Solo con animales 
    escenarios.AddItem(new UIMenuItem("Sacar dinero del cajero", "El personaje comienza a sacar dinero del cajero"));
    escenarios.AddItem(new UIMenuItem("Hacer una barbacoa", "El personaje saca una espátula y comienza a hacer una barbacoa"));
    escenarios.AddItem(new UIMenuItem("Recoger la basura", "El personaje comienza a recoger la basura"));
    escenarios.AddItem(new UIMenuItem("Apoyarse en el carrito de la compra", "El personaje se apoya sobre el carrito de la compra"));
    escenarios.AddItem(new UIMenuItem("Hacer Muscle Up", "El personaje comienza a hacer muscle ups"));
    escenarios.AddItem(new UIMenuItem("Hacer dominadas", "El personaje hace dominadas"));
    escenarios.AddItem(new UIMenuItem("Hacer muscle ups en prisión", "El personaje hace muscle ups dentro de prisión"));
    escenarios.AddItem(new UIMenuItem("Parquímetro", "El personaje mete unas monedas en el parquímetro"));
    escenarios.AddItem(new UIMenuItem("Sentarse en una silla de bar ", "El personaje se sienta en una silla alta de bar y mira hacia abajo"));
    escenarios.AddItem(new UIMenuItem("Sentarse en una silla de bar 2", "El personaje se sienta en una silla alta de bar y se apoya sobre la mesa"));
    escenarios.AddItem(new UIMenuItem("Sentarse en un banco", "El personaje se sienta en un banco"));
    escenarios.AddItem(new UIMenuItem("Sentarse en un banco 2", "El personaje se sienta en un banco"));
    escenarios.AddItem(new UIMenuItem("Sentarse en un banco mientras bebe", "El personaje se sienta en un banco mientras bebe"));
    escenarios.AddItem(new UIMenuItem("Sentarse en un banco mientras bebe 2", "El personaje se sienta en un banco mientras bebe"));
    escenarios.AddItem(new UIMenuItem("Sentarse en un banco mientras bebe cerveza", "El personaje se sienta en un banco mientras bebe cerveza"));
    escenarios.AddItem(new UIMenuItem("Sentarse en un banco mientras come", "El personaje se sienta en un banco mientras come"));
    escenarios.AddItem(new UIMenuItem("Sentarse en un banco mientras come 2", "El personaje se sienta en un banco mientras come"));
    escenarios.AddItem(new UIMenuItem("Esperar en la parada de bus", "El personaje se sienta sobre la parada de bus mientras espera"));
    escenarios.AddItem(new UIMenuItem("Sentarse sobre una silla", "El personaje se sienta sobre una silla"));
    escenarios.AddItem(new UIMenuItem("Sentarse en una silla mientras bebe café", "El personaje se sienta en la silla mientras bebe café"));
    escenarios.AddItem(new UIMenuItem("Sentarse en una silla mientras bebe cerveza", "El personaje se sienta en la silla mientras bebe cerveza"));
    escenarios.AddItem(new UIMenuItem("Sentarse en una silla mientras come", "El personaje se sienta en una silla mientras está comiendo"));
    escenarios.AddItem(new UIMenuItem("Sentarse sobre silla 2", "El personaje se sienta sobre una silla"));
    escenarios.AddItem(new UIMenuItem("Sentarse sobre silla 3", "El personaje se sienta sobre una silla")); //No funciona
    escenarios.AddItem(new UIMenuItem("Manejar el ordenador", "El personaje se sienta y maneja el ordenador")); //No funciona
    escenarios.AddItem(new UIMenuItem("Manejar el ordenador 2", "El personaje se sienta y maneja el ordenador")); //No Funciona
    escenarios.AddItem(new UIMenuItem("Sentarse en escritorio", "El personaje se sienta en la silla del escritorio de manera cómoda"));
    escenarios.AddItem(new UIMenuItem("Sentarse bebiendo", "El personaje se sienta en una silla del escritoria de manera cómoda y bebe de un vaso"));
    escenarios.AddItem(new UIMenuItem("Hacer pesas en una banca", "El personaje se tumba y comienza a hacer pesas"));
    escenarios.AddItem(new UIMenuItem("Hacer pesas en una banca 2", "El personaje se tumba y comienza a hacer pesas"));
    escenarios.AddItem(new UIMenuItem("Sentarse sobre un muro", "")); //No funciona
    escenarios.AddItem(new UIMenuItem("Sentarse sobre un muro 2", "El personaje se sienta sobre un muro y observa la situación"));
    escenarios.AddItem(new UIMenuItem("Tumbarse en la hamaca", "El personaje se tumba en la hamaca y toma el sol de frente"));
    escenarios.AddItem(new UIMenuItem("Esperar impacientemente", "El personaje se muestra impaciente"));
    escenarios.AddItem(new UIMenuItem("Acobardarse", "El personaje muestra miedo ante la situación y la intenta evitar"));
    escenarios.AddItem(new UIMenuItem("Cruzar la carretera", "El personaje mira a los lados para cruzar la carretera"));
    escenarios.AddItem(new UIMenuItem("Aparcacoches", "El personaje llama a los coches para que estacionen")); //No funciona
    escenarios.AddItem(new UIMenuItem("Bombilla", "")); //No funciona
    escenarios.AddItem(new UIMenuItem("Luz de estudio", "")); //No funciona
    escenarios.AddItem(new UIMenuItem("El médico se arrodilla", "El médico se arrodilla en el suelo y comienza a observar"));
    escenarios.AddItem(new UIMenuItem("El médico observa el cadaver", "El personaje se agacha y comienza a observar el cadaver"));
    escenarios.AddItem(new UIMenuItem("El médico anota la nota de muerte", "El médico saca una libreta y anota la hora de la muerte"));
    escenarios.AddItem(new UIMenuItem("Policia controla la multitud", "El policía comienza a controlar la multitud"));
    escenarios.AddItem(new UIMenuItem("Policia investigando", "El personaje comienza a observar la zona y a hablar por radio"));
    escenarios.AddItem(new UIMenuItem("Acobardado", "El personaje se queda de pie con miedo")); //No funciona
    escenarios.AddItem(new UIMenuItem("Mirar al frente", "El personaje mira al frente")); //No funciona
    escenarios.AddItem(new UIMenuItem("Beber litrona", "El personaje comienza a beber de pie de la litrona mientras observa el horizonte"));
    escenarios.AddItem(new UIMenuItem("Arar", "El personaje comienza a arar en el suelo con un rastrillo"));
    escenarios.AddItem(new UIMenuItem("Quitar hierba suelo", "Comienzas a quitar malas hierbas del suelo cansado, te arrodillas para ello"));
    escenarios.AddItem(new UIMenuItem("Manipular cocaína por la mesa", "Comienzas a mover la cocaína con una tarjeta para ordenar la droga"));
    escenarios.AddItem(new UIMenuItem("Manipular cogollo marihuana sentado", "Comienzas a manicurar con las manos el cogollo"));
    escenarios.AddItem(new UIMenuItem("Esperando inicio golf", "El personaje espera con su palo de golf, estático en el sitio"));
    escenarios.AddItem(new UIMenuItem("Cruzarse de manos segurata", "El personaje permanece estático con las manos cruzadas mirando"));
    escenarios.AddItem(new UIMenuItem("Agacharse e investigar", "El personaje se agacha para observar el suelo detenidamente"));
    escenarios.AddItem(new UIMenuItem("Inspeccionar el suelo de cuclillas", "El personaje comienza a inspeccionar el suelo de cuclillas"));
    escenarios.AddItem(new UIMenuItem("Apoyarse en pared", "El personaje se apoya en la pared esperando, mirando para los lados"));
    escenarios.AddItem(new UIMenuItem("Vigilar", "Comienzas a vigilar con tu personaje quieto en el sitio."));
    escenarios.AddItem(new UIMenuItem("Cerrar", "Cierra el menú actual"));

    escenarios.ItemSelect.on((item, index) => {
        if (item.Text != "Cerrar") {
            mp.events.callRemote("escoger_escenario", index);
        }

        escenarios?.Close();
    });

    escenarios.MenuClose.on(() => {
        escenarios = null;
    });
}

}