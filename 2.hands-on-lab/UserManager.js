// guarda usuarios en un archivo: fs
// contrasena: String hashearla con crypto
// - crearUsuario(nombre,apellido,nombre_de_usuario,contrasena)
//    guarda en Usuarios.json
// - validarUsuario(nombre_de_usuario,contrasena)
//   leer el json y hacer las comparaciones de contrasenas: ? Logueado : "User no existe" || "Contrasena no coincide"
import fs, { writeFileSync } from "fs";
import crypto from "crypto";

class UserManager {
  constructor() {
    this.usuarios = [];
    this.path = "Usuarios.json";
  }

  crearUsuario = async (nombre, apellido, nombre_de_usuario, contrasena) => {
    // Generar un ID autoincrementable
    const id = this.usuarios.length + 1;

    const hash = crypto.createHash("sha256").update(contrasena).digest("hex");

    const usuario = {
      id,
      nombre,
      apellido,
      nombre_de_usuario,
      contrasena: hash,
    };

    this.usuarios.push(usuario);
    console.log(this.usuarios);

    fs.writeFileSync(this.path, JSON.stringify(this.usuarios), (err) => {
      if (err) throw new Error("Error writing file Usuarios.json");
    });
    console.log("New user saved!");
  };

  validarUsuario = async (nombre_de_usuario, contrasena) => {
    if (!fs.existsSync(this.path)) throw new Error("file does not exist");
    try {
      const data = fs.readFileSync(this.path);
      const usuarios = JSON.parse(data);

      const usuario = usuarios.find(
        (user) => user.nombre_de_usuario === nombre_de_usuario
      );
      if (!usuario) console.error("usuario no existe");

      const hash = crypto.createHash("sha256").update(contrasena).digest("hex");
      const validPass = hash === usuario.contrasena;
      if (!validPass) console.error("Contrasena no coincide");
      return "Logueado";
    } catch (error) {
      throw new Error("Error reading file Usuarios.json");
    }
  };
}

export default UserManager;
