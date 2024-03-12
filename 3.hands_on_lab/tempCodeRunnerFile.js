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

    await fs.promises.readFile("./Usuarios.json", "utf8", (err, result) => {
      if (err) throw new Error("Error readind file!");

      return JSON.parse(result);
    });

    fs.unlinkSync("./Usuarios.json", (err) => {
      if (err) {
        throw new Error("Error deleting file");
      }
    });
  };
}

// ======================\USAGE/===========================
const manager = new ManagerDeUsuarios();
manager.crearUsuario("Franco", "Ortiz", 22, "Backend Node.js");
manager.crearUsuario("Juan", "Perez", 30, "Frontend React");
manager.crearUsuario("Maria", "Gonzalez", 25, "Fullstack Developer");

const usuarios = manager.consultarUsuarios();
console.log(usuarios);
