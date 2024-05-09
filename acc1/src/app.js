const express = require("express");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth/auth.routes.js");
const handlebars = require("express-handlebars");
const session = require("express-session");
const router = require("./routes/index/index.routes.js");

const app = express();
app.use(express.json())
app.use(session({
  secret:'secret',
  resave:true,
  saveUninitialized:true
}))

app.use(express.static(__dirname + "/public"));
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(cookieParser("secret")); //pass secret from .env
app.use("/", router);
app.use("/api/sessions", authRouter);

app.listen(8080, () => {
  console.log("listening to port 8080");
});
