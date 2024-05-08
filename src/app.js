const express = require("express");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth/auth.routes.js");
const handlebars = require("express-handlebars");

const app = express();
app.use(express.json())

app.use(express.static(__dirname + "/public"));
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(cookieParser("secret")); //pass secret from .env
app.use("/", authRouter);

app.listen(8080, () => {
  console.log("listening to port 8080");
});
