var Reserva = function(horario, cantPersonas, precioPorPersona,codigoDescuento,restaurantName) {
    this.horario = horario;
    this.comensales = cantPersonas;
    this.precioPorPersona = precioPorPersona;
    this.codigoDescuento = codigoDescuento;
    this.validez = this.comprobarValidez();
    this.nombreRestaurant = restaurantName;
}

Reserva.prototype.calcularPrecioBase = function(){
    return (this.comensales)*(this.precioPorPersona)
}

Reserva.prototype.calcularPrecioTotal = function(){
    return Math.round((this.calcularPrecioBase())+this.calcularAdicionales()-this.calcularDescuentos());
}

//CALCULAR ADICIONALES
Reserva.prototype.calcularAdicionales = function(){
    return this.calcularAdicionalPorHorario() + this.calcularAdicionalPorDia();
};

Reserva.prototype.calcularAdicionalPorHorario = function(){
    var montoAdicional;
    var precioBase = this.calcularPrecioBase();

    if ((this.horario.getHours() >=13) && (this.horario.getHours()<=14)) {
        montoAdicional = precioBase*0.05;
    } else if ((this.horario.getHours() >=20) && (this.horario.getHours()<=21)) {
        montoAdicional= precioBase*0.05;
    } else {
        montoAdicional = 0;
    }
    return montoAdicional;
};


Reserva.prototype.calcularAdicionalPorDia = function(){
    var precioBase = this.calcularPrecioBase();
    return (this.horario.getDay() >=4) ? precioBase*0.10 : 0;
};

//CALCULAR DESCUENTOS

Reserva.prototype.calcularDescuentos = function(){
    return this.calcularDescuentosCodigo() + this.calcularDescuentosLargeGroups();
};

Reserva.prototype.calcularDescuentosCodigo = function(){
    var montoDescuento;
    switch (this.codigoDescuento) {
       case "DES200":
            montoDescuento = 200;
            break;
        case "DES15":
            montoDescuento = this.calcularPrecioBase() * 0.15;
            break;
        case "DES1":
            montoDescuento = this.precioPorPersona;
            break;
       default:
            montoDescuento = 0;
           break;
   }
   return montoDescuento;
}

Reserva.prototype.calcularDescuentosLargeGroups = function(){
    var montoDescuento;
    var precioBase = this.calcularPrecioBase()

    if (this.comensales<4) {
        montoDescuento = 0;
    } else if ((this.comensales>=4) && (this.comensales<=6)) {
        montoDescuento= precioBase*0.05;
    } else if ((this.comensales>=7) && (this.comensales<=8)) {
        montoDescuento= precioBase*0.10;
    } else if (this.comensales>8){
        montoDescuento= precioBase*0.15;
    } else {
        montoDescuento = 0;
    }
    return montoDescuento;
}

Reserva.prototype.comprobarValidez = function(){
    var ahora = new Date();
    if (this.horario>ahora) {
        return "Pendiente";
    } else {
        return "Expirada";
    }
}