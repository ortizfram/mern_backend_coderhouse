// src/app.js
// Import required modules
const express = require("express");
const { userRouter } = require("./routes/users.routes");
const { mongoose } = require("mongoose");

// Create an Express application
const app = express();
app.use(express.json())

// Start the server
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://ortizfram:cGLEWsgUqdXZNLoZ@codercluster.lmawmpi.mongodb.net/?retryWrites=true&w=majority&appName=CoderCluster",
  { useNewUrlParser: true, useUnifiedTopology: true } // Add options object
);

// Handle MongoDB connection events
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});


// Use the userRouter for the specified path
app.use("/api/users", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
