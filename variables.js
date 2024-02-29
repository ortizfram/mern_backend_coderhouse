//! Declaraciones
// var, let, const

//? scope de declaraciones
```
var:  es global
let y const:  son locales
```


//! Tipos de datos

//? primitive
let primitiveNumber = 10; // Number primitive variable
let primitiveString = "Hello, World!"; // String primitive variable
let primitiveBoolean = true; // Boolean primitive variable
let primitiveUndefined = undefined; // Undefined primitive variable
let primitiveNull = null; // Null primitive variable

//? object / complex
let objectArray = [1, 2, 3, 4]; // Array object variable
let objectDate = new Date(); // Date object variable
let objectRegExp = /pattern/; // Regular Expression object variable
const objectFunction = function () {
  return "Hello, World!";
}; // Function object variable

//! mutabilidad & inmutabilidad

//? inmutable
const nombre = "nombre1"
//nombre = "nombre2"  //error

//? mutable
var nombre1 = "Osvaldo"
nombre1 = "Enrique"
