// Import the MongoDB Node.js driver
const { MongoClient } = require("mongodb");

// Connection URI
const uri = "mongodb://localhost:27017";

// Database Name
const dbName = "colegio";

// Function to perform operations
async function main() {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB client
    await client.connect();
    console.log("Connected to the MongoDB database");

    // Get the database reference
    const db = client.db(dbName);

    // Insert clients
    const clients = require("./db.js");
    const newClients = [
      { nombre: "Pablo", edad: 25 },
      { nombre: "Juan", edad: 22 },
      { nombre: "Lucia", edad: 25 },
      { nombre: "Juan", edad: 29 },
      { nombre: "Fede", edad: 35 },
    ];

    // Insert many clients
    await db.collection("clientes").insertMany(clients.concat(newClients));
    console.log("Inserted 5 new clients");

    // all documents sorted by age descending
    const sortedClientsDescAge = await db
      .collection("clientes")
      .find()
      .sort({ edad: -1 })
      .toArray();
    console.log("sortedClientsDescAge", sortedClientsDescAge);

    //  youngest client
    const youngestClient = await db
      .collection("clientes")
      .aggregate([
        // 1 or + stages that process documents results
        // Sort documents by age in ascending order
        { $sort: { edad: 1 } },
        // Project the first document (youngest client)
        { $limit: 1 },
      ])
      .toArray();
    console.log("Youngest Client:", youngestClient);

    // second youngest client
    const secondYoungestClient = await db
      .collection("clientes")
      .aggregate([
        // Sort documents by age in ascending order
        { $sort: { edad: 1 } },
        // Skip the first document (youngest client)
        { $skip: 1 },
        // Project the second document (second youngest client)
        { $limit: 1 },
      ])
      .toArray();
    console.log("secondYoungest", secondYoungestClient);

    //   clientes llamados juan
    const juanClients = await db
      .collection("clientes")
      .find({ nombre: "Juan" })
      .toArray();
    console.log("Clientes llamados Juan:", juanClients);

    //   clientes llamados juan con 29 anios
    const juan29Clients = await db
      .collection("clientes")
      .find({ nombre: "Juan", edad: 29 })
      .toArray();
    console.log("Clientes llamados Juan con 29 años:", juan29Clients);

    //   clientes llamados juan o lucia
    const juanLuciaClients = await db
      .collection("clientes")
      .find({ nombre: { $in: ["Juan", "Lucia"] } })
      .toArray();
    console.log("Clientes llamados Juan o Lucia:", juanLuciaClients);

    //   clientes de mas de 25 anios
    const clientsOver25 = await db
      .collection("clientes")
      .find({ edad: { $gt: 25 } })
      .toArray();
    console.log("Clientes con más de 25 años:", clientsOver25);

    //   clientes de 25 anios o menos: less than / equal
    const clients25OrLess = await db
      .collection("clientes")
      .find({ edad: { $lte: 25 } })
      .toArray();
    console.log("Clientes con 25 años o menos:");
    console.log(clients25OrLess);

    // clientes no de 25
    const clientsNot25 = await db
      .collection("clientes")
      .find({ edad: { $ne: 25 } })
      .toArray();
    console.log("Clientes que NO tienen 25 años:", clientsNot25);

    // entre 26 y 35
    const clientsBetween26And35 = await db
      .collection("clientes")
      .find({ edad: { $gte: 26, $lte: 35 } })
      .toArray();
    console.log("Clientes entre 26 y 35 años:", clientsBetween26And35);

    // 13. Actualizar la edad de Fede a 36 años, listando y verificando que no aparezca en el último listado
    await db
      .collection("clientes")
      .updateOne({ nombre: "Fede" }, { $set: { edad: 36 } });
    const updatedFede = await db
      .collection("clientes")
      .findOne({ nombre: "Fede" });
    console.log("Fede actualizado:", updatedFede);

    // 14. Actualizar todas las edades de 25 años a 26 años, listando y verificando que aparezcan en el último listado
    await db
      .collection("clientes")
      .updateMany({ edad: 25 }, { $set: { edad: 26 } });
    const updatedClients25To26 = await db
      .collection("clientes")
      .find({ edad: 26 })
      .toArray();
    console.log("Clientes con edades actualizadas a 26 años:",updatedClients25To26);

    // 15. Borrar los clientes que se llamen 'Juan' y listar verificando el resultado
    await db.collection('clientes').deleteMany({ nombre: 'Juan' });
    const clientsWithoutJuan = await db.collection('clientes').find({ nombre: 'Juan' }).toArray();
    console.log('Clientes sin Juan:',clientsWithoutJuan);
    
    // 16. Eliminar además todos los documentos de estudiantes que hayan quedado con algún valor.
    await db.collection('estudiantes').deleteMany({});
    console.log('Todos los documentos de estudiantes han sido eliminados');

  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Close the MongoDB connection
    await client.close();
    console.log("Disconnected from the MongoDB database");
  }
}

// Call the main function
main();
