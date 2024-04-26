const ProductManager = require("./ProductManager.js");

const manager = new ProductManager();

const imgs = [
  "https://i5.walmartimages.com/seo/SteelSeries-Apex-9-Mini-60-Wired-OptiPoint-Adjustable-Actuation-Switch-Gaming-Keyboard-with-RGB-Lighting-Black_ffc8afc1-75c2-4729-a6df-a85317c48086.6af3be98478f401d40cd0119c2de69b3.jpeg",
  "https://megalamparas.com.gt/wp-content/uploads/2021/01/que-son-las-luces-led.jpg",
  "https://logitechar.vtexassets.com/arquivos/ids/158874/pro-wireless.png?v=637922945335770000",
  "https://d28hi93gr697ol.cloudfront.net/81bb5613-3d6b-d229-1ab9-afdadcbb8462/img/Producto/f177144d-fcd2-0573-1186-2ee1f2e12d92/SILLA-GAMER-AZUL-62f4404deaef7.jpeg",
  "https://www.blogdelfotografo.com/wp-content/uploads/2021/03/mega-guia-reflex-3.jpg",
];

(async () => {
  try {
    // Agregar productos
    await manager.addProduct("teclado Gamer", "con luces led", 3000, imgs[0], 1);
    await manager.addProduct("Teclado Gamer", "Teclado mecánico con luces LED", 3000, imgs[1], 10);
    await manager.addProduct("Mouse Gamer", "Mouse óptico con 6 botones programables", 1500, imgs[2], 20);
    await manager.addProduct("Silla Gamer", "Silla ergonómica para largas sesiones de juego", 5000, imgs[3], 5);

    // Obtener todos los productos
    const allProducts = await manager.getProducts();
    console.log("All products: ", allProducts);

    // Obtener un producto por su ID
    const productId = 3;
    const productById = await manager.getProductById(productId);
    console.log(`Product with ID ${productId}: `, productById);

    // Actualizar un producto
    const updatedProduct = await manager.updateProduct(3, "Cámara", "4K", 4000, imgs[4], 1);
    console.log("Updated product: ", updatedProduct);

    // Eliminar un producto
    const deletedProduct = await manager.deleteProduct(2);
    console.log("Deleted product: ", deletedProduct);
  } catch (error) {
    console.error(error);
  }
})();