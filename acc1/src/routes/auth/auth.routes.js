const express = require("express");
const passport = require("passport");
const {
  home,
  middlewareAuth,
  getLogin,
  getRegister,
  perfil,
  logoutConSession,
  getResetPassword,
  postResetPassword,
} = require("../../controllers/auth/auth.controller.js");

const router = express.Router();

router.get("/", home);
router.get("/perfil", middlewareAuth, perfil);
router.get("/logout", logoutConSession);
router.get("/login", getLogin);
router.post("/login", passport.authenticate('login', {
  successRedirect: '/api/products', // Redirect to products on successful login
  failureRedirect: '/api/sessions/login', // Redirect back to login on failure
  failureFlash: true
}));
router.get("/register", getRegister);
router.post("/register", passport.authenticate('register', {
  successRedirect: '/api/sessions/login', // Redirect to login on successful registration
  failureRedirect: '/api/sessions/register', // Redirect back to register on failure
  failureFlash: true
}));
router.get("/reset_password", getResetPassword);
router.post("/reset_password", postResetPassword);

router.get('/privado', middlewareAuth, (req, res) => {
  res.send("si ves esto ya te logueaste");
});

module.exports = router;
