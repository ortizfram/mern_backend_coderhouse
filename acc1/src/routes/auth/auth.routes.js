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
  sessionCounter,
  loginConSession,
  middlewareAuth,
  logoutConSession,
  loginConSessionCounter,
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

// express-session
router.get('/session', sessionCounter)
router.get('/login', loginConSessionCounter)
router.get('/privado', middlewareAuth, (req, res) => {
  res.send("si ves esto ya te logueaste");
});
router.get('/logout', logoutConSession)


module.exports = router;
