const express = require("express");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth/auth.routes.js");

const app = express();

app.use(cookieParser());
app.use("/", authRouter);

app.listen(8080, () => {
  console.log("listening to port 8080");
});
