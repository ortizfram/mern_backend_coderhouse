/// Se crearán un conjunto de funciones gestionadas por promesas y un entorno ASÍNCRONO  donde podremos ponerlas a prueba
// @ Definir función suma:
// Debe devolver una promesa que se resuelva siempre que ninguno de los dos sumandos sea 0
// En caso de que algún sumando sea 0, rechazar la promesa indicando “Operación innecesaria”.
// En caso de que la suma sea negativa, rechazar la promesa indicando “La calculadora sólo debe devolver valores positivos
// @ Definir función resta:
// Debe devolver una promesa que se resuelva siempre que ninguno de los dos valores sea 0
// En caso de que el minuendo o sustraendo sea 0, rechazar la promesa indicando “Operación inválida
// En caso de que el valor de la resta sea menor que 0, rechazar la promesa indicando “La calculadora sólo puede devolver valores positivos”
// @ Definir una función multiplicación:
// Debe devolver una promesa que se resuelva siempre que ninguno de los dos factores sea negativo
// Si el producto es negativo, rechazar la oferta indicando “La calculadora sólo puede devolver valores positivos
// Definir la misma función división utilizada en esta clase.
// Definir una función asíncrona “cálculos”, y realizar pruebas utilizando async/await y try/catch

class Calculadora {
  async multiplicacion(valor1, valor2) {
    return new Promise((resolve, reject) => {
      if (valor1 == 0 || valor2 == 0) {
        return reject("ninguno de los dos factores sea negativo");
      } else {
        const producto = valor1 * valor2;
        if (producto < 0) {
          return reject("La calculadora sólo puede devolver valores positivos");
        } else {
          return resolve(producto);
        }
      }
    });
  }

  async suma(num1, num2) {
    return new Promise((resolve, reject) => {
      // devolver promesa siempre que 2 sumandos sean > 0
      if (num1 == 0 || num2 == 0) {
        return reject("''Operación innecesaria''");
      } else {
        const result = num1 + num2;
        if (result < 0) {
          return reject(
            "''La calculadora sólo debe devolver valores positivos''"
          );
        } else {
          return resolve(result);
        }
      }
    });
  }

  async resta(valor1, valor2) {
    return new Promise((resolve, reject) => {
      if (valor1 == 0 || valor2 == 0) {
        return reject("Operación inválida");
      } else {
        const result = valor1 - valor2;
        if (result < 0) {
          return reject("La calculadora sólo puede devolver valores positivos");
        } else {
          return resolve(result);
        }
      }
    });
  }
}

const calculadora = new Calculadora();

calculadora
  .multiplicacion(5, 0)
  .then((result) => console.log(result))
  .catch((err) => console.log(err));
  calculadora
  .multiplicacion(-2, 3)
  .then((result) => console.log(result))
  .catch((err) => console.log(err));
  
  // ------------------------
  // calculadora
  //   .suma(1, 0)
  //   .then((result) => console.log(result))
  //   .catch((error) => console.error(error));
  // calculadora
  //   .suma(-1, -1)
  //   .then((result) => console.log(result))
  //   .catch((error) => console.error(error));
  // calculadora
  //   .suma(1, 1)
  //   .then((result) => console.log(result))
  //   .catch((error) => console.error(error));
  
  // // ------------------------
  // calculadora
  //   .resta(5, 0) //invalida
  //   .then((result) => console.log(result))
  //   .catch((err) => console.log(err));
  // calculadora
  //   .resta(5, 10) // solo positivos
  //   .then((result) => console.log(result))
  //   .catch((err) => console.log(err));