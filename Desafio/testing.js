const ProductManager = require("./ProductManager")

const producto = new ProductManager()

console.log(producto.getProducts()) 
console.log(producto.getProductById(1))


const imgM = "https://elegifruta.com.ar/wp-content/uploads/2017/07/manzana_roja.jpg"
const imgP="https://test.jpg.com"
console.log(producto.addProduct('manzana','roja',300, imgM, 'sw71', 200))
console.log(producto.addProduct('pera','verde',100, imgP, 'sw71', 200))
console.log(producto.addProduct('pera','verde',100, imgP, 'sw72', 200))

console.log(producto.getProducts()) 
