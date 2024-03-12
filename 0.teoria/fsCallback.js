import fs from "fs";

fs.writeFile("ejemplo2.txt", "Hola usando callback", (err) => {
  if (err) return console.log("Error al ecribir el archivo");

  fs.readFile("./ejemplo2.txt", "utf8", (err, result) => {
    if (err) return console.log("error al leer archivo!");
    console.log(result)

    fs.appendFile("./ejemplo2.txt", "otras lineas adheridas", (err, result) => {
      if (err) return console.log("error al agregar lineas");

      fs.readFile("./ejemplo2.txt", "utf8", (err, result) => {
        if (err) return console.log("error al eer archivo");

        console.log(result);

        fs.unlink("./ejemplo2.txt", (err) => {
          if (err) return console.log("error al borrar archivo");
        });
      });
    });
  });
});
