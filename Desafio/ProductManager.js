class ProductManager {
  #products;
  static idProducto = 0

  constructor() {
    this.#products = [];
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    // validar todos campos obligatorios
    if (!title || !description || !price || !thumbnail || !code || !stock)
      return "Todos los parametros son requeridos";

    // validar code no se repite
    if (this.#products.find((p) => p.code === code))
      return `Product 'code':${code} for ${title} already exists`;

      
    //id ++
    const id = ProductManager.idProducto +=1
    //crear producto
    const nuevoProducto = {
      id:id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    }
    // agregar
    this.#products.push(nuevoProducto)

    return 'Product added successfully'
  }

  getProducts() {
    //devolver arreglo
    return this.#products;
  }

  getProductById(id) {
    const productFound = this.#products.find((product) => product.id === id);

    if (!productFound) return "Product Not found";

    return productFound;
  }
}

module.exports = ProductManager;
