// Función que devuelve una promesa
function ejemploPromesa() {
    return new Promise((resolve, reject) => {
      // Simular una operación asincrónica exitosa después de 1 segundo
      setTimeout(() => {
        const exito = true;
        if (exito) {
          resolve("Operación exitosa!"); // Resuelve la promesa con un mensaje de éxito
        } else {
          reject("Error: La operación falló."); // Rechaza la promesa con un mensaje de error
        }
      }, 1000);
    });
  }
  
  // Usar la promesa con then y catch
  ejemploPromesa()
    .then((result) => {
      console.log("Mensaje de éxito:", result); // Imprimir mensaje de éxito si la promesa se resuelve
    })
    .catch((err) => {
      console.error("Error:", err); // Manejar el error si la promesa es rechazada
    });
  