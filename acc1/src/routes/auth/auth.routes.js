const express = require("express");
const {
  home,
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

// router.get('/login', loginConSessionCounter)
router.get('/privado', middlewareAuth, (req, res) => {
  res.send("si ves esto ya te logueaste");
});


module.exports = router;
