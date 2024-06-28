const TDDLogin = ({ user, password }) => {
    /**
     * Una función de login (con usuarios hardcodeados user = coderUser , password = 123)
     * Si se pasa un password vacío, la función debe consologuear (“No se ha proporcionado un password”)
     * Si se pasa un usuario vacío, la función debe consologuear (“No se ha proporcionado un usuario”)
     * Si se pasa un password incorrecto, consologuear (“Contraseña incorrecta”)
     * Si se pasa un usuario incorrecto, consologuear (“Credenciales incorrectas”)
     * Si el usuario y contraseña coinciden, consologuear (“logueado”)
     */
  console.log({user,password})
    if (!password || password === "") {
      console.log("No se ha proporcionado un password");
    }
    if (!user || user === "") {
      console.log("No se ha proporcionado un usuario");
    }
    if (user !== "coderUser") {
      console.log("Credenciales incorrectas");
    }
    if (password !== "123") {
      console.log("Contraseña incorrecta");
    }
    if (user === "coderUser" && password === "123") {
      console.log("logueado");
    }
  };
  
  // Pruebas manuales
  TDDLogin({ user: "", password: "123" }); // "No se ha proporcionado un usuario"
  TDDLogin({ user: "coderUser", password: "" }); // "No se ha proporcionado un password"
  TDDLogin({ user: "coderUser", password: "wrong" }); // "Contraseña incorrecta"
  TDDLogin({ user: "wrongUser", password: "123" }); // "Credenciales incorrectas"
  TDDLogin({ user: "coderUser", password: "123" }); // "logueado"
  