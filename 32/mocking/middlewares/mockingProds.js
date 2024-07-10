// middlewares/mockingProds.js
const { faker } = require('@faker-js/faker');

function mockProducts(req, res, next) {
  let products = [];
  let num = 1
  for (let i = 0; i < 100; i++) {
    products.push({
      id: faker.datatype.uuid(),
      num: num++,
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      category: faker.commerce.department(),
      image: faker.image.imageUrl()
    });
  }
  res.json(products);
}

module.exports = mockProducts;
