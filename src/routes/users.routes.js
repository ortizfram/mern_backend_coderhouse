// src/routes/user.routes.js
const express = require("express");
const router = express.Router();
const { userModel } = require("../models/user.models"); // Corrected the file path here
const { error } = require("console");

router.get("/", async (req, res) => {
  try {
    let users = await userModel.find();
    res.send({ result: "success", payload: users });
  } catch (error) {
    console.log("cannot get users w/ mongoose" + error);
  }
});
router.post("/", async (req, res) => {
  try {
    let { first_name, last_name, email } = req.body;
    if (!first_name || !last_name || !email) {
      res.send({ status: "error", error: "incomplete values" });
    }
    let result = await userModel.create({
      first_name,
      last_name,
      email,
    });
    res.send({ result: "success", payload: result });
  } catch (error) {
    console.log("cannot get create user" + error);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    let uid = req.params.id;
    let result = await userModel.deleteOne({ _id: uid });
    res.send({ result: "success", payload: result });
  } catch (error) {
    console.log("cannot get users w/ mongoose" + error);
  }
});
router.put("/:id", async (req, res) => {
  try {
    let uid = req.params.id;
    let userToReplace = req.body;
    if (
      !userToReplace.first_name ||
      !userToReplace.last_name ||
      !userToReplace.email
    ) {
      return res.send({ status: "error", error: "complete missing values" });
    }
    let result = await userModel.updateOne({ _id: uid }, userToReplace);
    res.send({ status: "success", payload: result });
  } catch (error) {
    console.log("cannot update user" + error);
  }
});

module.exports = { userRouter: router };
