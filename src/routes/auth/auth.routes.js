const express = require("express");
const {
  setCoookie,
  getCoookie,
  deleteCoookie,
} = require("../../controllers/auth/auth.controller.js");

const router = express.Router();

router.get("/setCookie", setCoookie);
router.get("/getCookie", getCoookie);
router.get("/deleteCookie", deleteCoookie);

module.exports = router;
