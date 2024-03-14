
manager.crearUsuario("Franco", "Ortiz", "ortizfram", "mi_Contrasena");

manager
  .validarUsuario("ortizfram", "mi_Contrasena")
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });

manager
  .validarUsuario("ortizfram", "no_Contrasena")
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });

manager
  .validarUsuario("mal_username", "mi_Contrasena")
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
