const express = require("express");
const handlebars = require("express-handlebars");
// import routes
const indexRoutes = require("./routes/index.router.js");

const app = express();

// views/layouts/main.hablebars
// views/index.hablebars

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
// app.use(express.static(__dirname + "/public"));

// use Routes
app.use("/", indexRoutes);

app.listen(8080, () => {
  console.log("listening to 8080");
});
