const moment = require("moment") //^2.30.1

const hoy = moment()
const fechaNacimiento = moment('2001-07-04')

const validDate = fechaNacimiento.isValid()

// mostrar dias desde fechaN a fechaActual diff()
const diferencia = hoy.diff(fechaNacimiento, 'days')
console.log(`hay ${diferencia} dias entre tu fecha de nacimiento ${fechaNacimiento} y hoy ${hoy}`)

// cambiar version a 1.6.0 y nota cambios al correr