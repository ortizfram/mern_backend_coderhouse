const express = require("express");
const {
  setCoookie,
  getCoookie,
  deleteCoookie,
  setSignedCoookie,
  getSignedCoookie,
  deleteSignedCoookie,
  home,
  inyectarGetCookie,
  inyectarSetCookie,
} = require("../../controllers/auth/auth.controller.js");

const router = express.Router();

router.get("/", home);
// normal cookies
router.get("/setCookie", setCoookie);
router.get("/getCookie", getCoookie);
router.get("/deleteCookie", deleteCoookie);

// signed cookies
router.get("/setSignedCookie", setSignedCoookie);
router.get("/getSignedCookie", getSignedCoookie);
router.get("/deleteSignedCookie", deleteSignedCoookie);

// inyectar cookies
router.get("/inyectar/getCookie", inyectarGetCookie);
router.post("/inyectar/setCookie", inyectarSetCookie);

module.exports = router;
