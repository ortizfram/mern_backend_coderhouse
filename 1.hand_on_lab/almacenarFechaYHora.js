import fs from "fs";

const storeFechaHora = () => {
  // crear archivo :
  // - escribe fecha y hora actual
  // - leer y mostrarlo
  // - usar modulo fs y callbacks

  const now = new Date().toString();
//   console.log(now)
  fs.writeFile("./today.txt", now, (err) => {
    if (err) return console.log("error writing file");

    fs.readFile("./today.txt", "utf8", (err, result) => {
      if (err) return console.log("error reading file");
      console.log(result);
    });

    fs.unlink("./today.txt", (err)=>{
        if(err) return console.log("err deleting file")
    })
  });
};

storeFechaHora();
