var Restaurant = function(id, nombre, rubro, ubicacion, horarios, imagen, calificaciones,precioPorPersona) {
    this.id = id;
    this.nombre = nombre;
    this.rubro = rubro;
    this.ubicacion = ubicacion;
    this.horarios = horarios;
    this.imagen = imagen;
    this.calificaciones = calificaciones;
    this.precioPorPersona = precioPorPersona;
}

//Guia2 - PASO 1 COMPLETO - Refactoreada
Restaurant.prototype.reservarHorario = function(horarioReservado) {
    var nuevosHorarios = this.horarios.filter(function(horario){
                return horario !== horarioReservado;
    });
    //Cambio horarios del restaurant por nuevos horarios
    this.horarios = nuevosHorarios;
}

Restaurant.prototype.calificar = function(nuevaCalificacion) { //Corregido menor o igual a 10
    if (Number.isInteger(nuevaCalificacion) && nuevaCalificacion > 0 && nuevaCalificacion <= 10) {
        this.calificaciones.push(nuevaCalificacion);
    }
}

//Guia2 - PASO 2 COMPLETO - Refactoreada
Restaurant.prototype.obtenerPuntuacion = function() {
    if (this.calificaciones.length === 0) {
        return 0;}

    return Math.round(promedioDeArray(this.calificaciones)*10)/10;

/*if (this.calificaciones.length === 0) {
        return 0;
    } else {
        var sumatoria = 0;
        for (var i = 0; i < this.calificaciones.length; i++) {
            sumatoria += this.calificaciones[i]
        }
        var promedio = sumatoria / this.calificaciones.length;
        return Math.round(promedio * 10) / 10;
    }*/
}

     
var sumatoriaDeArray = function(arrayNumeros) {
   return arrayNumeros.reduce(function(acum, newValue){return acum + newValue;});
}

var promedioDeArray = function(array) {
    return sumatoriaDeArray(array)/array.length;
}