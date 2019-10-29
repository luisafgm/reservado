var expect = chai.expect;

describe('Test reservar un Horario', function(){
    //Elijo el primer Restaurant de la lista
    it('Dado un restaurante con el horario 11:00, al reservar ese horario, se elimina ese horario de su lista de horarios', function(){
        //Nuevo objeto restaurant creado que incluya 11:00 entre sus horarios
        var restaurant = new Restaurant(1, "Restaurant1", "Rubro1", "Ciudad1", ["11:00", "12:00", "22:30"], "imagen1", [5, 8, 4, 9, 9]);
        //Reservo el horario de 11:00
        restaurant.reservarHorario("11:00");
        expect(restaurant.horarios).to.be.an('array').that.does.not.include("11:00");
    })
	it('Dado un restaurante, al reservar un horario inexistente, se comprueba que los horarios permanezcan iguales', function(){
        //Nuevo objeto restaurant creado
        var restaurant = new Restaurant(1, "Restaurant1", "Rubro1", "Ciudad1", ["11:00", "12:00", "22:30"], "imagen1", [5, 8, 4, 9, 9]);
        //Reservo el horario de 15:00 que no existe
        restaurant.reservarHorario("15:00");
        expect(restaurant.horarios).to.have.members(["11:00", "12:00", "22:30"])
    })
    it('Dado un restaurante, al reservar sin pasar un parámetro, se comprueba que los horarios permanezcan iguales', function(){
        //Nuevo objeto restaurant creado
        var restaurant = new Restaurant(1, "Restaurant1", "Rubro1", "Ciudad1", ["11:00", "12:00", "22:30"], "imagen1", [5, 8, 4, 9, 9]);
        //Reservo el horario de 15:00 que no existe
        restaurant.reservarHorario();
        expect(restaurant.horarios).to.have.members(["11:00", "12:00", "22:30"])
    })
});

//***************************************************************************************/

//PASO 3: TESTEA obtenerPuntuación()
/*
    Restaurant.prototype.obtenerPuntuacion = function() {
        if (this.calificaciones.length === 0) {
            return 0;
        } else {
            var sumatoria = 0;
            for (var i = 0; i < this.calificaciones.length; i++) {
                sumatoria += this.calificaciones[i]
            }
            var promedio = sumatoria / this.calificaciones.length;
            return Math.round(promedio * 10) / 10;
        }
    }*/

describe('Test Obtener Puntuación de un Restaurant', function(){
    it('Dado un restaurante con una calificacion igual a 5, su puntuación promedio es 5', function() {
        //se crea explicitamente el/los objetos exclusivos para este caso
        var restaurant = new Restaurant(1, "Restaurant1", "Rubro1", "Ciudad1", ["11:00", "12:00", "22:30"], "imagen1", [5]);
        expect(restaurant.obtenerPuntuacion()).to.equal(5);
    })
    it('Dado un restaurante sin calificaciones, su puntuación promedio es 0 ', function() {
        //se crea explicitamente el/los objetos exclusivos para este caso
        var restaurant = new Restaurant(1, "Restaurant1", "Rubro1", "Ciudad1", ["11:00", "12:00", "22:30"], "imagen1", []);
        expect(restaurant.obtenerPuntuacion()).to.equal(0);
    })
    it('Dado un restaurante con una calificaciones 4,5 y 6; su puntuación promedio es 5', function() {
        //se crea explicitamente el/los objetos exclusivos para este caso
        var restaurant = new Restaurant(1, "Restaurant1", "Rubro1", "Ciudad1", ["11:00", "12:00", "22:30"], "imagen1", [4,5,6]);
        expect(restaurant.obtenerPuntuacion()).to.equal(5);
    })
})

//***************************************************************************************/

//Paso 4: TESTEA la función calificar()
    /*
    Restaurant.prototype.calificar = function(nuevaCalificacion) {
    if (Number.isInteger(nuevaCalificacion) && nuevaCalificacion > 0 && nuevaCalificacion < 10) {
        this.calificaciones.push(nuevaCalificacion);
        }
    } */

describe('Test de puntuar un Restaurant', function(){
    it('Dado un restaurant con 2 calificaciones, al agregrar una calificación válida, se agrega correctamente', function() {
        var restaurant = new Restaurant(1, "Restaurant1", "Rubro1", "Ciudad1", ["11:00", "12:00", "22:30"], "imagen1", [1, 4]);
        restaurant.calificar(9);
        expect(restaurant.calificaciones).to.eql([1,4,9]);
    })
    it('Dado un restaurant con 2 calificaciones, al agregrar una calificación string "8", NO se agrega a la lista', function() {
        var restaurant = new Restaurant(1, "Restaurant1", "Rubro1", "Ciudad1", ["11:00", "12:00", "22:30"], "imagen1", [1, 4]);
        restaurant.calificar("8");
        expect(restaurant.calificaciones).to.eql([1,4]);
    })
    it('Dado un restaurant con 2 calificaciones, al agregrar una calificación igual a 0, NO se agrega a la lista', function() {
        var restaurant = new Restaurant(1, "Restaurant1", "Rubro1", "Ciudad1", ["11:00", "12:00", "22:30"], "imagen1", [1, 4]);
        restaurant.calificar(0);
        expect(restaurant.calificaciones).to.eql([1,4]);
    })
    it('Dado un restaurant con 2 calificaciones, al agregrar una calificación igual a -6, NO se agrega a la lista', function() {
        var restaurant = new Restaurant(1, "Restaurant1", "Rubro1", "Ciudad1", ["11:00", "12:00", "22:30"], "imagen1", [1, 4]);
        restaurant.calificar(-6);
        expect(restaurant.calificaciones).to.eql([1,4]);
    })
    it('Dado un restaurant con 2 calificaciones, al agregrar una calificación igual a 15, NO se agrega a la lista', function() {
        var restaurant = new Restaurant(1, "Restaurant1", "Rubro1", "Ciudad1", ["11:00", "12:00", "22:30"], "imagen1", [1, 4]);
        restaurant.calificar(15);
        expect(restaurant.calificaciones).to.eql([1,4]);
    })
    it('Dado un restaurant con 2 calificaciones, al agregrar una calificación igual a 8.5, NO se agrega a la lista', function() {
        var restaurant = new Restaurant(1, "Restaurant1", "Rubro1", "Ciudad1", ["11:00", "12:00", "22:30"], "imagen1", [1, 4]);
        restaurant.calificar(8.5);
        expect(restaurant.calificaciones).to.eql([1,4]);
    })
    it('Dado un restaurant con 2 calificaciones, al agregrar una calificación igual a 10, se agrega correctamente', function() {
        var restaurant = new Restaurant(1, "Restaurant1", "Rubro1", "Ciudad1", ["11:00", "12:00", "22:30"], "imagen1", [1, 4]);
        restaurant.calificar(10);
        expect(restaurant.calificaciones).to.eql([1,4,10]);
    })
});

//***************************************************************************************/

//Paso 5: TESTEA la función buscarRestaurante(id)
    /*
    Listado.prototype.buscarRestaurante = function(id) {
        for (var i = 0; i < this.restaurantes.length; i++) {
            if (this.restaurantes[i].id === id) {
                return this.restaurantes[i]
            }
        }
        return "No se ha encontrado ningún restaurant";
    }
    } */

describe('Test de buscar un restaurant por id', function(){
    var arrayRestaurantes = [
        new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5],1250),
        new Restaurant(2, "Mandarín Kitchen", "Asiática", "Londres", ["15:00", "14:30", "12:30"], "../img/asiatica2.jpg", [7, 7, 3, 9, 7],600),
        new Restaurant(3, "Burgermeister", "Hamburguesa", "Berlín", ["11:30", "12:00", "22:30"], "../img/hamburguesa4.jpg", [5, 8, 4, 9, 9],700),
        new Restaurant(4, "Bleecker Street Pizza", "Pizza", "Nueva York", ["12:00", "15:00", "17:30"], "../img/pizza2.jpg", [8, 9, 9, 4, 6, 7],250),
        new Restaurant(5, "Jolly", "Asiática", "Berlín", ["12:00", "13:30", "16:00"], "../img/asiatica3.jpg", [8, 3, 9, 5, 6, 7],300),
        ];
    var listadoTest = new Listado(arrayRestaurantes);

    it('Dado un listado de restaurantes, al buscar el restaurante con id 1, se obtiene el restaurante correcto', function() {
        var restaurant = listadoTest.buscarRestaurante(1)
        expect(restaurant.id).to.equal(1);
    })
    it('Dado un listado de restaurantes, al buscar el restaurante con id inexistente, se obtiene undefined', function() {
        var restaurant = listadoTest.buscarRestaurante(65)
        expect(restaurant.id).to.equal(undefined);
    })
    it('Dado un listado de restaurantes, al buscar el restaurante sin parámetro, se obtiene undefined', function() {
        var restaurant = listadoTest.buscarRestaurante()
        expect(restaurant.id).to.equal(undefined);
    })
});

//***************************************************************************************/

//Paso 6: TESTEA la función obtenerRestaurantes()
    /*
    Listado.prototype.obtenerRestaurantes = function(filtroRubro, filtroCiudad, filtroHorario) {
    var restaurantesFiltrados = this.restaurantes;
    if (filtroRubro !== null) {
        restaurantesFiltrados = restaurantesFiltrados.filter(restaurant => restaurant.rubro == filtroRubro);
    }

    if (filtroCiudad !== null) {
        restaurantesFiltrados = restaurantesFiltrados.filter(restaurant => restaurant.ubicacion == filtroCiudad);
    }

    if (filtroHorario !== null) {
        restaurantesFiltrados = restaurantesFiltrados.filter(function(res) {
            return res.horarios.some(horario => horario == filtroHorario);
        });
    }
    return restaurantesFiltrados;
    } */

describe('Test de funcion filtro de listado de restaurants', function(){
    var arrayRestaurantes = [
        new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5],1250),
        new Restaurant(2, "Mandarín Kitchen", "Asiática", "Londres", ["15:00", "14:30", "12:30"], "../img/asiatica2.jpg", [7, 7, 3, 9, 7],600),
        new Restaurant(3, "Burgermeister", "Hamburguesa", "Berlín", ["11:30", "12:00", "22:30"], "../img/hamburguesa4.jpg", [5, 8, 4, 9, 9],700),
        new Restaurant(4, "Bleecker Street Pizza", "Pizza", "Nueva York", ["12:00", "15:00", "17:30"], "../img/pizza2.jpg", [8, 9, 9, 4, 6, 7],250),
        new Restaurant(5, "Jolly", "Asiática", "Berlín", ["12:00", "13:30", "16:00"], "../img/asiatica3.jpg", [8, 3, 9, 5, 6, 7],300),
        ];
    var listadoTest = new Listado(arrayRestaurantes); 

    it('Dado un listado con 5 restaurantes, si no se aplica ningún filtro, se obtiene como resultado 5 restaurantes', function() {
        var restaurantesFiltrados = listadoTest.obtenerRestaurantes(null, null, null);
        expect(restaurantesFiltrados.length).to.equal(5);
    })
    it('Dado un listado con 5 restaurantes y tres de ellos asiáticos, si se aplica de filtro ("Asiática",null,null), se obtiene como resultado 3 restaurantes', function() {
        var restaurantesFiltrados = listadoTest.obtenerRestaurantes("Asiática",null,null);
        expect(restaurantesFiltrados.length).to.equal(3);
    })
    it('Dado un listado con 5 restaurantes y dos de ellos con ciudad Berlín, si se aplica de filtro (null,"Berlin",null), se obtiene como resultado 2 restaurantes', function() {
        var restaurantesFiltrados = listadoTest.obtenerRestaurantes(null,"Berlín",null);
        expect(restaurantesFiltrados.length).to.equal(2);
    })
    it('Dado un listado con 5 restaurantes y dos de ellos con horario 15:00, si se aplica de filtro (null,null,"15:00"), se obtiene como resultado 2 restaurantes', function() {
        var restaurantesFiltrados = listadoTest.obtenerRestaurantes(null,null,"15:00");
        expect(restaurantesFiltrados.length).to.equal(2);
    })
    it('Dado un listado con 5 restaurantes y uno de ellos con rubro "Asiática", ciudad "Berlín" y horario" 12:00", se obtiene como resultado 1 restaurant', function() {
        var restaurantesFiltrados = listadoTest.obtenerRestaurantes("Asiática","Berlín","12:00");
        expect(restaurantesFiltrados.length).to.equal(1);
    })
    });


    //Guia 3 Paso 1: Requerimientos en pruebas unitarias
describe('Test de funcion de calculo de Precio Base de una Reserva', function(){
    it('Dado una una reserva con 8 personas, $350 por persona, el Precio base debe ser igual a 2800', function(){
        var reserva = new Reserva (new Date(2018, 7, 24, 11, 00), 8, 350, "DES1");
        var precioBaseManual = 8*350; //=2800
        expect(reserva.calcularPrecioBase()).to.eql(precioBaseManual);
    })
    it('Dado una una reserva con 6 personas, $250 por persona, el Precio base debe ser igual a 1500', function(){
        var reserva = new Reserva (new Date(2018, 7, 27, 14, 00), 6, 250, "DES200");
        var precioBaseManual = 6*250; //=1500
        expect(reserva.calcularPrecioBase()).to.eql(precioBaseManual);
    })
    it('Dado una una reserva con 0 personas, $200 por persona, el Precio base debe ser igual a 0', function(){
        var reserva = new Reserva (new Date(2018, 7, 27, 14, 00), 0, 200, "DES200");
        var precioBaseManual = 0*200; //=0
        expect(reserva.calcularPrecioBase()).to.eql(precioBaseManual);
    })
    it('Dado una una reserva con 5 personas, $0 por persona, el Precio base debe ser igual a 0', function(){
        var reserva = new Reserva (new Date(2018, 7, 27, 14, 00), 5, 0, "DES200");
        var precioBaseManual = 5*0; //=0
        expect(reserva.calcularPrecioBase()).to.eql(precioBaseManual);
    })
    });

describe('Test de funcion de calculo de Precio Final de una Reserva', function(){
    it('Dado una una reserva con 3 personas, a las 15:00, $350 por persona y con descuento de 1 persona, el Precio Final debe ser igual a 700', function(){
        var reserva = new Reserva (new Date(2019, 8, 4, 15, 00), 3, 350, "DES1");
        var precioFinalManual = Math.round((3*350)-350); //= 700
        expect(reserva.calcularPrecioTotal()).to.eql(precioFinalManual);
    })
    it('Dado una una reserva con 3 personas, a las 15:00, $350 por persona y con descuento de $200, el Precio Final debe ser igual a 850', function(){
        var reserva = new Reserva (new Date(2019, 8, 4, 15, 00), 3, 350, "DES200");
        var precioFinalManual = Math.round((3*350)-200); //= 850
        expect(reserva.calcularPrecioTotal()).to.eql(precioFinalManual);
    })
    it('Dado una una reserva con 3 personas, a las 15:00, $350 por persona y con descuento del 15%, el Precio Final debe ser igual a 893', function(){
        var reserva =new Reserva (new Date(2019, 8, 4, 15, 00), 3, 350, "DES15");
        var precioFinalManual = Math.round((3*350)*0.85); //= 893 redondeado
        expect(reserva.calcularPrecioTotal()).to.eql(precioFinalManual);
    })
    it('Dado una una reserva con 4 personas, a las 15:00, $350 por persona y con descuento del 5% por ser grupo de 4-6 personas, el Precio Final debe ser igual a 1330', function(){
        var reserva = new Reserva (new Date(2019, 8, 4, 15, 00), 4, 350, null);
        var precioFinalManual = Math.round((4*350)*0.95); //= 1330
        expect(reserva.calcularPrecioTotal()).to.eql(precioFinalManual);
    })
    it('Dado una una reserva con 7 personas, a las 15:00, $350 por persona y con descuento del 10% por ser grupo de 7-8 personas, el Precio Final debe ser igual a 2205', function(){
        var reserva = new Reserva (new Date(2019, 8, 4, 15, 00), 7, 350, null);
        var precioFinalManual = Math.round((7*350)*0.90); //= 2205
        expect(reserva.calcularPrecioTotal()).to.eql(precioFinalManual);
    })
    it('Dado una una reserva con 9 personas, a las 15:00, $350 por persona y con descuento del 15% por ser grupo de >8 personas, el Precio Final debe ser igual a 2678', function(){
        var reserva = new Reserva (new Date(2019, 8, 4, 15, 00), 9, 350, null);
        var precioFinalManual = Math.round((9*350)*0.85); //= 2678 redondeado
        expect(reserva.calcularPrecioTotal()).to.eql(precioFinalManual);
    })
    it('Dado una una reserva con 3 personas, a las 13:00, $350 por persona y con adicional del 5% por ser en la franja de 13-14s, el Precio Final debe ser igual a 1103', function(){
        var reserva = new Reserva (new Date(2019, 8, 4, 13, 00), 3, 350, null);
        var precioFinalManual = Math.round((3*350)*1.05); //= 1103 redondeado
        expect(reserva.calcularPrecioTotal()).to.eql(precioFinalManual);
    })
    it('Dado una una reserva con 3 personas, a las 21:00, $350 por persona y con adicional del 5% por ser en la franja de 20-21s, el Precio Final debe ser igual a 1103', function(){
        var reserva = new Reserva (new Date(2019, 8, 4, 21, 00), 3, 350, null);
        var precioFinalManual = Math.round((3*350)*1.05); //= 1103 redondeado
        expect(reserva.calcularPrecioTotal()).to.eql(precioFinalManual);
    })
    it('Dado una una reserva con 3 personas, a las 15:00, $350 por persona y con adicional de 10% por fin de semana (Sábado 12 de Octubre de 2019), el Precio Final debe ser igual a 1155', function(){
        var reserva = new Reserva (new Date(2019, 9, 12, 15, 00), 3, 350, null);
        var precioFinalManual = Math.round((3*350)*1.10); //= 1155
        expect(reserva.calcularPrecioTotal()).to.eql(precioFinalManual);
    })
    it('Dado una una reserva con 5 personas, a las 13:00, $300 por persona y con codigo de descuento erróneo, el Precio Final debe ser igual a 1650', function(){
        var reserva = new Reserva (new Date(2019, 8, 7, 13, 00), 5, 300, "DESCUENTO200");
        //-5% por 5 personas, +5% por 13:00, +10% fin de semana.
        var precioFinalManual = Math.round((5*300)*1.10) //= 1650
        expect(reserva.calcularPrecioTotal()).to.eql(precioFinalManual);
    })
    it('Dado una una reserva con 6 personas, a las 13:00, $200 por persona, codigo de descuento de $200 y con adicional de 10% por fin de semana (Sábado 12 de Octubre de 2019), el Precio Final debe ser igual a 1120', function(){
        var reserva = new Reserva (new Date(2019, 9, 12, 13, 00), 6, 200, "DES200");
        //-5% por 6 personas, +5% por 13:00, +10% fin de semana, -200$ por código. Primero se aplican los % y luego el -$200
        var precioFinalManual = Math.round(((6*200)*1.10)-200); //= 1120
        expect(reserva.calcularPrecioTotal()).to.eql(precioFinalManual);
    })
    });

    describe('Test de validez de una reserva según su Fecha (debe ser posterior a new Date())', function(){
        it('Dada una Reserva con fecha de 2018, su propiedad validez debe ser "Expirada"', function(){
            var reserva18 = new Reserva (new Date(2018, 8, 4, 15, 00), 3, 350, "DES1");
            expect(reserva18.validez).to.eql("Expirada");
        })
        it('Dada una Reserva con fecha un minuto antes al momento actual, su propiedad validez debe ser "Expirada"', function(){
            var fechaActual = new Date();
            var MinutoActual = fechaActual.getMinutes();
            var fechaActualMenosUnMinuto = fechaActual.setMinutes(MinutoActual-1);
            var reserva = new Reserva (fechaActualMenosUnMinuto, 3, 350, "DES1");
            expect(reserva.validez).to.eql("Expirada");
        })
        it('Dada una Reserva con fecha un día despues al momento actual, su propiedad validez debe ser "Pendiente"', function(){
            var fechaActual = new Date();
            var diaActual = fechaActual.getDate();
            var fechaActualMasUnDia = fechaActual.setDate(diaActual+1);
            var reserva = new Reserva (fechaActualMasUnDia, 3, 350, "DES1");
            expect(reserva.validez).to.eql("Pendiente");
        })
    });