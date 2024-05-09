const express = require("express");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth/auth.routes.js");
const { default: mongoose } = require("mongoose");
const app = express();

app.use(cookieParser("secret"));
mongoose
  .connect(
    "mongodb+srv://ortizfram:cGLEWsgUqdXZNLoZ@codercluster.lmawmpi.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error", err);
  });

app.use("/", authRouter);

app.listen(8080, () => {
  console.log("Server listening on port 8080");
});
