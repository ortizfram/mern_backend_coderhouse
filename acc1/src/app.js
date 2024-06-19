const express = require("express");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth/auth.routes.js");
const productsRouter = require("./routes/products/products.routes.js");
const handlebars = require("express-handlebars");
const session = require("express-session");
const mongoose = require("mongoose");
const passport = require("passport");
const initializePassport = require("./config/initializePassport.js");
const router = require("./routes/index/index.routes.js");
const { MONGODB_URI, SESSION_SECRET } = require("./config/config.js");


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Initialize Passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

app.use(express.static(__dirname + "/public"));
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use(cookieParser(SESSION_SECRET)); // pass secret from .env
app.use("/", router);
app.use("/api/sessions", authRouter);
app.use("/api/products", productsRouter);

app.listen(8080, () => {
  console.log("listening to port 8080");
});
