import fs from "fs";

class ManagerDeUsuarios {
  // gestiona usuarios usando fs.promises
  // - crearUsuario()
  //   recibe Nombre,Apellido,Edad,Curso
  //   guarda usuario en Usuarios.json dentro de un arreglo
  // - consultarUsuarios()
  //   leer archivo y devolver arreglo

  constructor() {
    this.usuarios = [];
  }

  crearUsuario(nombre, apellido, edad, curso) {
    // Generar un ID autoincrementable
    const id = this.usuarios.length + 1;

    const usuario = {
      id,
      nombre,
      apellido,
      edad,
      curso,
    };

    this.usuarios.push(usuario);

    fs.writeFileSync(
      "./Usuarios.json",
      JSON.stringify(this.usuarios),
      (err) => {
        if (err) throw new Error("Error writing file Usuarios.json");
      }
    );
  }

  consultarUsuarios = async () => {
    if (!fs.existsSync("./Usuarios.json"))
      throw new Error("Usuarios.json not found");

    try {
      const data = await fs.promises.readFile("./Usuarios.json", "utf8");
      const usuarios = JSON.parse(data);
      await fs.promises.unlink("./Usuarios.json");
      return usuarios;
    } catch (error) {
      throw new Error("Error reading file" + error.message);
    }
  };
}

// ======================\USAGE/===========================
const manager = new ManagerDeUsuarios();
manager.crearUsuario("Franco", "Ortiz", 22, "Backend Node.js");
manager.crearUsuario("Juan", "Perez", 30, "Frontend React");
manager.crearUsuario("Maria", "Gonzalez", 25, "Fullstack Developer");

// print async de promesa
manager
  .consultarUsuarios()
  .then((usuarios) => {
    console.log(usuarios);
  })
  .catch((error) => {
    console.error(error);
  });
