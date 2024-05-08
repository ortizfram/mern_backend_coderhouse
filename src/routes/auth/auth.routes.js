const express = require("express");
const {
  setCoookie,
  getCoookie,
  deleteCoookie,
  setSignedCoookie,
  getSignedCoookie,
  deleteSignedCoookie,
} = require("../../controllers/auth/auth.controller.js");

const router = express.Router();

// normal cookies
router.get("/getCookie", getCoookie);
router.get("/deleteCookie", deleteCoookie);

// signed cookies
router.get("/setSignedCookie", setSignedCoookie);
router.get("/getSignedCookie", getSignedCoookie);
router.get("/deleteSignedCookie", deleteSignedCoookie);

module.exports = router;
