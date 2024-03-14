import UserManager from "./UserManager.js";

const manager = new UserManager();
manager.crearUsuario("Franco", "Ortiz", "ortizfram", "mi_Contrasena")
  .then(() => {
    return manager.validarUsuario("ortizfram", "mi_Contrasena");
  })
  .then((result) => {
    console.log(result);
    return manager.validarUsuario("ortizfram", "no_Contrasena");
  })
  .then((result) => {
    console.log(result);
    return manager.validarUsuario("mal_username", "mi_Contrasena");
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });