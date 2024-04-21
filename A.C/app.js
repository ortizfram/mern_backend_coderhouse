const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/estudiantes.routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect(
  "mongodb+srv://ortizfram:cGLEWsgUqdXZNLoZ@codercluster.lmawmpi.mongodb.net/?retryWrites=true&w=majority&appName=CoderCluster",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB Atlas");
});

app.use("/api/estudiantes", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
