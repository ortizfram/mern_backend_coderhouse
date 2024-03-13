import ProductManager from "./ProductManager.js";

const manager = new ProductManager();

const imgs = [
  "https://i5.walmartimages.com/seo/SteelSeries-Apex-9-Mini-60-Wired-OptiPoint-Adjustable-Actuation-Switch-Gaming-Keyboard-with-RGB-Lighting-Black_ffc8afc1-75c2-4729-a6df-a85317c48086.6af3be98478f401d40cd0119c2de69b3.jpeg",
  "https://megalamparas.com.gt/wp-content/uploads/2021/01/que-son-las-luces-led.jpg",
  "https://logitechar.vtexassets.com/arquivos/ids/158874/pro-wireless.png?v=637922945335770000",
  "https://d28hi93gr697ol.cloudfront.net/81bb5613-3d6b-d229-1ab9-afdadcbb8462/img/Producto/f177144d-fcd2-0573-1186-2ee1f2e12d92/SILLA-GAMER-AZUL-62f4404deaef7.jpeg",
  "https://www.blogdelfotografo.com/wp-content/uploads/2021/03/mega-guia-reflex-3.jpg"
];

manager.addProduct("teclado Gamer", "con luces led", 3000, imgs[0], 1);
manager.addProduct(
  "Teclado Gamer",
  "Teclado mecánico con luces LED",
  3000,
  imgs[1],
  10
);
manager.addProduct(
  "Mouse Gamer",
  "Mouse óptico con 6 botones programables",
  1500,
  imgs[2],
  20
);
manager.addProduct(
  "Silla Gamer",
  "Silla ergonómica para largas sesiones de juego",
  5000,
  imgs[3],
  5
);

// get
manager
  .getProducts()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.error(err);
  });

// get(id)
manager
  .getProductById(3)
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.error(err);
  });

// update(id)
manager
  .updateProduct(3, "camara","4k", 4000,imgs[4],1)
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.error(err);
  });

// delete(id)
manager
  .deleteProduct(1)
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.error(err);
  });

  
