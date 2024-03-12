import fs from "fs";

const operacionesAsync = async () => {
  await fs.promises.writeFile("./ejemplo3.txt", "escribiendo con promesas");

  let content = await fs.promises.readFile("./ejemplo3.txt", "utf8");
  console.log(content);

  await fs.promises.appendFile("./ejemplo3.txt", "mas lineas");

  content = await fs.promises.readFile("./ejemplo3.txt", "utf8");
  console.log(content);

  await fs.promises.unlink("./ejemplo3.txt");
};

operacionesAsync();
