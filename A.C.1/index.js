// Import the MongoDB Node.js driver
const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017';

// Database Name
const dbName = 'colegio';

// Function to perform operations
async function main() {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB client
    await client.connect();
    console.log('Connected to the MongoDB database');

    // Get the database reference
    const db = client.db(dbName);

    // Insert students
    const students = [
      {
        nombre: "Juan",
        apellido: "Perez",
        curso: "10A",
        edad: 15,
        correo: "juan.perez@example.com",
        sexo: "H"
      },
      {
        nombre: "Maria",
        apellido: "Gomez",
        curso: "11B",
        edad: 16,
        correo: "maria.gomez@example.com",
        sexo: "M"
      },
      {
        nombre: "Carlos",
        apellido: "Lopez",
        curso: "9C",
        edad: 14,
        correo: "carlos.lopez@example.com",
        sexo: "H"
      },
      {
        nombre: "Ana",
        apellido: "Martinez",
        curso: "12A",
        edad: 17,
        correo: "ana.martinez@example.com",
        sexo: "M"
      },
      {
        nombre: "Pedro",
        apellido: "Rodriguez",
        curso: "8B",
        edad: 13,
        correo: "pedro.rodriguez@example.com",
        sexo: "H"
      }
    ];

    // Insert many students
    await db.collection('estudiantes').insertMany(students);
    console.log('Inserted 5 students');

    // Insert one student with only name, lastname, and course
    await db.collection('estudiantes').insertOne({
      nombre: "Luis",
      apellido: "Gonzalez",
      curso: "11A"
    });
    console.log('Inserted 1 student with name, lastname, and course');

    // Find all students
    const allStudents = await db.collection('estudiantes').find({}).toArray();
    console.log('All Students:');
    console.log(allStudents);

    // Find male students
    const maleStudents = await db.collection('estudiantes').find({ sexo: 'H' }).toArray();
    console.log('Male Students:');
    console.log(maleStudents);

    // Count total documents
    const totalDocuments = await db.collection('estudiantes').countDocuments();
    console.log('Total Documents:', totalDocuments);

    // Count female students
    const femaleStudentsCount = await db.collection('estudiantes').countDocuments({ sexo: 'M' });
    console.log('Female Students Count:', femaleStudentsCount);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the MongoDB connection
    await client.close();
    console.log('Disconnected from the MongoDB database');
  }
}

// Call the main function
main();
