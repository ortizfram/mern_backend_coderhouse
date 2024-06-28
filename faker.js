/**
 * Desarrollaremos un servidor que pueda devolver los datos de prueba que necesitamos para poder presentarlos al equipo correspondiente, para ésto, tendremos que considerar los siguientes elementos:
Necesitaremos crear un modelo de productos de prueba para alimentar los usuarios de prueba.
Además, necesitaremos crear usuarios de prueba, cuyo carrito  corresponda a un arreglo alimentado por los productos mock creados previamente. 
Contaremos con un endpoint /api/users, el cual se encargará de devolver a los usuarios de prueba.

Además, tendremos una función “generateUsers” y una función “generateProducts”
----
Ahora la generación de usuarios necesita que se separen por roles, los posibles roles son:
cliente
vendedor
Un booleano que indique si el usuario es premium (no importando el rol)
El producto debe tener un campo “code” que sea alfanumérico
El producto debe contar con una breve descripción, ya sea por lorem o por producto.
El usuario debe mostrar su actual ocupación laboral.
 */const express = require('express');
const faker = require('faker');

const app = express();
const port = 3000;

// Generar productos de prueba
const generateProducts = (num) => {
  const products = [];
  for (let i = 0; i < num; i++) {
    products.push({
      id: faker.datatype.uuid(),
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      code: faker.random.alphaNumeric(10),
      description: faker.lorem.sentence(),
      imageUrl: faker.image.imageUrl(),
    });
  }
  return products;
};

// Generar usuarios de prueba
const generateUsers = (num, products) => {
  const roles = ['cliente', 'vendedor'];
  const users = [];
  for (let i = 0; i < num; i++) {
    const role = faker.random.arrayElement(roles);
    const isPremium = faker.datatype.boolean();
    users.push({
      id: faker.datatype.uuid(),
      name: faker.name.findName(),
      email: faker.internet.email(),
      role: role,
      isPremium: isPremium,
      occupation: faker.name.jobTitle(),
      cart: faker.helpers.shuffle(products).slice(0, Math.floor(Math.random() * products.length) + 1),
    });
  }
  return users;
};

// Crear productos de prueba
const products = generateProducts(10);

// Endpoint para devolver usuarios de prueba
app.get('/api/users', (req, res) => {
  const users = generateUsers(5, products);
  res.json(users);
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
