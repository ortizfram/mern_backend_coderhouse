const express = require("express");
const {
  home,
  inyectarGetCookie,
  inyectarSetCookie,
  middlewareAuth,
  logoutConSession,
  login,
  getRegister,
  postRegister,
} = require("../../controllers/auth/auth.controller.js");

const router = express.Router();

router.get("/", home);
router.get("/login", login);
router.get("/register", getRegister);
router.post("/register", postRegister);
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
// router.get('/login', loginConSessionCounter)
router.get('/privado', middlewareAuth, (req, res) => {
  res.send("si ves esto ya te logueaste");
});
router.get('/logout', logoutConSession)


module.exports = router;
