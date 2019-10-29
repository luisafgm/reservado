var Aplicacion = function(listado) {
        this.listado = listado;
        this.dibujarListado(listado.restaurantes)
        this.dibujarFiltros();
        this.registrarEventos();
        this.setearClickModal();
    }

//Array que guarda todas las Reservas
var arrayReservas = [];
var arrayCodigosDescuento= ["DES200","DES1","DES15"];

    //Esta función le asigna al botón "Buscar" la función filtrarRestaurantes()
Aplicacion.prototype.registrarEventos = function() {
    $(".buscar").click(this.filtrarRestaurantes.bind(this));
}

//Esta función llama a las funciones que se encargan de cargar las opciones de los filtros
Aplicacion.prototype.dibujarFiltros = function() {
    this.dibujarHorarios();
    this.dibujarRubros();
    this.dibujarCiudades();

}

//Función que se encarga de dibujar todos los restaurantes que recibe por parámetro. Cuando hablamos de dibujar, nos referimos a crear
//los elementos HTML que permiten visualizar el restaurante.
Aplicacion.prototype.dibujarListado = function(restaurantes) {
    var self = this;
    //Se borra el contenedor de restaurantes
    $(".flex").empty();
    var elementos = [];

    //Si no se recibe ningún restaurante por parámetro (porque los filtros aplicados no retornaron ningún resultado) se crea un elemento
    //que va a mostrar en el HTML el mensaje de "No se encontraron resultados".
    if (restaurantes.length === 0) {
        elementos.push($("<span/>").attr("class", "alerta").html("No se encontraron resultados"));
    } else {
        //Por cada erestaurante, se ejecuta la función crearTarjetaDeRestaurante()
        restaurantes.forEach(function(restaurant) {
            elementos.push(self.crearTarjetaDeRestaurante(restaurant));
        });
    }

    //Se agrega cada elemento al contenedor de restaurantes.
    elementos.forEach(function(elemento) {
        elemento.appendTo(".flex");
    })
}

//Función que se encarga de crear todos los elementos HTML necesarios para poder visualizar un restaurant
Aplicacion.prototype.crearTarjetaDeRestaurante = function(restaurant) {
    var self = this;
    // Creamos el elemento de restaurante, asignandole cada atributo del restaurant que corresponda
    var card = $(`
    <div class="flex-item" id=${restaurant.id}>
        <img class="imagen" src="${restaurant.imagen}">
        <div class="informacion">
            <div class="nombre-puntuacion-container">
                <h4 class="nombre">${restaurant.nombre}</h4>
                <div class="puntuacion-container">
                    <span class="puntuacion">${restaurant.obtenerPuntuacion()}</span>
                </div>
            </div>
            <div class="informacion-container">
                <span><i class="fas fa-map-marker-alt"></i></span>
                <span class="ubicacion">${restaurant.ubicacion}</span>
                <span><i class="fas fa-utensils"></i></span>
                <span class="rubro">${restaurant.rubro}</span>
                <span> <i class="fas fa-money-bill-wave"></i></span>
                <span class="rubro">$${restaurant.precioPorPersona}</span>
            </div>
        </div>
        <div class="reservas">
            <span class="reserva">¡Reserva tu lugar!</span>
            <div class="horarios-container">
            </div>
        </div>
    </div>
    `);

    //Buscamos el elemento que se corresponde con la puntuación y le registramos al evento click, la funcionalidad de calificar un restaurant
    card.find(".puntuacion").click(function() {
        self.calificarRestaurant(restaurant);
    });
    
    //Buscamos el contendor donde se van a cargar los horarios
    var contenedorHorarios = card.find(".horarios-container");

    //Por cada horario de un restaurant, creamos el elemento HTML que va a mostrarlo. Además le asignamos la funcionalidad de reservar un restaurant.
    restaurant.horarios.sort().forEach(function(horario) {
        var nuevoHorario = $("<span/>").attr("class", "horario").attr("restaurant", JSON.stringify(restaurant)).html(horario);
        nuevoHorario.click(function() {
            $('#exampleModal').modal('show');
            $("#confirmButton").attr("restaurant", JSON.stringify(restaurant)).attr("horario",horario);
        })
        nuevoHorario.appendTo(contenedorHorarios);
    });
    return card;
}

//Esta función muestra la alerta para dar la posibilidad de calificar un restaurant. La alerta que se utilizó es de la biblioteca "SweetAlert".
//En el caso de que la calificación sea válida, se ejecuta la función de calificarRestaurant() del listado. Luego, se busca en el HTML el restaurant que
//se corresponde con el id que se está calificando y se le actualiza la puntuación
Aplicacion.prototype.calificarRestaurant = function(restaurant) {
    var self = this;
    var nuevaCalificacion = parseInt(prompt("Por favor Ingrese una calificación entre 1 y 10"));
    
        if ((nuevaCalificacion >= 1) && (nuevaCalificacion <= 10)) {
            self.listado.calificarRestaurant(restaurant.id, nuevaCalificacion);
            var restaurantActualizar = $("#" + restaurant.id);
            restaurantActualizar.find(".puntuacion").html(restaurant.obtenerPuntuacion());
            swal({
                title: "Enviado!",
                text: "Gracias por calificar",
                icon: "success",
                button: "Continuar",
              });
        } else {
            swal({
                icon: 'error',
                title: '!Error!',
                text: 'Ingrese una calificación válida',
                button: "Continuar",
              });
        }
}

//Esta función se encarga de enviarle un mensaje al listado para que reserve un horario de un determinado restaurant
Aplicacion.prototype.reservarUnHorario = function(restaurant, horario) {
    //Elegir numero de personas
        //var cantPersonas = this.pedirCantPersonas();
        var cantPersonas = $("#personas-cant").val();

        if (!(cantPersonas>0 && cantPersonas<11)){
            alert("La cantidad de personas ingresada no es válida");
            return false;
        }

        //Elegir código de descuento
        //var codigoIngresado = this.pedirCodigo();
        var codigoIngresado = $("#codigo-desc").val();
        if (this.checkValidezCodigoDescuento(codigoIngresado)==0) {
            alert("El código ingresado es Incorrecto");
        }

    //Blank Form
    $("#codigo-desc").val("");
    $("#personas-cant").val("");
    
    //Procedo a sacar el horario de "listado" del restaurant correspondiente
    this.listado.reservarUnHorario(restaurant.id, horario)

    //Se obtiene elemento que se corresponde con el id del restaurante al que se va a reservar el horario
    var restaurantActualizar = $("#" + restaurant.id);
    //Se busca el elemento HTML que contiene el horario que se va a sacar
    var horarioASacar = restaurantActualizar.find("span:contains(" + horario + ")");
        //Se verifica si quedó algún horario disponible. En el caso de que no, se agrega el mensajde de "No hay mas horarios disponibles"
        var cantidadHorarios = restaurantActualizar.find(".horario").length;
        if (cantidadHorarios === 1) {
            restaurantActualizar.find(".reserva").html("No hay más mesas disponibles 😪");
        }

    horarioASacar.remove();

        var now = new Date()
        //Creo Reserva
        var newReservation = new Reserva (new Date(now.getFullYear(), now.getMonth(), now.getUTCDate(), horario.substring(0,2),horario.substring(3,5)), cantPersonas, restaurant.precioPorPersona,codigoIngresado,restaurant.nombre);
        //Lo agrego al array de reservas
        arrayReservas.push(newReservation);
        //Lo escribo en la tabla de reservas
        this.addReserva(newReservation);

        swal({
            icon: 'success',
            title: '!Felicitaciones!',
            text: 'Tu reserva está confirmada para las ' + horario + ' en ' + restaurant.nombre,
            button: "Ok",
          });
}

//Esta función se encarga de generar las opciones del filtro de las ciudades.
Aplicacion.prototype.dibujarCiudades = function() {
    $("#filtro-ciudad").empty();
    this.cargarOpcionDefault("filtro-ciudad", "Ciudad");
    this.cargarOpcionTodos("filtro-ciudad");

    this.listado.obtenerCiudades().forEach(function(ciudad) {
        var nuevaOpcion = $("<option/>").text(ciudad).val(ciudad);
        nuevaOpcion.appendTo("#filtro-ciudad");
    });
}

//Esta función se encarga de generar las opciones del filtro de rubros.
Aplicacion.prototype.dibujarRubros = function() {
    $("#filtro-rubro").empty();
    this.cargarOpcionDefault("filtro-rubro", "Rubro");
    this.cargarOpcionTodos("filtro-rubro")

    this.listado.obtenerRubros().forEach(function(rubro) {
        var nuevaOpcion = $("<option/>").text(rubro).val(rubro);
        nuevaOpcion.appendTo("#filtro-rubro");
    });

}

//Esta función se encarga de generar las opciones del filtro de horarios.
Aplicacion.prototype.dibujarHorarios = function() {
    $("#filtro-horario").empty();
    this.cargarOpcionDefault("filtro-horario", "Horario");
    this.cargarOpcionTodos("filtro-horario")

    this.listado.obtenerHorarios().forEach(function(horario) {
        var nuevaOpcion = $("<option/>").text(horario).val(horario);
        nuevaOpcion.appendTo("#filtro-horario");
    });
}

//Función que crea la opción default de los filtros
Aplicacion.prototype.cargarOpcionDefault = function(idFiltro, defecto) {
    var opcionDefault = $("<option/>").text(defecto).val(0).prop("disabled", true).prop("selected", true);
    opcionDefault.appendTo("#" + idFiltro);
}

//Función que crea la opción "Todos" de los filtros
Aplicacion.prototype.cargarOpcionTodos = function(idFiltro) {
    var opcionTodos = $("<option/>").text("Todos").val(1);
    opcionTodos.appendTo("#" + idFiltro);
}

//Función que se encarga de pedirle al listado que filtre los restaurantes y de actualizar el HTML con los resultados de la búsqueda.
//Las opciones "Default" y "Todos" de los filtros, tienen como propiedad val un 1 y un 0. En el caso de que el la propiedad val de alguno
//de los filtros sea 0 o 1, se envía como filtro el valor null, para que el listado sepa que no tiene que filtrar por ese campo.
Aplicacion.prototype.filtrarRestaurantes = function() {
    if ($("#filtro-rubro option:selected").val() === "1" || $("#filtro-rubro option:selected").val() === "0") {
        var filtroRubro = null;
    } else {
        var filtroRubro = $("#filtro-rubro option:selected").val();
    }

    if ($("#filtro-ciudad option:selected").val() === "1" || $("#filtro-ciudad option:selected").val() === "0") {
        var filtroCiudad = null;
    } else {
        var filtroCiudad = $("#filtro-ciudad option:selected").val();
    }

    if ($("#filtro-horario option:selected").val() === "1" || $("#filtro-horario option:selected").val() === "0") {
        var filtroHorario = null;
    } else {
        var filtroHorario = $("#filtro-horario option:selected").val();
    }

    var restaurantesFiltrados = this.listado.obtenerRestaurantes(filtroRubro, filtroCiudad, filtroHorario);
    this.dibujarListado(restaurantesFiltrados);
}


Aplicacion.prototype.prepararLineaReserva = function (reserva) {
    return (
      `<tr>` +
        `<td>${$('tbody tr').length + 1}</td>` +
        `<td>${reserva.nombreRestaurant}</td>` +
        `<td>${reserva.horario.toTimeString().slice(0,5) }</td>` +
        `<td>${reserva.precioPorPersona}</td>` +
        `<td>${reserva.calcularPrecioTotal()}</td>` +
        `<td>${reserva.comensales}</td>` +
        `<td>${reserva.validez}</td>` +
        `<td><button class="horario" horario="${reserva.horario.toTimeString().slice(0,5)}" name="${reserva.nombreRestaurant}">Cancelar</button></td>` +
      `</tr>`
    );
}

Aplicacion.prototype.addReserva = function (reserva) {
    //preparo linea de reserva para tabla
    const row = this.prepararLineaReserva(reserva);
    //agrego la linea de la tabla preparada al contenedor correspondiente
    $('#reservasFields').append(row);

    //Selecciono la nueva row de la tabla del DOM
    var rowAppended = $("button[horario='" + reserva.horario.toTimeString().slice(0,5) + "'][name='" + reserva.nombreRestaurant + "']");
    //le asigno el evento de borrado al botton final
    rowAppended.click(function () {
            arrayReservas.splice(arrayReservas.indexOf(reserva),1);
            //elimino al padre de su padre (la linea entera)
            $(this.parentNode.parentNode.remove());
        });
}



Aplicacion.prototype.pedirCodigo = function () {
    var codigoDescuento = prompt("Ingrese un código de descuento si posee:");
    if (this.checkValidezCodigoDescuento(codigoDescuento)) {
        return codigoDescuento;
    } else {
        return 0;
    }
}

Aplicacion.prototype.checkValidezCodigoDescuento = function (codigoprueba) {
    return arrayCodigosDescuento.find(function(codigoGuardado) {
                return codigoGuardado ==codigoprueba;}
                ) !== undefined ? true : false;
}


Aplicacion.prototype.pedirCantPersonas = function () {
    var cantPersonas = parseInt(prompt("Ingrese cantidad de personas de la reserva:"));
    if (cantPersonas>=1) {
        return cantPersonas
    } else {
        swal({
            title: "Error",
            text: "La cantidad de personas ingresada no es válida",
            icon: "error",
            button: "Continuar",
          });
        return 0;
    }
}


Aplicacion.prototype.setearClickModal = function () {
    $("#confirmButton").click(function(el) {
        var restaurant = JSON.parse(el.target.getAttribute("restaurant"));
        var horario = el.target.getAttribute("horario");
        $('#exampleModal').modal('hide');
        aplicacion.reservarUnHorario(restaurant,horario);
    });
}
//************************PRUEBAS *************************  NO ACTIVAS

Aplicacion.prototype.borrarReservaByClick = function (event,reserva) {
        self = this;
        //encuentro index de la reserva en arrayReservas
        console.log(arrayReservas);
        var indexInArray = arrayReservas.indexOf(reserva);
        //elimino el array con ese index
        arrayReservas.splice(indexInArray,1);
        console.log(arrayReservas);

        console.log(this); //devuelve aplicacion
        console.log(reserva); //devuelve reserva
        console.log($(event.target)); //devuelve evento de click
        //$(event.target.parentNode.parentNode.remove()); //borro toda loda la linea del DOM donde esta contenido el boton
        console.log($(event.target).parentNode);


        //aplicacion.actualizarIdDOM(); ********FUNCIONALIDAD ACTUALIZO ID DE LISTA DE RESERVAS DOM ************

        /* ********FUNCIONALIDAD VUELVO A AGREGAR HORARIO CANCELADO AL DOM EN PROCESO************
            //Vuelvo a agregar el boton de horario al restaurant
            var contenedorHorarios = $('#"'+reserva.id+'"');
            console.log(contenedorHorarios);
            var nuevoHorario = $("<span/>").attr("class", "horario").html(reserva.horario.toTimeString().slice(0,5));
                    nuevoHorario.click(function() {
                            self.reservarUnHorario(reserva.horario);
                      })
                nuevoHorario.appendTo(contenedorHorarios);
        */
}


var aplicacion = new Aplicacion(listado);


    
    