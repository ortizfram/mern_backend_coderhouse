const express = require("express");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth/auth.routes.js");
const productsRouter = require("./routes/products/products.routes.js");
const handlebars = require("express-handlebars");
const session = require("express-session");
const router = require("./routes/index/index.routes.js");
const { default: mongoose } = require("mongoose");


const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(session({
  secret:'secret',
  resave:false,
  saveUninitialized:true,
  cookie:{secure:false}
}))
// Connect to MongoDB
mongoose.connect('mongodb+srv://ortizfram:cGLEWsgUqdXZNLoZ@codercluster.lmawmpi.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));


app.use(express.static(__dirname + "/public"));
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use(cookieParser("secret")); //pass secret from .env
app.use("/", router);
app.use("/api/sessions", authRouter);
app.use("/api/products", productsRouter);

app.listen(8080, () => {
  console.log("listening to port 8080");
});
