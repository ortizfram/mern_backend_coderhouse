//  LecturaYEscrituraDeArchivos
// Programa ejecutable bajo node.js
// - crear un archivo package.json desde terminal
// - leer archivo y generar objeto info
// - leer y mostrar objeto info
// - guardar obj en archivo info.json dentro de la misma carpeta
// - incluir manejo de errores con throw new Error
// - usar module promises de fs dfentro de 1 funcion async await y usar JSON.stringify + JSON.parse para hacer las transformaciones

const fs = require("fs");

const LecturaYEscrituraDeArchivos = async () => {
  try {
    if (!fs.existsSync("./package.json")) {
      throw new Error("File does not exist!");
    }

    const result = await fs.promises.readFile("./package.json", "utf8");
    console.log(result);

    // get size in bytes of file
    const stats = await fs.promises.stat("./package.json");

    // create info to be added
    const info = {
      contenidoStr: result,
      contenidoObj: JSON.parse(result),
      size: stats,
    };

    await fs.promises.writeFile("./info.json", JSON.stringify(info));

    const resultJson = await fs.promises.readFile("./info.json", "utf8");
    console.log("\n",resultJson);

    await fs.promises.unlink("./info.json");

    return resultJson;
  } catch (error) {
    throw new Error("Error processing file: " + error.message);
  }
};

LecturaYEscrituraDeArchivos()
  .then((result) => {
    console.log("Result:", result);
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });
