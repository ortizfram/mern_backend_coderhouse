const express = require("express");
const {
  home,
  middlewareAuth,
  login,
  getRegister,
  postRegister,
  postLogin,
  perfil,
  logoutConSession,
} = require("../../controllers/auth/auth.controller.js");

const router = express.Router();

router.get("/", home);
router.get("/perfil", perfil);
router.get("/logout", logoutConSession);
router.get("/login", login);
router.post("/login", postLogin);
router.get("/register", getRegister);
router.post("/register", postRegister);

// router.get('/login', loginConSessionCounter)
router.get('/privado', middlewareAuth, (req, res) => {
  res.send("si ves esto ya te logueaste");
});


module.exports = router;
