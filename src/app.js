const express = require("express");
const handlebars = require("express-handlebars");

const app = express();

// views/layouts/main.hablebars
// views/index.hablebars

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
// app.use(express.static(__dirname + "/public"));

app.get("/", (req,res)=>{
    res.render("index")
})

app.listen(8080, () => {
  console.log("listening to 8080");
});
