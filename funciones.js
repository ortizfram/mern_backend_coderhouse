function saludar() {
  console.log("\nfuncion\n");
}
saludar();

// Funcion lambda
const saludar2 = () => {
  console.log("Funcion lambda");

  return "retorno not undefined\n";
};
console.log(saludar2());

// funcion con parametro
const suma = (valor1, valor2) => {
    console.log(`\nfuncion con parametro: suma ${valor1} y ${valor2}=`)
    let suma = valor1 + valor2
  return `${suma}\n`;
};
console.log(suma(5,8));

// funcion 1 linea simplificada
console.log("\nfuncion 1 linea simplificada")
const suma2 = (valor1, valor2) => valor1 + valor2
console.log(suma2(5,5))
